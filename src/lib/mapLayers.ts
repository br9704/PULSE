import type { ExpressionSpecification, FillLayerSpecification, LineLayerSpecification, SymbolLayerSpecification } from 'mapbox-gl'
import { LABEL_VISIBLE_ZOOM } from '@/constants/map'
import { OCCUPANCY_COLOURS } from '@/constants/occupancy'

const BUILDINGS_SOURCE = 'buildings'

// Mapbox data-driven expression: maps occupancy_pct → colour
// Uses linear interpolation across the occupancy colour scale
// Falls back to 'none' colour when occupancy_pct is absent
const FILL_COLOR_EXPRESSION: ExpressionSpecification = [
  'case',
  ['has', 'occupancy_pct'],
  [
    'interpolate', ['linear'], ['get', 'occupancy_pct'],
    0, OCCUPANCY_COLOURS.empty,
    25, OCCUPANCY_COLOURS.empty,
    50, OCCUPANCY_COLOURS.quiet,
    70, OCCUPANCY_COLOURS.moderate,
    85, OCCUPANCY_COLOURS.busy,
    100, OCCUPANCY_COLOURS.packed,
  ],
  OCCUPANCY_COLOURS.none,
]

export function getFillLayerConfig(): FillLayerSpecification {
  return {
    id: 'building-fills',
    type: 'fill',
    source: BUILDINGS_SOURCE,
    paint: {
      'fill-color': FILL_COLOR_EXPRESSION,
      'fill-opacity': 0.55,
      'fill-color-transition': { duration: 800, delay: 0 },
    },
  }
}

export function getOutlineLayerConfig(): LineLayerSpecification {
  return {
    id: 'building-outlines',
    type: 'line',
    source: BUILDINGS_SOURCE,
    paint: {
      'line-color': '#4A8ABF',
      'line-width': 1.5,
    },
  }
}

export function getLabelLayerConfig(): SymbolLayerSpecification {
  return {
    id: 'building-labels',
    type: 'symbol',
    source: BUILDINGS_SOURCE,
    minzoom: LABEL_VISIBLE_ZOOM,
    layout: {
      'text-field': ['get', 'shortName'],
      'text-size': 11,
      'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
      'text-anchor': 'center',
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#8AAEC8',
      'text-halo-color': '#030D1A',
      'text-halo-width': 1,
    },
  }
}

export function getOccupancyLabelLayerConfig(): SymbolLayerSpecification {
  return {
    id: 'building-occupancy-labels',
    type: 'symbol',
    source: BUILDINGS_SOURCE,
    minzoom: LABEL_VISIBLE_ZOOM,
    layout: {
      'text-field': [
        'case',
        ['has', 'occupancy_pct'],
        ['concat', ['to-string', ['round', ['get', 'occupancy_pct']]], '%'],
        '',
      ],
      'text-size': 13,
      'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
      'text-anchor': 'center',
      'text-offset': [0, 1.2],
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#F0F4F8',
      'text-halo-color': '#030D1A',
      'text-halo-width': 1.5,
    },
  }
}
