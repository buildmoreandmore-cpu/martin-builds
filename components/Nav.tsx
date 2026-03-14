"use client";

import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.25rem clamp(1.25rem,5vw,3rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backdropFilter: "blur(20px)",
          background: scrolled || menuOpen ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.8)",
          borderBottom: "1px solid rgba(200,255,0,0.08)",
          transition: "background 0.3s",
        }}
      >
        <a href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.5px", textDecoration: "none", color: "#f5f5f0" }}>
          martin<span style={{ color: "#c8ff00" }}>.builds</span>
        </a>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/#services">Services</NavLink>
          <NavLink href="/ai-agent">AI Agent</NavLink>
          <NavLink href="/power-hour">Power Hour</NavLink>
          <a
            href="/scan"
            style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", color: "#c8ff00", transition: "color 0.3s", textDecoration: "none", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "0.35rem" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00")}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8ff00", display: "inline-block" }} />
            Free Scan
          </a>
          <NavLink href="/contact">Contact</NavLink>
          <a
            href="/discovery-call"
            style={{ background: "#c8ff00", color: "#0a0a0a", padding: "0.6rem 1.5rem", borderRadius: "100px", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.5px", textTransform: "uppercase", transition: "transform 0.3s, box-shadow 0.3s", textDecoration: "none", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
          >
            Start a Project
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", display: "none", flexDirection: "column", gap: "5px" }}
        >
          <span style={{ display: "block", width: "22px", height: "2px", background: "#f5f5f0", borderRadius: "2px", transition: "transform 0.3s, opacity 0.3s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#f5f5f0", borderRadius: "2px", transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#f5f5f0", borderRadius: "2px", transition: "transform 0.3s, opacity 0.3s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="nav-mobile-menu"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          right: 0,
          zIndex: 99,
          background: "rgba(10,10,10,0.98)",
          borderBottom: "1px solid rgba(200,255,0,0.08)",
          backdropFilter: "blur(20px)",
          padding: menuOpen ? "1.5rem clamp(1.25rem,5vw,3rem) 2rem" : "0 clamp(1.25rem,5vw,3rem)",
          maxHeight: menuOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1), padding 0.35s",
          display: "none",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {[
          { href: "/about", label: "About" },
          { href: "/#services", label: "Services" },
          { href: "/ai-agent", label: "AI Agent" },
          { href: "/power-hour", label: "Power Hour" },
          { href: "/scan", label: "Free Scan" },
          { href: "/contact", label: "Contact" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{ display: "block", padding: "1rem 0", fontSize: "1.05rem", fontWeight: 500, color: "#888", textDecoration: "none", borderBottom: "1px solid rgba(245,245,240,0.06)", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/discovery-call"
          onClick={() => setMenuOpen(false)}
          style={{ display: "block", marginTop: "1.25rem", padding: "0.9rem 0", background: "#c8ff00", color: "#0a0a0a", borderRadius: "8px", fontWeight: 700, fontSize: "0.9rem", textAlign: "center", textDecoration: "none", letterSpacing: "0.5px" }}
        >
          Start a Project
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", color: "#888", transition: "color 0.3s", textDecoration: "none", whiteSpace: "nowrap" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
    >
      {children}
    </a>
  );
}
