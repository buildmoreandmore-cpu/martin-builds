"use client";

export default function AboutHero() {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10rem 3rem 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2rem" }}>
        About
      </div>
      <h1
        className="animate-fade-up-2"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 6rem)",
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: "-3px",
          maxWidth: "900px",
        }}
      >
        I didn&apos;t learn AI
        <br />
        in a classroom.
        <br />
        <span style={{ color: "#c8ff00" }}>I learned it by shipping.</span>
      </h1>
      <div className="animate-fade-up-3" style={{ maxWidth: "650px", marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "#888", lineHeight: 1.75 }}>
          I&apos;ve always had the drive to build and run businesses. But hiring people to execute — not because of cost, but because nobody works with the intensity I bring — became the bottleneck. AI changed that. It let me work at the speed my mind moves.
        </p>
        <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "#888", lineHeight: 1.75 }}>
          So I locked in. I taught myself to code. I went deep on AI — not to talk about it, but to build with it. Now I ship AI-powered tools and products for small businesses who need the same edge I found.
        </p>
      </div>
    </section>
  );
}
