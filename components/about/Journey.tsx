"use client";

import ScrollReveal from "../ScrollReveal";

const cards = [
  {
    num: "01",
    title: "Roots",
    body: "Born with family roots in St. Thomas, USVI — a tiny Caribbean island with a big sense of resourcefulness. When you come from a place where you figure things out with what you have, you don't wait for permission to start. That energy shaped everything I build.",
    align: "left" as const,
  },
  {
    num: "02",
    title: "The Grind",
    body: "I ran businesses before AI was a buzzword — from small business consulting to real estate lending to joint ventures. Every venture taught me the same lesson: small businesses don't need more strategy decks. They need someone who builds the thing and makes it work.",
    align: "right" as const,
  },
  {
    num: "03",
    title: "The Lock-In",
    body: "When AI hit, I recognized the moment. I knew that to get the most out of it, I couldn't just use the tools — I had to understand them at a technical level. So I learned to code, started building in public, and shipped over 10 AI-powered products. Not concepts. Shipped products.",
    align: "left" as const,
  },
];

export default function Journey() {
  return (
    <section
      style={{
        padding: "6rem 3rem",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        background: "#111",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <ScrollReveal>
          <p style={tag}>The Path</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={title}>From the Caribbean to the command line.</h2>
        </ScrollReveal>

        <div style={{ marginTop: "4rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          {cards.map((card) => (
            <ScrollReveal key={card.num}>
              <div
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(245,245,240,0.06)",
                  borderRadius: "16px",
                  padding: "3rem",
                  display: "flex",
                  gap: "3rem",
                  alignItems: "flex-start",
                  flexDirection: card.align === "right" ? "row-reverse" : "row",
                  transition: "border-color 0.4s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.12)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)")}
              >
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "5rem",
                    fontWeight: 700,
                    color: "rgba(200,255,0,0.08)",
                    lineHeight: 1,
                    flexShrink: 0,
                    userSelect: "none",
                  }}
                >
                  {card.num}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      letterSpacing: "-0.5px",
                      marginBottom: "1rem",
                      color: "#f5f5f0",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "#888", lineHeight: 1.75 }}>
                    {card.body}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
