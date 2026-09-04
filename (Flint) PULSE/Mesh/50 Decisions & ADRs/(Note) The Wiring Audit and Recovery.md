---
id: 8dae5190-8dd1-4285-9fde-699104890699
title: "The Wiring Audit and Recovery"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/WIRING-AUDIT.md"
---

# The Wiring Audit and Recovery ⚠️

**On 2026-08-14 an audit treated 199 completed checkmarks as claims rather than facts. All three
load-bearing claims were false.** Six recovery sprints followed. This is the most useful thing in
the repository and the reason the test suite looks the way it does.

## The three false claims

1. **The Supabase project had been deleted.** Ref `kvagntgpiylxhjntexml` returned NXDOMAIN on
   three independent resolvers while `supabase.co` itself resolved fine. No database, no seeds,
   no Realtime, no deployed Edge Functions. It took with it migration `013`, which had been
   applied to the cloud and never committed. That work is unrecoverable.
2. **Tailwind v4 was installed against v3 CSS syntax**, so the theme scale never loaded and every
   utility drawing a value from it silently emitted nothing. `.p-4`, `.gap-2`, `.text-sm`,
   `.font-semibold` and `.rounded-lg` emitted **no CSS at all**. Only **53** non-Mapbox utilities
   existed in the entire shipped bundle. This is why surfaces looked unstyled.
3. **`pnpm build` had been failing for five sprints.** `tsc -b` threw 4 errors. The project had
   not compiled since **Sprint 20**, because the audit step ran `vite build`, which succeeds
   while `tsc -b` fails.

What *was* genuinely sound: the privacy path, verified end to end, 140 passing unit tests at the
time, and the React-level data plumbing in `MapPage.tsx`. The components were real. Everything
underneath them was broken.

Full findings: `/Users/brunojaamaa/Desktop/PULSE/WIRING-AUDIT.md`, **211** lines.

## The six recovery sprints

| Sprint | What it did |
|---|---|
| **R1** | Foundation repair: the three root causes. Tailwind v3 to v4, the build gate, the CSS assertion |
| **R2** | Local fixture layer, generated from the committed seed SQL |
| **R3** | SIGNAL design system and component decomposition. The visual layer was later reverted, the decomposition stands |
| **R4** | `MOTION.md` implementation, with its acceptance checklist folded into the sprint gate verbatim |
| **R5** | Re-verify Sprints 13 to 17 against the fixture layer |
| **D** | Documentation pass, 2026-08-15. README rewritten against verified artifacts, `PROJECT.json` added |

Each sprint left behind a test whose job is to make that failure mode impossible rather than
merely fixed. The CSS assertion compiles the real stylesheet and checks the **build output**,
because a source-level check would have passed happily throughout the outage.

## The P0 that R2 surfaced

Rebuilding the data layer as fixtures immediately surfaced a bug that would have shipped.
`blendOccupancy` checked whether occupancy data was *fresh* but not whether it was *real*, and
since `aggregate-occupancy` rewrites every row every ten seconds, a campus with zero users would
have reported every building as `Live · 0%`, confidently telling a student that a full library
was empty.

All **23** existing blending tests passed throughout, because the test helper defaulted to
`data_quality: 'live'` and no test ever varied it.

## The last bug found

The first line on the home screen announced **CAMPUS IS BUSY** while average occupancy read
**14%** and every building on the list said EMPTY.

The cause was a single fallback: `occupancy?.pct ?? 100` scored a building with *no reading* as
completely full, and **13 of 18** buildings have no reading, so the app declared a crowded campus
on the strength of missing data. It now judges quiet against only the buildings that reported,
and names its own denominator: "5 of 5 buildings with a reading are under 50%".

Absent data had been quietly rounded to bad news, in the one line a user reads first, which is
the failure the whole project is organised against.

## The pattern that repeats

Three separate bugs in this project have had the same shape: **the stylesheet cannot be verified
by reading it, only by measuring what a browser computes.** The Tailwind outage, the contrast
regression and the `road-simple` layer-id mismatch are all instances.

## The risks that were realised, not hypothetical

`MASTERPLAN.md` § Known Risks marks two rows **Realised once**:

- **Checkmarks drift from reality.** It already happened at scale. Mitigations: `pnpm build`
  never `vite build` at every gate, the R1.2 built-CSS assertion in CI, mark tasks live rather
  than batched, re-observe rather than infer.
- **Silent build-config failure.** Tailwind emitted no theme-scale CSS for an unknown number of
  sprints and nothing caught it. Any future framework major-version bump gets the same treatment.

## Related

[[(Note) The Four Load-Bearing Decisions]] · [[(Note) The Test Suite]] ·
[[(Note) Data Model]] · [[(Note) Git History]] · [[(Index) 50 Decisions & ADRs]]
