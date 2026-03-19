-- Migration 002: Buildings table
-- Source: PRD Section 8.2

CREATE TABLE buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campus_id UUID REFERENCES campuses(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  short_name TEXT,
  estimated_capacity INTEGER,
  entrance_lat DOUBLE PRECISION,
  entrance_lng DOUBLE PRECISION,
  centroid_lat DOUBLE PRECISION,
  centroid_lng DOUBLE PRECISION,
  polygon JSONB,
  google_place_id TEXT,
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
  -- Building hours (manually maintained, format: 'HH:MM-HH:MM' or null = closed)
  hours_mon TEXT,
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

-- Indexes
CREATE INDEX idx_buildings_campus ON buildings(campus_id);
CREATE INDEX idx_buildings_google_place ON buildings(google_place_id) WHERE google_place_id IS NOT NULL;

-- RLS: anyone can read, only service_role can write
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "buildings_select_all" ON buildings
  FOR SELECT USING (true);

CREATE POLICY "buildings_insert_service" ON buildings
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "buildings_update_service" ON buildings
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "buildings_delete_service" ON buildings
  FOR DELETE USING (auth.role() = 'service_role');
