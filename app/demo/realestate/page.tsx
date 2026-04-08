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
  title: "Investor Command Center — martinbuilds.ai",
  description:
    "Real estate investor dashboard with deal analysis, skip tracing, buyer matching, assignment tracking, and marketing ROI — all in one command center.",
};

/* ─── static demo data ─── */

const PIPELINE = [
  { stage: "Sourced leads", count: 84, conv: null },
  { stage: "Skip traced", count: 62, conv: 74 },
  { stage: "Contacted", count: 41, conv: 66 },
  { stage: "Under contract", count: 12, conv: 29 },
  { stage: "Closed/Assigned", count: 8, conv: 67 },
];

const pipelineColors = ["#dcfce7", "#bbf7d0", "#86efac", "#4ade80", "#16a34a"];

const DEALS = [
  {
    address: "142 Birchwood Dr",
    acq: 185000,
    arv: 289000,
    rehab: 45000,
    spread: 59000,
    exit: "Wholesale",
  },
  {
    address: "310 Hollowbrook Ln",
    acq: 340000,
    arv: 475000,
    rehab: 62000,
    spread: 73000,
    exit: "Fix & Flip",
  },
  {
    address: "88 Commerce Blvd",
    acq: 125000,
    arv: 198000,
    rehab: 28000,
    spread: 45000,
    exit: "BRRRR",
  },
];

const BUYERS = [
  { initials: "MR", name: "Marcus Reeves", market: "SFH \u00B7 Atlanta Metro", deals: 23, speed: "2hrs", badge: "VIP" as const },
  { initials: "TB", name: "Tanya Brooks", market: "Multi-family \u00B7 Decatur", deals: 14, speed: "4hrs", badge: "Active" as const },
  { initials: "DC", name: "David Chen", market: "Wholesale flip \u00B7 Buckhead", deals: 9, speed: "1hr", badge: "Active" as const },
  { initials: "SM", name: "Sarah Mitchell", market: "Section 8 \u00B7 College Park", deals: 18, speed: "6hrs", badge: "VIP" as const },
  { initials: "KP", name: "Kevin Park", market: "New construction \u00B7 Marietta", deals: 5, speed: "12hrs", badge: "New" as const },
];

const ASSIGNMENTS = [
  { property: "142 Birchwood", contract: "$185K", assignment: "$199K", fee: "$14K", buyer: "M. Reeves", status: "Pending" as const },
  { property: "2204 Maple Ridge", contract: "$210K", assignment: "$238K", fee: "$28K", buyer: "T. Brooks", status: "Signed" as const },
  { property: "55 Lakeview", contract: "$125K", assignment: "$148K", fee: "$23K", buyer: "D. Chen", status: "Closing" as const },
  { property: "901 Pine Valley", contract: "$295K", assignment: "$310K", fee: "$15K", buyer: "S. Mitchell", status: "Sent" as const },
  { property: "776 Elmwood", contract: "$168K", assignment: "$189K", fee: "$21K", buyer: "K. Park", status: "Expired" as const },
];

const SKIP_TRACE = [
  { owner: "Robert Dawson", address: "415 Crescent Ave", phone: "470-***-8821", status: "Not reached" as const },
  { owner: "Linda Vasquez", address: "1122 Peach Industrial", phone: "678-***-3304", status: "Voicemail" as const },
  { owner: "James Whitfield", address: "309 Bankhead Hwy", phone: "404-***-1157", status: "Callback scheduled" as const },
  { owner: "Patricia Odom", address: "88 Collier Rd", phone: "770-***-6642", status: "Interested" as const },
];

const MARKETING = [
  { channel: "Driving for dollars", leads: 31, spend: 890, cpl: 28.71, color: "green" as const, note: "Best ROI" },
  { channel: "Direct mail", leads: 18, spend: 2400, cpl: 133, color: "amber" as const, note: null },
  { channel: "Cold calling", leads: 22, spend: 1100, cpl: 50, color: "green" as const, note: null },
  { channel: "PPC/Online", leads: 13, spend: 1800, cpl: 138, color: "red" as const, note: "Highest CPL" },
];

const SCORECARD = [
  { name: "Marcus Reeves", sent: 18, accepted: 14, rate: 78, avgFee: "$16.2K", lastDeal: "Mar 28" },
  { name: "Tanya Brooks", sent: 12, accepted: 7, rate: 58, avgFee: "$22.1K", lastDeal: "Mar 15" },
  { name: "David Chen", sent: 10, accepted: 4, rate: 40, avgFee: "$18.5K", lastDeal: "Mar 22" },
  { name: "Kevin Park", sent: 6, accepted: 1, rate: 17, avgFee: "$12.0K", lastDeal: "Feb 10" },
];

const TIMELINE_STAGES = [
  { label: "Lead sourced", day: 0 },
  { label: "Skip traced", day: 2 },
  { label: "First contact", day: 5 },
  { label: "Under contract", day: 9 },
  { label: "Buyer matched", day: 11 },
  { label: "Closed", day: 14 },
];

/* ─── helpers ─── */

function assignmentStatusStyle(s: string): React.CSSProperties {
  switch (s) {
    case "Pending": return { color: "#92400e", background: "#fef3c7" };
    case "Signed": return { color: "#14532d", background: "#dcfce7" };
    case "Closing": return { color: "#14532d", background: "#dcfce7" };
    case "Sent": return { color: "#1e40af", background: "#dbeafe" };
    case "Expired": return { color: "#991b1b", background: "#fee2e2" };
    default: return { color: "#374151", background: "#f3f4f6" };
  }
}

function skipStatusStyle(s: string): React.CSSProperties {
  switch (s) {
    case "Not reached": return { color: "#6b7280", background: "#f3f4f6" };
    case "Voicemail": return { color: "#92400e", background: "#fef3c7" };
    case "Callback scheduled": return { color: "#1e40af", background: "#dbeafe" };
    case "Interested": return { color: "#14532d", background: "#dcfce7" };
    default: return { color: "#374151", background: "#f3f4f6" };
  }
}

function buyerBadgeStyle(b: string): React.CSSProperties {
  switch (b) {
    case "VIP": return { color: "#14532d", background: "#dcfce7" };
    case "Active": return { color: "#1e40af", background: "#dbeafe" };
    case "New": return { color: "#92400e", background: "#fef3c7" };
    default: return { color: "#374151", background: "#f3f4f6" };
  }
}

function exitBadgeStyle(e: string): React.CSSProperties {
  switch (e) {
    case "Wholesale": return { color: "#14532d", background: "#dcfce7" };
    case "Fix & Flip": return { color: "#92400e", background: "#fef3c7" };
    case "BRRRR": return { color: "#1e40af", background: "#dbeafe" };
    default: return { color: "#374151", background: "#f3f4f6" };
  }
}

function cplColor(c: "green" | "amber" | "red"): string {
  if (c === "green") return "#14532d";
  if (c === "amber") return "#92400e";
  return "#991b1b";
}

function scorecardBarColor(rate: number): string {
  if (rate > 50) return "#14532d";
  if (rate >= 30) return "#92400e";
  return "#991b1b";
}

function fmtUsd(n: number) {
  return "$" + n.toLocaleString("en-US");
}

/* ─── shared inline style fragments ─── */

const card: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #E8E3DC",
  borderRadius: 12,
  padding: 20,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#14532d",
  margin: 0,
};

const sectionSub: React.CSSProperties = {
  fontSize: 12,
  color: "#6b7280",
  margin: "4px 0 16px",
};

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono)",
};

const pill: React.CSSProperties = {
  borderRadius: 9999,
  padding: "2px 8px",
  fontSize: 10,
  fontWeight: 600,
  display: "inline-block",
};

const barTrack: React.CSSProperties = {
  height: 10,
  width: "100%",
  borderRadius: 9999,
  background: "#f3f4f6",
  overflow: "hidden",
};

const barFill = (pct: number, color: string): React.CSSProperties => ({
  height: "100%",
  borderRadius: 9999,
  width: `${pct}%`,
  background: color,
});

/* ─── page ─── */

export default function InvestorCommandCenter() {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "var(--font-dm-sans)" }}
    >
      <style>{`
  body { background: #FAFAF8 !important; color: #1a1a1a !important; font-family: var(--font-dm-sans), sans-serif !important; }
  body::before { display: none !important; }
  section { padding-left: unset !important; padding-right: unset !important; }
  h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .re-kpi { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
  .re-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .re-two-wide { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
  .re-two-narrow { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; }
  .re-timeline-dots { display: flex; align-items: flex-start; justify-content: space-between; position: relative; }
  @media (max-width: 768px) {
    .re-kpi { grid-template-columns: repeat(2, 1fr) !important; }
    .re-three { grid-template-columns: 1fr !important; }
    .re-two-wide { grid-template-columns: 1fr !important; }
    .re-two-narrow { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .re-kpi { grid-template-columns: 1fr !important; }
  }
`}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>

        {/* ── Demo context banner ── */}
        <div style={{ padding: "24px 28px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for a real estate investor.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>Deal pipeline, wholesale spreads, cash buyer matching, and assignment tracking — all in one place. The final product is designed around how your deals actually flow. This is a starting point to show what&apos;s possible.</p>
        </div>

        {/* ═══════════════ 1. TOP BAR ═══════════════ */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out forwards",
          }}
        >
          <div>
            <a href="/" style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textDecoration: "none", letterSpacing: -0.5 }}>martin<span style={{ color: "#14532d" }}>.builds</span></a>
            <h1
              style={{
                margin: "4px 0 0 0",
                fontSize: 28,
                fontWeight: 700,
                color: "#14532d",
                fontFamily: "var(--font-playfair)",
              }}
            >
              Investor Command Center
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280", ...mono }}>
              April 2025 &middot; 12 active deals &middot; $847K pipeline
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 9999,
                background: "#dcfce7",
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600,
                color: "#14532d",
              }}
            >
              Avg spread $28.4K
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 9999,
                background: "#fef3c7",
                padding: "4px 12px",
                fontSize: 12,
                fontWeight: 600,
                color: "#92400e",
              }}
            >
              3 deals closing this week
            </span>
          </div>
        </div>

        {/* ═══════════════ 2. ALERT BANNER ═══════════════ */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            padding: "14px 20px",
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out 0.05s forwards",
            opacity: 0,
          }}
        >
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#14532d" }}>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#16a34a",
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            <strong>310 Hollowbrook Ln</strong> — cash buyer Marcus Reeves matched at $485K. Assignment fee: $14,250. Auto-expires in 48 hrs.
          </p>
          <button
            style={{
              flexShrink: 0,
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: "#14532d",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send to buyer
          </button>
        </div>

        {/* ═══════════════ 3. KPI ROW ═══════════════ */}
        <div
          className="re-kpi"
          style={{
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out 0.1s forwards",
            opacity: 0,
          }}
        >
          {[
            { label: "Active deals", value: "12", sub: "4 under contract", accent: null },
            { label: "Avg wholesale spread", value: "$28,400", sub: "\u2191$3.2K vs Q1", accent: "green" },
            { label: "Pipeline value", value: "$847K", sub: "3 closing this week", accent: "green" },
            { label: "Cost per deal", value: "$1,240", sub: "\u2193$380 vs last quarter", accent: "green" },
            { label: "Avg deal velocity", value: "14 days", sub: "Lead to close", accent: "blue" },
          ].map((kpi, i) => (
            <div key={i} style={{ ...card }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#6b7280",
                }}
              >
                {kpi.label}
              </p>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 28,
                  fontWeight: 700,
                  ...mono,
                  color: "#14532d",
                }}
              >
                {kpi.value}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 12,
                  fontWeight: 500,
                  color:
                    kpi.accent === "amber"
                      ? "#92400e"
                      : kpi.accent === "green"
                        ? "#14532d"
                        : kpi.accent === "blue"
                          ? "#1e40af"
                          : "#6b7280",
                }}
              >
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ═══════════════ 4. THREE-COLUMN GRID ═══════════════ */}
        <div
          className="re-three"
          style={{
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out 0.15s forwards",
            opacity: 0,
          }}
        >
          {/* ── Deal Pipeline ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Deal Pipeline</h2>
            <p style={{ ...sectionSub }}>Sourced to closed funnel</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PIPELINE.map((f, i) => {
                const pct = (f.count / 84) * 100;
                return (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontWeight: 500, color: "#374151" }}>{f.stage}</span>
                      <span style={{ ...mono }}>
                        <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{f.count}</span>
                        {f.conv !== null && (
                          <span style={{ marginLeft: 4, color: "#9ca3af" }}>({f.conv}%)</span>
                        )}
                      </span>
                    </div>
                    <div style={{ ...barTrack }}>
                      <div style={barFill(pct, pipelineColors[i])} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Deal Analyzer — Active ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Deal Analyzer — Active</h2>
            <p style={{ ...sectionSub }}>3 deals in analysis</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {DEALS.map((d, i) => {
                const profitPct = (d.spread / d.arv) * 100;
                return (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #E8E3DC",
                      borderRadius: 10,
                      padding: 14,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#1a1a1a",
                        }}
                      >
                        {d.address}
                      </p>
                      <span style={{ ...pill, ...exitBadgeStyle(d.exit) }}>{d.exit}</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 11,
                        color: "#6b7280",
                        marginTop: 10,
                        gap: 4,
                        flexWrap: "wrap",
                      }}
                    >
                      <span>Acq: <span style={{ ...mono, color: "#1a1a1a" }}>{fmtUsd(d.acq)}</span></span>
                      <span>ARV: <span style={{ ...mono, color: "#1a1a1a" }}>{fmtUsd(d.arv)}</span></span>
                      <span>Rehab: <span style={{ ...mono, color: "#1a1a1a" }}>{fmtUsd(d.rehab)}</span></span>
                    </div>

                    <div style={{ ...barTrack, marginTop: 8, height: 8 }}>
                      <div style={barFill(profitPct, "#14532d")} />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 8,
                      }}
                    >
                      <span style={{ fontSize: 11, color: "#6b7280" }}>Spread</span>
                      <span
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#14532d",
                          ...mono,
                        }}
                      >
                        {fmtUsd(d.spread)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Cash Buyer Network ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Cash Buyer Network</h2>
            <p style={{ ...sectionSub }}>5 active buyers</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {BUYERS.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "#14532d",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {b.initials}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1a1a1a",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {b.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        color: "#6b7280",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {b.market}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 10,
                        color: "#9ca3af",
                        ...mono,
                      }}
                    >
                      {b.deals} deals &middot; responds in {b.speed}
                    </p>
                  </div>
                  <span
                    style={{
                      ...pill,
                      ...buyerBadgeStyle(b.badge),
                      flexShrink: 0,
                    }}
                  >
                    {b.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ 5. TWO-COLUMN (wider left) ═══════════════ */}
        <div
          className="re-two-wide"
          style={{
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out 0.2s forwards",
            opacity: 0,
          }}
        >
          {/* ── Assignment Tracker ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Assignment Tracker</h2>
            <p style={{ ...sectionSub }}>5 active assignments</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid #E8E3DC",
                    }}
                  >
                    {["Property", "Contract", "Assignment", "Fee", "Buyer", "Status"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 12px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "#9ca3af",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ASSIGNMENTS.map((a, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom:
                          i < ASSIGNMENTS.length - 1
                            ? "1px solid #E8E3DC"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          fontWeight: 500,
                          color: "#1a1a1a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.property}
                      </td>
                      <td style={{ padding: "10px 12px", ...mono }}>{a.contract}</td>
                      <td style={{ padding: "10px 12px", ...mono }}>{a.assignment}</td>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: "#14532d", ...mono }}>{a.fee}</td>
                      <td style={{ padding: "10px 12px", color: "#6b7280" }}>{a.buyer}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ ...pill, ...assignmentStatusStyle(a.status) }}>{a.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Skip Trace Queue ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Skip Trace Queue</h2>
            <p style={{ ...sectionSub }}>4 pending contacts</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SKIP_TRACE.map((s, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #E8E3DC",
                    borderRadius: 10,
                    padding: 12,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{s.owner}</p>
                    <span style={{ ...pill, ...skipStatusStyle(s.status) }}>{s.status}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{s.address}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                    <span style={{ fontSize: 12, color: "#374151", ...mono }}>{s.phone}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        style={{
                          borderRadius: 6,
                          padding: "4px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#14532d",
                          background: "#dcfce7",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Call
                      </button>
                      <button
                        style={{
                          borderRadius: 6,
                          padding: "4px 10px",
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#1e40af",
                          background: "#dbeafe",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        SMS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ 6. TWO-COLUMN (narrower left) ═══════════════ */}
        <div
          className="re-two-narrow"
          style={{
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out 0.25s forwards",
            opacity: 0,
          }}
        >
          {/* ── Marketing ROI ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Marketing ROI</h2>
            <p style={{ ...sectionSub }}>Cost per lead by channel</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {MARKETING.map((ch, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 12,
                    }}
                  >
                    <span style={{ fontWeight: 500, color: "#374151" }}>{ch.channel}</span>
                    <span
                      style={{
                        fontWeight: 600,
                        color: cplColor(ch.color),
                        ...mono,
                      }}
                    >
                      ${ch.cpl.toFixed(ch.cpl % 1 === 0 ? 0 : 2)}/lead
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 4,
                    }}
                  >
                    <div style={{ ...barTrack, height: 8, flex: 1 }}>
                      <div
                        style={barFill(
                          (ch.spend / 2400) * 100,
                          cplColor(ch.color)
                        )}
                      />
                    </div>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: 10,
                        color: "#9ca3af",
                        ...mono,
                      }}
                    >
                      {ch.leads} leads &middot; {fmtUsd(ch.spend)}
                    </span>
                  </div>
                  {ch.note && (
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 10,
                        fontStyle: "italic",
                        color: ch.color === "red" ? "#991b1b" : "#14532d",
                        fontWeight: 500,
                      }}
                    >
                      {ch.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Buyer Scorecard ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Buyer Scorecard</h2>
            <p style={{ ...sectionSub }}>Top buyer performance</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {SCORECARD.map((b, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{b.name}</span>
                    <span style={{ fontSize: 12, color: "#9ca3af", ...mono }}>
                      {b.sent} sent &middot; {b.accepted} accepted
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 6,
                    }}
                  >
                    <div style={{ ...barTrack, height: 8, flex: 1 }}>
                      <div style={barFill(b.rate, scorecardBarColor(b.rate))} />
                    </div>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: 12,
                        fontWeight: 600,
                        color: scorecardBarColor(b.rate),
                        ...mono,
                      }}
                    >
                      {b.rate}%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11,
                      color: "#9ca3af",
                      marginTop: 4,
                    }}
                  >
                    <span>Avg fee: <span style={{ ...mono, color: "#14532d" }}>{b.avgFee}</span></span>
                    <span>Last deal: {b.lastDeal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ 7. DEAL VELOCITY TIMELINE ═══════════════ */}
        <div
          style={{
            ...card,
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out 0.3s forwards",
            opacity: 0,
          }}
        >
          <h2 style={{ ...sectionTitle }}>Deal Velocity Timeline</h2>
          <p style={{ ...sectionSub }}>Average days at each stage — 14-day lead to close</p>
          <div style={{ position: "relative", padding: "20px 0 0" }}>
            {/* Connecting line */}
            <div
              style={{
                position: "absolute",
                top: 34,
                left: "5%",
                right: "5%",
                height: 3,
                background: "#E8E3DC",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 34,
                left: "5%",
                right: "5%",
                height: 3,
                background: "#14532d",
                zIndex: 1,
              }}
            />
            <div className="re-timeline-dots">
              {TIMELINE_STAGES.map((s, i) => {
                const daysBetween = i < TIMELINE_STAGES.length - 1
                  ? TIMELINE_STAGES[i + 1].day - s.day
                  : null;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      zIndex: 2,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "#14532d",
                        border: "3px solid #fff",
                        boxShadow: "0 0 0 2px #14532d",
                      }}
                    />
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#1a1a1a",
                        textAlign: "center",
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 11,
                        color: "#14532d",
                        fontWeight: 600,
                        ...mono,
                        textAlign: "center",
                      }}
                    >
                      Day {s.day}
                    </p>
                    {daysBetween !== null && (
                      <p
                        style={{
                          position: "absolute",
                          top: -16,
                          right: "-30%",
                          fontSize: 10,
                          color: "#9ca3af",
                          ...mono,
                          whiteSpace: "nowrap",
                        }}
                      >
                        +{daysBetween}d
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── martinbuilds.ai watermark ── */}
        <div
          style={{
            paddingTop: 16,
            textAlign: "center",
            animation: "fadeUp 0.5s ease-out 0.35s forwards",
            opacity: 0,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: "#9ca3af" }}>
            Built by{" "}
            <a
              href="/discovery-call"
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                color: "#14532d",
              }}
            >
              martinbuilds.ai
            </a>
          </p>
        </div>
      </div>

      {/* ═══════════════ FIXED CTA ═══════════════ */}
      <a
        href="/discovery-call"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 50,
          borderRadius: 9999,
          padding: "12px 20px",
          fontSize: 14,
          fontWeight: 600,
          color: "#fff",
          background: "#14532d",
          textDecoration: "none",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        }}
      >
        Book a walkthrough &rarr;
      </a>
    </div>
  );
}
