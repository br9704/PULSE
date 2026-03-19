-- Migration 006: Occupancy predictions (pre-computed)
-- Source: PRD Section 8.6

CREATE TABLE occupancy_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  hour_of_day INTEGER CHECK (hour_of_day BETWEEN 0 AND 23),
  predicted_pct NUMERIC(5,2) NOT NULL,
  confidence TEXT CHECK (confidence IN ('high', 'medium', 'low', 'google-estimated')),
  sample_count INTEGER NOT NULL DEFAULT 0,
  data_source TEXT DEFAULT 'pulse',
  computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(building_id, day_of_week, hour_of_day)
);

-- Index for building lookup
CREATE INDEX idx_predictions_building ON occupancy_predictions(building_id);

-- RLS: anyone can read, only service_role can write
ALTER TABLE occupancy_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "predictions_select_all" ON occupancy_predictions
  FOR SELECT USING (true);

CREATE POLICY "predictions_insert_service" ON occupancy_predictions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "predictions_update_service" ON occupancy_predictions
  FOR UPDATE USING (auth.role() = 'service_role');
