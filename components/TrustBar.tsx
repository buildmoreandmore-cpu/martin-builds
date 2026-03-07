"use client";

const clients = [
  "2KB Energy Engineering",
  "Kingly Consulting",
  "Solid Source Claims",
  "Birdhouse Coffee",
  "My College Finance",
  "ServeRight Network",
];

export default function TrustBar() {
  return (
    <div
      style={{
        padding: "3rem",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        borderBottom: "1px solid rgba(245,245,240,0.06)",
      }}
    >
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.7rem",
          color: "#888",
          letterSpacing: "3px",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Built for &amp; trusted by
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        {clients.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "rgba(245,245,240,0.25)",
              letterSpacing: "1px",
              whiteSpace: "nowrap",
              transition: "color 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "rgba(245,245,240,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "rgba(245,245,240,0.25)")}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
