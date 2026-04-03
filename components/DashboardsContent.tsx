"use client";

import ScrollReveal from "./ScrollReveal";

export default function DashboardsContent() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(8rem,12vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,6vw,5rem)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50vw",
            height: "50vw",
            background: "radial-gradient(circle, rgba(29,158,117,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2rem" }}>
          Custom Dashboards
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-3px",
            maxWidth: "800px",
          }}
        >
          Built for how you
          <br />
          <span style={{ color: "#c8ff00" }}>actually work.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
            fontWeight: 300,
            color: "#888",
            maxWidth: "550px",
            marginTop: "2rem",
            lineHeight: 1.7,
          }}
        >
          One screen. Your data. Your metrics. Owned forever. No monthly fees.
        </p>

        <div style={{ marginTop: "2.5rem" }}>
          <a
            href="/discovery-call"
            style={primaryBtnStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Book a Free Discovery Call
          </a>
        </div>
      </section>

      {/* Case Study */}
      <section
        style={{
          padding: "clamp(4rem,8vw,6rem) clamp(1.25rem,5vw,3rem)",
          background: "#1a1a1a",
          borderTop: "1px solid rgba(200,255,0,0.08)",
        }}
      >
        <ScrollReveal>
          <p style={tagStyle}>Case Study</p>
        </ScrollReveal>

        <ScrollReveal>
          <div
            style={{
              maxWidth: "700px",
              background: "#0a0a0a",
              border: "1px solid rgba(245,245,240,0.06)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            {/* Placeholder visual */}
            <div
              style={{
                height: "220px",
                background: "linear-gradient(135deg, rgba(29,158,117,0.08) 0%, rgba(200,255,0,0.04) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid rgba(245,245,240,0.06)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: "rgba(29,158,117,0.15)",
                    border: "1px solid rgba(29,158,117,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1d9e75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="4" rx="1" />
                    <rect x="14" y="10" width="7" height="7" rx="1" />
                    <rect x="3" y="13" width="7" height="4" rx="1" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#888", letterSpacing: "1px" }}>
                  SCREENSHOT COMING SOON
                </p>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                {["Healthcare", "Portal", "Dashboard"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(29,158,117,0.08)",
                      border: "1px solid rgba(29,158,117,0.15)",
                      borderRadius: "100px",
                      padding: "0.3rem 0.75rem",
                      fontSize: "0.65rem",
                      fontFamily: "'Space Mono', monospace",
                      color: "#1d9e75",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "-0.5px" }}>
                PCG Screening Services
              </h3>

              <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.7 }}>
                Multi-client screening portal with employer dashboard — built in 14 days. Employers log in, submit candidates, track background check status in real time. Replaced a manual spreadsheet + email workflow that was costing 10+ hours a week.
              </p>

              <div
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem",
                  borderTop: "1px solid rgba(245,245,240,0.06)",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  color: "#c8ff00",
                }}
              >
                14-day build · Multi-tenant portal
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          padding: "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,3rem)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "60vw",
            background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <ScrollReveal>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Your dashboard is next.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <a
            href="/discovery-call"
            style={primaryBtnStyle}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Start a Project
          </a>
        </ScrollReveal>
      </section>
    </main>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  background: "#c8ff00",
  color: "#0a0a0a",
  padding: "1rem 2.5rem",
  borderRadius: "100px",
  fontWeight: 700,
  fontSize: "1rem",
  letterSpacing: "0.5px",
  transition: "all 0.3s",
  display: "inline-block",
  textDecoration: "none",
};

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "#c8ff00",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};
