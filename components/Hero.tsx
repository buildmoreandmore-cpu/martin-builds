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
      }}
    >
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

      <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2rem" }}>
        Custom Dashboards · Portals · AI Tools
      </div>

      <h1
        className="animate-fade-up-2"
        style={{
          fontSize: "clamp(2.8rem, 7vw, 6rem)",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-3px",
          maxWidth: "900px",
        }}
      >
        See exactly where your money is &mdash; and where{" "}
        <span style={{ color: "#c8ff00", position: "relative", display: "inline-block" }}>
          it&rsquo;s leaking.
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
          fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
          fontWeight: 500,
          color: "#f5f5f0",
          maxWidth: "640px",
          marginTop: "1.5rem",
          lineHeight: 1.5,
        }}
      >
        Custom dashboards, portals, and AI tools that replace manual work and give you real-time visibility.
      </p>

      <p
        className="animate-fade-up-3"
        style={{
          fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
          fontWeight: 400,
          color: "#888",
          maxWidth: "560px",
          marginTop: "0.75rem",
          lineHeight: 1.6,
        }}
      >
        Built in 2 weeks. Fixed price. <span style={{ color: "#c8ff00" }}>You own the code.</span>
      </p>

      <div
        className="animate-fade-up-4"
        style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}
      >
        <a href="/discovery-call" style={primaryBtnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
        >
          See What I&apos;d Build For You
        </a>
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

