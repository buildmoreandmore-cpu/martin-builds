"use client";

/* ── palette tokens ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const border = "#E8E3DC";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const purple = "#7c3aed";
const muted = "#78716c";
const textDark = "#1a1a1a";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

/* ── static demo data ── */

const JOBS = [
  { name: "No-heat emergency — Martinez", status: "urgent" as const, loc: "78704 Austin", time: "Called 9:14am", price: "Est. $280–$680", detail: "Furnace down", crew: "" },
  { name: "No-heat emergency — Okafor", status: "urgent" as const, loc: "Round Rock", time: "Called 9:31am", price: "Est. $180–$420", detail: "Thermostat / igniter", crew: "" },
  { name: "AC tune-up + filter — Hartwell", status: "onsite" as const, loc: "Cedar Park", time: "10:00 AM", price: "$189 agreement", detail: "", crew: "Tech: Rivera" },
  { name: "New AC install — Chen residence", status: "enroute" as const, loc: "Westlake", time: "11:00 AM", price: "$4,800 install", detail: "", crew: "Williams + helper" },
  { name: "Duct repair — Flores office", status: "enroute" as const, loc: "North Austin", time: "12:30 PM", price: "$640", detail: "", crew: "Tech: Patel" },
  { name: "Spring tune-up — Nguyen", status: "complete" as const, loc: "Kyle, TX", time: "7:30 AM", price: "$189", detail: "", crew: "Rivera · 5-star left" },
  { name: "Refrigerant recharge — Park", status: "complete" as const, loc: "Leander", time: "8:15 AM", price: "$320", detail: "", crew: "Patel · Upsold filter $48" },
];

const TECHS = [
  { initials: "JR", name: "Rivera, J.", detail: "Cedar Park tune-up · On site", load: 100, jobs: 5, color: blue, bg: "#dbeafe", fg: "#1e40af" },
  { initials: "TW", name: "Williams, T.", detail: "Westlake install · En route", load: 75, jobs: 3, color: green, bg: "#d1fae5", fg: "#065f46" },
  { initials: "AP", name: "Patel, A.", detail: "North Austin duct · En route", load: 75, jobs: 3, color: green, bg: "#ede9fe", fg: "#5b21b6" },
  { initials: "MG", name: "Garcia, M.", detail: "Available 11am — ideal for emergencies", load: 50, jobs: 2, color: amber, bg: "#f3f4f6", fg: "#374151" },
  { initials: "DK", name: "Kim, D.", detail: "Available now — assign to emergencies", load: 25, jobs: 1, color: amber, bg: "#fee2e2", fg: "#991b1b" },
];

const REV_BY_TYPE = [
  { type: "New installs", amount: 4800, color: blue, pct: 85 },
  { type: "Repairs", amount: 2740, color: green, pct: 48 },
  { type: "Tune-ups", amount: 1512, color: purple, pct: 38 },
  { type: "Duct work", amount: 640, color: amber, pct: 14 },
  { type: "Add-ons", amount: 148, color: muted, pct: 5 },
];

const MAINT_ROWS = [
  { label: "Monthly recurring", sub: "142 × $60/mo avg", value: "$8,520", color: green },
  { label: "Spring tune-ups due", sub: "47 not yet scheduled", value: "47 pending", color: amber },
  { label: "Renewals due (30d)", sub: "18 expiring in April", value: "18 at risk", color: amber },
  { label: "New agreements MTD", sub: "", value: "+6 this month", color: green },
  { label: "Churn rate (90d)", sub: "", value: "3.1%", color: green },
];

const QUOTES = [
  { name: "Whitmore — full system replace", sub: "Quoted Apr 1 · 2-ton Trane", value: "$6,800", color: blue },
  { name: "Lakeview Office — 3-zone mini", sub: "Quoted Mar 28 · follow-up needed", value: "$4,200", color: amber },
  { name: "Delacroix — heat pump upgrade", sub: "Quoted Apr 3 · deciding this week", value: "$2,400", color: textDark },
  { name: "Burke — ductless install", sub: "Quoted Mar 25 · gone quiet", value: "$800", color: red },
];

const ACTIVITY = [
  { text: "Emergency — Okafor no-heat, Round Rock, unassigned", time: "9 min ago", dotColor: red },
  { text: "Emergency — Martinez no-heat, 78704, unassigned", time: "26 min ago", dotColor: red },
  { text: "5-star review left — Nguyen spring tune-up", time: "44 min ago", dotColor: green },
  { text: "Chen install confirmed — Williams dispatched", time: "1 hr ago", dotColor: blue },
  { text: "Lakeview Office quote — no response in 7 days", time: "Auto-flagged · Today", dotColor: amber },
];

const SEASON = [
  { month: "Jan", val: "$18k", pct: 35, tint: "cold" as const },
  { month: "Feb", val: "$21k", pct: 42, tint: "cold" as const },
  { month: "Mar", val: "$29k", pct: 58, tint: "cold" as const },
  { month: "Apr", val: "$38k", pct: 76, tint: "now" as const, label: "Apr \u2190" },
  { month: "May", val: "$62k", pct: 100, tint: "warm" as const },
  { month: "Jun", val: "$84k", pct: 100, tint: "hot" as const },
  { month: "Jul", val: "$91k", pct: 100, tint: "hot" as const },
  { month: "Aug", val: "$88k", pct: 100, tint: "hot" as const },
  { month: "Sep", val: "$54k", pct: 88, tint: "warm" as const },
  { month: "Oct", val: "$31k", pct: 62, tint: "cold" as const },
  { month: "Nov", val: "$24k", pct: 48, tint: "cold" as const },
  { month: "Dec", val: "$19k", pct: 38, tint: "cold" as const },
];

const PROFIT_ROWS = [
  { customer: "Nguyen, L.", type: "Tune-up", typeCls: "maint", invoice: "$189", parts: "$12", labor: "$65", margin: "59%" },
  { customer: "Park, S.", type: "Refrigerant", typeCls: "repair", invoice: "$368", parts: "$94", labor: "$65", margin: "57%" },
  { customer: "Torres, R.", type: "Capacitor", typeCls: "repair", invoice: "$280", parts: "$38", labor: "$65", margin: "63%" },
  { customer: "Bell, A.", type: "Tune-up", typeCls: "maint", invoice: "$189", parts: "$12", labor: "$65", margin: "59%" },
  { customer: "Chen, W.", type: "Install 2-ton", typeCls: "install", invoice: "$4,800", parts: "$1,840", labor: "$320", margin: "55%" },
];

const WEEKLY_REV = [
  { label: "Week 1", amount: "$8,240", pct: 72, color: "#93c5fd" },
  { label: "Week 2", amount: "$9,310", pct: 81, color: "#93c5fd" },
  { label: "Week 3", amount: "$8,740", pct: 76, color: "#93c5fd" },
  { label: "This week", amount: "$9,840", pct: 86, color: green },
];

const INVENTORY = [
  { name: "Capacitors — 45/5 MFD", sub: "Pre-season high demand", value: "3 left", color: red },
  { name: "R-410A refrigerant", sub: "Peak season coming", value: "6 cans", color: amber },
  { name: "16x20 air filters", sub: "", value: "48 in stock", color: green },
  { name: "Contactor relays", sub: "", value: "22 in stock", color: green },
  { name: "Blower motors — universal", sub: "", value: "9 in stock", color: green },
];

/* ── helpers ── */

function jobStyle(s: "urgent" | "onsite" | "enroute" | "complete") {
  switch (s) {
    case "urgent": return { cardBg: "#fef2f2", cardBorder: "#fecaca", nameCls: red, tagBg: "#fee2e2", tagColor: "#991b1b", tagLabel: "Unassigned" };
    case "onsite": return { cardBg: "#eff6ff", cardBorder: "#bfdbfe", nameCls: blue, tagBg: "#fef3c7", tagColor: "#92400e", tagLabel: "On site" };
    case "enroute": return { cardBg: "#eff6ff", cardBorder: "#bfdbfe", nameCls: blue, tagBg: "#dbeafe", tagColor: "#1e40af", tagLabel: "En route" };
    case "complete": return { cardBg: "#f0fdf4", cardBorder: "#bbf7d0", nameCls: green, tagBg: "#dcfce7", tagColor: "#166534", tagLabel: "Complete" };
  }
}

function typeTagStyle(t: string) {
  switch (t) {
    case "maint": return { bg: "#ede9fe", color: "#5b21b6" };
    case "repair": return { bg: "#dbeafe", color: "#1e40af" };
    case "install": return { bg: "#dcfce7", color: "#14532d" };
    default: return { bg: "#f3f4f6", color: "#374151" };
  }
}

function seasonTint(t: string) {
  switch (t) {
    case "cold": return { cardBg: "#eff6ff", borderC: "#bfdbfe", barColor: "#3b82f6", valColor: "#1e40af" };
    case "now": return { cardBg: "#f0fdf4", borderC: "#bbf7d0", barColor: "#22c55e", valColor: "#14532d" };
    case "warm": return { cardBg: "#fffbeb", borderC: "#fde68a", barColor: "#f59e0b", valColor: "#92400e" };
    case "hot": return { cardBg: "#fef2f2", borderC: "#fecaca", barColor: "#ef4444", valColor: "#991b1b" };
    default: return { cardBg: card, borderC: border, barColor: muted, valColor: muted };
  }
}

/* ── page ── */

export default function HvacDashboard() {
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
        .hvac-g5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .hvac-g12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: 6px; }
        .hvac-row3 { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 20px; }
        .hvac-row2 { display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; }
        @media (max-width: 1024px) {
          .hvac-g5 { grid-template-columns: repeat(3, 1fr) !important; }
          .hvac-g12 { grid-template-columns: repeat(6, 1fr) !important; }
          .hvac-row3 { grid-template-columns: 1fr !important; }
          .hvac-row2 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .hvac-g5 { grid-template-columns: 1fr !important; }
          .hvac-g12 { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <header style={{ background: card, borderBottom: `1px solid ${border}`, animation: "fadeInUp 0.5s ease-out forwards" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: fontMono, letterSpacing: -1 }}>HC</span>
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: textDark, margin: 0, lineHeight: 1.3 }}>
                HVAC Command Center
              </h1>
              <p style={{ fontSize: 13, color: muted, margin: 0 }}>Friday, April 4 &middot; Pre-season AC rush &middot; 8 techs dispatched &middot; 6am–8pm</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fee2e2", color: "#b91c1c", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: red, display: "inline-block" }} />
              2 no-heat calls
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fef3c7", color: "#92400e", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: amber, display: "inline-block" }} />
              AC season in 3 weeks
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#dcfce7", color: "#166534", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: green, display: "inline-block" }} />
              14 jobs today
            </span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px 48px" }}>

        {/* ── Demo context banner ── */}
        <div style={{ margin: "20px 0", padding: "24px 28px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, animation: "fadeInUp 0.4s ease-out forwards" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for an HVAC company.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>Dispatch, technicians, seasonal revenue, maintenance agreements — all in one place. The final product is designed around how your business actually runs. This is a starting point to show what&apos;s possible.</p>
        </div>

        {/* ── Alert banners ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "20px 0", animation: "fadeInUp 0.5s ease-out forwards" }}>
          <div style={{ padding: "14px 20px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span style={{ fontSize: 18 }}>&#128293;</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#b91c1c" }}>2 emergency no-heat calls open</p>
                <p style={{ margin: 0, fontSize: 13, color: "#991b1b" }}>Martinez (78704) and Okafor (Round Rock). Both called in last 30 min. No tech assigned yet.</p>
              </div>
            </div>
            <button style={{ background: "#dc2626", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              Dispatch now &#8599;
            </button>
          </div>
          <div style={{ padding: "14px 20px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
              <span style={{ fontSize: 18 }}>&#10052;&#65039;</span>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#92400e" }}>AC pre-season rush starts in ~3 weeks</p>
                <p style={{ margin: 0, fontSize: 13, color: "#78350f" }}>47 maintenance agreement customers haven&apos;t scheduled their spring tune-up. Last year you were booked out 11 days by May 1.</p>
              </div>
            </div>
            <button style={{ background: "#d97706", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              Send reminder &#8599;
            </button>
          </div>
        </div>

        {/* ── KPI row ── */}
        <div className="hvac-g5" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.08s both" }}>
          {[
            { value: "$9,840", label: "Revenue today", sub: "+28% vs last Friday", accent: green, tintBg: "#f0fdf4", tintBorder: "#bbf7d0" },
            { value: "14", label: "Jobs today", sub: "8 complete · 4 active · 2 urgent", accent: blue, tintBg: card, tintBorder: border },
            { value: "142", label: "Maintenance agreements", sub: "$8,520/mo recurring", accent: green, tintBg: "#f0fdf4", tintBorder: "#bbf7d0" },
            { value: "$14,200", label: "Quoted — not booked", sub: "6 quotes pending decision", accent: amber, tintBg: "#fffbeb", tintBorder: "#fde68a" },
            { value: "4.8", label: "Google rating", sub: "312 reviews · 3 new today", accent: green, tintBg: card, tintBorder: border, star: true },
          ].map((kpi, i) => (
            <div key={i} style={{ background: kpi.tintBg, border: `1px solid ${kpi.tintBorder}`, borderRadius: 12, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ margin: 0, fontSize: 13, color: muted, fontFamily: fontMono, fontWeight: 500 }}>{kpi.label}</p>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: textDark, fontFamily: fontMono, lineHeight: 1.1 }}>
                {kpi.star && <span style={{ color: amber, marginRight: 4 }}>&#9733;</span>}
                {kpi.value}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: kpi.accent, fontWeight: 600 }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Seasonal strip ── */}
        <div style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.12s both" }}>
          <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, color: muted, fontFamily: fontMono }}>Seasonal revenue pattern — plan your capacity now</p>
          <div className="hvac-g12">
            {SEASON.map((s) => {
              const t = seasonTint(s.tint);
              return (
                <div key={s.month} style={{ background: t.cardBg, border: `1px solid ${t.borderC}`, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 9, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{s.label || s.month}</p>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, fontFamily: fontMono, color: t.valColor }}>{s.val}</p>
                  <div style={{ width: "100%", height: 3, borderRadius: 99, background: "#f3f4f6", marginTop: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: t.barColor, borderRadius: 99 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Main 3-column row ── */}
        <div className="hvac-row3" style={{ marginBottom: 20, animation: "fadeInUp 0.5s ease-out 0.2s both" }}>

          {/* Dispatch board */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Today&apos;s Dispatch Board</h2>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: "#fee2e2", color: "#991b1b" }}>2 urgent · 4 active</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {JOBS.map((job, i) => {
                const st = jobStyle(job.status);
                return (
                  <div key={i} style={{ padding: "12px 14px", border: `1px solid ${st.cardBorder}`, borderRadius: 10, background: st.cardBg }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 13, color: st.nameCls }}>
                        {job.status === "urgent" ? "\u26A0 " : job.status === "complete" ? "\u2713 " : ""}{job.name}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, background: st.tagBg, color: st.tagColor, whiteSpace: "nowrap" }}>{st.tagLabel}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: muted, flexWrap: "wrap" }}>
                      <span>{job.loc}</span>
                      <span style={{ fontFamily: fontMono }}>{job.time}</span>
                      <span style={{ fontWeight: 600, color: green }}>{job.price}</span>
                      {job.detail && <span>{job.detail}</span>}
                      {job.crew && <span style={{ color: blue }}>{job.crew}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Techs + Revenue by type */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Technician status */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Technician Status</h2>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 9999, background: "#f3f4f6", color: "#6b7280", border: `1px solid ${border}` }}>8 out today</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {TECHS.map((t) => (
                  <div key={t.initials} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${bg}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 9999, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: t.fg }}>{t.initials}</span>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{t.name}</p>
                        <p style={{ margin: 0, fontSize: 11, color: muted }}>{t.detail}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 50, height: 4, borderRadius: 99, background: "#f3f4f6", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${t.load}%`, background: t.color, borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 11, color: muted, whiteSpace: "nowrap" }}>{t.jobs} jobs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue by job type */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Revenue by Job Type</h2>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 9999, background: "#f3f4f6", color: "#6b7280", border: `1px solid ${border}` }}>Today</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {REV_BY_TYPE.map((r) => (
                  <div key={r.type} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: muted, width: 84, flexShrink: 0 }}>{r.type}</span>
                    <div style={{ flex: 1, height: 6, borderRadius: 99, background: "#f0ece6", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${r.pct}%`, background: r.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, fontFamily: fontMono, color: r.color, width: 52, textAlign: "right", flexShrink: 0 }}>${r.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Maint agreements + Quotes + Activity */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Maintenance agreements */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Maintenance Agreements</h2>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" }}>142 active</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {MAINT_ROWS.map((r) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${bg}` }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>{r.label}</p>
                      {r.sub && <p style={{ margin: "2px 0 0", fontSize: 11, color: muted }}>{r.sub}</p>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: fontMono, color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open quotes */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Open Quotes</h2>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}>$14,200 pending</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {QUOTES.map((q) => (
                  <div key={q.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${bg}` }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>{q.name}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: muted }}>{q.sub}</p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: fontMono, color: q.color }}>{q.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Activity</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
        <div className="hvac-row2" style={{ animation: "fadeInUp 0.5s ease-out 0.28s both" }}>

          {/* Profitability table */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Job Profitability — Today&apos;s Completed</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${border}` }}>
                    {["Customer", "Job type", "Invoice", "Parts", "Labor", "Margin"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: muted, fontSize: 11, fontFamily: fontMono }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROFIT_ROWS.map((p) => {
                    const tt = typeTagStyle(p.typeCls);
                    return (
                      <tr key={p.customer} style={{ borderBottom: `1px solid ${bg}` }}>
                        <td style={{ padding: "10px 10px", fontWeight: 500 }}>{p.customer}</td>
                        <td style={{ padding: "10px 10px" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, background: tt.bg, color: tt.color }}>{p.type}</span>
                        </td>
                        <td style={{ padding: "10px 10px", fontFamily: fontMono }}>{p.invoice}</td>
                        <td style={{ padding: "10px 10px", fontFamily: fontMono, color: muted }}>{p.parts}</td>
                        <td style={{ padding: "10px 10px", fontFamily: fontMono, color: muted }}>{p.labor}</td>
                        <td style={{ padding: "10px 10px", fontFamily: fontMono, fontWeight: 700, color: green }}>{p.margin}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right stack: MTD revenue + Inventory */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* MTD revenue vs target */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>MTD Revenue vs Target</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {WEEKLY_REV.map((w) => (
                  <div key={w.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: muted, width: 70, flexShrink: 0 }}>{w.label}</span>
                    <div style={{ flex: 1, height: 6, borderRadius: 99, background: "#f0ece6", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${w.pct}%`, background: w.color, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, fontFamily: fontMono, color: w.color === green ? green : blue, width: 52, textAlign: "right", flexShrink: 0 }}>{w.amount}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${border}`, marginTop: 14, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "MTD total", value: "$36,130", color: green },
                  { label: "Monthly target", value: "$38,000", color: textDark },
                  { label: "Gap to target", value: "$1,870", color: amber },
                ].map((r) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{r.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: fontMono, color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parts & inventory */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Parts &amp; Inventory</h2>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" }}>2 low stock</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {INVENTORY.map((inv) => (
                  <div key={inv.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${bg}` }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 500 }}>{inv.name}</p>
                      {inv.sub && <p style={{ margin: "2px 0 0", fontSize: 11, color: muted }}>{inv.sub}</p>}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: fontMono, color: inv.color }}>{inv.value}</span>
                  </div>
                ))}
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
