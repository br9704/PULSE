-- Migration 005: Occupancy history (15-min snapshots)
-- Source: PRD Section 8.5

CREATE TABLE occupancy_history (
  id BIGSERIAL PRIMARY KEY,
  zone_id UUID REFERENCES building_zones(id) ON DELETE CASCADE,
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  occupancy_pct NUMERIC(5,2) NOT NULL,
  active_count INTEGER NOT NULL,
  data_source TEXT DEFAULT 'crowdsourced',
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance indexes for prediction queries
CREATE INDEX idx_occ_history_zone_time
  ON occupancy_history(zone_id, recorded_at DESC);

CREATE INDEX idx_occ_history_building_dow_hour
  ON occupancy_history(building_id, EXTRACT(dow FROM (recorded_at AT TIME ZONE 'UTC')), EXTRACT(hour FROM (recorded_at AT TIME ZONE 'UTC')));

CREATE INDEX idx_occ_history_building_time
  ON occupancy_history(building_id, recorded_at DESC);

-- RLS: anyone can read, only service_role can write
ALTER TABLE occupancy_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "occ_history_select_all" ON occupancy_history
  FOR SELECT USING (true);

CREATE POLICY "occ_history_insert_service" ON occupancy_history
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
