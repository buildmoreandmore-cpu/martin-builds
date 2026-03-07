"use client";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "8rem 3rem 4rem",
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
        AI Tools &amp; Products for Small Businesses
      </div>

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
        I build the AI tools
        <br />
        your business{" "}
        <span style={{ color: "#c8ff00", position: "relative", display: "inline-block" }}>
          actually needs.
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
        You don&apos;t need a deck about AI strategy. You need someone who shows up, builds the thing, and it works by Friday. That&apos;s what I do.
      </p>

      <div
        className="animate-fade-up-4"
        style={{ display: "flex", gap: "1rem", marginTop: "3rem", flexWrap: "wrap" }}
      >
        <a href="#cta" style={primaryBtnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
        >
          Start a 2-Week Sprint
        </a>
        <a href="#work" style={secondaryBtnStyle}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#c8ff00"; (e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(245,245,240,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0"; }}
        >
          See the Work
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
