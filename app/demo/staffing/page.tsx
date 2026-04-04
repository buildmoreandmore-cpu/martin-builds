import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Coverage Command — Staffing Shift Dashboard",
  description:
    "Real-time shift coverage dashboard for staffing agency owners. See open gaps, available workers, and revenue at risk — all in one view.",
};

/* ─── static demo data ─── */

const SHIFTS = [
  { client: "Riverside Manor", time: "8:00 PM – 4:00 AM", needed: 4, filled: 2, status: "red" as const },
  { client: "Apex Fulfillment", time: "6:00 AM – 2:00 PM", needed: 6, filled: 4, status: "red" as const },
  { client: "Halcyon Medical", time: "2:00 PM – 10:00 PM", needed: 3, filled: 2, status: "amber" as const },
  { client: "NorthStar Logistics", time: "6:00 AM – 2:00 PM", needed: 5, filled: 5, status: "green" as const },
  { client: "Crestview Senior Living", time: "7:00 AM – 3:00 PM", needed: 4, filled: 4, status: "green" as const },
];

const WORKERS = [
  { initials: "TR", name: "Tasha Robinson", specialty: "CNA · Available now", action: "call" as const },
  { initials: "MJ", name: "Marcus Johnson", specialty: "Forklift cert. · Available now", action: "call" as const },
  { initials: "LD", name: "Lisa Denton", specialty: "LPN · Available after 4 PM", action: "oncall" as const },
  { initials: "KW", name: "Kevin Williams", specialty: "General labor · Available now", action: "call" as const },
  { initials: "AP", name: "Anita Patel", specialty: "RN · Available now", action: "call" as const },
];

const ACTIVITY = [
  { time: "2:14 PM", text: "Marcus Johnson confirmed for Apex Fulfillment 6 AM shift", color: "bg-green-500" },
  { time: "1:48 PM", text: "Riverside Manor night shift escalated — 2 gaps remaining", color: "bg-red-500" },
  { time: "12:30 PM", text: "Lisa Denton moved to on-call for Halcyon Medical", color: "bg-amber-500" },
  { time: "11:05 AM", text: "NorthStar Logistics fully staffed — all 5 slots filled", color: "bg-green-500" },
];

const REVENUE_ITEMS = [
  { client: "Riverside Manor", amount: 608 },
  { client: "Apex Fulfillment", amount: 512 },
  { client: "Halcyon Medical", amount: 336 },
];

const FILL_RATE = [
  { day: "Mon", pct: 97, live: false },
  { day: "Tue", pct: 100, live: false },
  { day: "Wed", pct: 94, live: false },
  { day: "Thu", pct: 88, live: false },
  { day: "Fri", pct: 79, live: true },
];

/* ─── helpers ─── */

function statusBorder(s: "red" | "amber" | "green") {
  if (s === "red") return "border-l-red-600";
  if (s === "amber") return "border-l-amber-500";
  return "border-l-green-600";
}

function statusBg(s: "red" | "amber" | "green") {
  if (s === "red") return "bg-red-50";
  if (s === "amber") return "bg-amber-50";
  return "bg-green-50";
}

function statusLabel(s: "red" | "amber" | "green") {
  if (s === "red") return "Uncovered";
  if (s === "amber") return "Partial";
  return "Covered";
}

function statusLabelColor(s: "red" | "amber" | "green") {
  if (s === "red") return "text-red-700 bg-red-100";
  if (s === "amber") return "text-amber-700 bg-amber-100";
  return "text-green-700 bg-green-100";
}

function fillColor(pct: number) {
  if (pct >= 95) return "text-green-700";
  if (pct >= 90) return "text-amber-700";
  return "text-red-700";
}

function fillBarColor(pct: number) {
  if (pct >= 95) return "bg-green-500";
  if (pct >= 90) return "bg-amber-500";
  return "bg-red-500";
}

/* ─── page ─── */

export default function CoverageCommandPage() {
  return (
    <div
      className={`${dmSans.variable} font-[family-name:var(--font-dm-sans)] min-h-screen`}
      style={{
        background: "#F8F7F5",
        color: "#1a1a1a",
        fontFamily: "var(--font-dm-sans), sans-serif",
      }}
    >
      {/* CSS keyframes for staggered fade-in */}
      <style>{`
        body { background: #F8F7F5 !important; color: #1a1a1a !important; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-section {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .delay-0 { animation-delay: 0ms; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 300ms; }
        .delay-4 { animation-delay: 400ms; }
        .delay-5 { animation-delay: 500ms; }
      `}</style>

      {/* ── Top bar ── */}
      <header className="fade-section delay-0 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Coverage Command</h1>
            <span className="text-sm text-gray-500">Friday, April 4 &middot; 3 shifts at risk</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              3 gaps open
            </span>
          </div>
          <button className="self-start sm:self-auto rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Customize layout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        {/* ── Alert banner ── */}
        <div className="fade-section delay-1 rounded-lg bg-red-50 border border-red-200 px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">!</span>
            <p className="text-sm text-red-900 leading-snug">
              <span className="font-semibold">Riverside Manor</span> — Night shift (8 PM – 4 AM) still needs 2 workers. Starts in 6 hours.
            </p>
          </div>
          <button className="self-start sm:self-auto shrink-0 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors">
            Find workers
          </button>
        </div>

        {/* ── KPI row ── */}
        <div className="fade-section delay-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard value="34" label="Shifts today" sub="26 fully covered" />
          <KPICard value="5" label="Open slots unfilled" sub="Across 3 sites" accent="red" />
          <KPICard value="18" label="Workers available now" sub="4 not yet called" />
          <KPICard value="$6,840" label="Revenue at risk today" sub="If gaps not filled" accent="amber" />
        </div>

        {/* ── Main two-column ── */}
        <div className="fade-section delay-3 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — shift coverage */}
          <div className="lg:col-span-3">
            <Card title="Today&rsquo;s shift coverage">
              <div className="space-y-3">
                {SHIFTS.map((s) => (
                  <div
                    key={s.client}
                    className={`rounded-lg border border-l-4 ${statusBorder(s.status)} ${statusBg(s.status)} px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`}
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{s.client}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{s.time}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex gap-1">
                        {Array.from({ length: s.needed }).map((_, i) =>
                          i < s.filled ? (
                            <span key={i} className="h-5 w-5 rounded bg-green-600" />
                          ) : (
                            <span
                              key={i}
                              className="h-5 w-5 rounded border-2 border-dashed border-red-400 flex items-center justify-center text-[10px] font-bold text-red-500"
                            >
                              !
                            </span>
                          )
                        )}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {s.filled}/{s.needed}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusLabelColor(s.status)}`}>
                        {statusLabel(s.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available workers */}
            <Card title="Available workers">
              <div className="space-y-3">
                {WORKERS.map((w) => (
                  <div key={w.name} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-bold">
                      {w.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{w.name}</p>
                      <p className="text-xs text-gray-500 truncate">{w.specialty}</p>
                    </div>
                    {w.action === "call" ? (
                      <button className="shrink-0 rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700 transition-colors">
                        Call now
                      </button>
                    ) : (
                      <span className="shrink-0 rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                        On call
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity feed */}
            <Card title="Activity feed" subtitle="Dispatch log">
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${a.color}`} />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── Bottom 3-column ── */}
        <div className="fade-section delay-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue at stake */}
          <Card title="Revenue at stake">
            <table className="w-full text-sm">
              <tbody>
                {REVENUE_ITEMS.map((r) => (
                  <tr key={r.client} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 text-gray-700">{r.client}</td>
                    <td className="py-2 text-right font-medium text-gray-900">${r.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr>
                  <td className="pt-3 font-semibold text-gray-900">Total if filled</td>
                  <td className="pt-3 text-right font-bold text-green-700">$1,456</td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* Fill rate */}
          <Card title="Fill rate this week">
            <div className="space-y-2.5">
              {FILL_RATE.map((f) => (
                <div key={f.day} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-medium text-gray-500">{f.day}</span>
                  <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full rounded-full ${fillBarColor(f.pct)}`} style={{ width: `${f.pct}%` }} />
                  </div>
                  <span className={`w-12 text-right text-sm font-semibold ${fillColor(f.pct)}`}>
                    {f.pct}%
                    {f.live && <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-red-500 align-middle" />}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Dispatch log */}
          <Card title="Dispatch log">
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${a.color}`} />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* spacer for fixed button */}
        <div className="h-16" />
      </div>

      {/* ── Fixed CTA ── */}
      <a
        href="https://martinbuilds.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="fade-section delay-5 fixed bottom-6 right-6 z-50 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-colors"
      >
        Book a walkthrough &rarr;
      </a>
    </div>
  );
}

/* ─── shared components ─── */

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900" dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function KPICard({
  value,
  label,
  sub,
  accent,
}: {
  value: string;
  label: string;
  sub: string;
  accent?: "red" | "amber";
}) {
  const border =
    accent === "red"
      ? "border-red-200 bg-red-50"
      : accent === "amber"
      ? "border-amber-200 bg-amber-50"
      : "border-gray-200 bg-white";

  const valueColor =
    accent === "red"
      ? "text-red-700"
      : accent === "amber"
      ? "text-amber-700"
      : "text-gray-900";

  return (
    <div className={`rounded-xl border p-4 ${border}`}>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
    </div>
  );
}
