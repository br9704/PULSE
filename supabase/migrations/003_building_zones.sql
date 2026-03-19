-- Migration 003: Building zones (floor-level)
-- Source: PRD Section 8.3

CREATE TABLE building_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  zone_slug TEXT NOT NULL,
  zone_name TEXT,
  polygon JSONB NOT NULL,
  capacity INTEGER,
  floor_level INTEGER DEFAULT 0,
  is_quiet_zone BOOLEAN DEFAULT FALSE,
  has_power BOOLEAN DEFAULT FALSE,
  is_accessible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(building_id, zone_slug)
);

-- Indexes
CREATE INDEX idx_zones_building ON building_zones(building_id);

-- RLS: anyone can read, only service_role can write
ALTER TABLE building_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "zones_select_all" ON building_zones
  FOR SELECT USING (true);

CREATE POLICY "zones_insert_service" ON building_zones
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "zones_update_service" ON building_zones
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "zones_delete_service" ON building_zones
  FOR DELETE USING (auth.role() = 'service_role');
