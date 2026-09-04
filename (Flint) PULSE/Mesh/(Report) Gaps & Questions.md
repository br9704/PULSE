---
id: 8bf2fd90-76c8-4923-b992-cab5a80f4e3d
title: "Gaps & Questions"
type: report
project: "PULSE"
tags:
  - "#report"
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

# Gaps & Questions ❓

**Eleven gaps.** Every one is something the repository does not answer, not something this vault
declined to look up. Where a `> [!todo]` callout appears elsewhere in the vault, it has a row
here.

| # | Gap | Where I looked | Note carrying the callout | Who can answer |
|---|---|---|---|---|
| 1 | **Is this assessed coursework?** No subject code, unit code, tutor, rubric, deadline or group roster anywhere | `README.md`, `PRD.md`, `MASTERPLAN.md`, `CLAUDE.md`, `AGENTS.md`, `PROJECT.json`, plus a grep for unit-code patterns across all root docs | [[(Note) Who It Is For]] | Bruno |
| 2 | **Is `brunojaamaa.dev/projects/unispace` live?** Unpushed commit `ca676cf` publishes a link to it | `README.md`, `PROJECT.json`, `package.json`. Nothing in the repo records the page's state. No network fetch performed | [[(Note) The Unpushed Commits]] | Bruno, one browser tab |
| 3 | **Exact `VAPID_*` server-side variable names.** The README documents them as a glob | `.env.example` (4 names only), `README.md` | [[(Note) Deploy and Environment]] | `supabase/functions/send-alerts/index.ts` |
| 4 | **Are `TerminalList.tsx`, `TerminalLoader.tsx` and `TypedLine.tsx` dead?** They look like SIGNAL residue after the visual revert | `git log` for commit `44d30c5`, the component tree. No import graph was traced | [[(Report) Folder Audit]] | An import-graph pass, or `knip` |
| 5 | **Accessible parking for any building.** No published source exists at all | `README.md`, `supabase/seed/005` and `007`, `MASTERPLAN.md` § 5 | [[(Note) Data Model]] | The University, not the repo |
| 6 | **Step-free entry for 17 of 18 buildings** | Same | [[(Note) Data Model]] | The University |
| 7 | **Opening hours for 13 of 18 buildings** | `supabase/seed/008_verified_hours_source.sql` | [[(Note) Data Model]] | The University |
| 8 | **Google Place IDs for 11 of 18 buildings.** Needs a Places API key | `PROJECT.json.ownerGated`, migration `013` | [[(Note) Data Model]] | Bruno, a Google Cloud key |
| 9 | **CC-licensed building photographs.** None sourced | `PROJECT.json.ownerGated`, `docs/media/` | [[(Note) Owner-Gated Ship Runbook]] | Bruno |
| 10 | **Lighthouse, throttled-3G, VoiceOver and PWA install results.** Never run | `README.md` § Limitations, `MASTERPLAN.md` Ship Runbook § 4 | [[(Note) The Test Suite]] | Bruno, real hardware |
| 11 | **The contents of the original migration `013`.** Applied to a cloud database, never committed, database since deleted | `WIRING-AUDIT.md`, `git log` across the `012` to `014` gap | [[(Note) Data Model]] | Nobody. Unrecoverable |

## Questions this vault answered rather than deferred

For the record, three things the hub note left open and the repository settles:

- **Where work stopped.** Not Sprint 20. Sprint 25, plus recovery sprints R1 to R5, plus a
  documentation pass, on 2026-08-15. See [[(Note) Hub Note Corrections]].
- **Whether the unpushed commits are safe.** They are. Both are documentation only, **3** added
  lines total. See [[(Note) The Unpushed Commits]].
- **Whether occupancy is real.** It is not. Every reading in the live demo is a modelled
  estimate. See [[(Note) What UniSpace Is]].

## Deliberately not investigated

| Thing | Reason |
|---|---|
| `.env.local` | Ground rule 3. Secrets are never opened |
| `.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json` | MCP configs can carry tokens. Names confirmed, contents not read |
| `node_modules/`, `dist/` | Ground rule 6 |
| Anything requiring a network fetch | Out of scope for a read-only local audit |
| Anything requiring a git write | Ground rule 1. No push, commit, stash, checkout, clean or reset |

## Related

[[(Report) Project Summary]] · [[(Report) Folder Audit]] · [[(Note) Hub Note Corrections]] ·
[[(Note) Owner-Gated Ship Runbook]] · [[(Map) Master Map]]
