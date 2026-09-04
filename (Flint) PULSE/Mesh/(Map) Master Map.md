---
id: b9bb43ed-57ae-4559-acab-39731a65121c
title: "Master Map"
type: map
project: "PULSE"
tags:
  - "#map"
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

# Master Map 🗺️

Everything in this vault, and the one-line reason to open each thing.

```mermaid
flowchart TD
    HQ["(Guide) BRUNO HQ"] --> MM["(Map) Master Map"]
    MM --> PS["(Report) Project Summary"]

    MM --> S00["00 Overview"]
    MM --> S10["10 Architecture"]
    MM --> S20["20 Codebase Map"]
    MM --> S30["30 Setup & Run"]
    MM --> S40["40 Data & Integrations"]
    MM --> S50["50 Decisions & ADRs"]
    MM --> S60["60 Roadmap, Tasks & Ideas"]
    MM --> S70["70 Ops, Deploy & Env"]
    MM --> S90["90 Reference"]

    S00 --> N1["What UniSpace Is"]
    S00 --> N2["Who It Is For"]
    S10 --> N3["System Architecture"]
    S10 --> N4["The Privacy Firewall"]
    S20 --> N5["Routes and Surfaces"]
    S20 --> N6["The src Tree"]
    S20 --> N7["The Test Suite"]
    S30 --> N8["Install Run and Test"]
    S40 --> N9["Data Model"]
    S40 --> N10["External Services"]
    S50 --> N11["The Four Load-Bearing Decisions"]
    S50 --> N12["The Wiring Audit and Recovery"]
    S60 --> N13["Designed and Never Built"]
    S60 --> N14["Owner-Gated Ship Runbook"]
    S70 --> N15["Deploy and Environment"]
    S70 --> N16["The Unpushed Commits"]
    S90 --> N17["Git History"]
    S90 --> N18["Hub Note Corrections"]

    MM --> AUD["(Report) Folder Audit"]
    MM --> INV["(Index) Complete File Inventory"]
    MM --> GAP["(Report) Gaps & Questions"]
    MM --> BL["(Report) Build Log"]
```

## Outline

- **Root**: [[(Report) Project Summary]] · [[(Report) Folder Audit]] ·
  [[(Index) Complete File Inventory]] · [[(Report) Gaps & Questions]] ·
  [[(Report) Build Log]] · [[(System) Flint Init]]
- **00 Overview**: [[(Index) 00 Overview]] · [[(Note) What UniSpace Is]] ·
  [[(Note) Who It Is For]]
- **10 Architecture**: [[(Index) 10 Architecture]] · [[(Note) System Architecture]] ·
  [[(Note) The Privacy Firewall]]
- **20 Codebase Map**: [[(Index) 20 Codebase Map]] · [[(Note) Routes and Surfaces]] ·
  [[(Note) The src Tree]] · [[(Note) The Test Suite]]
- **30 Setup & Run**: [[(Index) 30 Setup & Run]] · [[(Note) Install Run and Test]]
- **40 Data & Integrations**: [[(Index) 40 Data & Integrations]] · [[(Note) Data Model]] ·
  [[(Note) External Services]]
- **50 Decisions & ADRs**: [[(Index) 50 Decisions & ADRs]] ·
  [[(Note) The Four Load-Bearing Decisions]] · [[(Note) The Wiring Audit and Recovery]]
- **60 Roadmap, Tasks & Ideas**: [[(Index) 60 Roadmap, Tasks & Ideas]] ·
  [[(Note) Designed and Never Built]] · [[(Note) Owner-Gated Ship Runbook]]
- **70 Ops, Deploy & Env**: [[(Index) 70 Ops, Deploy & Env]] ·
  [[(Note) Deploy and Environment]] · [[(Note) The Unpushed Commits]]
- **90 Reference**: [[(Index) 90 Reference]] · [[(Note) Git History]] ·
  [[(Note) Hub Note Corrections]]
- **Folders**: [[(Index) Sources]] · [[(Note) Media]] · [[(Note) Exports]]

## Start here if you want to…

| You want to… | Open |
|---|---|
| Understand the product in two minutes | [[(Note) What UniSpace Is]] |
| Know who it serves and whether it is coursework | [[(Note) Who It Is For]] |
| See the whole system as a diagram | [[(Note) System Architecture]] |
| Understand the one claim the project is organised around | [[(Note) The Privacy Firewall]] |
| Run it locally right now | [[(Note) Install Run and Test]] |
| Find a file | [[(Index) Complete File Inventory]] |
| Know why the schema looks the way it does | [[(Note) Data Model]] |
| Read the best story in the repo | [[(Note) The Wiring Audit and Recovery]] |
| Know what was planned and never built | [[(Note) Designed and Never Built]] |
| Decide whether to push | [[(Note) The Unpushed Commits]] |
| Know what this vault could not find out | [[(Report) Gaps & Questions]] |
| Go back up to the hub | [[(Guide) BRUNO HQ]] |

## Related

[[(Guide) BRUNO HQ]] · [[(Report) Project Summary]]
