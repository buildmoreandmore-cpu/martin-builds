"use client";

import ScrollReveal from "../ScrollReveal";

const growingTiers = [
  {
    featured: false,
    label: "Fast Start",
    title: "AI Build Sprint",
    subtitle: "For when you need your first AI tool — fast.",
    price: "From $5,000",
    priceContext: "Defined scope, fixed price",
    hook: "Live in two weeks. No excuses.",
    paragraph: "You come to me with a business problem. I build you a complete AI-powered website or tool — designed, functional, and deployed. Two weeks later, it's live and your customers are using it. That's the whole process.",
    includes: [
      "Custom AI-powered website or business tool",
      "AI integrations (chat, automation, smart forms)",
      "Mobile-responsive design",
      "2 rounds of revisions",
      "Deployed and live in 2 weeks",
    ],
    guarantee: "Week-one refund guarantee",
  },
  {
    featured: true,
    label: "Full Platform",
    title: "AI Platform Build",
    subtitle: "For when the problem is bigger than a website.",
    price: "From $8,000",
    priceContext: "Scoped to your operations",
    hook: "The tool your team keeps asking for — built.",
    paragraph: "Some problems need more than a website. Dashboards, client portals, multi-step automations, internal tools — this is where we go deep. I map the architecture, you approve the scope, and I build until it's done. No feature creep. No surprises.",
    includes: [
      "Full-stack AI platform or dashboard",
      "Multiple AI integrations and automations",
      "Client-facing portals or admin panels",
      "Custom database architecture",
      "Deployed in 2–3 weeks",
    ],
    guarantee: "Week-one refund guarantee",
  },
  {
    featured: false,
    label: "Ongoing Partnership",
    title: "AI Retainer",
    subtitle: "For when you want an AI builder on your team every month.",
    price: "$2,500 – $5,000/mo",
    priceContext: "Cancel anytime",
    hook: "Your AI builder, on call.",
    paragraph: "Your business doesn't stop evolving, and your tools shouldn't either. Every month I build new features, optimize what's running, and bring you ideas you haven't thought of yet. Think of it as having a full-time AI developer — without the full-time salary.",
    includes: [
      "Monthly feature builds and improvements",
      "AI model updates and optimization",
      "Priority support and communication",
      "Strategy sessions on what to build next",
      "Cancel anytime",
    ],
    guarantee: "Cancel anytime — no contracts",
  },
];

const smallBizOptions = [
  {
    title: "AI Power Hour",
    subtitle: "For when you need clarity before commitment.",
    price: "$500",
    priceContext: "One-time / 60 minutes / Zoom",
    hook: "Leave with a game plan, not more questions.",
    paragraph: "I show you exactly which AI tools fit your business — with live demos and a personalized plan. Your $500 is credited toward any future build, so the session is never wasted money.",
    includes: [
      "AI tool recommendations for your specific business",
      "Live demos and walkthroughs",
      "Recorded session + 30-day follow-up",
      "$500 credited toward any future build",
    ],
  },
  {
    title: "AI Chat Agent",
    subtitle: "For when you need AI working for you 24/7.",
    price: "From $300/mo",
    priceContext: "Live in 48 hours",
    hook: "Your newest employee never sleeps.",
    paragraph: "A custom-trained AI agent that answers customer questions, captures leads, and books appointments — around the clock, branded to match your business. No code, no setup on your end.",
    includes: [
      "Custom-trained on your business",
      "Answers customer questions 24/7",
      "Captures leads and books appointments",
      "Branded to match your site",
      "Live in 48 hours",
    ],
  },
];

export default function ServiceTiers() {
  return (
    <>
      {/* Section A: Growing Businesses */}
      <section id="services" style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#0a0a0a" }}>
        <ScrollReveal>
          <p style={sectionTag}>For Growing Businesses ($1M+)</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={sectionTitle}>Custom AI systems built for your operations.</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p style={bridgeStyle}>
            Whether you need a quick win for $5K or an AI builder on your team every month — there&apos;s a lane for you.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(245,245,240,0.5)", marginTop: "1rem" }}>
            Built for: <span style={{ color: "rgba(200,255,0,0.6)" }}>Healthcare &amp; Dental</span> · <span style={{ color: "rgba(200,255,0,0.6)" }}>Law Firms</span> · <span style={{ color: "rgba(200,255,0,0.6)" }}>Energy &amp; HVAC</span> · <span style={{ color: "rgba(200,255,0,0.6)" }}>Real Estate</span> · <span style={{ color: "rgba(200,255,0,0.6)" }}>Financial Services</span> · <span style={{ color: "rgba(200,255,0,0.6)" }}>Insurance</span> · <span style={{ color: "rgba(200,255,0,0.6)" }}>Consulting</span> · <span style={{ color: "rgba(200,255,0,0.6)" }}>Service Businesses</span>
          </p>
        </ScrollReveal>

        <div
          className="tiers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "3rem",
            alignItems: "start",
          }}
        >
          {growingTiers.map((tier) => (
            <ScrollReveal key={tier.title}>
              <TierCard {...tier} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href="/discovery-call" style={primaryBtnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >Book a Free Discovery Call</a>
            <p style={{ marginTop: "0.8rem", fontSize: "0.85rem", color: "#888" }}>
              Not sure which tier fits? That&apos;s exactly what the call is for.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Section B: Small Businesses */}
      <section style={{ padding: "clamp(5rem,8vw,8rem) clamp(1.25rem,5vw,3rem)", background: "#1a1a1a", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
        <ScrollReveal>
          <p style={sectionTag}>For Small Businesses (Getting Started)</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 style={{ ...sectionTitle, fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}>
            Not ready for a full build? Start here.
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <p style={bridgeStyle}>
            These options are designed for small businesses that want to start using AI without a big upfront investment.
          </p>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginTop: "3rem",
            maxWidth: "700px",
          }}
        >
          {smallBizOptions.map((opt) => (
            <ScrollReveal key={opt.title}>
              <SmallBizCard {...opt} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href="/discovery-call" style={primaryBtnStyle}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 30px rgba(200,255,0,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            >Book a Free Discovery Call</a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
      <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(200,255,0,0.1)", border: "1px solid rgba(200,255,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span style={{ fontSize: "0.9rem", color: "rgba(245,245,240,0.75)", lineHeight: 1.5 }}>{text}</span>
    </div>
  );
}

function TierCard({
  featured, label, title, subtitle, price, priceContext, hook, paragraph, includes, guarantee,
}: {
  featured: boolean; label: string; title: string; subtitle: string; price: string; priceContext: string; hook: string; paragraph: string; includes: string[]; guarantee?: string;
}) {
  return (
    <div
      style={{
        background: featured ? "#141a0a" : "#1a1a1a",
        border: featured ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(245,245,240,0.06)",
        borderRadius: "16px",
        padding: "clamp(1.5rem, 4vw, 2.5rem)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...(featured && { boxShadow: "0 0 40px rgba(200,255,0,0.06)" }),
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = featured ? "rgba(200,255,0,0.5)" : "rgba(200,255,0,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = featured ? "rgba(200,255,0,0.3)" : "rgba(245,245,240,0.06)";
      }}
    >
      {featured && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00" }} />}

      {/* Label */}
      <div style={{
        display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
        letterSpacing: "2px", textTransform: "uppercase",
        color: featured ? "#0a0a0a" : "#c8ff00",
        background: featured ? "#c8ff00" : "rgba(200,255,0,0.08)",
        padding: "0.3rem 0.75rem", borderRadius: "100px", marginBottom: "1.5rem", alignSelf: "flex-start",
      }}>{label}</div>

      {/* Title + Subtitle */}
      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.3rem" }}>{title}</h3>
      <p style={{ fontSize: "0.85rem", fontWeight: 400, fontStyle: "italic", color: "#888", marginBottom: "1rem" }}>{subtitle}</p>

      {/* Price */}
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: "#c8ff00", marginBottom: "0.3rem" }}>{price}</div>
      <div style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1.2rem" }}>{priceContext}</div>

      {/* Hook */}
      <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.8rem" }}>{hook}</p>

      {/* Paragraph */}
      <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#888", lineHeight: 1.7, marginBottom: "1.5rem" }}>{paragraph}</p>

      {/* Checklist */}
      <div style={{ borderTop: "1px solid rgba(245,245,240,0.06)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
        {includes.map((item) => <CheckItem key={item} text={item} />)}
      </div>

      {guarantee && (
        <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(245,245,240,0.06)", fontSize: "0.8rem", color: "#c8ff00", fontFamily: "'Space Mono', monospace", display: "flex", alignItems: "center", gap: "0.5rem", opacity: 0.8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          {guarantee}
        </div>
      )}
    </div>
  );
}

function SmallBizCard({ title, subtitle, price, priceContext, hook, paragraph, includes }: {
  title: string; subtitle: string; price: string; priceContext: string; hook: string; paragraph: string; includes: string[];
}) {
  return (
    <div style={{
      background: "#0a0a0a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px",
      padding: "clamp(1.5rem, 4vw, 2.5rem)", height: "100%", display: "flex", flexDirection: "column",
      transition: "all 0.4s",
    }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,255,0,0.15)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,245,240,0.06)"; }}
    >
      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.3rem" }}>{title}</h3>
      <p style={{ fontSize: "0.85rem", fontWeight: 400, fontStyle: "italic", color: "#888", marginBottom: "1rem" }}>{subtitle}</p>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: "#c8ff00", marginBottom: "0.3rem" }}>{price}</div>
      <div style={{ fontSize: "0.85rem", color: "#888", marginBottom: "1.2rem" }}>{priceContext}</div>
      <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.8rem" }}>{hook}</p>
      <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#888", lineHeight: 1.7, marginBottom: "1.5rem" }}>{paragraph}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        {includes.map((item) => <CheckItem key={item} text={item} />)}
      </div>
    </div>
  );
}

const primaryBtnStyle: React.CSSProperties = {
  background: "#c8ff00", color: "#0a0a0a", padding: "1rem 2.5rem", borderRadius: "100px",
  fontWeight: 700, fontSize: "1rem", letterSpacing: "0.5px", transition: "all 0.3s",
  display: "inline-block", textDecoration: "none",
};

const sectionTag: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00",
  letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem",
};
const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1,
  letterSpacing: "-2px", maxWidth: "700px",
};
const bridgeStyle: React.CSSProperties = {
  fontSize: "1.15rem", fontWeight: 300, color: "#888", maxWidth: "600px",
  lineHeight: 1.7, marginTop: "1.5rem",
};
