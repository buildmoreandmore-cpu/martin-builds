"use client";

import { useState } from "react";

export default function Hero() {
  const [spinning, setSpinning] = useState(false);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(6rem,12vw,8rem) clamp(1.25rem,5vw,3rem) clamp(3rem,6vw,4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes earth-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .earth-wrap {
          position: absolute;
          top: 50%;
          right: clamp(-380px, -16vw, -180px);
          transform: translateY(-50%);
          width: clamp(520px, 60vw, 880px);
          height: clamp(520px, 60vw, 880px);
          pointer-events: none;
          z-index: 0;
        }
        .earth-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.55;
          cursor: pointer;
          pointer-events: auto;
          filter: drop-shadow(0 0 80px rgba(80,150,255,0.18));
          transition: opacity .25s ease, filter .25s ease;
        }
        .earth-img:hover {
          opacity: 0.75;
          filter: drop-shadow(0 0 100px rgba(120,180,255,0.32));
        }
        .earth-img.spinning {
          animation: earth-spin 22s linear infinite;
          opacity: 0.7;
          filter: drop-shadow(0 0 120px rgba(120,180,255,0.4));
        }
        @media (max-width: 768px) {
          .earth-wrap {
            top: auto;
            bottom: -200px;
            right: -180px;
            transform: none;
            width: 480px;
            height: 480px;
          }
          .earth-img { opacity: 0.35; }
        }
        .hero-content { position: relative; z-index: 1; }
      `}</style>

      {/* Earth — click to spin */}
      <div className="earth-wrap">
        <img
          src="/earth.png"
          alt="Earth from space"
          className={`earth-img${spinning ? " spinning" : ""}`}
          onClick={() => setSpinning((v) => !v)}
          title={spinning ? "Click to stop" : "Click to spin"}
        />
      </div>

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="hero-content">
      <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2rem" }}>
        Custom Dashboards · Portals · AI Tools
      </div>

      <h1
        className="animate-fade-up-2"
        style={{
          fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-2.5px",
          maxWidth: "920px",
        }}
      >
        The custom platform agencies quote at $30K.{" "}
        <span style={{ color: "#c8ff00", position: "relative", display: "inline-block" }}>
          Built in 14 days.
          <span
            style={{
              position: "absolute",
              bottom: "5px",
              left: 0,
              right: 0,
              height: "4px",
              background: "#c8ff00",
              opacity: 0.4,
              borderRadius: "2px",
              display: "block",
            }}
          />
        </span>
      </h1>

      <p
        className="animate-fade-up-3"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
          fontWeight: 600,
          color: "#f5f5f0",
          maxWidth: "640px",
          marginTop: "1.5rem",
          lineHeight: 1.5,
        }}
      >
        One operator. Fixed price. You own the code. No retainers, no account managers, no offshore handoffs.
      </p>

      <p
        className="animate-fade-up-3"
        style={{
          fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)",
          fontWeight: 400,
          color: "#888",
          maxWidth: "620px",
          marginTop: "1rem",
          lineHeight: 1.7,
        }}
      >
        Custom dashboards, portals, and AI tools &mdash; designed, built, and shipped by the same person who answers your texts. Most builds ship in 14 days.
      </p>

      <div
        className="animate-fade-up-4"
        style={{ display: "flex", gap: "1.5rem", marginTop: "3rem", flexWrap: "wrap", alignItems: "center" }}
      >
        <a href="/discovery-call" style={primaryBtnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
        >
          Get Your 14-Day Quote
        </a>
        <a href="/demo" style={{ color: "#c8ff00", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(200,255,0,0.4)", paddingBottom: 2 }}>
          See live demos &rarr;
        </a>
      </div>
      </div>
    </section>
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

