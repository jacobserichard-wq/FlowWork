// app/for/etsy-sellers/page.tsx
//
// Industry landing page — Etsy sellers. Third of the /for/* series
// (positioning refresh P5). Leads with the hybrid wedge (Etsy shop +
// in-person markets in one set of books) and the after-fees margin
// pain. Etsy ingestion is described as the order-CSV import — the
// direct sync stays unclaimed until the integration is live (house
// rule). No fabricated testimonials — the scenario block is an
// illustrative second-person picture, not an attributed quote.
//
// Pure server component (public route). SignInButton + PriceSlider are
// the client islands.

import Link from "next/link";
import SignInButton from "../../components/SignInButton";
import PriceSlider from "../../components/PriceSlider";

export const metadata = {
  title: "Dreamward for Etsy sellers — know your margin after fees",
  description:
    "Bookkeeping for Etsy sellers who also sell at markets and fairs. Import your Etsy order CSV, track true product costs, and see real per-product margin after materials — plus a Schedule-C-ready P&L, from $10/month.",
};

export default function EtsySellersPage() {
  return (
    <div className="min-h-screen bg-oat font-sans text-forest">
      {/* Header — mirrors the marketing landing */}
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
            For Etsy sellers
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold m-0 mb-4 leading-[1.1] text-forest tracking-tight">
            Sell on Etsy and at markets? One set of books.
          </h1>
          <p className="text-lg sm:text-xl text-bark max-w-2xl mx-auto m-0 mb-8 leading-relaxed">
            Your Etsy orders, your craft-fair weekends, and what every
            product truly costs to make — together in one honest P&amp;L.
          </p>
          <SignInButton label="Start free 14-day trial" />
          <p className="text-xs text-stone mt-4">No credit card required.</p>
        </div>
      </header>

      {/* Three things that matter most to an Etsy seller */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon={"\u{1F9EE}"}
            title="Your real margin, not your gross"
            body="Etsy's dashboard shows what you sold — not what it cost you to make. Give each product a recipe of materials and Dreamward tracks true cost as supply prices drift, so your margin is a number, not a hope."
          />
          <FeatureCard
            icon={"\u{1F4E5}"}
            title="Import orders in two minutes"
            body="Download Etsy's order CSV, drop it in, and your sales land as line items that match themselves to your products. Map an item once and every past and future sale of it resolves automatically."
          />
          <FeatureCard
            icon={"\u{1F3EA}"}
            title="Etsy + market weekends, one tax return"
            body="Craft fairs, farmers markets, and your online shop roll into one P&L — booth fees and mileage included — and one Schedule C at tax time, with inventory value (Form 1125-A) figured for you."
          />
        </div>
      </section>

      {/* Illustrative scenario — NOT an attributed quote (no fabricated
          social proof). Second person keeps it honest + concrete. */}
      <section className="bg-eucalyptus-soft/40 border-y border-sand py-12 sm:py-16">
        <div className="max-w-[760px] mx-auto px-4 sm:px-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-forest m-0 mb-5 text-center">
            Picture a restock week
          </h2>
          <p className="text-base text-bark leading-relaxed m-0">
            Your candle restock sells through — thirty Etsy orders by
            Friday, then a craft fair on Saturday. Your wax supplier raised
            prices in March and jars went up in June. In Dreamward, those
            price changes are already in each product&apos;s recipe, the
            fair&apos;s booth fee and mileage are on the books, and the
            weekend&apos;s question has a real answer: after materials and
            costs, the whole week cleared an actual number — one you can
            price next season&apos;s line on.
          </p>
        </div>
      </section>

      {/* Honest integration note — CSV today, sync when it ships */}
      <section className="max-w-[760px] mx-auto px-4 sm:px-8 py-10 text-center">
        <p className="text-sm text-bark m-0">
          Today, Etsy orders come in via Etsy&apos;s own CSV export — a
          two-minute download, no store connection needed. Square syncs
          live, Shopify and more are on the way, and your data exports to
          CSV anytime.
        </p>
      </section>

      {/* Pricing — reuse the same revenue slider as the homepage */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-forest m-0 mb-2">
            Priced for a handmade shop, not an enterprise
          </h2>
          <p className="text-sm text-bark max-w-2xl mx-auto m-0">
            Every feature on every plan, from $10/month. Your price is set by
            your revenue and moves with you — never by which tools
            you&apos;re allowed to use.
          </p>
        </div>
        <PriceSlider />
      </section>

      {/* Bottom CTA */}
      <section className="bg-eucalyptus-soft/50 border-t border-sand py-12 sm:py-16">
        <div className="max-w-[800px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold m-0 mb-3 text-forest">
            Know what your shop really earns
          </h2>
          <p className="text-base text-bark m-0 mb-6 max-w-xl mx-auto">
            14-day free trial. Import an Etsy order CSV, cost your top
            sellers, and see your real margin in your first afternoon.
          </p>
          <SignInButton label="Start free 14-day trial" />
          <p className="text-xs text-stone mt-4">No credit card required.</p>
        </div>
      </section>

      {/* Footer — carries the same trust line as the homepage */}
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
          {"\u{00A9}"} {new Date().getFullYear()} Dreamward
        </p>
      </footer>
    </div>
  );
}

// ─── Helpers (server-component-safe) ─────────────────────────────────

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

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-cream rounded-2xl border border-sand p-5 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-serif text-base font-semibold text-forest m-0 mb-2">
        {title}
      </h3>
      <p className="text-sm text-bark m-0 leading-relaxed">{body}</p>
    </div>
  );
}
