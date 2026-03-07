"use client";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "3rem",
        borderTop: "1px solid rgba(245,245,240,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#888" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>
          martin<span style={{ color: "#c8ff00" }}>.builds</span>
        </div>
        &copy; 2026 martin.builds. Atlanta, GA.
        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "#888" }}>
          <a href="/privacy-policy" style={{ color: "#888", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f0")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>Privacy Policy</a>
          {" | "}
          <a href="/terms" style={{ color: "#888", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f0")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>Terms</a>
          {" | "}
          <a href="/disclaimer" style={{ color: "#888", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f0")} onMouseLeave={e => (e.currentTarget.style.color = "#888")}>Disclaimer</a>
        </div>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <FooterLink href="/contact">Contact</FooterLink>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ fontSize: "0.8rem", color: "#888", transition: "color 0.3s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#c8ff00")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#888")}
    >
      {children}
    </a>
  );
}
