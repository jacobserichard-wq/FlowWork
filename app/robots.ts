// app/robots.ts
//
// Robots policy, served at /robots.txt (special metadata route —
// previously a 404). Public marketing pages are crawlable; the
// authenticated app + API surface is not. Points crawlers at the
// sitemap so the /compare/* and /for/* SEO pages get discovered.

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/admin",
        "/billing",
        "/settings",
        "/expenses",
        "/integrations",
        "/onboarding",
        "/transactions",
        "/inventory",
        "/invoices",
        "/reports",
        // SEO work order 2026-08-26 (Task 2): Disallow is a PREFIX
        // match, and "market day" / "events" / "profitability" are the
        // marketing vocabulary — a bare "/market-day" would also block
        // future marketing pages like /market-day-calculator. Scope the
        // three phrase-collision routes: "$" (Google-supported) blocks
        // exactly the app page; the "/…/" form covers children.
        // Marketing pages live under /tools/ and /guides/, unaffected.
        "/events$",
        "/events/",
        "/market-day$",
        "/profitability$",
        "/welcome-pro",
      ],
    },
    sitemap: "https://godreamward.com/sitemap.xml",
  };
}
