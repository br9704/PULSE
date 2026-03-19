# Pulse

**Real-time campus occupancy for university students.**

Pulse gives every university student real-time visibility into campus occupancy so they never waste time walking to a full building again. It combines crowdsourced, privacy-preserving location data with Google Maps Popular Times to deliver a live occupancy heatmap — check it before you leave, not after you arrive.

## The Problem

University students have no reliable way to know whether a study space is available before physically going there. During peak hours, students try 5–8 buildings before finding a free spot, wasting 30–40 minutes each time. This is especially costly for commuter students, students with disabilities, and anyone managing tight schedules between classes.

## How Pulse Works

1. **Open the app** — no account required. The map shows real-time occupancy for every building on campus.
2. **Check the heatmap** — buildings are colour-coded from green (empty) to red (packed), with percentage labels and trend arrows (filling/emptying/stable).
3. **Tap a building** — see floor-by-floor breakdown, amenities (WiFi, power, quiet zones, accessibility), and a 24-hour prediction chart.
4. **Use "Find me a spot"** — filter by amenities, walking distance, and occupancy. Pulse ranks results using a scoring algorithm that balances availability, proximity, and your preferences.
5. **Set alerts** — get a push notification when a building drops below your chosen threshold.

### Data Sources & Fallback Hierarchy

Pulse blends multiple data sources to always show the best available information:

| Priority | Source | Description |
|----------|--------|-------------|
| 1 | **Live crowdsourced** | Anonymous zone-level presence from active Pulse users |
| 2 | **Google current popularity** | Real-time busyness from Google Places API |
| 3 | **Pulse predicted** | EWMA predictions from accumulated occupancy history |
| 4 | **Google typical popularity** | Historical weekly busyness patterns from Google |
| 5 | **No data** | Grey polygon, "No data available" label |

### Privacy by Design

Privacy is non-negotiable in Pulse's architecture:

- **Raw GPS coordinates never leave the device.** Zone detection happens client-side using Turf.js — only a `zone_id` is broadcast.
- **No user accounts required** for core features. Viewing the heatmap and getting recommendations never require login.
- **Session IDs rotate every 30 minutes** and are never written to any database — they exist only in memory for counting.
- **No analytics libraries.** No Google Analytics, no Mixpanel, no tracking.
- **Position data expires after 30 minutes.**

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript, Vite (PWA) |
| Styling | Tailwind CSS with UoM design tokens |
| Map | Mapbox GL JS |
| Backend | Supabase (Postgres + Realtime + Edge Functions) |
| External data | Google Places API |
| Charts | Recharts |
| Animations | Framer Motion |
| Geospatial | Turf.js (client-side point-in-polygon) |

## Local Setup

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A Supabase project
- A Mapbox account (free tier sufficient)
- A Google Cloud project with Places API enabled (for Google popularity data)

### Steps

1. **Clone and install**
   ```bash
   git clone https://github.com/br9704/PULSE.git
   cd PULSE
   pnpm install
   ```

2. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   ```

3. **Fill in environment variables:**
   - `VITE_SUPABASE_URL` — from Supabase project settings
   - `VITE_SUPABASE_ANON_KEY` — from Supabase project settings
   - `VITE_MAPBOX_TOKEN` — from Mapbox account tokens page

4. **Set Edge Function secrets** in Supabase dashboard (server-side only, not in `.env.local`):
   - `GOOGLE_PLACES_API_KEY` — Google Cloud console, Places API
   - `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_EMAIL` — for Web Push notifications

5. **Apply database migrations**
   ```bash
   # Via Supabase CLI
   supabase db push
   ```

6. **Seed the database** (UoM Parkville campus with 5 buildings)
   ```bash
   # Run supabase/seed/001_uom_parkville.sql via Supabase SQL Editor or CLI
   ```

7. **Run locally**
   ```bash
   pnpm dev
   ```

## Project Structure

```
src/
  components/       Reusable UI components
  hooks/            Custom React hooks (data fetching, realtime, geolocation)
  lib/              Supabase client, Mapbox helpers, blending utilities
  pages/            Top-level route components (MapPage, FindPage)
  types/            Shared TypeScript interfaces and enums
  stores/           Zustand state stores
  constants/        App constants (colours, thresholds, map defaults)
supabase/
  migrations/       SQL migrations (001–008), applied sequentially
  functions/        Deno Edge Functions (aggregate-occupancy, sync-google-popularity)
  seed/             Seed data scripts (UoM Parkville campus)
```

## Database Schema

| Table | Purpose |
|-------|---------|
| `campuses` | Campus metadata (name, centre coordinates, default zoom) |
| `buildings` | Building details, amenity flags, hours, polygon geometry |
| `building_zones` | Floor-level zones within buildings, each with a polygon and capacity |
| `zone_occupancy` | Live occupancy counts per zone (Realtime-enabled) |
| `occupancy_history` | 15-minute snapshots for trend analysis and predictions |
| `occupancy_predictions` | Pre-computed predicted occupancy by day-of-week and hour |
| `google_popularity_cache` | Cached Google current popularity (30-min TTL) |
| `google_popular_times` | Google typical weekly popularity histogram |
| `user_alerts` | Push notification alert subscriptions (keyed by push token, no user ID) |

All tables have Row Level Security enabled. Anonymous users can read; only the service role (Edge Functions) can write.

## Key Documents

| File | Purpose |
|------|---------|
| `PRD.md` | Product requirements, feature specs, data models, design system, privacy rules |
| `MASTERPLAN.md` | Sprint-by-sprint implementation plan with progress tracking |
| `CLAUDE.md` | Agent operating contract — coding standards, privacy rules, sprint protocol |

## Current Status

**Phase 0 complete** — project scaffolded, database schema deployed, seed data loaded for University of Melbourne Parkville campus (5 buildings: Baillieu Library, ERC, Arts West, Engineering Building 1, ICT Building).

See `MASTERPLAN.md` for detailed sprint progress.

## Pilot Campus

**University of Melbourne — Parkville**

5 buildings seeded with approximate polygons, floor zones, amenity data, and operating hours:

| Building | Capacity | Floors | Key Amenities |
|----------|----------|--------|---------------|
| Baillieu Library | ~800 | 3 | WiFi, power, quiet zones, group seating, elevator |
| Eastern Resource Centre (ERC) | ~300 | 2 | WiFi, power, quiet zones, elevator |
| Arts West | ~400 | 3 | WiFi, power, group seating, food nearby |
| Engineering Building 1 | ~350 | 3 | WiFi, power, group seating, food nearby |
| Doug McDonell (ICT) | ~250 | 2 | WiFi, power, group seating |

## Contributing

This project is in active development. See `CLAUDE.md` for coding standards and `MASTERPLAN.md` for the implementation roadmap.

## License

All rights reserved. Copyright Bruno Jaamaa 2026.
