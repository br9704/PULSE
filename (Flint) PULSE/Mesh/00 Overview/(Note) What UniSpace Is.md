---
id: 563601a5-253a-4738-aae1-7c30c3e54bab
title: "What UniSpace Is"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/README.md"
---

# What UniSpace Is 🟢

**A privacy-first PWA that shows how full every building on a university campus is, so students
stop walking fifteen minutes to a library that turns out to be packed.** No accounts, no
sensors, and no GPS coordinate ever leaves the phone.

## The four names

| Name | Where it lives |
|---|---|
| `PULSE` | The folder on disk, `/Users/brunojaamaa/Desktop/PULSE` |
| `unispace` | The npm package name and the Vercel project name |
| `UniSpace` | The GitHub repo, `github.com/br9704/UniSpace`, and the product's shipped name |
| `Pulse` | The product name throughout `PRD.md`, which predates the rename |

`PRD.md` was last touched **2026-03-19** and still says Pulse. Everything written after that
says UniSpace. The two describe the same product.

## What the interface does

Buildings on the map are shaded by occupancy. Tapping one opens a floor-by-floor breakdown,
amenities, a room directory, a 24-hour prediction curve and a "usually 38% at this time" line.
A filter panel ranks buildings by a score combining emptiness, walking distance and amenity
match. A cross-building room search answers the question a first-year actually has, which is
which building a given room code is in.

None of it requires an account, because requiring one would exclude the person who opens the app
once a week on a train platform.

## The real design problem

The hard part is not showing occupancy. It is **showing occupancy honestly when the app is not
sure**, which for a crowdsourced product is most of the time and all of the first week.
Occupancy is assembled from whichever source is best available, and the interface always says
which, in text as well as colour.

| Tier | Source | In the live demo |
|---|---|---|
| 1 | Live crowdsourced | Never. Needs a backend |
| 2 | Crowd reports, anonymous 1 to 5, decaying over 30 min | Only within your own session |
| 3 | Predicted from accumulated history | Never. No history collected |
| 4 | Typical estimate, a modelled weekly curve | **This is what you see** |
| 5 | No data, grey polygon, stated plainly | Outside a building's open hours |

Confidence is a visual state rather than a footnote. Estimates render at reduced intensity with
a dashed border and a `~` qualifier. Only genuinely live data gets the status dot and the slow
breathing animation on the map. Cached readings are downgraded to `stale` rather than keeping
the source they arrived with, so they inherit the low-confidence treatment automatically. A test
enforces that an estimate can never render as a live reading.

That principle runs down into the data. A building whose opening hours have no published source
reads "Hours not verified" with a hollow status dot instead of a confident OPEN or CLOSED, and
is deliberately **not** excluded by the "Open Now" filter, because filtering on invented hours
quietly cut the campus to five libraries on weekends. Accessibility flags are nullable and
render `[?]` when nobody has checked.

## Honest state, in the project's own words

`PROJECT.json` carries an `honest` field. Paraphrased: occupancy is modelled, not measured. No
Supabase project is provisioned, a deliberate cost decision, so every reading in the live demo
is an estimate generated from committed seed curves, and the live-crowdsourced path has never
run against real users. Real-world data is partial and labelled as such: opening hours are
sourced for **5 of 18** buildings, exactly **one** building has a mapped step-free entrance, and
**no source exists at all** for accessible parking.

## Related

[[(Note) Who It Is For]] · [[(Note) The Privacy Firewall]] · [[(Note) System Architecture]] ·
[[(Note) The Four Load-Bearing Decisions]] · [[(Index) 00 Overview]]
