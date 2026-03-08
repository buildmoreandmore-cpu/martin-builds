"use client";

import ScrollReveal from "./ScrollReveal";

const industries = [
  "Energy & Engineering",
  "Professional Services",
  "Healthcare & Medical",
  "Construction & Contracting",
  "Property Management",
  "Insurance & Financial Services",
  "Logistics & Fleet",
  "Staffing & Recruiting",
  "Franchise Operations",
  "Legal & Law Firms",
];

export default function Industries() {
  return (
    <section style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <p style={sectionTag}>Industries</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={sectionTitle}>
          I build for businesses that
          <br />
          run on operations.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={sectionSub}>
          If your team spends hours on repetitive tasks, manual processes, or disconnected tools — that&apos;s where AI creates the most value.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "3rem", maxWidth: "800px" }}>
          {industries.map((ind) => (
            <span
              key={ind}
              className="industry-pill"
              style={{
                background: "#2a2a2a",
                border: "1px solid rgba(245,245,240,0.08)",
                borderRadius: "100px",
                padding: "0.5rem 1.2rem",
                fontSize: "0.85rem",
                color: "#f5f5f0",
                transition: "border-color 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = "#c8ff00"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(245,245,240,0.08)"; }}
            >
              {ind}
            </span>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p style={{ fontSize: "0.9rem", color: "#888", marginTop: "2rem", lineHeight: 1.7 }}>
          Don&apos;t see your industry? I&apos;ve built for 6+ verticals.{" "}
          <a href="/discovery-call" style={{ color: "#c8ff00", textDecoration: "none" }}>Let&apos;s talk about yours.</a>
        </p>
      </ScrollReveal>
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
  fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
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
