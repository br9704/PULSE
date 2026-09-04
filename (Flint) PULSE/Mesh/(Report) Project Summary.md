---
id: 352b87cc-4b08-492c-98b5-c3ab63fdef25
title: "Project Summary"
type: project-summary
project: "PULSE"
kind: "coding"
stack: "react"
tags:
  - "#report"
  - "#project"
  - "#ld/living"
  - "#stack/react"
  - "#status/dormant"
  - "#cluster/university"
status: dormant
health: "amber"
health_note: "Code is green: 388 tests, CI passing, 0 open engineering tasks, 0 TODO markers. Amber is operational, not technical. Two unpushed commits sit on a public repo, and the Mapbox token on the live public URL is still unrestricted per the Ship Runbook."
last_commit: "2026-08-15"
path: "/Users/brunojaamaa/Desktop/PULSE"
live_url: "https://unispace-tawny.vercel.app"
repo: "https://github.com/br9704/UniSpace"
cluster: "university"
created: "2026-08-17"
updated: "2026-08-19"
source_path: "/Users/brunojaamaa/Desktop/PULSE"
---

# Project Summary 🟡

## Purpose

**UniSpace tells a student how full every building on the University of Melbourne's Parkville
campus is, before they walk there.** The folder on disk is `PULSE`, the npm package is
`unispace`, the GitHub repo is `UniSpace`, and the PRD still calls the product **Pulse**. All
four names describe the same thing.

The product argument is not the heatmap. It is honesty under uncertainty: a crowdsourced
occupancy app has no data on day one and thin data thereafter, so the interface is built to say
*which* source a number came from and to render a visible `[?]` when nobody has checked. See
[[(Note) What UniSpace Is]].

The privacy design is the constraint everything else bends around. GPS is read in the browser,
matched against building polygons on the device with Turf.js, and only a `zone_id` crosses the
wire. **Zero coordinates reach a server**, and six tests fail the build if that changes. See
[[(Note) The Privacy Firewall]].

**Who it is for.** Commuter students, students with a disability, and group coordinators, per
the PRD's six personas. The pilot campus is University of Melbourne Parkville. ⚠️ The repo
names no subject code, no unit, no tutor and no assignment brief, so "university project" here
means *a project about a university campus*, not a piece of assessed coursework. See
[[(Note) Who It Is For]].

## State ⚫ dormant

Work stopped **2026-08-15** at a clean boundary: every engineering task through Sprint 25 is
closed, the six-sprint recovery phase is shut, and a documentation pass (Sprint D) was the last
thing done. The masterplan's own count is **0 open engineering tasks**. What remains is a
37-step Owner-Gated Ship Runbook that needs credentials, real-world data or physical hardware,
none of which can be produced from inside the repo.

⚠️ The hub note said work stopped at **Sprint 20**. The repo says otherwise. Sprints 21 to 25
plus recovery sprints R1 to R5 all shipped after that. Full list of stale hub claims in
[[(Note) Hub Note Corrections]].

## Key numbers

| | |
|---|---|
| Commits | **78** on `main`, 2026-03-19 to 2026-08-15, single author |
| Unpushed | **2** commits, both documentation only, both safe |
| Code files | **182** at depth 3, excluding `node_modules` and `dist` |
| Tests | **388** across **33** files, CI green |
| TODO / FIXME markers | **0** across `src/`, `supabase/`, `scripts/` |
| Landing route | **169 KB** gzip, down from **637 KB** |
| Campus data | **18** buildings · **47** zones · **890** rooms · **1,156** occupancy rows |
| SQL migrations | **22**, plus **8** seed files |
| Edge Functions | **7** Deno functions, written, never hosted |
| Coordinates sent to a server | **0** |

## Top risks

1. ⚠️ **The Mapbox token is unrestricted on a live public URL.** The masterplan flags this as
   the single urgent open item in the Ship Runbook, independent of everything else. An
   unrestricted token on a public deploy is an uncapped bill. This is the one thing worth doing
   today.
2. ⚠️ **Two unpushed commits on a public repo.** Both are documentation only and both are safe
   to publish. Detail and verdict in [[(Note) The Unpushed Commits]].
3. 🟡 **The live-crowdsourced path has never run against real users.** No Supabase project is
   provisioned, deliberately, on cost grounds. Every occupancy figure in the live demo is a
   modelled estimate served from committed fixtures.
4. 🟡 **The backend can be lost again.** Migration `013` was applied to a cloud database and
   never committed, and that work is unrecoverable. The rule now is that no schema change
   reaches a cloud database before it exists as a committed migration.
5. ❓ **Accessibility data is thin and the stakes are high.** Exactly **1** of 18 buildings has
   a mapped step-free entrance and **no source exists at all** for accessible parking. The app
   renders `[?]` rather than guessing, which is correct, but the gap is real.

## Next 5 actions

1. Restrict the Mapbox token to the `unispace-tawny.vercel.app` domain. Ship Runbook § 2.
2. Decide on the two unpushed commits. Pushing them publishes a link to
   `brunojaamaa.dev/projects/unispace`, so confirm that page exists first.
3. Run the manual verification pass on the live URL: Lighthouse, throttled 3G, VoiceOver, PWA
   install on real iOS and Android hardware. Ship Runbook § 4.
4. Source opening hours for the **13** buildings that carry unverified seed values.
5. Refresh the hub note at
   `/Users/brunojaamaa/Desktop/Main Vault/Main/Mesh/Notes/Projects/(Note) PULSE — UniSpace.md`
   against [[(Note) Hub Note Corrections]].

## Ten key links

[[(Map) Master Map]] · [[(Note) What UniSpace Is]] · [[(Note) System Architecture]] ·
[[(Note) The Privacy Firewall]] · [[(Note) Data Model]] · [[(Note) Install Run and Test]] ·
[[(Note) The Wiring Audit and Recovery]] · [[(Note) Designed and Never Built]] ·
[[(Note) The Unpushed Commits]] · [[(Report) Gaps & Questions]]

## Related

[[(Report) Folder Audit]] · [[(Index) Complete File Inventory]] · [[(Report) Build Log]] ·
[[(Guide) BRUNO HQ]]
