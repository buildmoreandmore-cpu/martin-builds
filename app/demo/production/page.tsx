"use client";

import type { Metadata } from "next";

/* ── palette tokens (matches other demos) ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const border = "#E8E3DC";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const purple = "#7c3aed";
const teal = "#0d9488";
const muted = "#78716c";
const textDark = "#1a1a1a";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

/* ── static demo data ── */

const ACTIVE_PROJECTS = [
  {
    name: "Meridian Bank Brand Spot (30s)",
    client: "Meridian Bank",
    status: "Post-production" as const,
    deliverDate: "May 3",
    contract: 9800,
    shootStatus: "Shoot complete",
    progress: 75,
    costs: { crew: 3200, gear: 1100, post: 800 },
    net: 4700,
    margin: 48,
    overdue: false,
  },
  {
    name: "Vella Foods Product Launch Campaign",
    client: "Vella Foods",
    status: "In production" as const,
    deliverDate: "May 28",
    contract: 14200,
    shootStatus: "3 shoot days remaining",
    progress: 40,
    costs: { crew: 5400, gear: 2200, post: 1600 },
    net: 5000,
    margin: 35,
    overdue: false,
  },
  {
    name: "Horizon Brands Social Content Pack",
    client: "Horizon Brands",
    status: "Invoice overdue" as const,
    deliverDate: "Mar 18",
    contract: 4200,
    shootStatus: "Client approved",
    progress: 100,
    costs: { crew: 800, gear: 400, post: 0 },
    net: 3000,
    margin: 71,
    overdue: true,
  },
];

const PROPOSALS = [
  { name: "Documentary 10min", client: "Eastfield Foundation", value: 18000, prob: 65, warm: false },
  { name: "TV Commercial 60s", client: "SolarPath Energy", value: 12000, prob: 80, warm: true },
  { name: "Social content 8 videos", client: "Luma Skincare", value: 7400, prob: 50, warm: false },
  { name: "Event recap full day", client: "Veritas Group", value: 3800, prob: 30, warm: false },
];

const REVENUE_TYPES = [
  { type: "Commercials", amount: 28400, color: blue },
  { type: "Branded content", amount: 19200, color: green },
  { type: "Social packs", amount: 10600, color: purple },
  { type: "Event / recap", amount: 5200, color: amber },
  { type: "Retainers", amount: 5000, color: muted },
];

const CREW = [
  { initials: "JM", name: "J. Morales", role: "DP / Camera", project: "Vella Foods — May 6", status: "Confirmed" as const },
  { initials: "SK", name: "S. Kim", role: "Editor", project: "Meridian — post now", status: "Active" as const },
  { initials: "RL", name: "R. Lowe", role: "Sound", project: "Vella Foods — May 6", status: "Confirmed" as const },
  { initials: "DT", name: "D. Torres", role: "Gaffer", project: "Nothing booked", status: "Available" as const },
];

const ACTIVITY = [
  { text: "Horizon Brands invoice — still unpaid, 18 days", time: "Today", dotColor: red },
  { text: "SolarPath proposal opened — 3rd time this week", time: "Today", dotColor: green },
  { text: "Meridian edit reviewed — 2 revision notes from client", time: "Yesterday", dotColor: purple },
  { text: "Vella Foods shoot day 1 — complete, no issues", time: "Apr 3", dotColor: blue },
  { text: "Luma Skincare — proposal viewed, no response yet", time: "Apr 2", dotColor: amber },
];

const MONTHS = [
  { month: "April", revenue: 18400, pct: 100, note: "Fully booked", tint: "green" as const },
  { month: "May", revenue: 12600, pct: 68, note: "1 project confirmed", tint: "blue" as const },
  { month: "June", revenue: 0, pct: 0, note: "Nothing booked", tint: "red" as const },
  { month: "July", revenue: 8000, pct: 43, note: "1 proposal — 70%", tint: "amber" as const },
  { month: "August", revenue: 14000, pct: 55, note: "2 proposals out", tint: "amber" as const },
  { month: "September", revenue: 0, pct: 0, note: "No pipeline yet", tint: "gray" as const },
];

const COMPLETED = [
  { name: "Apex Auto — TV spot", period: "Jan", status: "Delivered", contract: 16400, cost: 5900, profit: 10500, margin: 64, paid: true },
  { name: "Bloom Health — content", period: "Feb", status: "Delivered", contract: 8200, cost: 3800, profit: 4400, margin: 54, paid: true },
  { name: "Veritas — event recap", period: "Feb", status: "Delivered", contract: 3800, cost: 2600, profit: 1200, margin: 32, paid: true },
  { name: "Horizon Brands — social", period: "Mar", status: "Unpaid", contract: 4200, cost: 1200, profit: 3000, margin: 71, paid: false },
  { name: "Eastfield — brand film", period: "Mar", status: "Delivered", contract: 11600, cost: 4200, profit: 7400, margin: 64, paid: true },
];

const CLIENT_HEALTH = [
  { label: "Repeat clients", detail: "3 of 6 returned", value: "50%", color: green },
  { label: "Avg. project value", detail: "commercials pulling up", value: "$11,400", color: blue },
  { label: "Avg. margin per project", detail: "after all hard costs", value: "62%", color: green },
  { label: "Avg. payment time", detail: "target 14 days net", value: "22 days", color: amber },
  { label: "Proposal close rate", detail: "6 won of 9 sent YTD", value: "67%", color: green },
];

const MONTHLY_TREND = [
  { month: "January", amount: 16400, type: "actual" as const },
  { month: "February", amount: 12000, type: "actual" as const },
  { month: "March", amount: 15800, type: "actual" as const },
  { month: "April", amount: 18400, type: "live" as const },
  { month: "May", amount: 12600, type: "projected" as const },
  { month: "June", amount: 0, type: "gap" as const },
];

/* ── helpers ── */

function projectStatusStyle(s: string) {
  switch (s) {
    case "In production": return { bg: "#dbeafe", color: "#1e40af", accent: blue };
    case "Post-production": return { bg: "#ede9fe", color: "#5b21b6", accent: purple };
    case "Delivered": return { bg: "#dcfce7", color: "#166534", accent: green };
    case "Invoice overdue": return { bg: "#fee2e2", color: "#b91c1c", accent: red };
    default: return { bg: "#f5f5f4", color: "#57534e", accent: muted };
  }
}

function crewStatusStyle(s: string) {
  switch (s) {
    case "Confirmed": return { bg: "#ccfbf1", color: "#115e59" };
    case "Active": return { bg: "#dbeafe", color: "#1e40af" };
    case "Available": return { bg: "#f5f5f4", color: "#57534e" };
    default: return { bg: "#f5f5f4", color: "#57534e" };
  }
}

function monthTint(t: string) {
  switch (t) {
    case "green": return { cardBg: "#f0fdf4", barColor: green, borderC: "#bbf7d0" };
    case "blue": return { cardBg: "#eff6ff", barColor: blue, borderC: "#bfdbfe" };
    case "red": return { cardBg: "#fef2f2", barColor: red, borderC: "#fecaca" };
    case "amber": return { cardBg: "#fffbeb", barColor: amber, borderC: "#fde68a" };
    case "gray": return { cardBg: "#f5f5f4", barColor: muted, borderC: "#d6d3d1" };
    default: return { cardBg: card, barColor: muted, borderC: border };
  }
}

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const revenueMax = Math.max(...REVENUE_TYPES.map((r) => r.amount));
const trendMax = Math.max(...MONTHLY_TREND.map((m) => m.amount));

/* ── page ── */

export default function ProductionDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: bg, color: textDark, fontFamily: fontBody }}>
      <style>{`
        html body { background: #FAFAF8 !important; background-color: #FAFAF8 !important; color: #1a1a1a !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .prod-g5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .prod-g6 { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
        .prod-row3 { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 24px; }
        .prod-row2 { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
        @media (max-width: 1024px) {
          .prod-g5 { grid-template-columns: repeat(3, 1fr) !important; }
          .prod-g6 { grid-template-columns: repeat(3, 1fr) !important; }
          .prod-row3 { grid-template-columns: 1fr !important; }
          .prod-row2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .prod-g5 { grid-template-columns: 1fr !important; }
          .prod-g6 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <header style={{ background: card, borderBottom: `1px solid ${border}`, animation: "fadeInUp 0.5s ease-out forwards" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: fontMono, letterSpacing: -1 }}>PC</span>
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: textDark, margin: 0, lineHeight: 1.3 }}>
                Production Co. <span style={{ fontWeight: 400, color: muted }}>— Command Center</span>
              </h1>
              <p style={{ fontSize: 13, color: muted, margin: 0 }}>April 2025 &middot; 3 active projects &middot; $68,400 revenue this year</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#dcfce7", color: "#166534", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: green, display: "inline-block" }} />
              3 projects active
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fef3c7", color: "#92400e", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: amber, display: "inline-block" }} />
              June gap opening
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fee2e2", color: "#b91c1c", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: red, display: "inline-block" }} />
              1 invoice overdue
            </span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px 48px" }}>

        {/* ── Demo context banner ── */}
        <div style={{
          margin: "20px 0",
          padding: "24px 28px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 12,
          animation: "fadeInUp 0.4s ease-out forwards",
        }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>
            This is a dashboard concept designed for a video production company.
          </p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>
            Every project, proposal, crew booking, and dollar — tracked in one place. The final product is designed around how your business actually runs. This is just a starting point to show what&apos;s possible.
          </p>
        </div>

        {/* ── Alert banners ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "20px 0", animation: "fadeInUp 0.5s ease-out forwards" }}>
          <div style={{ padding: "14px 20px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span style={{ fontSize: 18 }}>&#9888;</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#b91c1c" }}>Horizon Brands — $4,200 invoice overdue 18 days</p>
                <p style={{ margin: 0, fontSize: 13, color: "#991b1b" }}>Final deliverable was approved. No payment response since April 1.</p>
              </div>
            </div>
            <a href="/utility" style={{ background: "#dc2626", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none" }}>
              Draft follow-up &#8599;
            </a>
          </div>
          <div style={{ padding: "14px 20px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span style={{ fontSize: 18 }}>&#9888;</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#92400e" }}>June is currently empty</p>
                <p style={{ margin: 0, fontSize: 13, color: "#78350f" }}>You have $0 booked after May 28. Based on your average project lead time of 3 weeks, you need to close something this week.</p>
              </div>
            </div>
            <a href="/utility" style={{ background: "#d97706", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", textDecoration: "none" }}>
              Reach out &#8599;
            </a>
          </div>
        </div>

        {/* ── KPI row ── */}
        <div className="prod-g5" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.08s both" }}>
          {[
            { value: "$68,400", label: "Revenue YTD", sub: "+31% vs same period last year", accent: green },
            { value: "$24,800", label: "Active project value", sub: "3 projects in flight", accent: blue },
            { value: "$41,200", label: "Pipeline (unconfirmed)", sub: "4 proposals out", accent: amber },
            { value: "$4,200", label: "Overdue invoices", sub: "Horizon Brands · 18 days", accent: red },
            { value: "62%", label: "Avg. project margin", sub: "After crew + gear + post", accent: green },
          ].map((kpi, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ margin: 0, fontSize: 13, color: muted, fontFamily: fontMono, fontWeight: 500 }}>{kpi.label}</p>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: textDark, fontFamily: fontMono, lineHeight: 1.1 }}>{kpi.value}</p>
              <p style={{ margin: 0, fontSize: 12, color: kpi.accent, fontWeight: 600 }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── 6-month revenue visibility strip ── */}
        <div style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.16s both" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: muted, fontFamily: fontMono, letterSpacing: 0.5 }}>Revenue visibility — next 6 months</p>
          <div className="prod-g6">
            {MONTHS.map((m) => {
              const t = monthTint(m.tint);
              return (
                <div key={m.month} style={{ background: t.cardBg, border: `1px solid ${t.borderC}`, borderRadius: 12, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: textDark }}>{m.month}</p>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: fontMono, color: m.revenue === 0 ? (m.tint === "red" ? red : muted) : textDark }}>
                    {m.revenue === 0 ? (m.tint === "red" ? "$0" : "TBD") : fmt(m.revenue)}
                  </p>
                  <div style={{ height: 6, borderRadius: 3, background: "#e7e5e4", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${m.pct}%`, background: t.barColor, borderRadius: 3, transition: "width 0.6s ease" }} />
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: muted, fontWeight: 500 }}>{m.note}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Main 3-column row ── */}
        <div className="prod-row3" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.24s both" }}>

          {/* Column 1: Active Projects */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Active Projects</h2>
            {ACTIVE_PROJECTS.map((p) => {
              const st = projectStatusStyle(p.status);
              const totalCost = p.costs.crew + p.costs.gear + p.costs.post;
              return (
                <div key={p.name} style={{ background: p.overdue ? "#fef8f8" : card, border: `1px solid ${border}`, borderLeft: `4px solid ${st.accent}`, borderRadius: 12, padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}>{p.name}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 13, color: muted }}>{p.client}</p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: st.bg, color: st.color, whiteSpace: "nowrap" }}>{p.status}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 13, color: muted, flexWrap: "wrap", marginBottom: 12 }}>
                    <span>Deliver {p.deliverDate}</span>
                    <span style={{ fontFamily: fontMono, fontWeight: 600, color: textDark }}>{fmt(p.contract)}</span>
                    <span>{p.shootStatus}</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: muted }}>Progress</span>
                      <span style={{ fontSize: 12, fontWeight: 600, fontFamily: fontMono, color: p.overdue ? red : textDark }}>{p.progress}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "#e7e5e4", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.progress}%`, background: p.overdue ? red : st.accent, borderRadius: 3 }} />
                    </div>
                  </div>
                  {/* Profit breakdown */}
                  <div style={{ background: bg, borderRadius: 8, padding: "12px 14px", border: `1px solid ${border}` }}>
                    <p style={{ margin: "0 0 6px", fontSize: 12, color: muted }}>Profit after crew + gear + post</p>
                    <div style={{ display: "flex", gap: 10, fontSize: 12, color: muted, flexWrap: "wrap", marginBottom: 6 }}>
                      <span>{fmt(p.costs.crew)} crew</span>
                      <span>{fmt(p.costs.gear)} gear</span>
                      {p.costs.post > 0 && <span>{fmt(p.costs.post)} post</span>}
                      <span style={{ fontFamily: fontMono, color: muted }}>= {fmt(totalCost)} total</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 16, fontWeight: 700, fontFamily: fontMono, color: p.overdue ? red : green }}>
                        {fmt(p.net)} {p.overdue && <span style={{ fontSize: 11, fontWeight: 500 }}>unpaid</span>}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, fontFamily: fontMono, color: p.overdue ? red : green }}>{p.margin}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Column 2: Proposals + Revenue by Type */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Proposals */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Proposals Out</h2>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: "#fef3c7", color: "#92400e" }}>{fmt(41200)} pending</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PROPOSALS.map((p) => {
                  const probColor = p.prob >= 80 ? green : p.prob >= 50 ? amber : red;
                  return (
                    <div key={p.client} style={{ padding: "12px 14px", background: p.warm ? "#f0fdf4" : bg, border: `1px solid ${p.warm ? "#bbf7d0" : border}`, borderRadius: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <div>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{p.client}</p>
                          <p style={{ margin: 0, fontSize: 12, color: muted }}>{p.name}</p>
                        </div>
                        <span style={{ fontFamily: fontMono, fontWeight: 700, fontSize: 14 }}>{fmt(p.value)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: probColor }}>{p.prob}% likely</span>
                        {p.warm && <span style={{ fontSize: 11, color: green, fontWeight: 500 }}>Proposal opened 3x this week</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Revenue by project type */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Revenue by Project Type</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {REVENUE_TYPES.map((r) => (
                  <div key={r.type}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{r.type}</span>
                      <span style={{ fontSize: 13, fontFamily: fontMono, fontWeight: 600 }}>{fmt(r.amount)}</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: "#f0ece6", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(r.amount / revenueMax) * 100}%`, background: r.color, borderRadius: 4, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Crew + Activity */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Crew */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Crew &amp; Freelancers</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {CREW.map((c) => {
                  const st = crewStatusStyle(c.status);
                  return (
                    <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                      <div style={{ width: 34, height: 34, borderRadius: 9999, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, fontFamily: fontMono }}>{c.initials}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{c.name} <span style={{ fontWeight: 400, color: muted, fontSize: 12 }}>— {c.role}</span></p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.project}</p>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: st.bg, color: st.color, whiteSpace: "nowrap", flexShrink: 0 }}>{c.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity feed */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Activity</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 8, height: 8, borderRadius: 9999, background: a.dotColor, marginTop: 5, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{a.text}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: muted }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="prod-row2" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.32s both" }}>

          {/* Profitability tracker */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Project Profitability Tracker</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${border}` }}>
                    {["Project", "Period", "Contract", "Cost", "Profit", "Margin"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: muted, fontSize: 12, fontFamily: fontMono }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPLETED.map((p) => (
                    <tr key={p.name} style={{ borderBottom: `1px solid ${border}` }}>
                      <td style={{ padding: "10px 10px", fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: "10px 10px", color: muted }}>
                        {p.period} &middot; <span style={{ fontWeight: 500, color: p.paid ? green : red }}>{p.status}</span>
                      </td>
                      <td style={{ padding: "10px 10px", fontFamily: fontMono }}>{fmt(p.contract)}</td>
                      <td style={{ padding: "10px 10px", fontFamily: fontMono, color: muted }}>{fmt(p.cost)}</td>
                      <td style={{ padding: "10px 10px", fontFamily: fontMono, fontWeight: 700, color: p.paid ? green : red }}>
                        {fmt(p.profit)}{!p.paid && "*"}
                      </td>
                      <td style={{ padding: "10px 10px" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: p.paid ? (p.margin >= 50 ? "#dcfce7" : "#fef3c7") : "#fee2e2", color: p.paid ? (p.margin >= 50 ? "#166534" : "#92400e") : "#b91c1c" }}>
                          {p.margin}%{!p.paid && " unpaid"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right stack: Client health + Monthly trend */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Client health */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Client Health</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {CLIENT_HEALTH.map((s) => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{s.label}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: muted }}>{s.detail}</p>
                    </div>
                    <span style={{ fontFamily: fontMono, fontWeight: 700, fontSize: 16, color: s.color }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly revenue trend */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Monthly Revenue Trend</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {MONTHLY_TREND.map((m) => {
                  const barColor = m.type === "live" ? green : m.type === "gap" ? red : m.type === "projected" ? "#a8a29e" : blue;
                  return (
                    <div key={m.month}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>
                          {m.month}
                          {m.type === "live" && <span style={{ fontSize: 11, color: green, marginLeft: 6 }}>(live)</span>}
                          {m.type === "projected" && <span style={{ fontSize: 11, color: muted, marginLeft: 6 }}>(projected)</span>}
                          {m.type === "gap" && <span style={{ fontSize: 11, color: red, marginLeft: 6 }}>(gap)</span>}
                        </span>
                        <span style={{ fontSize: 13, fontFamily: fontMono, fontWeight: 600, color: m.amount === 0 ? red : textDark }}>
                          {m.amount === 0 ? "—" : fmt(m.amount)}
                        </span>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: "#f0ece6", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: m.amount === 0 ? "2%" : `${(m.amount / trendMax) * 100}%`, background: barColor, borderRadius: 4, transition: "width 0.6s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed CTA ── */}
      <a
        href="https://martinbuilds.ai/contact"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#c8ff00",
          color: "#0a0a0a",
          padding: "10px 20px",
          borderRadius: 9999,
          fontWeight: 700,
          fontSize: 13,
          textDecoration: "none",
          zIndex: 50,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          transition: "all 0.2s",
        }}
      >
        Book a walkthrough &#8594;
      </a>
    </div>
  );
}
