"use client";

import ScrollReveal from "./ScrollReveal";

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L20 7" />
  </svg>
);

const ROWS: Array<{ agency: string; mb: string }> = [
  { agency: "Multiple layers — account managers, project managers, devs you never meet", mb: "One operator. The person who scopes it writes the code and answers your texts." },
  { agency: "Months of delays and scope creep", mb: "Shipped in 2 weeks. Fixed price. No surprises." },
  { agency: "Generic templates wearing your logo", mb: "Custom infrastructure, built around how your team actually runs" },
  { agency: "You rent it forever — vendor lock-in, monthly fees", mb: "You own the code. No subscription. Walk away anytime." },
  { agency: "Onboarding takes weeks. Your team has to learn their tool.", mb: "Familiar on day one. Built around your existing workflow, not against it." },
];

export default function ObjectionHandler() {
  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)" }}>
      <ScrollReveal>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={tagStyle}>The Difference</p>
          <h2 style={titleStyle}>
            This isn&rsquo;t an{" "}
            <span style={{ color: "#c8ff00" }}>agency.</span>
          </h2>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: "#888", maxWidth: "600px", margin: "1.5rem auto 0", lineHeight: 1.6 }}>
            You&rsquo;re not hiring a team — you&rsquo;re installing a system.
          </p>
        </div>
      </ScrollReveal>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Column headers */}
        <div className="comparison-headers" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ ...colHeaderStyle, color: "#888" }}>Typical Agency</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <span style={{ ...colHeaderStyle, color: "#c8ff00" }}>martin.builds</span>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="comparison-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {ROWS.map((r, i) => (
              <ScrollReveal key={`a-${i}`}>
                <div style={agencyRowStyle}>
                  <span style={iconWrap}><XIcon /></span>
                  <span style={agencyText}>{r.agency}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {ROWS.map((r, i) => (
              <ScrollReveal key={`m-${i}`}>
                <div style={mbRowStyle}>
                  <span style={iconWrap}><CheckIcon /></span>
                  <span style={mbText}>{r.mb}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .comparison-headers {
            display: none !important;
          }
          .comparison-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .comparison-grid > div:first-child {
            order: 2;
          }
          .comparison-grid > div:last-child {
            order: 1;
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
  marginBottom: "1.5rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
  margin: "0 auto",
};

const colHeaderStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  letterSpacing: "2px",
  textTransform: "uppercase",
  fontWeight: 600,
};

const iconWrap: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  flexShrink: 0,
  marginTop: 2,
};

const agencyRowStyle: React.CSSProperties = {
  background: "#141414",
  border: "1px solid rgba(245,245,240,0.04)",
  borderRadius: 10,
  padding: "1rem 1.25rem",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
};

const mbRowStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(200,255,0,0.15)",
  borderLeft: "3px solid #c8ff00",
  borderRadius: 10,
  padding: "1rem 1.25rem",
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
};

const agencyText: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.95rem",
  color: "#888",
  lineHeight: 1.6,
  fontWeight: 400,
};

const mbText: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.95rem",
  color: "#f5f5f0",
  lineHeight: 1.6,
  fontWeight: 500,
};
