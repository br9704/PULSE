---
id: 095006e7-5b28-4038-94b9-459548d1a33a
title: "Designed and Never Built"
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

# Designed and Never Built ⏭️

**Eleven sprints, 26 through 36, across three phases, all specified in the masterplan and none
started.** They are the product roadmap, not the work queue. The masterplan is explicit: **111
unchecked boxes are not 111 things to do**, and on 2026-08-15 every one was re-marked `[⏭️]` so a
blank box could never be mistaken for a to-do again.

## Phase 3, Intelligence

| Sprint | Goal, as written |
|---|---|
| **26** | EWMA Prediction Engine. Exponentially weighted moving average over `occupancy_history`, replacing the modelled baseline once `sample_count >= 14` days for a given day and hour slot. Confidence scoring from sample count and variance |
| **27** | Anomaly Detection. Flag exam periods, events and holidays. Adjust predictions during known unusual periods |
| **28** | Personalised Recommendations. Learn from buildings visited and filters used, all local with no server storage. A "Your usual spots" section |
| **29** | Feedback Loops and Lightweight Gamification. "Is this right?" confirmations to calibrate capacity estimates, prediction accuracy tracking, and light gamification to encourage crowd reporting |

**Blocker for all four: there is no accumulated history to learn from.** Every one of these
needs a hosted database that has been collecting readings from real users. Sprint 26 needs 14
days of data per slot before it can even produce an output.

## Phase 4, Scale and Monetisation

| Sprint | Goal, as written |
|---|---|
| **30** | Multi-Campus Support. Campus selector, seed data for Monash Clayton and RMIT City, one database instance isolated by `campus_id`, campus-specific map styling |
| **31** | University Analytics Dashboard. An `admin.pulse.app` subdomain, Supabase Auth restricted to university email domains, campus-wide heatmap by hour, per-building utilisation charts, peak stress report, CSV export. All aggregate and anonymised |
| **32** | Licensing and Billing. Stripe integration for university subscriptions, tiered on campus count, admin user management |

The `campuses` table and `campus_id` isolation already exist in the schema, so Sprint 30 is the
cheapest of these to start. Sprint 31 is the B2B2C revenue mechanism named in `PRD.md` § 1.3.

## Phase 5, Social Layer and Community

| Sprint | Goal, as written |
|---|---|
| **33** | Friend Presence. Mutual opt-in follow, building-level location only and never floor or seat |
| **34** | Study Group Matchmaking. Manual subject tags, "looking for study partner" status, study session creation |
| **35** | Secret Spots and Community Reviews. Community-submitted study spots with photos and reviews, inspired by LostOnCampus |
| **36** | Event Awareness. Associate events with buildings so crowd spikes are explained rather than surprising |

## The permanent blocks, not just deferrals

Phases 4 and 5 require **Supabase Auth accounts and Stripe billing**, which contradict the PRD's
own positioning at § 13.1: *no accounts for core features*. The README lists three of these as
**deliberately out of scope** rather than deferred:

- Friend presence (Sprint 33)
- Personalised recommendations (Sprint 28)
- The analytics dashboard (Sprint 31)

All three need user accounts, which contradict what the app is for. Accounts also break the
privacy argument in [[(Note) The Privacy Firewall]], which is the project's headline claim. This
is not a scheduling problem, it is a design conflict, and the masterplan says to revisit only
after a public URL exists and is used.

Sprint 28 is the interesting exception. Its own spec says "all local, no server storage", which
would sidestep the accounts problem entirely. It is grouped with the rest anyway because it
still depends on the Phase 3 history that does not exist.

## Related

[[(Note) Owner-Gated Ship Runbook]] · [[(Note) The Privacy Firewall]] ·
[[(Note) Who It Is For]] · [[(Index) 60 Roadmap, Tasks & Ideas]]
