import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Owner Dashboard | martin.builds Demo",
  description:
    "Live demo of a restaurant owner dashboard — food cost tracking, sales projections, SMS ordering, and customer loyalty. Built by martin.builds.",
};

/* ── palette tokens ── */
const bg = "#1C1917";
const card = "#FAFAF8";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const purple = "#7c3aed";
const muted = "#78716c";
const textDark = "#1c1917";

/* ── tiny helpers ── */
function Pill({
  label,
  color,
}: {
  label: string;
  color: "green" | "amber";
}) {
  const cls =
    color === "green"
      ? "bg-green-100 text-green-800"
      : "bg-amber-100 text-amber-800";
  return (
    <span
      className={`${cls} text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap`}
    >
      {label}
    </span>
  );
}

function KpiCard({
  value,
  label,
  sub,
  accent,
  delay,
}: {
  value: string;
  label: string;
  sub: string;
  accent: string;
  delay: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-1 animate-fade-up"
      style={{
        backgroundColor: card,
        animationDelay: delay,
        animationFillMode: "both",
      }}
    >
      <span className="text-2xl font-bold" style={{ color: textDark }}>
        {value}
      </span>
      <span className="text-sm font-medium" style={{ color: muted }}>
        {label}
      </span>
      <span className="text-xs font-medium" style={{ color: accent }}>
        {sub}
      </span>
    </div>
  );
}

/* ── cost-of-goods bar ── */
function CogRow({
  category,
  note,
  pct,
  color,
}: {
  category: string;
  note: string;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold" style={{ color: textDark }}>
          {category}
        </span>
        <span className="text-xs font-semibold" style={{ color: muted }}>
          {pct}%
        </span>
      </div>
      <span className="text-[11px]" style={{ color: muted }}>
        {note}
      </span>
      <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

/* ── weekly projection bar ── */
function WeekBar({
  day,
  value,
  maxValue,
  variant,
}: {
  day: string;
  value: number;
  maxValue: number;
  variant: "actual" | "live" | "proj";
}) {
  const pct = (value / maxValue) * 100;
  const barColor =
    variant === "actual" ? blue : variant === "live" ? green : "#a8a29e";
  const tagColor =
    variant === "actual"
      ? "bg-blue-100 text-blue-700"
      : variant === "live"
        ? "bg-green-100 text-green-700"
        : "bg-stone-200 text-stone-500";
  const tagLabel =
    variant === "actual" ? "Actual" : variant === "live" ? "Live ↑" : "Proj.";

  return (
    <div className="flex items-center gap-3">
      <span
        className="w-8 text-xs font-medium shrink-0"
        style={{ color: muted }}
      >
        {day}
      </span>
      <div className="flex-1 h-3 rounded-full bg-stone-200 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        />
      </div>
      <span
        className="text-xs font-semibold w-14 text-right shrink-0"
        style={{ color: textDark }}
      >
        ${value.toLocaleString()}
      </span>
      <span
        className={`${tagColor} text-[10px] font-semibold px-2 py-0.5 rounded-full w-14 text-center shrink-0`}
      >
        {tagLabel}
      </span>
    </div>
  );
}

/* ── best / worst row ── */
function NightRow({
  rank,
  date,
  note,
  revenue,
  variant,
}: {
  rank: string;
  date: string;
  note: string;
  revenue: string;
  variant: "best" | "normal" | "worst";
}) {
  const bgColor =
    variant === "best"
      ? "#f0fdf4"
      : variant === "worst"
        ? "#fef2f2"
        : "#fafaf8";
  const borderColor =
    variant === "best"
      ? "#bbf7d0"
      : variant === "worst"
        ? "#fecaca"
        : "#e7e5e4";
  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3 border"
      style={{ backgroundColor: bgColor, borderColor }}
    >
      <div className="flex items-center gap-3">
        <span
          className="text-xs font-bold w-6 text-center"
          style={{
            color:
              variant === "best"
                ? green
                : variant === "worst"
                  ? red
                  : muted,
          }}
        >
          {rank}
        </span>
        <div className="flex flex-col">
          <span
            className="text-sm font-semibold"
            style={{ color: textDark }}
          >
            {date}
          </span>
          <span className="text-[11px]" style={{ color: muted }}>
            {note}
          </span>
        </div>
      </div>
      <span className="text-sm font-bold" style={{ color: textDark }}>
        {revenue}
      </span>
    </div>
  );
}

/* ── contact row ── */
function ContactRow({
  initials,
  name,
  detail,
  tags,
  avatarBg,
}: {
  initials: string;
  name: string;
  detail: string;
  tags: string[];
  avatarBg: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-stone-200 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: avatarBg }}
        >
          {initials}
        </div>
        <div className="flex flex-col">
          <span
            className="text-sm font-semibold"
            style={{ color: textDark }}
          >
            {name}
          </span>
          <span className="text-[11px]" style={{ color: muted }}>
            {detail}
          </span>
        </div>
      </div>
      <div className="flex gap-1.5 flex-wrap justify-end">
        {tags.map((t) => {
          const cls =
            t === "VIP"
              ? "bg-amber-100 text-amber-700"
              : t === "SMS"
                ? "bg-blue-100 text-blue-700"
                : t === "No SMS"
                  ? "bg-stone-200 text-stone-500"
                  : "bg-green-100 text-green-700";
          return (
            <span
              key={t}
              className={`${cls} text-[10px] font-semibold px-2 py-0.5 rounded-full`}
            >
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── SMS stat row ── */
function SmsStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0">
      <span className="text-sm" style={{ color: muted }}>
        {label}
      </span>
      <span className="text-sm font-bold" style={{ color: textDark }}>
        {value}
      </span>
    </div>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function RestaurantDashboard() {
  return (
    <>
      {/* grain overlay + animations */}
      <style>{`
        body { background: #1C1917 !important; color: #1c1917 !important; }
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap');

        .font-display { font-family: 'Fraunces', serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }

        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 180px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.5s ease-out;
        }
      `}</style>

      <div
        className="grain font-body min-h-screen relative"
        style={{ backgroundColor: bg, color: textDark }}
      >
        {/* content sits above grain */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 flex flex-col gap-8">
          {/* ── TOP BAR ── */}
          <div
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-up"
            style={{ animationDelay: "0s", animationFillMode: "both" }}
          >
            <div>
              <h1
                className="font-display text-3xl sm:text-4xl font-bold"
                style={{ color: "#FAFAF8" }}
              >
                Restaurant Owner Dashboard
              </h1>
              <p className="text-sm mt-1" style={{ color: "#a8a29e" }}>
                Friday, April 4 &middot; Dinner service in 4 hrs
              </p>
            </div>
            <div className="flex gap-2">
              <Pill label="Food cost 28.4% ✓" color="green" />
              <Pill label="Labor 34.1% ↑" color="amber" />
            </div>
          </div>

          {/* ── KPI ROW ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiCard
              value="$4,820"
              label="Sales today"
              sub="↑ 11% vs avg"
              accent={green}
              delay="0.05s"
            />
            <KpiCard
              value="28.4%"
              label="Food cost %"
              sub="Target is 30%"
              accent={green}
              delay="0.1s"
            />
            <KpiCard
              value="$1,370"
              label="COGS today"
              sub="Produce up $84"
              accent={amber}
              delay="0.15s"
            />
            <KpiCard
              value="$24,410"
              label="Projected week"
              sub="↑ $1,200 vs last"
              accent={green}
              delay="0.2s"
            />
            <KpiCard
              value="312"
              label="SMS subscribers"
              sub="+18 this week"
              accent={blue}
              delay="0.25s"
            />
          </div>

          {/* ── THREE-COL GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cost of goods breakdown */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-5 animate-fade-up"
              style={{
                backgroundColor: card,
                animationDelay: "0.15s",
                animationFillMode: "both",
              }}
            >
              <h2
                className="font-display text-lg font-bold"
                style={{ color: textDark }}
              >
                Cost of goods breakdown
              </h2>
              <CogRow
                category="Proteins"
                note="Chicken thighs, salmon fillet"
                pct={36.1}
                color={red}
              />
              <CogRow
                category="Produce"
                note="↑ tomatoes, herbs"
                pct={22.4}
                color={amber}
              />
              <CogRow
                category="Dairy"
                note="Heavy cream, parmesan"
                pct={15.2}
                color={blue}
              />
              <CogRow
                category="Dry goods"
                note="Flour, olive oil, pasta"
                pct={13.1}
                color={green}
              />
              <CogRow
                category="Beverages"
                note="Wine, espresso, juice"
                pct={13.2}
                color={purple}
              />
            </div>

            {/* Weekly projection */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4 animate-fade-up"
              style={{
                backgroundColor: card,
                animationDelay: "0.2s",
                animationFillMode: "both",
              }}
            >
              <h2
                className="font-display text-lg font-bold"
                style={{ color: textDark }}
              >
                Weekly projection
              </h2>
              <div className="flex flex-col gap-3">
                <WeekBar day="Mon" value={2980} maxValue={5800} variant="actual" />
                <WeekBar day="Tue" value={3120} maxValue={5800} variant="actual" />
                <WeekBar day="Wed" value={3540} maxValue={5800} variant="actual" />
                <WeekBar day="Thu" value={4210} maxValue={5800} variant="actual" />
                <WeekBar day="Fri" value={4820} maxValue={5800} variant="live" />
                <WeekBar day="Sat" value={5400} maxValue={5800} variant="proj" />
                <WeekBar day="Sun" value={3340} maxValue={5800} variant="proj" />
              </div>
            </div>

            {/* Best vs worst nights */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4 animate-fade-up"
              style={{
                backgroundColor: card,
                animationDelay: "0.25s",
                animationFillMode: "both",
              }}
            >
              <h2
                className="font-display text-lg font-bold"
                style={{ color: textDark }}
              >
                Best vs worst nights
              </h2>
              <p className="text-[11px] -mt-2" style={{ color: muted }}>
                Last 90 days
              </p>
              <div className="flex flex-col gap-3">
                <NightRow
                  rank="#1"
                  date="Sat, Feb 14"
                  note="Valentine's prix fixe — 94 covers"
                  revenue="$7,840"
                  variant="best"
                />
                <NightRow
                  rank="#2"
                  date="Fri, Mar 21"
                  note="Spring kickoff, patio opened"
                  revenue="$6,310"
                  variant="best"
                />
                <NightRow
                  rank="—"
                  date="Wed, Mar 5"
                  note="Normal midweek dinner"
                  revenue="$3,220"
                  variant="normal"
                />
                <NightRow
                  rank="#87"
                  date="Mon, Jan 20"
                  note="Snow storm — closed early"
                  revenue="$1,190"
                  variant="worst"
                />
              </div>
            </div>
          </div>

          {/* ── TWO-COL GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer contacts */}
            <div
              className="rounded-2xl p-6 animate-fade-up"
              style={{
                backgroundColor: card,
                animationDelay: "0.3s",
                animationFillMode: "both",
              }}
            >
              <h2
                className="font-display text-lg font-bold mb-1"
                style={{ color: textDark }}
              >
                Customer contacts
              </h2>
              <p className="text-[11px] mb-4" style={{ color: muted }}>
                SMS + loyalty list
              </p>
              <ContactRow
                initials="DR"
                name="Diana Reyes"
                detail="Last visit 2 days ago · 24 visits"
                tags={["VIP", "SMS"]}
                avatarBg={green}
              />
              <ContactRow
                initials="JM"
                name="James Mitchell"
                detail="Birthday Apr 9 · 18 visits"
                tags={["VIP", "SMS"]}
                avatarBg={blue}
              />
              <ContactRow
                initials="TW"
                name="Tanya Williams"
                detail="Last visit 5 days ago · 11 visits"
                tags={["SMS"]}
                avatarBg={purple}
              />
              <ContactRow
                initials="RC"
                name="Raj Chandra"
                detail="Lapsed 42 days"
                tags={["SMS"]}
                avatarBg={amber}
              />
              <ContactRow
                initials="KP"
                name="Kevin Park"
                detail="Last visit yesterday · 6 visits"
                tags={["No SMS"]}
                avatarBg="#78716c"
              />
            </div>

            {/* SMS ordering program */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-4 animate-fade-up"
              style={{
                backgroundColor: card,
                animationDelay: "0.35s",
                animationFillMode: "both",
              }}
            >
              <h2
                className="font-display text-lg font-bold"
                style={{ color: textDark }}
              >
                SMS ordering program
              </h2>

              <div>
                <SmsStat label="Total subscribers" value="312" />
                <SmsStat label="Orders via SMS" value="87" />
                <SmsStat label="Avg. order" value="$64 (vs $48 walk-in)" />
                <SmsStat label="Last campaign open rate" value="71%" />
              </div>

              {/* suggestion banner */}
              <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm" style={{ color: green }}>
                  <span className="font-semibold">4 new guests tonight</span>{" "}
                  — send SMS signup after service?
                </p>
                <button
                  className="text-sm font-semibold text-white px-4 py-2 rounded-lg shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: green }}
                >
                  Draft message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── FIXED CTA ── */}
        <a
          href="https://martinbuilds.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 text-sm font-semibold text-white px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: green }}
        >
          Book a walkthrough &rarr;
        </a>
      </div>
    </>
  );
}
