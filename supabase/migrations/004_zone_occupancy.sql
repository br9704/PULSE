-- Migration 004: Zone occupancy (live, hot table)
-- Source: PRD Section 8.4
-- NOTE: session_id is NEVER stored in this or any table.
-- NOTE: This table is published to Supabase Realtime.

CREATE TABLE zone_occupancy (
  zone_id UUID REFERENCES building_zones(id) ON DELETE CASCADE PRIMARY KEY,
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  occupancy_count INTEGER NOT NULL DEFAULT 0,
  occupancy_pct NUMERIC(5,2) NOT NULL DEFAULT 0,
  trend TEXT CHECK (trend IN ('filling', 'emptying', 'stable')) DEFAULT 'stable',
  prev_pct NUMERIC(5,2),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  data_quality TEXT CHECK (data_quality IN ('live', 'stale', 'none')) DEFAULT 'none'
);

-- Indexes
CREATE INDEX idx_zone_occ_building ON zone_occupancy(building_id);

-- RLS: anyone can read, only service_role can write
ALTER TABLE zone_occupancy ENABLE ROW LEVEL SECURITY;

CREATE POLICY "zone_occ_select_all" ON zone_occupancy
  FOR SELECT USING (true);

CREATE POLICY "zone_occ_insert_service" ON zone_occupancy
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "zone_occ_update_service" ON zone_occupancy
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "zone_occ_delete_service" ON zone_occupancy
  FOR DELETE USING (auth.role() = 'service_role');

-- Enable Realtime for this table
-- Supabase: ALTER PUBLICATION supabase_realtime ADD TABLE zone_occupancy;
-- This needs to be run after table creation in Supabase dashboard or via:
ALTER PUBLICATION supabase_realtime ADD TABLE zone_occupancy;
