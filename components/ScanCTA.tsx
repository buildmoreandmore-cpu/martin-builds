"use client";

import ScrollReveal from "./ScrollReveal";

export default function ScanCTA() {
  return (
    <section
      style={{
        padding: "clamp(3rem,6vw,4rem) clamp(1.25rem,5vw,3rem)",
        background: "rgba(200,255,0,0.03)",
        borderTop: "1px solid rgba(200,255,0,0.08)",
        borderBottom: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <ScrollReveal>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
          className="scan-cta-grid"
        >
          {/* Left — icon + text */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                color: "#c8ff00",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Free Tool
            </p>
            <h3
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 800,
                letterSpacing: "-1px",
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              See where your site is leaking leads.
            </h3>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 300,
                color: "#888",
                lineHeight: 1.7,
                maxWidth: "500px",
              }}
            >
              Free AI-powered site audit. Takes 30 seconds. No email required. See exactly what&apos;s costing you customers — before we ever talk.
            </p>
          </div>

          {/* Right — CTA button */}
          <div style={{ flexShrink: 0 }}>
            <a
              href="/scan"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#c8ff00",
                color: "#0a0a0a",
                padding: "1rem 2rem",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.5px",
                transition: "all 0.3s",
                textDecoration: "none",
                whiteSpace: "nowrap",
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
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0a0a0a", display: "inline-block" }} />
              Run Free Scan
            </a>
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        @media (max-width: 600px) {
          .scan-cta-grid {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
