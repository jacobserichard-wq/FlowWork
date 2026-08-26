// app/compare/stocksmith/page.tsx
//
// Named head-to-head: Dreamward vs Stocksmith — the NEW name for
// Craftybase (rebrand confirmed + pricing checked at stocksmith.io
// 2026-08-26). A separate page from /compare/craftybase on purpose
// (SEO work order Task 5): the old name will be searched for years
// while the new-name query is thin and winnable. Cross-linked with
// plain prose, NOT a redirect.
//
// IMPORTANT — accuracy discipline (named competitor): every claim in
// the "Stocksmith" column is limited to what's publicly documented
// (weighted-average recosting, tiered plan limits, online/handmade
// inventory focus, their published pricing). No defect assertions.
// Re-verify pricing at stocksmith.io/pricing before strengthening
// any claim; the dated line in the table caption is the contract.
//
// Pure server component (public route). SignInButton is the client
// island for the CTA.

import Link from "next/link";
import SignInButton from "../../components/SignInButton";
import FaqSection from "../../components/FaqSection";

export const metadata = {
  // Query-first (SEO work order Task 1 convention); the root layout
  // template appends "· Dreamward".
  title: "Stocksmith Alternative for In-Person Sellers",
  description:
    "Stocksmith is Craftybase under a new name. Compare it to Dreamward: FIFO costing that never rewrites history, every feature on every plan from $10/month, and in-person market P&L that inventory-first tools skip.",
  openGraph: {
    title: "Dreamward vs Stocksmith",
    description:
      "A Stocksmith alternative built for makers who sell in person AND online: FIFO costing, every feature on every plan, from $10/month.",
    type: "website",
  },
};

export default function StocksmithComparePage() {
  return (
    <div className="min-h-screen bg-oat font-sans text-forest">
      {/* Header */}
      <header className="border-b border-sand/70">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-5 flex justify-between items-center">
          <Link
            href="/"
            className="m-0 text-xl sm:text-2xl font-semibold font-serif no-underline text-forest flex items-center gap-2"
          >
            <SproutMark className="w-6 h-6 text-eucalyptus" />
            Dreamward
          </Link>
          <Link
            href="/signin"
            className="text-sm text-bark hover:text-forest no-underline"
          >
            Sign in
          </Link>
        </div>

        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-stone mb-3">
            Dreamward vs Stocksmith
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold m-0 mb-4 leading-[1.1] text-forest tracking-tight">
            Looking at Stocksmith? Start here.
          </h1>
          <p className="text-lg sm:text-xl text-bark max-w-2xl mx-auto m-0 mb-8 leading-relaxed">
            First, the confusion: <strong>Stocksmith is Craftybase</strong> —
            same team, same software, new name. If you&apos;re comparing
            maker inventory tools, here&apos;s how Dreamward is built
            differently: FIFO costing that never rewrites history, every
            feature on every plan, and in-person markets as first-class
            P&amp;L. Starting at $10/month.
          </p>
          <SignInButton label="Start free 14-day trial" />
          <p className="text-xs text-stone mt-4">
            14-day free trial. No credit card required.
          </p>
        </div>
      </header>

      {/* Quick-read table — every "Stocksmith" cell is a documented fact,
          not a defect claim. */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-forest m-0 mb-2">
            The quick read
          </h2>
          <p className="text-sm text-bark m-0">
            Both track recipe COGS well. Here&apos;s where the two genuinely
            diverge.
          </p>
        </div>
        <div className="bg-cream rounded-2xl border border-sand overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-eucalyptus-soft/40 border-b border-sand">
                <th className="text-left py-3 px-4 font-semibold text-forest w-[40%]">
                  What you actually care about
                </th>
                <th className="text-left py-3 px-4 font-semibold text-bark">
                  Stocksmith
                </th>
                <th className="text-left py-3 px-4 font-semibold text-eucalyptus-dark">
                  Dreamward
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/60">
              <ComparisonRow
                feature="Change a material cost — does last year's profit move?"
                them="Rolling weighted-average recalculates costs as prices change"
                us="No — FIFO locks each sale's cost the moment it sells"
              />
              <ComparisonRow
                feature="In-person markets as their own P&L (booth fee + mileage)"
                them="Geared to online / handmade inventory"
                us="Yes — every market is a first-class P&L unit"
              />
              <ComparisonRow
                feature="Every feature on every plan"
                them="Plans scale by features and tracking limits"
                us="Yes — all of it, from $10/mo"
              />
              <ComparisonRow
                feature="What sets your price"
                them="Plan tier: Pro $20 · Studio $49 · Indie $99 · Business $199 · Growth $349 /mo"
                us="Your revenue band — $10 to $99/mo, auto-adjusts as you grow"
              />
              <ComparisonRow
                feature="Schedule-C P&L + Form 1125-A inventory value"
                them="COGS + inventory tracking focus"
                us="On your tax report automatically, every plan"
              />
            </tbody>
          </table>
        </div>
        <p className="text-center text-[11px] text-stone mt-3 max-w-2xl mx-auto">
          Searched for the old name? Our{" "}
          <Link href="/compare/craftybase" className="text-bark underline">
            Craftybase comparison
          </Link>{" "}
          covers the same product pre-rename. Their price climbs with plan
          features and limits; Dreamward&apos;s climbs only with your
          revenue. Pricing checked August 26, 2026 — verify current rates at
          stocksmith.io/pricing. Both are good tools — pick the one that
          fits how you sell.
        </p>
      </section>

      {/* Deep-dive — the differentiators, framed for the renamed product */}
      <section className="bg-eucalyptus-soft/40 border-y border-sand py-12 sm:py-16">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-forest m-0 mb-2">
              The three that matter most
            </h2>
            <p className="text-sm text-bark max-w-2xl mx-auto m-0">
              Same differences that applied to Craftybase — the rename
              didn&apos;t change the method.
            </p>
          </div>

          <div className="space-y-6">
            <CompareSection
              num="1"
              title="Your filed numbers stay put"
              theirCopy="Stocksmith uses the rolling weighted-average cost method — every material purchase recalculates the average cost per unit, and manufacturing draws on that current average. It's a valid, IRS-accepted method, but it means a cost you enter today can move the cost-of-goods behind sales you already reported."
              ourCopy="Dreamward uses FIFO and locks each sale's cost the moment it sells — drawing down your oldest stock at the price you actually paid. Change a cost today and it applies going forward; a number you already filed never moves."
              highlight
            />
            <CompareSection
              num="2"
              title="Built for booth AND online, not just online"
              theirCopy="Stocksmith is built around handmade inventory and COGS for online sellers. In-person markets — the booth fee, the drive, the cash box — aren't modeled as their own profit-and-loss."
              ourCopy="Dreamward treats every market as a first-class P&L unit: booth fee, auto-tracked mileage, and the day's sales in one place, so you can see which markets actually pay. Your online channels roll into the same ledger."
            />
            <CompareSection
              num="3"
              title="Priced by your size, not your plan tier"
              theirCopy="Stocksmith's five plans run $20 to $349 per month billed monthly, with features and tracking limits scaling by tier — growing your catalog or history can mean moving up a plan."
              ourCopy="Dreamward includes every feature on every plan and prices by your revenue band, $10 to $99 per month. Your tier auto-adjusts as your tracked revenue grows — no feature gates, no upgrade-to-unlock walls."
            />
          </div>
        </div>
      </section>

      <FaqSection
        faqs={[
          {
            q: "Is Stocksmith the same as Craftybase?",
            a: "Yes — Stocksmith is Craftybase after a rebrand: same team, same software, new name. Reviews, tutorials, and comparisons written about Craftybase describe the same product you'd be buying as Stocksmith today.",
          },
          {
            q: "Is Dreamward a good Stocksmith alternative?",
            a: "Yes. Dreamward covers the recipe COGS and real-time inventory makers use Stocksmith for, and adds in-person market P&L — booth fee, mileage, and market-day sales — that Stocksmith doesn't model. It starts at $10/month with every feature included.",
          },
          {
            q: "How do the prices compare?",
            a: "Dreamward runs $10 to $99 per month, set only by your revenue band, with every feature on every plan. Stocksmith lists Pro at $20, Studio at $49, Indie at $99, Business at $199, and Growth at $349 per month billed monthly (about 17% less billed annually), with features and limits scaling by tier. Pricing checked August 26, 2026 — verify current rates at stocksmith.io/pricing.",
          },
          {
            q: "Can I move from Stocksmith to Dreamward?",
            a: "Yes. Paste or import your product catalog (insert-only, so it never overwrites), connect Square (or import a CSV from Shopify/Wix/anywhere) to bring in past orders, and see real margins in minutes. Your data always exports back to CSV — no lock-in.",
          },
        ]}
      />

      {/* Bottom CTA — Victoria's real quote (permission given 2026-07-08). */}
      <section className="bg-eucalyptus-soft/50 border-t border-sand py-12 sm:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-8 text-center">
          <figure className="m-0 mb-8">
            <blockquote className="text-base text-bark italic m-0 leading-relaxed max-w-xl mx-auto">
              {"\u{201C}"}Dreamward makes it so much easier to stay
              organized, understand your numbers, and focus on growth
              instead of paperwork.{"\u{201D}"}
            </blockquote>
            <figcaption className="text-xs text-stone mt-2">
              — Victoria, Sweet to the Soul
            </figcaption>
          </figure>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold m-0 mb-3 text-forest">
            Try it on your own products
          </h2>
          <p className="text-base text-bark m-0 mb-6 max-w-xl mx-auto">
            14-day free trial. Connect Square (or import a CSV from any
            store), add a market or two, and see your real gross-margin
            numbers in your first afternoon.
          </p>
          <SignInButton label="Start free 14-day trial" />
          <p className="text-xs text-stone mt-4">No credit card required.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sand py-6 text-center text-xs text-stone">
        <p className="m-0 mb-2 text-bark">
          Your data is yours. Export to CSV anytime. No lock-in.
        </p>
        <Link href="/" className="text-bark no-underline mx-2 hover:text-forest">
          Home
        </Link>
        <span className="text-sand">{"\u{00B7}"}</span>
        <Link
          href="/privacy"
          className="text-bark no-underline mx-2 hover:text-forest"
        >
          Privacy
        </Link>
        <span className="text-sand">{"\u{00B7}"}</span>
        <Link
          href="/terms"
          className="text-bark no-underline mx-2 hover:text-forest"
        >
          Terms
        </Link>
        <p className="m-0 mt-2">
          {"\u{00A9}"} {new Date().getFullYear()} Dreamward. Stocksmith and
          Craftybase are trademarks of their respective owner; this page is
          an independent comparison.
        </p>
      </footer>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function SproutMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 22V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M12 13c-3.3 0-6-2.7-6-6 3.3 0 6 2.7 6 6Z" fill="currentColor" />
      <path d="M12 11c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" fill="currentColor" />
    </svg>
  );
}

function ComparisonRow({
  feature,
  them,
  us,
}: {
  feature: string;
  them: string;
  us: string;
}) {
  return (
    <tr>
      <td className="py-3 px-4 text-forest font-medium">{feature}</td>
      <td className="py-3 px-4 text-bark">{them}</td>
      <td className="py-3 px-4 text-eucalyptus-dark">
        <span className="inline-flex items-start gap-1.5">
          <span className="text-eucalyptus">{"\u{2713}"}</span>
          <span>{us}</span>
        </span>
      </td>
    </tr>
  );
}

function CompareSection({
  num,
  title,
  theirCopy,
  ourCopy,
  highlight,
}: {
  num: string;
  title: string;
  theirCopy: string;
  ourCopy: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-cream rounded-2xl border p-6 ${
        highlight ? "border-honey ring-2 ring-honey/30" : "border-sand"
      }`}
    >
      {highlight && (
        <p className="text-[11px] uppercase tracking-widest text-honey-dark font-semibold m-0 mb-2">
          {"\u{2728}"} The one that matters most
        </p>
      )}
      <h3 className="font-serif text-lg font-semibold text-forest m-0 mb-4">
        <span className="text-stone mr-2">{num}.</span>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-stone font-semibold m-0 mb-2">
            Stocksmith
          </p>
          <p className="text-sm text-bark leading-relaxed m-0">{theirCopy}</p>
        </div>
        <div className="md:border-l md:border-sand md:pl-4">
          <p className="text-[11px] uppercase tracking-wide text-eucalyptus-dark font-semibold m-0 mb-2">
            Dreamward
          </p>
          <p className="text-sm text-forest leading-relaxed m-0">{ourCopy}</p>
        </div>
      </div>
    </div>
  );
}
