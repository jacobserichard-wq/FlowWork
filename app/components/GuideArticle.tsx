// app/components/GuideArticle.tsx
//
// Post layout for /guides/* articles (SEO work order 2026-08-26,
// Task 6). Server-component-safe. Provides the scaffolding every
// guide needs so individual guide pages carry only their content:
//   - author byline + published/updated dates
//   - Article structured data (JSON-LD)
//   - optional table of contents for long posts
//   - the house closing CTA: guides end at the CALCULATOR, not a
//     trial button (tool → email → trial converts better than
//     guide → trial; work order Task 7).
//
// Usage (inside a guide page.tsx):
//   <GuideArticle
//     title="…" description="…" slug="schedule-c-farmers-market"
//     publishedAt="2026-09-01" updatedAt="2026-09-01"
//     toc={[{ id: "booth-fees", label: "Booth fees" }, …]}
//   >
//     …sections with matching ids…
//   </GuideArticle>

import Link from "next/link";
import type { ReactNode } from "react";

export interface GuideTocEntry {
  id: string;
  label: string;
}

export default function GuideArticle({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  toc,
  children,
}: {
  title: string;
  description: string;
  slug: string;
  /** ISO date, e.g. "2026-09-01". */
  publishedAt: string;
  updatedAt?: string;
  toc?: GuideTocEntry[];
  children: ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://godreamward.com/guides/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    author: {
      "@type": "Person",
      name: "Richard Jacobsen",
      description: "Accountant and founder of Dreamward",
    },
    publisher: { "@type": "Organization", name: "Dreamward" },
  };

  const fmt = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-oat font-sans text-forest">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
      </header>

      <article className="max-w-[720px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <p className="text-xs uppercase tracking-widest text-stone mb-3">
          <Link href="/guides" className="text-stone no-underline hover:text-forest">
            Guides
          </Link>
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold m-0 mb-3 leading-[1.15] text-forest tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-stone m-0 mb-8">
          By Richard Jacobsen, accountant &amp; Dreamward founder
          {" · "}Published {fmt(publishedAt)}
          {updatedAt && updatedAt !== publishedAt
            ? ` · Updated ${fmt(updatedAt)}`
            : ""}
        </p>

        {toc && toc.length > 0 && (
          <nav className="bg-cream border border-sand rounded-xl p-4 mb-8">
            <p className="text-[11px] uppercase tracking-wide text-stone font-semibold m-0 mb-2">
              In this guide
            </p>
            <ul className="m-0 p-0 list-none space-y-1">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="text-sm text-eucalyptus-dark no-underline hover:underline"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="space-y-6 text-[15px] leading-relaxed text-bark [&_h2]:font-serif [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:text-forest [&_h2]:mt-10 [&_h2]:mb-3">
          {children}
        </div>
      </article>

      {/* House close: the calculator, not a trial CTA */}
      <section className="bg-eucalyptus-soft/40 border-t border-sand py-10">
        <div className="max-w-[700px] mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-serif text-xl font-semibold text-forest m-0 mb-2">
            Run the numbers on your own market day
          </h2>
          <p className="text-sm text-bark m-0 mb-4 max-w-lg mx-auto">
            Free calculator — sales, booth, miles, materials, hours in;
            net profit and your real hourly rate out. No signup.
          </p>
          <Link
            href="/tools/market-day-calculator"
            className="inline-block py-2.5 px-6 rounded-full bg-eucalyptus text-cream text-sm font-semibold no-underline hover:bg-eucalyptus-dark"
          >
            Market Day Profit Calculator &rarr;
          </Link>
        </div>
      </section>

      <footer className="border-t border-sand py-6 text-center text-xs text-stone">
        <Link href="/" className="text-bark no-underline mx-2 hover:text-forest">
          Home
        </Link>
        <span className="text-sand">{"\u{00B7}"}</span>
        <Link
          href="/guides"
          className="text-bark no-underline mx-2 hover:text-forest"
        >
          All guides
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
