-- 0050: marketing_leads — email captures from free marketing tools
-- (first consumer: /tools/market-day-calculator's optional "send me the
-- spreadsheet version" form; SEO work order 2026-08-26, Task 4).
-- Public inserts, no auth: email + which surface captured it. UNIQUE
-- so repeat submits are idempotent.

CREATE TABLE IF NOT EXISTS marketing_leads (
  id          SERIAL PRIMARY KEY,
  email       TEXT NOT NULL,
  source      TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (email, source)
);
