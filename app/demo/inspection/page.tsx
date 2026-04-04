import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Inspection & Compliance Portal | martinbuilds.ai Demo",
  description:
    "Live demo of an AI-powered inspection and compliance dashboard built by martinbuilds.ai. Certificate tracking, violation remediation, inspector workload, and revenue analytics.",
};

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex",
});

/* ── static demo data ── */

const recentInspections = [
  { client: "Apex Fulfillment", type: "Fire safety", inspector: "JR", inspectorName: "J. Ruiz", date: "Apr 3", result: "Passed" as const },
  { client: "Crestview Living", type: "Electrical", inspector: "KM", inspectorName: "K. Murakami", date: "Apr 2", result: "Failed" as const },
  { client: "NorthStar Logistics", type: "OSHA", inspector: "DL", inspectorName: "D. Lawson", date: "Apr 2", result: "Passed" as const },
  { client: "Halcyon Medical", type: "Biohazard", inspector: "AP", inspectorName: "A. Patel", date: "Apr 1", result: "Pending" as const },
  { client: "Whitmore & Sons", type: "Health dept", inspector: "JR", inspectorName: "J. Ruiz", date: "Mar 31", result: "Passed" as const },
];

const certExpiry = [
  { client: "Halcyon Medical", cert: "Fire suppression", expiry: "Apr 12", days: 8 },
  { client: "Crestview Living", cert: "Electrical compliance", expiry: "Apr 24", days: 20 },
  { client: "Apex Fulfillment", cert: "OSHA occupancy", expiry: "May 1", days: 27 },
  { client: "NorthStar Logistics", cert: "Hazmat handling", expiry: "Jun 15", days: 72 },
];

const inspectors = [
  { initials: "JR", name: "J. Ruiz", specialty: "Fire & life safety", jobs: 4, capacity: 4, status: "Full" as const },
  { initials: "KM", name: "K. Murakami", specialty: "Electrical", jobs: 3, capacity: 4, status: "Active" as const },
  { initials: "DL", name: "D. Lawson", specialty: "OSHA / workplace", jobs: 2, capacity: 4, status: "Open" as const },
  { initials: "AP", name: "A. Patel", specialty: "Environmental", jobs: 1, capacity: 4, status: "Open" as const },
];

const violations = [
  { color: "red" as const, description: "Blocked emergency exit — east stairwell", client: "Crestview Living", status: "Escalated to fire marshal", date: "Apr 2" },
  { color: "red" as const, description: "Expired fire extinguishers (3 units)", client: "Halcyon Medical", status: "Escalated — awaiting vendor", date: "Mar 28" },
  { color: "amber" as const, description: "Missing GFCI outlets in kitchen area", client: "Crestview Living", status: "Remediation in progress", date: "Apr 2" },
  { color: "green" as const, description: "Overloaded circuit panel — resolved", client: "Whitmore & Sons", status: "Resolved", date: "Mar 25" },
];

const revenue = [
  { label: "Routine inspections", amount: "$9,300" },
  { label: "Re-inspections", amount: "$3,200" },
  { label: "Certificate renewals", amount: "$4,800" },
  { label: "Consulting / remediation", amount: "$1,100" },
];

/* ── helpers ── */

function resultPillStyle(r: "Passed" | "Failed" | "Pending"): React.CSSProperties {
  const base: React.CSSProperties = { borderRadius: 100, padding: "2px 10px", fontSize: 12, fontWeight: 600, display: "inline-block" };
  if (r === "Passed") return { ...base, background: "#f0fdf4", color: "#16a34a" };
  if (r === "Failed") return { ...base, background: "#fef2f2", color: "#dc2626" };
  return { ...base, background: "#fffbeb", color: "#d97706" };
}

function expiryPillStyle(days: number): React.CSSProperties {
  const base: React.CSSProperties = { borderRadius: 100, padding: "2px 10px", fontSize: 12, fontWeight: 600, flexShrink: 0 };
  if (days <= 14) return { ...base, background: "#fef2f2", color: "#dc2626" };
  if (days <= 30) return { ...base, background: "#fffbeb", color: "#d97706" };
  return { ...base, background: "#f0fdf4", color: "#16a34a" };
}

function statusPillStyle(status: "Full" | "Active" | "Open"): React.CSSProperties {
  const base: React.CSSProperties = { borderRadius: 100, padding: "2px 10px", fontSize: 12, fontWeight: 600 };
  if (status === "Full") return { ...base, background: "#fef2f2", color: "#dc2626" };
  if (status === "Active") return { ...base, background: "#fffbeb", color: "#d97706" };
  return { ...base, background: "#f0fdf4", color: "#16a34a" };
}

function loadBarColor(status: "Full" | "Active" | "Open"): string {
  if (status === "Full") return "#dc2626";
  if (status === "Active") return "#d97706";
  return "#16a34a";
}

function violationAccent(color: "red" | "amber" | "green"): string {
  if (color === "red") return "#dc2626";
  if (color === "amber") return "#d97706";
  return "#16a34a";
}

function violationStatusColor(color: "red" | "amber" | "green"): string {
  if (color === "red") return "#dc2626";
  if (color === "amber") return "#d97706";
  return "#16a34a";
}

/* ── shared styles ── */

const card: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #E2E8F0",
  borderRadius: 8,
  padding: 0, // cards with internal sections handle their own padding
};

const cardPadded: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #E2E8F0",
  borderRadius: 8,
  padding: 20,
};

const cardHeader: React.CSSProperties = {
  borderBottom: "1px solid #f3f4f6",
  padding: "16px 20px",
};

const sectionTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: "#1e3a5f",
  margin: 0,
};

const avatar: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: "#1e3a5f",
  color: "#fff",
  fontSize: 11,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const thStyle: React.CSSProperties = {
  padding: "12px 20px",
  fontSize: 12,
  fontWeight: 500,
  color: "#6b7280",
  textAlign: "left" as const,
  borderBottom: "1px solid #f3f4f6",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 20px",
  fontSize: 14,
  borderBottom: "1px solid #f9fafb",
};

/* ── page ── */

export default function InspectionDemoPage() {
  return (
    <div className={ibmPlex.variable} style={{ minHeight: "100vh", background: "#ffffff", color: "#111827", fontFamily: "var(--font-ibm-plex), sans-serif", paddingTop: 64 }}>

      <style>{`
  body { background: #ffffff !important; color: #111827 !important; font-family: var(--font-ibm-plex), sans-serif !important; }
  body::before { display: none !important; }
  section { padding-left: unset !important; padding-right: unset !important; }
  h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .insp-kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .insp-two { display: grid; grid-template-columns: 3fr 2fr; gap: 24px; }
  .insp-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  @media (max-width: 768px) {
    .insp-kpi { grid-template-columns: repeat(2, 1fr) !important; }
    .insp-two { grid-template-columns: 1fr !important; }
    .insp-three { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .insp-kpi { grid-template-columns: 1fr !important; }
  }
`}</style>

      {/* ── Top bar ── */}
      <header
        style={{
          borderBottom: "1px solid #E2E8F0",
          background: "#ffffff",
          padding: "20px 32px",
          animation: "fadeIn 0.4s ease-out both",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1e3a5f", margin: 0 }}>
              Inspection &amp; Compliance Portal
            </h1>
            <p style={{ marginTop: 4, fontSize: 14, color: "#6b7280" }}>
              Friday, April 4 &middot; 3 certifications expiring within 30 days
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ display: "inline-flex", alignItems: "center", borderRadius: 100, background: "#f0fdf4", padding: "4px 12px", fontSize: 12, fontWeight: 600, color: "#16a34a" }}>
              14 passed this month
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", borderRadius: 100, background: "#fef2f2", padding: "4px 12px", fontSize: 12, fontWeight: 600, color: "#dc2626" }}>
              2 failed &middot; remediation open
            </span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* ── Amber alert banner ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            borderRadius: 8,
            border: "1px solid #fcd34d",
            borderLeft: "3px solid #d97706",
            background: "#fffbeb",
            padding: "16px 20px",
            animation: "fadeIn 0.5s ease-out 0.1s both",
          }}
        >
          <p style={{ fontSize: 14, color: "#78350f", margin: 0 }}>
            <span style={{ fontWeight: 600 }}>Halcyon Medical&apos;s</span> fire suppression certificate expires in 8 days. Re-inspection not yet scheduled.
          </p>
          <button
            style={{
              flexShrink: 0,
              borderRadius: 6,
              padding: "8px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#1e3a5f",
              border: "none",
              cursor: "pointer",
            }}
          >
            Schedule now
          </button>
        </div>

        {/* ── KPI row ── */}
        <div className="insp-kpi">
          {[
            { value: "42", label: "Active clients", sub: "7 inspections today", accent: undefined },
            { value: "87%", label: "Pass rate (30d)", sub: "\u21914% vs last month", accent: "#16a34a" },
            { value: "6", label: "Open violations", sub: "2 escalated", accent: "#dc2626" },
            { value: "$18,400", label: "Revenue (MTD)", sub: "\u219112% vs last month", accent: "#16a34a" },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              style={{
                ...cardPadded,
                animation: `fadeIn 0.5s ease-out ${0.15 + i * 0.07}s both`,
              }}
            >
              <p style={{ fontSize: 28, fontWeight: 700, color: "#1e3a5f", margin: 0 }}>{kpi.value}</p>
              <p style={{ marginTop: 4, fontSize: 14, fontWeight: 500, color: "#374151" }}>{kpi.label}</p>
              <p style={{ marginTop: 2, fontSize: 12, color: kpi.accent || "#6b7280" }}>
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Two-column: Recent inspections + Certificate expiry ── */}
        <div className="insp-two">
          {/* Recent inspections */}
          <div
            style={{
              ...card,
              animation: "fadeIn 0.5s ease-out 0.4s both",
              overflow: "hidden",
            }}
          >
            <div style={cardHeader}>
              <h2 style={sectionTitle}>Recent inspections</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Client / Site</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Inspector</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInspections.map((row, i) => (
                    <tr key={i}>
                      <td style={{ ...tdStyle, fontWeight: 500, color: "#111827" }}>{row.client}</td>
                      <td style={{ ...tdStyle, color: "#6b7280" }}>{row.type}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={avatar}>
                            {row.inspector}
                          </span>
                          <span style={{ color: "#6b7280" }}>{row.inspectorName}</span>
                        </div>
                      </td>
                      <td style={{ ...tdStyle, color: "#6b7280" }}>{row.date}</td>
                      <td style={tdStyle}>
                        <span style={resultPillStyle(row.result)}>
                          {row.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Certificate expiry tracker */}
          <div
            style={{
              ...card,
              animation: "fadeIn 0.5s ease-out 0.5s both",
            }}
          >
            <div style={cardHeader}>
              <h2 style={sectionTitle}>Certificate expiry tracker</h2>
            </div>
            <div>
              {certExpiry.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    borderBottom: i < certExpiry.length - 1 ? "1px solid #f9fafb" : "none",
                  }}
                >
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: 0 }}>{c.client}</p>
                    <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{c.cert} &middot; {c.expiry}</p>
                  </div>
                  <span style={expiryPillStyle(c.days)}>
                    {c.days}d
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Three-column: Workload + Violations + Revenue ── */}
        <div className="insp-three">

          {/* Inspector workload */}
          <div style={{ ...card, animation: "fadeIn 0.5s ease-out 0.55s both" }}>
            <div style={cardHeader}>
              <h2 style={sectionTitle}>Inspector workload today</h2>
            </div>
            <div>
              {inspectors.map((ins, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 20px",
                    borderBottom: i < inspectors.length - 1 ? "1px solid #f9fafb" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ ...avatar, width: 32, height: 32 }}>
                      {ins.initials}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: 0 }}>{ins.name}</p>
                      <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{ins.specialty}</p>
                    </div>
                    <span style={statusPillStyle(ins.status)}>
                      {ins.status}
                    </span>
                  </div>
                  {/* load bar */}
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ height: 8, flex: 1, borderRadius: 100, background: "#f3f4f6" }}>
                      <div
                        style={{
                          height: 8,
                          borderRadius: 100,
                          background: loadBarColor(ins.status),
                          width: `${(ins.jobs / ins.capacity) * 100}%`,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{ins.jobs}/{ins.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open violations */}
          <div style={{ ...card, animation: "fadeIn 0.5s ease-out 0.6s both" }}>
            <div style={cardHeader}>
              <h2 style={sectionTitle}>Open violations / Remediation tracking</h2>
            </div>
            <div>
              {violations.map((v, i) => (
                <div
                  key={i}
                  style={{
                    padding: "14px 20px",
                    borderLeft: `3px solid ${violationAccent(v.color)}`,
                    borderBottom: i < violations.length - 1 ? "1px solid #f9fafb" : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span
                      style={{
                        marginTop: 5,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: violationAccent(v.color),
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: 0 }}>{v.description}</p>
                      <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{v.client}</p>
                      <p style={{ marginTop: 4, fontSize: 12, color: violationStatusColor(v.color) }}>
                        {v.status} &middot; {v.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by service type */}
          <div style={{ ...card, animation: "fadeIn 0.5s ease-out 0.65s both" }}>
            <div style={cardHeader}>
              <h2 style={sectionTitle}>Revenue by service type</h2>
            </div>
            <div>
              {revenue.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    borderBottom: "1px solid #f9fafb",
                  }}
                >
                  <span style={{ fontSize: 14, color: "#374151" }}>{r.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{r.amount}</span>
                </div>
              ))}
              {/* Total */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f" }}>Total MTD</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#16a34a" }}>$18,400</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed CTA ── */}
      <a
        href="/discovery-call"
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 50,
          borderRadius: 100,
          padding: "12px 20px",
          fontSize: 14,
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#1e3a5f",
          textDecoration: "none",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
        }}
      >
        Book a walkthrough &rarr;
      </a>
    </div>
  );
}
