"use client";

import { useEffect, useState } from "react";

const row1Tools = [
  { name: "Supabase",    slug: "supabase",          color: "#3ECF8E" },
  { name: "GitHub",      slug: "github",             color: "#f5f5f0" },
  { name: "Stripe",      slug: "stripe",             color: "#635BFF" },
  { name: "Cursor",      slug: "cursor",             color: "#f5f5f0" },
  { name: "VS Code",     slug: "visualstudiocode",   color: "#007ACC" },
  { name: "Vercel",      slug: "vercel",             color: "#f5f5f0" },
];

const row2Tools = [
  { name: "Anthropic",   slug: "anthropic",          color: "#c8ff00" },
  { name: "Perplexity",  slug: "perplexity",         color: "#20B2AA" },
  { name: "Google",      slug: "google",             color: "#4285F4" },
  { name: "Clerk",       slug: "clerk",              color: "#6C47FF" },
  { name: "OpenAI",      slug: "openai",             color: "#f5f5f0" },
  { name: "Grok",        slug: "grok",               color: "#f5f5f0" },
];

const row1Doubled = [...row1Tools, ...row1Tools];
const row2Doubled = [...row2Tools, ...row2Tools];

const CUSTOM_ICONS: Record<string, string> = {
  grok: `<svg width="26" height="26" viewBox="0 0 24 24" fill="#666" style="transition:fill 0.25s" xmlns="http://www.w3.org/2000/svg"><path d="M2 4l8 8-8 8h4l6-6 6 6h4l-8-8 8-8h-4l-6 6-6-6z"/></svg>`,
};

function ToolIcon({ slug, color }: { slug: string; color: string }) {
  const [svgContent, setSvgContent] = useState<string | null>(CUSTOM_ICONS[slug] || null);

  useEffect(() => {
    if (CUSTOM_ICONS[slug]) return;
    fetch(`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`)
      .then(r => r.ok ? r.text() : "")
      .then(text => { if (text) setSvgContent(text); })
      .catch(() => {});
  }, [slug]);

  if (!svgContent) {
    return <div style={{ width: 26, height: 26, borderRadius: "4px", background: `${color}22`, flexShrink: 0 }} />;
  }

  const html = CUSTOM_ICONS[slug]
    ? svgContent
    : svgContent.replace(/<svg/, `<svg width="26" height="26" fill="#666" style="transition:fill 0.25s"`);

  return (
    <div
      className="tool-icon"
      style={{ width: 26, height: 26, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function CarouselTile({ tool }: { tool: { name: string; slug?: string; color: string } }) {
  return (
    <div
      className="carousel-tile"
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${tool.color}44`;
        el.style.background = "#222";
        const svg = el.querySelector<HTMLElement>(".tool-icon svg");
        if (svg) svg.style.fill = tool.color;
        const name = el.querySelector<HTMLSpanElement>(".tool-name");
        if (name) name.style.color = tool.color;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(245,245,240,0.08)";
        el.style.background = "#1a1a1a";
        const svg = el.querySelector<HTMLElement>(".tool-icon svg");
        if (svg) svg.style.fill = "#666";
        const name = el.querySelector<HTMLSpanElement>(".tool-name");
        if (name) name.style.color = "#666";
      }}
    >
      {tool.slug && <ToolIcon slug={tool.slug} color={tool.color} />}
      <span className="tool-name">{tool.name}</span>
    </div>
  );
}

export default function BuiltWith() {
  return (
    <section
      style={{
        padding: "2.5rem 0",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        borderBottom: "1px solid rgba(245,245,240,0.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 3rem" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem" }}>
          Built With
        </p>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 800, letterSpacing: "-1px", marginBottom: "1.5rem", color: "#f5f5f0" }}>
          Built with the best tools in the game.
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div style={{ position: "relative", marginBottom: "0.75rem" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div className="carousel-track carousel-row-1">
          {row1Doubled.map((tool, i) => <CarouselTile key={`r1-${tool.name}-${i}`} tool={tool} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right (reverse) */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #0a0a0a, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div className="carousel-track carousel-row-2">
          {row2Doubled.map((tool, i) => <CarouselTile key={`r2-${tool.name}-${i}`} tool={tool} />)}
        </div>
      </div>

      <style>{`
        .carousel-track {
          display: flex;
          gap: 0.75rem;
          width: max-content;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        .carousel-row-1 {
          animation: scrollLeft 25s linear infinite;
        }
        .carousel-row-2 {
          animation: scrollRight 28s linear infinite;
        }
        .carousel-tile {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.4rem;
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
        .carousel-tile .tool-name {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #666;
          transition: color 0.25s;
          white-space: nowrap;
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (max-width: 480px) {
          .carousel-row-1 { animation-duration: 18s; }
          .carousel-row-2 { animation-duration: 20s; }
        }
      `}</style>
    </section>
  );
}
