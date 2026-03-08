"use client";

import ScrollReveal from "./ScrollReveal";

export default function VideoPlaceholder() {
  return (
    <section style={{ padding: "clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <ScrollReveal>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* TODO: Replace with Loom/YouTube embed when Francis records a personal intro.
              Record 30-60 seconds: "I'm Francis. I build AI tools for small businesses."
              Show your screen, show a project, keep it casual. */}
          <div
            style={{
              position: "relative",
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(245,245,240,0.06)",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                display: "block",
              }}
            >
              <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
