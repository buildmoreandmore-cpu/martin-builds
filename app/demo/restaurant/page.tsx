import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Owner Dashboard | martin.builds Demo",
  description:
    "Live demo of a restaurant owner dashboard — food cost tracking, sales projections, SMS ordering, and customer loyalty. Built by martin.builds.",
};

/* ── palette tokens ── */
const bg = "#FAFAF8";
const card = "#ffffff";
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
        border: "1px solid #E8E3DC",
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

/* ── gauge bar ── */
function GaugeBar({
  label,
  value,
  target,
  targetLabel,
  detail,
  color,
  maxScale,
}: {
  label: string;
  value: number;
  target: number;
  targetLabel: string;
  detail: string;
  color: string;
  maxScale: number;
}) {
  const fillPct = Math.min((value / maxScale) * 100, 100);
  const targetPct = (target / maxScale) * 100;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: 8,
        fontFamily: fontBody,
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 600, color: muted, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>
        {label}
      </span>
      <span style={{ fontSize: 32, fontWeight: 700, color }}>{value}%</span>
      <div
        style={{
          width: "100%",
          height: 10,
          borderRadius: 9999,
          backgroundColor: "#e7e5e4",
          position: "relative" as const,
          overflow: "visible",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 9999,
            width: `${fillPct}%`,
            backgroundColor: color,
          }}
        />
        {target > 0 && (
          <div
            style={{
              position: "absolute" as const,
              left: `${targetPct}%`,
              top: -3,
              width: 2,
              height: 16,
              backgroundColor: textDark,
              borderRadius: 1,
            }}
          />
        )}
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color }}>{targetLabel}</span>
      <span style={{ fontSize: 11, color: muted }}>{detail}</span>
    </div>
  );
}

/* ── small tag pill ── */
function TagPill({ label, color: c }: { label: string; color: string }) {
  const bgMap: Record<string, string> = {
    [green]: "#dcfce7",
    [amber]: "#fef3c7",
    [red]: "#fef2f2",
    [blue]: "#dbeafe",
  };
  const textMap: Record<string, string> = {
    [green]: "#166534",
    [amber]: "#92400e",
    [red]: "#991b1b",
    [blue]: "#1d4ed8",
  };
  return (
    <span
      style={{
        backgroundColor: bgMap[c] || "#e7e5e4",
        color: textMap[c] || "#78716c",
        fontSize: 10,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 9999,
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </span>
  );
}

/* ── guest row for 3-visit tracker ── */
function GuestRow({
  line1,
  line2,
  line3,
  tag,
  tagColor,
  isLast,
}: {
  line1: string;
  line2: string;
  line3?: string;
  tag: string;
  tagColor: string;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: isLast ? "none" : "1px solid #f5f5f4",
        fontFamily: fontBody,
        gap: 8,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 2, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: textDark }}>{line1}</span>
        <span style={{ fontSize: 11, color: muted }}>{line2}</span>
        {line3 && <span style={{ fontSize: 11, color: amber, fontWeight: 500 }}>{line3}</span>}
      </div>
      <TagPill label={tag} color={tagColor} />
    </div>
  );
}

/* ── dish row ── */
function DishRow({
  name,
  ordered,
  repeats,
  reorderRate,
  photos,
  accent,
  isLast,
}: {
  name: string;
  ordered: number;
  repeats: number;
  reorderRate: number;
  photos: number;
  accent: string;
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
        gap: 12,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 2, flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: textDark }}>{name}</span>
        <span style={{ fontSize: 11, color: muted }}>
          {ordered} ordered · {repeats} repeat · {"\uD83D\uDCF8"} {photos} photos
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <div style={{ width: 80, height: 6, borderRadius: 9999, backgroundColor: "#e7e5e4", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 9999, width: `${reorderRate}%`, backgroundColor: accent }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: accent }}>{reorderRate}%</span>
        </div>
      </div>
      {reorderRate >= 60 && photos >= 8 && (
        <TagPill label="Reaction driver" color={green} />
      )}
    </div>
  );
}

/* ═══════════════ PAGE ═══════════════ */

export default function RestaurantDashboard() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
  html body { background: #FAFAF8 !important; background-color: #FAFAF8 !important; color: #1a1a1a !important; }
  body::before { display: none !important; }
  section { padding-left: unset !important; padding-right: unset !important; }
  h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .restaurant-kpi { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
  .restaurant-gauges { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .restaurant-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .restaurant-two { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
  @media (max-width: 768px) {
    .restaurant-kpi { grid-template-columns: repeat(2, 1fr) !important; }
    .restaurant-gauges { grid-template-columns: repeat(2, 1fr) !important; }
    .restaurant-three { grid-template-columns: 1fr !important; }
    .restaurant-two { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .restaurant-kpi { grid-template-columns: 1fr !important; }
    .restaurant-gauges { grid-template-columns: 1fr !important; }
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
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "32px 24px 112px 24px",
            display: "flex",
            flexDirection: "column" as const,
            gap: 32,
          }}
        >
          {/* ── Demo context banner ── */}
          <div style={{ padding: "24px 28px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for a restaurant owner.</p>
            <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>Food costs, projections, ordering stats, and nightly performance — all in one place. The final product is designed around how your restaurant actually operates. This is a starting point to show what&apos;s possible.</p>
          </div>

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
              <a href="/" style={{ fontSize: 12, fontWeight: 700, color: "#a8a29e", textDecoration: "none", letterSpacing: -0.5, fontFamily: fontBody }}>martin<span style={{ color: "#16a34a" }}>.builds</span></a>
              <h1
                style={{
                  fontFamily: fontDisplay,
                  fontSize: 36,
                  fontWeight: 700,
                  color: textDark,
                  margin: "4px 0 0 0",
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
              <Pill label="Labor 36.1% ↑" color="amber" />
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
              label="Food cost"
              sub="Target ≤ 30%"
              accent={green}
              delay="0.1s"
            />
            <KpiCard
              value="21.0%"
              label="Beverage cost"
              sub="↓ 2% vs last month"
              accent={green}
              delay="0.15s"
            />
            <KpiCard
              value="36.1%"
              label="Labor cost"
              sub="↑ 1.8% vs target"
              accent={amber}
              delay="0.2s"
            />
            <KpiCard
              value="$24,410"
              label="Projected week"
              sub="↑ $1,200 vs last"
              accent={green}
              delay="0.25s"
            />
          </div>

          {/* ── LIVE COST CONTROL GAUGES ── */}
          <div
            style={{
              backgroundColor: card,
              border: "1px solid #E8E3DC",
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
              Live Cost Control
            </h2>
            <p style={{ fontSize: 12, color: muted, margin: "0 0 20px 0" }}>
              Real-time P&amp;L snapshot — targets update every 15 min
            </p>
            <div className="restaurant-gauges">
              <GaugeBar
                label="Food Cost"
                value={28.4}
                target={30}
                targetLabel="Target: ≤ 30%"
                detail="$1,370 of $4,820 revenue"
                color={green}
                maxScale={50}
              />
              <GaugeBar
                label="Beverage Cost"
                value={21.0}
                target={25}
                targetLabel="Target: ≤ 25%"
                detail="$1,012 of $4,820 revenue"
                color={green}
                maxScale={50}
              />
              <GaugeBar
                label="Labor Cost"
                value={36.1}
                target={34}
                targetLabel="Target: ≤ 34%"
                detail="$1,740 of $4,820 revenue"
                color={red}
                maxScale={50}
              />
              <GaugeBar
                label="True Margin"
                value={2.5}
                target={0}
                targetLabel="After food + bev + labor + rent"
                detail="$121 of $4,820 — you need volume"
                color={red}
                maxScale={50}
              />
            </div>
          </div>

          {/* ── TWO-COL: COGS + WEEKLY ── */}
          <div className="restaurant-two">
            {/* Cost of goods breakdown */}
            <div
              style={{
                backgroundColor: card,
                border: "1px solid #E8E3DC",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column" as const,
                gap: 20,
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
                border: "1px solid #E8E3DC",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column" as const,
                gap: 16,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.4s",
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
          </div>

          {/* ── 3-VISIT CUSTOMER RETURN TRACKER ── */}
          <div
            style={{
              animation: "fadeUp 0.5s ease-out",
              animationDelay: "0.45s",
              animationFillMode: "both" as const,
            }}
          >
            <h2
              style={{
                fontFamily: fontDisplay,
                fontSize: 20,
                fontWeight: 700,
                color: textDark,
                margin: "0 0 4px 0",
              }}
            >
              3-Visit Conversion Tracker
            </h2>
            <p style={{ fontSize: 12, color: muted, margin: "0 0 16px 0" }}>
              Guests who visit 3x have 72% retention rate
            </p>
            <div className="restaurant-three">
              {/* Column 1: First-Timers */}
              <div
                style={{
                  backgroundColor: card,
                  border: "1px solid #E8E3DC",
                  borderLeft: `4px solid ${red}`,
                  borderRadius: 16,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column" as const,
                }}
              >
                <h3 style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 700, color: textDark, margin: "0 0 12px 0" }}>
                  Tonight{"'"}s First-Timers
                </h3>
                <GuestRow
                  line1="Table 14 — Reservation: Martinez, party of 4"
                  line2="OpenTable · First visit"
                  tag="Red napkin"
                  tagColor={red}
                />
                <GuestRow
                  line1="Table 8 — Walk-in: 2 guests"
                  line2="No profile yet"
                  tag="Red napkin"
                  tagColor={red}
                />
                <GuestRow
                  line1="Table 22 — Reservation: Chen, party of 2"
                  line2="Yelp referral · First visit"
                  tag="Red napkin"
                  tagColor={red}
                />
                <GuestRow
                  line1="Table 5 — Reservation: Okafor, party of 6"
                  line2="Instagram DM · First visit"
                  tag="Red napkin"
                  tagColor={red}
                  isLast
                />
                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 10,
                    backgroundColor: "#fef2f2",
                    border: "1px solid #fecaca",
                    padding: "10px 14px",
                    fontSize: 12,
                    color: red,
                    fontWeight: 500,
                  }}
                >
                  4 first-timers tonight — capture contact info before they leave
                </div>
              </div>

              {/* Column 2: One More Visit */}
              <div
                style={{
                  backgroundColor: card,
                  border: "1px solid #E8E3DC",
                  borderLeft: `4px solid ${amber}`,
                  borderRadius: 16,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column" as const,
                }}
              >
                <h3 style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 700, color: textDark, margin: "0 0 12px 0" }}>
                  One More Visit
                </h3>
                <GuestRow
                  line1="Diana Reyes"
                  line2="2 visits · Last: 3 days ago"
                  line3="→ 1 more visit = 72% retention"
                  tag="Send invite"
                  tagColor={amber}
                />
                <GuestRow
                  line1="Marcus Webb"
                  line2="2 visits · Last: 11 days ago"
                  line3="→ Going cold, act now"
                  tag="Urgent"
                  tagColor={red}
                />
                <GuestRow
                  line1="Priya Sharma"
                  line2="2 visits · Last: 6 days ago"
                  line3="→ Birthday next week"
                  tag="Send invite"
                  tagColor={amber}
                />
                <GuestRow
                  line1="Tom Brennan"
                  line2="2 visits · Last: 2 days ago"
                  line3="→ Ordered short rib both times"
                  tag="Send invite"
                  tagColor={amber}
                  isLast
                />
                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 10,
                    backgroundColor: "#fef3c7",
                    border: "1px solid #fde68a",
                    padding: "10px 14px",
                    fontSize: 12,
                    color: "#92400e",
                    fontWeight: 500,
                  }}
                >
                  4 guests one visit away from loyalty lock-in
                </div>
              </div>

              {/* Column 3: Loyal Regulars */}
              <div
                style={{
                  backgroundColor: card,
                  border: "1px solid #E8E3DC",
                  borderLeft: `4px solid ${green}`,
                  borderRadius: 16,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column" as const,
                }}
              >
                <h3 style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 700, color: textDark, margin: "0 0 12px 0" }}>
                  Loyal Regulars
                </h3>
                <GuestRow
                  line1="James Mitchell"
                  line2="18 visits · Avg $94/visit · Last: 4 days ago"
                  tag="VIP"
                  tagColor={green}
                />
                <GuestRow
                  line1="Tanya Williams"
                  line2="11 visits · Avg $72/visit · Last: 5 days ago"
                  tag="Active"
                  tagColor={green}
                />
                <GuestRow
                  line1="Kevin Park"
                  line2="6 visits · Avg $68/visit · Last: yesterday"
                  tag="Active"
                  tagColor={green}
                />
                <GuestRow
                  line1="Raj Chandra"
                  line2="8 visits · Avg $81/visit · Last: 42 days ago"
                  tag="⚠ Lapsed"
                  tagColor={red}
                  isLast
                />
                <div
                  style={{
                    marginTop: 12,
                    borderRadius: 10,
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    padding: "10px 14px",
                    fontSize: 12,
                    color: green,
                    fontWeight: 500,
                  }}
                >
                  Raj hasn{"'"}t been in 42 days — send a {"\""}we miss you{"\""}  with his usual (braised short rib)
                </div>
              </div>
            </div>
          </div>

          {/* ── TWO-COL: DISHES + SMS vs ADS ── */}
          <div className="restaurant-two">
            {/* Dishes Driving Return Visits */}
            <div
              style={{
                backgroundColor: card,
                border: "1px solid #E8E3DC",
                borderRadius: 16,
                padding: 24,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.5s",
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
                Menu Items Driving Returns
              </h2>
              <p style={{ fontSize: 12, color: muted, margin: "0 0 12px 0" }}>
                Which dishes bring people back
              </p>
              <DishRow name="Braised Short Rib" ordered={31} repeats={14} reorderRate={78} photos={12} accent={green} />
              <DishRow name="Truffle Mushroom Pasta" ordered={24} repeats={9} reorderRate={62} photos={8} accent={green} />
              <DishRow name="Wagyu Burger" ordered={18} repeats={4} reorderRate={33} photos={3} accent={amber} />
              <DishRow name="Seasonal Crudo" ordered={15} repeats={2} reorderRate={20} photos={6} accent={amber} />
              <DishRow name="Chocolate Lava Cake" ordered={22} repeats={11} reorderRate={68} photos={15} accent={green} isLast />
            </div>

            {/* SMS vs Paid Acquisition */}
            <div
              style={{
                backgroundColor: card,
                border: "1px solid #E8E3DC",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column" as const,
                gap: 16,
                animation: "fadeUp 0.5s ease-out",
                animationDelay: "0.55s",
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
                Customer Acquisition Cost
              </h2>
              <p style={{ fontSize: 12, color: muted, margin: "-8px 0 0 0" }}>
                The math that sells itself
              </p>

              <div style={{ display: "flex", gap: 16 }}>
                {/* SMS box */}
                <div
                  style={{
                    flex: 1,
                    border: `2px solid ${green}`,
                    borderRadius: 12,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    gap: 6,
                    textAlign: "center" as const,
                  }}
                >
                  <span style={{ fontSize: 40, fontWeight: 800, color: green }}>$8</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: textDark }}>Cost per SMS customer</span>
                  <span style={{ fontSize: 11, color: muted }}>312 subscribers · 87 orders · 71% open rate</span>
                </div>
                {/* Media box */}
                <div
                  style={{
                    flex: 1,
                    border: `2px solid ${red}`,
                    borderRadius: 12,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    gap: 6,
                    textAlign: "center" as const,
                  }}
                >
                  <span style={{ fontSize: 40, fontWeight: 800, color: red }}>$1,200</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: textDark }}>Cost per media customer</span>
                  <span style={{ fontSize: 11, color: muted }}>Print, radio, sponsorships</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                <p style={{ fontSize: 13, color: textDark, margin: 0 }}>
                  <span style={{ fontWeight: 600 }}>SMS customers order 33% more</span>{" "}
                  ($64 vs $48 avg)
                </p>
                <p style={{ fontSize: 13, color: green, fontWeight: 600, margin: 0 }}>
                  SMS ROI: 150x better than traditional media
                </p>
                {/* Cost comparison bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: muted, width: 36, flexShrink: 0 }}>SMS</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 9999, backgroundColor: "#e7e5e4", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 9999, width: "1%", backgroundColor: green }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: green, width: 28, flexShrink: 0 }}>$8</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: muted, width: 36, flexShrink: 0 }}>Media</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 9999, backgroundColor: "#e7e5e4", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 9999, width: "100%", backgroundColor: red }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: red, width: 28, flexShrink: 0 }}>$1.2k</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── WATERMARK ── */}
          <div
            style={{
              textAlign: "center" as const,
              padding: "24px 0 0 0",
              animation: "fadeUp 0.5s ease-out",
              animationDelay: "0.6s",
              animationFillMode: "both" as const,
            }}
          >
            <a
              href="/discovery-call"
              style={{
                fontSize: 13,
                color: muted,
                textDecoration: "none",
                fontFamily: fontBody,
              }}
            >
              Built by <span style={{ fontWeight: 600, color: textDark }}>martinbuilds.ai</span>
            </a>
          </div>
        </div>

        {/* ── FIXED CTA ── */}
        <a
          href="/discovery-call"
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
