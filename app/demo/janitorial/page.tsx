"use client";

/* ── palette tokens (matched to other demos) ── */
const bg = "#FAFAF8";
const card = "#ffffff";
const border = "#E8E3DC";
const green = "#16a34a";
const amber = "#d97706";
const red = "#dc2626";
const blue = "#2563eb";
const purple = "#7c3aed";
const cyan = "#0891b2";
const muted = "#78716c";
const textDark = "#1a1a1a";
const fontBody = "'DM Sans', sans-serif";
const fontMono = "'DM Mono', monospace";

/* ── static demo data ── */

const KPIS = [
  { value: "$38,240", label: "Monthly recurring revenue", sub: "+ $1,120 vs last month", accent: green, tintBg: "#f0fdf4", tintBorder: "#bbf7d0" },
  { value: "22", label: "Active contracts", sub: "3 up for renewal in 30 days", accent: amber, tintBg: "#fffbeb", tintBorder: "#fde68a" },
  { value: "84%", label: "Crew utilization", sub: "9.3 of 11 FTEs billable today", accent: blue, tintBg: card, tintBorder: border },
  { value: "$1,738", label: "Avg monthly contract", sub: "Industry avg: $1,400 · Above avg", accent: green, tintBg: "#f0fdf4", tintBorder: "#bbf7d0" },
  { value: "3", label: "Incidents this month", sub: "2 late arrivals · 1 skipped area", accent: red, tintBg: "#fef2f2", tintBorder: "#fecaca" },
];

const REVENUE_HISTORY = [
  { m: "Apr '25", v: 29400 },
  { m: "May '25", v: 31200 },
  { m: "Jun '25", v: 30800 },
  { m: "Jul '25", v: 28900 },
  { m: "Aug '25", v: 29100 },
  { m: "Sep '25", v: 33500 },
  { m: "Oct '25", v: 35200 },
  { m: "Nov '25", v: 34800 },
  { m: "Dec '25", v: 33100 },
  { m: "Jan '26", v: 34600 },
  { m: "Feb '26", v: 36900 },
  { m: "Mar '26", v: 38240, current: true },
];

const REV_TARGET = 35000;
const REV_MAX = 42000;

const CONTRACTS = [
  { client: "Whitfield Medical Center", type: "Medical Office", monthly: 2800, ends: "Aug 2026", insp: "34 days ago", score: 87 },
  { client: "Peachtree Law Group", type: "Law Firm", monthly: 2400, ends: "Jun 2026", insp: "12 days ago", score: 96 },
  { client: "Summit Office Park (Bldg A)", type: "Commercial", monthly: 3100, ends: "Dec 2026", insp: "8 days ago", score: 94 },
  { client: "Summit Office Park (Bldg B)", type: "Commercial", monthly: 2900, ends: "Dec 2026", insp: "8 days ago", score: 91 },
  { client: "Northside Dental Associates", type: "Medical Office", monthly: 1600, ends: "Mar 2026", insp: "21 days ago", score: 89 },
  { client: "Crestwood Financial", type: "Office", monthly: 1400, ends: "May 2026", insp: "17 days ago", score: 92 },
  { client: "Hartsfield Logistics Hub", type: "Warehouse", monthly: 2200, ends: "Oct 2026", insp: "6 days ago", score: 95 },
  { client: "Buckhead Pediatrics", type: "Medical Office", monthly: 1800, ends: "Jul 2026", insp: "28 days ago", score: 88 },
  { client: "Midtown Tech Suites", type: "Coworking", monthly: 1200, ends: "Jan 2027", insp: "3 days ago", score: 97 },
  { client: "Riverside Church", type: "Religious", monthly: 900, ends: "Ongoing", insp: "45 days ago", score: 83 },
  { client: "Atlanta OBGYN Group", type: "Medical Office", monthly: 2100, ends: "Sep 2026", insp: "14 days ago", score: 93 },
  { client: "Castleberry Lofts HOA", type: "Residential/HOA", monthly: 1400, ends: "Mar 2027", insp: "19 days ago", score: 90 },
];

const CREW = [
  { name: "Marcus T.", role: "Lead Cleaner", status: "onsite", loc: "Summit Office Park" },
  { name: "Yolanda B.", role: "Cleaner", status: "onsite", loc: "Summit Office Park" },
  { name: "Jerome K.", role: "Lead Cleaner", status: "onsite", loc: "Whitfield Medical" },
  { name: "Priya N.", role: "Cleaner", status: "transit", loc: "En route to Peachtree Law" },
  { name: "Deon W.", role: "Cleaner", status: "onsite", loc: "Hartsfield Logistics" },
  { name: "Keisha M.", role: "Floater", status: "off", loc: "—" },
];

const REVENUE_MIX = [
  { type: "Medical / Healthcare", pct: 38, color: blue },
  { type: "Law / Professional", pct: 22, color: purple },
  { type: "Commercial Office", pct: 24, color: cyan },
  { type: "Warehouse / Industrial", pct: 10, color: amber },
  { type: "HOA / Church / Other", pct: 6, color: "#9ca3af" },
];

const RENEWALS = [
  { name: "Northside Dental Associates", date: "Mar 28, 2026", value: "$1,600/mo", status: "Renewal not confirmed", color: amber, tintBg: "#fffbeb", tintBorder: "#fde68a" },
  { name: "Crestwood Financial", date: "May 4, 2026", value: "$1,400/mo", status: "Client mentioned price shopping", color: red, tintBg: "#fef2f2", tintBorder: "#fecaca" },
  { name: "Buckhead Pediatrics", date: "Jul 12, 2026", value: "$1,800/mo", status: "Verbal renewal received", color: green, tintBg: "#f0fdf4", tintBorder: "#bbf7d0" },
];

const MARGIN_BREAKDOWN = [
  { label: "Labor", pct: 54, color: "#0F1C2E" },
  { label: "Supplies", pct: 11, color: blue },
  { label: "Vehicle / Fuel", pct: 7, color: amber },
  { label: "Insurance", pct: 8, color: red },
  { label: "Overhead", pct: 5, color: "#9ca3af" },
  { label: "Net Margin", pct: 15, color: green },
];

const MARGIN_KILLERS = [
  { kind: "warn" as const, text: "Overtime hours: $640 excess this month", color: amber },
  { kind: "warn" as const, text: "3 callback cleans (avg $85 each) = $255 lost", color: red },
  { kind: "good" as const, text: "Supply costs down 4% vs last month (bulk order working)", color: green },
];

const CHURN = [
  {
    name: "Riverside Church",
    risk: "HIGH",
    score: 72,
    color: red,
    tintBg: "#fef2f2",
    tintBorder: "#fecaca",
    factors: [
      "Inspection score dropped from 91 → 83 over 3 months",
      "2 complaints logged (missed area, strong chemical smell)",
      "Last client contact: 47 days ago",
      "Contract is month-to-month",
    ],
    action: "Call this week",
  },
  {
    name: "Buckhead Pediatrics",
    risk: "MEDIUM",
    score: 44,
    color: amber,
    tintBg: "#fffbeb",
    tintBorder: "#fde68a",
    factors: [
      "Score stable at 88",
      "No complaints but renewal hasn't been confirmed",
      "Invoice paid 12 days late last month",
    ],
    action: "Send renewal proposal",
  },
  {
    name: "Northside Dental",
    risk: "MEDIUM",
    score: 38,
    color: amber,
    tintBg: "#fffbeb",
    tintBorder: "#fde68a",
    factors: [
      "Contract expires in 21 days",
      "No red flags on quality",
      "Just hasn't signed new agreement yet",
    ],
    action: "Follow up today",
  },
];

const SUPPLIES = [
  { item: "Disinfectant (gal)", onHand: "18 gal", use: "22 gal", status: "Reorder now", color: red, tintBg: "#fef2f2" },
  { item: "Glass Cleaner (gal)", onHand: "9 gal", use: "8 gal", status: "Good", color: green, tintBg: "#f0fdf4" },
  { item: "Floor Stripper (gal)", onHand: "4 gal", use: "6 gal", status: "Low", color: amber, tintBg: "#fffbeb" },
  { item: "Trash Liners (case)", onHand: "7 cases", use: "8 cases", status: "Low", color: amber, tintBg: "#fffbeb" },
  { item: "Paper Towels (case)", onHand: "12 cases", use: "10 cases", status: "Good", color: green, tintBg: "#f0fdf4" },
  { item: "Toilet Paper (case)", onHand: "6 cases", use: "9 cases", status: "Reorder now", color: red, tintBg: "#fef2f2" },
  { item: "Mop Heads (unit)", onHand: "5 units", use: "6/mo avg", status: "Low", color: amber, tintBg: "#fffbeb" },
  { item: "Nitrile Gloves (box)", onHand: "14 boxes", use: "12 boxes", status: "Good", color: green, tintBg: "#f0fdf4" },
];

const INSIGHTS = [
  {
    iconKey: "trending-down",
    title: "Price Erosion Risk",
    body: "You haven't raised rates on 8 of your 22 contracts in over 18 months. With supply and labor costs up ~14% since 2023, those accounts are 6–9% less profitable than when you signed them.",
    metric: "8 contracts · Avg age: 22 months · Est. margin loss: $340/mo",
    cta: "See which contracts →",
    accent: red,
    tintBg: "#fef2f2",
    tintBorder: "#fecaca",
  },
  {
    iconKey: "calendar",
    title: "Summer Revenue Dip Coming",
    body: "Based on 3 years of data, July–August typically drops 14–18% as office tenants reduce headcount and buildings close. Last July you dipped to $28,900. You have 9 weeks to close 2 new contracts or renegotiate scope.",
    metric: "Projected July revenue if no action: $32,400",
    cta: "View forecast →",
    accent: amber,
    tintBg: "#fffbeb",
    tintBorder: "#fde68a",
  },
  {
    iconKey: "users",
    title: "Turnover Is Your Hidden Expense",
    body: "Janitorial industry turnover averages 75% annually. Each time you replace a cleaner it costs $1,200–$2,400 in recruiting, onboarding, and productivity loss. You've had 2 replacements this year.",
    metric: "Est. turnover cost YTD: $3,100 · Industry avg: $4,800",
    cta: "Retention tracker →",
    accent: blue,
    tintBg: "#eff6ff",
    tintBorder: "#bfdbfe",
  },
  {
    iconKey: "shield",
    title: "Compliance Gaps Cost More Than Fixing Them",
    body: "Medical and legal accounts require up-to-date W-9s, liability certificates, and OSHA training records on file. A single audit or incident without documentation can void your insurance claim or lose the contract.",
    metric: "3 clients require annual cert updates · Next due: Apr 30",
    cta: "View compliance tracker →",
    accent: green,
    tintBg: "#f0fdf4",
    tintBorder: "#bbf7d0",
  },
];

/* ── SVG icons ── */

const WarnIcon = ({ size = 18, color = amber }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CheckIcon = ({ size = 16, color = green }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BulbIcon = ({ size = 14, color = "#1e40af" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2z" />
  </svg>
);

const TrendingDownIcon = ({ size = 20, color = red }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const CalendarIcon = ({ size = 20, color = amber }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = ({ size = 20, color = blue }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ShieldIcon = ({ size = 20, color = green }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const BellIcon = ({ size = 14, color = "#92400e" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ArrowRightIcon = ({ size = 16, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const renderInsightIcon = (key: string, color: string) => {
  switch (key) {
    case "trending-down": return <TrendingDownIcon color={color} />;
    case "calendar": return <CalendarIcon color={color} />;
    case "users": return <UsersIcon color={color} />;
    case "shield": return <ShieldIcon color={color} />;
    default: return null;
  }
};

/* ── helpers ── */

function scoreStyle(s: number) {
  if (s >= 95) return { bg: "#dcfce7", color: "#166534", dot: green };
  if (s >= 88) return { bg: "#fef3c7", color: "#92400e", dot: amber };
  return { bg: "#fee2e2", color: "#991b1b", dot: red };
}

function crewStatusStyle(s: string) {
  switch (s) {
    case "onsite":
      return { dot: green, label: "On site", tagBg: "#dcfce7", tagFg: "#166534" };
    case "transit":
      return { dot: amber, label: "In transit", tagBg: "#fef3c7", tagFg: "#92400e" };
    case "off":
      return { dot: "#9ca3af", label: "Off today", tagBg: "#f3f4f6", tagFg: "#6b7280" };
    default:
      return { dot: muted, label: s, tagBg: "#f3f4f6", tagFg: "#6b7280" };
  }
}

/* ── donut chart (cumulative conic-gradient) ── */
function buildConic(slices: { pct: number; color: string }[]) {
  let acc = 0;
  const stops: string[] = [];
  for (const s of slices) {
    const start = acc;
    const end = acc + s.pct;
    stops.push(`${s.color} ${start}% ${end}%`);
    acc = end;
  }
  return `conic-gradient(${stops.join(", ")})`;
}

/* ── page ── */

export default function JanitorialDashboard() {
  const conic = buildConic(REVENUE_MIX);

  return (
    <div style={{ minHeight: "100vh", background: bg, color: textDark, fontFamily: fontBody }}>
      <style>{`
        html body { background: ${bg} !important; background-color: ${bg} !important; color: ${textDark} !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .jan-eyebrow { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: ${muted}; font-weight: 600; font-family: ${fontMono}; }
        .jan-card { background: ${card}; border: 1px solid ${border}; border-radius: 12px; padding: 22px 24px; }
        .jan-section-h { margin: 0; font-size: 16px; font-weight: 700; color: ${textDark}; }

        .jan-g5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .jan-row2 { display: grid; grid-template-columns: 1.55fr 1fr; gap: 20px; }
        .jan-row3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .jan-g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .jan-bars { display: grid; grid-template-columns: repeat(12, 1fr); gap: 8px; align-items: end; height: 220px; }

        .jan-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .jan-table th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: ${muted}; font-weight: 600; padding: 10px 8px; border-bottom: 1px solid ${border}; }
        .jan-table td { padding: 12px 8px; border-bottom: 1px solid #f1ede5; }
        .jan-table tr:last-child td { border-bottom: none; }

        @media (max-width: 1024px) {
          .jan-g5 { grid-template-columns: repeat(3, 1fr) !important; }
          .jan-row2 { grid-template-columns: 1fr !important; }
          .jan-row3 { grid-template-columns: 1fr !important; }
          .jan-g4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .jan-g5 { grid-template-columns: repeat(2, 1fr) !important; }
          .jan-bars { height: 180px !important; gap: 4px !important; }
          .jan-wrap { padding: 0 16px 48px !important; }
          .jan-table th, .jan-table td { padding: 8px 6px !important; font-size: 11px !important; }
          .jan-card { padding: 18px 16px !important; }
          .jan-table-wrap { overflow-x: auto; }
          .jan-table { min-width: 640px; }
        }
        @media (max-width: 480px) {
          .jan-g5 { grid-template-columns: 1fr !important; }
          .jan-g4 { grid-template-columns: 1fr !important; }
          .jan-bars { height: 150px !important; }
          .jan-wrap { padding: 0 12px 48px !important; }
          .jan-bar-label { font-size: 8px !important; }
          .jan-donut-wrap { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <header style={{ background: card, borderBottom: `1px solid ${border}`, animation: "fadeInUp 0.5s ease-out forwards" }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: "#0F1C2E", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: fontMono, letterSpacing: -0.5 }}>CC</span>
            </div>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: textDark, margin: 0, lineHeight: 1.3 }}>
                CleanCommand
              </h1>
              <p style={{ fontSize: 12, color: muted, margin: 0 }}>
                Apex Commercial Cleaning · Atlanta, GA
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f3f4f6", color: "#374151", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 9999, border: `1px solid ${border}` }}>
              Monday, April 7 · Week 15 of 52
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fef3c7", color: "#92400e", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 9999 }}>
              <BellIcon />
              2 alerts
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 9999, background: "#0F1C2E", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: fontMono }}>
              DW
            </div>
          </div>
        </div>
      </header>

      <div className="jan-wrap" style={{ maxWidth: 1260, margin: "0 auto", padding: "0 24px 48px" }}>

        {/* ── Demo context banner ── */}
        <div style={{ margin: "20px 0", padding: "22px 26px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, animation: "fadeInUp 0.4s ease-out forwards" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for a janitorial / commercial cleaning company.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>Crew, contracts, quality control, and margins — all in one place. Replaces spreadsheets, WhatsApp threads, and paper inspection sheets. The final product is built around how you actually run your business.</p>
        </div>

        {/* ── Alert banner ── */}
        <div style={{ margin: "20px 0", padding: "16px 22px", background: "#FFFBEB", borderLeft: "4px solid #d97706", border: "1px solid #fde68a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, animation: "fadeInUp 0.5s ease-out forwards" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1, minWidth: 240 }}>
            <span style={{ flexShrink: 0, marginTop: 1 }}><WarnIcon size={20} color="#92400e" /></span>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#92400e" }}>Inspection overdue — Whitfield Medical Center (Contract #WMC-04)</p>
              <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.5 }}>Has not been inspected in 34 days. Client contract requires monthly QC inspection. Last score: 87/100.</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button style={{ background: blue, color: "#fff", border: "none", padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              Log inspection now
            </button>
            <button style={{ background: "transparent", color: "#92400e", border: `1px solid #fde68a`, padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              Dismiss
            </button>
          </div>
        </div>

        {/* ── KPI row ── */}
        <div className="jan-g5" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.08s both" }}>
          {KPIS.map((kpi, i) => (
            <div key={i} style={{ background: kpi.tintBg, border: `1px solid ${kpi.tintBorder}`, borderRadius: 12, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
              <p className="jan-eyebrow" style={{ margin: 0 }}>{kpi.label}</p>
              <p style={{ margin: 0, fontSize: 30, fontWeight: 700, color: textDark, fontFamily: fontMono, lineHeight: 1.1, letterSpacing: -0.5 }}>{kpi.value}</p>
              <p style={{ margin: 0, fontSize: 12, color: kpi.accent, fontWeight: 600 }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* ── Two-column row: Revenue chart + Contract table | Crew + Donut + Renewals ── */}
        <div className="jan-row2" style={{ marginBottom: 20, animation: "fadeInUp 0.5s ease-out 0.16s both" }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Revenue Chart */}
            <div className="jan-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
                <h2 className="jan-section-h">Monthly Revenue — Last 12 Months</h2>
                <span className="jan-eyebrow">Target: $35,000</span>
              </div>
              <p style={{ margin: "0 0 18px", fontSize: 12, color: muted }}>Bars in deeper blue = current month</p>

              <div style={{ position: "relative", paddingTop: 8 }}>
                {/* reference target line */}
                <div style={{ position: "absolute", left: 0, right: 0, top: `${8 + (1 - REV_TARGET / REV_MAX) * 220}px`, borderTop: `1px dashed ${amber}`, height: 0, zIndex: 2 }}>
                  <span style={{ position: "absolute", right: 0, top: -16, fontSize: 10, color: amber, fontWeight: 600, background: card, padding: "0 4px" }}>$35k target</span>
                </div>

                <div className="jan-bars">
                  {REVENUE_HISTORY.map((b, i) => {
                    const h = (b.v / REV_MAX) * 100;
                    return (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                        <div style={{ width: "100%", height: `${h}%`, background: b.current ? "#1d4ed8" : "#3b82f6", borderRadius: "6px 6px 0 0", transition: "all 0.3s", position: "relative" }}>
                          <span style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 600, color: b.current ? "#1d4ed8" : muted, fontFamily: fontMono, whiteSpace: "nowrap" }}>
                            ${(b.v / 1000).toFixed(1)}k
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="jan-bars" style={{ height: "auto", marginTop: 8 }}>
                  {REVENUE_HISTORY.map((b, i) => (
                    <p key={i} className="jan-bar-label" style={{ margin: 0, fontSize: 9, textAlign: "center", color: muted, fontFamily: fontMono, letterSpacing: -0.2 }}>
                      {b.m}
                    </p>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 18, padding: "12px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}><BulbIcon /></span>
                <span><strong>July is historically your lowest month (-15%).</strong> Consider offering summer deep-clean packages to offset.</span>
              </div>
            </div>

            {/* Contract Health Table */}
            <div className="jan-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                <h2 className="jan-section-h">Active Contracts — Health Snapshot</h2>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 9999, background: "#f3f4f6", color: "#6b7280", border: `1px solid ${border}` }}>
                  Showing 12 of 22
                </span>
              </div>

              <div className="jan-table-wrap">
                <table className="jan-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Type</th>
                      <th>Monthly</th>
                      <th>Ends</th>
                      <th>Last Insp</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONTRACTS.map((c, i) => {
                      const sc = scoreStyle(c.score);
                      return (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{c.client}</td>
                          <td style={{ color: muted }}>{c.type}</td>
                          <td style={{ fontFamily: fontMono, fontWeight: 600 }}>${c.monthly.toLocaleString()}</td>
                          <td style={{ color: muted, fontFamily: fontMono }}>{c.ends}</td>
                          <td style={{ color: muted }}>{c.insp}</td>
                          <td>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: sc.bg, color: sc.color, padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700, fontFamily: fontMono }}>
                              <span style={{ width: 7, height: 7, borderRadius: 9999, background: sc.dot, display: "inline-block" }} />
                              {c.score}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 14, textAlign: "center" }}>
                <button style={{ background: "transparent", color: blue, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  View all 22 contracts →
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Crew Status */}
            <div className="jan-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                <h2 className="jan-section-h">Crew — Live Status</h2>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 9999, background: "#dcfce7", color: "#166534", fontWeight: 600 }}>5 active</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CREW.map((c, i) => {
                  const st = crewStatusStyle(c.status);
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", border: `1px solid ${border}`, borderRadius: 10, background: "#fafaf9" }}>
                      <span style={{ width: 9, height: 9, borderRadius: 9999, background: st.dot, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: textDark }}>{c.name} <span style={{ color: muted, fontWeight: 400, fontSize: 11 }}>· {c.role}</span></p>
                        <p style={{ margin: 0, fontSize: 11, color: muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.loc}</p>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, background: st.tagBg, color: st.tagFg, whiteSpace: "nowrap" }}>{st.label}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${border}`, fontSize: 12, color: muted, lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}><strong style={{ color: textDark }}>5 of 6</strong> scheduled workers active today</p>
                <p style={{ margin: 0 }}>Next shift: <strong style={{ color: textDark }}>4:00 PM</strong> · evening crew (4 workers)</p>
              </div>
            </div>

            {/* Revenue Mix Donut */}
            <div className="jan-card">
              <h2 className="jan-section-h" style={{ marginBottom: 14 }}>Revenue Mix by Industry</h2>
              <div className="jan-donut-wrap" style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ position: "relative", width: 130, height: 130, borderRadius: "50%", background: conic, flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 22, background: card, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <span style={{ fontSize: 11, color: muted, fontFamily: fontMono }}>Total</span>
                    <span style={{ fontSize: 18, fontWeight: 700, fontFamily: fontMono }}>$38.2k</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  {REVENUE_MIX.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, color: textDark }}>{s.type}</span>
                      <span style={{ fontFamily: fontMono, fontWeight: 600, color: muted }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 14, padding: "12px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}><BulbIcon /></span>
                <span>Medical contracts pay 22% more on average. You&apos;re well-positioned — target 2 more medical accounts in Q2.</span>
              </div>
            </div>

            {/* Renewals */}
            <div className="jan-card">
              <h2 className="jan-section-h" style={{ marginBottom: 14 }}>Contracts Expiring in 60 Days</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {RENEWALS.map((r, i) => (
                  <div key={i} style={{ padding: "12px 14px", background: r.tintBg, border: `1px solid ${r.tintBorder}`, borderRadius: 10 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: textDark }}>{r.name}</p>
                    <p style={{ margin: "2px 0 6px", fontSize: 11, color: muted, fontFamily: fontMono }}>Expires {r.date} · {r.value}</p>
                    <span style={{ fontSize: 11, fontWeight: 600, color: r.color }}>{r.status}</span>
                  </div>
                ))}
              </div>
              <button style={{ marginTop: 14, width: "100%", background: blue, color: "#fff", border: "none", padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Prepare renewal letters →
              </button>
            </div>
          </div>
        </div>

        {/* ── Three column row: Margin / Churn / Supplies ── */}
        <div className="jan-row3" style={{ marginBottom: 24, animation: "fadeInUp 0.5s ease-out 0.24s both" }}>

          {/* Margin Analysis */}
          <div className="jan-card">
            <h2 className="jan-section-h" style={{ marginBottom: 4 }}>Where Your Money Actually Goes</h2>
            <p style={{ margin: "0 0 16px", fontSize: 12, color: muted }}>For every $1,000 billed</p>

            {/* Stacked bar */}
            <div style={{ display: "flex", height: 32, borderRadius: 8, overflow: "hidden", border: `1px solid ${border}` }}>
              {MARGIN_BREAKDOWN.map((m, i) => (
                <div key={i} style={{ width: `${m.pct}%`, background: m.color, position: "relative" }} title={`${m.label}: ${m.pct}%`} />
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              {MARGIN_BREAKDOWN.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: m.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, color: m.label === "Net Margin" ? green : textDark, fontWeight: m.label === "Net Margin" ? 700 : 400 }}>
                    {m.label}
                  </span>
                  <span style={{ fontFamily: fontMono, fontWeight: 600, color: muted }}>${m.pct * 10} ({m.pct}%)</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14, padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 12, color: "#15803d", lineHeight: 1.5 }}>
              Industry avg net margin: 10–15%. <strong>You&apos;re at the high end.</strong> Most companies bleed margin on labor overtime and re-cleaning callbacks.
            </div>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${border}` }}>
              <p className="jan-eyebrow" style={{ margin: "0 0 8px" }}>Margin Killers</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {MARGIN_KILLERS.map((k, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: textDark }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}>
                      {k.kind === "warn" ? <WarnIcon size={14} color={k.color} /> : <CheckIcon size={14} color={k.color} />}
                    </span>
                    <span>{k.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Churn Risk */}
          <div className="jan-card">
            <h2 className="jan-section-h" style={{ marginBottom: 4 }}>Clients at Risk of Canceling</h2>
            <p style={{ margin: "0 0 14px", fontSize: 11, color: muted, fontStyle: "italic", lineHeight: 1.5 }}>
              Risk score combines inspection trends, complaint history, payment speed, and days since last client contact.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CHURN.map((c, i) => (
                <div key={i} style={{ padding: "12px 14px", background: c.tintBg, border: `1px solid ${c.tintBorder}`, borderRadius: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: textDark }}>{c.name}</p>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, background: c.color, color: "#fff", fontFamily: fontMono }}>
                      {c.risk} · {c.score}/100
                    </span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 11, color: muted, lineHeight: 1.6 }}>
                    {c.factors.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                  <p style={{ margin: "8px 0 0", fontSize: 11, fontWeight: 600, color: c.color }}>→ Action: {c.action}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "12px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af", lineHeight: 1.5, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}><BulbIcon /></span>
              <span>Losing Riverside Church saves you a low-margin account. Losing Buckhead Pediatrics costs you $1,800/mo. Prioritize accordingly.</span>
            </div>
          </div>

          {/* Supply Inventory */}
          <div className="jan-card">
            <h2 className="jan-section-h" style={{ marginBottom: 14 }}>Supplies — Stock Levels</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {SUPPLIES.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: s.tintBg, borderRadius: 8, fontSize: 12 }}>
                  <span style={{ flex: 1, fontWeight: 600, color: textDark }}>{s.item}</span>
                  <span style={{ fontFamily: fontMono, color: muted, fontSize: 11 }}>{s.onHand}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, background: s.color, color: "#fff", whiteSpace: "nowrap" }}>{s.status}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "10px 12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 12, color: "#15803d", lineHeight: 1.5 }}>
              Estimated supply spend this month: <strong>$847</strong>. Last month: $882. ↓ 4% (bulk order savings)
            </div>
            <button style={{ marginTop: 12, width: "100%", background: "transparent", color: blue, border: `1px solid ${border}`, padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Generate reorder list →
            </button>
          </div>
        </div>

        {/* ── Insight cards (part of the dashboard, no callout heading) ── */}
        <div className="jan-g4" style={{ marginBottom: 28, animation: "fadeInUp 0.5s ease-out 0.32s both" }}>
          {INSIGHTS.map((ins, i) => (
            <div key={i} style={{ background: ins.tintBg, border: `1px solid ${ins.tintBorder}`, borderRadius: 12, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: card, border: `1px solid ${ins.tintBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {renderInsightIcon(ins.iconKey, ins.accent)}
              </div>
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: textDark }}>{ins.title}</h3>
              <p style={{ margin: 0, fontSize: 12, color: muted, lineHeight: 1.6 }}>{ins.body}</p>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: ins.accent, fontFamily: fontMono }}>{ins.metric}</p>
              <button style={{ marginTop: "auto", background: "transparent", color: ins.accent, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "left", padding: 0, display: "inline-flex", alignItems: "center", gap: 6 }}>
                {ins.cta}
              </button>
            </div>
          ))}
        </div>

        {/* ── "I want this for my business" CTA ── */}
        <div style={{ marginTop: 8, padding: "32px 28px", background: "#0F1C2E", borderRadius: 14, textAlign: "center", animation: "fadeInUp 0.5s ease-out 0.4s both" }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
            Want a dashboard like this for your business?
          </h3>
          <p style={{ margin: "10px auto 22px", fontSize: 14, color: "#cbd5e1", maxWidth: 520, lineHeight: 1.6 }}>
            Built around how you actually run your operation — not a template. Replace the spreadsheets, group chats, and paper inspection sheets with one screen you open every morning.
          </p>
          <a
            href="/discovery-call"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "13px 28px",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            I want this for my business
            <ArrowRightIcon color="#0a0a0a" />
          </a>
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${border}`, textAlign: "center", fontSize: 12, color: muted }}>
          CleanCommand demo · Built by <a href="/" style={{ color: blue, fontWeight: 600, textDecoration: "none" }}>martin.builds</a>
        </div>
      </div>
    </div>
  );
}
