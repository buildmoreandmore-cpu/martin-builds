import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: "Real Estate Command Center — martinbuilds.ai",
  description:
    "Live sales dashboard for real estate agents. Track leads, conversions, marketing spend, contracts, and deal analysis in one premium command center.",
};

/* ─── static demo data ─── */

const FUNNEL = [
  { stage: "New leads", count: 148, conv: null },
  { stage: "Contacted", count: 112, conv: 76 },
  { stage: "Qualified", count: 61, conv: 54 },
  { stage: "Showing", count: 38, conv: 62 },
  { stage: "Offer made", count: 18, conv: 47 },
  { stage: "Closed", count: 14, conv: 78 },
];

const CHANNELS = [
  { name: "Zillow / Realtor.com", leads: 42, spend: 1680, cpl: 40, color: "amber" as const, note: "High intent" },
  { name: "Google Ads", leads: 31, spend: 3100, cpl: 100, color: "red" as const, note: "Brand awareness" },
  { name: "Facebook / Instagram", leads: 48, spend: 1680, cpl: 35, color: "green" as const, note: "Best CPL" },
  { name: "Referrals", leads: 27, spend: 0, cpl: 0, color: "green" as const, note: "Highest close" },
];

const LEADS = [
  { initials: "JT", name: "James Torres", interest: "Buy · $300k–$400k", badge: "Hot" as const },
  { initials: "SL", name: "Sarah Langley", interest: "Sell · Est. $520k", badge: "Warm" as const },
  { initials: "DP", name: "David Park", interest: "Buy · $200k–$250k", badge: "Contract" as const },
  { initials: "MR", name: "Maria Rodriguez", interest: "Buy · $450k–$600k", badge: "Nurture" as const },
  { initials: "KW", name: "Kevin Walsh", interest: "Sell · Est. $310k", badge: "New" as const },
];

const CONTRACTS = [
  { property: "142 Birchwood Dr", price: "$349,000", close: "Apr 7", days: 3, status: "Addendum" as const },
  { property: "88 Commerce Blvd", price: "$520,000", close: "Apr 18", days: 14, status: "In review" as const },
  { property: "55 Lakeview Ct", price: "$215,000", close: "Apr 22", days: 18, status: "Signed" as const },
  { property: "310 Hollowbrook Ln", price: "$475,000", close: "May 2", days: 28, status: "Signed" as const },
  { property: "2204 Maple Ridge", price: "$298,500", close: "May 9", days: 35, status: "Inspection" as const },
];

const CONVERSION_BY_SOURCE = [
  { channel: "Referrals", leads: 27, rate: 41, color: "text-green-700" },
  { channel: "Google Ads", leads: 31, rate: 19, color: "text-blue-700" },
  { channel: "Zillow", leads: 42, rate: 14, color: "text-amber-700" },
  { channel: "Facebook", leads: 48, rate: 11, color: "text-amber-700" },
];

const ACTIVITY = [
  { time: "3:42 PM", text: "142 Birchwood Dr — contract expires in 3 days, buyer unresponsive", dot: "bg-red-600" },
  { time: "2:15 PM", text: "55 Lakeview Ct — buyer signed final addendum", dot: "bg-green-600" },
  { time: "1:30 PM", text: "New lead: Maria Rodriguez — Buy $450k–$600k via Facebook", dot: "bg-purple-600" },
  { time: "12:00 PM", text: "8 leads gone quiet (7+ days) — auto-flagged for follow-up", dot: "bg-amber-500" },
  { time: "10:45 AM", text: "Google Ads monthly budget at 82% — $620 remaining", dot: "bg-blue-600" },
  { time: "9:10 AM", text: "Referral from David Park closed — $14,250 commission", dot: "bg-green-600" },
];

const DEALS = [
  {
    address: "142 Birchwood Dr",
    list: 359000,
    offer: 349000,
    pctDiff: -2.8,
    dom: 9,
    grossComm: 10470,
    marketingCost: 1860,
    netComm: 8610,
    source: "Zillow",
  },
  {
    address: "310 Hollowbrook Ln",
    list: 469000,
    offer: 475000,
    pctDiff: 1.3,
    dom: 4,
    grossComm: 14250,
    marketingCost: 0,
    netComm: 14250,
    source: "Referral",
  },
];

/* ─── helpers ─── */

function daysColor(d: number) {
  if (d <= 7) return "text-red-700 bg-red-100";
  if (d <= 21) return "text-amber-700 bg-amber-100";
  return "text-green-700 bg-green-100";
}

function statusColor(s: string) {
  switch (s) {
    case "Addendum": return "text-red-700 bg-red-100";
    case "In review": return "text-amber-700 bg-amber-100";
    case "Signed": return "text-green-700 bg-green-100";
    case "Inspection": return "text-blue-700 bg-blue-100";
    default: return "text-gray-700 bg-gray-100";
  }
}

function badgeColor(b: string) {
  switch (b) {
    case "Hot": return "text-red-700 bg-red-100";
    case "Warm": return "text-amber-700 bg-amber-100";
    case "Contract": return "text-green-700 bg-green-100";
    case "Nurture": return "text-purple-700 bg-purple-100";
    case "New": return "text-blue-700 bg-blue-100";
    default: return "text-gray-700 bg-gray-100";
  }
}

function cplColor(c: "green" | "amber" | "red") {
  if (c === "green") return "text-green-700";
  if (c === "amber") return "text-amber-700";
  return "text-red-700";
}

const funnelColors = [
  "bg-blue-200",
  "bg-blue-300",
  "bg-blue-400",
  "bg-blue-500",
  "bg-blue-600",
  "bg-blue-700",
];

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function fmtUsd(n: number) {
  return "$" + n.toLocaleString("en-US");
}

/* ─── page ─── */

export default function RealEstateCommandCenter() {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} min-h-screen`}
      style={{ backgroundColor: "#FAFAF8", fontFamily: "var(--font-dm-sans)" }}
    >
      {/* ── CSS keyframes for staggered fade-up ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.5s ease-out forwards;
        }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.10s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.20s; }
        .delay-5 { animation-delay: 0.25s; }
        .delay-6 { animation-delay: 0.30s; }
        .delay-7 { animation-delay: 0.35s; }
        .delay-8 { animation-delay: 0.40s; }
        .delay-9 { animation-delay: 0.45s; }
        .delay-10 { animation-delay: 0.50s; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ═══════════════ 1. TOP BAR ═══════════════ */}
        <div className="fade-up delay-1 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "#14532d", fontFamily: "var(--font-playfair)" }}>
              Real Estate Command Center
            </h1>
            <p className="mt-1 text-sm" style={{ color: "#6b7280", fontFamily: "var(--font-dm-mono)" }}>
              April 2025 &middot; 6 active deals &middot; $2.31M pipeline
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
              Lead&rarr;close 18.4%
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Cost per lead $84
            </span>
          </div>
        </div>

        {/* ═══════════════ 2. ALERT BANNER ═══════════════ */}
        <div className="fade-up delay-2 mb-6 flex flex-col gap-3 rounded-xl border border-green-300 bg-green-50 p-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "#bbf7d0" }}>
          <p className="text-sm font-medium text-green-900">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-600" />
            <strong>142 Birchwood Dr</strong> — contract expires in 3 days. Buyer hasn&apos;t signed the addendum. Last contact was 6 days ago.
          </p>
          <button className="shrink-0 rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#14532d" }}>
            Draft follow-up
          </button>
        </div>

        {/* ═══════════════ 3. KPI ROW ═══════════════ */}
        <div className="fade-up delay-3 mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Leads this month", value: "148", sub: "↑22 vs last month", accent: null },
            { label: "Active conversations", value: "27", sub: "8 gone quiet 7d+", accent: "amber" },
            { label: "Lead → close rate", value: "18.4%", sub: "↑2.1% vs Q1", accent: "green" },
            { label: "Cost per lead", value: "$84", sub: "↓$12 vs last month", accent: "green" },
            { label: "Commission pipeline", value: "$41,200", sub: "3 closing this month", accent: "green" },
          ].map((kpi, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-4"
              style={{ borderColor: "#E8E3DC" }}
            >
              <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "#6b7280" }}>{kpi.label}</p>
              <p className="mt-1 text-2xl font-bold" style={{ fontFamily: "var(--font-dm-mono)", color: "#14532d" }}>{kpi.value}</p>
              <p className={`mt-1 text-xs font-medium ${kpi.accent === "amber" ? "text-amber-700" : kpi.accent === "green" ? "text-green-700" : "text-gray-500"}`}>
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ═══════════════ 4. THREE-COLUMN GRID ═══════════════ */}
        <div className="fade-up delay-4 mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* ── Lead pipeline / Conversion funnel ── */}
          <div className="rounded-xl border bg-white p-5" style={{ borderColor: "#E8E3DC" }}>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: "#14532d" }}>Lead Pipeline</h2>
            <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>Conversion funnel</p>
            <div className="space-y-3">
              {FUNNEL.map((f, i) => {
                const pct = (f.count / 148) * 100;
                return (
                  <div key={i}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-700">{f.stage}</span>
                      <span style={{ fontFamily: "var(--font-dm-mono)" }}>
                        <span className="font-semibold text-gray-900">{f.count}</span>
                        {f.conv !== null && <span className="ml-1 text-gray-400">({f.conv}%)</span>}
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${funnelColors[i]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Marketing spend / CPL ── */}
          <div className="rounded-xl border bg-white p-5" style={{ borderColor: "#E8E3DC" }}>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: "#14532d" }}>Marketing Spend</h2>
            <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>Cost per lead by channel</p>
            <div className="space-y-4">
              {CHANNELS.map((ch, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700">{ch.name}</span>
                    <span className={`font-semibold ${cplColor(ch.color)}`} style={{ fontFamily: "var(--font-dm-mono)" }}>
                      {ch.cpl === 0 ? "$0" : `$${ch.cpl}`}/lead
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(ch.leads / 48) * 100}%`,
                          backgroundColor: ch.color === "green" ? "#14532d" : ch.color === "amber" ? "#92400e" : "#991b1b",
                        }}
                      />
                    </div>
                    <span className="whitespace-nowrap text-[10px] text-gray-400" style={{ fontFamily: "var(--font-dm-mono)" }}>
                      {ch.leads} leads &middot; {fmtUsd(ch.spend)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] italic text-gray-400">{ch.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Active lead contacts ── */}
          <div className="rounded-xl border bg-white p-5" style={{ borderColor: "#E8E3DC" }}>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: "#14532d" }}>Active Lead Contacts</h2>
            <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>5 priority leads</p>
            <div className="space-y-3">
              {LEADS.map((l, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "#14532d" }}
                  >
                    {l.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{l.name}</p>
                    <p className="truncate text-xs text-gray-500">{l.interest}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeColor(l.badge)}`}>
                    {l.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ 5. TWO-COLUMN (wider left) ═══════════════ */}
        <div className="fade-up delay-6 mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* ── Contract tracker (2 cols wide) ── */}
          <div className="rounded-xl border bg-white p-5 lg:col-span-2" style={{ borderColor: "#E8E3DC" }}>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: "#14532d" }}>Contract Tracker</h2>
            <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>5 active contracts</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase tracking-wide text-gray-400" style={{ borderColor: "#E8E3DC" }}>
                    <th className="pb-2 font-medium">Property</th>
                    <th className="pb-2 font-medium">Price</th>
                    <th className="pb-2 font-medium">Close</th>
                    <th className="pb-2 font-medium">Days left</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTRACTS.map((c, i) => (
                    <tr key={i} className="border-b last:border-0" style={{ borderColor: "#E8E3DC" }}>
                      <td className="py-2.5 font-medium text-gray-900">{c.property}</td>
                      <td className="py-2.5" style={{ fontFamily: "var(--font-dm-mono)" }}>{c.price}</td>
                      <td className="py-2.5 text-gray-500">{c.close}</td>
                      <td className="py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${daysColor(c.days)}`} style={{ fontFamily: "var(--font-dm-mono)" }}>
                          {c.days}d
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Conversion by lead source ── */}
          <div className="rounded-xl border bg-white p-5" style={{ borderColor: "#E8E3DC" }}>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: "#14532d" }}>Conversion by Lead Source</h2>
            <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>Close rate by channel</p>
            <div className="space-y-4">
              {CONVERSION_BY_SOURCE.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{s.channel}</span>
                    <span className={`font-bold ${s.color}`} style={{ fontFamily: "var(--font-dm-mono)" }}>{s.rate}%</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(s.rate / 41) * 100}%`,
                          backgroundColor: s.color.includes("green") ? "#14532d" : s.color.includes("blue") ? "#1e40af" : "#92400e",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400" style={{ fontFamily: "var(--font-dm-mono)" }}>{s.leads} leads</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ 6. TWO-COLUMN (narrower left) ═══════════════ */}
        <div className="fade-up delay-8 mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* ── Activity feed ── */}
          <div className="rounded-xl border bg-white p-5" style={{ borderColor: "#E8E3DC" }}>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: "#14532d" }}>Activity Feed</h2>
            <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>Today</p>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${a.dot}`} />
                    {i < ACTIVITY.length - 1 && <div className="mt-1 w-px flex-1 bg-gray-200" />}
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-medium text-gray-900">{a.text}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400" style={{ fontFamily: "var(--font-dm-mono)" }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Deal analyzer ── */}
          <div className="rounded-xl border bg-white p-5 lg:col-span-2" style={{ borderColor: "#E8E3DC" }}>
            <h2 className="mb-1 text-sm font-bold uppercase tracking-wide" style={{ color: "#14532d" }}>Deal Analyzer</h2>
            <p className="mb-4 text-xs" style={{ color: "#6b7280" }}>Active negotiations</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {DEALS.map((d, i) => {
                const isOver = d.pctDiff > 0;
                const barPct = isOver ? 100 : (d.offer / d.list) * 100;
                return (
                  <div key={i} className="rounded-lg border p-4" style={{ borderColor: "#E8E3DC" }}>
                    <p className="text-sm font-bold text-gray-900">{d.address}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400">via {d.source}</p>

                    <div className="mt-3 flex justify-between text-xs text-gray-500">
                      <span>List: <span style={{ fontFamily: "var(--font-dm-mono)" }}>{fmtUsd(d.list)}</span></span>
                      <span>Offer: <span className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-dm-mono)" }}>{fmtUsd(d.offer)}</span></span>
                    </div>

                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barPct}%`,
                          backgroundColor: isOver ? "#14532d" : "#991b1b",
                        }}
                      />
                    </div>

                    <div className="mt-2 flex justify-between text-xs">
                      <span className={`font-semibold ${isOver ? "text-green-700" : "text-red-700"}`}>
                        {isOver ? "+" : ""}{d.pctDiff}% {isOver ? "over" : "under"} ask
                      </span>
                      <span className="text-gray-400" style={{ fontFamily: "var(--font-dm-mono)" }}>{d.dom} DOM</span>
                    </div>

                    <div className="mt-3 border-t pt-3" style={{ borderColor: "#E8E3DC" }}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Net commission</span>
                        <span className="text-lg font-bold" style={{ color: "#14532d", fontFamily: "var(--font-dm-mono)" }}>
                          {fmtUsd(d.netComm)}
                        </span>
                      </div>
                      {d.marketingCost > 0 && (
                        <p className="mt-0.5 text-right text-[10px] text-gray-400" style={{ fontFamily: "var(--font-dm-mono)" }}>
                          after {fmtUsd(d.marketingCost)} marketing
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── martinbuilds.ai watermark ── */}
        <div className="fade-up delay-10 pt-4 text-center">
          <p className="text-xs text-gray-400">
            Built by{" "}
            <a href="https://martinbuilds.ai" className="font-semibold underline" style={{ color: "#14532d" }}>
              martinbuilds.ai
            </a>
          </p>
        </div>
      </div>

      {/* ═══════════════ FIXED CTA ═══════════════ */}
      <a
        href="https://martinbuilds.ai"
        className="fixed bottom-6 right-6 z-50 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: "#14532d" }}
      >
        Book a walkthrough &rarr;
      </a>
    </div>
  );
}
