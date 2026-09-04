---
id: d576a65a-2152-48e7-8668-8d7e5015646d
title: "onboarding-guide"
type: shard
project: "PULSE"
tags:
  - "#shard"
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

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

# Shard: onboarding-guide

**Brings a person or an agent from zero to productive on UniSpace in under thirty minutes.**
Follow it in order.

## Read, in this order

1. [[(Report) Project Summary]]. Verdict, numbers, top risks, next five actions.
2. [[(Note) What UniSpace Is]]. The product and the honesty problem it exists to solve.
3. [[(Note) The Privacy Firewall]]. The one claim everything else bends around.
4. [[(Note) System Architecture]]. The diagram and the two shaping decisions.
5. [[(Note) The Wiring Audit and Recovery]]. Read this before touching anything. It explains
   why the tests look unusual and why `pnpm build` matters.

## Run it

```bash
cd /Users/brunojaamaa/Desktop/PULSE
pnpm install
cp .env.example .env.local     # add VITE_MAPBOX_TOKEN only
pnpm test                      # expect 33 files, 388 tests
pnpm dev
```

Full detail in [[(Note) Install Run and Test]].

## The five rules of this codebase

1. **Never `vite build` alone.** Always `pnpm build`, which is `tsc -b && vite build`. The gap
   between them shipped a non-compiling project for five sprints.
2. **Never assert what you have not observed.** A checkmark is a claim. The project has already
   been burned by **199** of them.
3. **Never set a data flag `false` from an absence of evidence.** Nullable means nobody checked,
   and the UI renders `[?]`.
4. **Never put a coordinate in a request body.** `privacy.test.ts` will fail the build, and it
   should.
5. **Never edit `src/lib/fixtures/seedData.generated.ts` by hand.** Edit `supabase/seed/` and
   run `pnpm generate:fixtures`.

## Where to make a change

| Change | Start at |
|---|---|
| A route or page | `src/App.tsx`, then `src/pages/` |
| Occupancy logic | `src/lib/blending.ts`, `src/lib/confidence.ts` |
| Data shape | `supabase/migrations/`, then re-run `pnpm generate:fixtures` |
| A new dialog | `src/components/ui/BottomSheet.tsx` plus `useDismissOnEscape`, or the test fails |
| Anything visual | Check `src/lib/contrast.test.ts` will still pass. It computes ratios, it does not trust you |

## Before you claim to be done

`pnpm lint && pnpm build && pnpm test`, in that order, all green. Then update
[[(Report) Build Log]] and log an op to `OBSIDIANLOG.md`.

## Related

[[codebase-map-refresh]] · [[vault-audit]] · [[(Note) Install Run and Test]] ·
[[(Note) The Test Suite]]
