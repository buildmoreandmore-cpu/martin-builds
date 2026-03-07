"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1.5rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(20px)",
        background: scrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.8)",
        borderBottom: "1px solid rgba(200,255,0,0.08)",
        transition: "background 0.3s",
      }}
    >
      <a href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.5px" }}>
        martin<span style={{ color: "#c8ff00" }}>.builds</span>
      </a>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/#services">Services</NavLink>
        <NavLink href="/#work">Work</NavLink>
        <NavLink href="/power-hour">Power Hour</NavLink>
        <NavLink href="/contact">Contact</NavLink>
        <a
          href="/work-with-me#book-call"
          style={{
            background: "#c8ff00",
            color: "#0a0a0a",
            padding: "0.6rem 1.5rem",
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          Start a Project
        </a>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontSize: "0.85rem",
        fontWeight: 500,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        color: "#888",
        transition: "color 0.3s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
    >
      {children}
    </a>
  );
}
