import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";

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
  title: "Ecommerce Profit Dashboard — martinbuilds.ai",
  description:
    "See how martin.builds tracks true profit, ad performance, and customer acquisition in one custom dashboard.",
};

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
  color: "#1a1a1a",
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

export default function EcommerceProfitDashboard() {
  return (
    <div
      className={`${dmSans.variable} ${dmMono.variable}`}
      style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "var(--font-dm-sans)" }}
    >
      <style>{`
  html body { background: #FAFAF8 !important; color: #1a1a1a !important; font-family: var(--font-dm-sans), sans-serif !important; }
  body::before { display: none !important; }
  section { padding-left: unset !important; padding-right: unset !important; }
  h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .ecom-kpi { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
  .ecom-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .ecom-two-wide { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
  .ecom-two-narrow { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; }
  .ecom-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 768px) {
    .ecom-kpi { grid-template-columns: repeat(2, 1fr) !important; }
    .ecom-three { grid-template-columns: 1fr !important; }
    .ecom-two-wide { grid-template-columns: 1fr !important; }
    .ecom-two-narrow { grid-template-columns: 1fr !important; }
    .ecom-two { grid-template-columns: 1fr !important; }
    .ecom-wrap { padding: 16px !important; }
  }
  @media (max-width: 480px) {
    .ecom-kpi { grid-template-columns: 1fr !important; }
    .ecom-wrap { padding: 12px !important; }
  }
`}</style>

      <div className="ecom-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>

        {/* ── Demo context banner ── */}
        <div style={{ padding: "24px 28px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for an ecommerce / DTC brand.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>True profit, ad ROAS, CAC analysis, and channel performance — all in one place. The final product is designed around how your brand actually operates. This is a starting point to show what&apos;s possible.</p>
        </div>

        {/* ═══════════════ TOP BAR ═══════════════ */}
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
            <a href="/" style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textDecoration: "none", letterSpacing: -0.5 }}>martin<span style={{ color: "#16a34a" }}>.builds</span></a>
            <h1 style={{ margin: "4px 0 0 0", fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>
              Ecommerce Profit Dashboard
            </h1>
            <p style={{ ...mono, fontSize: 12, color: "#6b7280", margin: "4px 0 0 0" }}>
              April 2025 &middot; 142 orders today &middot; Last sync 6 min ago
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ ...pill, color: "#14532d", background: "#dcfce7", fontSize: 12, padding: "4px 12px" }}>
              True margin 31.4% &#10003;
            </span>
            <span style={{ ...pill, color: "#991b1b", background: "#fee2e2", fontSize: 12, padding: "4px 12px" }}>
              Meta ROAS 1.8x &darr;
            </span>
          </div>
        </div>

        {/* ═══════════════ ALERT BANNER ═══════════════ */}
        <div
          style={{
            ...card,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            marginBottom: 24,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            animation: "fadeUp 0.5s ease-out 0.1s both",
          }}
        >
          <p style={{ margin: 0, fontSize: 14, color: "#991b1b", fontWeight: 500, flex: 1, minWidth: 200 }}>
            &#9888; Meta &lsquo;Summer Skin&rsquo; ad set has spent $340 today with a 1.2x ROAS. You&rsquo;re losing money on every sale it drives.
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#ffffff",
              background: "#991b1b",
              textDecoration: "none",
            }}
          >
            Diagnose
          </a>
        </div>

        {/* ═══════════════ KPI ROW ═══════════════ */}
        <div className="ecom-kpi" style={{ marginBottom: 24, animation: "fadeUp 0.5s ease-out 0.2s both" }}>
          {[
            { value: "$8,240", label: "Revenue today", sub: "\u2191 18% vs yesterday", color: "#16a34a" },
            { value: "$2,588", label: "True profit today", sub: "After COGS + ads + fees", color: "#16a34a" },
            { value: "$1,840", label: "Ad spend today", sub: "3 sets underperforming", color: "#dc2626" },
            { value: "$28.40", label: "Blended CAC", sub: "Target is $22 \u2014 high", color: "#d97706" },
            { value: "3.1x", label: "Blended ROAS", sub: "\u2191 from 2.8x yesterday", color: "#16a34a" },
          ].map((kpi, i) => (
            <div key={i} style={card}>
              <p style={{ ...mono, fontSize: 28, fontWeight: 700, color: kpi.color, margin: 0 }}>{kpi.value}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", margin: "4px 0 2px" }}>{kpi.label}</p>
              <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ═══════════════ ROW 1: THREE COLUMNS ═══════════════ */}
        <div className="ecom-three" style={{ marginBottom: 24, animation: "fadeUp 0.5s ease-out 0.3s both" }}>

          {/* ── True Profit Breakdown ── */}
          <div style={card}>
            <p style={sectionTitle}>True Profit Breakdown</p>
            <p style={sectionSub}>Today&rsquo;s P&amp;L at a glance</p>
            {[
              { label: "Gross revenue", note: "142 orders today", value: "$8,240", color: "#16a34a", sign: "" },
              { label: "COGS", note: "Product + shipping + fulfillment", value: "\u2212$2,884", color: "#dc2626", sign: "" },
              { label: "Ad spend", note: "Meta + Google + TikTok", value: "\u2212$1,840", color: "#dc2626", sign: "" },
              { label: "Platform fees", note: "Shopify + payment processing", value: "\u2212$329", color: "#dc2626", sign: "" },
              { label: "Returns / refunds", note: "8 orders returned today", value: "\u2212$599", color: "#dc2626", sign: "" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f3f4f6" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{row.label}</p>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{row.note}</p>
                </div>
                <span style={{ ...mono, fontSize: 14, fontWeight: 600, color: row.color }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 8px", marginTop: 8, borderRadius: 8, background: "#f0fdf4" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#14532d", margin: 0 }}>True profit</p>
                <p style={{ fontSize: 11, color: "#16a34a", margin: 0 }}>31.4% margin</p>
              </div>
              <span style={{ ...mono, fontSize: 20, fontWeight: 700, color: "#16a34a" }}>$2,588</span>
            </div>
          </div>

          {/* ── Ad Channel Performance ── */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <p style={{ ...sectionTitle, margin: 0 }}>Ad Channel Performance</p>
              <span style={{ ...pill, color: "#991b1b", background: "#fee2e2" }}>2 burning cash</span>
            </div>
            <p style={sectionSub}>Spend &amp; return by channel</p>
            {[
              { name: "Meta Ads", spend: "$980 spent", roas: "1.8x", roasColor: "#d97706", cac: "$34", cacColor: "#1a1a1a", bad: "4 bad sets", badColor: "#dc2626", rev: "$1,764" },
              { name: "Google Ads", spend: "$540 spent", roas: "4.2x", roasColor: "#16a34a", cac: "$19", cacColor: "#16a34a", bad: "0 bad", badColor: "#16a34a", rev: "$2,268" },
              { name: "TikTok Ads", spend: "$320 spent", roas: "2.4x", roasColor: "#d97706", cac: "$28", cacColor: "#d97706", bad: "1 bad", badColor: "#d97706", rev: "$768" },
            ].map((ch, i) => (
              <div key={i} style={{ border: "1px solid #E8E3DC", borderRadius: 8, padding: 12, marginBottom: i < 2 ? 8 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{ch.name}</span>
                  <span style={{ ...mono, fontSize: 11, color: "#6b7280" }}>{ch.spend}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  <div><span style={{ fontSize: 10, color: "#6b7280" }}>ROAS</span><br /><span style={{ ...mono, fontSize: 13, fontWeight: 600, color: ch.roasColor }}>{ch.roas}</span></div>
                  <div><span style={{ fontSize: 10, color: "#6b7280" }}>CAC</span><br /><span style={{ ...mono, fontSize: 13, fontWeight: 600, color: ch.cacColor }}>{ch.cac}</span></div>
                  <div><span style={{ fontSize: 10, color: "#6b7280" }}>Bad sets</span><br /><span style={{ ...mono, fontSize: 13, fontWeight: 600, color: ch.badColor }}>{ch.bad}</span></div>
                  <div><span style={{ fontSize: 10, color: "#6b7280" }}>Revenue</span><br /><span style={{ ...mono, fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{ch.rev}</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Ad Set Watchlist ── */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <p style={{ ...sectionTitle, margin: 0 }}>Ad Set Watchlist</p>
              <span style={{ ...pill, color: "#991b1b", background: "#fee2e2" }}>Needs action</span>
            </div>
            <p style={sectionSub}>Performance by individual ad set</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E3DC" }}>
                  {["Ad Set", "Spend", "ROAS", "Status"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Summer Skin \u2014 Meta", spend: "$340", roas: "1.2x", status: "Pause now", sStyle: { color: "#991b1b", background: "#fee2e2" } },
                  { name: "Retarget V2 \u2014 Meta", spend: "$210", roas: "1.9x", status: "Watch", sStyle: { color: "#92400e", background: "#fef3c7" } },
                  { name: "TikTok UGC 3", spend: "$180", roas: "2.1x", status: "Watch", sStyle: { color: "#92400e", background: "#fef3c7" } },
                  { name: "Google Brand Search", spend: "$290", roas: "5.1x", status: "Scale", sStyle: { color: "#14532d", background: "#dcfce7" } },
                  { name: "Google Shopping", spend: "$250", roas: "4.6x", status: "Scale", sStyle: { color: "#14532d", background: "#dcfce7" } },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px 4px", fontWeight: 500, color: "#1a1a1a" }}>{row.name}</td>
                    <td style={{ padding: "8px 4px", ...mono, color: "#1a1a1a" }}>{row.spend}</td>
                    <td style={{ padding: "8px 4px", ...mono, color: "#1a1a1a" }}>{row.roas}</td>
                    <td style={{ padding: "8px 4px" }}><span style={{ ...pill, ...row.sStyle }}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══════════════ ROW 2: TWO COLUMNS WIDE LEFT ═══════════════ */}
        <div className="ecom-two-wide" style={{ marginBottom: 24, animation: "fadeUp 0.5s ease-out 0.4s both" }}>

          {/* ── Orders Today ── */}
          <div style={card}>
            <p style={sectionTitle}>Orders Today</p>
            <p style={sectionSub}>142 total &middot; 8 returned</p>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8E3DC" }}>
                  {["Customer", "Product", "Order value", "Channel", "Type"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "6px 4px", fontSize: 10, fontWeight: 600, color: "#6b7280", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { initials: "TW", name: "T. Wells", product: "Glow Serum 2oz", value: "$64", channel: "Meta", type: "New", tStyle: { color: "#1e40af", background: "#dbeafe" } },
                  { initials: "MD", name: "M. Diallo", product: "Bundle 3pk", value: "$142", channel: "Google", type: "Repeat", tStyle: { color: "#7c3aed", background: "#ede9fe" } },
                  { initials: "SK", name: "S. Kwan", product: "Night Cream", value: "$58", channel: "TikTok", type: "New", tStyle: { color: "#1e40af", background: "#dbeafe" } },
                  { initials: "BN", name: "B. Nash", product: "Glow Serum 2oz", value: "$64", channel: "Email", type: "Repeat", tStyle: { color: "#7c3aed", background: "#ede9fe" } },
                  { initials: "RL", name: "R. Lowe", product: "Starter Kit", value: "$89", channel: "Organic", type: "New", tStyle: { color: "#1e40af", background: "#dbeafe" } },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px 4px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 9999, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#6b7280" }}>{row.initials}</div>
                        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{row.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 4px", color: "#1a1a1a" }}>{row.product}</td>
                    <td style={{ padding: "8px 4px", ...mono, color: "#1a1a1a" }}>{row.value}</td>
                    <td style={{ padding: "8px 4px", color: "#6b7280" }}>{row.channel}</td>
                    <td style={{ padding: "8px 4px" }}><span style={{ ...pill, ...row.tStyle }}>{row.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Right stacked cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Revenue by Channel */}
            <div style={card}>
              <p style={sectionTitle}>Revenue by Channel</p>
              <p style={sectionSub}>Distribution today</p>
              {[
                { label: "Google", value: "$2,268", pct: 100, color: "#2563eb" },
                { label: "Meta", value: "$1,764", pct: 78, color: "#7c3aed" },
                { label: "Email / SMS", value: "$1,610", pct: 71, color: "#16a34a" },
                { label: "Organic", value: "$1,242", pct: 55, color: "#0d9488" },
                { label: "TikTok", value: "$768", pct: 34, color: "#d97706" },
                { label: "Direct", value: "$588", pct: 26, color: "#9ca3af" },
              ].map((ch, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, color: "#1a1a1a", fontWeight: 500 }}>{ch.label}</span>
                    <span style={{ ...mono, fontSize: 12, color: "#1a1a1a" }}>{ch.value}</span>
                  </div>
                  <div style={barTrack}><div style={barFill(ch.pct, ch.color)} /></div>
                </div>
              ))}
            </div>

            {/* Activity Feed */}
            <div style={card}>
              <p style={sectionTitle}>Activity Feed</p>
              <p style={sectionSub}>Recent events</p>
              {[
                { dot: "#dc2626", text: "Summer Skin ROAS dropped to 1.2x \u2014 Meta", time: "14 min ago" },
                { dot: "#16a34a", text: "Google Brand crossed $2k revenue \u2014 best day this month", time: "41 min ago" },
                { dot: "#2563eb", text: "Email campaign sent \u2014 1,840 subscribers, 34% open rate", time: "2 hrs ago" },
                { dot: "#d97706", text: "Return rate spiking on Night Cream \u2014 6 returns today", time: "3 hrs ago" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 9999, background: item.dot, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 12, color: "#1a1a1a", margin: 0 }}>{item.text}</p>
                    <p style={{ fontSize: 10, color: "#6b7280", margin: "2px 0 0" }}>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ ROW 3: TWO COLUMNS NARROW LEFT ═══════════════ */}
        <div className="ecom-two-narrow" style={{ marginBottom: 24, animation: "fadeUp 0.5s ease-out 0.5s both" }}>

          {/* ── Business Health Gauges ── */}
          <div style={card}>
            <p style={sectionTitle}>Business Health Gauges</p>
            <p style={sectionSub}>Key operating metrics</p>
            {[
              { label: "COGS % of revenue", note: "Target: under 35%", pct: 35, color: "#16a34a", value: "35% \u2713" },
              { label: "Ad spend % of revenue", note: "Target: under 20%", pct: 100, color: "#d97706", value: "22.3% \u2191" },
              { label: "Return rate", note: "Target: under 5%", pct: 72, color: "#d97706", value: "5.6% \u2191" },
              { label: "Repeat purchase rate", note: "Target: over 30%", pct: 78, color: "#16a34a", value: "38% \u2713" },
              { label: "Email/SMS revenue share", note: "Owned channel", pct: 39, color: "#2563eb", value: "19.6%" },
            ].map((g, i) => (
              <div key={i} style={{ marginBottom: i < 4 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a" }}>{g.label}</span>
                  <span style={{ ...mono, fontSize: 12, fontWeight: 600, color: g.color }}>{g.value}</span>
                </div>
                <p style={{ fontSize: 10, color: "#6b7280", margin: "2px 0 4px" }}>{g.note}</p>
                <div style={barTrack}><div style={barFill(g.pct, g.color)} /></div>
              </div>
            ))}
          </div>

          {/* ── Weekly Profit Trend ── */}
          <div style={card}>
            <p style={sectionTitle}>Weekly Profit Trend</p>
            <p style={sectionSub}>Daily true profit this week</p>
            {[
              { day: "Mon", value: "$1,840", pct: 71, color: "#2563eb" },
              { day: "Tue", value: "$680", pct: 26, color: "#dc2626" },
              { day: "Wed", value: "$2,140", pct: 83, color: "#2563eb" },
              { day: "Thu", value: "$1,920", pct: 74, color: "#2563eb" },
              { day: "Fri", value: "$2,588", pct: 100, color: "#16a34a" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", width: 28 }}>{d.day}</span>
                <div style={{ ...barTrack, flex: 1 }}><div style={barFill(d.pct, d.color)} /></div>
                <span style={{ ...mono, fontSize: 12, fontWeight: 600, color: d.color, width: 56, textAlign: "right" }}>{d.value}</span>
              </div>
            ))}

            <div style={{ borderTop: "1px solid #E8E3DC", marginTop: 16, paddingTop: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>Consistency Score</p>
              {[
                { label: "Best day", note: "Friday \u00B7 $2,588 profit", value: "", color: "#16a34a" },
                { label: "Worst day", note: "Tuesday \u00B7 Meta overspent", value: "$680", color: "#dc2626" },
                { label: "Variance", note: "Inconsistency driven by ad spend", value: "$1,908", color: "#d97706" },
                { label: "Weekly on track for", note: "If today holds", value: "$9,168", color: "#16a34a" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i < 3 ? 10 : 0 }}>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a" }}>{s.label}</span>
                    <p style={{ fontSize: 10, color: "#6b7280", margin: "1px 0 0" }}>{s.note}</p>
                  </div>
                  {s.value && <span style={{ ...mono, fontSize: 13, fontWeight: 600, color: s.color }}>{s.value}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ ROW 4: CREATIVE ANALYTICS + AD LEADERBOARD ═══════════════ */}
        <div className="ecom-two" style={{ marginBottom: 24, animation: "fadeUp 0.5s ease-out 0.55s both" }}>

          {/* ── Creative Analytics ── */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <p style={{ ...sectionTitle, margin: 0 }}>Creative Analytics</p>
              <span style={{ ...pill, color: "#14532d", background: "#dcfce7" }}>Premium</span>
            </div>
            <p style={sectionSub}>Which creatives are actually driving profit</p>
            {[
              { name: "UGC Testimonial — Glow Serum", type: "Video", spend: "$420", roas: "4.8x", roasColor: "#16a34a", ctr: "3.2%", ctrColor: "#16a34a", conv: "6.1%", tag: "Scale", tagBg: "#dcfce7", tagColor: "#14532d", thumb: "🎬" },
              { name: "Before/After Carousel", type: "Image", spend: "$310", roas: "3.6x", roasColor: "#16a34a", ctr: "2.8%", ctrColor: "#16a34a", conv: "4.9%", tag: "Scale", tagBg: "#dcfce7", tagColor: "#14532d", thumb: "🖼" },
              { name: "Summer Skin Static Ad", type: "Image", spend: "$340", roas: "1.2x", roasColor: "#dc2626", ctr: "0.9%", ctrColor: "#dc2626", conv: "1.4%", tag: "Pause", tagBg: "#fee2e2", tagColor: "#991b1b", thumb: "🖼" },
              { name: "Bundle Deal — Story Format", type: "Video", spend: "$180", roas: "2.9x", roasColor: "#d97706", ctr: "2.1%", ctrColor: "#d97706", conv: "3.2%", tag: "Watch", tagBg: "#fef3c7", tagColor: "#92400e", thumb: "🎬" },
              { name: "Influencer Repost — @skinbykel", type: "Video", spend: "$210", roas: "5.2x", roasColor: "#16a34a", ctr: "4.1%", ctrColor: "#16a34a", conv: "7.3%", tag: "Scale", tagBg: "#dcfce7", tagColor: "#14532d", thumb: "🎬" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {c.thumb}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</p>
                  <div style={{ display: "flex", gap: 12, marginTop: 3 }}>
                    <span style={{ fontSize: 10, color: "#6b7280" }}>{c.type}</span>
                    <span style={{ ...mono, fontSize: 10, color: "#6b7280" }}>{c.spend}</span>
                    <span style={{ ...mono, fontSize: 10, fontWeight: 600, color: c.roasColor }}>{c.roas} ROAS</span>
                    <span style={{ ...mono, fontSize: 10, color: c.ctrColor }}>{c.ctr} CTR</span>
                  </div>
                </div>
                <span style={{ ...pill, color: c.tagColor, background: c.tagBg, flexShrink: 0 }}>{c.tag}</span>
              </div>
            ))}
          </div>

          {/* ── Ad Leaderboard ── */}
          <div style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <p style={{ ...sectionTitle, margin: 0 }}>Ad Leaderboard</p>
              <span style={{ ...pill, color: "#14532d", background: "#dcfce7" }}>Premium</span>
            </div>
            <p style={sectionSub}>Head-to-head creative performance — ranked by profit per dollar spent</p>
            {[
              { rank: 1, name: "Influencer Repost — @skinbykel", roas: "5.2x", profitPerDollar: "$4.20", conv: "7.3%", trend: "↑", trendColor: "#16a34a" },
              { rank: 2, name: "UGC Testimonial — Glow Serum", roas: "4.8x", profitPerDollar: "$3.80", conv: "6.1%", trend: "↑", trendColor: "#16a34a" },
              { rank: 3, name: "Before/After Carousel", roas: "3.6x", profitPerDollar: "$2.60", conv: "4.9%", trend: "→", trendColor: "#d97706" },
              { rank: 4, name: "Bundle Deal — Story Format", roas: "2.9x", profitPerDollar: "$1.90", conv: "3.2%", trend: "→", trendColor: "#d97706" },
              { rank: 5, name: "Summer Skin Static Ad", roas: "1.2x", profitPerDollar: "$0.20", conv: "1.4%", trend: "↓", trendColor: "#dc2626" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: i === 0 ? "#dcfce7" : i === 4 ? "#fee2e2" : "#f3f4f6",
                  color: i === 0 ? "#14532d" : i === 4 ? "#991b1b" : "#1a1a1a",
                  fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {a.rank}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}</p>
                  <div style={{ display: "flex", gap: 16, marginTop: 3 }}>
                    <span style={{ ...mono, fontSize: 11, color: "#6b7280" }}>{a.roas} ROAS</span>
                    <span style={{ ...mono, fontSize: 11, color: "#6b7280" }}>{a.conv} conv</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ ...mono, fontSize: 14, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{a.profitPerDollar}</p>
                  <p style={{ fontSize: 10, color: "#6b7280", margin: 0 }}>profit/$ spent</p>
                </div>
                <span style={{ fontSize: 14, color: a.trendColor, flexShrink: 0 }}>{a.trend}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 8, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: "#14532d", margin: 0 }}>
                Top creative earns <span style={{ ...mono, fontWeight: 700 }}>21x</span> more profit per dollar than your worst. Shift budget from #5 to #1.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════ ROW 5: AI TAGS & TASKS ═══════════════ */}
        <div style={{ ...card, marginBottom: 24, animation: "fadeUp 0.5s ease-out 0.6s both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <p style={{ ...sectionTitle, margin: 0 }}>AI Tags &amp; Tasks</p>
            <span style={{ ...pill, color: "#14532d", background: "#dcfce7" }}>Premium</span>
          </div>
          <p style={sectionSub}>Auto-generated actions based on your data — no manual analysis needed</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { priority: "Critical", priBg: "#fee2e2", priColor: "#991b1b", icon: "🔴", task: "Pause 'Summer Skin Static Ad' immediately", reason: "1.2x ROAS after $340 spend — losing $0.80 per dollar. Reallocate budget to UGC Testimonial (4.8x ROAS).", time: "Auto-detected 14 min ago" },
              { priority: "High", priBg: "#fef3c7", priColor: "#92400e", icon: "🟡", task: "Investigate Night Cream return spike", reason: "6 returns today (5.6% rate) vs 2.1% average. Check recent batch quality or listing accuracy.", time: "Auto-detected 3 hrs ago" },
              { priority: "Opportunity", priBg: "#dcfce7", priColor: "#14532d", icon: "🟢", task: "Scale @skinbykel influencer repost", reason: "5.2x ROAS and 7.3% conversion — best performing creative this month. Currently only $210/day budget.", time: "Auto-detected 41 min ago" },
              { priority: "Insight", priBg: "#dbeafe", priColor: "#1e40af", icon: "🔵", task: "Repeat customers order 38% more than new", reason: "Average repeat order: $89 vs $64 for new. Email/SMS driving 74% of repeat purchases — increase send frequency.", time: "Weekly insight" },
              { priority: "Opportunity", priBg: "#dcfce7", priColor: "#14532d", icon: "🟢", task: "Google Brand Search hit daily record", reason: "$2,268 revenue on $540 spend (4.2x ROAS). Consider increasing daily budget cap by 20%.", time: "Auto-detected 41 min ago" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <span style={{ ...pill, color: t.priColor, background: t.priBg, fontSize: 10, padding: "3px 8px" }}>{t.priority}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 4px" }}>{t.task}</p>
                  <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 4px", lineHeight: 1.5 }}>{t.reason}</p>
                  <p style={{ ...mono, fontSize: 10, color: "#9ca3af", margin: 0 }}>{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════ WATERMARK ═══════════════ */}
        <div style={{ textAlign: "center", padding: "24px 0 64px", animation: "fadeUp 0.5s ease-out 0.6s both" }}>
          <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
            Built by{" "}
            <a
              href="/discovery-call"
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                color: "#16a34a",
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
          background: "#16a34a",
          textDecoration: "none",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        }}
      >
        I want this for my business
      </a>
    </div>
  );
}
