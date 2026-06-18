import { notFound } from "next/navigation";
import { LANDING_PAGES, getLandingPage } from "@/lib/landing-pages";
import LeadForm from "@/components/landing/LeadForm";

export function generateStaticParams() {
  return Object.keys(LANDING_PAGES).map((channel) => ({ channel }));
}

export default async function GoPage({ params }: { params: Promise<{ channel: string }> }) {
  const { channel } = await params;
  const cfg = getLandingPage(channel);
  if (!cfg) notFound();

  return (
    <div
      id="top"
      style={{
        background: "#0a0a0a",
        color: "#f5f5f0",
        minHeight: "100vh",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Header — logo only, anchors to top (no nav, no leak) */}
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1.5rem 1rem",
          borderBottom: "1px solid rgba(245,245,240,0.06)",
        }}
      >
        <a href="#top" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.5px" }}>
            <span style={{ color: "#f5f5f0" }}>martin</span>
            <span style={{ color: "#c8ff00" }}>.</span>
            <span style={{ color: "#f5f5f0" }}>builds</span>
          </span>
        </a>
      </header>

      {/* Hero */}
      <section style={{ padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem)", maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "0.4rem 0.9rem", borderRadius: "100px", border: "1px solid rgba(200,255,0,0.25)", background: "rgba(200,255,0,0.06)", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", color: "#c8ff00" }}>
            ~14-day sprints · fixed price
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.4rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-1.5px", margin: "0 0 1.25rem" }}>
          {cfg.headline}
        </h1>
        <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#aaa", lineHeight: 1.6, maxWidth: "620px", margin: "0 auto 2rem" }}>
          {cfg.subhead}
        </p>
        <a
          href="#book"
          style={{
            display: "inline-block",
            padding: "1rem 2.25rem",
            background: "#c8ff00",
            color: "#0a0a0a",
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: "1.05rem",
            textDecoration: "none",
          }}
        >
          {cfg.ctaLabel}
        </a>
      </section>

      {/* How it works */}
      <section style={{ padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={sectionHeading}>How it works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginTop: "2rem" }}>
          {cfg.howItWorks.map((step, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#c8ff00", color: "#0a0a0a", fontWeight: 800, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", fontFamily: "'Space Mono', monospace" }}>
                {i + 1}
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.5rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#999", lineHeight: 1.6, margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof / credibility */}
      <section style={{ padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)", maxWidth: "760px", margin: "0 auto" }}>
        <h2 style={sectionHeading}>Why work with me</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cfg.proofPoints.map((point, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "1.05rem", color: "#ddd", lineHeight: 1.5 }}>
              <svg width="20" height="16" viewBox="0 0 24 19" fill="none" style={{ flexShrink: 0, marginTop: "4px" }}>
                <path d="M1.5 9.5L8.5 16.5L22.5 1.5" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing anchor */}
      <section style={{ padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ ...cardStyle, textAlign: "center", border: "1px solid rgba(200,255,0,0.2)", background: "rgba(200,255,0,0.04)" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 800, letterSpacing: "-0.5px", margin: "0 0 1rem" }}>
            {cfg.pricingAnchor.heading}
          </h2>
          <p style={{ fontSize: "1.05rem", color: "#bbb", lineHeight: 1.6, margin: 0, maxWidth: "560px", marginLeft: "auto", marginRight: "auto" }}>
            {cfg.pricingAnchor.body}
          </p>
        </div>
      </section>

      {/* Lead form */}
      <section id="book" style={{ padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)", maxWidth: "560px", margin: "0 auto", scrollMarginTop: "1rem" }}>
        <h2 style={{ ...sectionHeading, marginBottom: "0.5rem" }}>Book your build</h2>
        <p style={{ textAlign: "center", color: "#999", fontSize: "0.95rem", margin: "0 0 2rem" }}>
          Tell me what you want built. I reply within hours.
        </p>
        <LeadForm channel={cfg.slug} defaultCampaign={cfg.defaultCampaign} ctaLabel={cfg.ctaLabel} />
      </section>

      {/* FAQ */}
      <section style={{ padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 3rem)", maxWidth: "760px", margin: "0 auto" }}>
        <h2 style={sectionHeading}>Questions</h2>
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {cfg.faqs.map((faq, i) => (
            <details key={i} style={{ ...cardStyle, padding: "1.1rem 1.25rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 700, fontSize: "1.05rem", listStyle: "none" }}>
                {faq.q}
              </summary>
              <p style={{ fontSize: "0.95rem", color: "#999", lineHeight: 1.6, margin: "0.75rem 0 0" }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 3rem)", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-1px", margin: "0 0 1rem" }}>
          {cfg.finalCta.heading}
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#aaa", lineHeight: 1.6, margin: "0 0 2rem" }}>{cfg.finalCta.body}</p>
        <a
          href="#book"
          style={{
            display: "inline-block",
            padding: "1rem 2.25rem",
            background: "#c8ff00",
            color: "#0a0a0a",
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: "1.05rem",
            textDecoration: "none",
          }}
        >
          {cfg.ctaLabel}
        </a>
      </section>

      <footer style={{ padding: "2rem 1rem", textAlign: "center", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
        <span style={{ fontSize: "0.8rem", color: "#555" }}>© martin.builds · Built and owned by you.</span>
      </footer>
    </div>
  );
}

const sectionHeading: React.CSSProperties = {
  fontSize: "clamp(1.4rem, 4vw, 2rem)",
  fontWeight: 800,
  letterSpacing: "-0.5px",
  textAlign: "center",
  margin: 0,
};

const cardStyle: React.CSSProperties = {
  background: "#141414",
  border: "1px solid rgba(245,245,240,0.08)",
  borderRadius: "16px",
  padding: "1.5rem",
};
