"use client";

const tools: {
  name: string;
  slug?: string;
  imgSrc?: string;
  color: string;
}[] = [
  { name: "Supabase",    slug: "supabase",          color: "#3ECF8E" },
  { name: "GitHub",      slug: "github",             color: "#f5f5f0" },
  { name: "Stripe",      slug: "stripe",             color: "#635BFF" },
  { name: "Cursor",      slug: "cursor",             color: "#f5f5f0" },
  { name: "VS Code",     slug: "visualstudiocode",   color: "#007ACC" },
  { name: "Vercel",      slug: "vercel",             color: "#f5f5f0" },
  { name: "Anthropic",   slug: "anthropic",          color: "#c8ff00" },
  { name: "Perplexity",  slug: "perplexity",         color: "#20B2AA" },
  { name: "Google",      slug: "google",             color: "#4285F4" },
  { name: "Clerk",       slug: "clerk",              color: "#6C47FF" },
  { name: "OpenAI",      slug: "openai",             color: "#f5f5f0" },
  { name: "Grok",        slug: "xai",                color: "#f5f5f0" },
  { name: "OpenClaw",    imgSrc: "/openclaw-logo.png", color: "#FF4D3D" },
];

// Duplicate for seamless loop
const doubled = [...tools, ...tools];

export default function BuiltWith() {
  return (
    <section
      style={{
        padding: "4rem 0",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        borderBottom: "1px solid rgba(245,245,240,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3rem" }}>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.75rem",
            color: "#c8ff00",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Built With
        </p>
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            fontWeight: 800,
            letterSpacing: "-1px",
            marginBottom: "2.5rem",
            color: "#f5f5f0",
          }}
        >
          Built with the best tools in the game.
        </h2>
      </div>

      {/* Carousel track */}
      <div style={{ position: "relative" }}>
        {/* Left fade */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }} />
        {/* Right fade */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div className="carousel-track">
          {doubled.map((tool, i) => (
            <div
              key={`${tool.name}-${i}`}
              className="carousel-tile"
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = `${tool.color}44`;
                el.style.background = "#222";
                const img = el.querySelector<HTMLImageElement>(".tool-icon");
                if (img) img.style.filter = "brightness(1) saturate(1)";
                const name = el.querySelector<HTMLSpanElement>(".tool-name");
                if (name) name.style.color = tool.color;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(245,245,240,0.08)";
                el.style.background = "#1a1a1a";
                const img = el.querySelector<HTMLImageElement>(".tool-icon");
                if (img) img.style.filter = "brightness(0.55) saturate(0)";
                const name = el.querySelector<HTMLSpanElement>(".tool-name");
                if (name) name.style.color = "#666";
              }}
            >
              {tool.slug ? (
                <img
                  className="tool-icon"
                  src={`https://cdn.simpleicons.org/${tool.slug}/888888`}
                  alt={`${tool.name} logo`}
                  width={22}
                  height={22}
                />
              ) : tool.imgSrc ? (
                <img
                  className="tool-icon"
                  src={tool.imgSrc}
                  alt={`${tool.name} logo`}
                  width={22}
                  height={22}
                  style={{ filter: "none", borderRadius: "4px" }}
                />
              ) : null}
              <span className="tool-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .carousel-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        .carousel-tile {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.1rem;
          background: #1a1a1a;
          border: 1px solid rgba(245,245,240,0.08);
          border-radius: 10px;
          cursor: default;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          flex-shrink: 0;
        }
        .carousel-tile:hover {
          transform: translateY(-2px);
        }
        .carousel-tile .tool-icon {
          width: 22px;
          height: 22px;
          object-fit: contain;
          filter: brightness(0.55) saturate(0);
          transition: filter 0.25s;
          flex-shrink: 0;
        }
        .carousel-tile .tool-name {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #666;
          transition: color 0.25s;
          white-space: nowrap;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 480px) {
          .carousel-track { animation-duration: 20s; }
        }
      `}</style>
    </section>
  );
}
