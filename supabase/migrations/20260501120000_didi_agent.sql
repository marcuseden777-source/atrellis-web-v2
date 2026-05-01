-- =============================================================================
-- Didi Agent Schema — Atrellis Pte. Ltd.
-- Apply this in Supabase Dashboard → SQL Editor
-- or via: supabase db push
-- =============================================================================

-- ── Helper: auto-update updated_at ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── conversations ─────────────────────────────────────────────────────────────
-- Stores the full session state for each Didi conversation (web + Telegram)
CREATE TABLE IF NOT EXISTS conversations (
  session_id       TEXT        PRIMARY KEY,
  channel          TEXT        NOT NULL CHECK (channel IN ('web', 'telegram')),
  telegram_chat_id BIGINT,
  stage            TEXT        NOT NULL DEFAULT 'greeting',
  lead_data        JSONB       NOT NULL DEFAULT '{}',
  messages         JSONB       NOT NULL DEFAULT '[]',
  is_escalated     BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── leads ─────────────────────────────────────────────────────────────────────
-- Qualified lead records — written on capture_lead and book_site_visit
CREATE TABLE IF NOT EXISTS leads (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   TEXT        NOT NULL REFERENCES conversations(session_id) ON DELETE CASCADE,
  lead_data    JSONB       NOT NULL DEFAULT '{}',
  stage        TEXT        NOT NULL,
  channel      TEXT        NOT NULL,
  is_escalated BOOLEAN     NOT NULL DEFAULT FALSE,
  escalated_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_session_id_idx ON leads (session_id);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- ── config ────────────────────────────────────────────────────────────────────
-- Runtime settings: Andrew's Telegram chat_id, feature flags, etc.
CREATE TABLE IF NOT EXISTS config (
  key        TEXT        PRIMARY KEY,
  value      JSONB       NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER config_updated_at
  BEFORE UPDATE ON config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Row-Level Security ────────────────────────────────────────────────────────
-- All DB access is server-side via service_role — anon/authenticated blocked.
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE config        ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'conversations' AND policyname = 'service_role_full_access') THEN
    CREATE POLICY "service_role_full_access" ON conversations TO service_role USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'service_role_full_access') THEN
    CREATE POLICY "service_role_full_access" ON leads TO service_role USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'config' AND policyname = 'service_role_full_access') THEN
    CREATE POLICY "service_role_full_access" ON config TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;
