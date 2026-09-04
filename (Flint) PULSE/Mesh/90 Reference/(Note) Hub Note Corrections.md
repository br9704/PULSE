---
id: 1c37f43e-21c1-449d-93f9-c6a444310bb7
title: "Hub Note Corrections"
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
source_path: "/Users/brunojaamaa/Desktop/Main Vault/Main/Mesh/Notes/Projects/(Note) PULSE — UniSpace.md"
---

# Hub Note Corrections ⚠️

**The hub note is five months out of date.** It carries `last_updated: 2026-08-06` but its
figures describe the repository as it stood on **2026-03-22**, before the audit and the entire
recovery phase. Repo wins over note. Every row below is a correction.

Source of the stale claims:
`/Users/brunojaamaa/Desktop/Main Vault/Main/Mesh/Notes/Projects/(Note) PULSE — UniSpace.md`

| # | Hub note says | Repo says | Evidence |
|---|---|---|---|
| 1 | Commits: **43**, 2026-03-19 to 2026-03-22, four days | **78**, 2026-03-19 to 2026-08-15 | `git rev-list --count HEAD` |
| 2 | Tracked: **146** files, 62 `.ts`, 34 `.tsx`, **17** `.sql` | **182** code files at depth 3, **22** migrations plus **8** seeds | `find`, `supabase/migrations/` |
| 3 | "Sprints 1 to 20 in four days" | Sprints **0 to 25** plus recovery sprints **R1 to R5** plus a documentation pass **D** | `MASTERPLAN.md` headings |
| 4 | "S20 Push notifications" as the tail end of the work | S20 was where the build **stopped compiling** for five sprints. The real tail end is Sprint D, 2026-08-15 | `WIRING-AUDIT.md`, `MASTERPLAN.md` § Project Status |
| 5 | "S16 zero ESLint errors" as a headline | Still true, and now backed by CI running `pnpm lint` on every push | `.github/workflows/ci.yml` |
| 6 | Live occupancy for 18 buildings implied as working | **No Supabase project is provisioned.** Every reading is a modelled estimate from committed fixtures | `README.md`, `PROJECT.json.honest` |
| 7 | "24-hour occupancy predictions from historical patterns plus live crowd data" | The prediction **engine** (Sprint 26, EWMA) was never built. What ships is a modelled weekly curve labelled as an estimate | `MASTERPLAN.md` Sprint 26 `[⏭]` |
| 8 | Google implied as an occupancy source | **Google provides no busyness data.** The Places API exposes no live or typical popularity. Google is used for opening hours only | `README.md` § Limitations |
| 9 | Docs in-repo: `PRD.md`, `MASTERPLAN.md`, `CLAUDE.md`, `README.md` | Also `WIRING-AUDIT.md`, `MOTION.md`, `PROJECT.json`, `AGENTS.md`, `GEMINI.md`, `LICENSE`, and two `ENGINEERPROMPT` files | `ls` at repo root |

## What the hub note gets right

- The privacy architecture is the headline, not a footnote. Correct, and now executable in **6**
  tests.
- The folder is `PULSE`, the package is `unispace`, the repo is `UniSpace`. Correct.
- The `CLAUDE.md` manual-actions checklist is where the pattern that became Hourglass's MANUAL
  QUEUE started. `CLAUDE.md` is **14,896 bytes**, last touched 2026-08-15, and still carries a
  sprint protocol.
- Same privacy stance as RIPPLE and ASCII Cam. Correct.
- RIPPLE is the sibling, best understood as a pair. Correct, and the shared PRD digest at
  `Mesh/Notes/Repo Docs/(Note) PULSE and RIPPLE — the PRD Pair.md` covers both.

## Recommended action

Refresh the hub note against [[(Report) Project Summary]]. The headline correction is that this
project did **not** stop at Sprint 20 in March. It stopped at Sprint 25 plus a full recovery
phase on **2026-08-15**, and the interesting engineering happened in the last two days.

## Related

[[(Report) Project Summary]] · [[(Note) Git History]] ·
[[(Note) The Wiring Audit and Recovery]] · [[(Report) Gaps & Questions]] ·
[[(Index) 90 Reference]]
