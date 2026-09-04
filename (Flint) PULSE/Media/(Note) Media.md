---
id: 318bab8a-2648-4719-8741-2ed10af2e44f
title: "Media"
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
source_path: "/Users/brunojaamaa/Desktop/PULSE/docs/media"
---

# Media

**Nothing is stored in this folder.** The project's images live in the repository and are linked
by absolute path, per the no-large-files rule. `docs/media/` is **2.5 MB**, which is larger than
everything else in the repo except `dist/`.

## The five screenshots

All at `/Users/brunojaamaa/Desktop/PULSE/docs/media/`, all dated 2026-08-15.

| File | What it shows |
|---|---|
| `hero.png` | The README hero: campus overview, occupancy heatmap over real building footprints, and a building card showing unverified hours and mixed accessibility data |
| `home.png` | The home route: campus status line, building tiles, all-buildings list |
| `map.png` | The map route: Mapbox with occupancy-shaded OSM footprints |
| `card.png` | A building card: floor breakdown, amenities, prediction curve |
| `find.png` | The find panel: scored recommendations and filters |

## They were re-shot four times

Four separate `docs(D)` commits re-captured the media as the design settled during the
documentation pass:

- `9db7bc1` re-capture at the settled design, correcting moved figures
- `781892d` re-shoot without the collapsed-spacing bug
- `1441191` re-shoot at the final design, recording the headline bug
- `9206765` re-shoot at `b399fd8`, recording the map and dialog lessons

Each re-shoot was triggered by a bug the screenshots themselves exposed. The current set is the
build shipped at `b399fd8` or later, which is the one with the raised contrast and the
keyboard-dismissible dialogs.

## Icons and favicon

`/Users/brunojaamaa/Desktop/PULSE/public/` holds `favicon.svg` and three PWA icons:
`icon-192.png`, `icon-512.png` and `icon-512-maskable.png`. Generated in commit `2a848d4`.

⚠️ The icons were generated for the **SIGNAL** design system, which was retired in `44d30c5`.
Whether they still match the shipped visual identity was not verified, because verifying it
means looking at the images against the current palette.

## Related

[[(Note) The Four Load-Bearing Decisions]] · [[(Report) Folder Audit]] ·
[[(Index) Complete File Inventory]] · [[(Map) Master Map]]
