"use client";

import ScrollReveal from "./ScrollReveal";

const PaymentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);
const CRMIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const AIIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 9h10M7 13h6M7 17h4" />
  </svg>
);
const CloudIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);
const DataIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);
const AutomationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

const STACK = [
  { icon: <PaymentIcon />, label: "Payment integrations" },
  { icon: <CRMIcon />, label: "CRM systems" },
  { icon: <AIIcon />, label: "AI-powered workflows" },
  { icon: <CloudIcon />, label: "Cloud-based dashboards" },
  { icon: <DataIcon />, label: "Real-time data sync" },
  { icon: <AutomationIcon />, label: "Workflow automation" },
];

export default function AuthorityStack() {
  return (
    <section style={{ padding: "clamp(4rem,7vw,6rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Built On
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", maxWidth: "640px", margin: "0 auto" }}>
              Modern infrastructure.
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)", color: "#888", maxWidth: "560px", margin: "1rem auto 0", lineHeight: 1.6 }}>
              Designed to integrate with the tools you already use — without adding complexity.
            </p>
          </div>
        </ScrollReveal>

        {/* Stack grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
            gap: "1px",
            background: "rgba(245,245,240,0.06)",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(245,245,240,0.06)",
          }}
        >
          {STACK.map((s, i) => (
            <ScrollReveal key={i}>
              <div
                style={{
                  background: "#0a0a0a",
                  padding: "1.5rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  textAlign: "center",
                  minHeight: 110,
                }}
              >
                <span style={{ color: "#c8ff00" }}>{s.icon}</span>
                <span style={{ fontSize: "0.8rem", color: "#888", fontFamily: "'Space Mono', monospace", letterSpacing: "0.5px", lineHeight: 1.4 }}>
                  {s.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
