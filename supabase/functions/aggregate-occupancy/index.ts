// Edge Function: aggregate-occupancy
// Invoked every ~10 seconds via HTTP from client usePositionBroadcast hook.
//
// Counts distinct session_ids per zone_id (IN-MEMORY ONLY),
// and writes aggregated occupancy to zone_occupancy.
//
// PRIVACY INVARIANTS:
//   1. session_id is NEVER written to any database table
//   2. Raw GPS coordinates are NEVER received (client sends zone_id only)
//   3. Positions older than 30 minutes are expired

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// In-memory store: Map<zone_id, Map<session_id, timestamp>>
// Ephemeral — lost on cold start, which is acceptable.
const activePositions: Map<string, Map<string, number>> = new Map();

const POSITION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes
const STALE_THRESHOLD_MS = 60 * 1000; // 60 seconds
const TREND_THRESHOLD = 5; // percentage points
const HISTORY_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

// Module-scoped: tracks when we last wrote history snapshots
let lastHistoryWriteAt = 0;

interface ZoneCapacity {
  id: string;
  building_id: string;
  capacity: number | null;
}

type DataQuality = "live" | "stale" | "none";

/**
 * Determine data_quality for a zone based on its session timestamps.
 * - 'live': at least one session updated within STALE_THRESHOLD_MS
 * - 'stale': sessions exist but all are older than STALE_THRESHOLD_MS
 * - 'none': no active sessions
 */
function getDataQuality(sessions: Map<string, number> | undefined, now: number): DataQuality {
  if (!sessions || sessions.size === 0) return "none";

  let newestTimestamp = 0;
  for (const ts of sessions.values()) {
    if (ts > newestTimestamp) newestTimestamp = ts;
  }

  return (now - newestTimestamp) <= STALE_THRESHOLD_MS ? "live" : "stale";
}

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // --- Step 1: Process incoming position broadcasts ---
    if (req.method === "POST") {
      const body = await req.json();
      const positions: Array<{
        zone_id: string;
        session_id: string;
      }> = body.positions ?? [];

      const now = Date.now();

      for (const pos of positions) {
        // PRIVACY: Only zone_id and session_id are received.
        // session_id is used for in-memory deduplication ONLY.
        if (!activePositions.has(pos.zone_id)) {
          activePositions.set(pos.zone_id, new Map());
        }
        activePositions.get(pos.zone_id)!.set(pos.session_id, now);
      }
    }

    // --- Step 2: Expire old positions ---
    const now = Date.now();
    for (const [zoneId, sessions] of activePositions) {
      for (const [sessionId, timestamp] of sessions) {
        if (now - timestamp > POSITION_EXPIRY_MS) {
          sessions.delete(sessionId);
        }
      }
      if (sessions.size === 0) {
        activePositions.delete(zoneId);
      }
    }

    // --- Step 3: Fetch zone capacities ---
    const { data: zones, error: zonesError } = await supabase
      .from("building_zones")
      .select("id, building_id, capacity");

    if (zonesError) {
      throw new Error(`Failed to fetch zones: ${zonesError.message}`);
    }

    const zoneMap = new Map<string, ZoneCapacity>();
    for (const zone of zones as ZoneCapacity[]) {
      zoneMap.set(zone.id, zone);
    }

    // --- Step 4: Compute occupancy per zone ---
    const { data: currentOccupancy } = await supabase
      .from("zone_occupancy")
      .select("zone_id, occupancy_pct");

    const currentPctMap = new Map<string, number>();
    if (currentOccupancy) {
      for (const row of currentOccupancy) {
        currentPctMap.set(row.zone_id, Number(row.occupancy_pct));
      }
    }

    const updates: Array<{
      zone_id: string;
      building_id: string;
      occupancy_count: number;
      occupancy_pct: number;
      trend: "filling" | "emptying" | "stable";
      prev_pct: number | null;
      last_updated: string;
      data_quality: DataQuality;
    }> = [];

    for (const [zoneId, zone] of zoneMap) {
      const sessions = activePositions.get(zoneId);
      const count = sessions?.size ?? 0;
      const capacity = zone.capacity ?? 100;
      const pct = Math.min(100, Math.round((count / capacity) * 100 * 100) / 100);

      const prevPct = currentPctMap.get(zoneId) ?? null;
      let trend: "filling" | "emptying" | "stable" = "stable";
      if (prevPct !== null) {
        if (pct > prevPct + TREND_THRESHOLD) trend = "filling";
        else if (pct < prevPct - TREND_THRESHOLD) trend = "emptying";
      }

      updates.push({
        zone_id: zoneId,
        building_id: zone.building_id,
        occupancy_count: count,
        occupancy_pct: pct,
        trend,
        prev_pct: prevPct,
        last_updated: new Date().toISOString(),
        data_quality: getDataQuality(sessions, now),
      });
    }

    // --- Step 5: Upsert zone_occupancy ---
    // session_id is NOT included — privacy invariant enforced.
    if (updates.length > 0) {
      const { error: upsertError } = await supabase
        .from("zone_occupancy")
        .upsert(updates, { onConflict: "zone_id" });

      if (upsertError) {
        throw new Error(`Failed to upsert occupancy: ${upsertError.message}`);
      }
    }

    // --- Step 6: Write 15-minute snapshots to occupancy_history ---
    // Throttled: only write if >= 15 minutes since last snapshot.
    const shouldWriteHistory = now - lastHistoryWriteAt >= HISTORY_INTERVAL_MS;

    if (shouldWriteHistory) {
      const historyRows = updates
        .filter((u) => u.data_quality === "live")
        .map((u) => ({
          zone_id: u.zone_id,
          building_id: u.building_id,
          occupancy_pct: u.occupancy_pct,
          active_count: u.occupancy_count,
          data_source: "crowdsourced",
          recorded_at: new Date().toISOString(),
        }));

      if (historyRows.length > 0) {
        const { error: historyError } = await supabase
          .from("occupancy_history")
          .insert(historyRows);

        if (historyError) {
          console.error(`Failed to write history: ${historyError.message}`);
        } else {
          lastHistoryWriteAt = now;
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        zones_updated: updates.length,
        active_positions: activePositions.size,
        history_written: shouldWriteHistory,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("aggregate-occupancy error:", error);
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
