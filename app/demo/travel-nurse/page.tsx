"use client";

import { useState } from "react";

/* ─── Data ─── */
const NURSES = [
  { name: "Ashley Kowalski, RN", spec: "ICU", yrs: 6, status: "ready" as const, docs: 12, total: 12, missing: null, activity: "File packet ready Apr 21" },
  { name: "Marcus Bell, RN", spec: "Med-Surg / Tele", yrs: 4, status: "cred" as const, docs: 9, total: 12, missing: "BLS, skills checklist, TB", activity: "BLS renewal scheduled 5/2" },
  { name: "Priya Menon, RN", spec: "Labor & Delivery", yrs: 8, status: "ready" as const, docs: 12, total: 12, missing: null, activity: "Available May 20+" },
  { name: "Jordan Webb, RN", spec: "OR Circulator", yrs: 5, status: "placed" as const, docs: 12, total: 12, missing: null, activity: "On contract at Tallahassee Regional" },
  { name: "Luis Ortega, RN", spec: "ER", yrs: 3, status: "intake" as const, docs: 4, total: 12, missing: "License, refs, physical", activity: "Intake started 5d ago" },
  { name: "Nadia Patel, RN", spec: "PACU", yrs: 7, status: "ready" as const, docs: 12, total: 12, missing: null, activity: "Compact license verified" },
  { name: "Kevin Park, RN", spec: "NICU", yrs: 5, status: "cred" as const, docs: 10, total: 12, missing: "NRP cert, unit competency", activity: "NRP exam 5/6" },
  { name: "Ellie Rhodes, RN", spec: "Med-Surg", yrs: 2, status: "placed" as const, docs: 12, total: 12, missing: null, activity: "On contract at Gwinnett Community" },
  { name: "Ray Okafor, RN", spec: "Cath Lab", yrs: 9, status: "ready" as const, docs: 12, total: 12, missing: null, activity: "Available Jun 1" },
  { name: "Sofia Marquez, RN", spec: "Peds ER", yrs: 4, status: "cred" as const, docs: 7, total: 12, missing: "PALS, I-9, drug screen", activity: "Intake review Apr 19" },
  { name: "Devon Hayes, RN", spec: "Tele / Step-down", yrs: 6, status: "placed" as const, docs: 12, total: 12, missing: null, activity: "On contract at Memorial Jacksonville" },
];

const PIPELINE = {
  cred: [
    { name: "Marcus Bell, RN", detail: "Med-Surg/Tele \u00b7 3 docs outstanding", progress: "75% complete", tags: ["NLC", "FL"] },
    { name: "Kevin Park, RN", detail: "NICU \u00b7 NRP pending", progress: "83% complete", tags: ["TX"] },
    { name: "Sofia Marquez, RN", detail: "Peds ER \u00b7 PALS, I-9, drug screen", progress: "58% complete", tags: ["NLC", "GA"] },
    { name: "Luis Ortega, RN", detail: "ER \u00b7 Intake stage", progress: "33% complete", tags: ["GA"] },
  ],
  ready: [
    { name: "Ashley Kowalski, RN", detail: "ICU \u00b7 6 years", progress: "Available now", tags: ["NLC"] },
    { name: "Priya Menon, RN", detail: "Labor & Delivery", progress: "Avail May 20", tags: ["FL", "AL"] },
    { name: "Nadia Patel, RN", detail: "PACU", progress: "Available now", tags: ["NLC"] },
    { name: "Ray Okafor, RN", detail: "Cath Lab", progress: "Available Jun 1", tags: ["NC", "SC"] },
  ],
  placed: [
    { name: "Jordan Webb, RN", detail: "Tallahassee Regional \u00b7 OR", progress: "13wk thru Jul 28", tags: ["FL"] },
    { name: "Ellie Rhodes, RN", detail: "Gwinnett Community \u00b7 Med-Surg", progress: "13wk thru Jun 14", tags: ["GA"] },
    { name: "Devon Hayes, RN", detail: "Memorial Jacksonville \u00b7 Tele", progress: "13wk thru Aug 9", tags: ["FL"] },
  ],
};

const CONTRACTS = [
  { facility: "Tallahassee Regional Medical Center", meta: "Tallahassee, FL \u00b7 400-bed acute care", spec: "ICU", dates: "May 11 \u2014 Aug 10", datesMeta: "13 week \u00b7 36 hrs/wk", shift: "Nights, 7p\u20137a", rate: "$2,640/wk", urgent: true },
  { facility: "Gwinnett Community Hospital", meta: "Lawrenceville, GA \u00b7 Community hospital", spec: "Med-Surg / Telemetry", dates: "May 18 \u2014 Aug 17", datesMeta: "13 week \u00b7 36 hrs/wk", shift: "Nights", rate: "$1,980/wk", urgent: false },
  { facility: "Columbus Memorial", meta: "Columbus, GA \u00b7 Level II trauma", spec: "ER", dates: "May 25 \u2014 Aug 24", datesMeta: "13 week \u00b7 48 hrs/wk", shift: "Mixed", rate: "$2,880/wk", urgent: true },
  { facility: "Valdosta Women\u2019s Center", meta: "Valdosta, GA \u00b7 OB hospital", spec: "Labor & Delivery", dates: "Jun 1 \u2014 Aug 30", datesMeta: "13 week \u00b7 36 hrs/wk", shift: "Days", rate: "$2,420/wk", urgent: false },
  { facility: "Brunswick Rural Health", meta: "Brunswick, GA \u00b7 Critical access", spec: "Med-Surg", dates: "Jun 8 \u2014 Sep 6", datesMeta: "13 week \u00b7 36 hrs/wk", shift: "Nights", rate: "$1,760/wk", urgent: false },
  { facility: "Dothan Memorial", meta: "Dothan, AL \u00b7 Community hospital", spec: "OR Circulator", dates: "Jun 15 \u2014 Sep 14", datesMeta: "13 week \u00b7 40 hrs/wk", shift: "Days, call required", rate: "$2,560/wk", urgent: false },
  { facility: "Savannah Behavioral Health", meta: "Savannah, GA \u00b7 Inpatient psych", spec: "Behavioral / Psych RN", dates: "Jun 22 \u2014 Sep 21", datesMeta: "13 week \u00b7 36 hrs/wk", shift: "Nights", rate: "$1,920/wk", urgent: true },
];

const TIMESHEETS = [
  { nurse: "Jordan Webb, RN", facility: "Tallahassee Regional", week: "Apr 13 \u2014 Apr 19", hours: 36, rate: "$58/hr bill", total: "$2,088", status: "pending" as const },
  { nurse: "Ellie Rhodes, RN", facility: "Gwinnett Community", week: "Apr 13 \u2014 Apr 19", hours: 36, rate: "$55/hr bill", total: "$1,980", status: "pending" as const },
  { nurse: "Devon Hayes, RN", facility: "Memorial Jacksonville", week: "Apr 13 \u2014 Apr 19", hours: 48, rate: "$52/hr bill", total: "$2,784", status: "flagged" as const },
  { nurse: "Jordan Webb, RN", facility: "Tallahassee Regional", week: "Apr 20 \u2014 Apr 22", hours: 24, rate: "$58/hr bill", total: "$1,392", status: "pending" as const },
  { nurse: "Jordan Webb, RN", facility: "Tallahassee Regional", week: "Apr 6 \u2014 Apr 12", hours: 36, rate: "$58/hr bill", total: "$2,088", status: "approved" as const },
  { nurse: "Ellie Rhodes, RN", facility: "Gwinnett Community", week: "Apr 6 \u2014 Apr 12", hours: 36, rate: "$55/hr bill", total: "$1,980", status: "approved" as const },
];

const CRED_DATA = [
  { name: "Ashley Kowalski, RN", spec: "ICU", items: [
    { label: "RN license \u2014 multistate (NLC)", status: "valid", detail: "Exp 11/30/2027" },
    { label: "BLS (AHA)", status: "valid", detail: "Exp 06/2027" },
    { label: "ACLS (AHA)", status: "valid", detail: "Exp 06/2027" },
    { label: "ICU skills checklist", status: "valid", detail: "Signed 04/12" },
    { label: "Annual competency modules", status: "valid", detail: "12 of 12 complete" },
    { label: "TB test / PPD", status: "valid", detail: "Cleared 03/14" },
    { label: "Physical exam", status: "valid", detail: "Completed 03/10" },
    { label: "Drug screen (10-panel)", status: "valid", detail: "Negative 03/09" },
    { label: "Immunization record", status: "valid", detail: "Complete (Hep B, MMR, flu, COVID)" },
    { label: "Background check", status: "valid", detail: "Clean 03/18" },
    { label: "OIG / SAM exclusion", status: "valid", detail: "Clean" },
    { label: "I-9 / work authorization", status: "valid", detail: "Verified 03/18" },
  ]},
  { name: "Marcus Bell, RN", spec: "Med-Surg / Telemetry", items: [
    { label: "RN license \u2014 Georgia", status: "valid", detail: "Exp 09/2027" },
    { label: "RN license \u2014 multistate (NLC)", status: "pending", detail: "Application 04/08" },
    { label: "BLS (AHA)", status: "missing", detail: "Renewal 5/2 scheduled" },
    { label: "Med-Surg skills checklist", status: "missing", detail: "Not yet submitted" },
    { label: "Telemetry competency / EKG", status: "valid", detail: "Passed 04/04" },
    { label: "Annual competency modules", status: "valid", detail: "12 of 12 complete" },
    { label: "TB test / PPD", status: "missing", detail: "Requires QFT" },
    { label: "Physical exam", status: "valid", detail: "Completed 04/01" },
    { label: "Drug screen (10-panel)", status: "valid", detail: "Negative 04/01" },
    { label: "Immunization record", status: "valid", detail: "Complete" },
    { label: "Background check", status: "valid", detail: "Clean 04/05" },
    { label: "I-9 / work authorization", status: "valid", detail: "Verified 04/05" },
  ]},
  { name: "Priya Menon, RN", spec: "Labor & Delivery", items: [
    { label: "RN license \u2014 Florida", status: "valid", detail: "Exp 07/2027" },
    { label: "RN license \u2014 Alabama", status: "valid", detail: "Exp 05/2027" },
    { label: "BLS (AHA)", status: "valid", detail: "Exp 08/2027" },
    { label: "ACLS (AHA)", status: "valid", detail: "Exp 08/2027" },
    { label: "NRP certification", status: "valid", detail: "Exp 04/2027" },
    { label: "L&D fetal monitoring (AWHONN)", status: "valid", detail: "Current" },
    { label: "L&D skills checklist", status: "valid", detail: "Signed 03/28" },
    { label: "Annual competency modules", status: "valid", detail: "12 of 12 complete" },
    { label: "TB test / PPD", status: "valid", detail: "Cleared 02/22" },
    { label: "Drug screen (10-panel)", status: "valid", detail: "Negative 02/22" },
    { label: "Immunization record", status: "valid", detail: "Complete" },
    { label: "Background check", status: "valid", detail: "Clean 03/01" },
  ]},
  { name: "Jordan Webb, RN", spec: "OR Circulator", items: [
    { label: "RN license \u2014 Florida", status: "valid", detail: "Exp 07/2027" },
    { label: "BLS (AHA)", status: "valid", detail: "Exp 10/2026" },
    { label: "ACLS (AHA)", status: "valid", detail: "Exp 10/2026" },
    { label: "CNOR certification", status: "valid", detail: "Exp 02/2028" },
    { label: "OR circulator skills checklist", status: "valid", detail: "Signed 02/14" },
    { label: "Annual competency modules", status: "valid", detail: "12 of 12 complete" },
    { label: "TB test / PPD", status: "valid", detail: "Cleared 01/30" },
    { label: "Physical exam", status: "valid", detail: "Completed 01/25" },
    { label: "Drug screen (10-panel)", status: "valid", detail: "Negative 01/25" },
    { label: "Immunization record", status: "valid", detail: "Complete" },
    { label: "Background check", status: "valid", detail: "Clean 02/02" },
    { label: "I-9 / work authorization", status: "valid", detail: "Verified 02/02" },
  ]},
];

const CALENDAR_EVENTS: Record<number, { type: string; label: string }> = {
  4: { type: "placed", label: "Webb OR" }, 5: { type: "placed", label: "Webb OR" }, 6: { type: "placed", label: "Webb OR" },
  7: { type: "placed", label: "Webb OR" }, 8: { type: "placed", label: "Webb OR" },
  11: { type: "need", label: "ICU start" }, 12: { type: "need", label: "Tallahassee" }, 13: { type: "need", label: "Tallahassee" },
  18: { type: "need", label: "Med-Surg start" }, 19: { type: "need", label: "Gwinnett" },
  20: { type: "avail", label: "Menon avail" }, 21: { type: "avail", label: "Menon avail" }, 22: { type: "avail", label: "Menon avail" },
  23: { type: "placed", label: "Rhodes Med-Surg" }, 24: { type: "placed", label: "Rhodes" },
  25: { type: "need", label: "ER start" }, 26: { type: "need", label: "Columbus" }, 27: { type: "need", label: "Columbus" },
  29: { type: "avail", label: "Okafor avail" },
};

/* ─── Colors ─── */
const C = {
  bg: "#F8F7F5", surface: "#ffffff", border: "#e5e5e5", borderStrong: "#d1d5db",
  ink: "#1a1a1a", ink2: "#374151", ink3: "#6b7280", muted: "#9ca3af",
  accent: "#1F4A3D", accentSoft: "#E8F0EC", accentInk: "#0F3529",
  green: "#16a34a", greenBg: "#f0fdf4", greenBorder: "#bbf7d0", greenInk: "#166534", greenText: "#15803d",
  amber: "#d97706", amberBg: "#fffbeb", amberBorder: "#fde68a", amberInk: "#92400e",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fecaca", redInk: "#7f1d1d",
  blue: "#1e4b8a", blueBg: "#e3ecf8",
};

const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  ready: { bg: C.greenBg, color: C.green, label: "Ready" },
  cred: { bg: C.amberBg, color: C.amber, label: "Credentialing" },
  placed: { bg: C.blueBg, color: C.blue, label: "On assignment" },
  intake: { bg: "#f3f4f6", color: C.ink3, label: "Intake" },
};

const TS_STATUS: Record<string, { bg: string; color: string; label: string }> = {
  pending: { bg: C.amberBg, color: C.amber, label: "Pending" },
  flagged: { bg: C.redBg, color: C.red, label: "Flagged" },
  approved: { bg: C.greenBg, color: C.green, label: "Approved" },
};

function initials(name: string) {
  return name.replace(/,\s*RN$/, "").split(" ").map(p => p[0]).slice(0, 2).join("");
}

/* ─── Page ─── */
const TABS = ["nurses", "pipeline", "contracts", "calendar", "timesheets", "credentialing"] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = {
  nurses: "Nurses", pipeline: "Pipeline", contracts: "Open Contracts",
  calendar: "Calendar", timesheets: "Timesheets", credentialing: "Credentialing",
};
const TAB_COUNTS: Partial<Record<Tab, number>> = { nurses: 26, contracts: 7, timesheets: 4 };

export default function StaffboardDemo() {
  const [tab, setTab] = useState<Tab>("nurses");
  const [search, setSearch] = useState("");
  const [credIdx, setCredIdx] = useState(0);

  const filteredNurses = search
    ? NURSES.filter(n => n.name.toLowerCase().includes(search.toLowerCase()) || n.spec.toLowerCase().includes(search.toLowerCase()))
    : NURSES;

  const cred = CRED_DATA[credIdx];
  const credValid = cred.items.filter(i => i.status === "valid").length;
  const credTotal = cred.items.length;
  const credAllGood = credValid === credTotal;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.ink, fontFamily: "-apple-system, 'Segoe UI', sans-serif", fontSize: 14 }}>
      <style>{`
        body { background: ${C.bg} !important; color: ${C.ink} !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) {
          .sb-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .sb-kanban { grid-template-columns: 1fr !important; }
          .sb-contract { grid-template-columns: 1fr !important; gap: 8px !important; }
          .sb-ts { grid-template-columns: 1fr !important; gap: 8px !important; }
          .sb-table-wrap { overflow-x: auto; }
          .sb-tabs { overflow-x: auto; scrollbar-width: none; }
          .sb-tabs::-webkit-scrollbar { display: none; }
          .sb-head { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 480px) {
          .sb-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Top bar */}
      <header style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 10, animation: "fadeInUp 0.5s ease-out forwards" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="/" style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textDecoration: "none", letterSpacing: -0.5 }}>martin<span style={{ color: C.accent }}>.builds</span></a>
            <span style={{ color: C.border }}>|</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: C.accent, color: "#fff", display: "grid", placeItems: "center", fontSize: 16, fontWeight: 700, fontStyle: "italic" }}>S</div>
              <span style={{ fontSize: 20, fontWeight: 700, color: C.ink, fontStyle: "italic" }}>Staffboard</span>
            </div>
            <span style={{ fontSize: 11, color: C.ink3, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", border: `1px solid ${C.border}`, borderRadius: 20 }}>Demo</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 4px 4px", border: `1px solid ${C.border}`, borderRadius: 24, background: C.surface }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.accentSoft, color: C.accentInk, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 500 }}>R</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>Recruiter</div>
              <div style={{ fontSize: 11, color: C.ink3 }}>Signed in</div>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px 80px" }}>
        {/* Demo banner */}
        <div style={{ padding: "24px 28px", background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 12, marginBottom: 28, animation: "fadeInUp 0.4s ease-out forwards" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.greenInk, marginBottom: 6 }}>This is a dashboard concept for a travel nurse staffing agency.</p>
          <p style={{ margin: 0, fontSize: 14, color: C.greenText, lineHeight: 1.6 }}>Nurse roster, credentialing tracker, contract pipeline, and timesheet approval \u2014 all in one view. The final product is designed around how your agency actually runs.</p>
        </div>

        {/* Header + Stats */}
        <div className="sb-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 700, letterSpacing: -1, lineHeight: 1.1, margin: 0 }}>Recruiter <em style={{ fontStyle: "italic", color: C.accent }}>dashboard</em></h1>
            <p style={{ color: C.ink2, marginTop: 6, fontSize: 14, maxWidth: 540 }}>11 travel nurses ready to submit against 7 open contracts. Four timesheets are awaiting review.</p>
          </div>
          <div className="sb-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(110px, 1fr))", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
            {[
              { label: "My nurses", value: "26", color: C.ink },
              { label: "Submission-ready", value: "11", color: C.green },
              { label: "Open contracts", value: "7", color: C.ink },
              { label: "Pending sheets", value: "4", color: C.amber },
            ].map(s => (
              <div key={s.label} style={{ background: C.surface, padding: "12px 16px" }}>
                <div style={{ fontSize: 11, color: C.ink3, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1.1, marginTop: 4 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="sb-tabs" style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "10px 16px", fontSize: 13, color: tab === t ? C.ink : C.ink3,
              borderBottom: `2px solid ${tab === t ? C.accent : "transparent"}`, marginBottom: -1,
              whiteSpace: "nowrap", fontWeight: tab === t ? 500 : 400, background: "none", cursor: "pointer",
            }}>
              {TAB_LABELS[t]}
              {TAB_COUNTS[t] !== undefined && (
                <span style={{ marginLeft: 6, background: tab === t ? C.accentSoft : "#f3f4f6", color: tab === t ? C.accentInk : C.ink3, fontSize: 11, padding: "1px 7px", borderRadius: 10 }}>{TAB_COUNTS[t]}</span>
              )}
            </button>
          ))}
        </div>

        {/* ─── NURSES TAB ─── */}
        {tab === "nurses" && (
          <div style={{ animation: "fadeInUp 0.2s ease" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search nurses by name or specialty\u2026" style={{ flex: 1, minWidth: 200, maxWidth: 320, padding: "7px 10px", border: `1px solid ${C.borderStrong}`, borderRadius: 6, fontSize: 13, background: C.surface, color: C.ink }} />
              <button style={{ ...btnStyle }}>All statuses</button>
              <button style={{ ...btnStyle }}>Specialty</button>
              <div style={{ marginLeft: "auto" }}><button style={{ ...btnStyle, background: C.accent, color: "#fff", borderColor: C.accent }}>+ Add nurse</button></div>
            </div>
            <div className="sb-table-wrap" style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 700 }}>
                <thead>
                  <tr>
                    {["Nurse", "Status", "File completion", "Missing", "Last activity", ""].map(h => (
                      <th key={h} style={{ textAlign: "left", fontWeight: 500, fontSize: 11, color: C.ink3, textTransform: "uppercase", letterSpacing: 1, padding: "11px 18px", background: "#f4f3ee", borderBottom: `1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredNurses.map(n => {
                    const pct = Math.round((n.docs / n.total) * 100);
                    const st = STATUS_MAP[n.status];
                    return (
                      <tr key={n.name} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.accentSoft, color: C.accentInk, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 500, flexShrink: 0 }}>{initials(n.name)}</div>
                            <div>
                              <div style={{ fontWeight: 500 }}>{n.name}</div>
                              <div style={{ fontSize: 12, color: C.ink3 }}>{n.spec} &middot; {n.yrs} yrs</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "3px 9px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.color, textTransform: "uppercase", letterSpacing: 0.5 }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                            {st.label}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 72, height: 5, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? C.green : pct >= 70 ? C.amber : C.red, borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 12, color: C.ink3 }}>{n.docs}/{n.total}</span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: 12, color: n.missing ? C.amber : C.ink3, fontWeight: n.missing ? 500 : 400 }}>{n.missing || "\u2014"}</td>
                        <td style={{ padding: "14px 18px", fontSize: 12, color: C.ink3 }}>{n.activity}</td>
                        <td style={{ padding: "14px 18px", textAlign: "right" }}><button style={{ ...btnStyle, padding: "5px 10px", fontSize: 12 }}>View</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── PIPELINE TAB ─── */}
        {tab === "pipeline" && (
          <div className="sb-kanban" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, animation: "fadeInUp 0.2s ease" }}>
            {([
              { key: "cred", title: "Credentialing in progress", dot: C.amber, data: PIPELINE.cred },
              { key: "ready", title: "Ready to submit", dot: C.green, data: PIPELINE.ready },
              { key: "placed", title: "On assignment", dot: C.blue, data: PIPELINE.placed },
            ] as const).map(col => (
              <div key={col.key} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, minHeight: 300 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, padding: "0 2px" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: col.dot, display: "inline-block" }} />
                    {col.title}
                  </div>
                  <span style={{ fontSize: 11, color: C.ink3 }}>{col.data.length} nurses</span>
                </div>
                {col.data.map(p => (
                  <div key={p.name} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "11px 12px", marginBottom: 8, cursor: "pointer" }}>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>{p.detail}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
                      <span style={{ fontSize: 11, color: C.ink3 }}>{p.progress}</span>
                      <div style={{ display: "flex", gap: 4 }}>
                        {p.tags.map(t => <span key={t} style={{ fontSize: 10, padding: "2px 6px", background: "#f3f4f6", color: C.ink3, borderRadius: 3 }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ─── CONTRACTS TAB ─── */}
        {tab === "contracts" && (
          <div style={{ animation: "fadeInUp 0.2s ease" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <input type="text" placeholder="Search facility or specialty\u2026" style={{ flex: 1, minWidth: 200, maxWidth: 320, padding: "7px 10px", border: `1px solid ${C.borderStrong}`, borderRadius: 6, fontSize: 13, background: C.surface, color: C.ink }} />
              <button style={{ ...btnStyle }}>Urgent only</button>
              <button style={{ ...btnStyle }}>Compact states</button>
              <div style={{ marginLeft: "auto" }}><button style={{ ...btnStyle, background: C.accent, color: "#fff", borderColor: C.accent }}>+ Log new contract</button></div>
            </div>
            {CONTRACTS.map(r => (
              <div className="sb-contract" key={r.facility + r.spec} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 10, display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.7fr auto", gap: 20, alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{r.facility}</div>
                  <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{r.meta} &middot; <strong style={{ fontWeight: 500, color: C.ink2 }}>{r.spec}</strong></div>
                </div>
                <div>
                  <div style={{ fontSize: 13 }}>{r.dates}</div>
                  <div style={{ fontSize: 11, color: C.ink3, marginTop: 2 }}>{r.datesMeta}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13 }}>{r.shift}</div>
                  <div style={{ fontSize: 12, color: C.ink3 }}>{r.rate} gross</div>
                </div>
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "3px 9px", borderRadius: 20, fontWeight: 500, background: r.urgent ? C.redBg : "#f3f4f6", color: r.urgent ? C.red : C.ink3, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                    {r.urgent ? "Urgent" : "Open"}
                  </span>
                </div>
                <div><button style={{ ...btnStyle }}>Submit nurse</button></div>
              </div>
            ))}
          </div>
        )}

        {/* ─── CALENDAR TAB ─── */}
        {tab === "calendar" && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, animation: "fadeInUp 0.2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontStyle: "italic" }}>May 2026</div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.ink2 }}>
                {[{ c: C.green, l: "Nurse available" }, { c: C.blue, l: "On assignment" }, { c: C.red, l: "Contract start" }].map(x => (
                  <span key={x.l} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: x.c, display: "inline-block" }} />{x.l}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} style={{ fontSize: 11, color: C.ink3, textTransform: "uppercase", letterSpacing: 1, textAlign: "center", padding: "4px 0" }}>{d}</div>
              ))}
              {/* May 2026 starts on Friday (offset 5) */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`e${i}`} style={{ aspectRatio: "1.3", border: `1px dashed ${C.border}`, borderRadius: 6, minHeight: 64 }} />
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                const d = i + 1;
                const ev = CALENDAR_EVENTS[d];
                const isToday = d === 23;
                const evColors: Record<string, { bg: string; color: string }> = {
                  avail: { bg: C.greenBg, color: C.green }, placed: { bg: C.blueBg, color: C.blue }, need: { bg: C.redBg, color: C.red },
                };
                return (
                  <div key={d} style={{ aspectRatio: "1.3", border: `1px solid ${isToday ? C.accent : C.border}`, borderRadius: 6, padding: "6px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 64, background: isToday ? C.accentSoft : C.surface }}>
                    <div style={{ fontSize: 12, color: isToday ? C.accentInk : C.ink3, fontWeight: isToday ? 600 : 500 }}>{d}</div>
                    {ev && (
                      <div style={{ fontSize: 10, padding: "2px 5px", borderRadius: 3, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", background: evColors[ev.type]?.bg, color: evColors[ev.type]?.color }}>{ev.label}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── TIMESHEETS TAB ─── */}
        {tab === "timesheets" && (
          <div style={{ animation: "fadeInUp 0.2s ease" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <button style={{ ...btnStyle }}>Pending review</button>
              <button style={{ ...btnStyle }}>Flagged</button>
              <button style={{ ...btnStyle }}>Approved</button>
              <div style={{ marginLeft: "auto" }}><button style={{ ...btnStyle, background: C.accent, color: "#fff", borderColor: C.accent }}>Export for payroll</button></div>
            </div>
            {TIMESHEETS.map((t, i) => {
              const st = TS_STATUS[t.status];
              return (
                <div className="sb-ts" key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 8, display: "grid", gridTemplateColumns: "1.4fr 1fr 0.6fr 0.7fr 0.9fr auto", gap: 16, alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{t.nurse}</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{t.facility}</div>
                  </div>
                  <div style={{ fontSize: 12, color: C.ink2 }}>{t.week}</div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{t.hours}</div>
                    <div style={{ fontSize: 10, color: C.ink3, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>hours</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: C.ink }}>{t.total}</div>
                    <div style={{ fontSize: 11, color: C.ink3, marginTop: 2 }}>{t.rate}</div>
                  </div>
                  <div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "3px 9px", borderRadius: 20, fontWeight: 500, background: st.bg, color: st.color, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
                      {st.label}
                    </span>
                  </div>
                  <div><button style={{ ...btnStyle, padding: "5px 10px", fontSize: 12 }}>{t.status === "approved" ? "View" : "Review"}</button></div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── CREDENTIALING TAB ─── */}
        {tab === "credentialing" && (
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", animation: "fadeInUp 0.2s ease" }}>
            <div style={{ padding: 20, display: "flex", gap: 12, alignItems: "center", borderBottom: `1px solid ${C.border}`, flexWrap: "wrap" }}>
              <select value={credIdx} onChange={e => setCredIdx(Number(e.target.value))} style={{ flex: 1, minWidth: 280, padding: "7px 10px", border: `1px solid ${C.borderStrong}`, borderRadius: 6, fontSize: 13, background: C.surface, color: C.ink }}>
                {CRED_DATA.map((c, i) => <option key={i} value={i}>{c.name} \u2014 {c.spec}</option>)}
              </select>
              <button style={{ ...btnStyle, background: C.accent, color: "#fff", borderColor: C.accent }}>Run one-click check</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 12, marginBottom: 20, background: credAllGood ? C.greenBg : C.amberBg, border: `1px solid ${credAllGood ? C.green : C.amber}` }}>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, fontStyle: "italic", color: credAllGood ? C.green : C.amber }}>{credAllGood ? "Submission ready" : "Gaps to resolve"}</div>
                  <div style={{ fontSize: 12, color: credAllGood ? C.green : C.amber, marginTop: 2 }}>{cred.name} &middot; {cred.spec}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 36, fontWeight: 700, fontStyle: "italic", color: credAllGood ? C.green : C.amber }}>{credValid}/{credTotal}</div>
                  <div style={{ fontSize: 12, color: credAllGood ? C.green : C.amber }}>verified</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {cred.items.map(item => {
                  const iconColors: Record<string, { bg: string; text: string }> = {
                    valid: { bg: C.green, text: "#fff" }, pending: { bg: C.amber, text: "#fff" }, missing: { bg: C.red, text: "#fff" },
                  };
                  const iconSymbol: Record<string, string> = { valid: "\u2713", pending: "\u2026", missing: "\u2715" };
                  const ic = iconColors[item.status] || iconColors.missing;
                  return (
                    <div key={item.label} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 14, alignItems: "center", padding: "12px 14px", background: "#f4f3ee", borderRadius: 8 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600, background: ic.bg, color: ic.text }}>{iconSymbol[item.status]}</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: C.ink3 }}>{item.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* spacer */}
        <div style={{ height: 64 }} />

        {/* Demo note */}
        <div style={{ padding: "16px 20px", background: "#f4f3ee", border: `1px dashed ${C.borderStrong}`, borderRadius: 12, fontSize: 12, color: C.ink3, display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 10, padding: "3px 8px", background: C.accent, color: "#fff", borderRadius: 3, textTransform: "uppercase", letterSpacing: 1 }}>Demo</span>
          <div><strong style={{ color: C.ink, fontWeight: 500 }}>Whitelabel sales demo.</strong> Sample data only. Product is rebranded per agency \u2014 swap logo, colors, competency checklists, and pay package structure to match your operation.</div>
        </div>
      </div>

      {/* Fixed CTA */}
      <a
        href="/discovery-call"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50, borderRadius: 9999, background: "#1f2937", padding: "12px 20px", fontSize: 14, fontWeight: 600, color: "#ffffff", textDecoration: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)", animation: "fadeInUp 0.5s ease-out 0.5s forwards", opacity: 0 }}
      >
        I want this for my business
      </a>
    </div>
  );
}

const btnStyle = {
  display: "inline-flex" as const, alignItems: "center" as const, gap: 6,
  fontSize: 13, padding: "7px 12px",
  border: `1px solid #d1d5db`, borderRadius: 6,
  background: "#ffffff", color: "#1a1a1a",
  cursor: "pointer",
};
