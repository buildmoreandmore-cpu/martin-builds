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
        AI Tools for Healthcare, Legal, Energy &amp; Service Businesses
      </div>

      <p className="animate-fade-up-1" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "1rem", color: "#888", marginBottom: "1rem" }}>
        For healthcare practices, law firms, contractors, and service businesses ready to stop waiting on AI
      </p>

      <h1
        className="animate-fade-up-2"
        style={{
          fontSize: "clamp(3rem, 8vw, 7rem)",
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: "-3px",
          maxWidth: "900px",
        }}
      >
        I build AI systems that save
        <br />
        your team{" "}
        <span style={{ color: "#c8ff00", position: "relative", display: "inline-block" }}>
          thousands of hours.
          <span
            style={{
              content: "''",
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

      <div
        className="animate-fade-up-3"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "1rem",
          color: "#c8ff00",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginTop: "1rem",
        }}
      >
        BUILT BY FRIDAY.
      </div>

      <p
        className="animate-fade-up-3"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
          fontWeight: 300,
          color: "#888",
          maxWidth: "600px",
          marginTop: "2rem",
          lineHeight: 1.7,
        }}
      >
        Custom AI platforms, internal tools, and automation systems for businesses doing $1M+. From client portals to AI-powered operations — designed, built, and deployed in 2-3 weeks.
      </p>

      <div
        className="animate-fade-up-4"
        style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}
      >
        <a href="/discovery-call" style={primaryBtnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
        >
          Book a Free Discovery Call
        </a>
        <a href="#services" style={secondaryBtnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
        >
          See the Work
        </a>
      </div>

      <p
        className="animate-fade-up-4"
        style={{
          fontSize: "0.85rem",
          color: "#888",
          marginTop: "1.2rem",
        }}
      >
        What agencies charge $50K+ for — I build for $5K.{" "}
        <a href="/work-with-me" style={{ color: "#c8ff00", textDecoration: "none" }}>See how →</a>
      </p>
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
};

const secondaryBtnStyle: React.CSSProperties = {
  background: "transparent",
  color: "#f5f5f0",
  padding: "1rem 2.5rem",
  borderRadius: "100px",
  fontWeight: 600,
  fontSize: "1rem",
  border: "1px solid rgba(245,245,240,0.2)",
  transition: "all 0.3s",
  display: "inline-block",
};
