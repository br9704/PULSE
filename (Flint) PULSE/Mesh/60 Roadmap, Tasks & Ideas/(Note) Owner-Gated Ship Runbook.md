---
id: 7f71f62d-86f3-45f2-a746-06a3c9cef6b5
title: "Owner-Gated Ship Runbook"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/MASTERPLAN.md"
---

# Owner-Gated Ship Runbook

**37 steps: 18 open, 7 done, 12 parked.** Counted in the masterplan on 2026-08-15. This is a
checklist, not a backlog. Every item needs credentials, real-world data or a physical device, so
none of it can be done from inside the repository.

The runbook is ordered by dependency and the masterplan says not to reorder it.

## § 1. Supabase ⏭️ parked

Marked `PARKED, deliberately not provisioned (cost)`. All of § 1 and everything downstream of it
became parked on the 2026-08-15 decision that the backend will not be provisioned. That is 12 of
the 37 steps, closed by choice rather than waiting.

## § 2. Keys, quotas and the bill

⚠️ **The single urgent open item lives here: restrict the Mapbox token.** It is independent of
Supabase and it is live on a public URL today. An unrestricted client-side token on a public
deploy is an uncapped bill.

Also in § 2: a hard Google Places quota cap with a budget alert, required regardless of scope
because an uncapped public deploy is an uncapped bill. ✅ VAPID keys were generated in commit
`2a848d4`.

## § 3. Vercel ✅ done 2026-08-14

All three items complete. Deployed at commit `734e2e5` to `unispace-tawny.vercel.app`.

## § 4. Manual verification on the live URL 🟡 open

Needs physical hardware and a human:

- Lighthouse scores
- Throttled-3G behaviour
- VoiceOver
- PWA install on real iOS and Android devices
- Two motion claims that need a screen recorder

## § 5. Real-world data and assets ❓ mostly open

✅ Done: PWA icons, plus the accessibility and hours research passes.

Still outstanding, and the repository cannot produce any of it:

| Gap | Scale |
|---|---|
| Accessible parking data | **0 of 18** buildings. No published source exists at all |
| Step-free entry | **17 of 18** buildings unmapped |
| Opening hours | **13 of 18** buildings have no published source |
| Google Place IDs | **11 of 18** are `NULL`. Needs a Places API key |
| CC-licensed building photographs | None sourced |

## § 6. Last

Final sign-off steps once everything above clears.

## How to read the checkboxes

The masterplan's own instruction: every `[ ]` remaining anywhere in the file is in this runbook.
Sprints 26 to 36 are marked `[⏭️]` rather than left blank, precisely so a blank box cannot be
mistaken for outstanding engineering. The count is derived, not restated, by running
`grep -oE "^\s*- \[[^]]*\]"` over the runbook section.

## Related

[[(Note) Designed and Never Built]] · [[(Note) External Services]] ·
[[(Note) Deploy and Environment]] · [[(Report) Gaps & Questions]] ·
[[(Index) 60 Roadmap, Tasks & Ideas]]
