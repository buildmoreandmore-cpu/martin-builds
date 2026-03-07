"use client";

import ScrollReveal from "../ScrollReveal";

const beliefs = [
  { title: "Ship first, optimize later.", body: "A live product teaches you more in a week than a roadmap teaches you in a year." },
  { title: "AI is a translator, not a replacement.", body: "I don't replace your team. I give them tools that make them dangerous." },
  { title: "Small businesses deserve big tech.", body: "The same AI powering Fortune 500s should be accessible at $5K, not $500K." },
  { title: "Build in public.", body: "I share what I'm working on, what's failing, and what's shipping. Transparency builds trust faster than polish." },
];

export default function Philosophy() {
  return (
    <section style={{ padding: "6rem 3rem", background: "#0a0a0a" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tag}>Philosophy</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={title}>How I operate.</h2>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "5rem",
            marginTop: "4rem",
            alignItems: "start",
          }}
          className="philosophy-grid"
        >
          {/* Left — pull quote */}
          <ScrollReveal>
            <div
              style={{
                borderLeft: "3px solid #c8ff00",
                paddingLeft: "2rem",
                position: "sticky",
                top: "8rem",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                  fontWeight: 800,
                  lineHeight: 1.3,
                  letterSpacing: "-1px",
                  color: "#f5f5f0",
                }}
              >
                Done &gt; perfect.
                <br />
                Shipped &gt; polished.
                <br />
                Building &gt; planning.
              </p>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 300,
                  color: "#888",
                  lineHeight: 1.7,
                }}
              >
                These aren&apos;t mantras I read in a book. They&apos;re the rules I live by because I&apos;ve seen what happens when you don&apos;t.
              </p>
            </div>
          </ScrollReveal>

          {/* Right — beliefs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {beliefs.map((b, i) => (
              <ScrollReveal key={b.title}>
                <div
                  style={{
                    padding: "1.75rem 0",
                    borderBottom: i < beliefs.length - 1 ? "1px solid rgba(245,245,240,0.06)" : "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "#c8ff00", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0, marginTop: "3px", fontFamily: "'Space Mono', monospace" }}>→</span>
                  <div>
                    <span style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f0" }}>{b.title}</span>
                    {" "}
                    <span style={{ fontSize: "1rem", fontWeight: 300, color: "#888", lineHeight: 1.65 }}>{b.body}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .philosophy-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
