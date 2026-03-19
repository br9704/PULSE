# Pulse — Product Requirements Document

> **Version:** 1.1.0  
> **Author:** Bruno Jaamaa  
> **Status:** Active  
> **Last Updated:** March 2026  
> **Changelog v1.1:** Added Google Maps Popular Times integration (F010), UoM-based design system, full UI screen specifications (Section 12), resolved all open questions from v1.0.

---

## Table of Contents

1. [Product Vision](#1-product-vision)
2. [Problem Statement](#2-problem-statement)
3. [Target Users & Personas](#3-target-users--personas)
4. [Goals & Success Metrics](#4-goals--success-metrics)
5. [Scope & Phasing](#5-scope--phasing)
6. [Feature Specifications](#6-feature-specifications)
7. [Technical Architecture](#7-technical-architecture)
8. [Data Models](#8-data-models)
9. [API Contracts](#9-api-contracts)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Design System](#11-design-system)
12. [UI Screen Specifications](#12-ui-screen-specifications)
13. [Privacy & Ethics](#13-privacy--ethics)
14. [Out of Scope](#14-out-of-scope)
15. [Risks & Mitigations](#15-risks--mitigations)
16. [Resolved Decisions](#16-resolved-decisions)

---

## 1. Product Vision

### 1.1 One-Line Pitch
**Pulse gives every university student real-time visibility into campus occupancy so they never waste time walking to a full building again.**

### 1.2 Vision Statement
University campuses are among the densest, most resource-constrained environments students navigate daily. Despite institutions investing hundreds of millions in physical infrastructure, students operate with zero real-time awareness of where space is available. Pulse bridges that information gap using crowdsourced, privacy-preserving location data — supplemented by Google Maps Popular Times data — delivering a live occupancy heatmap that students can check before they leave, not after they arrive.

Pulse is not just a study space finder. It is infrastructure for the student experience: a layer of real-time campus intelligence that benefits commuters, students with disabilities, students with anxiety, night owls, and anyone trying to coordinate group work. Over time, it learns campus rhythms well enough to predict occupancy before students even need to ask.

### 1.3 Product Positioning
- **Category:** Campus productivity / student-facing civic tech
- **Deployment model:** Progressive Web App (PWA) — no App Store install required
- **Business model (long-term):** B2B2C — free for students, licensed analytics dashboard to university facilities teams
- **Differentiator:** Zero hardware cost (crowdsourced + Google Places API), zero account friction (anonymous viewing), live + predictive combined, accessibility-first filters

### 1.4 North Star Metric
**Weekly Active Users (WAU) who check Pulse before traveling to a building and successfully find a seat on first attempt.**

---

## 2. Problem Statement

### 2.1 The Core Problem
University students have no reliable way to know whether a study space is available before physically going there. They must walk to a location, assess it, and if full, repeat the process for another building. This results in:

- Wasted time (estimated 30-40 minutes per peak-hour incident)
- Wasted energy (especially for students with mobility impairments)
- Increased stress (especially for students with anxiety)
- Suboptimal study outcomes (students settle for poor environments)

### 2.2 Why This Hasn't Been Solved
- **WiFi device counts exist** in most modern university networks but are treated as internal operational data, never surfaced to students
- **Room booking systems** cover formal meeting rooms, not open-plan study areas, cafes, or common rooms
- **Building sensors** exist in some buildings but are siloed in facilities management systems
- **Google Maps Popular Times** shows busyness for public places but is not campus-spatial and operates at venue granularity, not building-by-building across a campus

### 2.3 Market Context
- 1.6 million university students in Australia (DESE 2025)
- 0 student-facing real-time occupancy apps at Australian universities (as of March 2026)
- 73% of students surveyed report frustration with study space availability information
- Students try 5-8 buildings before finding a free spot during peak hours
- Students with mobility impairments report each failed attempt costs 10-15 minutes

---

## 3. Target Users & Personas

### 3.1 Primary Persona: The Commuter Student
**Name:** Maya, 20, Bachelor of Commerce
**Context:** 50-minute train commute each way. Two 90-minute gaps between classes per day.
**Pain:** Arrives on campus not knowing where to go. Can't afford to spend limited campus time searching.
**Pulse use case:** Checks heatmap on the train. Sees Baillieu is at 85%, ERC at 28%. Goes straight to ERC. Saves 30 minutes.
**Key requirement:** Must load fast on mobile, give actionable info in under 10 seconds.

### 3.2 Secondary Persona: The Group Coordinator
**Name:** James, 22, Bachelor of Engineering
**Context:** Coordinates project groups of 3-5. Needs group tables, whiteboards, breakout rooms.
**Pain:** Finding group space is harder than individual. Peer decision-making on where to go is slow (20-message group chats).
**Pulse use case:** Filters by "group seating", walking time under 5 minutes. Shares top result in group chat.
**Key requirement:** Amenity filters granular and accurate. Shareable deep-links.

### 3.3 Tertiary Persona: The Anxious Student
**Name:** Priya, 19, Bachelor of Arts
**Context:** Social anxiety in crowded environments. Walking into a packed library and leaving is humiliating.
**Pain:** Needs to know the vibe before entering. Percentage and trend direction both matter.
**Pulse use case:** Filters for "quiet zones", checks occupancy. Goes to Baillieu Reading Room when quiet.
**Key requirement:** Granularity — "filling up at 40%" is different from "stable at 40%."

### 3.4 Tertiary Persona: The Student with a Disability
**Name:** Liam, 21, Master of IT, uses a wheelchair
**Context:** Navigation is slower and more energy-intensive. Each failed attempt = 10-15 minutes wasted.
**Pulse use case:** Filters by "ground floor", "elevator", "accessible seating", "power". Navigates directly.
**Key requirement:** Accessibility filter data must be verified and reliable.

### 3.5 Tertiary Persona: The Night Owl
**Name:** Alex, 23, PhD candidate. Studies 9 PM - 1 AM. Needs open buildings with people present (safety).
**Pulse use case:** Checks which buildings have active occupancy after hours. Cross-references hours.
**Key requirement:** Building hours data, after-hours signals, "currently open" filter.

### 3.6 B2B Persona: Facilities Manager
**Name:** Sandra, 47, University Facilities Director. Planning $50M expansion with no utilisation data.
**Pulse use case:** University Analytics Dashboard. Peak hours, seasonal patterns, underutilisation ranking.
**Key requirement:** Aggregate, anonymised data. Privacy Act compliant.

---

## 4. Goals & Success Metrics

### 4.1 Product Goals

| Goal | Description |
|------|-------------|
| G1 | Students can check campus occupancy before leaving their current location |
| G2 | Students find a suitable study space on first attempt |
| G3 | Crowdsourced model generates sufficient data density during peak hours |
| G4 | Google Popular Times fills the gap when crowdsourced density is low |
| G5 | Predictions are accurate enough to be trusted and acted on |
| G6 | Product is accessible without an account |
| G7 | Privacy is guaranteed — no individual identifiable from the data |

### 4.2 Launch Metrics (Month 1)

| Metric | Target |
|--------|--------|
| Daily Active Users (DAU) | 200+ (UoM pilot) |
| Sessions per user per week | >= 3 |
| Time-to-first-useful-insight | < 10 seconds |
| App load time (3G) | < 3 seconds |
| Location permission grant rate | > 60% |

### 4.3 Growth Metrics (Month 3)

| Metric | Target |
|--------|--------|
| WAU | 1,000+ |
| Campuses | 3+ |
| Prediction accuracy | +/-15% within 1-hour window |
| University dashboard pilots | 1 paid |

---

## 5. Scope & Phasing

### 5.1 Phase 0 — Foundation (Weeks 1-2)
Scaffolding, Supabase setup, Google Places API integration, Mapbox map, basic realtime broadcasting, zone aggregation Edge Function. End state: working heatmap with live data and Google fallback.

### 5.2 Phase 1 — MVP (Weeks 3-6)
Live heatmap, building cards, floor breakdown, smart recommendations, basic prediction, PWA install flow. End state: deployable to real students at UoM.

### 5.3 Phase 2 — Polish & Reliability (Weeks 7-9)
Performance, accessibility compliance, error states, offline degradation, push notifications, verified amenity data.

### 5.4 Phase 3 — Intelligence (Weeks 10-14)
Improved prediction engine, anomaly detection, personalised recommendations, feedback loops.

### 5.5 Phase 4 — Scale & Monetisation (Weeks 15-20)
Multi-campus (same DB, separate campus slugs), University Analytics Dashboard, licensing model.

### 5.6 Phase 5 — Social Layer (Post-revenue, optional)
Friend location sharing (opt-in), study group matchmaking by subject.

---

## 6. Feature Specifications

### 6.1 F001 — Live Campus Heatmap

**Priority:** P0 | **Phase:** 1

**Description:** Full-viewport interactive map with real-time colour-gradient overlay on building polygons. Colour driven by blended occupancy score (crowdsourced + Google fallback).

**Colour Coding:**
| Occupancy | Colour Token | Label |
|-----------|-------------|-------|
| 0-25% | `--color-empty` | Empty |
| 26-50% | `--color-quiet` | Quiet |
| 51-70% | `--color-moderate` | Moderate |
| 71-85% | `--color-busy` | Busy |
| 86-100% | `--color-packed` | Packed |

**Map Behaviour:**
- Default view: UoM campus centred, zoom 15
- Mapbox GL JS with custom UoM-branded dark-mode style
- Building polygons as GeoJSON from Supabase (static, seeded per campus)
- Polygon fill driven by blended occupancy, updated every 10-15 seconds via Supabase Realtime
- Smooth colour transitions (800ms ease-in-out)
- Occupancy % label on polygon centroid at zoom >= 15.5
- Tap polygon -> Building Card (F002)

**Occupancy Score Blending:**
```
Priority 1: Pulse crowdsourced live data (active users in zone) -> label 'live'
Priority 2: Google current_popularity (synced every 30min) -> label 'google'
Priority 3: Pulse historical prediction -> label 'predicted'
Priority 4: Google populartimes typical -> label 'google-estimated'
Priority 5: null -> grey polygon, 'no data'
```

**Edge Cases:**
- No GPS: map loads, shows Google/predicted data, "location off" indicator
- Zero active users in zone: falls back to Google current_popularity
- Map tiles fail: fallback list view
- Google API unavailable: falls back to Pulse predictions

---

### 6.2 F002 — Building Cards

**Priority:** P0 | **Phase:** 1

**Description:** Bottom-sheet card on building tap. Two snap states: collapsed (~180px) and expanded (~70vh).

**Card Contents:**
| Field | Source |
|-------|--------|
| Building name + short descriptor | `buildings` table |
| Current occupancy % (large) | `zone_occupancy` blended |
| Data source badge | "Live 12 users" / "Google estimate" / "Predicted" |
| Occupancy fill bar | Blended pct |
| Trend arrow (filling/emptying/stable) | `zone_occupancy.trend` |
| "Open now" + closing time | `buildings.hours_*` |
| Floor breakdown | `building_zones` + `zone_occupancy` per zone |
| Amenity chips | `buildings` amenity flags |
| Today's sparkline (6hr) | `occupancy_history` |
| Prediction chart (24hr) | `occupancy_predictions` + `google_popular_times` |
| "Usually peaks at..." | `occupancy_predictions` |
| Navigate, Alert, Share buttons | Actions |

**Floor Breakdown (Resolved: floor-level granularity):**
```
Level 1  ████████░░  78%  Busy
Level 2  ███░░░░░░░  30%  Quiet  -> Recommended
Level 3  ██████░░░░  61%  Moderate
```
Quietest floor highlighted with gold "-> Recommended" label.

**Interactions:**
- Swipe down to dismiss
- Navigate -> Apple Maps / Google Maps at `buildings.entrance_lat/lng`
- Share -> deep link `pulse.app/campus/unimelb/building/[slug]`
- Alert -> opens Alert Sheet (F005)

---

### 6.3 F003 — Smart Recommendations

**Priority:** P0 | **Phase:** 1

**Description:** "Find me a spot" mode — ranked list based on filters + blended occupancy.

**Filters:**
| Filter | Type |
|--------|------|
| Has WiFi | Toggle |
| Power outlets | Toggle |
| Food nearby | Toggle |
| Quiet zone | Toggle |
| Group seating | Toggle |
| Ground floor access | Toggle |
| Elevator access | Toggle |
| Currently open | Toggle (default on) |
| Max occupancy % | Slider (0-100) |
| Max walking time | Slider (2-15 min) |

**Ranking:**
```
score = (1 - occupancy_pct) * 0.5 
      + (1 - walk_time_normalised) * 0.3 
      + amenity_match_pct * 0.2
```
Ties: emptying > stable > filling.

**Walking Time:** Straight-line to `buildings.entrance_lat/lng` at 1.4 m/s. "~X min walk". GPS unavailable: ranked by occupancy, distance shown as "-".

---

### 6.4 F004 — Prediction Engine

**Priority:** P1 | **Phase:** 1 (simple) -> 3 (full)

**Phase 1 — Blended Prediction:**
```
IF pulse_history_sample_count >= 14 days for this day/hour slot:
  prediction = EWMA of occupancy_history
  confidence = 'high' or 'medium'
  source = 'pulse'
ELSE:
  prediction = google_popular_times.typical_popularity
  confidence = 'google-estimated'
  source = 'google'
```

**Display:**
- "Usually [X]% at this time on [Day]s"
- "Best time to go today": lowest predicted hour
- "Avoid between X and Y": highest predicted window
- Confidence badge: "Based on Google data" vs "Based on Pulse data (N weeks)"

**Cold Start (Resolved: show Google data from day 1):** Google populartimes used as baseline from launch. Silently transitions to Pulse's own data as it accumulates.

---

### 6.5 F005 — Occupancy Alerts

**Priority:** P1 | **Phase:** 2

- User sets threshold per building: "Notify me when below [40]%"
- Optional expiry: "only today before 5 PM"
- Stored by push token only, no user ID
- Edge Function polls every 2 minutes, fires push notification on threshold breach
- Notification: "ERC is now 35% full. Good time to go." -> taps to building card
- Auto-expires after 24 hours

---

### 6.6 F006 — Accessibility Filters

**Priority:** P0 (UI) / P1 (verified data) | **Phase:** 1 (UI), 2 (verification)

Attributes per building: ground floor access, elevator, accessible bathrooms, accessible parking, power at accessible seating, low noise. Seeded manually from UoM building accessibility guides. User confirmation prompt in Phase 2. University-provided data in Phase 3.

---

### 6.7 F007 — PWA Install Flow

**Priority:** P0 | **Phase:** 0

**PWA Manifest:**
```json
{
  "name": "Pulse",
  "short_name": "Pulse",
  "description": "Campus occupancy, live.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#030D1A",
  "theme_color": "#003865",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

**Offline:** Service Worker caches app shell, building metadata, last occupancy snapshot. Shows "Last updated X min ago" banner when offline.

**Install trigger:** After 30s engagement, first visit only. iOS: custom modal (Share -> Add to Home Screen). Android: native browser install prompt.

---

### 6.8 F008 — University Analytics Dashboard

**Priority:** P2 (speculative build) | **Phase:** 4

Separate subdomain `admin.pulse.app`. University email domain login (Supabase Auth + RLS). Views: campus-wide heatmap by hour, per-building charts, underutilisation report, peak stress report, semester comparison, CSV export. No individual data ever exposed.

---

### 6.9 F009 — Social Layer

**Priority:** P3 | **Phase:** 5

Friend presence (mutual follow + opt-in), study group matchmaking (manual subject tags), study session creation. Entirely opt-in. Account required. Anonymous viewing always remains available.

---

### 6.10 F010 — Google Maps Popular Times Integration

**Priority:** P0 | **Phase:** 0

**Description:** Integrates with Google Places API to pull two data types per building, solving the cold start problem entirely.

**Data Sources:**
| Field | Description | Update Frequency |
|-------|-------------|-----------------|
| `current_popularity` | Live busyness 0-100 relative to typical peak | Every 30 min (Edge Function) |
| `populartimes[day][hour]` | Typical busyness histogram | Weekly refresh |
| `opening_hours.open_now` | Currently open/closed | Every 30 min |

**Integration Architecture:**

```
Seed Phase (one-time per building):
  Admin script fetches Google Place ID for each building
  Stored in buildings.google_place_id

Scheduled Sync (Edge Function: sync-google-popularity, every 30 min via pg_cron):
  FOR EACH building WHERE google_place_id IS NOT NULL:
    GET https://maps.googleapis.com/maps/api/place/details/json
        ?place_id={google_place_id}
        &fields=current_popularity,opening_hours
        &key={GOOGLE_PLACES_API_KEY}  <- server-side secret, never exposed to client
    UPSERT google_popularity_cache SET current_popularity, is_open_now, synced_at

Typical Hours Seed (one-time, refreshed weekly):
  Fetch populartimes[day][hour] for each building
  Upsert into google_popular_times table
  Used as prediction baseline
```

**Pricing (Google Places API, 2026):**
- Place Details: $17 USD per 1,000 requests
- 10 buildings x 48 syncs/day = 480 requests/day -> ~$8.16/month
- Mitigated by: skip write if popularity unchanged, cache aggressively

**API Key:** Server-side only in Edge Function environment secrets. Never in client bundle.

**Display in UI:**
- Building Card data source badge: "🌐 Google estimate" (not "● Live")
- Occupancy bar: slightly muted colour variant when source is Google
- Tooltip on badge: "Based on Google Maps data. Updates every 30 min."
- Prediction section: "Typical busyness (Google data)" label when using populartimes

**Fallback Hierarchy:**
```
1. Pulse crowdsourced live    -> "● Live · N users"
2. Google current_popularity  -> "🌐 Google estimate"
3. Pulse historical prediction -> "◆ Predicted"
4. Google populartimes typical -> "◆ Google typical"
5. No data                    -> grey polygon
```

**Privacy:** Google data is aggregated before Pulse receives it. Integration is read-only. No user data flows to Google.

---

## 7. Technical Architecture

### 7.1 High-Level Architecture

```
[User's Phone]
    |
    +-- PWA (React 18 + TypeScript + Vite)
    |       +-- Mapbox GL JS (heatmap rendering)
    |       +-- Supabase JS Client (realtime subscription)
    |       +-- Turf.js (client-side zone detection — raw coords never leave device)
    |       +-- Service Worker (offline caching)
    |
    v
[Supabase]
    +-- Realtime Channels
    |       +-- anonymous_positions:{campus_slug}
    +-- Edge Functions (Deno)
    |       +-- aggregate-occupancy (every 10s via pg_cron)
    |       +-- sync-google-popularity (every 30min via pg_cron)
    |       +-- compute-predictions (every hour via pg_cron)
    |       +-- fire-alerts (every 2min via pg_cron)
    +-- Postgres
    |       +-- campuses, buildings, building_zones
    |       +-- zone_occupancy (live counts)
    |       +-- occupancy_history (15-min snapshots)
    |       +-- occupancy_predictions (pre-computed)
    |       +-- google_popularity_cache (30min TTL)
    |       +-- google_popular_times (weekly refresh)
    |       +-- user_alerts (push tokens)
    +-- Secrets
            +-- GOOGLE_PLACES_API_KEY (Edge Function only)
            +-- VAPID keys (push notifications)

[Vercel] -- Static deployment + Edge middleware

[Mapbox] -- Vector tiles, custom UoM dark style, heatmap layer

[Google Places API] -- current_popularity, populartimes, opening_hours (read-only)
```

### 7.2 Realtime Data Pipeline

```
Step 1: User opens app
        Browser determines zone_id via Turf.js point-in-polygon (client-side)
        Raw lat/lng NEVER transmitted
        Broadcasts: { zone_id, session_id, campus_slug }

Step 2: Edge Function aggregate-occupancy (every 10 seconds):
        - Reads active broadcasts from Realtime channel
        - Counts distinct session_ids per zone_id (in-memory ONLY)
        - session_id NEVER written to any database table
        - Expires positions older than 30 minutes
        - Computes occupancy_pct = (count / zone.capacity) * 100
        - Upserts zone_occupancy
        - Writes 15-min snapshot to occupancy_history

Step 3: zone_occupancy change triggers Realtime broadcast to clients
        Payload: { building_id, floor_occupancies[], blended_pct, trend, data_quality }

Step 4: Mapbox layer re-renders with new colours
```

### 7.3 Google Popularity Sync Pipeline

```
Edge Function sync-google-popularity (every 30 minutes):
  FOR EACH building WHERE google_place_id IS NOT NULL:
    response = Google Places Details API (current_popularity, opening_hours)
    IF current_popularity has changed OR last_synced > 25 minutes ago:
      UPSERT google_popularity_cache
```

### 7.4 Multi-Campus Architecture (Resolved)
Same Supabase instance. All data isolated by `campus_id` FK. Adding a campus = inserting into `campuses` + seeding buildings. No separate projects.

### 7.5 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React + TypeScript (strict) | 18.x |
| Build | Vite + vite-plugin-pwa | Latest |
| Styling | Tailwind CSS | v3 |
| Map | Mapbox GL JS | v3 |
| Realtime | Supabase Realtime | Latest |
| Database | Supabase (Postgres) | Latest |
| Edge Functions | Deno (Supabase) | Latest |
| Charts | Recharts | Latest |
| Geo utilities | Turf.js | Latest |
| Animations | Framer Motion | Latest |
| Push | Web Push API + VAPID | Native |
| External data | Google Places API | Current |
| Deployment | Vercel | Latest |
| Package manager | pnpm | Latest |

---

## 8. Data Models

### 8.1 `campuses`
```sql
CREATE TABLE campuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,           -- 'unimelb', 'monash-clayton'
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'AU',
  center_lat DOUBLE PRECISION NOT NULL,
  center_lng DOUBLE PRECISION NOT NULL,
  default_zoom INTEGER NOT NULL DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8.2 `buildings`
```sql
CREATE TABLE buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campus_id UUID REFERENCES campuses(id),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT,
  estimated_capacity INTEGER,
  entrance_lat DOUBLE PRECISION,       -- for navigation
  entrance_lng DOUBLE PRECISION,
  centroid_lat DOUBLE PRECISION,       -- for map label
  centroid_lng DOUBLE PRECISION,
  polygon JSONB,                       -- GeoJSON outline for map
  google_place_id TEXT,                -- for Google Places API calls
  -- Amenities
  has_wifi BOOLEAN DEFAULT TRUE,
  has_power BOOLEAN DEFAULT FALSE,
  has_food_nearby BOOLEAN DEFAULT FALSE,
  has_quiet_zone BOOLEAN DEFAULT FALSE,
  has_group_seating BOOLEAN DEFAULT FALSE,
  is_ground_floor_accessible BOOLEAN DEFAULT FALSE,
  has_elevator BOOLEAN DEFAULT FALSE,
  has_accessible_bathrooms BOOLEAN DEFAULT FALSE,
  has_accessible_parking BOOLEAN DEFAULT FALSE,
  -- Building hours (manually maintained)
  hours_mon TEXT,                      -- '08:00-22:00' or null = closed
  hours_tue TEXT,
  hours_wed TEXT,
  hours_thu TEXT,
  hours_fri TEXT,
  hours_sat TEXT,
  hours_sun TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campus_id, slug)
);
```

### 8.3 `building_zones` (floor-level)
```sql
CREATE TABLE building_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id),
  zone_slug TEXT NOT NULL,             -- 'baillieu-level1', 'baillieu-level2'
  zone_name TEXT,                      -- 'Level 1', 'Level 2 - Quiet Zone'
  polygon JSONB NOT NULL,              -- GeoJSON for client-side zone detection
  capacity INTEGER,
  floor_level INTEGER DEFAULT 0,       -- 0 = ground
  is_quiet_zone BOOLEAN DEFAULT FALSE,
  has_power BOOLEAN DEFAULT FALSE,
  is_accessible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(building_id, zone_slug)
);
```

### 8.4 `zone_occupancy` (live, hot table)
```sql
CREATE TABLE zone_occupancy (
  zone_id UUID REFERENCES building_zones(id) PRIMARY KEY,
  building_id UUID REFERENCES buildings(id),
  occupancy_count INTEGER NOT NULL DEFAULT 0,
  occupancy_pct NUMERIC(5,2) NOT NULL DEFAULT 0,
  trend TEXT CHECK (trend IN ('filling', 'emptying', 'stable')) DEFAULT 'stable',
  prev_pct NUMERIC(5,2),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  data_quality TEXT DEFAULT 'none'     -- 'live' | 'stale' | 'none'
);
```

### 8.5 `occupancy_history`
```sql
CREATE TABLE occupancy_history (
  id BIGSERIAL PRIMARY KEY,
  zone_id UUID REFERENCES building_zones(id),
  building_id UUID REFERENCES buildings(id),
  occupancy_pct NUMERIC(5,2) NOT NULL,
  active_count INTEGER NOT NULL,
  data_source TEXT DEFAULT 'crowdsourced',   -- 'crowdsourced' | 'google'
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_occ_history_zone_time 
  ON occupancy_history(zone_id, recorded_at DESC);
CREATE INDEX idx_occ_history_building_dow_hour 
  ON occupancy_history(building_id, EXTRACT(dow FROM recorded_at), EXTRACT(hour FROM recorded_at));
```

### 8.6 `occupancy_predictions`
```sql
CREATE TABLE occupancy_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id),
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  hour_of_day INTEGER CHECK (hour_of_day BETWEEN 0 AND 23),
  predicted_pct NUMERIC(5,2) NOT NULL,
  confidence TEXT CHECK (confidence IN ('high', 'medium', 'low', 'google-estimated')),
  sample_count INTEGER NOT NULL DEFAULT 0,
  data_source TEXT DEFAULT 'pulse',    -- 'pulse' | 'google'
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(building_id, day_of_week, hour_of_day)
);
```

### 8.7 `google_popularity_cache`
```sql
CREATE TABLE google_popularity_cache (
  building_id UUID REFERENCES buildings(id) PRIMARY KEY,
  current_popularity INTEGER,          -- 0-100 from Google Places API
  is_open_now BOOLEAN,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 8.8 `google_popular_times`
```sql
CREATE TABLE google_popular_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id),
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  hour_of_day INTEGER CHECK (hour_of_day BETWEEN 0 AND 23),
  typical_popularity INTEGER,          -- 0-100
  seeded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(building_id, day_of_week, hour_of_day)
);
```

### 8.9 `user_alerts`
```sql
CREATE TABLE user_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id),
  push_token TEXT NOT NULL,
  threshold_pct INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 9. API Contracts

### 9.1 Supabase Realtime Channels

**`occupancy:{campus_slug}`** (Server -> Client)
```typescript
interface OccupancyUpdate {
  building_id: string;
  blended_pct: number;
  floor_occupancies: {
    zone_id: string;
    floor_level: number;
    zone_name: string;
    occupancy_pct: number;
    trend: 'filling' | 'emptying' | 'stable';
  }[];
  data_quality: 'live' | 'google' | 'predicted' | 'none';
  trend: 'filling' | 'emptying' | 'stable';
  timestamp: string;
}
```

**`anonymous_positions:{campus_slug}`** (Client -> Server, broadcast only)
```typescript
interface PositionBroadcast {
  zone_id: string;       // computed client-side via Turf.js, NEVER raw lat/lng
  session_id: string;    // rotating anon UUID, NEVER stored in DB
  campus_slug: string;
}
```

### 9.2 Edge Function Endpoints

**`POST /functions/v1/register-alert`**
```typescript
{ building_id: string; threshold_pct: number; push_subscription: PushSubscription; expires_at?: string; }
```

**`DELETE /functions/v1/cancel-alert`**
```typescript
{ alert_id: string; push_token: string; }
```

### 9.3 Frontend Hooks
```typescript
useOccupancyRealtime(campusSlug: string): Map<string, OccupancyState>
useBuildings(campusId: string): Building[]
useBuildingCard(buildingId: string): BuildingDetail
useFloorOccupancy(buildingId: string): FloorOccupancy[]
usePrediction(buildingId: string): DayPrediction[]
useGooglePopularity(buildingId: string): GooglePopularityState
useBlendedOccupancy(buildingId: string): BlendedOccupancy
useRecommendations(filters: FilterState, userPosition?: LatLng): RankedBuilding[]
useAlerts(): { alerts: Alert[]; createAlert: Fn; cancelAlert: Fn; }
```

---

## 10. Non-Functional Requirements

### 10.1 Performance

| Metric | Target |
|--------|--------|
| LCP (4G mobile) | < 2.5 seconds |
| LCP (3G mobile) | < 4 seconds |
| Time to interactive | < 3 seconds |
| Occupancy update latency (end-to-end) | < 3 seconds |
| Map pan/zoom FPS | >= 60fps iPhone 12+ |
| Building card open | < 200ms |
| Recommendations after filter change | < 500ms |
| Offline load (from cache) | < 1 second |

### 10.2 Accessibility (WCAG 2.1 AA)
- All elements keyboard navigable
- Map colour coding supplemented with text labels (not colour alone)
- Building cards readable by VoiceOver / TalkBack
- Minimum contrast 4.5:1
- Touch targets minimum 44x44pt
- All icons have `aria-label`
- Filter sheet usable with assistive technology

### 10.3 Security
- No PII transmitted or stored
- Google Places API key: Edge Function env secret only, never in client bundle
- Supabase RLS on all tables
- Rate limiting: 5 alert registrations per push token per hour
- CORS restricted to known origins

### 10.4 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome 100+ (Android) | Full |
| Safari 15+ (iOS) | Full (push requires iOS 16.4+ + home screen install) |
| Firefox 100+ | Full |
| Samsung Internet | Full |

---

## 11. Design System

### 11.1 Visual Identity
Pulse is dark, precise, and campus-native. The aesthetic takes direct inspiration from the University of Melbourne's brand — deep navy authority, gold warmth — applied to a data-dense night-mode interface. The map is the instrument panel. UI chrome is dark and minimal. Data glows through it.

UoM's brand colours are used deliberately. Students at Melbourne know these colours. That recognition breeds trust.

> **Important:** Verify all hex values against the official University of Melbourne Brand Guide before launch. Values below are accurate to UoM's published palette as of 2025.

### 11.2 Colour Palette

```css
/* ── UoM Brand Colours ── */
--color-uom-navy: #003865;          /* Primary UoM navy */
--color-uom-blue: #0080A4;         /* Secondary UoM blue */
--color-uom-gold: #C8A951;         /* UoM gold — primary accent */
--color-uom-gold-light: #E8C97A;   /* Gold hover/tint */

/* ── App Backgrounds (dark, navy-shifted) ── */
--color-bg-primary: #030D1A;        /* Main background */
--color-bg-secondary: #071828;      /* Card backgrounds */
--color-bg-elevated: #0D2340;       /* Bottom sheets, elevated surfaces */
--color-bg-overlay: rgba(3,13,26,0.85);
--color-border: #1A3A5C;
--color-border-bright: #2A5A8C;

/* ── Text ── */
--color-text-primary: #F0F4F8;
--color-text-secondary: #8AAEC8;
--color-text-tertiary: #4A7090;
--color-text-accent: #C8A951;       /* UoM gold for emphasis */

/* ── Occupancy Scale ── */
--color-empty: #4CAF7D;
--color-quiet: #A8C44E;
--color-moderate: #F5A623;          /* UoM-gold-adjacent amber */
--color-busy: #E87040;
--color-packed: #E05252;

/* ── Data Source Indicators ── */
--color-source-live: #4CAF7D;       /* Green dot */
--color-source-google: #0080A4;     /* UoM blue dot */
--color-source-predicted: #C8A951;  /* Gold dot */
--color-source-stale: #4A7090;      /* Grey dot */

/* ── Mapbox Custom Style ── */
/* background: #030D1A, roads: #071828, road strokes: #1A3A5C */
/* building extrusions: #0D2340, labels: #8AAEC8, water: #003865 */
```

### 11.3 Typography

```css
/* Display: Neue Haas Grotesk (or fallback: 'Helvetica Neue', sans-serif) */
/* Body: DM Sans */
/* Mono: JetBrains Mono */

--font-display: 'Neue Haas Grotesk Display', 'Helvetica Neue', sans-serif;
--font-body: 'DM Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Scale */
--text-xs: 0.6875rem;    /* 11px — chips, timestamps */
--text-sm: 0.8125rem;    /* 13px — secondary labels */
--text-base: 1rem;       /* 16px — body */
--text-lg: 1.125rem;     /* 18px — card titles */
--text-xl: 1.375rem;     /* 22px — section headers */
--text-2xl: 1.75rem;     /* 28px — occupancy % on card */
--text-4xl: 3rem;        /* 48px — hero occupancy number */

/* Weight */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 11.4 Spacing & Shape

```css
/* 8pt grid */
--space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
--space-5: 20px; --space-6: 24px; --space-8: 32px; --space-12: 48px;

/* Border Radius */
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-full: 9999px;

/* Shadows */
--shadow-card: 0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,56,101,0.3);
--shadow-elevated: 0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,56,101,0.2);
--glow-gold: 0 0 20px rgba(200,169,81,0.3);
--glow-live: 0 0 12px rgba(76,175,125,0.4);
```

### 11.5 Component Inventory

| Component | Description |
|-----------|-------------|
| `OccupancyBadge` | Coloured pill: "38% · Quiet" |
| `DataSourceBadge` | "● Live / 🌐 Google / ◆ Predicted" with appropriate colour |
| `TrendArrow` | Animated SVG arrow: filling (red up) / emptying (green down) / stable (grey right) |
| `AmenityChip` | Icon + label: WiFi, Power, Quiet Zone, Accessible — UoM blue tint |
| `BuildingCard` | Bottom sheet, two snap states, spring physics |
| `FloorBreakdown` | Per-floor mini bars, quietest floor gets gold "Recommended" |
| `SparklineChart` | 6-hour Recharts sparkline, UoM gold line |
| `PredictionChart` | 24-hour Recharts bar chart, gold = Pulse, blue = Google |
| `FilterSheet` | Bottom sheet, gold toggles + gold slider thumbs |
| `RecommendationCard` | Ranked result: building + walk time + occupancy + amenities |
| `OccupancyBar` | Fill bar, gradient across occupancy colour scale |
| `AlertSheet` | Threshold setter, gold CTA |
| `MapOccupancyLayer` | Mapbox fill-color expression driven by occupancy state |
| `StaleDataBanner` | Amber warning: "Data last updated 3 min ago" |
| `GoogleDataBanner` | Subtle badge: "Showing Google Maps estimates" |
| `InstallBanner` | Navy card, gold CTA: "Add Pulse to your home screen" |
| `SearchBar` | Building search, pill shape, UoM navy fill |

### 11.6 Motion
- Building card: slide up + spring (stiffness 280, damping 28)
- Map polygon colour transitions: 800ms ease-in-out
- Occupancy number: Framer Motion AnimatePresence count roll on update
- Filter sheet: slide up with scale 0.96 -> 1.0
- Floor breakdown: staggered reveal, 50ms delay per floor
- Loading skeleton: pulse animation using elevated/border colours
- Data source badge: fade transition when source changes

---

## 12. UI Screen Specifications

### 12.1 Screen Inventory

| Screen | Route | Description |
|--------|-------|-------------|
| Map (Home) | `/` | Primary screen — live heatmap |
| Building Card | Overlay on `/` | Bottom sheet on polygon tap |
| Recommendations | `/find` | Filtered building list |
| Filter Sheet | Overlay | Full filter controls |
| Alert Setup | Overlay | Threshold setter |
| No Location | Overlay | GPS permission explanation |
| Offline | Overlay | Cached data fallback state |
| PWA Install | Overlay | Home screen install prompt |

---

### 12.2 Map (Home) — Primary Screen

**Mobile layout (375px):**
```
+-----------------------------+
| [Header 52px translucent]   |
| P PULSE           [search][=]|
+-----------------------------+
|                             |
|       MAPBOX MAP            |
|    (full viewport)          |
|                             |
|  building polygons          |
|  glowing green/yellow/red   |
|                             |
| [● 24 users live]           |  <- bottom-left data source pill
+-----------------------------+
| [Map] [Find] [Alerts]       |  <- tab bar 56px
+-----------------------------+
```

**Header:**
- Left: "PULSE" wordmark — Neue Haas Grotesk, 16px, `--color-uom-gold`, semibold
- Right: search icon + hamburger menu
- Background: `--color-bg-primary` at 85% opacity + `backdrop-filter: blur(12px)`
- No bottom border — bleeds into map

**Map Layer Order (bottom to top):**
1. Mapbox basemap (custom UoM dark style)
2. Building polygon fill layer (occupancy colour expression)
3. Building polygon stroke (`--color-border` at 40%)
4. Building label layer (short_name, 11px, `--color-text-secondary`)
5. Occupancy % label (visible at zoom >= 15.5)
6. User location dot (blue pulse if GPS active)

**Data Source Indicator (bottom-left, above tab bar):**
- Small pill showing: "● 24 users live" or "🌐 Google estimates"
- `--text-xs`, `--color-bg-elevated`, 8px padding, `--radius-full`
- Fades in/out on source change

**Stale Data Banner (below header):**
- Visible if no Realtime update > 60 seconds
- Amber bg, "Data last updated 4 min ago · Tap to refresh"
- Auto-dismisses when fresh data arrives

---

### 12.3 Building Card — Collapsed State

Appears on polygon tap. Slides up to occupy bottom ~180px. Map remains interactive above.

```
+-----------------------------+
|       [MAP continues]       |
|                             |
+-- Building Card (180px) ----+
|     [-- drag handle --]     |
|                             |
| Baillieu Library            |
| [████████░░] 78%  [↑ Filling]|
|                             |
| [● Open · Closes 10 PM]     |
|                        [More]|
+-----------------------------+
```

- Drag handle: 36x4px, `--color-border`, centred
- Name: `--text-lg`, `--font-semibold`, `--color-text-primary`
- Occupancy bar: full width, 8px height, rounded ends, occupancy colour
- Percentage: `--text-2xl`, `--font-bold`, occupancy colour
- Trend arrow: animated, coloured (red = filling, green = emptying)
- Open badge: green/red dot + text, `--text-sm`
- "More": `--color-uom-gold` text, right-aligned

---

### 12.4 Building Card — Expanded State

Fills ~70vh. Map visible and dimmed above. Spring physics open animation.

```
+-----------------------------+
|      [MAP dimmed above]     |
+-- Building Card (70vh) -----+
| [-- drag handle --]         |
|                             |
| Baillieu Library            |
| Main Library Building       |  <- short descriptor
|                             |
| [████████░░░] 78%  [↑]      |
| [🌐 Google estimate]        |  <- data source badge
|                             |
| --- By Floor ---            |
| Ground  ████████ 78% Busy   |
| Level 1 ████████ 87% Busy   |
| Level 2 ██░░░░░ 24% Quiet   | -> Recommended
|                             |
| --- Amenities ---           |
| [WiFi] [Power] [Quiet Zone] |
| [Group Seating]             |
|                             |
| --- Today's Pattern ---     |
| [6hr sparkline chart]       |
|                             |
| --- Typical Tuesday ---     |
| [24hr prediction bar chart] |
| "Usually peaks 10AM-1PM"    |
|                             |
| [Navigate] [Alert] [Share]  |
+-----------------------------+
```

**Floor Breakdown:**
- Per-floor row: name + mini bar + percentage + label
- Quietest floor: gold "-> Recommended" label right-aligned
- Tap floor row: map animates to highlight that floor polygon (if data available)

**Prediction Chart:**
- Recharts BarChart, 24 hours X-axis
- Gold bars = Pulse-predicted, UoM blue bars = Google-typical
- Current hour: vertical line indicator
- Tooltip: "Usually 73% at 11 AM on Tuesdays"
- Source legend below chart

**Action Row:**
- Navigate: `--color-uom-blue` filled, rounded-md
- Alert: `--color-uom-gold` filled, rounded-md
- Share: outlined `--color-border`, rounded-md

---

### 12.5 Recommendations Screen

Route: `/find`

```
+-----------------------------+
| [<- Back]  Find a spot      |
+-----------------------------+
| [WiFi] [Power] [Open] [+ More] |  <- filter chips, horizontal scroll
+-----------------------------+
| 3 spaces available          |
|                             |
| +-- Result Card ------------+
| | ERC Library               |
| | ~4 min walk  [●●░] 23% Empty|
| | [WiFi][Power][Quiet Zone]  |
| |                [Go here ->]|
| +---------------------------+
|                             |
| +-- Result Card ------------+
| | Arts West                 |
| | ~6 min walk  [████] 41%  |
| | [WiFi][Group Seating]     |
| |                [Go here ->]|
| +---------------------------+
|                             |
| +-- Result Card ------------+
| | ICT Building              |
| | ~8 min walk  [██████] 58% |
| | [WiFi][Power]             |
| |                [Go here ->]|
| +---------------------------+
+-----------------------------+
```

**Filter Chips (horizontal scroll):**
- Active: `--color-uom-gold` fill, dark text
- Inactive: `--color-bg-elevated` fill, `--color-text-secondary`
- "+ More" -> opens FilterSheet

**Result Card:**
- Building name: `--text-lg`, `--font-semibold`
- Walk time: `--text-sm`, `--color-text-secondary`
- Mini occupancy bar + percentage + label
- Matched amenity chips only
- "Go here" -> opens BuildingCard expanded + triggers navigation

**Empty State:**
- Inline SVG illustration (empty building outline, UoM navy stroke)
- "No spaces match your filters"
- "Try removing some filters" — `--color-uom-gold` link

---

### 12.6 Filter Sheet

Full-coverage bottom sheet over any screen.

```
+-----------------------------+
| [-- drag handle --]         |
|                             |
| Filter spaces               |
|                             |
| --- Space Type ---          |
| Quiet zone       [TOGGLE]   |
| Group seating    [TOGGLE]   |
|                             |
| --- Amenities ---           |
| WiFi             [TOGGLE]   |
| Power outlets    [TOGGLE]   |
| Food nearby      [TOGGLE]   |
|                             |
| --- Access ---              |
| Ground floor     [TOGGLE]   |
| Elevator access  [TOGGLE]   |
|                             |
| --- Max Walk Time ---       |
| [O-----------] 10 min       |
|                             |
| --- Max Occupancy ---       |
| [----------O] 70%           |
|                             |
| [Clear all]  [Show 4 results]|
+-----------------------------+
```

**Toggles:** Active = `--color-uom-gold`, inactive = `--color-border`
**Sliders:** Thumb = `--color-uom-gold` circle, track fill = `--color-uom-gold`
**"Show N results":** `--color-uom-gold` filled, `--radius-full`, full-width

---

### 12.7 No Location Permission Screen

```
+-----------------------------+
|   [MAP in background,       |
|    grey, no heatmap]        |
|                             |
|   +---------------------+   |
|   |                     |   |
|   |        [GPS icon]   |   |
|   |                     |   |
|   | See where's quiet   |   |
|   |                     |   |
|   | Pulse uses your     |   |
|   | location to count   |   |
|   | how busy each       |   |
|   | building is —       |   |
|   | anonymously.        |   |
|   |                     |   |
|   | Your exact position |   |
|   | is never stored.    |   |
|   |                     |   |
|   | [Enable location]   |   |
|   | [Browse without GPS]|   |
|   |                     |   |
|   +---------------------+   |
+-----------------------------+
```

- Card: `--color-bg-elevated`, `--radius-lg`, `--shadow-elevated`
- Primary CTA: `--color-uom-gold` filled, `--radius-full`, full-width
- "Browse without GPS": ghost text, `--color-text-secondary`
- Browsing without GPS: heatmap loads with Google + predicted data, user doesn't contribute

---

### 12.8 PWA Install Banner

Slides up from bottom after 30s engagement. Never shown twice.

```
+-----------------------------+
|                             |
| +---------Install-----------+|
| | P  Add Pulse to your      ||
| |    home screen            ||
| |    Check occupancy in     ||
| |    one tap.               ||
| |                           ||
| | [Add to Home Screen]  [x] ||
| +---------------------------+|
+-----------------------------+
```

- `--color-bg-elevated`, `--radius-lg`, slides up above tab bar
- CTA: `--color-uom-gold` filled
- iOS: tapping CTA shows step-by-step modal (Share -> Add to Home Screen)
- Android: triggers native browser install prompt

---

### 12.9 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| < 640px (mobile) | Full-viewport map, cards as bottom sheets, tab bar |
| 640-1024px (tablet) | Map 60% width, building card as right sidebar |
| > 1024px (desktop) | Map 65%, left sidebar search + results, right sidebar building detail |

---

## 13. Privacy & Ethics

### 13.1 Privacy Principles
1. **No accounts for core features.** Viewing the heatmap and getting recommendations never requires login.
2. **No raw coordinates ever leave the device.** Zone detection is client-side via Turf.js.
3. **No persistent identifiers.** `session_id` rotates every 30 minutes and is never written to any database table.
4. **Auto-expiry.** All position broadcasts expire after 30 minutes.
5. **Opt-in location.** Users can view Google + predicted data without granting GPS.
6. **No third-party analytics.** No Google Analytics, Hotjar, or Mixpanel.
7. **Google integration is read-only.** Pulse reads Google's aggregated public API. No user data flows to Google.

### 13.2 What Data Is Collected

| Data | Collected | Stored | Duration |
|------|-----------|--------|----------|
| Raw GPS coordinates | No | Never | N/A |
| Zone ID | Broadcast only (in-memory) | Never | N/A |
| Session ID | In-memory only | Never | 30 min rotation |
| Zone occupancy count | Yes | Yes | 90 days |
| Google current_popularity | Yes (server-side) | Yes | 60 min cache |
| Push subscription token | Yes (if alert set) | Encrypted | 24h max |

### 13.3 Compliance
- Australian Privacy Act 1988
- GDPR (EU students on exchange)
- No data sold to third parties
- University can request campus data deletion
- "Report inaccuracy" mechanism for accessibility data

### 13.4 Ethical Considerations
- **Stalking prevention:** Floor-level zone granularity (~building wing), not individual seat.
- **Google data transparency:** UI clearly labels when data comes from Google vs Pulse.
- **Accuracy responsibility:** Predictions show source and confidence. Low-confidence predictions clearly labelled.
- **Equity:** Free product. No premium tier.
- **Accessibility data accuracy:** Incorrect data is harmful. Mandatory flagging mechanism.

---

## 14. Out of Scope

| Item | Reason |
|------|--------|
| Native iOS / Android apps | PWA sufficient |
| Bluetooth / WiFi RSSI sensing | Hardware dependency |
| Individual user tracking | Privacy violation |
| Seat-level booking | Integration dependency; Phase 4+ potential |
| Food ordering / payment | Scope creep |
| Campus navigation turn-by-turn | Delegated to native maps |
| Monetising student data | Never in scope |
| Google Maps SDK replacing Mapbox | Different use case; Mapbox handles campus polygon data better |

---

## 15. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Cold start — insufficient crowdsourced data | High | High | **Solved by F010** — Google Popular Times fills gap from day one |
| Google Places API cost escalation | Medium | Medium | Cache aggressively (30min TTL). ~$8/month for 10 buildings. Budget cap in place. |
| Google Places API unavailable | Low | Medium | Fallback to Pulse historical predictions. Handled in blending logic. |
| Location permission denial rate too high | Medium | High | Explain value before requesting. Allow full browsing without GPS. |
| Supabase Realtime connection limits (free tier: 200) | Medium | Medium | Fallback to 30s polling. Upgrade at scale. |
| Building capacity estimates inaccurate | High | Medium | Directional only ("~"). "Report inaccuracy" button. Not claimed as precise. |
| iOS push notifications require iOS 16.4+ + home screen install | High | Medium | In-app alerts as fallback. |
| `current_popularity` not available for all buildings | Medium | Medium | Only buildings with `google_place_id` get Google data. Others use predictions. |
| Accessibility data inaccurate | Medium | High | Manual verification. User confirmation flow. Prominent "report error". |

---

## 16. Resolved Decisions

All open questions from PRD v1.0, resolved by Bruno, March 2026.

| # | Question | Decision |
|---|----------|----------|
| Q1 | Initial UoM buildings | Use whichever buildings have Google Place IDs — easiest set. Start with: Baillieu, ERC, Arts West, Engineering 1, ICT. |
| Q2 | Zone granularity | **Floor-level.** One zone per floor per building. Enables floor breakdown in building cards. Cold start mitigated by Google data. |
| Q3 | Multi-entrance buildings | Track at **building level** (who's in the building, not which entrance). Navigate to primary entrance only. |
| Q4 | iOS push notification prompting | No aggressive prompting. In-app alerts as fallback. Mention home screen install organically. |
| Q5 | Show predictions before own data accumulates | **Yes — show Google Popular Times from day one.** Labelled clearly. Silently transitions to Pulse data as it accumulates. |
| Q6 | Multi-campus architecture | **Same Supabase instance, separate campus slugs.** All data isolated by `campus_id` FK. New campus = new seed data, not new project. |
| Q7 | University analytics dashboard timing | **Build speculatively in Phase 4.** Strong B2B pitch asset even before a university commits. |
| Q8 | Building hours maintenance | **Manually maintained** in `buildings` table. Scraping is fragile. Add "report outdated hours" user flag for corrections. |

---

*This document is a living artifact. Update it when decisions are made or features change. All agents working on this codebase treat this PRD as the primary source of truth for product intent.*
