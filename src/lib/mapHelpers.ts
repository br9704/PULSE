import type { Feature, FeatureCollection, Polygon } from 'geojson'
import type { Building } from '@/types'

export interface BuildingFeatureProperties {
  id: string
  name: string
  shortName: string | null
  slug: string
}

/**
 * Converts an array of buildings into a GeoJSON FeatureCollection
 * suitable for use as a Mapbox source.
 *
 * Buildings without a polygon are filtered out.
 */
export function buildingsToFeatureCollection(
  buildings: Building[],
): FeatureCollection<Polygon, BuildingFeatureProperties> {
  const features: Feature<Polygon, BuildingFeatureProperties>[] = []

  for (const b of buildings) {
    if (!b.polygon) continue

    // Defensive: PostgREST usually returns parsed JSONB, but handle string case
    const polygon: Polygon = typeof b.polygon === 'string'
      ? JSON.parse(b.polygon as string) as Polygon
      : b.polygon

    features.push({
      type: 'Feature',
      geometry: polygon,
      properties: {
        id: b.id,
        name: b.name,
        shortName: b.short_name,
        slug: b.slug,
      },
    })
  }

  return {
    type: 'FeatureCollection',
    features,
  }
}
