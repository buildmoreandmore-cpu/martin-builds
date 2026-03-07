"use client";

import ScrollReveal from "../ScrollReveal";

export default function ContactInfo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Contact details */}
      <ScrollReveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            { label: "Email", value: "francis@martin.builds", href: "mailto:francis@martin.builds" },
            { label: "Based in", value: "Atlanta, GA", href: null },
            { label: "Response time", value: "Within 24 hours", href: null },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#c8ff00", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                {item.label}
              </div>
              {item.href ? (
                <a
                  href={item.href}
                  style={{ fontSize: "1rem", color: "#f5f5f0", fontWeight: 500, transition: "color 0.3s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0")}
                >
                  {item.value}
                </a>
              ) : (
                <span style={{ fontSize: "1rem", color: "#f5f5f0", fontWeight: 500 }}>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Discovery call card */}
      <ScrollReveal>
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(245,245,240,0.06)",
            borderRadius: "16px",
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", borderRadius: "16px 16px 0 0" }} />
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Not sure what you need?</h3>
          <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6, marginBottom: "1.5rem", fontWeight: 300 }}>
            Book a free 30-minute discovery call and I&apos;ll help you figure it out.
          </p>
          <a
            href="/work-with-me"
            style={{
              display: "inline-block",
              background: "#c8ff00",
              color: "#0a0a0a",
              padding: "0.7rem 1.5rem",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.9rem",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 20px rgba(200,255,0,0.25)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Book a Discovery Call
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
