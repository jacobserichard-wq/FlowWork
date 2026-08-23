// lib/freeTier.ts
//
// Free tier engine — "free until your first $500 in tracked sales"
// (session-notes/free-tier-spec.md, all decisions Jacob 2026-08-23).
// Dark-launched: the engine runs from the daily cron, but public
// pricing copy stays unchanged until the Shopify App Store listing is
// approved (its reviewed plan is $10/mo — no mid-review discrepancies).
//
// Lifecycle:
//   trial expires (no Stripe sub) ──▶ 'free'   (settleExpiredTrials)
//   'free' + lifetime sales ≥ $500 ──▶ upgrade_required_at = NOW()
//   14 days later, still no checkout ──▶ 'canceled' (read-only)
//   checkout completes ──▶ band plan via Stripe webhook (which also
//   clears upgrade_required_at)
//
// Exclusions, everywhere: is_test rows (comped founding users 7 + 17,
// demo, reviewer) and Shopify-billed accounts (their lane is Shopify
// App Pricing — never cross billing lanes).
//
// The threshold uses LIFETIME tracked sales (a one-way ratchet), not
// trailing-12-month revenue — crossing once makes you a customer.
// computeLifetimeRevenue mirrors computeTrailingRevenue (same
// classifier, same refund netting) with the date filters removed.

import pool from "@/lib/db";
import { buildClassifier } from "@/lib/reports/aggregate";
import { type Industry } from "@/lib/categories";

/** Lifetime tracked-sales threshold (USD) that ends the free tier. */
export const FREE_TIER_THRESHOLD_USD = 500;

/** Days of full access after crossing the threshold before read-only. */
export const FREE_TIER_GRACE_DAYS = 14;

/** Lifetime tracked revenue for a client, net of refunds. Mirrors
 *  revenueTier.computeTrailingRevenue with no date window. */
export async function computeLifetimeRevenue(
  clientId: number,
  industry: Industry
): Promise<number> {
  const [txnsRes, settingsRes, eventsRes] = await Promise.all([
    pool.query<{ amount: string; category: string | null }>(
      `SELECT amount, category
         FROM processed_items
        WHERE client_id = $1
          AND status = 'paid'`,
      [clientId]
    ),
    pool.query<{
      custom_categories: string[] | null;
      preferences: { custom_income_categories?: string[] } | null;
    }>(
      `SELECT custom_categories, preferences
         FROM client_settings
        WHERE client_id = $1`,
      [clientId]
    ),
    pool.query<{ revenue: string | null }>(
      `SELECT revenue FROM events WHERE client_id = $1`,
      [clientId]
    ),
  ]);

  const settings = settingsRes.rows[0] ?? null;
  const customExpense: string[] = Array.isArray(settings?.custom_categories)
    ? (settings!.custom_categories as string[])
    : [];
  const prefIncome = settings?.preferences?.custom_income_categories;
  const customIncome: string[] = Array.isArray(prefIncome) ? prefIncome : [];
  const classify = buildClassifier(industry, customIncome, customExpense);

  const REFUND_CATEGORY = "Returns & Refunds";
  let revenue = 0;
  for (const row of txnsRes.rows) {
    const amount = Number(row.amount) || 0;
    if (classify(row.category) === "income") {
      revenue += amount;
    } else if (row.category === REFUND_CATEGORY) {
      revenue -= Math.abs(amount);
    }
  }
  for (const e of eventsRes.rows) {
    revenue += e.revenue == null ? 0 : Number(e.revenue) || 0;
  }
  return revenue;
}

/** Expired trials with no Stripe subscription soft-land on the free
 *  tier instead of dangling as 'trial' forever (there was never a
 *  lockout — this replaces a missing path, it doesn't tighten one).
 *  Shopify-billed and is_test rows are untouched. */
export async function settleExpiredTrials(): Promise<{ settled: number }> {
  const res = await pool.query<{ id: number }>(
    `UPDATE clients
        SET plan = 'free', updated_at = NOW()
      WHERE plan = 'trial'
        AND NOT is_test
        AND trial_ends_at IS NOT NULL
        AND trial_ends_at < NOW()
        AND stripe_subscription_id IS NULL
        AND COALESCE(billing_source, 'stripe') = 'stripe'
      RETURNING id`
  );
  return { settled: res.rowCount ?? 0 };
}

export interface FreeTierEnforceResult {
  scanned: number;
  /** Crossed the threshold this pass — grace clock started. */
  clockStarted: number;
  /** Dipped back under (refunds) — clock cleared. */
  clockCleared: number;
  /** Grace expired without checkout — flipped to read-only. */
  lockedOut: number;
  errors: number;
}

/** Daily pass over free-tier accounts: start/clear the grace clock
 *  against the lifetime-sales threshold, and flip accounts whose grace
 *  window ran out. Per-client failures are logged and skipped. */
export async function enforceFreeTier(): Promise<FreeTierEnforceResult> {
  const summary: FreeTierEnforceResult = {
    scanned: 0,
    clockStarted: 0,
    clockCleared: 0,
    lockedOut: 0,
    errors: 0,
  };

  const clients = await pool.query<{
    id: number;
    industry: string | null;
    upgrade_required_at: string | null;
  }>(
    `SELECT id, industry, upgrade_required_at
       FROM clients
      WHERE plan = 'free'
        AND NOT is_test
        AND COALESCE(billing_source, 'stripe') = 'stripe'`
  );
  summary.scanned = clients.rows.length;

  for (const c of clients.rows) {
    try {
      // Grace expired → read-only. (Checked before recomputing revenue
      // so a long-ignored account doesn't dodge the flip via an error
      // in the revenue query.)
      if (
        c.upgrade_required_at !== null &&
        Date.now() - new Date(c.upgrade_required_at).getTime() >
          FREE_TIER_GRACE_DAYS * 24 * 60 * 60 * 1000
      ) {
        await pool.query(
          `UPDATE clients SET plan = 'canceled', updated_at = NOW()
            WHERE id = $1 AND plan = 'free'`,
          [c.id]
        );
        summary.lockedOut++;
        continue;
      }

      const revenue = await computeLifetimeRevenue(
        c.id,
        (c.industry ?? "other") as Industry
      );

      if (revenue >= FREE_TIER_THRESHOLD_USD && c.upgrade_required_at === null) {
        await pool.query(
          `UPDATE clients SET upgrade_required_at = NOW(), updated_at = NOW()
            WHERE id = $1 AND plan = 'free' AND upgrade_required_at IS NULL`,
          [c.id]
        );
        summary.clockStarted++;
      } else if (
        revenue < FREE_TIER_THRESHOLD_USD &&
        c.upgrade_required_at !== null
      ) {
        // Refund edge: they dipped back under — be forgiving.
        await pool.query(
          `UPDATE clients SET upgrade_required_at = NULL, updated_at = NOW()
            WHERE id = $1 AND plan = 'free'`,
          [c.id]
        );
        summary.clockCleared++;
      }
    } catch (err) {
      console.error(`[freeTier] enforce failed for client ${c.id}:`, err);
      summary.errors++;
    }
  }

  return summary;
}
