-- Migration 008: User alerts
-- Source: PRD Section 8.9
-- NOTE: Alerts are keyed by push_token, NOT by user ID (no accounts required).

CREATE TABLE user_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  push_token TEXT NOT NULL,
  threshold_pct INTEGER NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_alerts_building ON user_alerts(building_id);
CREATE INDEX idx_alerts_expires ON user_alerts(expires_at);
CREATE INDEX idx_alerts_push_token ON user_alerts(push_token);

-- RLS: service_role only for all operations (Edge Functions manage alerts)
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "alerts_select_service" ON user_alerts
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "alerts_insert_service" ON user_alerts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "alerts_update_service" ON user_alerts
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "alerts_delete_service" ON user_alerts
  FOR DELETE USING (auth.role() = 'service_role');
