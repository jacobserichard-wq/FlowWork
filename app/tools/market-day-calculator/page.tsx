// app/tools/market-day-calculator/page.tsx
//
// Free market-day profit calculator (SEO work order 2026-08-26,
// Task 4) — the highest-value new page on the site: no signup, no
// gate, client-side math only. The wedge in tool form: "was
// Saturday's booth worth it" as arithmetic anyone can run from a
// phone at their table.
//
// Server component: metadata + WebApplication structured data. All
// interaction lives in MarketDayCalculator (client island). The
// default IRS standard mileage rate mirrors the app's configured
// value (app_settings.irs_mileage_rate, $0.70/mi as of 2026-08-26)
// and is editable on the page — the calculator never hardcodes a
// figure the user can't see and correct.

import Link from "next/link";
import MarketDayCalculator from "../../components/MarketDayCalculator";

export const metadata = {
  // Query-first; the root layout template appends "· Dreamward".
  title: "Market Day Profit Calculator (Free, No Signup)",
  description:
    "Did Saturday actually make money? Free market-day calculator for farmers market and craft fair vendors: enter sales, booth fee, miles, materials, and hours — get net profit, your real hourly rate, and the IRS mileage deduction. No signup, nothing leaves your browser.",
};

const APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Market Day Profit Calculator",
  url: "https://godreamward.com/tools/market-day-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: "Dreamward" },
};

export default function MarketDayCalculatorPage() {
  return (
    <div className="min-h-screen bg-oat font-sans text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_JSON_LD) }}
      />

      {/* Header — mirrors the marketing pages */}
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

        <div className="max-w-[760px] mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-8 sm:pb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-stone mb-3">
            Free tool
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold m-0 mb-4 leading-[1.1] text-forest tracking-tight">
            Did Saturday actually make money?
          </h1>
          <p className="text-base sm:text-lg text-bark max-w-xl mx-auto m-0 leading-relaxed">
            The market-day math most vendors never run: sales minus the
            booth, the drive, and the materials that walked away — divided
            by every hour the day really took. Free, no signup, and the
            numbers never leave your browser.
          </p>
        </div>
      </header>

      {/* The calculator itself (client island — live math, no submit) */}
      <section className="max-w-[760px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <MarketDayCalculator />
      </section>

      {/* Closing line → the product story */}
      <section className="bg-eucalyptus-soft/40 border-t border-sand py-10 sm:py-14">
        <div className="max-w-[700px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-forest m-0 mb-3">
            One market is a snapshot.
          </h2>
          <p className="text-sm sm:text-base text-bark m-0 mb-5 leading-relaxed">
            Dreamward runs this exact math automatically for every market
            you work, all season — booth fees, mileage at the IRS rate,
            true material costs from your recipes, and the day&apos;s sales
            — so you know which markets earn their table fee and which are
            just nice mornings outside.
          </p>
          <Link
            href="/for/farmers-market-vendors"
            className="inline-block py-2.5 px-6 rounded-full bg-eucalyptus text-cream text-sm font-semibold no-underline hover:bg-eucalyptus-dark"
          >
            See how vendors use Dreamward &rarr;
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sand py-6 text-center text-xs text-stone">
        <p className="m-0 mb-2 text-bark">
          Your numbers stay in your browser — this page sends nothing
          anywhere.
        </p>
        <Link href="/" className="text-bark no-underline mx-2 hover:text-forest">
          Home
        </Link>
        <span className="text-sand">{"\u{00B7}"}</span>
        <Link
          href="/markets"
          className="text-bark no-underline mx-2 hover:text-forest"
        >
          Find markets near you
        </Link>
        <span className="text-sand">{"\u{00B7}"}</span>
        <Link
          href="/privacy"
          className="text-bark no-underline mx-2 hover:text-forest"
        >
          Privacy
        </Link>
        <p className="m-0 mt-2">
          {"\u{00A9}"} {new Date().getFullYear()} Dreamward
        </p>
      </footer>
    </div>
  );
}

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
