-- Migration 001: Campuses table
-- Source: PRD Section 8.1

CREATE TABLE campuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'AU',
  center_lat DOUBLE PRECISION NOT NULL,
  center_lng DOUBLE PRECISION NOT NULL,
  default_zoom INTEGER NOT NULL DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: anyone can read, only service_role can write
ALTER TABLE campuses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "campuses_select_all" ON campuses
  FOR SELECT USING (true);

CREATE POLICY "campuses_insert_service" ON campuses
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "campuses_update_service" ON campuses
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "campuses_delete_service" ON campuses
  FOR DELETE USING (auth.role() = 'service_role');
