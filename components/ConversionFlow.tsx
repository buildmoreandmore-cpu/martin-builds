"use client";

import ScrollReveal from "./ScrollReveal";

const columns = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    title: "The lead arrives",
    body: "SEO, ads, referrals, word of mouth — that's your marketing. You're already doing this.",
    accent: false,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "The system converts",
    body: "Intake forms, instant follow-up, smart scheduling, proposal automation, a site that earns trust in 3 seconds. That's what I build.",
    accent: true,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "The human closes",
    body: "The relationship, the expertise, the handshake. That's your team. That never changes.",
    accent: false,
  },
];

export default function ConversionFlow() {
  return (
    <section style={{ padding: "clamp(4rem,6vw,5rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={tagStyle}>Where I Live In Your Business</p>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "2rem auto 0",
        }}
        className="conversion-flow-grid"
      >
        {columns.map((col) => (
          <ScrollReveal key={col.title}>
            <div
              style={{
                background: "#1a1a1a",
                border: col.accent ? "1px solid rgba(200,255,0,0.15)" : "1px solid rgba(245,245,240,0.06)",
                borderLeft: col.accent ? "3px solid #c8ff00" : "1px solid rgba(245,245,240,0.06)",
                borderRadius: "16px",
                padding: "2rem",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: col.accent ? "rgba(200,255,0,0.1)" : "rgba(245,245,240,0.04)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.2rem",
                }}
              >
                {col.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: col.accent ? "#f5f5f0" : "#888",
                  marginBottom: "0.6rem",
                }}
              >
                {col.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  color: col.accent ? "rgba(245,245,240,0.7)" : "#666",
                  lineHeight: 1.7,
                }}
              >
                {col.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Callout strip */}
      <ScrollReveal>
        <div
          style={{
            maxWidth: "1000px",
            margin: "2rem auto 0",
            padding: "1.25rem 2rem",
            background: "rgba(200,255,0,0.03)",
            border: "1px solid rgba(200,255,0,0.08)",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "0.95rem", color: "#ccc", lineHeight: 1.7, margin: 0 }}>
            Most businesses lose 60–80% of leads in the gap between Column 1 and Column 3.{" "}
            <span style={{ color: "#c8ff00", fontWeight: 600 }}>I build what goes in Column 2.</span>
          </p>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .conversion-flow-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1rem",
};
