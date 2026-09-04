---
id: f4a0a48d-e9b7-419d-8d05-4ddbcc2de6c4
title: "Deploy and Environment"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/vercel.json"
---

# Deploy and Environment 🟢

**Live at `https://unispace-tawny.vercel.app`, deployed 2026-08-14 at commit `734e2e5`.** Vercel
project `unispace`. Static SPA build, no server runtime.

## Vercel configuration

`vercel.json` does three things:

- Rewrites every path to `/index.html`, so client-side routes deep-link correctly.
- Caches `/assets/*` with `public, max-age=31536000, immutable`, a full year.
- Caches `/icons/*` with `public, max-age=2592000`, thirty days.

`.vercel/project.json` holds the project id and org id. It is gitignored and was read only to
confirm the project name.

## CI

`.github/workflows/ci.yml`, one job named `verify`, on push to `main`, on every pull request,
and on manual dispatch.

```
pnpm/action-setup@v4  version 11.13.0
actions/setup-node@v4 node 24, pnpm cache
pnpm install --frozen-lockfile
pnpm lint
pnpm build     # tsc -b && vite build
pnpm test
```

Order is deliberate. See [[(Note) The Test Suite]] for why test runs after build.

There is no deploy step in CI. Vercel builds from the GitHub integration.

## Environment variables

⚠️ Names only. `.env.local` exists on disk, is gitignored, and was **not opened**. `.env.example`
was read for names only.

**Client-side, `VITE_`-prefixed, shipped to the browser:**

| Name | Required to run? |
|---|---|
| `VITE_MAPBOX_TOKEN` | **Yes.** The only one needed locally |
| `VITE_SUPABASE_URL` | No. Omit to run on fixtures |
| `VITE_SUPABASE_ANON_KEY` | No. Omit to run on fixtures |
| `VITE_USE_FIXTURES` | No. Omit to auto-detect |
| `VITE_VAPID_PUBLIC_KEY` | No. Web Push only |

**Server-side, Supabase secrets, never `VITE_`-prefixed:**

`GOOGLE_PLACES_API_KEY` · `VAPID_PUBLIC_KEY` · `VAPID_PRIVATE_KEY` · `IP_HASH_SALT`

`privacy.test.ts` fails the build if the Google key is ever exposed to the client.

> [!todo] Missing, not found in `.env.example`
> The exact `VAPID_*` variable names are documented in the README only as a `VAPID_*` glob. The
> example file declares just `VITE_VAPID_PUBLIC_KEY`. The server-side pair would need to be read
> out of `supabase/functions/send-alerts/index.ts` to be named exactly.

## Gitignore posture

The `.gitignore` carries a uniform machine-local block that keeps agent tooling and secrets out
of the repository: `.env*` with `!.env.example` re-included, `.mcp.json`, `opencode.json`,
`.vscode/mcp.json`, `.vercel`, `.aethereum*`, `.claude/`, `.codex/`, `.cursor/`,
`*-ENGINEERPROMPT.md`, and as of the unpushed commit `392ec5c`, `AGENTS.md` and `GEMINI.md`.

This is why several files present on disk are not tracked. See
[[(Note) The Unpushed Commits]] and [[(Report) Folder Audit]].

## Monitoring and post-launch

`MASTERPLAN.md` § Post-Launch specifies monitoring, quota alerts, what to do when API bills
spike, and data hygiene. None of it is wired, because nothing but a static Vercel deploy is
running.

## Related

[[(Note) Install Run and Test]] · [[(Note) External Services]] ·
[[(Note) Owner-Gated Ship Runbook]] · [[(Index) 70 Ops, Deploy & Env]]
