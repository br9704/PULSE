---
id: ff8af4d5-b80c-46c9-8909-edc4b2cc59d5
title: "Routes and Surfaces"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/src/App.tsx"
---

# Routes and Surfaces

**Four routes over three page components.** Client-side routing with `react-router-dom@7`,
declared in `src/App.tsx`. Vercel rewrites everything to `/index.html` so deep links work.

| Route | Component | Purpose |
|---|---|---|
| `/` | `src/pages/HomePage.tsx` | Campus status line, building tiles, all-buildings list, room search |
| `/map` | `src/pages/MapPage.tsx` | Mapbox GL map with occupancy-shaded OSM footprints |
| `/find` | `src/pages/MapPage.tsx` | Same component as `/map`, with the find panel open |
| `/alerts` | `src/pages/AlertsPage.tsx` | Occupancy alert setup and active alerts |

`/find` and `/map` render the same component. The tab bar presents them as separate
destinations, which is a deliberate UX choice rather than a duplicate route.

There is no API route layer of any kind in the client. Every server-side endpoint is a Deno Edge
Function under `supabase/functions/`, and none of them is hosted. See
[[(Note) External Services]].

## The seven Edge Function endpoints

| Function | Job |
|---|---|
| `aggregate-occupancy` | Counts sessions per zone in memory, writes only the count |
| `compute-predictions` | Builds the prediction table from `occupancy_history` |
| `submit-report` | Accepts an anonymous 1 to 5 crowd report |
| `submit-feedback` | Accepts free-text feedback |
| `manage-alerts` | Creates and deletes occupancy alerts |
| `send-alerts` | Web Push delivery for triggered alerts |
| `sync-google-popularity` | Pulls opening hours from Google Places, hours only |

Each is a single `index.ts`. All seven are committed and unit-tested at the library level, and
none has ever been deployed.

## UI surfaces worth knowing

- **`src/components/ui/BottomSheet.tsx`** is the shared sheet primitive. Every `role="dialog"`
  in the tree routes its dismissal through one hook, `useDismissOnEscape`, and
  `dialogDismissal.test.ts` fails the build if a new dialog does not.
- **`src/components/Map.tsx`, `MapSurface.tsx`, `MapOverlays.tsx`, `MapBuildingSheet.tsx`**
  split the map so Mapbox's **439 KB** stays off the landing route entirely.
- **`src/components/BuildingCard*.tsx`** is lazy-loaded, and Recharts ships with it rather than
  with the landing bundle.
- **`src/components/home/`** holds **11** components for the home route, including
  `CampusStatus.tsx`, which is where the "CAMPUS IS BUSY at 14% occupancy" bug lived.

## Related

[[(Note) The src Tree]] · [[(Note) System Architecture]] · [[(Note) The Test Suite]] ·
[[(Index) 20 Codebase Map]]
