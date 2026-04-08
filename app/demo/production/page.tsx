"use client";

import { useState } from "react";
import Link from "next/link";

/* ── design tokens ── */
const sidebar = "#111113";
const sidebarHover = "#1c1c1f";
const sidebarActive = "#232326";
const bg = "#FAFAF8";
const card = "#ffffff";
const border = "#EDEAE5";
const green = "#22c55e";
const amber = "#f59e0b";
const red = "#ef4444";
const blue = "#3b82f6";
const purple = "#8b5cf6";
const muted = "#94928d";
const textDark = "#1a1a1a";
const textSecondary = "#6b6966";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";
const accent = "#c8ff00";

/* ── data ── */

const PROJECTS = [
  { name: "Meridian Bank Brand Spot", type: "Commercial · 30s", status: "Post-production" as const, deliver: "May 3", contract: 9800, spent: 5100, margin: 48, progress: 75 },
  { name: "Vella Foods Launch Campaign", type: "Branded Content · 4 deliverables", status: "In production" as const, deliver: "May 28", contract: 14200, spent: 9200, margin: 35, progress: 40 },
  { name: "Horizon Brands Social Pack", type: "Social · 6 videos", status: "Delivered" as const, deliver: "Mar 18", contract: 4200, spent: 1200, margin: 71, progress: 100 },
];

const PIPELINE = [
  { client: "SolarPath Energy", project: "TV Commercial 60s", value: 12000, probability: 80 },
  { client: "Eastfield Foundation", project: "Documentary 10min", value: 18000, probability: 65 },
  { client: "Luma Skincare", project: "Social content 8 videos", value: 7400, probability: 50 },
];

const CREW = [
  { initials: "JM", name: "J. Morales", role: "DP", status: "On set" as const, project: "Vella Foods" },
  { initials: "SK", name: "S. Kim", role: "Editor", status: "Editing" as const, project: "Meridian Bank" },
  { initials: "RL", name: "R. Lowe", role: "Sound", status: "Booked" as const, project: "Vella Foods" },
  { initials: "DT", name: "D. Torres", role: "Gaffer", status: "Available" as const, project: "—" },
];

const MONTHS = [
  { month: "Apr", revenue: 18400, booked: true },
  { month: "May", revenue: 12600, booked: true },
  { month: "Jun", revenue: 0, booked: false },
  { month: "Jul", revenue: 8000, booked: false },
  { month: "Aug", revenue: 14000, booked: false },
  { month: "Sep", revenue: 0, booked: false },
];

const ACTIVITY = [
  { text: "SolarPath proposal opened — 3rd view this week", time: "2h ago", type: "positive" as const },
  { text: "Meridian edit reviewed — 2 revision notes", time: "Yesterday", type: "neutral" as const },
  { text: "Vella Foods shoot day 1 complete", time: "Apr 3", type: "positive" as const },
  { text: "Horizon Brands — invoice still unpaid, 18 days", time: "Apr 1", type: "negative" as const },
];

/* ── helpers ── */
const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const maxRevenue = Math.max(...MONTHS.map(m => m.revenue), 1);

function statusColor(s: string) {
  switch (s) {
    case "In production": return { bg: "#eff6ff", text: "#1d4ed8" };
    case "Post-production": return { bg: "#f5f3ff", text: "#6d28d9" };
    case "Delivered": return { bg: "#f0fdf4", text: "#15803d" };
    case "On set": return { bg: "#eff6ff", text: "#1d4ed8" };
    case "Editing": return { bg: "#f5f3ff", text: "#6d28d9" };
    case "Booked": return { bg: "#fefce8", text: "#a16207" };
    case "Available": return { bg: "#f0fdf4", text: "#15803d" };
    default: return { bg: "#f5f5f4", text: "#57534e" };
  }
}

/* ── nav items ── */
const navItems = [
  { label: "Overview", scrollTo: "overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Projects", scrollTo: "projects", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { label: "Crew", scrollTo: "crew", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { label: "Pipeline", scrollTo: "pipeline", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { label: "Invoices", scrollTo: "invoices", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" },
];

/* ── page ── */

export default function ProductionDashboard() {
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: fontBody, color: textDark }}>
      <style>{`
        html body { background: ${bg} !important; color: ${textDark} !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2, h3 { font-size: unset !important; letter-spacing: unset !important; }
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .prod-fade { animation: fadeIn 0.5s ease-out both; }
        .prod-fade-1 { animation-delay: 0.05s; }
        .prod-fade-2 { animation-delay: 0.1s; }
        .prod-fade-3 { animation-delay: 0.15s; }
        .prod-fade-4 { animation-delay: 0.2s; }
        .prod-main-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 24px; }
        .prod-kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .prod-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 1100px) {
          .prod-sidebar { display: none !important; }
          .prod-main-grid { grid-template-columns: 1fr !important; }
          .prod-bottom-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .prod-kpi-row { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .prod-kpi-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Sidebar ── */}
      <aside
        className="prod-sidebar"
        style={{
          width: 220,
          background: sidebar,
          display: "flex",
          flexDirection: "column",
          padding: "28px 0",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 40,
        }}
      >
        {/* Brand */}
        <div style={{ padding: "0 24px", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#111", fontFamily: fontMono }}>P</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Production Co.</p>
              <p style={{ margin: 0, fontSize: 11, color: "#666" }}>Command Center</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
          {navItems.map(item => {
            const isActive = activeNav === item.scrollTo;
            return (
              <div
                key={item.label}
                onClick={() => {
                  setActiveNav(item.scrollTo);
                  document.getElementById(item.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: isActive ? sidebarActive : "transparent",
                  transition: "background 0.15s",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#fff" : "#666"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
                <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#888" }}>{item.label}</span>
              </div>
            );
          })}
        </nav>

      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, marginLeft: 220, background: bg, minHeight: "100vh" }}>
        {/* Top bar */}
        <header style={{ padding: "20px 36px", borderBottom: `1px solid ${border}`, background: card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: textDark }}>Overview</h1>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: muted }}>April 2025</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {MONTHS[2].revenue === 0 && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#dc2626", background: "#fef2f2", padding: "6px 14px", borderRadius: 8, border: "1px solid #fecaca" }}>
                <span style={{ width: 6, height: 6, borderRadius: 9999, background: red, display: "inline-block" }} />
                June is empty
              </span>
            )}
          </div>
        </header>

        <div style={{ padding: "28px 36px 48px" }}>

          {/* ── Demo context ── */}
          <div className="prod-fade" style={{ padding: "20px 24px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, marginBottom: 28 }}>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#166534" }}>
              This is a dashboard concept for a video production company. The final product is designed around how your business actually runs — this is a starting point.
            </p>
          </div>

          {/* ── KPIs ── */}
          <div id="overview" className="prod-kpi-row prod-fade prod-fade-1" style={{ marginBottom: 28 }}>
            {[
              { label: "Revenue YTD", value: "$68,400", detail: "+31% vs last year", color: green },
              { label: "Active Value", value: "$24,800", detail: "3 projects", color: blue },
              { label: "Pipeline", value: "$37,400", detail: "3 proposals out", color: amber },
              { label: "Avg Margin", value: "62%", detail: "After all costs", color: green },
            ].map((kpi, i) => (
              <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
                <p style={{ margin: 0, fontSize: 12, color: muted, fontWeight: 500, marginBottom: 8 }}>{kpi.label}</p>
                <p style={{ margin: 0, fontSize: 28, fontWeight: 700, fontFamily: fontMono, lineHeight: 1, marginBottom: 6, letterSpacing: "-1px" }}>{kpi.value}</p>
                <p style={{ margin: 0, fontSize: 12, color: kpi.color, fontWeight: 500 }}>{kpi.detail}</p>
              </div>
            ))}
          </div>

          {/* ── Main grid: Projects + Pipeline/Crew ── */}
          <div className="prod-main-grid prod-fade prod-fade-2" style={{ marginBottom: 28 }}>

            {/* Projects */}
            <div id="projects" style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "24px 28px", scrollMarginTop: 20 }}>
              <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: textDark }}>Active Projects</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {PROJECTS.map(p => {
                  const sc = statusColor(p.status);
                  return (
                    <div key={p.name} style={{ padding: "20px", background: bg, borderRadius: 10, border: `1px solid ${border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</p>
                          <p style={{ margin: "3px 0 0", fontSize: 12, color: muted }}>{p.type}</p>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: sc.bg, color: sc.text, whiteSpace: "nowrap" }}>{p.status}</span>
                      </div>

                      {/* Progress */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ height: 4, borderRadius: 2, background: "#e7e5e4", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${p.progress}%`, background: p.progress === 100 ? green : blue, borderRadius: 2, transition: "width 0.6s ease" }} />
                        </div>
                      </div>

                      {/* Stats row */}
                      <div style={{ display: "flex", gap: 24, fontSize: 12, color: textSecondary }}>
                        <div>
                          <span style={{ color: muted }}>Contract </span>
                          <span style={{ fontFamily: fontMono, fontWeight: 600, color: textDark }}>{fmt(p.contract)}</span>
                        </div>
                        <div>
                          <span style={{ color: muted }}>Margin </span>
                          <span style={{ fontFamily: fontMono, fontWeight: 600, color: p.margin >= 50 ? green : amber }}>{p.margin}%</span>
                        </div>
                        <div>
                          <span style={{ color: muted }}>Deliver </span>
                          <span style={{ fontWeight: 500 }}>{p.deliver}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column: Pipeline + Crew */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Pipeline */}
              <div id="pipeline" style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "24px 28px", scrollMarginTop: 20 }}>
                <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: textDark }}>Pipeline</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {PIPELINE.map(p => (
                    <div key={p.client} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: bg, borderRadius: 8, border: `1px solid ${border}` }}>
                      <div>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{p.client}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 12, color: muted }}>{p.project}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, fontSize: 14, fontFamily: fontMono, fontWeight: 600 }}>{fmt(p.value)}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 11, fontWeight: 500, color: p.probability >= 70 ? green : p.probability >= 50 ? amber : red }}>{p.probability}% likely</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crew */}
              <div id="crew" style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "24px 28px", scrollMarginTop: 20 }}>
                <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: textDark }}>Crew</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {CREW.map(c => {
                    const sc = statusColor(c.status);
                    return (
                      <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9999, background: sidebar, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: fontMono }}>{c.initials}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{c.name} <span style={{ fontWeight: 400, color: muted }}>· {c.role}</span></p>
                          <p style={{ margin: "1px 0 0", fontSize: 12, color: muted }}>{c.project}</p>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 6, background: sc.bg, color: sc.text, flexShrink: 0 }}>{c.status}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom grid: Revenue Forecast + Activity ── */}
          <div className="prod-bottom-grid prod-fade prod-fade-3">

            {/* Revenue forecast */}
            <div id="invoices" style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "24px 28px", scrollMarginTop: 20 }}>
              <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: textDark }}>Revenue Forecast</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {MONTHS.map(m => (
                  <div key={m.month}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: textDark, minWidth: 32 }}>{m.month}</span>
                      <span style={{ fontSize: 13, fontFamily: fontMono, fontWeight: 600, color: m.revenue === 0 ? red : textDark }}>
                        {m.revenue === 0 ? "—" : fmt(m.revenue)}
                      </span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "#f0ece6", overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: m.revenue === 0 ? "0%" : `${(m.revenue / maxRevenue) * 100}%`,
                        background: m.booked ? green : m.revenue === 0 ? "transparent" : "#d4d4d4",
                        borderRadius: 3,
                        transition: "width 0.6s ease",
                      }} />
                    </div>
                    {!m.booked && m.revenue > 0 && (
                      <p style={{ margin: "3px 0 0", fontSize: 11, color: muted, fontStyle: "italic" }}>Proposed</p>
                    )}
                    {m.revenue === 0 && (
                      <p style={{ margin: "3px 0 0", fontSize: 11, color: red, fontWeight: 500 }}>Nothing booked</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "24px 28px" }}>
              <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: textDark }}>Recent Activity</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: 9999,
                      background: a.type === "positive" ? green : a.type === "negative" ? red : "#d4d4d4",
                      marginTop: 6,
                      flexShrink: 0,
                    }} />
                    <div>
                      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: textDark }}>{a.text}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: muted }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── CTA ── */}
      <Link
        href="/contact"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: accent,
          color: "#0a0a0a",
          padding: "10px 20px",
          borderRadius: 9999,
          fontWeight: 700,
          fontSize: 13,
          textDecoration: "none",
          zIndex: 50,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.2s",
          fontFamily: fontBody,
        }}
      >
        I want this for my business
      </Link>
    </div>
  );
}
