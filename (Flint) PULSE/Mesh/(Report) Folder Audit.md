---
id: 699349f2-c63a-4fcc-ab63-89829cf0cbec
title: "Folder Audit"
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

# Folder Audit

**Every folder in `/Users/brunojaamaa/Desktop/PULSE` is either documented below or listed as
excluded with a reason. Nothing is unaccounted for.** Read-only pass, 2026-08-17. Zero dataless
iCloud files found under the project root.

## Top-level folders

### `src/` 🟢

| | |
|---|---|
| Path | `/Users/brunojaamaa/Desktop/PULSE/src` |
| Purpose | The entire React client. Every route, component, hook and pure function |
| Files | **178** |
| Size | **1.2 MB** |
| Modified | 2026-03-19 to 2026-08-15 |

Subdirectories: `components/` (70), `lib/` (57), `hooks/` (32), `constants/` (8), `pages/` (4),
`types/` (2), `stores/` (1).

Top files: `App.tsx` (four routes), `main.tsx` (entry), `index.css` (Tailwind v4 theme),
`lib/dataSource.ts` (the one read seam), `lib/zoneDetection.ts` (the privacy boundary),
`lib/blending.ts` (source precedence), `lib/confidence.ts` (three-tier definition),
`lib/fixtures/seedData.generated.ts` (generated, never hand-edited).

Dependencies: React 19, Mapbox GL, Turf, Zod, Recharts, Framer Motion, Radix, Supabase client.

⚫ **`src/stores/` is empty**, holding only a `.gitkeep`. State lives in hooks. Dead scaffolding
from an earlier plan, harmless. The same applies to `.gitkeep` files in `components/`,
`constants/`, `hooks/`, `lib/`, `pages/` and `types/`, all of which are now populated.

🟡 **Two components look like residue from the reverted SIGNAL design system**:
`TerminalList.tsx`, `TerminalLoader.tsx`, and possibly `TypedLine.tsx`. The visual layer they
belong to was retired in commit `44d30c5`. They are not obviously dead, since the decomposition
work survived the revert, but they are the first place to check for dead code.

See [[(Note) The src Tree]].

### `supabase/` 🟡

| | |
|---|---|
| Path | `/Users/brunojaamaa/Desktop/PULSE/supabase` |
| Purpose | Postgres schema, seed data, and 7 Deno Edge Functions. Committed, never hosted |
| Files | **40** |
| Size | **404 KB** |
| Modified | 2026-03-19 to 2026-08-15 |

`migrations/` holds **22** numbered SQL files. `seed/` holds **8**. `functions/` holds **7**
directories, each with one `index.ts`.

⚫ **Nothing here has ever run against a live database.** The project it targeted was deleted.
This is deliberate, on cost grounds. See [[(Note) Data Model]].

### `scripts/` 🟢

| | |
|---|---|
| Path | `/Users/brunojaamaa/Desktop/PULSE/scripts` |
| Purpose | The seed-to-fixture pipeline |
| Files | **2** |
| Size | **24 KB** |
| Modified | 2026-08-15 |

`parseSeedSql.mjs` parses `supabase/seed/*.sql`. `generateFixtures.mjs` emits
`src/lib/fixtures/seedData.generated.ts`. Run via `pnpm generate:fixtures`. Historically the most
productive place in the repo to find bugs, because everything downstream inherits its mistakes.

### `public/` 🟢

| | |
|---|---|
| Path | `/Users/brunojaamaa/Desktop/PULSE/public` |
| Purpose | Static assets served at the root |
| Files | **5** |
| Size | **16 KB** |
| Modified | 2026-03-19 to 2026-08-14 |

`favicon.svg`, plus `icons/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` for the PWA
manifest. Generated in commit `2a848d4`.

### `docs/` 🟢

| | |
|---|---|
| Path | `/Users/brunojaamaa/Desktop/PULSE/docs` |
| Purpose | README screenshots only |
| Files | **5** |
| Size | **2.5 MB** |
| Modified | 2026-08-15 |

`media/hero.png`, `home.png`, `map.png`, `card.png`, `find.png`. Re-shot four times during the
documentation pass as the design settled. Not copied into this vault, per the no-large-files
rule. See [[(Note) Media]].

### `.github/` 🟢

| | |
|---|---|
| Path | `/Users/brunojaamaa/Desktop/PULSE/.github` |
| Purpose | CI |
| Files | **1** |
| Size | **4 KB** |
| Modified | 2026-08-15 |

`workflows/ci.yml`. One job: lint, build, test, in that order, with two explanatory comments that
are load-bearing. See [[(Note) Deploy and Environment]].

### `.claude/`, `.codex/`, `.cursor/`, `.vscode/` ⚫ agent config

| Folder | Files | Contents |
|---|---|---|
| `.claude/` | 3 | `RESUME.md`, `settings.json`, `settings.local.json` |
| `.codex/` | 2 | `config.toml`, `hooks.json` |
| `.cursor/` | 3 | `hooks.json`, `mcp.json`, `rules/aethereum.mdc` |
| `.vscode/` | 1 | `mcp.json` |

All four are **gitignored** as of commit `1bc9d7a`. They are machine-local AI agent tooling, not
project code. `.cursor/rules/aethereum.mdc` and the `mcp.json` files configure the Aethereum MCP
server described in `AGENTS.md`. Not opened beyond confirming their names, since `mcp.json` files
can carry tokens.

### `.vercel/` ⚫ deploy metadata

**2** files, gitignored. `project.json` holds the project id, org id and project name
(`unispace`). `README.txt` is Vercel's own boilerplate.

## Excluded, with reasons

| Folder | Reason for exclusion |
|---|---|
| `node_modules/` | Dependency tree. Reproducible from `pnpm-lock.yaml`. Ground rule 6 |
| `dist/` | Build output, **21** files, **3.0 MB**. Reproducible via `pnpm build`. Ground rule 6. Load-bearing for `bundleBudget.test.ts` and `index.css.test.ts`, which assert against it |
| `.git/` internals | Read-only git commands only, per ground rule 1 |
| `.env.local` | ⚠️ Secrets. Never opened. Names taken from `.env.example` only, per ground rule 3 |
| `.DS_Store` files | macOS Finder metadata, 3 of them |

No `*silmu*`, `_secrets/`, `.next/`, `build/`, `coverage/`, `.cache/` or `.turbo/` directory
exists in this project.

## Duplicate and dead flags

| Flag | Detail |
|---|---|
| 🟡 Duplicate | `AGENTS.md` and `GEMINI.md` are **byte-identical**, both 3,829 bytes, both dated 2026-08-14. Two names for the same agent-protocol file, one per tool that reads it. Both are gitignored as of unpushed commit `392ec5c` |
| ⚫ Dead | `src/stores/` contains nothing but `.gitkeep` |
| 🟡 Suspect | `TerminalList.tsx`, `TerminalLoader.tsx`, `TypedLine.tsx` may be SIGNAL residue |
| 🟡 Legacy tables | `google_popular_times` and `google_popularity_cache` are residue from the belief that Google supplies busyness data. It does not |
| ⚫ Stale worktree | A detached-HEAD git worktree at a `/private/tmp/claude-501/...` scratchpad path, pinned at `91aa01e3b1ec`, labelled `pre-r3`. Prunable |

## Related

[[(Index) Complete File Inventory]] · [[(Note) The src Tree]] · [[(Report) Gaps & Questions]] ·
[[(Report) Project Summary]] · [[(Map) Master Map]]
