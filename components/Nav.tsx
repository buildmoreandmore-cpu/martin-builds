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
          <NavLink href="/#services">Services</NavLink>
          <NavLink href="/demo">Demos</NavLink>
          <NavLink href="/utility">Utility</NavLink>
          <NavLink href="/utility/ai-audit">AI Audit</NavLink>
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
          { href: "/#services", label: "Services" },
          { href: "/demo", label: "Demos" },
          { href: "/utility", label: "Utility" },
          { href: "/utility/ai-audit", label: "AI Gap Audit" },
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

function NavDropdown({ label, href, items }: { label: string; href: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase", color: "#888", transition: "color 0.3s", textDecoration: "none", whiteSpace: "nowrap" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
      >
        {label}
      </a>
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          paddingTop: "0.5rem",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s",
        }}
      >
        <div
          style={{
            background: "rgba(26,26,26,0.98)",
            border: "1px solid #2a2a2a",
            borderRadius: "8px",
            padding: "0.4rem 0",
            minWidth: "160px",
            backdropFilter: "blur(20px)",
          }}
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                padding: "0.5rem 1rem",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "#888",
                textDecoration: "none",
                transition: "color 0.2s, background 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#f5f5f0";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,241,53,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#888";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
