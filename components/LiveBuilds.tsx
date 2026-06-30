"use client";

import ScrollReveal from "./ScrollReveal";

// Six representative demos. Each thumbnail iframes the real, live page —
// not a screenshot — so a prospect can see actual shipped work the moment
// the hero ends.
const DEMOS = [
  { href: "/demo/staffing",     title: "Coverage Command",      vertical: "Staffing" },
  { href: "/demo/hvac",         title: "HVAC Command Center",   vertical: "HVAC" },
  { href: "/demo/restaurant",   title: "Restaurant Owner",      vertical: "Restaurant" },
  { href: "/demo/realestate",   title: "Investor Command",      vertical: "Real Estate" },
  { href: "/demo/pi-firm",      title: "PI Case Platform",      vertical: "Law" },
  { href: "/demo/ecommerce",    title: "Ecommerce Profit",      vertical: "DTC" },
];

const PREVIEW_W = 1280;
const PREVIEW_H = 800;
const SCALE = 0.32;
const CARD_W = Math.round(PREVIEW_W * SCALE); // ~410
const CARD_H = Math.round(PREVIEW_H * SCALE); // ~256

export default function LiveBuilds() {
  return (
    <section style={{ padding: "clamp(3.5rem,6vw,5.5rem) 0 clamp(4rem,7vw,6rem)", background: "#0a0a0a", position: "relative" }}>
      {/* Heading */}
      <div style={{ padding: "0 clamp(1.25rem,5vw,3rem)", marginBottom: "2rem" }}>
        <ScrollReveal>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", maxWidth: "1280px", margin: "0 auto" }}>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#c8ff00", marginRight: "0.6rem", animation: "live-dot 1.6s ease-in-out infinite" }} />
                Live · Click any tile
              </p>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.6vw, 2.6rem)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0 }}>
                Real dashboards. Real shipped work.
              </h2>
            </div>
            <a href="/demo" style={{ color: "#c8ff00", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,255,0,0.4)", paddingBottom: 2, whiteSpace: "nowrap" }}>
              See all demos &rarr;
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontally scrolling rail of iframe previews */}
      <ScrollReveal>
        <div className="live-rail" style={{
          display: "flex",
          gap: "1rem",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          padding: "0 clamp(1.25rem,5vw,3rem) 1rem",
          scrollbarWidth: "thin",
        }}>
          {DEMOS.map((d) => (
            <a
              key={d.href}
              href={d.href}
              target="_blank"
              rel="noreferrer"
              className="live-card"
              style={{
                position: "relative",
                flex: `0 0 ${CARD_W}px`,
                width: CARD_W,
                height: CARD_H + 64,
                scrollSnapAlign: "start",
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              {/* Iframe thumbnail — actual demo, scaled to fit card */}
              <div style={{
                position: "relative",
                width: CARD_W,
                height: CARD_H,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #222",
                background: "#0a0a0a",
                transition: "transform .25s ease, border-color .25s ease, box-shadow .25s ease",
              }}>
                <iframe
                  src={d.href}
                  loading="lazy"
                  scrolling="no"
                  title={d.title}
                  style={{
                    border: "none",
                    width: PREVIEW_W,
                    height: PREVIEW_H,
                    transform: `scale(${SCALE})`,
                    transformOrigin: "top left",
                    pointerEvents: "none",
                  }}
                />
                {/* Top-right "open" badge */}
                <span style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(10,10,10,0.7)",
                  border: "1px solid rgba(200,255,0,0.3)",
                  color: "#c8ff00",
                  fontSize: 10,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  padding: "3px 8px",
                  borderRadius: 100,
                  backdropFilter: "blur(8px)",
                }}>Open ↗</span>
              </div>
              {/* Caption */}
              <div style={{ marginTop: "0.75rem" }}>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f5f5f0" }}>{d.title}</div>
                <div style={{ fontSize: "0.75rem", color: "#888", marginTop: 2, fontFamily: "'Space Mono', monospace", letterSpacing: 1, textTransform: "uppercase" }}>{d.vertical}</div>
              </div>
            </a>
          ))}
        </div>
      </ScrollReveal>

      <style>{`
        @keyframes live-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.7); }
        }
        .live-card:hover > div:first-child {
          transform: translateY(-3px);
          border-color: rgba(200,255,0,0.4);
          box-shadow: 0 10px 40px -10px rgba(200,255,0,0.18);
        }
        .live-rail::-webkit-scrollbar { height: 6px; }
        .live-rail::-webkit-scrollbar-track { background: transparent; }
        .live-rail::-webkit-scrollbar-thumb { background: #222; border-radius: 100px; }
        .live-rail::-webkit-scrollbar-thumb:hover { background: #333; }
      `}</style>
    </section>
  );
}
