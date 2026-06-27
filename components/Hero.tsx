"use client";

export default function Hero() {
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
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }

        /* Deep-space backdrop: a layered radial gradient that gives a
           subtle nebula glow + pitch-black corners. Sits beneath the
           stars and the planet. */
        .space-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 70% 40%, rgba(60, 90, 180, 0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(120, 60, 180, 0.06) 0%, transparent 55%),
            #03050b;
          z-index: 0;
        }

        /* Stars: a stack of tiny dots scattered via box-shadow. Two
           sizes for parallax-like depth; the small ones twinkle. */
        .stars, .stars-sm {
          position: absolute;
          width: 1px; height: 1px;
          background: white;
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }
        .stars {
          top: 0; left: 0;
          box-shadow:
            120px 80px white, 230px 140px white, 410px 60px white,
            560px 220px white, 720px 110px white, 890px 320px white,
            1100px 80px white, 1240px 200px white, 1360px 420px white,
            1520px 80px white, 1680px 240px white, 1820px 140px white,
            2000px 360px white, 80px 380px white, 320px 480px white,
            540px 620px white, 780px 540px white, 1020px 700px white,
            1280px 580px white, 1480px 660px white, 1720px 740px white,
            1940px 520px white, 200px 760px white, 460px 820px white,
            680px 900px white, 920px 860px white;
          opacity: 0.85;
        }
        .stars-sm {
          top: 0; left: 0;
          box-shadow:
            60px 130px rgba(255,255,255,0.7), 180px 250px rgba(255,255,255,0.7),
            340px 180px rgba(255,255,255,0.7), 500px 80px rgba(255,255,255,0.7),
            660px 280px rgba(255,255,255,0.7), 820px 180px rgba(255,255,255,0.7),
            980px 380px rgba(255,255,255,0.7), 1140px 240px rgba(255,255,255,0.7),
            1320px 100px rgba(255,255,255,0.7), 1480px 340px rgba(255,255,255,0.7),
            1640px 200px rgba(255,255,255,0.7), 1800px 420px rgba(255,255,255,0.7),
            1960px 280px rgba(255,255,255,0.7), 140px 540px rgba(255,255,255,0.7),
            380px 700px rgba(255,255,255,0.7), 600px 480px rgba(255,255,255,0.7),
            840px 660px rgba(255,255,255,0.7), 1080px 580px rgba(255,255,255,0.7),
            1340px 720px rgba(255,255,255,0.7), 1560px 480px rgba(255,255,255,0.7),
            1780px 620px rgba(255,255,255,0.7), 1980px 700px rgba(255,255,255,0.7),
            260px 880px rgba(255,255,255,0.7), 540px 820px rgba(255,255,255,0.7),
            780px 940px rgba(255,255,255,0.7), 1020px 880px rgba(255,255,255,0.7),
            1260px 940px rgba(255,255,255,0.7);
          animation: twinkle 4s ease-in-out infinite;
        }

        /* Earth — shifted off the right edge so it reads as background,
           not centrepiece. Roughly two-thirds of it sits off-screen on
           desktop; on mobile it tucks under the text. */
        .earth-anchor {
          position: absolute;
          top: 50%;
          left: auto;
          right: calc(min(80vh, 900px) * -0.45);
          width: min(80vh, 900px);
          height: min(80vh, 900px);
          margin-top: calc(min(80vh, 900px) / -2);
          pointer-events: none;
          z-index: 0;
        }
        .earth-bg {
          width: 100%;
          height: 100%;
          background-image: url('/earth.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.7;
          animation: earth-spin 80s linear infinite;
          -webkit-mask-image: radial-gradient(circle, black 44%, transparent 68%);
                  mask-image: radial-gradient(circle, black 44%, transparent 68%);
          will-change: transform;
          filter: drop-shadow(0 0 60px rgba(80, 140, 255, 0.18));
        }
        @media (max-width: 768px) {
          .earth-anchor {
            top: auto;
            bottom: -30vw;
            right: -40vw;
            width: 110vw;
            height: 110vw;
            margin-top: 0;
          }
          .earth-bg { opacity: 0.45; }
        }
        .hero-content { position: relative; z-index: 1; }
      `}</style>

      {/* Space backdrop + stars (behind everything) */}
      <div className="space-bg" aria-hidden="true" />
      <div className="stars" aria-hidden="true" />
      <div className="stars-sm" aria-hidden="true" />

      {/* Earth */}
      <div className="earth-anchor" aria-hidden="true">
        <div className="earth-bg" />
      </div>

      {/* Subtle yellow-green brand glow on the left */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-15%",
          width: "55vw",
          height: "55vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
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

