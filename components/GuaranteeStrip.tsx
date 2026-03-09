"use client";

import ScrollReveal from "./ScrollReveal";

const guarantees = [
  { label: "Week-one refund", context: "on all builds" },
  { label: "No contracts ever", context: "cancel anytime" },
  { label: "10-lead guarantee", context: "on AI agents" },
];

export default function GuaranteeStrip() {
  return (
    <ScrollReveal>
      <div
        className="guarantee-strip"
        style={{
          background: "#1a1a1a",
          padding: "2.5rem 3rem",
          borderTop: "1px solid rgba(245,245,240,0.06)",
          borderBottom: "1px solid rgba(245,245,240,0.06)",
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        {guarantees.map((g) => (
          <div key={g.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              color: "#c8ff00",
              letterSpacing: "0.5px",
              fontWeight: 700,
            }}>
              {g.label}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.2rem" }}>
              {g.context}
            </div>
          </div>
        ))}

        <style>{`
          @media (max-width: 600px) {
            .guarantee-strip {
              flex-direction: column !important;
              gap: 1.5rem !important;
              align-items: center;
            }
          }
        `}</style>
      </div>
    </ScrollReveal>
  );
}
