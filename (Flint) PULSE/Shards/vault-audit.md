---
id: 738ca7dc-2367-41aa-923d-63a6631b1988
title: "vault-audit"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/(Flint) PULSE"
---

> [!important] THIS FILE IS AN INSTRUCTION. WHEN REFERENCED IT IS MEANT TO BE TAKEN AS AN ACTION.

# Shard: vault-audit

**Checks this vault against itself.** The hub has `hub-audit`; this is its counterpart for
`(Flint) PULSE`.

1. **Frontmatter parses.** Every `.md` under `Mesh/`, `Shards/`, `Sources/`, `Media/` and
   `Exports/` must have a YAML block that parses. Every `id` must be a lowercase UUID.
2. ⚠️ **Tag list items must be quoted.** `- "#note"`, never `- #note`. An unquoted `#` starts a
   YAML comment and silently empties the tag list. This is the single most common breakage.
3. **Broken wikilinks: 0.** Resolve every `[[link]]` against the note set. Links carry the full
   `(Type) Name` and are never aliased.
4. **Orphans: 0.** Every note must be reachable from [[(Map) Master Map]].
5. **Required keys present.** `id`, `title`, `type`, `project`, `tags`, `status`, `created`,
   `updated`, plus `source_path` where relevant.
6. **Tag order.** Kind tag first, then `#project`, `#ld/living`, `#stack/react`,
   `#status/dormant`, `#cluster/university`.
7. **`health` is exactly one of** `green`, `amber`, `red` in [[(Report) Project Summary]].
   Nuance belongs in `health_note`, never in `health`.
8. **Every `source_path` resolves on disk.**
9. **Folders documented or excluded.** Cross-check [[(Report) Folder Audit]] against a fresh
   `find` of the codebase. Every folder is one or the other, with a reason.
10. **Every `> [!todo]` callout has a row** in [[(Report) Gaps & Questions]], and vice versa.
11. **No em dashes in body copy.** House voice.
12. **No secrets.** Grep the vault for anything resembling a key, a token or a `.env` value. The
    vault should contain variable **names** only.
13. Write findings into [[(Report) Build Log]], dated. Log an `audit` op. `flint sync`.

Findings become tasks. This shard reports and files. It repairs nothing except frontmatter
quoting.

## Related

[[codebase-map-refresh]] · [[changelog-from-git]] · [[onboarding-guide]] ·
[[(Report) Build Log]]
