"use client";

/* ── palette tokens ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const border = "#E8E3DC";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const muted = "#78716c";
const textDark = "#1a1a1a";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

/* ── static demo data ── */

const JOBS = [
  { id: "J-041", location: "4821 Balcones Dr, Austin", time: "8:00 AM", price: "$480", crew: "", status: "urgent" as const, desc: "Full garage cleanout — 2 truck est." },
  { id: "J-042", location: "1102 Cedar Park Blvd", time: "9:30 AM", price: "$220", crew: "Ben + Josh", status: "enroute" as const, desc: "Furniture removal — couch, mattress, dresser" },
  { id: "J-043", location: "780 Round Rock Ave", time: "11:00 AM", price: "$360", crew: "Marcelo", status: "scheduled" as const, desc: "Construction debris — drywall & lumber" },
  { id: "J-044", location: "215 Leander Loop", time: "1:00 PM", price: "$180", crew: "Crew 4", status: "scheduled" as const, desc: "Appliance haul — fridge + washer" },
  { id: "J-045", location: "3300 S Lamar, Austin", time: "2:30 PM", price: "$540", crew: "Ben + Josh", status: "complete" as const, desc: "Estate cleanout — full house" },
  { id: "J-046", location: "910 Westlake Dr", time: "4:00 PM", price: "$290", crew: "Marcelo", status: "complete" as const, desc: "Yard debris — tree limbs & brush" },
];

const CREWS = [
  { name: "Ben", load: 85, jobs: 4, color: green },
  { name: "Josh", load: 75, jobs: 3, color: blue },
  { name: "Marcelo", load: 60, jobs: 3, color: amber },
  { name: "Crew 4", load: 40, jobs: 2, color: muted },
];

const LEAD_SOURCES = [
  { source: "Google search", count: 6, color: blue },
  { source: "Google LSA", count: 4, color: "#7c3aed" },
  { source: "Referral", count: 3, color: green },
  { source: "Direct", count: 2, color: amber },
  { source: "Website form", count: 1, color: muted },
];

const REVENUE_SERVICES = [
  { service: "House cleanouts", amount: 8240 },
  { service: "Construction debris", amount: 6180 },
  { service: "Dumpster rental", amount: 4720 },
  { service: "Furniture removal", amount: 3960 },
  { service: "Yard waste", amount: 2100 },
  { service: "Appliance haul", amount: 1900 },
];

const AREAS = [
  { area: "Austin", jobs: 22, color: blue },
  { area: "Cedar Park", jobs: 15, color: green },
  { area: "Round Rock", jobs: 13, color: amber },
  { area: "Leander", jobs: 9, color: "#7c3aed" },
  { area: "Kyle", jobs: 7, color: red },
  { area: "Westlake", jobs: 5, color: muted },
];

const ESTIMATES = [
  { customer: "Sarah Mitchell", type: "Garage cleanout", area: "Austin", value: "$650", status: "Follow up" as const },
  { customer: "David Nguyen", type: "Construction debris", area: "Round Rock", value: "$1,200", status: "Sent" as const },
  { customer: "Karen White", type: "Estate cleanout", area: "Cedar Park", value: "$2,800", status: "Hot lead" as const },
  { customer: "James Lopez", type: "Dumpster rental", area: "Leander", value: "$420", status: "Sent" as const },
  { customer: "Emily Chen", type: "Yard waste", area: "Westlake", value: "$380", status: "New" as const },
];

const REVIEWS = [
  { name: "Amanda R.", stars: 5, text: "Ben and Josh were amazing! They cleared out my entire garage in under 2 hours. Very professional, on time, and priced fairly. Will absolutely use again.", time: "2 hours ago" },
  { name: "Carlos M.", stars: 5, text: "Needed same-day removal for construction debris and Comax delivered. The crew was careful not to damage my new flooring. Highly recommend!", time: "5 hours ago" },
];

const ACTIVITY = [
  { time: "2:45 PM", text: "Job J-045 marked complete — estate cleanout, $540", dotColor: green },
  { time: "2:12 PM", text: "New same-day request received — 4821 Balcones Dr", dotColor: red },
  { time: "1:30 PM", text: "Ben + Josh en route to 1102 Cedar Park Blvd", dotColor: blue },
  { time: "12:15 PM", text: "Estimate sent to Karen White — estate cleanout $2,800", dotColor: amber },
  { time: "11:00 AM", text: "Google review received — Amanda R. (5 stars)", dotColor: green },
];

/* ── helpers ── */

function statusStyle(s: "urgent" | "enroute" | "scheduled" | "complete") {
  switch (s) {
    case "urgent": return { bg: "#fee2e2", color: "#b91c1c", label: "Unassigned / urgent" };
    case "enroute": return { bg: "#dbeafe", color: "#1e40af", label: "En route" };
    case "scheduled": return { bg: "#fef3c7", color: "#92400e", label: "Scheduled" };
    case "complete": return { bg: "#dcfce7", color: "#166534", label: "Complete" };
  }
}

function estimateStatusStyle(s: "Follow up" | "Sent" | "Hot lead" | "New") {
  switch (s) {
    case "Hot lead": return { bg: "#fee2e2", color: "#b91c1c" };
    case "Follow up": return { bg: "#fef3c7", color: "#92400e" };
    case "Sent": return { bg: "#dbeafe", color: "#1e40af" };
    case "New": return { bg: "#dcfce7", color: "#166534" };
  }
}

const revenueTotal = REVENUE_SERVICES.reduce((a, b) => a + b.amount, 0);

/* ── page ── */

export default function JunkRemovalDashboard() {
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
        .junk-g5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .junk-row3 { display: grid; grid-template-columns: 1.8fr 1fr 1fr; gap: 24px; }
        .junk-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .junk-row2b { display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px; }
        @media (max-width: 1024px) {
          .junk-g5 { grid-template-columns: repeat(3, 1fr) !important; }
          .junk-row3 { grid-template-columns: 1fr !important; }
          .junk-row2 { grid-template-columns: 1fr !important; }
          .junk-row2b { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .junk-g5 { grid-template-columns: repeat(2, 1fr) !important; }
          .junk-wrap { padding: 0 16px 48px !important; }
        }
        @media (max-width: 480px) {
          .junk-g5 { grid-template-columns: 1fr !important; }
          .junk-wrap { padding: 0 12px 48px !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <header style={{ background: card, borderBottom: `1px solid ${border}`, animation: "fadeInUp 0.5s ease-out forwards" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {/* CX logo mark */}
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: fontMono, letterSpacing: -1 }}>CX</span>
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: textDark, margin: 0, lineHeight: 1.3 }}>
                Comax Junk Removal <span style={{ fontWeight: 400, color: muted }}>— Operations Dashboard</span>
              </h1>
              <p style={{ fontSize: 13, color: muted, margin: 0 }}>Saturday, April 5, 2026 &middot; Austin, TX metro</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#dcfce7", color: "#166534", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: green, display: "inline-block" }} />
              9 complete
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#dbeafe", color: "#1e40af", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: blue, display: "inline-block" }} />
              3 in progress
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fee2e2", color: "#b91c1c", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: red, display: "inline-block" }} />
              1 urgent
            </span>
          </div>
        </div>
      </header>

      <div className="junk-wrap" style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px 48px" }}>

        {/* ── Demo context banner ── */}
        <div style={{ margin: "20px 0", padding: "24px 28px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, animation: "fadeInUp 0.4s ease-out forwards" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for a junk removal company.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>Jobs, crew dispatch, estimates, and revenue — all tracked in one place. The final product is designed around how your operation actually runs. This is a starting point to show what&apos;s possible.</p>
        </div>

        {/* ── Alert bar ── */}
        <div style={{ margin: "20px 0", padding: "14px 20px", background: "#fef2f2", border: `1px solid #fecaca`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, animation: "fadeInUp 0.5s ease-out 0.1s both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>&#9888;</span>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#b91c1c" }}>Same-day emergency request</p>
              <p style={{ margin: 0, fontSize: 13, color: "#991b1b" }}>4821 Balcones Dr — full garage cleanout, 2 truck estimate. Customer requests before 12 PM.</p>
            </div>
          </div>
          <button style={{ background: "#dc2626", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            Assign &amp; confirm
          </button>
        </div>

        {/* ── KPI cards ── */}
        <div className="junk-g5" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.15s both" }}>
          {[
            { value: "$4,180", label: "Revenue today", sub: "+22% vs avg", accent: green },
            { value: "13", label: "Jobs today", sub: "9 done · 3 active · 1 urgent", accent: blue },
            { value: "$321", label: "Avg job value", sub: "+8% vs last wk", accent: green },
            { value: "4", label: "Crews out", sub: "All dispatched", accent: blue },
            { value: "4.9", label: "Google rating", sub: "1,052 reviews", accent: amber, star: true },
          ].map((kpi, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ margin: 0, fontSize: 13, color: muted, fontFamily: fontMono, fontWeight: 500 }}>{kpi.label}</p>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: textDark, fontFamily: fontMono, lineHeight: 1.1 }}>
                {kpi.star && <span style={{ color: amber, marginRight: 4 }}>&#9733;</span>}
                {kpi.value}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: kpi.accent, fontWeight: 600 }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Main row: Job Board + Crew Status + Lead Sources ── */}
        <div className="junk-row3" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.2s both" }}>

          {/* Job Board */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Today&apos;s Job Board</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {JOBS.map((job) => {
                const st = statusStyle(job.status);
                return (
                  <div key={job.id} style={{ padding: "14px 16px", border: `1px solid ${border}`, borderRadius: 10, background: bg }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                      <div>
                        <span style={{ fontFamily: fontMono, fontSize: 12, color: muted, marginRight: 8 }}>{job.id}</span>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{job.location}</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: st.bg, color: st.color, whiteSpace: "nowrap" }}>{st.label}</span>
                    </div>
                    <p style={{ margin: "0 0 6px", fontSize: 13, color: muted }}>{job.desc}</p>
                    <div style={{ display: "flex", gap: 16, fontSize: 13, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: fontMono, fontWeight: 500 }}>{job.time}</span>
                      <span style={{ fontFamily: fontMono, fontWeight: 700, color: green }}>{job.price}</span>
                      {job.crew && <span style={{ color: blue, fontWeight: 500 }}>{job.crew}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Crew Status */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Crew Status</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {CREWS.map((c) => (
                <div key={c.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</span>
                    <span style={{ fontFamily: fontMono, fontSize: 13, color: muted }}>{c.jobs} jobs · {c.load}% load</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: "#f0ece6", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${c.load}%`, background: c.color, borderRadius: 4, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Sources Today */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Lead Sources Today</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {LEAD_SOURCES.map((ls) => (
                <div key={ls.source}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{ls.source}</span>
                    <span style={{ fontFamily: fontMono, fontSize: 13, fontWeight: 600 }}>{ls.count}</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 4, background: "#f0ece6", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(ls.count / 6) * 100}%`, background: ls.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Second row: Revenue by Service + Jobs by Area ── */}
        <div className="junk-row2" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.25s both" }}>

          {/* Revenue by Service */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Revenue by Service <span style={{ fontWeight: 400, fontSize: 13, color: muted }}>MTD</span></h2>
              <span style={{ fontFamily: fontMono, fontSize: 18, fontWeight: 700, color: green }}>${revenueTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {REVENUE_SERVICES.map((rs) => (
                <div key={rs.service} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, minWidth: 140 }}>{rs.service}</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#f0ece6", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(rs.amount / 8240) * 100}%`, background: blue, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontFamily: fontMono, fontSize: 13, fontWeight: 600, minWidth: 60, textAlign: "right" }}>${rs.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jobs by Area */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Jobs by Area <span style={{ fontWeight: 400, fontSize: 13, color: muted }}>MTD</span></h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {AREAS.map((a) => (
                <div key={a.area} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, minWidth: 90 }}>{a.area}</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#f0ece6", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(a.jobs / 22) * 100}%`, background: a.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontFamily: fontMono, fontSize: 13, fontWeight: 600, minWidth: 30, textAlign: "right" }}>{a.jobs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom row: Estimates Pipeline + Reviews + Activity ── */}
        <div className="junk-row2b" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.3s both" }}>

          {/* Estimates Pipeline */}
          <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Estimates Pipeline</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${border}` }}>
                    {["Customer", "Job type", "Area", "Est. value", "Status"].map((h) => (
                      <th key={h} style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: muted, fontSize: 12, fontFamily: fontMono }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ESTIMATES.map((e, i) => {
                    const st = estimateStatusStyle(e.status);
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${border}` }}>
                        <td style={{ padding: "10px 10px", fontWeight: 500 }}>{e.customer}</td>
                        <td style={{ padding: "10px 10px", color: muted }}>{e.type}</td>
                        <td style={{ padding: "10px 10px", color: muted }}>{e.area}</td>
                        <td style={{ padding: "10px 10px", fontFamily: fontMono, fontWeight: 600 }}>{e.value}</td>
                        <td style={{ padding: "10px 10px" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 9999, background: st.bg, color: st.color }}>{e.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column: Reviews + Activity Feed */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Latest Google Reviews */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Latest Google Reviews</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {REVIEWS.map((r, i) => (
                  <div key={i} style={{ padding: "14px 16px", border: `1px solid ${border}`, borderRadius: 10, background: bg }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                      <span style={{ fontSize: 12, color: muted }}>{r.time}</span>
                    </div>
                    <div style={{ marginBottom: 6 }}>
                      {Array.from({ length: r.stars }).map((_, si) => (
                        <span key={si} style={{ color: amber, fontSize: 14, marginRight: 2 }}>&#9733;</span>
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: "#44403c", lineHeight: 1.5 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "22px 24px" }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700 }}>Activity Feed</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 9999, background: a.dotColor, marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontFamily: fontMono, fontSize: 12, color: muted, marginRight: 8 }}>{a.time}</span>
                      <span style={{ fontSize: 13 }}>{a.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", padding: "24px 0 0", borderTop: `1px solid ${border}` }}>
          <a href="/" style={{ fontSize: 12, fontWeight: 700, color: muted, textDecoration: "none", letterSpacing: -0.5 }}>
            martin<span style={{ color: green }}>.builds</span>
          </a>
        </div>
      </div>
    </div>
  );
}
