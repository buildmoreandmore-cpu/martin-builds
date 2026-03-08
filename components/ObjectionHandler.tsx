"use client";

import ScrollReveal from "./ScrollReveal";

export default function ObjectionHandler() {
  return (
    <ScrollReveal>
      <section
        style={{
          padding: "3rem clamp(1.25rem,5vw,3rem)",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: "1.2rem",
            color: "#888",
            lineHeight: 1.8,
          }}
        >
          You&apos;ve seen what AI can do. But agencies quote $50K and take 6 months.
          Freelancers ghost after the first call. And your team doesn&apos;t have the
          bandwidth to figure it out.
        </p>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "1.2rem",
            color: "#f5f5f0",
            lineHeight: 1.8,
            marginTop: "1.5rem",
          }}
        >
          I fix that.
        </p>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: "1.2rem",
            color: "#888",
            lineHeight: 1.8,
            marginTop: "1.5rem",
          }}
        >
          One builder. Clear scope. Live product in 14 days.
        </p>
      </section>
    </ScrollReveal>
  );
}
