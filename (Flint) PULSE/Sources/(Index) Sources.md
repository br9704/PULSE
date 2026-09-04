---
id: ea0349ba-17dd-4d02-92c9-41a54c0acb5c
title: "Sources"
type: index
project: "PULSE"
tags:
  - "#index"
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

# Sources

Everything this vault was built from. **All of it is local and read-only.** No network fetch was
performed at any point.

## Codebase reference

| | |
|---|---|
| Reference name | `PULSE` |
| Resolved path | `/Users/brunojaamaa/Desktop/PULSE` |
| Resolve with | `flint resolve codebase PULSE` |
| Declared in | `flint.toml` under `[references].codebases` |
| Status | ✓ fulfilled |

`Sources/Repos/` and `Sources/Bundles/` are Flint's own directories and are currently empty. No
external source or bundle has been imported.

## Primary documents read

All paths are absolute and none of these files was copied into the vault.

| Document | Lines | What it gave |
|---|---|---|
| `/Users/brunojaamaa/Desktop/PULSE/README.md` | 405 | Product, architecture diagram, verification, limitations, status |
| `/Users/brunojaamaa/Desktop/PULSE/MASTERPLAN.md` | 2,285 | Sprints 0 to 36, decisions log, risks, ship runbook |
| `/Users/brunojaamaa/Desktop/PULSE/PRD.md` | 1,326 | Six personas, phasing, feature specs, data models |
| `/Users/brunojaamaa/Desktop/PULSE/PROJECT.json` | n/a | Metrics, honest field, decisions, owner-gated list |
| `/Users/brunojaamaa/Desktop/PULSE/WIRING-AUDIT.md` | 211 | The forensic audit findings, via the masterplan's summary |
| `/Users/brunojaamaa/Desktop/PULSE/CLAUDE.md` | 295 | Sprint protocol, referenced not quoted |
| `/Users/brunojaamaa/Desktop/PULSE/AGENTS.md` | 33 | Aethereum MCP multi-agent protocol |
| `/Users/brunojaamaa/Desktop/PULSE/package.json` | n/a | Dependencies, scripts, package manager |
| `/Users/brunojaamaa/Desktop/PULSE/.github/workflows/ci.yml` | n/a | CI ordering and its two explanatory comments |
| `/Users/brunojaamaa/Desktop/PULSE/vercel.json` | n/a | Rewrites and cache headers |
| `/Users/brunojaamaa/Desktop/PULSE/.env.example` | n/a | ⚠️ Variable **names** only |
| `/Users/brunojaamaa/Desktop/PULSE/.gitignore` | n/a | The machine-local ignore block |

## Hub documents read

| Document | What it gave |
|---|---|
| `/Users/brunojaamaa/Desktop/Main Vault/Main/Mesh/Notes/Projects/(Note) PULSE — UniSpace.md` | The prior view, now corrected. See [[(Note) Hub Note Corrections]] |

## Git commands used

Read-only only, per ground rule 1.

```
git branch -a
git status --short
git remote -v
git log --oneline origin/main..HEAD
git log --oneline -30 --pretty=format:"%h|%ad|%s"
git rev-list --count HEAD
git shortlog -sne HEAD
git show --stat ca676cf
git show --stat 392ec5c
git show ca676cf
git show 392ec5c
```

⚠️ No `push`, `commit`, `stash`, `checkout`, `clean`, `reset` or `worktree` write of any kind.

## Never opened

`.env.local` · `.mcp.json` · `.cursor/mcp.json` · `.vscode/mcp.json` · `node_modules/` ·
`dist/` · `.git/` internals.

## Related

[[(Report) Build Log]] · [[(Report) Gaps & Questions]] · [[(Map) Master Map]]
