"use client";

import { useEffect, useState, useRef } from "react";

const GREEN = "#c8ff00";
const TEXT = "#f5f5f0";
const DIM = "#888";
const CARD = "#0f0f0f";
const BORDER = "#222";

type IconKey = "calendar" | "users" | "form" | "bolt" | "mail" | "database";
type App = { name: string; cost: number; icon: IconKey };

const APPS: App[] = [
  { name: "Scheduling", cost: 16, icon: "calendar" },
  { name: "CRM", cost: 45, icon: "users" },
  { name: "Forms", cost: 24, icon: "form" },
  { name: "Automation", cost: 30, icon: "bolt" },
  { name: "Email Tool", cost: 30, icon: "mail" },
  { name: "Database", cost: 20, icon: "database" },
];

function AppIcon({ name, color }: { name: IconKey; color: string }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "form":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M9 13h6M9 17h6M9 9h2" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...props}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 5L2 7" />
        </svg>
      );
    case "database":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
  }
}

const TOTAL = APPS.reduce((sum, a) => sum + a.cost, 0); // 165

export default function CostAnimation() {
  const [removed, setRemoved] = useState<number[]>([]);
  const [counter, setCounter] = useState(TOTAL);
  const [showOwn, setShowOwn] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function play() {
    setRemoved([]);
    setCounter(TOTAL);
    setShowOwn(false);

    // Stagger the removal of each app
    APPS.forEach((app, i) => {
      setTimeout(() => {
        setRemoved((prev) => [...prev, i]);
        // Tick the counter down smoothly over 300ms
        const start = performance.now();
        const from = TOTAL - APPS.slice(0, i).reduce((s, a) => s + a.cost, 0);
        const to = from - app.cost;
        const dur = 300;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          setCounter(Math.round(from + (to - from) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, 800 + i * 450);
    });

    // Show the "you own it" card at the end
    setTimeout(() => setShowOwn(true), 800 + APPS.length * 450 + 200);
  }

  useEffect(() => {
    if (!ref.current || hasPlayed) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setHasPlayed(true);
            play();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <div ref={ref} className="cost-anim" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "clamp(16px, 4vw, 24px) clamp(14px, 4vw, 28px)", marginBottom: "clamp(20px, 5vw, 32px)", position: "relative", overflow: "hidden" }}>
      {/* Header with counter */}
      <div className="cost-anim-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px", minWidth: 0 }}>
          <p style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1.5, margin: 0 }}>What you stop paying for</p>
          <p style={{ fontSize: "clamp(12px, 3vw, 13px)", color: TEXT, margin: "4px 0 0 0", lineHeight: 1.5 }}>One custom build replaces the SaaS stack you&rsquo;re renting forever.</p>
        </div>
        <div style={{ textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: DIM, textTransform: "uppercase", letterSpacing: 1.5 }}>Per month</div>
          <div style={{ fontSize: "clamp(22px, 7vw, 28px)", fontWeight: 800, color: counter === 0 ? GREEN : "#ff6666", letterSpacing: "-1px", fontFamily: "'Space Mono', monospace", lineHeight: 1.1, transition: "color 0.6s ease" }}>
            ${counter}
          </div>
        </div>
      </div>

      {/* App grid — auto-fit drops to 2 cols on narrow screens */}
      <div className="cost-anim-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, marginBottom: showOwn ? 16 : 0, transition: "margin 0.4s ease" }}>
        {APPS.map((app, i) => {
          const isRemoved = removed.includes(i);
          return (
            <div
              key={app.name}
              style={{
                padding: "10px 10px",
                background: "#0a0a0a",
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: isRemoved ? 0 : 1,
                transform: isRemoved ? "translateY(-12px) scale(0.85)" : "translateY(0) scale(1)",
                filter: isRemoved ? "blur(2px)" : "blur(0)",
                transition: "all 0.55s cubic-bezier(0.65, 0, 0.35, 1)",
                position: "relative",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, flexShrink: 0 }}>
                <AppIcon name={app.icon} color={DIM} />
              </span>
              <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: TEXT, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.name}</div>
                <div style={{ fontSize: 10, color: DIM, fontFamily: "'Space Mono', monospace" }}>${app.cost}/mo</div>
              </div>
              {isRemoved && (
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", animation: "strike 0.4s ease", pointerEvents: "none" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff6666" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* "You Own It" card slides in */}
      <div
        className="cost-anim-own"
        style={{
          padding: "clamp(12px, 3vw, 16px) clamp(14px, 3vw, 18px)",
          background: `linear-gradient(135deg, ${GREEN}15, ${GREEN}05)`,
          border: `1px solid ${GREEN}`,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          opacity: showOwn ? 1 : 0,
          transform: showOwn ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: showOwn ? 300 : 0,
          marginTop: showOwn ? 0 : -16,
          overflow: "hidden",
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: GREEN, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </div>
        <div style={{ flex: "1 1 180px", minWidth: 0 }}>
          <div style={{ fontSize: "clamp(13px, 3.5vw, 14px)", color: TEXT, fontWeight: 700, lineHeight: 1.3 }}>One custom build · <span style={{ color: GREEN }}>You own it</span></div>
          <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: DIM, marginTop: 4, lineHeight: 1.4 }}>Built once. No subscription. No vendor lock-in.</div>
        </div>
        <div style={{ textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
          <div style={{ fontSize: "clamp(20px, 5.5vw, 24px)", fontWeight: 800, color: GREEN, fontFamily: "'Space Mono', monospace", lineHeight: 1, letterSpacing: "-0.5px" }}>$0</div>
          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginTop: 3 }}>/mo forever</div>
        </div>
      </div>

      {/* Subtle replay button — bottom-right, doesn't overlap header */}
      {showOwn && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <button
            onClick={() => { setHasPlayed(false); play(); }}
            style={{ background: "transparent", border: `1px solid ${BORDER}`, color: DIM, fontSize: 11, cursor: "pointer", fontFamily: "inherit", padding: "4px 10px", borderRadius: 4 }}
            title="Replay animation"
          >
            ↻ replay
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes strike {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
