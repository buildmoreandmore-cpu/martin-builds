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
const fontDisplay = "'Fraunces', serif";
const fontBody = "'DM Sans', sans-serif";

/* ── tiny helpers ── */
function Pill({
  label,
  color,
}: {
  label: string;
  color: "green" | "amber";
}) {
  const pillBg = color === "green" ? "#dcfce7" : "#fef3c7";
  const pillText = color === "green" ? "#166534" : "#92400e";
  return (
    <span
      style={{
        backgroundColor: pillBg,
        color: pillText,
        fontSize: 12,
        fontWeight: 600,
        padding: "4px 12px",
        borderRadius: 9999,
        whiteSpace: "nowrap" as const,
        fontFamily: fontBody,
      }}
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
      style={{
        backgroundColor: card,
        borderRadius: 16,
        padding: 20,
        display: "flex",
        flexDirection: "column" as const,
        gap: 4,
        animation: "fadeUp 0.5s ease-out",
        animationDelay: delay,
        animationFillMode: "both" as const,
        fontFamily: fontBody,
      }}
    >
      <span style={{ fontSize: 28, fontWeight: 700, color: textDark }}>
        {value}
      </span>
      <span style={{ fontSize: 14, fontWeight: 500, color: muted }}>
        {label}
      </span>
      <span style={{ fontSize: 12, fontWeight: 500, color: accent }}>
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
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, fontFamily: fontBody }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: textDark }}>
          {category}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: muted }}>
          {pct}%
        </span>
      </div>
      <span style={{ fontSize: 11, color: muted }}>{note}</span>
      <div
        style={{
          width: "100%",
          height: 8,
          borderRadius: 9999,
          backgroundColor: "#e7e5e4",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 9999,
            width: `${pct}%`,
            backgroundColor: color,
          }}
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
  const tagBg =
    variant === "actual"
      ? "#dbeafe"
      : variant === "live"
        ? "#dcfce7"
        : "#e7e5e4";
  const tagText =
    variant === "actual"
      ? "#1d4ed8"
      : variant === "live"
        ? "#15803d"
        : "#78716c";
  const tagLabel =
    variant === "actual" ? "Actual" : variant === "live" ? "Live \u2191" : "Proj.";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: fontBody }}>
      <span
        style={{
          width: 32,
          fontSize: 12,
          fontWeight: 500,
          color: muted,
          flexShrink: 0,
        }}
      >
        {day}
      </span>
      <div
        style={{
          flex: 1,
          height: 12,
          borderRadius: 9999,
          backgroundColor: "#e7e5e4",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 9999,
            width: `${pct}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          width: 56,
          textAlign: "right" as const,
          color: textDark,
          flexShrink: 0,
        }}
      >
        ${value.toLocaleString()}
      </span>
      <span
        style={{
          backgroundColor: tagBg,
          color: tagText,
          fontSize: 10,
          fontWeight: 600,
          padding: "2px 8px",
          borderRadius: 9999,
          width: 56,
          textAlign: "center" as const,
          flexShrink: 0,
        }}
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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        padding: "12px 16px",
        border: `1px solid ${borderColor}`,
        backgroundColor: bgColor,
        fontFamily: fontBody,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            width: 24,
            textAlign: "center" as const,
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
        <div style={{ display: "flex", flexDirection: "column" as const }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: textDark }}>
            {date}
          </span>
          <span style={{ fontSize: 11, color: muted }}>{note}</span>
        </div>
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: textDark }}>
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
  isLast,
}: {
  initials: string;
  name: string;
  detail: string;
  tags: string[];
  avatarBg: string;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: isLast ? "none" : "1px solid #e7e5e4",
        fontFamily: fontBody,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            backgroundColor: avatarBg,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" as const }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: textDark }}>
            {name}
          </span>
          <span style={{ fontSize: 11, color: muted }}>{detail}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, justifyContent: "flex-end" }}>
        {tags.map((t) => {
          const tBg =
            t === "VIP"
              ? "#fef3c7"
              : t === "SMS"
                ? "#dbeafe"
                : t === "No SMS"
                  ? "#e7e5e4"
                  : "#dcfce7";
          const tColor =
            t === "VIP"
              ? "#b45309"
              : t === "SMS"
                ? "#1d4ed8"
                : t === "No SMS"
                  ? "#78716c"
                  : "#15803d";
          return (
            <span
              key={t}
              style={{
                backgroundColor: tBg,
                color: tColor,
                fontSize: 10,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 9999,
              }}
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
function SmsStat({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: isLast ? "none" : "1px solid #f5f5f4",
        fontFamily: fontBody,
      }}
    >
      <span style={{ fontSize: 14, color: muted }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: textDark }}>
        {value}
      </span>
    </div>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function RestaurantDashboard() {
  return (
    <>
      <style>{`
  body { background: #1C1917 !important; color: #1c1917 !important; }
  body::before { display: none !important; }
  section { padding-left: unset !important; padding-right: unset !important; }
  h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap');
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .restaurant-kpi { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
  .restaurant-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .restaurant-two { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  @media (max-width: 768px) {
    .restaurant-kpi { grid-template-columns: repeat(2, 1fr) !important; }
    .restaurant-three { grid-template-columns: 1fr !important; }
    .restaurant-two { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .restaurant-kpi { grid-template-columns: 1fr !important; }
  }
`}</style>

      <div
        style={{
          backgroundColor: bg,
          color: textDark,
          minHeight: "100vh",
          position: "relative" as const,
          fontFamily: fontBody,
        }}
      >
        {/* grain overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none" as const,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "180px",
          }}
        />

        {/* content sits above grain */}
        <div
          style={{
            position: "relative" as const,
            zIndex: 10,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "32px 24px 112px 24px",
            display: "flex",
            flexDirection: "column" as const,
            gap: 32,
          }}
        >
          {/* ── TOP BAR ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 16,
              animation: "fadeUp 0.5s ease-out",
              animationDelay: "0s",
              animationFillMode: "both" as const,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#FAFAF8",
                  margin: 0,
                }}
              >
                Restaurant Owner Dashboard
              </h1>
              <p style={{ fontSize: 14, marginTop: 4, color: "#a8a29e", margin: "4px 0 0 0" }}>
                Friday, April 4 &middot; Dinner service in 4 hrs
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Pill label="Food cost 28.4% ✓" color="green" />
              <Pill label="Labor 34.1% ↑" color="amber" />
            </div>
          </div>

          {/* ── KPI ROW ── */}
          <div className="restaurant-kpi">
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
          <div className="restaurant-three">
            {/* Cost of goods breakdown */}
            <div
              style={{
                backgroundColor: card,
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column" as const,
                gap: 20,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.15s",
                animationFillMode: "both" as const,
              }}
            >
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
                  fontWeight: 700,
                  color: textDark,
                  margin: 0,
                }}
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
              style={{
                backgroundColor: card,
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column" as const,
                gap: 16,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.2s",
                animationFillMode: "both" as const,
              }}
            >
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
                  fontWeight: 700,
                  color: textDark,
                  margin: 0,
                }}
              >
                Weekly projection
              </h2>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
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
              style={{
                backgroundColor: card,
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column" as const,
                gap: 16,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.25s",
                animationFillMode: "both" as const,
              }}
            >
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
                  fontWeight: 700,
                  color: textDark,
                  margin: 0,
                }}
              >
                Best vs worst nights
              </h2>
              <p style={{ fontSize: 11, color: muted, margin: "-8px 0 0 0" }}>
                Last 90 days
              </p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
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
          <div className="restaurant-two">
            {/* Customer contacts */}
            <div
              style={{
                backgroundColor: card,
                borderRadius: 16,
                padding: 24,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.3s",
                animationFillMode: "both" as const,
              }}
            >
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
                  fontWeight: 700,
                  color: textDark,
                  margin: "0 0 4px 0",
                }}
              >
                Customer contacts
              </h2>
              <p style={{ fontSize: 11, color: muted, margin: "0 0 16px 0" }}>
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
                isLast
              />
            </div>

            {/* SMS ordering program */}
            <div
              style={{
                backgroundColor: card,
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column" as const,
                gap: 16,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.35s",
                animationFillMode: "both" as const,
              }}
            >
              <h2
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 18,
                  fontWeight: 700,
                  color: textDark,
                  margin: 0,
                }}
              >
                SMS ordering program
              </h2>

              <div>
                <SmsStat label="Total subscribers" value="312" />
                <SmsStat label="Orders via SMS" value="87" />
                <SmsStat label="Avg. order" value="$64 (vs $48 walk-in)" />
                <SmsStat label="Last campaign open rate" value="71%" isLast />
              </div>

              {/* suggestion banner */}
              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid #bbf7d0",
                  backgroundColor: "#f0fdf4",
                  padding: "16px 20px",
                  display: "flex",
                  flexWrap: "wrap" as const,
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <p style={{ fontSize: 14, color: green, margin: 0 }}>
                  <span style={{ fontWeight: 600 }}>4 new guests tonight</span>{" "}
                  — send SMS signup after service?
                </p>
                <button
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: 8,
                    backgroundColor: green,
                    border: "none",
                    cursor: "pointer",
                    flexShrink: 0,
                    fontFamily: fontBody,
                  }}
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
          style={{
            position: "fixed" as const,
            bottom: 24,
            right: 24,
            zIndex: 50,
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 9999,
            backgroundColor: green,
            textDecoration: "none",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            fontFamily: fontBody,
          }}
        >
          Book a walkthrough &rarr;
        </a>
      </div>
    </>
  );
}
