"use client";

export default function ScanCTA() {
  return (
    <section style={{ padding: "4rem clamp(1.25rem,5vw,3rem)", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", background: "#1a1a1a", borderRadius: 16, padding: "2.5rem", borderTop: "3px solid #c8ff00" }}>
        <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f5f5f0", lineHeight: 1.5, marginBottom: "1.25rem" }}>
          Not sure if you need an AI agent? Scan your website first — I&apos;ll show you exactly where you&apos;re leaking revenue.
        </p>
        <a
          href="/scan"
          style={{ display: "inline-block", padding: "0.85rem 2rem", borderRadius: 10, background: "transparent", border: "2px solid #c8ff00", color: "#c8ff00", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", transition: "all 0.2s" }}
          onMouseEnter={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = "#c8ff00"; t.style.color = "#0a0a0a"; }}
          onMouseLeave={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = "transparent"; t.style.color = "#c8ff00"; }}
        >
          Scan Your Website — Free
        </a>
        <p style={{ fontSize: "0.85rem", color: "#888", marginTop: "1.25rem", marginBottom: "0.75rem" }}>
          Or request a custom demo — we&apos;ll build an AI agent trained on your business and send you the link.
        </p>
        <a
          href="/demo"
          style={{ display: "inline-block", padding: "0.75rem 1.75rem", borderRadius: 10, background: "transparent", border: "1.5px solid rgba(200,255,0,0.4)", color: "#c8ff00", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", transition: "all 0.2s" }}
          onMouseEnter={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = "rgba(200,255,0,0.1)"; t.style.borderColor = "#c8ff00"; }}
          onMouseLeave={(e) => { const t = e.currentTarget as HTMLAnchorElement; t.style.background = "transparent"; t.style.borderColor = "rgba(200,255,0,0.4)"; }}
        >
          Request a Free Demo
        </a>
      </div>
    </section>
  );
}
