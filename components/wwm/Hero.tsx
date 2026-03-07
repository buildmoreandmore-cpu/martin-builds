"use client";

export default function WWMHero() {
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
          top: "-20%",
          left: "-5%",
          width: "70vw",
          height: "70vw",
          background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-fade-up-1"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.75rem",
          color: "#c8ff00",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        Work With Me
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
        You have a business problem.
        <br />
        <span style={{ color: "#c8ff00" }}>I build the AI tool</span>
        <br />
        that solves it.
      </h1>
      <p
        className="animate-fade-up-3"
        style={{
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          fontWeight: 300,
          color: "#888",
          maxWidth: "600px",
          marginTop: "2rem",
          lineHeight: 1.7,
        }}
      >
        No 6-month timelines. No bloated proposals. No team of 12. Just one builder who shows up, ships fast, and hands you something that works.
      </p>
      <div className="animate-fade-up-4" style={{ marginTop: "3rem" }}>
        <a
          href="#book-call"
          style={{
            display: "inline-block",
            background: "#c8ff00",
            color: "#0a0a0a",
            padding: "1rem 2.5rem",
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.5px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Book a Free Discovery Call
        </a>
      </div>
    </section>
  );
}
