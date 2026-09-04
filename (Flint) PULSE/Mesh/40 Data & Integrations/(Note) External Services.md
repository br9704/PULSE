---
id: fa6ce2d0-b2c3-46f3-b0df-f517b4703801
title: "External Services"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE"
---

# External Services

**Five outside dependencies. Exactly one is live and it is the one with an unrestricted token.**

| Service | Status | What it provides |
|---|---|---|
| **Mapbox GL** | 🟢 Live | Map tiles on the deployed app. ⚠️ Token not domain-restricted |
| **Vercel** | 🟢 Live | Hosting at `unispace-tawny.vercel.app`, project `unispace` |
| **Supabase** | ⚫ Parked | Postgres, Realtime, Edge Functions. Deliberately not provisioned |
| **Google Places API** | ⚫ Not wired | Opening hours only. Needs a key that does not exist |
| **OpenStreetMap** | 🟢 Baked in | Building footprints, already committed to seed SQL. No runtime call |

## Mapbox

The only runtime dependency of the deployed app. `VITE_MAPBOX_TOKEN` is a client-side token by
necessity, and the mitigation is a domain restriction rather than secrecy.

⚠️ **That restriction has not been applied.** The masterplan calls it the single urgent open item
in the Ship Runbook, independent of everything Supabase-related, because an unrestricted token on
a live public URL is an uncapped bill. This is the top action in [[(Report) Project Summary]].

Mapbox's **439 KB** is kept off the landing route entirely by a lazy import, and
`bundleBudget.test.ts` fails the build if it reappears there.

A basemap lesson lives in `src/lib/mapLayers.ts`. Building footprints were invisible against
Mapbox's `light-v11`, which draws roads near-white on near-white ground because it is designed
to sit *under* a visualisation. The first fix matched layer ids like `road-motorway` and
`road-primary`, which are the names the full Streets style uses. `light-v11` collapses the whole
road network into one `road-simple` layer, so that pattern matched footpaths and steps and not a
single street. It shipped looking slightly better and was entirely wrong. Reading the ids out of
the loaded style in a browser fixed it in one attempt.

## Google Places

**Google does not provide busyness data.** The Places API exposes no live or typical popularity.
The Popular Times panel in Google Maps is an internal feature with no public endpoint. An earlier
version of this app claimed otherwise in four places, and that was wrong and was removed.

Google is used here for **opening hours and nothing else**, via
`supabase/functions/sync-google-popularity/index.ts`, which has never run. The
`google_popular_times` and `google_popularity_cache` tables are residue from the earlier belief.

`GOOGLE_PLACES_API_KEY` is a Supabase secret, never `VITE_`-prefixed, and `privacy.test.ts`
fails the build if it is ever exposed to the client.

## Supabase

**No project is provisioned, and none will be.** Hosted Postgres, Realtime and Edge Functions
cost money every month on a portfolio project. Parked deliberately, not pending.

The previous project, ref `kvagntgpiylxhjntexml`, was **deleted**, which is what the forensic
audit discovered. Three independent resolvers returned NXDOMAIN while `supabase.co` itself
resolved fine. See [[(Note) The Wiring Audit and Recovery]].

The client dependency `@supabase/supabase-js` is still in `package.json` and is code-split, so an
app with no database does not ship a database client on its landing route. That was commit
`922b907`.

## Vercel

Project `unispace`, deployed **2026-08-14** at commit `734e2e5`. `vercel.json` rewrites all paths
to `/index.html` for client-side routing, caches `/assets/*` immutably for a year and `/icons/*`
for 30 days. `.vercel/project.json` holds the project and org ids and is gitignored.

## OpenStreetMap

Not a runtime call. Footprints were fetched once, matched **by name, never by proximity**, and
committed into `supabase/migrations/022_osm_building_footprints.sql`.

> Building geometry © OpenStreetMap contributors, available under the Open Database License
> (ODbL). The ODbL governs that geometry and applies independently of this repository's own
> licence.

## Related

[[(Note) Data Model]] · [[(Note) Deploy and Environment]] ·
[[(Note) Owner-Gated Ship Runbook]] · [[(Index) 40 Data & Integrations]]
