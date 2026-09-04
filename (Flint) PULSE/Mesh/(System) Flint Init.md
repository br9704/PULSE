---
id: 3cb138a6-8f49-416f-ae5b-db4592816f1e
title: "Flint Init"
type: system
project: "PULSE"
tags:
  - "#system"
  - "#f/init"
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

# Flint Init

**This vault documents `/Users/brunojaamaa/Desktop/PULSE`, the UniSpace campus occupancy PWA.**
It is a knowledge layer over a codebase, not the codebase. Nothing here is imported by anything
that runs.

## What this Flint is

| | |
|---|---|
| Flint name | `PULSE`, registered in `~/.nuucognition/flint/` |
| Vault path | `/Users/brunojaamaa/Desktop/PULSE/(Flint) PULSE` |
| Codebase | `/Users/brunojaamaa/Desktop/PULSE`, referenced as codebase `PULSE` |
| Cluster | `university` |
| Parent hub | [[(Guide) BRUNO HQ]] |
| Built | 2026-08-17, flint-cli 0.6.0-dev.21 |

Resolve the codebase from anywhere with `flint resolve codebase PULSE`.

## Read it in this order

1. [[(Report) Project Summary]] for the verdict and the numbers.
2. [[(Map) Master Map]] for everything else, with a "start here if you want to" table.
3. [[(Report) Gaps & Questions]] for what the repository does not answer.

## The rules this vault was built under

- **Read-only outside the vault.** Nothing in the codebase was moved, renamed, deleted or
  reformatted. The single exception is `/Users/brunojaamaa/Desktop/PULSE/OBSIDIANLOG.md`, which
  this build appends operation rows to by design.
- **Git was read, never written.** Only `log`, `show --stat`, `status`, `branch` and `shortlog`.
  ⚠️ **Nothing was pushed.** The two unpushed commits are unpushed on purpose because the remote
  is public. See [[(Note) The Unpushed Commits]].
- **No invented facts.** Anything the repository does not state carries a `> [!todo]` callout
  naming where the search happened, and a row in [[(Report) Gaps & Questions]].
- **No secrets.** Environment variable **names** only. `.env.local` was never opened.
- **No large files copied.** Screenshots and build output are linked by absolute path via
  `source_path:`.
- **Repo wins over note.** Where the hub note and the repository disagree, the repository is
  recorded and the disagreement is logged in [[(Note) Hub Note Corrections]].

## Sections

`00 Overview` · `10 Architecture` · `20 Codebase Map` · `30 Setup & Run` ·
`40 Data & Integrations` · `50 Decisions & ADRs` · `60 Roadmap, Tasks & Ideas` ·
`70 Ops, Deploy & Env` · `90 Reference`

There is no `80 Testing & Quality` section. Testing is the project's strongest property and is
covered in [[(Note) The Test Suite]] under `20 Codebase Map`, which is where the code it asserts
against lives.

## Shards

Four project shards live in `Shards/`. Each is an instruction, meant to be acted on when
referenced.

[[codebase-map-refresh]] · [[changelog-from-git]] · [[onboarding-guide]] · [[vault-audit]]

## Related

[[(Map) Master Map]] · [[(Report) Project Summary]] · [[(Report) Build Log]] ·
[[(Guide) BRUNO HQ]]
