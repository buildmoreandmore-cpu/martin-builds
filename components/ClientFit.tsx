"use client";

import ScrollReveal from "./ScrollReveal";

const rightFit = [
  "You have a real business problem — not a vague idea",
  "You're ready to move this month, not next quarter",
  "You value speed and clarity over endless meetings",
  "You trust the builder and stay out of the weeds",
  "You see AI as an investment, not an experiment",
];

const notFit = [
  "You want a proposal deck before committing to a conversation",
  "You need committee approval for every decision",
  "You're shopping five vendors for the lowest price",
  "You want to micromanage the build day by day",
  "You're not sure if you even need AI yet",
];

export default function ClientFit() {
  return (
    <section
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <ScrollReveal>
        <p style={sectionTag}>Client-Builder Fit</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          I don&apos;t work with everyone.
          <br />
          <span style={{ color: "#c8ff00" }}>That&apos;s on purpose.</span>
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={sectionSub}>
          Most agencies will take any check. I&apos;d rather build fewer things that actually ship than chase projects that stall. Here&apos;s how to know if we&apos;re a fit.
        </p>
      </ScrollReveal>

      <div
        className="fit-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginTop: "3rem",
          maxWidth: "900px",
        }}
      >
        {/* Right fit */}
        <ScrollReveal>
          <div style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(200,255,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f5f5f0", margin: 0 }}>
                We&apos;re a fit if...
              </h3>
            </div>
            <ul style={listStyle}>
              {rightFit.map((item) => (
                <li key={item} style={listItemStyle}>
                  <span style={{ color: "#c8ff00", flexShrink: 0, marginTop: "2px" }}>&#8594;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Not fit */}
        <ScrollReveal>
          <div style={{ ...cardStyle, borderColor: "rgba(245,245,240,0.06)" }}>
            <div style={cardHeaderStyle}>
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(136,136,136,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#888", margin: 0 }}>
                Probably not a fit if...
              </h3>
            </div>
            <ul style={listStyle}>
              {notFit.map((item) => (
                <li key={item} style={{ ...listItemStyle, color: "#666" }}>
                  <span style={{ color: "#555", flexShrink: 0, marginTop: "2px" }}>&#8594;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div
          style={{
            maxWidth: "900px",
            marginTop: "2.5rem",
            padding: "1.5rem 2rem",
            background: "#111",
            borderRadius: "12px",
            border: "1px solid rgba(200,255,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              color: "#888",
              lineHeight: 1.7,
              margin: 0,
              flex: 1,
              minWidth: "250px",
            }}
          >
            Not sure? That&apos;s what the discovery call is for. 30 minutes, no commitment — I&apos;ll tell you honestly if I can help.
          </p>
          <a
            href="/discovery-call"
            style={{
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "0.75rem 2rem",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.5px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Book a Discovery Call
          </a>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .fit-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const sectionTag: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: "-2px",
  maxWidth: "700px",
};

const sectionSub: React.CSSProperties = {
  fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
  fontWeight: 300,
  color: "#888",
  maxWidth: "600px",
  marginTop: "1.5rem",
  lineHeight: 1.7,
};

const cardStyle: React.CSSProperties = {
  background: "#1a1a1a",
  border: "1px solid rgba(200,255,0,0.12)",
  borderRadius: "16px",
  padding: "2rem",
  height: "100%",
};

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1.5rem",
};

const listStyle: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

const listItemStyle: React.CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  fontSize: "0.95rem",
  color: "#ccc",
  lineHeight: 1.5,
};
