-- 0049: Free tier (dark launch) — "free until your first $500 in
-- tracked sales" (session-notes/free-tier-spec.md, decided 2026-08-23).
--
-- clients.plan gains the value 'free' (text column — no enum change).
-- upgrade_required_at is the grace clock: stamped when a free account's
-- lifetime tracked sales cross the threshold; 14 days later without a
-- checkout the daily cron flips the account to 'canceled' (read-only).
-- NULL = under the threshold (or clock cleared by checkout/webhook).

ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS upgrade_required_at TIMESTAMPTZ;
