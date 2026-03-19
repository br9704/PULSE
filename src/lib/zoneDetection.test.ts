import { describe, expect, it } from 'vitest'
import { detectZone } from './zoneDetection'
import type { BuildingZone } from '@/types'

function makeZone(overrides: Partial<BuildingZone> = {}): BuildingZone {
  return {
    id: 'zone-1',
    building_id: 'building-1',
    zone_slug: 'test-zone',
    zone_name: 'Test Zone',
    polygon: {
      type: 'Polygon',
      coordinates: [[[144.959, -37.797], [144.961, -37.797], [144.961, -37.799], [144.959, -37.799], [144.959, -37.797]]],
    },
    capacity: 200,
    floor_level: 0,
    is_quiet_zone: false,
    has_power: true,
    is_accessible: true,
    created_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

describe('detectZone', () => {
  it('returns zone_id when point is inside zone', () => {
    const zones = [makeZone({ id: 'z-baillieu' })]
    // Point inside the polygon (centre of the rectangle)
    const result = detectZone({ latitude: -37.798, longitude: 144.960 }, zones)
    expect(result).toBe('z-baillieu')
  })

  it('returns null when point is outside all zones', () => {
    const zones = [makeZone()]
    // Point far away from the polygon
    const result = detectZone({ latitude: -33.0, longitude: 151.0 }, zones)
    expect(result).toBeNull()
  })

  it('returns null for empty zones array', () => {
    const result = detectZone({ latitude: -37.798, longitude: 144.960 }, [])
    expect(result).toBeNull()
  })

  it('returns the correct zone when point is in the second zone', () => {
    const zone1 = makeZone({
      id: 'z-north',
      polygon: {
        type: 'Polygon',
        coordinates: [[[144.959, -37.790], [144.961, -37.790], [144.961, -37.795], [144.959, -37.795], [144.959, -37.790]]],
      },
    })
    const zone2 = makeZone({
      id: 'z-south',
      polygon: {
        type: 'Polygon',
        coordinates: [[[144.959, -37.797], [144.961, -37.797], [144.961, -37.799], [144.959, -37.799], [144.959, -37.797]]],
      },
    })
    // Point is in zone2 (south), not zone1 (north)
    const result = detectZone({ latitude: -37.798, longitude: 144.960 }, [zone1, zone2])
    expect(result).toBe('z-south')
  })

  it('uses correct [lng, lat] order for GeoJSON', () => {
    // Baillieu Library zone from seed data (approximate)
    const baillieu = makeZone({
      id: 'baillieu-ground',
      polygon: {
        type: 'Polygon',
        coordinates: [[[144.9590, -37.7976], [144.9606, -37.7976], [144.9606, -37.7985], [144.9590, -37.7985], [144.9590, -37.7976]]],
      },
    })
    // Point at Baillieu centroid
    const result = detectZone({ latitude: -37.7980, longitude: 144.9598 }, [baillieu])
    expect(result).toBe('baillieu-ground')
  })
})
