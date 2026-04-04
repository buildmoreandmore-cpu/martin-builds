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
  { channel: "Referrals", leads: 27, rate: 41, color: "#14532d" },
  { channel: "Google Ads", leads: 31, rate: 19, color: "#1e40af" },
  { channel: "Zillow", leads: 42, rate: 14, color: "#b45309" },
  { channel: "Facebook", leads: 48, rate: 11, color: "#7c3aed" },
];

const ACTIVITY = [
  { time: "3:42 PM", text: "142 Birchwood Dr — contract expires in 3 days, buyer unresponsive", dot: "#dc2626" },
  { time: "2:15 PM", text: "55 Lakeview Ct — buyer signed final addendum", dot: "#16a34a" },
  { time: "1:30 PM", text: "New lead: Maria Rodriguez — Buy $450k–$600k via Facebook", dot: "#9333ea" },
  { time: "12:00 PM", text: "8 leads gone quiet (7+ days) — auto-flagged for follow-up", dot: "#f59e0b" },
  { time: "10:45 AM", text: "Google Ads monthly budget at 82% — $620 remaining", dot: "#2563eb" },
  { time: "9:10 AM", text: "Referral from David Park closed — $14,250 commission", dot: "#16a34a" },
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

function daysStyle(d: number): React.CSSProperties {
  if (d <= 7) return { color: "#991b1b", background: "#fee2e2" };
  if (d <= 21) return { color: "#92400e", background: "#fef3c7" };
  return { color: "#14532d", background: "#dcfce7" };
}

function statusStyle(s: string): React.CSSProperties {
  switch (s) {
    case "Addendum": return { color: "#991b1b", background: "#fee2e2" };
    case "In review": return { color: "#92400e", background: "#fef3c7" };
    case "Signed": return { color: "#14532d", background: "#dcfce7" };
    case "Inspection": return { color: "#1e40af", background: "#dbeafe" };
    default: return { color: "#374151", background: "#f3f4f6" };
  }
}

function badgeStyle(b: string): React.CSSProperties {
  switch (b) {
    case "Hot": return { color: "#991b1b", background: "#fee2e2" };
    case "Warm": return { color: "#92400e", background: "#fef3c7" };
    case "Contract": return { color: "#14532d", background: "#dcfce7" };
    case "Nurture": return { color: "#7e22ce", background: "#f3e8ff" };
    case "New": return { color: "#1e40af", background: "#dbeafe" };
    default: return { color: "#374151", background: "#f3f4f6" };
  }
}

function cplTextColor(c: "green" | "amber" | "red"): string {
  if (c === "green") return "#14532d";
  if (c === "amber") return "#92400e";
  return "#991b1b";
}

function cplBarColor(c: "green" | "amber" | "red"): string {
  if (c === "green") return "#14532d";
  if (c === "amber") return "#92400e";
  return "#991b1b";
}

const funnelColors = ["#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8"];

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

export default function RealEstateCommandCenter() {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "var(--font-dm-sans)", paddingTop: 64 }}
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
  .re-deals { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
  @media (max-width: 768px) {
    .re-kpi { grid-template-columns: repeat(2, 1fr) !important; }
    .re-three { grid-template-columns: 1fr !important; }
    .re-two-wide { grid-template-columns: 1fr !important; }
    .re-two-narrow { grid-template-columns: 1fr !important; }
    .re-deals { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .re-kpi { grid-template-columns: 1fr !important; }
  }
`}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>

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
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: "#14532d",
                fontFamily: "var(--font-playfair)",
              }}
            >
              Real Estate Command Center
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280", ...mono }}>
              April 2025 &middot; 6 active deals &middot; $2.31M pipeline
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
              Lead&rarr;close 18.4%
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
              Cost per lead $84
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
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 12,
            padding: "14px 20px",
            marginBottom: 24,
            animation: "fadeUp 0.5s ease-out 0.05s forwards",
            opacity: 0,
          }}
        >
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#991b1b" }}>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#dc2626",
                marginRight: 8,
                verticalAlign: "middle",
              }}
            />
            <strong>142 Birchwood Dr</strong> — contract expires in 3 days. Buyer hasn&apos;t signed the addendum. Last contact was 6 days ago.
          </p>
          <button
            style={{
              flexShrink: 0,
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: "#dc2626",
              border: "none",
              cursor: "pointer",
            }}
          >
            Draft follow-up
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
            { label: "Leads this month", value: "148", sub: "\u21915 22 vs last month", accent: null },
            { label: "Active conversations", value: "27", sub: "8 gone quiet 7d+", accent: "amber" },
            { label: "Lead \u2192 close rate", value: "18.4%", sub: "\u21912.1% vs Q1", accent: "green" },
            { label: "Cost per lead", value: "$84", sub: "\u2193$12 vs last month", accent: "green" },
            { label: "Commission pipeline", value: "$41,200", sub: "3 closing this month", accent: "green" },
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
          {/* ── Lead pipeline / Conversion funnel ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Lead Pipeline</h2>
            <p style={{ ...sectionSub }}>Conversion funnel</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {FUNNEL.map((f, i) => {
                const pct = (f.count / 148) * 100;
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
                      <div style={barFill(pct, funnelColors[i])} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Marketing spend / CPL ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Marketing Spend</h2>
            <p style={{ ...sectionSub }}>Cost per lead by channel</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CHANNELS.map((ch, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 12,
                    }}
                  >
                    <span style={{ fontWeight: 500, color: "#374151" }}>{ch.name}</span>
                    <span
                      style={{
                        fontWeight: 600,
                        color: cplTextColor(ch.color),
                        ...mono,
                      }}
                    >
                      {ch.cpl === 0 ? "$0" : `$${ch.cpl}`}/lead
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
                          (ch.leads / 48) * 100,
                          cplBarColor(ch.color)
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
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: 10,
                      fontStyle: "italic",
                      color: "#9ca3af",
                    }}
                  >
                    {ch.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Active lead contacts ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Active Lead Contacts</h2>
            <p style={{ ...sectionSub }}>5 priority leads</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {LEADS.map((l, i) => (
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
                    {l.initials}
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
                      {l.name}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: "#6b7280",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {l.interest}
                    </p>
                  </div>
                  <span
                    style={{
                      ...pill,
                      ...badgeStyle(l.badge),
                      flexShrink: 0,
                    }}
                  >
                    {l.badge}
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
          {/* ── Contract tracker ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Contract Tracker</h2>
            <p style={{ ...sectionSub }}>5 active contracts</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid #E8E3DC",
                    }}
                  >
                    {["Property", "Price", "Close", "Days left", "Status"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 16px",
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
                  {CONTRACTS.map((c, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom:
                          i < CONTRACTS.length - 1
                            ? "1px solid #E8E3DC"
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 16px",
                          fontWeight: 500,
                          color: "#1a1a1a",
                        }}
                      >
                        {c.property}
                      </td>
                      <td style={{ padding: "10px 16px", ...mono }}>
                        {c.price}
                      </td>
                      <td style={{ padding: "10px 16px", color: "#6b7280" }}>
                        {c.close}
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <span
                          style={{
                            ...pill,
                            ...daysStyle(c.days),
                            ...mono,
                          }}
                        >
                          {c.days}d
                        </span>
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        <span
                          style={{
                            ...pill,
                            ...statusStyle(c.status),
                          }}
                        >
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
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Conversion by Lead Source</h2>
            <p style={{ ...sectionSub }}>Close rate by channel</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CONVERSION_BY_SOURCE.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 14,
                    }}
                  >
                    <span style={{ fontWeight: 500, color: "#374151" }}>
                      {s.channel}
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        color: s.color,
                        ...mono,
                      }}
                    >
                      {s.rate}%
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
                      <div style={barFill((s.rate / 41) * 100, s.color)} />
                    </div>
                    <span
                      style={{ fontSize: 12, color: "#9ca3af", ...mono }}
                    >
                      {s.leads} leads
                    </span>
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
          {/* ── Activity feed ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Activity Feed</h2>
            <p style={{ ...sectionSub }}>Today</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {ACTIVITY.map((a, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 12 }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginTop: 4,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: a.dot,
                        flexShrink: 0,
                      }}
                    />
                    {i < ACTIVITY.length - 1 && (
                      <div
                        style={{
                          marginTop: 4,
                          width: 1,
                          flex: 1,
                          background: "#e5e7eb",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ paddingBottom: 14 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#1a1a1a",
                      }}
                    >
                      {a.text}
                    </p>
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 10,
                        color: "#9ca3af",
                        ...mono,
                      }}
                    >
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Deal analyzer ── */}
          <div style={{ ...card }}>
            <h2 style={{ ...sectionTitle }}>Deal Analyzer</h2>
            <p style={{ ...sectionSub }}>Active negotiations</p>
            <div className="re-deals">
              {DEALS.map((d, i) => {
                const isOver = d.pctDiff > 0;
                const barPct = isOver ? 100 : (d.offer / d.list) * 100;
                return (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #E8E3DC",
                      borderRadius: 10,
                      padding: 16,
                    }}
                  >
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
                    <p
                      style={{
                        margin: "2px 0 0",
                        fontSize: 10,
                        color: "#9ca3af",
                      }}
                    >
                      via {d.source}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 12,
                      }}
                    >
                      <span>
                        List:{" "}
                        <span style={{ ...mono }}>{fmtUsd(d.list)}</span>
                      </span>
                      <span>
                        Offer:{" "}
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#1a1a1a",
                            ...mono,
                          }}
                        >
                          {fmtUsd(d.offer)}
                        </span>
                      </span>
                    </div>

                    <div style={{ ...barTrack, marginTop: 8 }}>
                      <div
                        style={barFill(
                          barPct,
                          isOver ? "#14532d" : "#991b1b"
                        )}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 12,
                        marginTop: 8,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          color: isOver ? "#14532d" : "#991b1b",
                        }}
                      >
                        {isOver ? "+" : ""}
                        {d.pctDiff}% {isOver ? "over" : "under"} ask
                      </span>
                      <span style={{ color: "#9ca3af", ...mono }}>
                        {d.dom} DOM
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        borderTop: "1px solid #E8E3DC",
                        paddingTop: 12,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ fontSize: 12, color: "#6b7280" }}>
                          Net commission
                        </span>
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#14532d",
                            ...mono,
                          }}
                        >
                          {fmtUsd(d.netComm)}
                        </span>
                      </div>
                      {d.marketingCost > 0 && (
                        <p
                          style={{
                            margin: "2px 0 0",
                            textAlign: "right",
                            fontSize: 10,
                            color: "#9ca3af",
                            ...mono,
                          }}
                        >
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
              href="https://martinbuilds.ai"
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
