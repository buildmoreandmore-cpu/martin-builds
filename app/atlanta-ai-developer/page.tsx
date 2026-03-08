import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FAQJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Atlanta AI Developer — martin.builds",
  description:
    "Francis Martin is Atlanta's go-to AI developer for small businesses. Custom AI websites, chatbots, and tools built in 2 weeks. Book a free discovery call.",
  alternates: { canonical: "https://martin-builds.vercel.app/atlanta-ai-developer" },
  openGraph: {
    title: "Atlanta AI Developer — martin.builds",
    description:
      "Atlanta's AI developer for small businesses. Custom AI websites, chatbots, and tools built in 2 weeks from $5,000.",
    url: "https://martin-builds.vercel.app/atlanta-ai-developer",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlanta AI Developer — martin.builds",
    description: "Custom AI tools for Atlanta small businesses. 2-week builds from $5,000.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  { question: "Are you based in Atlanta, GA?", answer: "Yes. I'm based in Atlanta, GA and primarily serve local businesses throughout the metro area — Buckhead, Midtown, Decatur, Sandy Springs, and beyond. I also work with clients nationally and internationally." },
  { question: "What kinds of Atlanta businesses do you work with?", answer: "I work with small businesses across industries: real estate, hospitality, healthcare, legal, retail, and more. If you're a small business owner in Atlanta looking to use AI to grow — we should talk." },
  { question: "How fast can you deliver an AI tool?", answer: "Most builds are live within 2 weeks of signing off on the scope. I move fast because I work alone — no agency overhead, no handoffs, no delays." },
  { question: "What does it cost to hire an AI developer in Atlanta?", answer: "My projects start at $5,000 for an AI Starter Build. I also offer a $500 AI Power Hour strategy session if you're not ready to build yet. Monthly AI chat agents start at $300/mo." },
  { question: "Can you help me integrate AI into my existing website?", answer: "Yes. I can add an AI chat agent, automate workflows, or build a custom AI feature on top of your existing site — no full rebuild required." },
];

export default function AtlantaAIDeveloperPage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <FAQJsonLd faqs={faqs} />
      <Nav />

      {/* Hero */}
      <section
        style={{
          padding: "clamp(6rem,12vw,10rem) clamp(1.5rem,5vw,3rem) clamp(3rem,6vw,5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-10%", left: "60%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "860px" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Atlanta, GA
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-3px", marginBottom: "1.5rem" }}>
            Atlanta&apos;s AI Developer
            <br />
            <span style={{ color: "#c8ff00" }}>for Small Business.</span>
          </h1>
          <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 300, color: "#888", maxWidth: "600px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            Francis Martin builds custom AI tools, websites, and chatbots for Atlanta businesses. 2-week builds. No agencies. No bloat. Just the work.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="/work-with-me"
              style={{ display: "inline-block", padding: "0.9rem 2rem", background: "#c8ff00", color: "#0a0a0a", fontWeight: 700, borderRadius: "8px", textDecoration: "none", fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", letterSpacing: "1px" }}
            >
              See Pricing
            </a>
            <a
              href="/contact"
              style={{ display: "inline-block", padding: "0.9rem 2rem", background: "transparent", color: "#f5f5f0", fontWeight: 600, borderRadius: "8px", textDecoration: "none", border: "1px solid rgba(245,245,240,0.15)", fontSize: "0.95rem" }}
            >
              Book a Free Call
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "4rem clamp(1.5rem,5vw,3rem)", borderTop: "1px solid rgba(245,245,240,0.06)", borderBottom: "1px solid rgba(245,245,240,0.06)", background: "#0a0a0a" }}>
        <div style={{ maxWidth: "1000px", display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[
            { num: "2 weeks", label: "Average build time" },
            { num: "$5K", label: "Starting price" },
            { num: "10+", label: "AI products shipped" },
            { num: "Atlanta", label: "Home base" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, color: "#c8ff00", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "0.4rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "6rem clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            What I Build
          </p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: "3.5rem", lineHeight: 1.1 }}>
            AI tools for Atlanta businesses.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "AI Chat Agent", desc: "A 24/7 AI chatbot trained on your business. Captures leads, answers FAQs, books appointments. From $300/mo.", href: "/ai-agent" },
              { title: "Custom AI Website", desc: "A fully custom site with AI built in — not a template. Live in 2 weeks. Built to convert.", href: "/work-with-me" },
              { title: "AI Workflow Automation", desc: "Automate the repetitive work your team does every day. Proposals, intake forms, reports, follow-ups.", href: "/work-with-me" },
              { title: "AI Strategy Session", desc: "60-minute Power Hour: figure out exactly what AI to use and how to use it for your specific business.", href: "/power-hour" },
            ].map((s) => (
              <a key={s.title} href={s.href} className="atl-card">
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#f5f5f0", marginBottom: "0.75rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6 }}>{s.desc}</p>
                <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", fontFamily: "'Space Mono', monospace", color: "#c8ff00" }}>Learn more →</p>
              </a>
            ))}
          </div>
          <style>{`.atl-card { display: block; background: #1a1a1a; border: 1px solid rgba(245,245,240,0.06); border-radius: 16px; padding: 2rem; text-decoration: none; transition: border-color 0.25s, transform 0.2s; } .atl-card:hover { border-color: rgba(200,255,0,0.2); transform: translateY(-3px); }`}</style>
        </div>
      </section>

      {/* Atlanta copy */}
      <section style={{ padding: "6rem clamp(1.5rem,5vw,3rem)", background: "#0a0a0a", borderTop: "1px solid rgba(245,245,240,0.06)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Why Atlanta
          </p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: "2rem", lineHeight: 1.1 }}>
            Built here. Shipped here. For Atlanta business owners.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              "Atlanta's small business market is one of the fastest-growing in the country — and most of those businesses aren't using AI yet. That's the gap I fill.",
              "I've worked with Atlanta businesses in real estate, healthcare, hospitality, and professional services. I know the market, I know what converts, and I know how to build tools that actually get used.",
              "If you're in Buckhead, Midtown, Decatur, Sandy Springs, or anywhere in the metro — I can meet in person. But most of my work is done remotely and the results are the same.",
              "No agency. No bloat. One builder who ships fast and communicates in plain English.",
            ].map((p, i) => (
              <p key={i} style={{ fontSize: "1rem", color: "#888", lineHeight: 1.75, fontWeight: 300 }}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "6rem clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            FAQ
          </p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: "3rem", lineHeight: 1.1 }}>
            Questions Atlanta businesses ask.
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(245,245,240,0.06)", padding: "1.5rem 0" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#f5f5f0", marginBottom: "0.75rem" }}>{faq.question}</h3>
                <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.7, fontWeight: 300 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "6rem clamp(1.5rem,5vw,3rem)", background: "#0a0a0a", borderTop: "1px solid rgba(245,245,240,0.06)", textAlign: "center" }}>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>Ready?</p>
        <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-2px", marginBottom: "1.5rem", lineHeight: 1.05 }}>
          Let&apos;s build your AI tool.
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#888", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7, fontWeight: 300 }}>
          Atlanta-based. Fast. No-nonsense. Ready when you are.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/work-with-me" style={{ display: "inline-block", padding: "1rem 2.25rem", background: "#c8ff00", color: "#0a0a0a", fontWeight: 700, borderRadius: "8px", textDecoration: "none", fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", letterSpacing: "1px" }}>
            See How It Works
          </a>
          <a href="/contact" style={{ display: "inline-block", padding: "1rem 2.25rem", background: "transparent", color: "#f5f5f0", fontWeight: 600, borderRadius: "8px", textDecoration: "none", border: "1px solid rgba(245,245,240,0.15)", fontSize: "0.95rem" }}>
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
