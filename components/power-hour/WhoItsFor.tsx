"use client";

import ScrollReveal from "../ScrollReveal";

const yes = [
  "You run a small business and know AI could help but don't know where to start",
  "You're tired of generic YouTube tutorials that don't apply to your industry",
  "You want a personalized roadmap, not a one-size-fits-all course",
  "You're considering hiring someone to build AI tools and want to understand what's possible first",
];

const no = [
  "You're looking for a full AI implementation (check out my Build Sprint instead)",
  "You want to learn to code — this is strategy, not programming",
  "You need enterprise-level AI consulting for a 500+ person team",
];

export default function WhoItsFor() {
  return (
    <section style={{ padding: "6rem 3rem", maxWidth: "1200px", margin: "0 auto", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
      <ScrollReveal>
        <p style={tag}>Is This for You?</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={title}>Perfect fit vs. not the right time.</h2>
      </ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", marginTop: "3rem" }}>
        <ScrollReveal>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ color: "#c8ff00" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="rgba(200,255,0,0.3)" /><path d="M5.5 9L7.8 11.5L12.5 6.5" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              This is for you if...
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {yes.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontSize: "0.95rem", color: "rgba(245,245,240,0.75)", lineHeight: 1.55, padding: "0.4rem 0" }}>
                  <span style={{ color: "#c8ff00", flexShrink: 0, marginTop: "4px", fontSize: "0.75rem" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ color: "#ff4444" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="rgba(255,68,68,0.3)" /><path d="M6 6l6 6M12 6l-6 6" stroke="#ff4444" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </span>
              This isn&apos;t for you if...
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {no.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", fontSize: "0.95rem", color: "rgba(245,245,240,0.75)", lineHeight: 1.55, padding: "0.4rem 0" }}>
                  <span style={{ color: "#ff4444", flexShrink: 0, marginTop: "4px", fontSize: "0.75rem" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "600px" };
