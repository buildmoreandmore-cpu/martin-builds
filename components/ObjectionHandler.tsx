"use client";

import ScrollReveal from "./ScrollReveal";

const MoneyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const GhostIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2 3 3-3 3 3 2-3 3 3V10a8 8 0 0 0-8-8z" />
    <circle cx="9" cy="10" r="1" fill="#888" stroke="none" />
    <circle cx="15" cy="10" r="1" fill="#888" stroke="none" />
  </svg>
);

const BoltIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function ObjectionHandler() {
  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
        className="objection-grid"
      >
        {/* Pain 1 */}
        <ScrollReveal>
          <div style={painCardStyle}>
            <div style={iconWrapStyle}><MoneyIcon /></div>
            <h3 style={painTitleStyle}>Agencies</h3>
            <p style={painTextStyle}>Quote $50K and take 6 months. You get a deck, a timeline, and a Slack channel — but nothing live.</p>
          </div>
        </ScrollReveal>

        {/* Pain 2 */}
        <ScrollReveal>
          <div style={painCardStyle}>
            <div style={iconWrapStyle}><GhostIcon /></div>
            <h3 style={painTitleStyle}>Freelancers</h3>
            <p style={painTextStyle}>Ghost after the first call. Or deliver something half-built and disappear when it breaks.</p>
          </div>
        </ScrollReveal>

        {/* Solution */}
        <ScrollReveal>
          <div style={solutionCardStyle}>
            <div style={{ ...iconWrapStyle, background: "rgba(200,255,0,0.1)" }}><BoltIcon /></div>
            <h3 style={{ ...painTitleStyle, color: "#f5f5f0" }}>I fix that.</h3>
            <p style={{ ...painTextStyle, color: "rgba(245,245,240,0.7)" }}>One builder. Clear scope. Live product in 14 days. No vanishing acts.</p>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .objection-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}

const painCardStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(245,245,240,0.06)",
  borderRadius: "16px",
  padding: "2rem",
  height: "100%",
};

const solutionCardStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(200,255,0,0.15)",
  borderLeft: "3px solid #c8ff00",
  borderRadius: "16px",
  padding: "2rem",
  height: "100%",
};

const iconWrapStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  background: "rgba(245,245,240,0.04)",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1.2rem",
};

const painTitleStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#888",
  marginBottom: "0.6rem",
};

const painTextStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.95rem",
  fontWeight: 300,
  color: "#666",
  lineHeight: 1.7,
};
