// Edge Function: aggregate-occupancy
// Invoked every ~10 seconds via pg_cron or HTTP cron.
//
// Reads active position broadcasts from the Supabase Realtime channel,
// counts distinct session_ids per zone_id (IN-MEMORY ONLY),
// and writes aggregated occupancy to zone_occupancy.
//
// PRIVACY INVARIANTS:
//   1. session_id is NEVER written to any database table
//   2. Raw GPS coordinates are NEVER received (client sends zone_id only)
//   3. Positions older than 30 minutes are expired

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// In-memory store: Map<zone_id, Map<session_id, timestamp>>
// This is ephemeral — lost on function cold start, which is acceptable.
const activePositions: Map<string, Map<string, number>> = new Map();

const POSITION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes
const TREND_THRESHOLD = 5; // percentage points

interface ZoneCapacity {
  id: string;
  building_id: string;
  capacity: number | null;
}

Deno.serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // --- Step 1: Process incoming position broadcasts ---
    // In production, this function subscribes to the Realtime channel.
    // For the scaffold, we accept position data via HTTP POST body.
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
    // Fetch current zone_occupancy for trend calculation
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
      data_quality: "live" | "none";
    }> = [];

    for (const [zoneId, zone] of zoneMap) {
      const sessions = activePositions.get(zoneId);
      const count = sessions?.size ?? 0;
      const capacity = zone.capacity ?? 100; // fallback capacity
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
        data_quality: count > 0 ? "live" : "none",
      });
    }

    // --- Step 5: Upsert zone_occupancy ---
    // session_id is NOT included in this upsert — privacy invariant enforced.
    if (updates.length > 0) {
      const { error: upsertError } = await supabase
        .from("zone_occupancy")
        .upsert(updates, { onConflict: "zone_id" });

      if (upsertError) {
        throw new Error(`Failed to upsert occupancy: ${upsertError.message}`);
      }
    }

    // --- Step 6: Write 15-minute snapshots to occupancy_history ---
    // Only write if enough time has passed since last snapshot.
    // For the scaffold, we write on every invocation. Production should
    // check recorded_at and only write every 15 minutes.
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
        // Non-fatal — don't fail the whole function
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        zones_updated: updates.length,
        active_positions: activePositions.size,
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
