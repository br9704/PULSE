-- Migration 007: Google popularity tables
-- Source: PRD Sections 8.7, 8.8

-- Google current popularity cache (30-min TTL, synced via Edge Function)
CREATE TABLE google_popularity_cache (
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE PRIMARY KEY,
  current_popularity INTEGER,
  is_open_now BOOLEAN,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE google_popularity_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "google_cache_select_all" ON google_popularity_cache
  FOR SELECT USING (true);

CREATE POLICY "google_cache_insert_service" ON google_popularity_cache
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "google_cache_update_service" ON google_popularity_cache
  FOR UPDATE USING (auth.role() = 'service_role');

-- Google typical popular times (weekly histogram, refreshed weekly)
CREATE TABLE google_popular_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  hour_of_day INTEGER CHECK (hour_of_day BETWEEN 0 AND 23),
  typical_popularity INTEGER,
  seeded_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(building_id, day_of_week, hour_of_day)
);

-- Index
CREATE INDEX idx_popular_times_building ON google_popular_times(building_id);

-- RLS
ALTER TABLE google_popular_times ENABLE ROW LEVEL SECURITY;

CREATE POLICY "popular_times_select_all" ON google_popular_times
  FOR SELECT USING (true);

CREATE POLICY "popular_times_insert_service" ON google_popular_times
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "popular_times_update_service" ON google_popular_times
  FOR UPDATE USING (auth.role() = 'service_role');
