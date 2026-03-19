import { point, booleanPointInPolygon } from '@turf/turf'
import type { BuildingZone } from '@/types'

/**
 * Privacy firewall: raw coordinates enter, only a zone_id string exits.
 *
 * Determines which building zone (if any) contains the given position
 * using Turf.js point-in-polygon. Returns the zone ID of the first match,
 * or null if the position is outside all zones.
 *
 * This function has NO side effects — no logging, no network, no storage.
 * After it returns, the caller should discard the coordinates.
 */
export function detectZone(
  position: { latitude: number; longitude: number },
  zones: BuildingZone[],
): string | null {
  // GeoJSON convention: [longitude, latitude]
  const pt = point([position.longitude, position.latitude])

  for (const zone of zones) {
    if (!zone.polygon) continue
    if (booleanPointInPolygon(pt, zone.polygon)) {
      return zone.id
    }
  }

  return null
}
