---
id: 52de55c8-2b17-4c13-ad20-7e8ff69de6f6
title: "codebase-map-refresh"
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

# Shard: codebase-map-refresh

**Re-derives the codebase map from disk. Never from memory, never from the last version of this
vault.** Run it after any sprint, any dependency bump, or whenever a count in the vault looks
suspicious.

Target: `flint resolve codebase PULSE`, which is `/Users/brunojaamaa/Desktop/PULSE`.

1. Confirm zero dataless iCloud files first:
   `find /Users/brunojaamaa/Desktop/PULSE -type f -flags +dataless 2>/dev/null | head -20`.
   Any output means stop, because reading one hangs indefinitely.
2. Recount, do not restate. Files per directory, excluding `node_modules/`, `dist/`, `.git/` and
   `.DS_Store`. Update [[(Report) Folder Audit]] and [[(Index) Complete File Inventory]].
3. Re-list `src/components/`, `src/hooks/`, `src/lib/` and `supabase/migrations/` in full. New
   migrations are the most common drift.
4. Re-read `package.json`. Any dependency added or removed changes
   [[(Note) System Architecture]] § Stack.
5. Re-read `src/App.tsx` for routes and `supabase/functions/` for endpoints. Update
   [[(Note) Routes and Surfaces]].
6. `grep -rE 'TODO|FIXME|HACK|XXX' src supabase scripts`. The recorded figure is **0**. If it is
   no longer 0, list every one in [[(Note) The src Tree]].
7. Re-run the test count from `pnpm test` output, not from the README. The recorded figure is
   **388 across 33 files**.
8. Trace the import graph for `TerminalList.tsx`, `TerminalLoader.tsx` and `TypedLine.tsx`.
   They are flagged suspect in [[(Report) Folder Audit]] and the flag should be resolved.
9. Log a `sync` op to `OBSIDIANLOG.md` via
   `/Users/brunojaamaa/Desktop/Main Vault/Main/Shards/tools/obsidianlog.mjs`.
10. `flint sync`.

**Read-only outside the vault.** No git writes. See [[(System) Flint Init]].

## Related

[[vault-audit]] · [[changelog-from-git]] · [[(Report) Folder Audit]] · [[(Note) The src Tree]]
