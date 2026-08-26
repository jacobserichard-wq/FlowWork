// app/components/MarketDayCalculator.tsx
//
// Client island for /tools/market-day-calculator (SEO work order
// 2026-08-26, Task 4). Live math, no submit button, nothing persisted
// or sent — the ONLY network call on the page is the clearly-optional
// email capture below the results, which posts just the email to
// /api/leads.
//
// Method (matches the product's market-day P&L):
//   mileage cost   = round-trip miles × IRS standard rate (editable,
//                    default mirrors app_settings.irs_mileage_rate)
//   net profit     = gross sales − booth fee − materials − mileage
//   real hourly    = net profit ÷ total hours (prep + travel + setup
//                    + selling + teardown + cleanup)
// The IRS-rate figure doubles as the tax-deduction line vendors want.

"use client";

import { useState } from "react";

/** Default = the app's configured IRS standard mileage rate
 *  (app_settings.irs_mileage_rate; $0.70/mi checked 2026-08-26).
 *  Editable on the page so a rate change never strands the tool. */
const DEFAULT_IRS_RATE = "0.70";

function toNum(v: string): number {
  const n = Number(v.replace(/[$,\s]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function fmtUsd(n: number): string {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function MarketDayCalculator() {
  const [gross, setGross] = useState("");
  const [booth, setBooth] = useState("");
  const [miles, setMiles] = useState("");
  const [materials, setMaterials] = useState("");
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState(DEFAULT_IRS_RATE);

  // email capture (optional, the only thing that leaves the page)
  const [email, setEmail] = useState("");
  const [leadState, setLeadState] = useState<
    "idle" | "saving" | "done" | "error"
  >("idle");

  const grossN = toNum(gross);
  const boothN = toNum(booth);
  const milesN = toNum(miles);
  const materialsN = toNum(materials);
  const hoursN = toNum(hours);
  const rateN = toNum(rate);

  const mileageCost = milesN * rateN;
  const net = grossN - boothN - materialsN - mileageCost;
  const hourly = hoursN > 0 ? net / hoursN : null;
  const hasInput = grossN > 0 || boothN > 0 || milesN > 0 || materialsN > 0;

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (leadState === "saving" || leadState === "done") return;
    setLeadState("saving");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "market-day-calculator" }),
      });
      setLeadState(res.ok ? "done" : "error");
    } catch {
      setLeadState("error");
    }
  };

  return (
    <div>
      {/* Inputs — single column, phone-first (vendors at a booth) */}
      <div className="bg-cream rounded-2xl border border-sand p-5 sm:p-6 space-y-4">
        <Field
          label="Gross sales for the day"
          hint="Cash box + card reader, before anything comes out"
          prefix="$"
          value={gross}
          onChange={setGross}
          placeholder="380"
        />
        <Field
          label="Booth fee"
          hint="What the market charged for your spot"
          prefix="$"
          value={booth}
          onChange={setBooth}
          placeholder="40"
        />
        <Field
          label="Round-trip miles"
          hint="Home to market and back"
          value={miles}
          onChange={setMiles}
          placeholder="44"
        />
        <Field
          label="Materials cost of what sold"
          hint="What the goods that left your table cost you to make"
          prefix="$"
          value={materials}
          onChange={setMaterials}
          placeholder="95"
        />
        <Field
          label="Total hours"
          hint="Prep + travel + setup + selling + teardown + cleanup"
          value={hours}
          onChange={setHours}
          placeholder="9"
        />
        <details className="text-xs text-stone">
          <summary className="cursor-pointer select-none">
            IRS standard mileage rate: ${rate || "0"}/mile (tap to change)
          </summary>
          <div className="mt-2 max-w-[200px]">
            <Field
              label="Rate per mile"
              prefix="$"
              value={rate}
              onChange={setRate}
              placeholder={DEFAULT_IRS_RATE}
            />
          </div>
        </details>
      </div>

      {/* Results — live, no submit */}
      <div className="bg-forest text-cream rounded-2xl p-5 sm:p-6 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <Result
            label="Net profit for the day"
            value={hasInput ? fmtUsd(net) : "—"}
            accent={net >= 0}
            big
          />
          <Result
            label="Your real hourly rate"
            value={hasInput && hourly !== null ? `${fmtUsd(hourly)}/hr` : "—"}
            accent={(hourly ?? 0) >= 0}
          />
          <Result
            label="Mileage deduction (IRS rate)"
            value={milesN > 0 ? fmtUsd(mileageCost) : "—"}
            accent
          />
        </div>
        <p className="text-[11px] text-cream/70 m-0 mt-4 text-center leading-relaxed">
          Net counts your drive at the IRS standard rate — the same method
          Dreamward uses on market-day P&amp;Ls. The mileage figure is also
          your tax-deduction line for the trip. Nothing you type here
          leaves your browser.
        </p>
      </div>

      {/* Optional email capture — the calculator works fully without it */}
      <div className="bg-cream rounded-2xl border border-sand p-5 sm:p-6 mt-4">
        {leadState === "done" ? (
          <p className="text-sm text-eucalyptus-dark m-0 text-center">
            Got it — the spreadsheet version is on its way to your inbox.
          </p>
        ) : (
          <>
            <p className="text-sm text-forest font-medium m-0 mb-1">
              Want this as a spreadsheet?
            </p>
            <p className="text-xs text-bark m-0 mb-3">
              Optional — the calculator is yours either way. Leave an email
              and we&apos;ll send the free spreadsheet version you can use
              offline at any market. Nothing else, ever, unless you ask.
            </p>
            <form
              onSubmit={submitLead}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (leadState === "error") setLeadState("idle");
                }}
                required
                placeholder="you@example.com"
                className="flex-1 py-2.5 px-3 text-sm border border-sand rounded-lg bg-white outline-none focus:border-eucalyptus box-border"
              />
              <button
                type="submit"
                disabled={leadState === "saving"}
                className="py-2.5 px-5 rounded-lg border-0 bg-eucalyptus text-cream text-sm font-semibold cursor-pointer hover:bg-eucalyptus-dark disabled:opacity-60"
              >
                {leadState === "saving" ? "Sending…" : "Send it"}
              </button>
            </form>
            {leadState === "error" && (
              <p className="text-xs text-rose-dark m-0 mt-2">
                That didn&apos;t go through — check the address and try
                again.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  prefix,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint?: string;
  prefix?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-forest mb-0.5">
        {label}
      </span>
      {hint && <span className="block text-xs text-stone mb-1.5">{hint}</span>}
      <span className="relative block">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-bark text-sm">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-2.5 ${prefix ? "pl-7" : "pl-3"} pr-3 text-base border border-sand rounded-lg bg-white outline-none focus:border-eucalyptus box-border`}
        />
      </span>
    </label>
  );
}

function Result({
  label,
  value,
  accent,
  big,
}: {
  label: string;
  value: string;
  accent?: boolean;
  big?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-cream/70 m-0 mb-1">
        {label}
      </p>
      <p
        className={`m-0 font-bold ${big ? "text-3xl" : "text-xl"} ${
          accent ? "text-cream" : "text-rose-soft"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
