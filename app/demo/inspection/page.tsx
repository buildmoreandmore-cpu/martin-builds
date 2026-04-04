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

function resultColor(r: "Passed" | "Failed" | "Pending") {
  if (r === "Passed") return "bg-green-50 text-green-700";
  if (r === "Failed") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
}

function expiryPill(days: number) {
  if (days <= 14) return "bg-red-100 text-red-700";
  if (days <= 30) return "bg-amber-100 text-amber-700";
  return "bg-green-100 text-green-700";
}

function loadBarColor(status: "Full" | "Active" | "Open") {
  if (status === "Full") return "bg-red-500";
  if (status === "Active") return "bg-amber-500";
  return "bg-green-500";
}

function violationDot(color: "red" | "amber" | "green") {
  if (color === "red") return "bg-red-500";
  if (color === "amber") return "bg-amber-500";
  return "bg-green-500";
}

/* ── page ── */

export default function InspectionDemoPage() {
  return (
    <div className={`${ibmPlex.variable} font-[family-name:var(--font-ibm-plex)] min-h-screen bg-white text-gray-900`}>

      {/* ── Top bar ── */}
      <header
        className="animate-[fadeIn_0.4s_ease-out_both] border-b border-gray-200 bg-white px-4 py-5 sm:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
              Inspection &amp; Compliance Portal
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Friday, April 4 &middot; 3 certifications expiring within 30 days
            </p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              14 passed this month
            </span>
            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              2 failed &middot; remediation open
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-8">

        {/* ── Amber alert banner ── */}
        <div
          className="animate-[fadeIn_0.5s_ease-out_0.1s_both] flex flex-col gap-3 rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderLeft: "3px solid #d97706" }}
        >
          <p className="text-sm text-amber-900">
            <span className="font-semibold">Halcyon Medical&apos;s</span> fire suppression certificate expires in 8 days. Re-inspection not yet scheduled.
          </p>
          <button className="shrink-0 rounded-md px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: "#1e3a5f" }}>
            Schedule now
          </button>
        </div>

        {/* ── KPI row ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "42", label: "Active clients", sub: "7 inspections today", accent: false },
            { value: "87%", label: "Pass rate (30d)", sub: "\u21914% vs last month", accent: "green" },
            { value: "6", label: "Open violations", sub: "2 escalated", accent: "red" },
            { value: "$18,400", label: "Revenue (MTD)", sub: "\u219112% vs last month", accent: "green" },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className="animate-[fadeIn_0.5s_ease-out_both] rounded-lg border border-[#E2E8F0] bg-white p-5"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <p className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>{kpi.value}</p>
              <p className="mt-1 text-sm font-medium text-gray-700">{kpi.label}</p>
              <p className={`mt-0.5 text-xs ${kpi.accent === "green" ? "text-green-600" : kpi.accent === "red" ? "text-red-600" : "text-gray-500"}`}>
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>

        {/* ── Two-column: Recent inspections + Certificate expiry ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Recent inspections */}
          <div
            className="animate-[fadeIn_0.5s_ease-out_0.4s_both] overflow-hidden rounded-lg border border-[#E2E8F0] bg-white lg:col-span-3"
          >
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold" style={{ color: "#1e3a5f" }}>Recent inspections</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-medium text-gray-500">
                    <th className="px-5 py-3">Client / Site</th>
                    <th className="px-5 py-3">Type</th>
                    <th className="px-5 py-3">Inspector</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInspections.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="px-5 py-3 font-medium text-gray-900">{row.client}</td>
                      <td className="px-5 py-3 text-gray-600">{row.type}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: "#1e3a5f" }}
                          >
                            {row.inspector}
                          </span>
                          <span className="text-gray-600">{row.inspectorName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{row.date}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${resultColor(row.result)}`}>
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
            className="animate-[fadeIn_0.5s_ease-out_0.5s_both] rounded-lg border border-[#E2E8F0] bg-white lg:col-span-2"
          >
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold" style={{ color: "#1e3a5f" }}>Certificate expiry tracker</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {certExpiry.map((c, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.client}</p>
                    <p className="text-xs text-gray-500">{c.cert} &middot; {c.expiry}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${expiryPill(c.days)}`}>
                    {c.days}d
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Three-column: Workload + Violations + Revenue ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Inspector workload */}
          <div className="animate-[fadeIn_0.5s_ease-out_0.55s_both] rounded-lg border border-[#E2E8F0] bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold" style={{ color: "#1e3a5f" }}>Inspector workload today</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {inspectors.map((ins, i) => (
                <div key={i} className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: "#1e3a5f" }}
                    >
                      {ins.initials}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{ins.name}</p>
                      <p className="text-xs text-gray-500">{ins.specialty}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      ins.status === "Full" ? "bg-red-50 text-red-700" :
                      ins.status === "Active" ? "bg-amber-50 text-amber-700" :
                      "bg-green-50 text-green-700"
                    }`}>
                      {ins.status}
                    </span>
                  </div>
                  {/* load bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-100">
                      <div
                        className={`h-2 rounded-full ${loadBarColor(ins.status)}`}
                        style={{ width: `${(ins.jobs / ins.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{ins.jobs}/{ins.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open violations */}
          <div className="animate-[fadeIn_0.5s_ease-out_0.6s_both] rounded-lg border border-[#E2E8F0] bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold" style={{ color: "#1e3a5f" }}>Open violations / Remediation tracking</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {violations.map((v, i) => (
                <div
                  key={i}
                  className="px-5 py-3.5"
                  style={{
                    borderLeft: `3px solid ${v.color === "red" ? "#dc2626" : v.color === "amber" ? "#d97706" : "#16a34a"}`,
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${violationDot(v.color)}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{v.description}</p>
                      <p className="text-xs text-gray-500">{v.client}</p>
                      <p className={`mt-1 text-xs ${
                        v.color === "red" ? "text-red-600" : v.color === "amber" ? "text-amber-600" : "text-green-600"
                      }`}>
                        {v.status} &middot; {v.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by service type */}
          <div className="animate-[fadeIn_0.5s_ease-out_0.65s_both] rounded-lg border border-[#E2E8F0] bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-base font-semibold" style={{ color: "#1e3a5f" }}>Revenue by service type</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {revenue.map((r, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-gray-700">{r.label}</span>
                  <span className="text-sm font-medium text-gray-900">{r.amount}</span>
                </div>
              ))}
              {/* Total */}
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-bold" style={{ color: "#1e3a5f" }}>Total MTD</span>
                <span className="text-base font-bold text-green-700">$18,400</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed CTA ── */}
      <a
        href="https://martinbuilds.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 z-50 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: "#1e3a5f" }}
      >
        Book a walkthrough &rarr;
      </a>

      {/* Inline keyframes for fade-in */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
