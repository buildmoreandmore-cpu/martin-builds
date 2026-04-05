"use client";

import ScrollReveal from "./ScrollReveal";

export default function Founder() {
  return (
    <section
      style={{
        padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,255,0,0.08)",
      }}
    >
      <div style={{ maxWidth: "720px" }}>
        <ScrollReveal>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              color: "#c8ff00",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            Who&apos;s Building This
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              color: "#f5f5f0",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            I&apos;m a self-taught builder based in Atlanta. I run martin.builds
            as a solo studio. No account managers. No offshore team. No
            handoffs.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              color: "#f5f5f0",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            Every site I ship, I built myself. That&apos;s not a limitation —
            it&apos;s the point. You get one person who knows the business
            problem, designed the solution, wrote the code, and will answer your
            message the same day.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              color: "#888",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            I&apos;ve shipped 10+ products across staffing, energy, consulting,
            and retail. Every one in under 14 days.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              fontWeight: 400,
              color: "#888",
              lineHeight: 1.8,
            }}
          >
            If you&apos;ve been burned by agencies that disappear after kickoff,
            or developers who need three calls to understand what you&apos;re
            asking — this is the alternative.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
