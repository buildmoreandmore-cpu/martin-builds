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

export default function BuiltWith() {
  return (
    <section
      style={{
        padding: "5rem 3rem",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        borderBottom: "1px solid rgba(245,245,240,0.06)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
            marginBottom: "3rem",
            color: "#f5f5f0",
          }}
        >
          Built with the best tools in the game.
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          {tools.map((tool) => (
            <ToolTile key={tool.name} tool={tool} />
          ))}
        </div>
      </div>

      <style>{`
        .built-with-tile {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.1rem;
          background: #1a1a1a;
          border: 1px solid rgba(245,245,240,0.08);
          border-radius: 10px;
          cursor: default;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          text-decoration: none;
        }
        .built-with-tile:hover {
          background: #222;
          transform: translateY(-2px);
        }
        .built-with-tile img.tool-icon {
          width: 22px;
          height: 22px;
          object-fit: contain;
          filter: brightness(0.55) saturate(0);
          transition: filter 0.25s;
          flex-shrink: 0;
        }
        .built-with-tile:hover img.tool-icon {
          filter: brightness(1) saturate(1);
        }
        .built-with-tile .tool-name {
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          color: #666;
          transition: color 0.25s;
          white-space: nowrap;
        }
        .built-with-tile:hover .tool-name {
          color: #f5f5f0;
        }
      `}</style>
    </section>
  );
}

function ToolTile({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <div
      className="built-with-tile"
      style={{ "--hover-color": tool.color } as React.CSSProperties}
      onMouseEnter={(e) => {
        const img = e.currentTarget.querySelector<HTMLImageElement>(".tool-icon");
        if (img) img.style.filter = `brightness(1) saturate(1)`;
        const name = e.currentTarget.querySelector<HTMLSpanElement>(".tool-name");
        if (name) name.style.color = tool.color;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${tool.color}44`;
      }}
      onMouseLeave={(e) => {
        const img = e.currentTarget.querySelector<HTMLImageElement>(".tool-icon");
        if (img) img.style.filter = "";
        const name = e.currentTarget.querySelector<HTMLSpanElement>(".tool-name");
        if (name) name.style.color = "";
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
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
  );
}
