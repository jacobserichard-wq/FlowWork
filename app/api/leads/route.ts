// app/api/leads/route.ts
//
// PUBLIC email capture for free marketing tools (SEO work order
// 2026-08-26, Task 4). No auth — the calculator page is unauthed by
// design. Guardrails instead: a strict source allowlist, an email
// shape check, a length cap, and an idempotent insert (UNIQUE
// (email, source) + ON CONFLICT DO NOTHING) so repeat submits and
// replays are harmless. Returns {ok:true} on success — the client
// never learns whether the email was already present.

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const ALLOWED_SOURCES = new Set(["market-day-calculator"]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      email?: unknown;
      source?: unknown;
    };
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const source = typeof body.source === "string" ? body.source : "";

    if (!ALLOWED_SOURCES.has(source)) {
      return NextResponse.json({ error: "Unknown source" }, { status: 400 });
    }
    if (
      email.length === 0 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO marketing_leads (email, source)
       VALUES ($1, $2)
       ON CONFLICT (email, source) DO NOTHING`,
      [email.toLowerCase(), source]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead capture error:", err);
    return NextResponse.json(
      { error: "Something went wrong — try again" },
      { status: 500 }
    );
  }
}
