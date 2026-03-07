"use client";

import ScrollReveal from "../ScrollReveal";

const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const cases = [
  { icon: <ChatIcon />, title: "Answers Customer Questions", body: "Hours, pricing, services, policies — your AI knows it all and responds instantly. No more \"I'll get back to you.\"", example: "\"What time do you close on Sundays?\"" },
  { icon: <ClipboardIcon />, title: "Captures Leads", body: "Collects name, email, and what they need — then sends it to you. Every visitor becomes a potential customer.", example: "\"I'd like a quote for a kitchen remodel\"" },
  { icon: <CalendarIcon />, title: "Books Appointments", body: "Connects to your calendar and lets customers schedule directly through the chat. No back-and-forth emails.", example: "\"Can I book a consultation for Thursday?\"" },
  { icon: <TagIcon />, title: "Recommends Products", body: "Suggests the right service, menu item, or product based on what the customer tells it. Like a virtual salesperson.", example: "\"What's good for someone who doesn't like dark roast?\"" },
  { icon: <BellIcon />, title: "Handles After-Hours", body: "When you're closed, your agent is open. Captures inquiries at 2 AM so you wake up to warm leads, not missed opportunities.", example: "\"Are you open tomorrow? I need a rush order\"" },
  { icon: <GlobeIcon />, title: "Speaks Their Language", body: "Multilingual support out of the box. Your agent can respond in Spanish, French, Creole — whatever your customers speak.", example: "\"Hola, tienen opciones vegetarianas?\"" },
];

export default function UseCases() {
  return (
    <section style={{ padding: "6rem 3rem", maxWidth: "1200px", margin: "0 auto" }}>
      <ScrollReveal><p style={tag}>What Your Agent Does</p></ScrollReveal>
      <ScrollReveal><h2 style={title}>One agent. Six jobs it handles overnight.</h2></ScrollReveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "3rem" }}>
        {cases.map((c) => (
          <ScrollReveal key={c.title}>
            <div
              style={{ background: "#1a1a1a", border: "1px solid rgba(245,245,240,0.06)", borderRadius: "16px", padding: "2rem", transition: "all 0.4s", position: "relative", overflow: "hidden", height: "100%" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(200,255,0,0.15)";
                el.style.transform = "translateY(-4px)";
                const bar = el.querySelector(".uc-bar") as HTMLDivElement;
                if (bar) bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(245,245,240,0.06)";
                el.style.transform = "translateY(0)";
                const bar = el.querySelector(".uc-bar") as HTMLDivElement;
                if (bar) bar.style.transform = "scaleX(0)";
              }}
            >
              <div className="uc-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#c8ff00", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.4s" }} />
              <div style={{ width: "44px", height: "44px", background: "rgba(200,255,0,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem", flexShrink: 0 }}>{c.icon}</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>{c.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#888", lineHeight: 1.6 }}>{c.body}</p>
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(245,245,240,0.06)", fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", opacity: 0.7 }}>{c.example}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

const tag: React.CSSProperties = { fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" };
const title: React.CSSProperties = { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", maxWidth: "700px" };
