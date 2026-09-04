---
id: c2605b2b-7181-4bda-b2a2-6d3b2c87ae48
title: "The Unpushed Commits"
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

# The Unpushed Commits ⚠️

**Two commits sit on local `main` ahead of `origin/main`. Both are documentation only. Both are
safe to publish.** The repository is **public** at `github.com/br9704/UniSpace`, so pushing
publishes them immediately.

Working tree is **clean**, zero dirty files. Branch is `main`, tracking `origin/main`.

## `392ec5c` chore: ignore agent-protocol files so they are not re-tracked

2026-08-15 22:17 +1000. **1 file changed, 2 insertions, 0 deletions.**

```
.gitignore | 2 ++
+AGENTS.md
+GEMINI.md
```

That is the entire diff. It appends two filenames to the existing machine-local ignore block.
🟢 **Safe.** It publishes nothing. It stops two agent-protocol files from being re-tracked.

## `ca676cf` docs: link the case study on brunojaamaa.dev

2026-08-15 23:03 +1000. **2 files changed, 3 insertions, 0 deletions.**

```
PROJECT.json | 1 +
README.md    | 2 ++
```

`PROJECT.json` gains one key inside its existing `links` object:

```json
"caseStudy": "https://brunojaamaa.dev/projects/unispace",
```

`README.md` gains one line in the centred header block, linking the same URL.

🟢 **Safe.** No credentials, no tokens, no private paths, no personal data beyond a public
portfolio domain already named in `package.json` under `author` and in the README's Author
section.

## Verdict

**Both commits are safe to publish.** Nothing in either diff is sensitive. The combined change
is **3 added lines** across three files, all of it documentation.

## Why they were held back anyway

The commits do one substantive thing: they announce a case study at
`https://brunojaamaa.dev/projects/unispace`. Pushing puts that link in the README of a public
repository and in the machine-readable `PROJECT.json` that portfolio tooling reads.

> [!todo] Missing, not found in the repository
> Whether `brunojaamaa.dev/projects/unispace` is live. Nothing in the repo records the state of
> that page, and this vault does not fetch the network. If the page does not exist yet, pushing
> publishes a broken link on the front page of a public repo.

**That is the decision, and it is a publishing decision rather than a security one.** Confirm
the case study page is live, then push. If it is not live, hold `ca676cf` and push `392ec5c`
alone, which carries no external claim at all.

## Ground rule observed

Nothing in this vault pushed, committed, stashed, checked out, cleaned or reset anything. Only
`git log`, `git show --stat`, `git status`, `git branch` and `git shortlog` were used.

## One incidental finding

`flint resolve codebase PULSE` reports a second git worktree in detached HEAD at
`/private/tmp/claude-501/-Users-brunojaamaa-Desktop-PULSE/b022b67e-f25e-4e4a-a9a0-9f8e9186b9a1/scratchpad/pre-r3`,
pinned at `91aa01e3b1ec`. It is a scratchpad worktree from an earlier session, in a temp
directory, and it holds a pre-R3 snapshot. Not touched. Worth removing at some point with
`git worktree prune` once its temp path is gone.

## Related

[[(Note) Git History]] · [[(Note) Deploy and Environment]] ·
[[(Report) Project Summary]] · [[(Index) 70 Ops, Deploy & Env]]
