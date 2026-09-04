---
id: e145eeca-8ca9-4068-96e7-8228648bd912
title: "Data Model"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/supabase/migrations"
---

# Data Model

**12 tables across 22 migrations, with RLS on every one: anon reads, service role writes.**
Committed and reviewable. Never provisioned. Eight seed files fill it with **18** buildings,
**47** zones, **890** rooms and **1,156** modelled occupancy rows.

## The tables

| Table | Holds |
|---|---|
| `campuses` | Campus records. Multi-campus was designed for, never seeded beyond one |
| `buildings` | 18 UoM Parkville buildings, OSM footprints, capacity, amenities, accessibility |
| `building_zones` | 47 floor-level zones, the unit occupancy is actually measured in |
| `zone_occupancy` | Current occupancy per zone, rewritten by `aggregate-occupancy` |
| `occupancy_history` | Accumulated readings. The input to the never-built EWMA engine |
| `occupancy_predictions` | Output of `compute-predictions` |
| `occupancy_reports` | Anonymous crowd reports, 1 to 5, decaying over 30 min |
| `google_popular_times` | Legacy from when Google was believed to be an occupancy source |
| `google_popularity_cache` | Cache layer for the same |
| `user_alerts` | Occupancy alert subscriptions and Web Push endpoints |
| `rooms` | 890 rooms with code, name, floor and type |
| `feedback` | Free-text feedback from `submit-feedback` |

## Migrations, in order

`001_campuses` · `002_buildings` · `003_building_zones` · `004_zone_occupancy` ·
`005_occupancy_history` · `006_occupancy_predictions` · `007_google_popularity` ·
`008_user_alerts` · `009_fix_data_quality_check` · `010_fix_building_polygons` ·
`011_correct_all_polygons` · `012_occupancy_reports` · `013_data_verification_fixes` ·
`014_alter_user_alerts` · `015_rooms` · `016_feedback` · `017_verified_hours` ·
`018_accessibility_unknown` · `019_rooms_unknown` · `020_hours_provenance` ·
`021_hours_source` · `022_osm_building_footprints`

⚠️ **Migration `013` has a history.** The original was applied to the cloud database and never
committed, and the repo jumped `012` to `014`. That work is unrecoverable. `013` on disk today
is a rewrite that deliberately does **not** carry the Google Place IDs the original held,
because those could not be recovered without inventing them. The rule since: no schema change
reaches a cloud database before it exists as a committed migration.

## Seeds

`001_uom_parkville` · `002_google_popular_times` · `003_additional_buildings` ·
`004_additional_popular_times` · `005_verified_accessibility` ·
`006_rooms_uom_campus_map` · `007_verified_accessibility_campus_map` ·
`008_verified_hours_source`

`scripts/parseSeedSql.mjs` parses these and `scripts/generateFixtures.mjs` emits
`src/lib/fixtures/seedData.generated.ts`. A test fails if the generated fixtures drift from the
seeds, so production data and test data cannot diverge.

That generator has been the most productive place in the repo to look for bugs, because
everything downstream inherits whatever it gets wrong. It once dropped every database-default
timestamp behind an `as unknown as Building[]` cast, so `last_updated` was `undefined`
campus-wide and every freshness stamp rendered nothing. It also skipped migrations `010` and
`011` entirely, both of which use a `WHERE id = '...'` form the parser had no helper for, which
meant no version of this database had ever held a real building footprint.

## The schema decision worth reading

**Unverified data must be representable.** Accessibility flags were originally `BOOLEAN NOT
NULL`, so the columns could say yes or no and nothing else. The true answer for most buildings,
which is *nobody has checked*, was unrepresentable, and every flag in the database had in fact
been invented.

Migrations `018` and `019` made the columns nullable. The rule now: **a flag may never be set
`false` from an absence of evidence.** Unverified flags render `[?]` in the UI with their
provenance shown inline. Migrations `020` and `021` applied the same treatment to opening hours,
adding provenance and source columns so a building can say "hours not verified" rather than
guess.

Current state of that data:

| Field | Coverage |
|---|---|
| Mapped lift | **16 of 18** |
| Mapped accessible toilet | **17 of 18** |
| Entrances labelled accessible | **1 of 18** |
| Accessible parking | **0 of 18**. No source exists at all, so all are `NULL` |
| Opening hours sourced | **5 of 18**. The other 13 carry unverified seed values |
| Google Place ID | **7 of 18**. 11 are `NULL`, and filling them needs a Places API key |
| Real OSM footprint | **15 of 18**, 14 to 57 vertices each |
| Rooms | **890** across **17 of 18** buildings. Capacity, power and bookability are `NULL` because the source publishes none |

One building has no rooms: its seeded name does not match anything the University publishes, and
guessing which building it is would be exactly the failure the recovery phase spent six sprints
correcting.

## Related

[[(Note) External Services]] · [[(Note) The Wiring Audit and Recovery]] ·
[[(Note) System Architecture]] · [[(Index) 40 Data & Integrations]]
