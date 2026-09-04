---
id: 993e16ad-3550-4671-bf91-9870324955f6
title: "The Test Suite"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/src/lib"
---

# The Test Suite 🟢

**388 tests across 33 files, no DOM required.** Component logic is extracted into pure functions
and tested there. Vitest 4, run in CI after the build so the output-asserting tests have a
`dist/` to read.

Distribution: **24** test files in `src/lib/`, **5** in `src/lib/fixtures/`, **2** in
`src/constants/`, **1** in `src/hooks/`, **1** at `src/index.css.test.ts`.

## The five that assert properties, not behaviour

This is the part worth stealing.

| File | Tests | What it makes impossible |
|---|---|---|
| `src/lib/privacy.test.ts` | **6** | Persisting a session id, writing one in an Edge Function mutation, putting a coordinate in a request body, adding an analytics SDK, exposing the Google key to the client, or giving `zoneDetection` a side effect |
| `src/lib/contrast.test.ts` | **17** | Any text token dropping below WCAG AA. Ratios are computed from `index.css`, not inspected |
| `src/lib/bundleBudget.test.ts` | **4** | The landing route exceeding budget, or Mapbox or Recharts reappearing on it. Measures the real `dist/` output |
| `src/index.css.test.ts` | **14** | A framework config change silently emitting no CSS. Compiles the stylesheet through Vite and asserts against build output |
| `src/lib/dialogDismissal.test.ts` | **8** | A `role="dialog"` reachable only by pointer. Finds every dialog in the tree and requires each to route through the one shared dismissal hook |

`dialogDismissal.test.ts` is the clearest argument for writing tests this way. Two sheets were
dismissible only by backdrop tap or drag, and they cover the tab bar, so a keyboard user who
opened a building card was trapped behind it (WCAG 2.1.2). There *was* a test that pressed
Escape, and it passed on the bug, because it never asserted the sheet had actually gone.
Replacing it with an invariant over every dialog in the tree immediately surfaced a third one
nobody had noticed.

## Other enforced invariants

- No animation may ignore `prefers-reduced-motion` (`motion.test.ts`).
- An estimate may never render as a live reading (`confidence.test.ts`).
- No building may carry occupancy curves for a day it is closed
  (`lib/fixtures/seedData.test.ts`).
- No clickable `div` may reappear where a `<button>` belongs (`a11y.test.ts`).
- Every external payload is parsed through a Zod schema (`schemas.test.ts`).
- Fixtures and the committed seed SQL may not drift apart (`lib/fixtures/pipeline.test.ts`).

## The CI ordering matters

`.github/workflows/ci.yml` runs lint, then build, then test, in that order, on push to `main`
and on every pull request. Two comments in the workflow explain why:

**`pnpm build` runs `tsc -b` before `vite build`. Never `vite build` alone**, because it
succeeds while `tsc -b` fails, which is how three fatal defects passed two separate audits.

**Test runs after build on purpose.** `bundleBudget.test.ts` and `index.css.test.ts` assert
against the real `dist/` output and skip themselves when it is absent, so a source-level check
would have passed happily throughout the Tailwind outage.

## What the tests do not cover

> [!todo] Missing, not found in the repository
> Lighthouse scores, throttled-3G behaviour, VoiceOver, PWA install on real iOS and Android
> hardware, and two motion claims that need a screen recorder. All are listed in the README's
> Limitations section and in the Ship Runbook § 4 as owner-gated, because they need physical
> devices.

There is also no end-to-end browser test and no visual regression suite. Given that three of the
project's bugs were "the stylesheet cannot be verified by reading it, only by measuring what a
browser computes", that is the most defensible place to add coverage next.

## Related

[[(Note) The Privacy Firewall]] · [[(Note) The Wiring Audit and Recovery]] ·
[[(Note) Install Run and Test]] · [[(Index) 20 Codebase Map]]
