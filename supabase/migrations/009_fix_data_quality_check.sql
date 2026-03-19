-- Fix data_quality CHECK constraint to include all blending sources
-- DB originally had: 'live', 'stale', 'none'
-- TypeScript had: 'live', 'google', 'predicted', 'none'
-- Correct set: 'live', 'google', 'predicted', 'stale', 'none'

ALTER TABLE zone_occupancy DROP CONSTRAINT IF EXISTS zone_occupancy_data_quality_check;
ALTER TABLE zone_occupancy ADD CONSTRAINT zone_occupancy_data_quality_check
  CHECK (data_quality IN ('live', 'google', 'predicted', 'stale', 'none'));
