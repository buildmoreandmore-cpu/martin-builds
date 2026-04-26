"use client";

import { useEffect, useState, useRef } from "react";

const GREEN = "#c8ff00";
const TEXT = "#f5f5f0";
const DIM = "#888";
const CARD = "#0f0f0f";
const BORDER = "#222";

type App = { name: string; cost: number; emoji: string };

const APPS: App[] = [
  { name: "Scheduling", cost: 16, emoji: "📅" },
  { name: "CRM", cost: 45, emoji: "👥" },
  { name: "Forms", cost: 24, emoji: "📝" },
  { name: "Automation", cost: 30, emoji: "⚡" },
  { name: "Email Tool", cost: 30, emoji: "✉️" },
  { name: "Database", cost: 20, emoji: "🗄️" },
];

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
    <div ref={ref} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px clamp(16px, 4vw, 28px)", marginBottom: 32, position: "relative", overflow: "hidden" }}>
      {/* Header with counter */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1.5, margin: 0 }}>What you stop paying for</p>
          <p style={{ fontSize: 13, color: TEXT, margin: "4px 0 0 0", lineHeight: 1.5 }}>One custom build replaces the SaaS stack you&rsquo;re renting forever.</p>
        </div>
        <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
          <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1.5 }}>Per month</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: counter === 0 ? GREEN : "#ff6666", letterSpacing: "-1px", fontFamily: "'Space Mono', monospace", lineHeight: 1.1, transition: "color 0.6s ease" }}>
            ${counter}
          </div>
        </div>
      </div>

      {/* App grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: showOwn ? 16 : 0, transition: "margin 0.4s ease" }}>
        {APPS.map((app, i) => {
          const isRemoved = removed.includes(i);
          return (
            <div
              key={app.name}
              style={{
                padding: "12px 10px",
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
              <span style={{ fontSize: 18, lineHeight: 1 }}>{app.emoji}</span>
              <div style={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: TEXT, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{app.name}</div>
                <div style={{ fontSize: 10, color: DIM, fontFamily: "'Space Mono', monospace" }}>${app.cost}/mo</div>
              </div>
              {isRemoved && (
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#ff6666", fontSize: 18, animation: "strike 0.4s ease", pointerEvents: "none" }}>
                  ✕
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* "You Own It" card slides in */}
      <div
        style={{
          padding: "16px 18px",
          background: `linear-gradient(135deg, ${GREEN}15, ${GREEN}05)`,
          border: `1px solid ${GREEN}`,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: showOwn ? 1 : 0,
          transform: showOwn ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: showOwn ? 200 : 0,
          marginTop: showOwn ? 0 : -16,
          overflow: "hidden",
        }}
      >
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: GREEN, color: "#0a0a0a", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
          ✓
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, color: TEXT, fontWeight: 700 }}>One custom build · <span style={{ color: GREEN }}>You own it</span></div>
          <div style={{ fontSize: 12, color: DIM, marginTop: 2 }}>Built once. No subscription. No vendor lock-in.</div>
        </div>
        <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: GREEN, fontFamily: "'Space Mono', monospace", lineHeight: 1, letterSpacing: "-0.5px" }}>$0</div>
          <div style={{ fontSize: 9, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>/mo forever</div>
        </div>
      </div>

      {/* Subtle replay button after animation finishes */}
      {showOwn && (
        <button
          onClick={() => { setHasPlayed(false); play(); }}
          style={{ position: "absolute", top: 10, right: 10, background: "transparent", border: "none", color: DIM, fontSize: 11, cursor: "pointer", fontFamily: "inherit", padding: "4px 8px", opacity: 0.6 }}
          title="Replay animation"
        >
          ↻ replay
        </button>
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
