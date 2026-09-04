---
id: b831bbd6-aabd-4ec6-a350-a6495945060b
title: "Complete File Inventory"
type: index
project: "PULSE"
tags:
  - "#index"
  - "#project"
  - "#ld/living"
  - "#stack/react"
  - "#status/dormant"
  - "#cluster/university"
status: dormant
created: "2026-08-17"
updated: "2026-08-19"
source_path: "/Users/brunojaamaa/Desktop/PULSE"
---

# Complete File Inventory

Every tracked and untracked file in `/Users/brunojaamaa/Desktop/PULSE`, excluding
`node_modules/`, `dist/`, `.git/` internals and `.DS_Store`. Counted 2026-08-17.

## Root, 29 files

| File | Bytes | Modified | What it is |
|---|---|---|---|
| `README.md` | 23,910 | 2026-08-15 | 405 lines. The best single document in the repo |
| `MASTERPLAN.md` | 145,352 | 2026-08-15 | 2,285 lines. Sprints, decisions log, risks, ship runbook |
| `PRD.md` | 50,636 | 2026-03-19 | 1,326 lines. Six personas, north-star metric. Still calls the product "Pulse" |
| `CLAUDE.md` | 14,896 | 2026-08-15 | 295 lines. Sprint protocol and manual-actions checklist |
| `WIRING-AUDIT.md` | 13,899 | 2026-08-15 | 211 lines. The forensic audit that started the recovery |
| `ENGINEERPROMPT.md` | 11,413 | 2026-08-15 | Gitignored via `*-ENGINEERPROMPT.md` |
| `DOCS-ENGINEERPROMPT.md` | 9,621 | 2026-08-15 | Gitignored, same pattern |
| `MOTION.md` | 6,732 | 2026-08-15 | Animation spec. Binding, folded into the Sprint R4 gate |
| `PROJECT.json` | 6,536 | 2026-08-15 | Machine-readable portfolio card. Honest field, decisions, metrics |
| `AGENTS.md` | 3,829 | 2026-08-14 | Aethereum MCP multi-agent protocol. Gitignored |
| `GEMINI.md` | 3,829 | 2026-08-14 | 🟡 Byte-identical to `AGENTS.md`. Gitignored |
| `package.json` | 2,134 | 2026-08-15 | 11 deps, 26 dev deps, 7 scripts, pnpm 11.13.0 |
| `pnpm-lock.yaml` | 270,603 | 2026-08-15 | Lockfile |
| `.env.local` | 2,467 | 2026-08-14 | ⚠️ Secrets. Gitignored. **Never opened** |
| `.env.example` | 1,683 | 2026-08-14 | 4 variable names, no values |
| `LICENSE` | 1,126 | 2026-08-15 | All rights reserved, © 2026 Bruno Jaamaa |
| `eslint.config.js` | 1,111 | 2026-08-14 | Flat config, React hooks and refresh plugins |
| `index.html` | 778 | 2026-08-14 | Vite entry |
| `tsconfig.app.json` | 769 | 2026-03-19 | App TS config |
| `tsconfig.node.json` | 653 | 2026-03-19 | Build-tooling TS config |
| `tsconfig.json` | 119 | 2026-03-19 | Project references root |
| `.gitignore` | 470 | 2026-08-15 | Uniform machine-local block |
| `.mcp.json` | 399 | 2026-08-14 | MCP servers. Gitignored |
| `vercel.json` | 356 | 2026-03-22 | SPA rewrite plus cache headers |
| `vite.config.ts` | 3,264 | 2026-08-15 | PWA plugin, manual chunks, the Mapbox split |
| `vitest.config.ts` | 225 | 2026-03-19 | Test config |
| `postcss.config.js` | 91 | 2026-03-20 | Tailwind v4 PostCSS plugin |
| `opencode.json` | 226 | 2026-08-14 | Gitignored |
| `OBSIDIANLOG.md` | 606 | 2026-08-17 | ✍️ Written by this vault build. The only file changed outside the vault |

## `src/`, 178 files

**`src/` root, 4:** `App.tsx` · `main.tsx` · `index.css` · `index.css.test.ts`

**`src/pages/`, 3 + `.gitkeep`:** `HomePage.tsx` · `MapPage.tsx` · `AlertsPage.tsx`

**`src/components/`, top level, 54 + `.gitkeep`:**
`AccessibilityPanel` · `AlertActive` · `AlertSetup` · `BuildingCard` · `BuildingCardDetails` ·
`BuildingCardHeader` · `BuildingCardSummary` · `BuildingListFallback` · `ColdStartNotice` ·
`ConfigError` · `CountUpValue` · `DataSourceBadge` · `DataSourcePill` · `ErrorBoundary` ·
`FavouriteButton` · `FeedbackSheet` · `FilterChipRow` · `FindPanel` · `FindResultRow` ·
`FindResults` · `FindTrigger` · `FloorBreakdown` · `InstallBanner` · `LoadFailure` ·
`LocationPrompt` · `Map` · `MapBuildingSheet` · `MapOverlays` · `MapSurface` · `NoiseIndicator` ·
`OccupancyAnnouncer` · `OccupancyBadge` · `OccupancyBar` · `OfflineBanner` · `PhotoCarousel` ·
`PredictionChart` · `PredictionSection` · `PredictionSourceBadge` · `ReportFAB` ·
`ReportLevelPicker` · `ReportSheet` · `RoomList` · `SectionLabel` · `SparklineChart` ·
`StaleDataBanner` · `TabBar` · `TerminalList` · `TerminalLoader` · `TipsList` · `TrendArrow` ·
`TypedLine`

**`src/components/home/`, 11:** `AllBuildings` · `BuildingFilters` · `BuildingRow` ·
`BuildingRowFooter` · `BuildingTile` · `CampusStatus` · `HomeHeader` · `HomeSkeleton` ·
`RevealSection` · `RoomSearch` · `TileGrid`

**`src/components/more/`, 2:** `AlertsList` · `FaqAccordion`

**`src/components/ui/`, 5:** `BottomSheet` · `Button` · `Card` · `SkeletonLoader` · `StatusDot`

**`src/hooks/`, 30 + 1 test + `.gitkeep`:** `useAlerts` · `useBatchedOccupancy` ·
`useBlendedOccupancy` · `useBreathingLayer` · `useBuildingCard` · `useBuildingSelection` ·
`useBuildingSheetData` · `useBuildings` · `useCampusOverview` · `useCountUp` ·
`useCrowdReporting` · `useDismissOnEscape` · `useFavourites` · `useFeedbackSubmit` ·
`useFindFilters` · `useGeolocation` · `useGooglePopularity` · `useInstallPrompt` ·
`useOccupancyRealtime` · `useOfflineSnapshot` · `useOnlineStatus` · `usePositionBroadcast` ·
`usePrefersReducedMotion` · `useRecentReports` · `useRecommendations` · `useRefetchOnReconnect` ·
`useReportSubmit` · `useRooms` (+ `useRooms.test.ts`) · `useWebPush` · `useZones`

**`src/lib/`, 50 + `.gitkeep`, of which 24 are tests:**
Source: `aggregation` · `amenityHelpers` · `basemapContrast` · `blending` · `buildingHours` ·
`confidence` · `dataSource` · `geoHelpers` · `localStore` · `mapHelpers` · `mapLayers` ·
`noiseAggregation` · `occupancyHelpers` · `predictionInsights` · `preloadMap` · `relativeTime` ·
`reportDecay` · `schemas` · `scoring` · `sessionId` · `shareBuilding` · `supabase` ·
`supabaseConfig` · `tokens` · `zoneDetection`
Tests only, no paired source: `a11y.test.ts` · `bundleBudget.test.ts` · `contrast.test.ts` ·
`dialogDismissal.test.ts` · `errorStates.test.ts` · `journeys.test.ts` · `motion.test.ts` ·
`privacy.test.ts`

**`src/lib/fixtures/`, 7:** `index.ts` · `seedData.generated.ts` · plus 5 tests
(`pipeline` · `seedData` · `seedGeometry` · `seedHours` · `seedRooms`)

**`src/constants/`, 7 + `.gitkeep`:** `animations.ts` · `buildingMeta.ts` (+ test) · `faq.ts` ·
`map.ts` · `occupancy.ts` (+ test)

**`src/types/`, 1 + `.gitkeep`:** `index.ts`

**`src/stores/`:** ⚫ `.gitkeep` only

## `supabase/`, 40 files

**`functions/`, 7 + `.gitkeep`:** `aggregate-occupancy/index.ts` ·
`compute-predictions/index.ts` · `manage-alerts/index.ts` · `send-alerts/index.ts` ·
`submit-feedback/index.ts` · `submit-report/index.ts` · `sync-google-popularity/index.ts`

**`migrations/`, 22 + `.gitkeep`:** `001_campuses` · `002_buildings` · `003_building_zones` ·
`004_zone_occupancy` · `005_occupancy_history` · `006_occupancy_predictions` ·
`007_google_popularity` · `008_user_alerts` · `009_fix_data_quality_check` ·
`010_fix_building_polygons` · `011_correct_all_polygons` · `012_occupancy_reports` ·
`013_data_verification_fixes` · `014_alter_user_alerts` · `015_rooms` · `016_feedback` ·
`017_verified_hours` · `018_accessibility_unknown` · `019_rooms_unknown` ·
`020_hours_provenance` · `021_hours_source` · `022_osm_building_footprints`

**`seed/`, 8 + `.gitkeep`:** `001_uom_parkville` · `002_google_popular_times` ·
`003_additional_buildings` · `004_additional_popular_times` · `005_verified_accessibility` ·
`006_rooms_uom_campus_map` · `007_verified_accessibility_campus_map` ·
`008_verified_hours_source`

## Everything else

| Path | Files |
|---|---|
| `scripts/` | `generateFixtures.mjs` · `parseSeedSql.mjs` |
| `public/` | `favicon.svg` · `icons/icon-192.png` · `icons/icon-512.png` · `icons/icon-512-maskable.png` · `icons/.gitkeep` |
| `docs/media/` | `hero.png` · `home.png` · `map.png` · `card.png` · `find.png` |
| `.github/` | `workflows/ci.yml` |
| `.claude/` | `RESUME.md` · `settings.json` · `settings.local.json` |
| `.codex/` | `config.toml` · `hooks.json` |
| `.cursor/` | `hooks.json` · `mcp.json` · `rules/aethereum.mdc` |
| `.vscode/` | `mcp.json` |
| `.vercel/` | `project.json` · `README.txt` |

## Not inventoried

`node_modules/` and `dist/` (**21** files, **3.0 MB**) are excluded per ground rule 6. Both are
reproducible. `.git/` internals were never traversed. `.env.local` was never opened.

## Related

[[(Report) Folder Audit]] · [[(Note) The src Tree]] · [[(Note) Data Model]] ·
[[(Map) Master Map]]
