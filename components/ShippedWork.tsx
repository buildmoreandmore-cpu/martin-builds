"use client";

import ScrollReveal from "./ScrollReveal";

/*
  Real client work — verified, live, link-out cards.

  No screenshots here on purpose: this environment has no headless-
  browser tooling to capture real dashboard images, and faking mockups
  labeled "real shipped work" would recreate the exact credibility gap
  this section exists to fix. Instead: honest descriptions + a live
  link so a visitor can go verify it themselves.
*/

const PROJECTS = [
  {
    name: "PCG Screening",
    what: "Background Screening Services",
    accent: "#1e3a5f",
    body: "A three-portal platform — employer dashboard, candidate intake workflow, and admin operations tools — replacing a fragmented, manual screening process.",
    proof: "“Martin helped me move from ‘I have an idea’ to ‘I have a platform.’” — Gwendolyn Brandon, Owner",
    href: "https://www.pcgscreening.net",
  },
  {
    name: "HeartPath Home Care",
    what: "Pediatric Home Care (GAPP)",
    accent: "#1D3A63",
    body: "A private team command center for a Georgia pediatric home-care agency — referral intake, staff directory, and an internal ops assistant — sitting behind a public funnel site.",
    proof: null,
    href: "https://myheartpathcare.com",
  },
];

export default function ShippedWork() {
  return (
    <section style={{ padding: "clamp(3.5rem,6vw,5.5rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <ScrollReveal>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem" }}>
            Shipped Work
          </p>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.6rem)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0, maxWidth: 640 }}>
            Real clients. Real platforms. Live right now.
          </h2>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
          {PROJECTS.map((p) => (
            <ScrollReveal key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                style={{ display: "block", height: "100%", textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="shipped-card"
                  style={{
                    height: "100%",
                    background: "#141414",
                    border: "1px solid rgba(245,245,240,0.08)",
                    borderRadius: "16px",
                    padding: "1.75rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: p.accent }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>{p.what}</span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.5px", margin: "0 0 0.75rem 0" }}>{p.name}</h3>
                  <p style={{ fontSize: "0.88rem", color: "#aaa", lineHeight: 1.6, marginBottom: p.proof ? "1rem" : "1.5rem" }}>{p.body}</p>
                  {p.proof && (
                    <p style={{ fontSize: "0.8rem", color: "#c8ff00", fontStyle: "italic", lineHeight: 1.5, marginBottom: "1.25rem" }}>{p.proof}</p>
                  )}
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#c8ff00", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    Visit the live site <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        .shipped-card:hover { transform: translateY(-3px); border-color: rgba(200,255,0,0.25); }
      `}</style>
    </section>
  );
}
