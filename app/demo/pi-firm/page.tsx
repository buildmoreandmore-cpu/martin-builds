"use client";

import { useState } from "react";
import Link from "next/link";

/* ── palette tokens ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const border = "#E8E3DC";
const navy = "#1e3a5f";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const muted = "#78716c";
const textDark = "#1a1a1a";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

/* ── static demo data ── */

const CASE = {
  name: "Rodriguez v. ABC Trucking, Inc.",
  caseNumber: "2026-PI-04182",
  client: "Maria Rodriguez",
  dob: "03/14/1985",
  doi: "11/02/2025",
  attorney: "James Chen, Esq.",
  paralegal: "Sarah Kim",
  status: "Active — Treatment",
  type: "Motor Vehicle Accident",
  jurisdiction: "Harris County, TX",
  sol: "11/02/2027",
  solDays: 571,
};

const METRICS = [
  { label: "Medical Specials", value: "$127,450", sub: "23 providers", color: blue },
  { label: "Lost Wages", value: "$34,200", sub: "6 months documented", color: navy },
  { label: "Policy Limit", value: "$500,000", sub: "Commercial auto", color: green },
  { label: "Demand Target", value: "$485,000", sub: "3.2x multiplier", color: amber },
];

const RECORDS = [
  { provider: "Memorial Hermann ER", type: "Emergency", date: "11/02/2025", status: "received" as const, pages: 84, billed: "$18,420", notes: "Initial trauma workup, CT scans, X-rays" },
  { provider: "Dr. Patel — Orthopedics", type: "Specialist", date: "11/15/2025", status: "received" as const, pages: 42, billed: "$8,650", notes: "L4-L5 disc herniation diagnosis, MRI review" },
  { provider: "Lone Star Imaging", type: "Radiology", date: "11/10/2025", status: "received" as const, pages: 28, billed: "$4,200", notes: "MRI lumbar spine, cervical spine" },
  { provider: "Texas Spine & Joint", type: "Specialist", date: "12/01/2025", status: "received" as const, pages: 156, billed: "$42,800", notes: "Epidural injections x3, facet blocks, nerve ablation" },
  { provider: "ClearView Physical Therapy", type: "PT/Rehab", date: "11/20/2025", status: "received" as const, pages: 92, billed: "$12,600", notes: "3x weekly, 16 weeks — ROM improvement documented" },
  { provider: "Dr. Nguyen — Pain Management", type: "Specialist", date: "01/15/2026", status: "received" as const, pages: 38, billed: "$6,800", notes: "Chronic pain assessment, medication management" },
  { provider: "Houston Methodist — Surgery", type: "Surgical", date: "03/10/2026", status: "pending" as const, pages: 0, billed: "$28,500", notes: "L4-L5 microdiscectomy — records requested 03/25" },
  { provider: "Dr. Williams — Psych Eval", type: "Mental Health", date: "02/01/2026", status: "pending" as const, pages: 0, billed: "$3,200", notes: "PTSD evaluation — second request sent 04/01" },
  { provider: "Employer — Wage Records", type: "Employment", date: "N/A", status: "received" as const, pages: 12, billed: "$34,200", notes: "Pay stubs, W-2s, disability documentation" },
];

const TIMELINE = [
  { date: "11/02/2025", event: "Motor vehicle accident — rear-ended by commercial truck on I-10", type: "incident" as const },
  { date: "11/02/2025", event: "Emergency room visit — Memorial Hermann, discharged with cervical collar", type: "treatment" as const },
  { date: "11/10/2025", event: "MRI lumbar & cervical spine — L4-L5 disc herniation confirmed", type: "diagnostic" as const },
  { date: "11/15/2025", event: "Orthopedic consultation — Dr. Patel recommends conservative treatment first", type: "treatment" as const },
  { date: "11/20/2025", event: "Physical therapy begins — ClearView PT, 3x/week", type: "treatment" as const },
  { date: "12/01/2025", event: "First epidural steroid injection — temporary relief only", type: "procedure" as const },
  { date: "01/05/2026", event: "Second epidural injection — diminishing returns documented", type: "procedure" as const },
  { date: "01/15/2026", event: "Pain management referral — chronic pain diagnosis established", type: "treatment" as const },
  { date: "02/01/2026", event: "Psychiatric evaluation — PTSD diagnosis, anxiety while driving", type: "treatment" as const },
  { date: "02/15/2026", event: "Third epidural injection — failed conservative treatment documented", type: "procedure" as const },
  { date: "03/01/2026", event: "Surgical consultation — microdiscectomy recommended", type: "treatment" as const },
  { date: "03/10/2026", event: "L4-L5 microdiscectomy performed — Houston Methodist", type: "procedure" as const },
  { date: "03/24/2026", event: "Post-op follow-up — healing well, PT to resume in 4 weeks", type: "treatment" as const },
];

const DEMAND_SECTIONS = {
  liability: `On November 2, 2025, at approximately 2:45 PM, Ms. Maria Rodriguez was traveling westbound on Interstate 10 near the Shepherd Drive exit in Harris County, Texas. Traffic ahead had slowed to a stop. Ms. Rodriguez brought her vehicle to a complete stop behind the vehicle in front of her.

The defendant's driver, operating an 18-wheel commercial truck owned by ABC Trucking, Inc., failed to observe the stopped traffic and rear-ended Ms. Rodriguez's vehicle at approximately 45 mph. The impact was severe enough to deploy the airbags and push Ms. Rodriguez's vehicle into the car ahead of her.

The police report (HPD #2025-1102-4182) confirms the defendant's driver was cited for following too closely and failure to control speed. The defendant's driver admitted to the responding officer that he was "looking at his phone" moments before impact. ABC Trucking's FMCSA records show 3 prior safety violations in the 12 months preceding this collision.`,

  injuries: `As a direct and proximate result of the collision, Ms. Rodriguez sustained the following injuries:

1. L4-L5 Disc Herniation — Confirmed by MRI on 11/10/2025, requiring three epidural steroid injections and ultimately a microdiscectomy on 03/10/2026
2. Cervical Strain/Sprain — Persistent neck pain and limited range of motion requiring 16 weeks of physical therapy
3. Post-Traumatic Stress Disorder — Diagnosed by Dr. Williams on 02/01/2026, including severe anxiety while driving, nightmares, and hypervigilance
4. Left Shoulder Contusion — From seatbelt restraint, resolved after 8 weeks of treatment
5. Chronic Pain Syndrome — Ongoing pain management with Dr. Nguyen, medication regimen established`,

  damages: [
    { category: "Emergency Room / Hospital", amount: "$18,420.00" },
    { category: "Orthopedic Treatment (Dr. Patel)", amount: "$8,650.00" },
    { category: "Diagnostic Imaging (MRI, CT, X-ray)", amount: "$4,200.00" },
    { category: "Interventional Pain (Injections/Ablation)", amount: "$42,800.00" },
    { category: "Physical Therapy (48 sessions)", amount: "$12,600.00" },
    { category: "Pain Management (Dr. Nguyen)", amount: "$6,800.00" },
    { category: "Surgery — Microdiscectomy", amount: "$28,500.00" },
    { category: "Psychiatric Treatment (PTSD)", amount: "$3,200.00" },
    { category: "Future Medical (estimated 2 years)", amount: "$2,280.00" },
  ],
  totalMedical: "$127,450.00",
  lostWages: "$34,200.00",
  lostEarningCapacity: "$18,000.00",
  painSuffering: "$305,350.00",
  totalDemand: "$485,000.00",
};

const SIGNATURES = [
  { name: "Maria Rodriguez", role: "Client", date: "04/08/2026", status: "signed" as const },
  { name: "James Chen, Esq.", role: "Attorney of Record", date: "04/08/2026", status: "signed" as const },
  { name: "Sarah Kim", role: "Paralegal — Case Manager", date: "04/09/2026", status: "signed" as const },
  { name: "Dr. Rajesh Patel", role: "Treating Physician — Orthopedics", date: "", status: "pending" as const },
  { name: "Dr. Amy Williams", role: "Psychiatric Evaluator", date: "", status: "pending" as const },
  { name: "Adjuster — Liberty Mutual", role: "Insurance Carrier", date: "", status: "awaiting" as const },
];

/* ── helpers ── */

function statusStyle(s: "received" | "pending") {
  if (s === "received") return { bg: "#dcfce7", color: "#166534", label: "Received" };
  return { bg: "#fef3c7", color: "#92400e", label: "Pending" };
}

function timelineIcon(t: "incident" | "treatment" | "diagnostic" | "procedure") {
  switch (t) {
    case "incident": return red;
    case "procedure": return blue;
    case "diagnostic": return amber;
    default: return green;
  }
}

function sigStatusStyle(s: "signed" | "pending" | "awaiting") {
  switch (s) {
    case "signed": return { bg: "#dcfce7", color: "#166534", label: "Signed" };
    case "pending": return { bg: "#fef3c7", color: "#92400e", label: "Pending" };
    case "awaiting": return { bg: "#f3f4f6", color: "#374151", label: "Awaiting Send" };
  }
}

type Tab = "records" | "summary" | "demand" | "signatures";

/* ── page ── */

export default function PIFirmDemo() {
  const [activeTab, setActiveTab] = useState<Tab>("records");

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: "records",
      label: "Medical Records",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      key: "summary",
      label: "Medical Summary",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      key: "demand",
      label: "Demand Letter",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      key: "signatures",
      label: "Signatures",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
    },
  ];

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
        .pi-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .pi-tab-bar { display: flex; gap: 4px; }
        .pi-records-table { width: 100%; border-collapse: collapse; }
        .pi-records-table th, .pi-records-table td { padding: 10px 14px; text-align: left; font-size: 13px; border-bottom: 1px solid ${border}; }
        .pi-records-table th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: ${muted}; font-weight: 600; font-family: ${fontMono}; }
        .pi-records-table tr:last-child td { border-bottom: none; }
        .pi-damages-table { width: 100%; border-collapse: collapse; }
        .pi-damages-table td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid ${border}; }
        .pi-damages-table tr:last-child td { border-bottom: none; }
        @media (max-width: 1024px) {
          .pi-metrics { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .pi-metrics { grid-template-columns: 1fr !important; }
          .pi-tab-bar { overflow-x: auto; }
          .pi-wrap { padding: 0 16px 48px !important; }
          .pi-records-table { display: block; overflow-x: auto; }
        }
        @media (max-width: 480px) {
          .pi-wrap { padding: 0 12px 48px !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <header style={{ background: card, borderBottom: `1px solid ${border}`, animation: "fadeInUp 0.5s ease-out forwards" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: textDark, margin: 0, lineHeight: 1.3 }}>
                PI Case Platform
              </h1>
              <p style={{ fontSize: 13, color: muted, margin: 0 }}>{CASE.name} &middot; {CASE.caseNumber}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#dbeafe", color: "#1e40af", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: blue, display: "inline-block" }} />
              Active — Treatment
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fef3c7", color: "#92400e", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              SOL: {CASE.solDays} days
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#dcfce7", color: "#166534", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: green, display: "inline-block" }} />
              7 of 9 records
            </span>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <div className="pi-wrap" style={{ maxWidth: 1260, margin: "0 auto", padding: "24px 24px 80px" }}>

        {/* ── Demo context banner ── */}
        <div style={{ marginBottom: 20, padding: "24px 28px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, animation: "fadeInUp 0.4s ease-out forwards" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for a personal injury law firm.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>Medical records tracking, treatment summaries, demand letter generation, and e-signature workflows — all in one place. The final product is designed around how your firm actually runs cases. This is a starting point to show what&apos;s possible.</p>
        </div>

        {/* Case info bar */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "16px 20px", marginBottom: 20, animation: "fadeInUp 0.5s ease-out 0.1s both", display: "flex", flexWrap: "wrap", gap: "20px 40px" }}>
          {[
            { label: "Client", value: CASE.client },
            { label: "DOB", value: CASE.dob },
            { label: "Date of Injury", value: CASE.doi },
            { label: "Attorney", value: CASE.attorney },
            { label: "Paralegal", value: CASE.paralegal },
            { label: "Jurisdiction", value: CASE.jurisdiction },
            { label: "SOL Date", value: CASE.sol },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: 10, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: fontMono, fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: textDark }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="pi-metrics" style={{ marginBottom: 20, animation: "fadeInUp 0.5s ease-out 0.15s both" }}>
          {METRICS.map((m) => (
            <div key={m.label} style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.color }} />
              <div style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: fontMono, fontWeight: 500, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: textDark, lineHeight: 1.2 }}>{m.value}</div>
              <div style={{ fontSize: 12, color: muted, marginTop: 4 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="pi-tab-bar" role="tablist" style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: 4, marginBottom: 20, animation: "fadeInUp 0.5s ease-out 0.2s both" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "10px 16px",
                border: "none",
                borderRadius: 8,
                background: activeTab === tab.key ? navy : "transparent",
                color: activeTab === tab.key ? "#fff" : muted,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: fontBody,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ animation: "fadeInUp 0.3s ease-out forwards" }}>
          {activeTab === "records" && <RecordsTab />}
          {activeTab === "summary" && <SummaryTab />}
          {activeTab === "demand" && <DemandTab />}
          {activeTab === "signatures" && <SignaturesTab />}
        </div>
        {/* spacer for fixed button */}
        <div style={{ height: 64 }} />
      </div>

      {/* ── Fixed CTA pill ── */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100, display: "flex", gap: 10 }}>
        <Link
          href="/discovery-call"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
            background: "#c8ff00",
            color: "#0a0a0a",
            borderRadius: 9999,
            fontWeight: 700,
            fontSize: 14,
            fontFamily: fontBody,
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          Build this for my firm
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

/* ── Tab: Medical Records ── */
function RecordsTab() {
  const received = RECORDS.filter((r) => r.status === "received");
  const pending = RECORDS.filter((r) => r.status === "pending");
  const totalBilled = RECORDS.reduce((sum, r) => sum + parseFloat(r.billed.replace(/[$,]/g, "")), 0);
  const totalPages = RECORDS.reduce((sum, r) => sum + r.pages, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Summary row */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {[
          { label: "Total Providers", value: String(RECORDS.length), color: navy },
          { label: "Records Received", value: `${received.length} of ${RECORDS.length}`, color: green },
          { label: "Pages Collected", value: String(totalPages), color: blue },
          { label: "Total Billed", value: `$${totalBilled.toLocaleString()}`, color: amber },
        ].map((s) => (
          <div key={s.label} style={{ flex: "1 1 180px", background: card, border: `1px solid ${border}`, borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 10, color: muted, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: fontMono, fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Records table */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Medical Records Tracker</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="pi-records-table">
            <thead>
              <tr style={{ background: "#f9f8f6" }}>
                <th>Provider</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Pages</th>
                <th>Billed</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {RECORDS.map((r, i) => {
                const st = statusStyle(r.status);
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.provider}</td>
                    <td>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: r.type === "Surgical" ? "#ede9fe" : r.type === "Emergency" ? "#fee2e2" : "#f3f4f6", color: r.type === "Surgical" ? "#5b21b6" : r.type === "Emergency" ? "#991b1b" : "#374151", fontWeight: 500 }}>
                        {r.type}
                      </span>
                    </td>
                    <td style={{ fontFamily: fontMono, fontSize: 12 }}>{r.date}</td>
                    <td>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: st.bg, color: st.color, fontWeight: 600 }}>
                        {st.label}
                      </span>
                    </td>
                    <td style={{ fontFamily: fontMono }}>{r.pages || "—"}</td>
                    <td style={{ fontWeight: 600 }}>{r.billed}</td>
                    <td style={{ color: muted, fontSize: 12, maxWidth: 260 }}>{r.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending alerts */}
      {pending.length > 0 && (
        <div style={{ background: "#fffbeb", border: `1px solid #fde68a`, borderRadius: 12, padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>{pending.length} Records Still Pending</span>
          </div>
          {pending.map((r, i) => (
            <div key={i} style={{ fontSize: 13, color: "#78716c", marginBottom: 4 }}>
              <strong>{r.provider}</strong> — {r.notes}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Tab: Medical Summary ── */
function SummaryTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Treatment overview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Injury Summary</span>
          </div>
          {[
            { injury: "L4-L5 Disc Herniation", severity: "Severe", treatment: "Injections x3 + Microdiscectomy", status: "Post-surgical recovery" },
            { injury: "Cervical Strain/Sprain", severity: "Moderate", treatment: "PT — 48 sessions", status: "Improved, ongoing" },
            { injury: "PTSD — Driving Anxiety", severity: "Moderate", treatment: "Psychiatric care + therapy", status: "Active treatment" },
            { injury: "Chronic Pain Syndrome", severity: "Moderate", treatment: "Medication management", status: "Ongoing" },
            { injury: "Left Shoulder Contusion", severity: "Mild", treatment: "Conservative care", status: "Resolved" },
          ].map((inj, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < 4 ? `1px solid ${border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{inj.injury}</span>
                <span style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 4, fontWeight: 600,
                  background: inj.severity === "Severe" ? "#fee2e2" : inj.severity === "Moderate" ? "#fef3c7" : "#f3f4f6",
                  color: inj.severity === "Severe" ? "#991b1b" : inj.severity === "Moderate" ? "#92400e" : "#374151",
                }}>{inj.severity}</span>
              </div>
              <div style={{ fontSize: 12, color: muted }}>{inj.treatment}</div>
              <div style={{ fontSize: 12, color: inj.status === "Resolved" ? green : blue, fontWeight: 500, marginTop: 2 }}>{inj.status}</div>
            </div>
          ))}
        </div>

        {/* Treatment cost breakdown */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Cost by Provider Type</span>
          </div>
          {[
            { type: "Interventional Pain", amount: 42800, pct: 100, color: red },
            { type: "Surgery", amount: 28500, pct: 67, color: blue },
            { type: "Emergency / Hospital", amount: 18420, pct: 43, color: amber },
            { type: "Physical Therapy", amount: 12600, pct: 29, color: green },
            { type: "Orthopedics", amount: 8650, pct: 20, color: navy },
            { type: "Pain Management", amount: 6800, pct: 16, color: muted },
            { type: "Radiology", amount: 4200, pct: 10, color: "#7c3aed" },
            { type: "Psychiatric", amount: 3200, pct: 7, color: "#7c3aed" },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 500 }}>{item.type}</span>
                <span style={{ fontWeight: 700, fontFamily: fontMono }}>${item.amount.toLocaleString()}</span>
              </div>
              <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${border}`, paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Total Medical Specials</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: navy, fontFamily: fontMono }}>$127,450</span>
          </div>
        </div>
      </div>

      {/* Treatment timeline */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Treatment Timeline</span>
        </div>
        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 8, top: 4, bottom: 4, width: 2, background: border }} />
          {TIMELINE.map((t, i) => (
            <div key={i} style={{ position: "relative", paddingBottom: i < TIMELINE.length - 1 ? 16 : 0, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ position: "absolute", left: -22, top: 4, width: 12, height: 12, borderRadius: 9999, background: timelineIcon(t.type), border: `2px solid ${bg}` }} />
              <div>
                <div style={{ fontSize: 11, color: muted, fontFamily: fontMono, fontWeight: 500, marginBottom: 2 }}>{t.date}</div>
                <div style={{ fontSize: 13, color: textDark, lineHeight: 1.5 }}>{t.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Demand Letter ── */
function DemandTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Letter header */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "28px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: fontMono, fontWeight: 500, marginBottom: 4 }}>DEMAND FOR SETTLEMENT</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: textDark }}>{CASE.name}</div>
            <div style={{ fontSize: 13, color: muted, marginTop: 4 }}>Case No. {CASE.caseNumber} &middot; {CASE.jurisdiction}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: navy, fontFamily: fontMono }}>{DEMAND_SECTIONS.totalDemand}</div>
            <div style={{ fontSize: 12, color: muted }}>Total demand amount</div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${border}`, paddingTop: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: muted, marginBottom: 8 }}>
            <strong style={{ color: textDark }}>TO:</strong> Liberty Mutual Insurance Company<br />
            <strong style={{ color: textDark }}>RE:</strong> Insured — ABC Trucking, Inc. / Policy #COM-2025-881247<br />
            <strong style={{ color: textDark }}>FROM:</strong> Chen & Associates, PLLC — Counsel for Maria Rodriguez<br />
            <strong style={{ color: textDark }}>DATE:</strong> April 10, 2026
          </div>
        </div>

        {/* Liability section */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: navy, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            I. Liability
          </h3>
          <div style={{ fontSize: 14, color: "#44403c", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
            {DEMAND_SECTIONS.liability}
          </div>
        </div>

        {/* Injuries section */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: navy, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            II. Injuries & Treatment
          </h3>
          <div style={{ fontSize: 14, color: "#44403c", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
            {DEMAND_SECTIONS.injuries}
          </div>
        </div>

        {/* Damages breakdown */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: navy, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            III. Damages
          </h3>

          <div style={{ background: "#f9f8f6", borderRadius: 10, padding: "18px 22px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: fontMono, marginBottom: 10 }}>Medical Expenses</div>
            <table className="pi-damages-table">
              <tbody>
                {DEMAND_SECTIONS.damages.map((d, i) => (
                  <tr key={i}>
                    <td style={{ color: "#44403c" }}>{d.category}</td>
                    <td style={{ textAlign: "right", fontWeight: 600, fontFamily: fontMono }}>{d.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 700, paddingTop: 12, borderTop: `2px solid ${border}` }}>Subtotal — Medical</td>
                  <td style={{ textAlign: "right", fontWeight: 800, fontFamily: fontMono, fontSize: 16, paddingTop: 12, borderTop: `2px solid ${border}`, color: navy }}>{DEMAND_SECTIONS.totalMedical}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: "#f9f8f6", borderRadius: 10, padding: "18px 22px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: fontMono, marginBottom: 10 }}>Other Damages</div>
            <table className="pi-damages-table">
              <tbody>
                <tr>
                  <td>Lost Wages (6 months)</td>
                  <td style={{ textAlign: "right", fontWeight: 600, fontFamily: fontMono }}>{DEMAND_SECTIONS.lostWages}</td>
                </tr>
                <tr>
                  <td>Lost Earning Capacity</td>
                  <td style={{ textAlign: "right", fontWeight: 600, fontFamily: fontMono }}>{DEMAND_SECTIONS.lostEarningCapacity}</td>
                </tr>
                <tr>
                  <td>Pain & Suffering / Mental Anguish</td>
                  <td style={{ textAlign: "right", fontWeight: 600, fontFamily: fontMono }}>{DEMAND_SECTIONS.painSuffering}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total demand */}
          <div style={{ background: navy, borderRadius: 10, padding: "20px 24px", marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>TOTAL DEMAND</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: fontMono }}>{DEMAND_SECTIONS.totalDemand}</span>
          </div>
        </div>

        {/* Closing */}
        <div style={{ fontSize: 14, color: "#44403c", lineHeight: 1.8, borderTop: `1px solid ${border}`, paddingTop: 20 }}>
          <p style={{ marginBottom: 12 }}>
            Based on the severity of Ms. Rodriguez&apos;s injuries, the clear liability of the defendant, the extensive medical treatment required including surgery, and the permanent impact on Ms. Rodriguez&apos;s quality of life, we demand the sum of <strong>{DEMAND_SECTIONS.totalDemand}</strong> to resolve this matter.
          </p>
          <p style={{ marginBottom: 12 }}>
            This demand is open for <strong>thirty (30) days</strong> from the date of this letter. If we are unable to reach a resolution, we will proceed with filing suit in Harris County District Court.
          </p>
          <p style={{ marginBottom: 0 }}>
            Respectfully submitted,<br />
            <strong>James Chen, Esq.</strong><br />
            Chen & Associates, PLLC<br />
            Counsel for Plaintiff Maria Rodriguez
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Signatures ── */
function SignaturesTab() {
  const signed = SIGNATURES.filter((s) => s.status === "signed");
  const pending = SIGNATURES.filter((s) => s.status !== "signed");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Progress */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Signature Progress</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: navy }}>{signed.length} of {SIGNATURES.length} complete</span>
        </div>
        <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", width: `${(signed.length / SIGNATURES.length) * 100}%`, background: green, borderRadius: 4, transition: "width 0.3s" }} />
        </div>
        <div style={{ fontSize: 12, color: muted }}>{pending.length} signatures remaining to finalize the demand package</div>
      </div>

      {/* Signature cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
        {SIGNATURES.map((sig, i) => {
          const st = sigStatusStyle(sig.status);
          return (
            <div key={i} style={{ background: card, border: `1px solid ${sig.status === "signed" ? "#bbf7d0" : border}`, borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
              {sig.status === "signed" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: green }} />}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{sig.name}</div>
                  <div style={{ fontSize: 12, color: muted }}>{sig.role}</div>
                </div>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 4, background: st.bg, color: st.color, fontWeight: 600 }}>
                  {st.label}
                </span>
              </div>
              {sig.status === "signed" ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: green }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Signed on {sig.date}
                </div>
              ) : sig.status === "pending" ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: amber }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Signature request sent — awaiting response
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: muted }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Will be sent after all internal signatures are collected
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Document checklist */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Demand Package Checklist</span>
        </div>
        {[
          { item: "Demand letter drafted", done: true },
          { item: "Medical records compiled (7 of 9)", done: false },
          { item: "Medical bills summary attached", done: true },
          { item: "Lost wage documentation", done: true },
          { item: "Police report attached", done: true },
          { item: "Photos / scene evidence", done: true },
          { item: "Client signature — authorization to settle", done: true },
          { item: "Attorney signature", done: true },
          { item: "Treating physician narrative (Dr. Patel)", done: false },
          { item: "Psychiatric evaluation report (Dr. Williams)", done: false },
          { item: "Send to adjuster — Liberty Mutual", done: false },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 10 ? `1px solid ${border}` : "none" }}>
            {c.done ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${border}` }} />
            )}
            <span style={{ fontSize: 13, color: c.done ? muted : textDark, textDecoration: c.done ? "line-through" : "none" }}>{c.item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
