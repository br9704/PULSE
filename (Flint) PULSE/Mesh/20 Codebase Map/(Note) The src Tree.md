---
id: 0a3df370-b5a1-4a8e-bee0-97b4240694fa
title: "The src Tree"
type: note
project: "PULSE"
tags:
  - "#note"
  - "#project"
  - "#ld/living"
  - "#stack/react"
  - "#status/dormant"
  - "#cluster/university"
status: dormant
created: "2026-08-17"
updated: "2026-08-19"
source_path: "/Users/brunojaamaa/Desktop/PULSE/src"
---

# The src Tree

**178 files, 1.2 MB, seven directories.** The shape is conventional React with one unusual
property: almost all logic lives in `src/lib/` as pure functions, which is why **388** tests run
with no DOM.

| Directory | Files | What lives there |
|---|---|---|
| `src/components/` | **70** | 54 top-level components plus `home/` (11), `more/` (2), `ui/` (5) |
| `src/lib/` | **57** | Pure logic and the fixture layer. 24 test files here, 5 more in `lib/fixtures/` |
| `src/hooks/` | **32** | 30 hooks, one test, one `.gitkeep` |
| `src/constants/` | **8** | `occupancy.ts`, `buildingMeta.ts`, `map.ts`, `animations.ts`, `faq.ts` |
| `src/pages/` | **4** | `HomePage`, `MapPage`, `AlertsPage` |
| `src/types/` | **2** | One barrel `index.ts` |
| `src/stores/` | **1** | ⚫ Empty except `.gitkeep`. State lives in hooks, not a store |

Root files: `App.tsx`, `main.tsx`, `index.css`, `index.css.test.ts`.

## The load-bearing files in `src/lib/`

| File | Why it matters |
|---|---|
| `dataSource.ts` | The single read seam. `fetchRows` and `subscribeRows`. Everything above it is source-agnostic |
| `zoneDetection.ts` | Turf.js point-in-polygon on the device. Pure, asserted side-effect-free |
| `sessionId.ts` | 30-minute rotation, never persisted |
| `blending.ts` | live to crowd to predicted to modelled to none. Where the P0 `data_quality` bug lived |
| `confidence.ts` | One definition of the three confidence tiers, used by every surface |
| `schemas.ts` | Zod schemas for every external payload |
| `scoring.ts` | The recommendation score: emptiness, walking distance, amenity match |
| `buildingHours.ts` | Open, closed, or "hours not verified" with provenance |
| `reportDecay.ts` | Crowd reports decay over 30 minutes |
| `tokens.ts` | Design tokens, read by `contrast.test.ts` |
| `mapLayers.ts`, `basemapContrast.ts` | Mapbox layer ids read from the loaded style, not guessed |
| `fixtures/seedData.generated.ts` | Generated from `supabase/seed/` by `pnpm generate:fixtures` |

## Hooks, by cluster

- **Data**: `useBuildings`, `useZones`, `useRooms`, `useBlendedOccupancy`,
  `useBatchedOccupancy`, `useCampusOverview`, `useOccupancyRealtime`, `useGooglePopularity`
- **Location and privacy**: `useGeolocation`, `usePositionBroadcast`
- **Interaction**: `useBuildingSelection`, `useBuildingCard`, `useBuildingSheetData`,
  `useFindFilters`, `useRecommendations`, `useDismissOnEscape`
- **Crowd input**: `useCrowdReporting`, `useReportSubmit`, `useRecentReports`,
  `useFeedbackSubmit`
- **Alerts and PWA**: `useAlerts`, `useWebPush`, `useInstallPrompt`
- **Resilience**: `useOnlineStatus`, `useOfflineSnapshot`, `useRefetchOnReconnect`
- **Motion**: `useBreathingLayer`, `useCountUp`, `usePrefersReducedMotion`
- **Local state**: `useFavourites`

## Code health

**0** occurrences of `TODO`, `FIXME`, `HACK` or `XXX` across `src/`, `supabase/` and
`scripts/`. **0** ESLint suppressions, per the README. `pnpm lint` and `pnpm build` both run in
CI on every push to `main`.

That zero is unusual and worth reading as a signal rather than a gap: the recovery phase
converted every loose end into either a test or a Ship Runbook line, so there was nothing left
to leave a marker for. See [[(Note) The Wiring Audit and Recovery]].

## Related

[[(Note) Routes and Surfaces]] · [[(Note) The Test Suite]] · [[(Note) System Architecture]] ·
[[(Index) Complete File Inventory]] · [[(Index) 20 Codebase Map]]
