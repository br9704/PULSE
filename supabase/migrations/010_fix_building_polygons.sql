-- Migration 010: Fix building polygons to match actual footprints
-- Coordinates researched from OpenStreetMap, Wikipedia, Mapcarta, and Google Maps
--
-- Problem: Original polygons were oversized rectangles (~140m x 100m) that were
-- misaligned from actual building positions. Real UoM buildings are typically 40-80m across.
--
-- Fix: Tighter polygons (~50-65m) correctly positioned over each building footprint.
-- GeoJSON coordinate order: [longitude, latitude]
-- Campus centre reference: -37.7964, 144.9631

-- ============================================================
-- 1. Baillieu Library (Building 177)
-- Location: 11 Professors Walk, south side of South Lawn
-- Wikipedia coords: 37 47'55"S 144 57'34"E = -37.7986, 144.9594
-- The building runs roughly east-west along Professors Walk
-- Approx footprint: ~70m E-W x 40m N-S
-- ============================================================
UPDATE buildings SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9589,-37.7983],[144.9600,-37.7983],[144.9600,-37.7987],[144.9589,-37.7987],[144.9589,-37.7983]]]}',
  centroid_lat = -37.7985,
  centroid_lng = 144.9594,
  entrance_lat = -37.7984,
  entrance_lng = 144.9594
WHERE id = 'b0000000-0000-0000-0000-000000000001';

UPDATE building_zones SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9589,-37.7983],[144.9600,-37.7983],[144.9600,-37.7987],[144.9589,-37.7987],[144.9589,-37.7983]]]}'
WHERE building_id = 'b0000000-0000-0000-0000-000000000001';

-- ============================================================
-- 2. Eastern Resource Centre / ERC Library (Building 171)
-- Location: East side of campus, near Swanston St / Monash Rd intersection
-- Part of the New Student Precinct, near 1888 Courtyard
-- Approx footprint: ~50m E-W x 45m N-S
-- ============================================================
UPDATE buildings SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9634,-37.7970],[144.9641,-37.7970],[144.9641,-37.7974],[144.9634,-37.7974],[144.9634,-37.7970]]]}',
  centroid_lat = -37.7972,
  centroid_lng = 144.9637,
  entrance_lat = -37.7971,
  entrance_lng = 144.9637
WHERE id = 'b0000000-0000-0000-0000-000000000002';

UPDATE building_zones SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9634,-37.7970],[144.9641,-37.7970],[144.9641,-37.7974],[144.9634,-37.7974],[144.9634,-37.7970]]]}'
WHERE building_id = 'b0000000-0000-0000-0000-000000000002';

-- ============================================================
-- 3. Arts West (Building 148A/148B)
-- Location: West side of campus on Professors Walk, opposite Old Arts
-- Distinctive faceted facade, north and west wings
-- Approx footprint: ~55m E-W x 50m N-S
-- ============================================================
UPDATE buildings SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9584,-37.7955],[144.9592,-37.7955],[144.9592,-37.7960],[144.9584,-37.7960],[144.9584,-37.7955]]]}',
  centroid_lat = -37.7958,
  centroid_lng = 144.9588,
  entrance_lat = -37.7957,
  entrance_lng = 144.9588
WHERE id = 'b0000000-0000-0000-0000-000000000003';

UPDATE building_zones SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9584,-37.7955],[144.9592,-37.7955],[144.9592,-37.7960],[144.9584,-37.7960],[144.9584,-37.7955]]]}'
WHERE building_id = 'b0000000-0000-0000-0000-000000000003';

-- ============================================================
-- 4. Engineering Building 1 / Old Engineering School (Building 173)
-- Location: Southern end of campus along Wilson Avenue, near Grattan St
-- Large red brick building
-- Approx footprint: ~60m E-W x 45m N-S
-- ============================================================
UPDATE buildings SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9631,-37.7991],[144.9640,-37.7991],[144.9640,-37.7995],[144.9631,-37.7995],[144.9631,-37.7991]]]}',
  centroid_lat = -37.7993,
  centroid_lng = 144.9636,
  entrance_lat = -37.7992,
  entrance_lng = 144.9636
WHERE id = 'b0000000-0000-0000-0000-000000000004';

UPDATE building_zones SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9631,-37.7991],[144.9640,-37.7991],[144.9640,-37.7995],[144.9631,-37.7995],[144.9631,-37.7991]]]}'
WHERE building_id = 'b0000000-0000-0000-0000-000000000004';

-- ============================================================
-- 5. Doug McDonell Building / ICT (Building 168)
-- Location: Porters Lane, adjacent to Engineering precinct
-- Coordinates from vymaps: -37.7991, 144.9629
-- Approx footprint: ~45m E-W x 50m N-S
-- ============================================================
UPDATE buildings SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9624,-37.7987],[144.9631,-37.7987],[144.9631,-37.7992],[144.9624,-37.7992],[144.9624,-37.7987]]]}',
  centroid_lat = -37.7990,
  centroid_lng = 144.9628,
  entrance_lat = -37.7988,
  entrance_lng = 144.9628
WHERE id = 'b0000000-0000-0000-0000-000000000005';

UPDATE building_zones SET
  polygon = '{"type":"Polygon","coordinates":[[[144.9624,-37.7987],[144.9631,-37.7987],[144.9631,-37.7992],[144.9624,-37.7992],[144.9624,-37.7987]]]}'
WHERE building_id = 'b0000000-0000-0000-0000-000000000005';
