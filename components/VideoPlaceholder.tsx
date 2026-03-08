"use client";

import ScrollReveal from "./ScrollReveal";

export default function VideoPlaceholder() {
  return (
    <section style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* TODO: Replace placeholder with Loom/YouTube embed. Record a 30-60 second intro:
              "I'm Francis. I build AI tools for small businesses. Here's what that looks like."
              Show your screen, show a project, keep it casual. */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              background: "#1a1a1a",
              borderRadius: "16px",
              border: "1px solid rgba(245,245,240,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {/* Play button */}
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#c8ff00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a0a0a">
                  <polygon points="8,5 20,12 8,19" />
                </svg>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#888", margin: 0 }}>
                Watch: How I build AI tools for small businesses
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "1.05rem", color: "#f5f5f0", margin: 0, lineHeight: 1.7 }}>
              I&apos;m Francis. I build AI-powered tools for small businesses from Atlanta. No agency. No team of 12. Just one builder who ships fast.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
