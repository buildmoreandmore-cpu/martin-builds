import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Coverage Command — Staffing Shift Dashboard",
  description:
    "Real-time shift coverage dashboard for staffing agency owners. See open gaps, available workers, and revenue at risk — all in one view.",
};

/* ─── static demo data ─── */

const SHIFTS = [
  { client: "Riverside Manor", time: "8:00 PM – 4:00 AM", needed: 4, filled: 2, status: "red" as const },
  { client: "Apex Fulfillment", time: "6:00 AM – 2:00 PM", needed: 6, filled: 4, status: "red" as const },
  { client: "Halcyon Medical", time: "2:00 PM – 10:00 PM", needed: 3, filled: 2, status: "amber" as const },
  { client: "NorthStar Logistics", time: "6:00 AM – 2:00 PM", needed: 5, filled: 5, status: "green" as const },
  { client: "Crestview Senior Living", time: "7:00 AM – 3:00 PM", needed: 4, filled: 4, status: "green" as const },
];

const WORKERS = [
  { initials: "TR", name: "Tasha Robinson", specialty: "CNA · Available now", action: "call" as const },
  { initials: "MJ", name: "Marcus Johnson", specialty: "Forklift cert. · Available now", action: "call" as const },
  { initials: "LD", name: "Lisa Denton", specialty: "LPN · Available after 4 PM", action: "oncall" as const },
  { initials: "KW", name: "Kevin Williams", specialty: "General labor · Available now", action: "call" as const },
  { initials: "AP", name: "Anita Patel", specialty: "RN · Available now", action: "call" as const },
];

const ACTIVITY = [
  { time: "2:14 PM", text: "Marcus Johnson confirmed for Apex Fulfillment 6 AM shift", dotColor: "#16a34a" },
  { time: "1:48 PM", text: "Riverside Manor night shift escalated — 2 gaps remaining", dotColor: "#dc2626" },
  { time: "12:30 PM", text: "Lisa Denton moved to on-call for Halcyon Medical", dotColor: "#d97706" },
  { time: "11:05 AM", text: "NorthStar Logistics fully staffed — all 5 slots filled", dotColor: "#16a34a" },
];

const REVENUE_ITEMS = [
  { client: "Riverside Manor", amount: 608 },
  { client: "Apex Fulfillment", amount: 512 },
  { client: "Halcyon Medical", amount: 336 },
];

const FILL_RATE = [
  { day: "Mon", pct: 97, live: false },
  { day: "Tue", pct: 100, live: false },
  { day: "Wed", pct: 94, live: false },
  { day: "Thu", pct: 88, live: false },
  { day: "Fri", pct: 79, live: true },
];

/* ─── helpers ─── */

function statusColors(s: "red" | "amber" | "green") {
  if (s === "red") return { border: "#dc2626", bg: "#fef2f2", labelBg: "#fee2e2", labelColor: "#b91c1c" };
  if (s === "amber") return { border: "#d97706", bg: "#fffbeb", labelBg: "#fef3c7", labelColor: "#92400e" };
  return { border: "#16a34a", bg: "#f0fdf4", labelBg: "#dcfce7", labelColor: "#15803d" };
}

function statusLabel(s: "red" | "amber" | "green") {
  if (s === "red") return "Uncovered";
  if (s === "amber") return "Partial";
  return "Covered";
}

function fillBarColor(pct: number) {
  if (pct >= 95) return "#16a34a";
  if (pct >= 90) return "#d97706";
  return "#dc2626";
}

function fillTextColor(pct: number) {
  if (pct >= 95) return "#15803d";
  if (pct >= 90) return "#92400e";
  return "#b91c1c";
}

/* ─── page ─── */

export default function CoverageCommandPage() {
  return (
    <div className={dmSans.variable} style={{ minHeight: "100vh", background: "#F8F7F5", color: "#1a1a1a", fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <style>{`
        body { background: #F8F7F5 !important; color: #1a1a1a !important; font-family: var(--font-dm-sans), sans-serif !important; }
        body::before { display: none !important; }
        section { padding-left: unset !important; padding-right: unset !important; }
        h1, h2 { font-size: unset !important; letter-spacing: unset !important; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .staffing-kpi { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .staffing-main { display: grid; grid-template-columns: 3fr 2fr; gap: 24px; }
        .staffing-bottom { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 768px) {
          .staffing-kpi { grid-template-columns: repeat(2, 1fr) !important; }
          .staffing-main { grid-template-columns: 1fr !important; }
          .staffing-bottom { grid-template-columns: 1fr !important; }
          .staffing-wrap { padding: 16px 16px 0 !important; }
        }
        @media (max-width: 480px) {
          .staffing-kpi { grid-template-columns: 1fr !important; }
          .staffing-wrap { padding: 16px 12px 0 !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #e5e5e5", animation: "fadeInUp 0.5s ease-out forwards" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="/" style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textDecoration: "none", letterSpacing: -0.5 }}>martin<span style={{ color: "#16a34a" }}>.builds</span></a>
            <span style={{ color: "#e5e5e5" }}>|</span>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Coverage Command</h1>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Friday, April 4 &middot; 3 shifts at risk</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fef3c7", color: "#92400e", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 9999 }}>
              <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#d97706", display: "inline-block" }} />
              3 gaps open
            </span>
          </div>
          <button style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 12px", fontSize: 14, fontWeight: 500, color: "#6b7280", background: "transparent", cursor: "pointer" }}>
            Customize layout
          </button>
        </div>
      </header>

      <div className="staffing-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 24px 0", display: "flex", flexDirection: "column", gap: 24 }}>
        {/* ── Demo context banner ── */}
        <div style={{ padding: "24px 28px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, animation: "fadeInUp 0.4s ease-out forwards" }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#166534", marginBottom: 6 }}>This is a dashboard concept designed for a staffing agency.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#15803d", lineHeight: 1.6 }}>Open shifts, available workers, fill rates, and revenue at risk — all in one view. The final product is designed around how your operation actually runs. This is a starting point to show what&apos;s possible.</p>
        </div>
        {/* ── Alert banner ── */}
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, animation: "fadeInUp 0.5s ease-out 0.1s forwards", opacity: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ width: 24, height: 24, borderRadius: 9999, background: "#dc2626", color: "#ffffff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>!</span>
            <p style={{ fontSize: 14, color: "#7f1d1d", lineHeight: 1.5, margin: 0 }}>
              <span style={{ fontWeight: 600 }}>Riverside Manor</span> — Night shift (8 PM – 4 AM) still needs 2 workers. Starts in 6 hours.
            </p>
          </div>
          <button style={{ background: "#dc2626", color: "#ffffff", fontSize: 14, fontWeight: 600, padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", flexShrink: 0 }}>
            Find workers
          </button>
        </div>

        {/* ── KPI row ── */}
        <div className="staffing-kpi" style={{ animation: "fadeInUp 0.5s ease-out 0.2s forwards", opacity: 0 }}>
          <KPICard value="34" label="Shifts today" sub="26 fully covered" />
          <KPICard value="5" label="Open slots unfilled" sub="Across 3 sites" accent="red" />
          <KPICard value="18" label="Workers available now" sub="4 not yet called" />
          <KPICard value="$6,840" label="Revenue at risk today" sub="If gaps not filled" accent="amber" />
        </div>

        {/* ── Main two-column ── */}
        <div className="staffing-main" style={{ animation: "fadeInUp 0.5s ease-out 0.3s forwards", opacity: 0 }}>
          {/* Left — shift coverage */}
          <div>
            <Card title="Today's shift coverage">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SHIFTS.map((s) => {
                  const sc = statusColors(s.status);
                  return (
                    <div
                      key={s.client}
                      style={{ borderRadius: 10, border: "1px solid #e5e5e5", borderLeft: `4px solid ${sc.border}`, background: sc.bg, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.client}</p>
                        <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0" }}>{s.time}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          {Array.from({ length: s.needed }).map((_, i) =>
                            i < s.filled ? (
                              <span key={i} style={{ width: 20, height: 20, borderRadius: 4, background: "#16a34a", display: "inline-block" }} />
                            ) : (
                              <span key={i} style={{ width: 20, height: 20, borderRadius: 4, border: "2px dashed #f87171", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#dc2626" }}>!</span>
                            )
                          )}
                        </div>
                        <span style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>{s.filled}/{s.needed}</span>
                        <span style={{ borderRadius: 9999, padding: "2px 8px", fontSize: 11, fontWeight: 600, background: sc.labelBg, color: sc.labelColor }}>{statusLabel(s.status)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Available workers */}
            <Card title="Available workers">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {WORKERS.map((w) => (
                  <div key={w.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 36, height: 36, borderRadius: 9999, background: "#1f2937", color: "#ffffff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {w.initials}
                    </span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.name}</p>
                      <p style={{ fontSize: 12, color: "#6b7280", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.specialty}</p>
                    </div>
                    {w.action === "call" ? (
                      <button style={{ background: "#16a34a", color: "#ffffff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer", flexShrink: 0 }}>
                        Call now
                      </button>
                    ) : (
                      <span style={{ background: "#f3f4f6", color: "#6b7280", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 6, flexShrink: 0 }}>
                        On call
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity feed */}
            <Card title="Activity feed" subtitle="Dispatch log">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ marginTop: 6, width: 10, height: 10, borderRadius: 9999, background: a.dotColor, flexShrink: 0, display: "inline-block" }} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.5, margin: 0 }}>{a.text}</p>
                      <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* ── Bottom 3-column ── */}
        <div className="staffing-bottom" style={{ animation: "fadeInUp 0.5s ease-out 0.4s forwards", opacity: 0 }}>
          {/* Revenue at stake */}
          <Card title="Revenue at stake">
            <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
              <tbody>
                {REVENUE_ITEMS.map((r) => (
                  <tr key={r.client} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px 0", color: "#374151" }}>{r.client}</td>
                    <td style={{ padding: "8px 0", textAlign: "right", fontWeight: 500, color: "#1a1a1a" }}>${r.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ paddingTop: 12, fontWeight: 600, color: "#1a1a1a" }}>Total if filled</td>
                  <td style={{ paddingTop: 12, textAlign: "right", fontWeight: 700, color: "#15803d" }}>$1,456</td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* Fill rate */}
          <Card title="Fill rate this week">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FILL_RATE.map((f) => (
                <div key={f.day} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 32, fontSize: 12, fontWeight: 500, color: "#6b7280" }}>{f.day}</span>
                  <div style={{ flex: 1, height: 12, borderRadius: 9999, background: "#f3f4f6", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 9999, background: fillBarColor(f.pct), width: `${f.pct}%` }} />
                  </div>
                  <span style={{ width: 48, textAlign: "right", fontSize: 14, fontWeight: 600, color: fillTextColor(f.pct), display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                    {f.pct}%
                    {f.live && <span style={{ width: 6, height: 6, borderRadius: 9999, background: "#dc2626", display: "inline-block" }} />}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Dispatch log */}
          <Card title="Dispatch log">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ marginTop: 6, width: 10, height: 10, borderRadius: 9999, background: a.dotColor, flexShrink: 0, display: "inline-block" }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.5, margin: 0 }}>{a.text}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* spacer for fixed button */}
        <div style={{ height: 64 }} />
      </div>

      {/* ── Fixed CTA ── */}
      <a
        href="/discovery-call"
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50, borderRadius: 9999, background: "#1f2937", padding: "12px 20px", fontSize: 14, fontWeight: 600, color: "#ffffff", textDecoration: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)", animation: "fadeInUp 0.5s ease-out 0.5s forwards", opacity: 0 }}
      >
        I want this for my business
      </a>
    </div>
  );
}

/* ─── shared components ─── */

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#ffffff", border: "1px solid #e5e5e5", borderRadius: 12, padding: 20 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function KPICard({
  value,
  label,
  sub,
  accent,
}: {
  value: string;
  label: string;
  sub: string;
  accent?: "red" | "amber";
}) {
  const bg = accent === "red" ? "#fef2f2" : accent === "amber" ? "#fffbeb" : "#ffffff";
  const borderColor = accent === "red" ? "#fecaca" : accent === "amber" ? "#fde68a" : "#e5e5e5";
  const valueColor = accent === "red" ? "#dc2626" : accent === "amber" ? "#d97706" : "#1a1a1a";

  return (
    <div style={{ background: bg, border: `1px solid ${borderColor}`, borderRadius: 12, padding: 16 }}>
      <p style={{ fontSize: 28, fontWeight: 700, color: valueColor, margin: 0 }}>{value}</p>
      <p style={{ fontSize: 14, fontWeight: 500, color: "#374151", margin: "4px 0 0" }}>{label}</p>
      <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0" }}>{sub}</p>
    </div>
  );
}
