/**
 * Pure aggregation logic — mirrors the Edge Function's computation.
 * Extracted for unit testing (Edge Function runs in Deno, tests run in Vitest).
 *
 * PRIVACY: These functions never receive or produce raw GPS coordinates.
 * They operate on zone_id + session_id only. session_id is used for
 * in-memory counting and is never included in any database write output.
 */

const POSITION_EXPIRY_MS = 30 * 60 * 1000 // 30 minutes
const STALE_THRESHOLD_MS = 60 * 1000 // 60 seconds
const TREND_THRESHOLD = 5 // percentage points

export type DataQualityResult = 'live' | 'stale' | 'none'
export type TrendResult = 'filling' | 'emptying' | 'stable'

/**
 * Determine data quality based on session timestamps.
 * - 'live': newest session < 60s old
 * - 'stale': sessions exist but all > 60s old
 * - 'none': no sessions
 */
export function getDataQuality(
  sessions: Map<string, number> | undefined,
  now: number,
): DataQualityResult {
  if (!sessions || sessions.size === 0) return 'none'

  let newestTimestamp = 0
  for (const ts of sessions.values()) {
    if (ts > newestTimestamp) newestTimestamp = ts
  }

  return (now - newestTimestamp) <= STALE_THRESHOLD_MS ? 'live' : 'stale'
}

/**
 * Expire sessions older than 30 minutes from the active positions map.
 * Mutates the map in place. Returns the number of expired sessions.
 */
export function expirePositions(
  activePositions: Map<string, Map<string, number>>,
  now: number,
): number {
  let expired = 0

  for (const [zoneId, sessions] of activePositions) {
    for (const [sessionId, timestamp] of sessions) {
      if (now - timestamp > POSITION_EXPIRY_MS) {
        sessions.delete(sessionId)
        expired++
      }
    }
    if (sessions.size === 0) {
      activePositions.delete(zoneId)
    }
  }

  return expired
}

/**
 * Compute occupancy percentage for a zone.
 * Returns 0-100, capped at 100.
 */
export function computeOccupancyPct(count: number, capacity: number): number {
  if (capacity <= 0) return 0
  return Math.min(100, Math.round((count / capacity) * 100 * 100) / 100)
}

/**
 * Compute trend by comparing current vs previous occupancy percentage.
 * - filling: current > prev + TREND_THRESHOLD
 * - emptying: current < prev - TREND_THRESHOLD
 * - stable: within threshold
 */
export function computeTrend(
  currentPct: number,
  prevPct: number | null,
): TrendResult {
  if (prevPct === null) return 'stable'
  if (currentPct > prevPct + TREND_THRESHOLD) return 'filling'
  if (currentPct < prevPct - TREND_THRESHOLD) return 'emptying'
  return 'stable'
}

/**
 * Record a position broadcast in the active positions map.
 * PRIVACY: session_id is stored in-memory only, never persisted.
 */
export function recordPosition(
  activePositions: Map<string, Map<string, number>>,
  zoneId: string,
  sessionId: string,
  now: number,
): void {
  if (!activePositions.has(zoneId)) {
    activePositions.set(zoneId, new Map())
  }
  activePositions.get(zoneId)!.set(sessionId, now)
}
