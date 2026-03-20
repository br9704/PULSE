import type { Feature, FeatureCollection, Polygon } from 'geojson'
import type { BlendedOccupancy, Building } from '@/types'

export interface BuildingFeatureProperties {
  id: string
  name: string
  shortName: string | null
  slug: string
  occupancy_pct: number | null
}

/**
 * Converts buildings into a GeoJSON FeatureCollection for Mapbox.
 * Optionally merges occupancy data into feature properties for
 * data-driven styling (fill colours).
 */
export function buildingsToFeatureCollection(
  buildings: Building[],
  occupancyMap?: Map<string, BlendedOccupancy>,
): FeatureCollection<Polygon, BuildingFeatureProperties> {
  const features: Feature<Polygon, BuildingFeatureProperties>[] = []

  for (const b of buildings) {
    if (!b.polygon) continue

    const polygon: Polygon = typeof b.polygon === 'string'
      ? JSON.parse(b.polygon as string) as Polygon
      : b.polygon

    const occ = occupancyMap?.get(b.id)

    features.push({
      type: 'Feature',
      geometry: polygon,
      properties: {
        id: b.id,
        name: b.name,
        shortName: b.short_name,
        slug: b.slug,
        occupancy_pct: occ?.pct ?? null,
      },
    })
  }

  return { type: 'FeatureCollection', features }
}
