// app/guides/page.tsx
//
// Guides index (SEO work order 2026-08-26, Task 6). The site's first
// informational surface — every high-volume query in this space is
// informational and the sitemap had zero pages able to catch any of
// it. Guides publish here as they're written (the substance is
// Richard's — accounting voice is the differentiator and is never
// approximated). Until the first one ships, this page is an honest
// index of what's coming + the working calculator, so it's useful on
// day one rather than a bare stub.
//
// Post layout for individual guides: app/components/GuideArticle.tsx
// (byline, published/updated dates, Article JSON-LD, optional TOC).

import Link from "next/link";

export const metadata = {
  // Query-first; the root layout template appends "· Dreamward".
  title: "Guides: Bookkeeping for Makers & Market Vendors",
  description:
    "Practical bookkeeping guides for makers who sell at farmers markets, craft fairs, and online — taxes, costing, and market-day math, written by an accountant. First guides are in the works.",
};

const UPCOMING: { title: string; blurb: string }[] = [
  {
    title: "Schedule C for farmers market vendors",
    blurb:
      "Where booth fees land, mileage to and from markets, unsold inventory at year end, and how to handle cash sales.",
  },
  {
    title: "Is a craft fair worth it?",
    blurb:
      "The full cost of a fair — fee, drive, hours — and the honest math for deciding which events earn their table.",
  },
  {
    title: "Combining Etsy, Square, and cash sales",
    blurb:
      "One set of books when your sales come from three directions.",
  },
  {
    title: "Cottage food bookkeeping",
    blurb:
      "Record-keeping for home-kitchen sellers, from ingredients to market-day totals.",
  },
  {
    title: "Ingredient cost drift",
    blurb:
      "Your materials got more expensive this year. Did your prices notice?",
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen bg-oat font-sans text-forest">
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

        <div className="max-w-[760px] mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-10 text-center">
          <p className="text-xs uppercase tracking-widest text-stone mb-3">
            Guides
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold m-0 mb-4 leading-[1.1] text-forest tracking-tight">
            Bookkeeping guides for makers
          </h1>
          <p className="text-base sm:text-lg text-bark max-w-xl mx-auto m-0 leading-relaxed">
            Taxes, costing, and market-day math for people who sell at
            markets, fairs, and online — written by an accountant, not a
            content farm. The first guides are being written now.
          </p>
        </div>
      </header>

      {/* Usable today: the calculator */}
      <section className="max-w-[760px] mx-auto px-4 sm:px-8 py-10">
        <div className="bg-eucalyptus-soft/40 border border-sand rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-semibold text-forest m-0 mb-2">
            While you wait: run your own market-day math
          </h2>
          <p className="text-sm text-bark m-0 mb-4 max-w-lg mx-auto">
            Our free calculator answers the first question every guide here
            comes back to — did the market day actually pay? No signup,
            nothing leaves your browser.
          </p>
          <Link
            href="/tools/market-day-calculator"
            className="inline-block py-2.5 px-6 rounded-full bg-eucalyptus text-cream text-sm font-semibold no-underline hover:bg-eucalyptus-dark"
          >
            Market Day Profit Calculator &rarr;
          </Link>
        </div>
      </section>

      {/* What's coming */}
      <section className="max-w-[760px] mx-auto px-4 sm:px-8 pb-12 sm:pb-16">
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-forest m-0 mb-4">
          In the works
        </h2>
        <ul className="m-0 p-0 list-none space-y-3">
          {UPCOMING.map((g) => (
            <li
              key={g.title}
              className="bg-cream border border-sand rounded-xl p-4"
            >
              <p className="text-sm font-semibold text-forest m-0 mb-1">
                {g.title}
              </p>
              <p className="text-xs text-bark m-0">{g.blurb}</p>
            </li>
          ))}
        </ul>
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
          href="/tools/market-day-calculator"
          className="text-bark no-underline mx-2 hover:text-forest"
        >
          Market-day calculator
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
