---
id: 8f69d77f-e89b-46cd-94f8-106f90d78267
title: "The Four Load-Bearing Decisions"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/PROJECT.json"
---

# The Four Load-Bearing Decisions

`PROJECT.json` records four decisions under `built.decisions`. Each is reproduced here with its
stated reason, and each is verifiable against the code.

## 1. Client-side zone matching with Turf.js

**Why.** Once a raw coordinate reaches a server, "we never see where you are" becomes
unverifiable from outside. Only a `zone_id` crosses the wire, so a stranger can check the claim
in the network tab.

**Where.** `src/lib/zoneDetection.ts`, asserted pure by `privacy.test.ts`. See
[[(Note) The Privacy Firewall]].

## 2. One read seam instead of hooks calling Supabase directly

**Why.** It made the app runnable with no backend, and let the same fixtures generated from the
committed seed SQL serve as integration test data, so production and test data cannot drift.

**Where.** `src/lib/dataSource.ts` exposes `fetchRows` and `subscribeRows`. Nothing above it
knows the source. See [[(Note) System Architecture]].

## 3. The backend is committed but never hosted

**Why.** Hosted Postgres, Realtime and Edge Functions cost money monthly on a portfolio project.
Parked deliberately rather than left pending, and the README says so.

**Consequence.** Every occupancy figure in the live demo is a modelled estimate. The
live-crowdsourced path has never run against real users. Twelve Ship Runbook items are marked
parked downstream of this decision. See [[(Note) Owner-Gated Ship Runbook]].

## 4. Unverified data renders `[?]` rather than a default

**Why.** Wrong accessibility data is harmful rather than merely inaccurate. A schema that can
only say yes or no cannot express "nobody has checked", which was the true answer for most
buildings.

**Where.** Migrations `018` through `021`. See [[(Note) Data Model]].

## The measurement decisions

`PROJECT.json` also records four things that were measured rather than assumed, and measurement
changed the answer more than once.

- Landing route went from **637 KB** to **169 KB** gzip, measured from build output at every
  step. A budget test fails if Mapbox or Recharts reappear on it.
- Naming a Recharts chunk made the landing route **108 KB worse**, because it was already
  correctly split behind a lazy import and naming it caused the bundler to hoist it into a
  static import. An optimisation that made things worse, in the name of shrinking them.
- WCAG contrast computed from `index.css` rather than inspected caught a **2.56:1** token
  carrying **49** pieces of real content, and later blocked a palette revert that failed **13**
  assertions.
- **1,156** occupancy curve rows, recounted from the committed seeds after three different
  figures appeared in the repo.

## The design revert

Sprint R3 applied a dark single-accent design system called **SIGNAL**, with a monospace
"instrument voice" throughout. Its component decomposition and accessibility work stand and are
load-bearing. **The visual layer was reverted on 2026-08-15**: university navy and azure on a
light ground, the monospace dropped across **113** elements, and the terminal affordances
replaced with words and icons.

One thing the revert deliberately did **not** restore is the coloured occupancy percentage on
each home tile. The original green measures about **2.2:1** on the card, under the **3:1** floor
for large text. The colour lives on the stripe and the bar instead. Putting it back would have
been a regression sold as a revert.

Restoring the university palette's literal gold (**2.02:1**) and green (**2.42:1**) failed 13
contrast assertions, so the shipped values are hue- and saturation-preserved and darkened until
they pass.

## Related

[[(Note) The Wiring Audit and Recovery]] · [[(Note) The Privacy Firewall]] ·
[[(Note) Data Model]] · [[(Index) 50 Decisions & ADRs]]
