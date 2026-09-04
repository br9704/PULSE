---
id: da25d213-932b-4b1e-8268-1ff590101611
title: "Install Run and Test"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/package.json"
---

# Install Run and Test 🚀

**It runs fully with no backend and no API keys except a Mapbox token.** That is the design, not
a degraded mode: fixtures switch on automatically when Supabase is unconfigured, which is what a
real deployment looks like before it has users.

```bash
git clone https://github.com/br9704/UniSpace.git
cd UniSpace
pnpm install

cp .env.example .env.local
# Add VITE_MAPBOX_TOKEN. Leave the Supabase vars blank.

pnpm test
pnpm dev
```

Package manager is **pnpm 11.13.0**, pinned in `package.json` under `packageManager`. Node 24 in
CI. The lockfile is `pnpm-lock.yaml`, **270 KB**.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Vite dev server on fixtures |
| `pnpm build` | `tsc -b && vite build`. **Never** `vite build` alone |
| `pnpm test` | 388 unit and integration tests, one pass |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm lint` | ESLint, zero suppressions in the codebase |
| `pnpm preview` | Serve the built `dist/` |
| `pnpm generate:fixtures` | Regenerate `src/lib/fixtures/seedData.generated.ts` after editing `supabase/seed/` |

The `pnpm build` warning is load-bearing. `vite build` succeeds while `tsc -b` fails, and that
gap is how the project shipped a non-compiling build for five sprints without noticing. See
[[(Note) The Wiring Audit and Recovery]].

## What you get on fixtures

All **18** buildings, their **47** floor zones, the **890**-room directory and the **1,156**
weekly occupancy curve rows, with no live occupancy. That is the cold-start state, which is the
one the interface most needs to handle well.

Expected test output:

```
 Test Files  33 passed (33)
      Tests  388 passed (388)
```

## Environment variable names

⚠️ Names only. Values live in `.env.local`, which is gitignored and was not opened.

| Variable | Where | Purpose |
|---|---|---|
| `VITE_MAPBOX_TOKEN` | `.env.local` | Map tiles. **The only one needed to run locally** |
| `VITE_SUPABASE_URL` | `.env.local` | Omit to run on fixtures |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | Omit to run on fixtures |
| `VITE_USE_FIXTURES` | `.env.local` | Force fixtures on or off. Omit to auto-detect |
| `VITE_VAPID_PUBLIC_KEY` | `.env.local` | Web Push subscription |
| `GOOGLE_PLACES_API_KEY` | Supabase secrets | Server-side only, never `VITE_`-prefixed |
| `VAPID_*` | Supabase secrets | Web Push signing, server-side only |
| `IP_HASH_SALT` | Supabase secrets | Rate-limit hashing, server-side only |

`.env.example` on disk declares four names: `VITE_MAPBOX_TOKEN`, `VITE_SUPABASE_URL`,
`VITE_SUPABASE_ANON_KEY`, `VITE_VAPID_PUBLIC_KEY`. The other four are documented in the README
as Supabase secrets and never appear in a client-side file.

## Related

[[(Note) Deploy and Environment]] · [[(Note) The Test Suite]] ·
[[(Note) System Architecture]] · [[(Index) 30 Setup & Run]]
