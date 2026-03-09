"use client";

import ScrollReveal from "../ScrollReveal";

const useCases = [
  {
    icon: "💬",
    name: "THE 24/7 FRONT DESK",
    hook: "An AI agent that never sleeps, never calls in sick.",
    description:
      "Your customers ask the same 20 questions over and over — hours, pricing, availability, \"do you offer X?\" An AI agent handles all of them instantly, 24/7, in any language. It captures leads, books appointments, and sends you a summary every morning. Your customers think your support is just really fast.",
    example: '"Do you have availability this Saturday for a group of 8?"',
  },
  {
    icon: "📋",
    name: "THE SMART PROPOSAL ENGINE",
    hook: "Client proposals in minutes, not days.",
    description:
      "You spend hours writing proposals, scoping projects, and building quotes. An AI-powered proposal tool pulls from your services, your pricing, and your templates to generate a complete, branded proposal in minutes. Your clients get a professional document. You get your evenings back.",
    example:
      '"Generate a proposal for a 2,500 sq ft energy audit with LED retrofit"',
  },
  {
    icon: "⚙",
    name: "THE INVISIBLE ASSISTANT",
    hook: "The work your team hates — automated.",
    description:
      "Data entry. Follow-up emails. Invoice reminders. Scheduling. Intake forms that go nowhere. I build AI automations that handle the repetitive tasks silently in the background, so your team can focus on the work that actually grows the business. No new software to learn — it just works inside what you already use.",
    example:
      '"Auto-send a follow-up email 48 hours after every new inquiry"',
  },
  {
    icon: "💻",
    name: "THE CLIENT PORTAL",
    hook: "Your clients see everything. You stop answering status emails.",
    description:
      "A branded dashboard where your clients can log in and see their project status, documents, invoices, and next steps — without calling you. Reduces support emails by 80% and makes your small business look like an enterprise operation. Built custom, not a template.",
    example: '"Where\'s my project at? Can I see the latest version?"',
  },
  {
    icon: "🚀",
    name: "THE FULL PRODUCT",
    hook: "From idea to App Store. Built in weeks, not months.",
    description:
      "You have an app idea, a SaaS concept, or an internal tool that needs to exist. I take it from zero to deployed — design, development, AI integration, app store submission, the whole thing. Not a prototype. A live product that real users can download and use.",
    example: '"I want to build a focus timer app for iOS and Android"',
  },
];

export default function UseCaseShowcase() {
  return (
    <section style={sectionStyle}>
      <ScrollReveal>
        <p style={tagStyle}>WHAT I BUILD</p>
      </ScrollReveal>
      <ScrollReveal>
        <h2 style={headlineStyle}>
          You don&apos;t need to know what&apos;s possible.
          <br />
          That&apos;s my job.
        </h2>
      </ScrollReveal>
      <ScrollReveal>
        <p style={subtextStyle}>
          Here&apos;s what AI tools actually look like when they&apos;re built
          for real businesses — not pitch decks.
        </p>
      </ScrollReveal>

      <div className="usecase-grid" style={gridStyle}>
        {useCases.map((uc, i) => (
          <ScrollReveal key={uc.name} delay={i * 80}>
            <div className="usecase-card" style={cardStyle}>
              <div style={cardTopRow}>
                <div style={iconContainer}>
                  <span style={{ fontSize: "1.3rem" }}>{uc.icon}</span>
                </div>
                <div>
                  <div style={nameStyle}>{uc.name}</div>
                  <div style={hookStyle}>{uc.hook}</div>
                </div>
              </div>
              <p style={descStyle}>{uc.description}</p>
              <div style={exampleStyle}>→ {uc.example}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <p style={bridgeStyle}>
          Every one of these starts the same way — a 30-minute conversation
          where you tell me the problem and I tell you exactly what I&apos;d
          build.{" "}
          <a href="/discovery-call" style={bridgeLinkStyle}>
            Book your free discovery call
          </a>{" "}
          or keep scrolling to see how pricing works.
        </p>
      </ScrollReveal>

      <style>{`
        .usecase-card {
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .usecase-card:hover {
          border-color: rgba(200,255,0,0.15) !important;
          transform: translateY(-3px);
        }
        .usecase-grid > div:last-child:nth-child(odd) {
          grid-column: 1 / -1;
          max-width: 50%;
          justify-self: center;
        }
        @media (max-width: 600px) {
          .usecase-grid {
            grid-template-columns: 1fr !important;
          }
          .usecase-grid > div:last-child:nth-child(odd) {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: "clamp(5rem, 8vw, 8rem) 3rem",
  background: "var(--black, #0a0a0a)",
};

const tagStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "var(--accent, #c8ff00)",
  letterSpacing: "3px",
  textTransform: "uppercase",
  marginBottom: "1.5rem",
};

const headlineStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "clamp(2rem, 5vw, 3rem)",
  fontWeight: 800,
  color: "var(--white, #f5f5f0)",
  lineHeight: 1.1,
  letterSpacing: "-1px",
  marginBottom: 0,
};

const subtextStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 300,
  fontSize: "1.1rem",
  color: "var(--gray-text, #888)",
  maxWidth: "600px",
  lineHeight: 1.7,
  marginTop: "1rem",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "1.5rem",
  marginTop: "4rem",
};

const cardStyle: React.CSSProperties = {
  background: "var(--gray-dark, #1a1a1a)",
  border: "1px solid rgba(245,245,240,0.06)",
  borderRadius: "16px",
  padding: "2rem 2.5rem",
};

const cardTopRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const iconContainer: React.CSSProperties = {
  width: "48px",
  height: "48px",
  background: "rgba(200,255,0,0.1)",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const nameStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.8rem",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "var(--accent, #c8ff00)",
  marginBottom: "0.2rem",
};

const hookStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "1.1rem",
  fontWeight: 600,
  color: "var(--white, #f5f5f0)",
};

const descStyle: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.9rem",
  fontWeight: 300,
  color: "var(--gray-text, #888)",
  lineHeight: 1.7,
  marginTop: "1.2rem",
};

const exampleStyle: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: "0.75rem",
  color: "var(--accent, #c8ff00)",
  opacity: 0.6,
  marginTop: "1.2rem",
  paddingTop: "1rem",
  borderTop: "1px solid rgba(245,245,240,0.06)",
};

const bridgeStyle: React.CSSProperties = {
  textAlign: "center",
  marginTop: "3rem",
  fontSize: "1.05rem",
  color: "var(--gray-text, #888)",
  maxWidth: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.7,
};

const bridgeLinkStyle: React.CSSProperties = {
  color: "var(--accent, #c8ff00)",
  fontWeight: 600,
  textDecoration: "none",
};
