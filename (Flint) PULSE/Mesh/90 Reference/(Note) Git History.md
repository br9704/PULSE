---
id: b77c3946-ef3c-4583-96a9-5a203a8c6bf6
title: "Git History"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/.git"
---

# Git History

**78 commits, one branch, one author, spanning 2026-03-19 to 2026-08-15.** Working tree clean.
Two commits unpushed.

| | |
|---|---|
| Branches | `main` only. `origin/HEAD` points at `origin/main`. No feature branches, local or remote |
| Remote | `https://github.com/br9704/UniSpace.git`, fetch and push. ⚠️ **Public** |
| First commit | `bac7b32`, 2026-03-19 |
| Last commit | `ca676cf`, 2026-08-15 |
| Author | Bruno Jaamaa, all 78 |
| Unpushed | `392ec5c`, `ca676cf`. See [[(Note) The Unpushed Commits]] |

## The two working periods

The history has a five-month gap. Commits cluster into March (initial build through Sprint 20)
and August 14 to 15 (the audit, the six recovery sprints, Sprints 21 to 25, and the
documentation pass). The August burst is where most of the interesting work happened.

## Last 30 commits

| SHA | Date | Subject |
|---|---|---|
| `ca676cf` | 2026-08-15 | docs: link the case study on brunojaamaa.dev ⚠️ unpushed |
| `392ec5c` | 2026-08-15 | chore: ignore agent-protocol files so they are not re-tracked ⚠️ unpushed |
| `1bc9d7a` | 2026-08-15 | chore: untrack machine-local and agent config |
| `9206765` | 2026-08-15 | docs(D): re-shoot at b399fd8, record the map and dialog lessons |
| `9cfea23` | 2026-08-15 | docs: record the visual-layer pass and the three bugs it uncovered |
| `b399fd8` | 2026-08-15 | fix: raise contrast throughout, and let a keyboard close a dialog |
| `1441191` | 2026-08-15 | docs(D): re-shoot at the final design, and record the headline bug |
| `94fa66e` | 2026-08-15 | feat: make it read as a product rather than a terminal |
| `781892d` | 2026-08-15 | docs(D): re-shoot the media without the collapsed-spacing bug |
| `3b7612a` | 2026-08-15 | fix: the reset was silently killing every spacing utility in the app |
| `9db7bc1` | 2026-08-15 | docs(D): re-capture the media at the settled design, correct the moved figures |
| `2f80bb7` | 2026-08-15 | feat: restore the pre-SIGNAL rhythm to the home page |
| `7e217b9` | 2026-08-15 | feat: finish the pre-SIGNAL port, base styles and the monospace voice |
| `98e4f5b` | 2026-08-15 | docs(D): rewrite the README against verified artifacts, add PROJECT.json |
| `8b7991b` | 2026-08-15 | fix: strip invented precision from building copy, correct CLAUDE.md refs |
| `922b907` | 2026-08-15 | perf: stop shipping a database client to an app with no database |
| `44d30c5` | 2026-08-15 | feat: retire SIGNAL, restore the UoM palette |
| `4ce2726` | 2026-08-15 | fix: put real building footprints on the map |
| `f108ce4` | 2026-08-15 | docs: park the backend, correct every count, and read as a public repo |
| `d5f5207` | 2026-08-15 | feat: validate what we read, and stop asserting what we never checked |
| `db5cf35` | 2026-08-15 | fix: repair the silently dropped fonts and harden the Edge Functions |
| `7dd7df0` | 2026-08-15 | fix: verified UoM hours and an honest accessibility model |
| `734e2e5` | 2026-08-14 | deploy: UniSpace is live at unispace-tawny.vercel.app |
| `2a848d4` | 2026-08-14 | chore: generate VAPID keys and real SIGNAL PWA icons |
| `816c6c9` | 2026-08-14 | docs: close the masterplan, 0 open engineering tasks |
| `1175956` | 2026-08-14 | docs: honest README, shared BottomSheet, final audit clean |
| `3849ade` | 2026-08-14 | feat(S21,S24,S25): offline resilience, room directory, feedback |
| `8fbbfa7` | 2026-08-14 | perf(S22): cut the landing route from 637 KB to 189 KB gzip |
| `c58188c` | 2026-08-14 | feat(S23,S19): error states and accessibility |
| `b4f8a0a` | 2026-08-14 | feat(R5): re-verify S13-S17, and make the privacy promise executable |

`8fbbfa7` says **189 KB** and the README says **169 KB**. Both are correct at their own point in
time: later commits shaved a further 20 KB off the landing route. The current figure of 169 KB
is the one asserted by `bundleBudget.test.ts` against `dist/`.

## Related

[[(Note) The Unpushed Commits]] · [[(Note) The Wiring Audit and Recovery]] ·
[[(Note) Hub Note Corrections]] · [[(Index) 90 Reference]]
