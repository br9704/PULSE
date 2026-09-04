---
id: 119a183f-b570-41a7-8228-bd772f3dcb82
title: "Who It Is For"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/PRD.md"
---

# Who It Is For

**Students at the University of Melbourne, Parkville campus, with commuters and students with a
disability named as the users who pay most for a wrong guess.** `PRD.md` § 3 defines six
personas across 1,326 lines.

## The six personas

| # | Persona | The pain |
|---|---|---|
| 3.1 | **The Commuter Student** (primary) | Ninety minutes between classes and no way to know where a free desk is |
| 3.2 | **The Group Coordinator** (secondary) | Group space is harder to find than individual space, and peer decision-making takes 20-message group chats |
| 3.3 | **The Anxious Student** | Walking into a packed room is a cost in itself |
| 3.4 | **The Student with a Disability** | Every failed attempt is real physical effort |
| 3.5 | **The Night Owl** | Needs to know what is actually open late |
| 3.6 | **The Facilities Manager** (B2B) | Wants campus-wide utilisation data, never individual data |

The README states the equity argument directly: the cost of a wrong guess is not evenly
distributed, and a commuter or a student with a mobility need pays far more for it than someone
who lives on campus.

## The business framing

`PRD.md` § 1.3 positions the long-term model as **B2B2C**: free for students, with a licensed
analytics dashboard sold to university facilities teams. That dashboard is Sprint 31 and was
never built. See [[(Note) Designed and Never Built]].

## Pilot campus

**University of Melbourne, Parkville.** 18 buildings, 47 floor zones, 890 rooms. Fifteen of the
18 carry their real OpenStreetMap footprint at 14 to 57 vertices each. The other three,
Engineering Building 1, the ICT Building and Kwong Lee Dow, could not be identified in OSM with
confidence and are left as rectangular approximations rather than matched to a guess.

Buildings are matched to OSM **by name, never by proximity**, because several seeded coordinates
were wrong and proximity matching inherits that error instead of exposing it. Melbourne School
of Design was seeded **428 m** from the Glyn Davis Building it actually occupies.

The README closes with a disclaimer: not affiliated with, endorsed by, or connected to the
University of Melbourne.

## Is this assessed coursework?

> [!todo] Missing, not found in `README.md`, `PRD.md`, `MASTERPLAN.md`, `CLAUDE.md`,
> `AGENTS.md` or `PROJECT.json`
> No subject code, unit code, tutor, marker, rubric, submission deadline or group roster
> appears anywhere in the repository. A grep for `subject`, `course`, `assignment`, `rubric`,
> `submission` and unit-code patterns returned only product copy and the PRD's "study group
> matchmaking by subject" feature.

The evidence points the other way. `PROJECT.json` records `"role": "SOLO BUILD"` and
`"status": "live"`, lists a case study on `brunojaamaa.dev`, and carries a `github.topics` array
for repository discovery. `git shortlog` shows **78 commits from a single author**. The `LICENSE`
is all rights reserved, copyright Bruno Jaamaa.

**Verdict: this is a solo portfolio project whose subject matter is a university campus.** It
sits under `#cluster/university` in the hub because of what it is about, not because it was set
by a university. `AGENTS.md` does describe multi-agent team coordination over the Aethereum MCP
server, but that is a tooling protocol for AI coding agents, not evidence of human teammates.

## Related

[[(Note) What UniSpace Is]] · [[(Note) Designed and Never Built]] ·
[[(Report) Gaps & Questions]] · [[(Index) 00 Overview]]
