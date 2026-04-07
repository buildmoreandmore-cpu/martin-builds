"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── LETTERS DATA ───────────────────────────────────────────── */

interface Letter {
  issue: string;
  date: string;
  title: string;
  paragraphs: string[];
}

const letters: Letter[] = [
  {
    issue: "001",
    date: "April 4, 2025",
    title: "The Disney Button",
    paragraphs: [
      "When clients come to me they're usually full of ideas. No real direction, but a feeling. Something they want to experience, something they want to fix, something they can almost see but can't quite describe yet.",
      "That's actually my favorite place to start.",
      "My job is to take that feeling and put it on a screen. A dashboard, a portal, a platform — whatever the business needs. But before I touch anything I ask one question.",
      "If you could hit the Disney button — what would you want this to do? What would you want it to look like? What would it feel like to use?",
      "It sounds simple but it does something important. It gets people out of the box they've been living in. Most small business owners have a fixed idea of what technology is supposed to look like because that's all they've ever been shown. Standard templates. Cookie cutter sites. Someone else's vision of what their business should be. That question gives them permission to imagine something different.",
      "Once they open up I take it from there and build.",
      "Now I have a background in banking, financing, and sales. So I'm always teetering between two things — creativity and what actually matters to be seen. That balance is important. And my goal is always to bring those two things together.",
      "Because when a client sees what we built for the first time I don't want them to just see their imagination on a screen. I want them to see what matters.",
      "A lot of businesses are locked in on the top number. Revenue. That number feels good. But my training always pulls me toward the net. What are the expenses. What are we actually operating with. What does the business really look like underneath.",
      "The tool we build together isn't just going to make their day flow easier. It's going to help them understand their business on a deeper level than they did before.",
      "That's the experience I'm trying to deliver at martin.builds.",
      "See you next Friday.",
    ],
  },
];

/* ── PAGE ────────────────────────────────────────────────────── */

export default function SeeYouFriday() {
  const [heroDone, setHeroDone] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<"none" | "left" | "right">("none");
  const [scrollPct, setScrollPct] = useState(0);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const letterRef = useRef<HTMLDivElement>(null);
  const hasShownSubscribe = useRef(false);

  const title = "THE FRIDAY LETTER";
  const letter = letters[currentIndex];

  /* Typewriter — faster typing, tighter gaps between states */
  useEffect(() => {
    if (typedChars < title.length) {
      const t = setTimeout(() => setTypedChars((c) => c + 1), 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTaglineVisible(true);
        setTimeout(() => setHeroDone(true), 350);
      }, 150);
      return () => clearTimeout(t);
    }
  }, [typedChars, title.length]);

  /* Scroll progress + subscribe trigger */
  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(window.scrollY / docH, 1) : 0;
      setScrollPct(pct);
      if (pct > 0.75 && !hasShownSubscribe.current && !subscribed) {
        hasShownSubscribe.current = true;
        setShowSubscribe(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [subscribed]);

  /* Navigate issues */
  const goTo = useCallback(
    (dir: "prev" | "next") => {
      const target = dir === "prev" ? currentIndex - 1 : currentIndex + 1;
      if (target < 0 || target >= letters.length) return;
      setSlideDir(dir === "next" ? "left" : "right");
      setTimeout(() => {
        setCurrentIndex(target);
        setSlideDir("none");
        window.scrollTo({ top: 0, behavior: "instant" });
        hasShownSubscribe.current = false;
        setShowSubscribe(false);
      }, 350);
    },
    [currentIndex]
  );

  const handleSubscribe = () => {
    if (!email.includes("@")) return;
    setSubscribed(true);
    setShowSubscribe(false);
  };

  return (
    <>
      {/* Global overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');
        html body {
          background: #0a0a0a !important;
          color: #f5f5f0 !important;
        }
        body::before { opacity: 0.02 !important; }
        ::selection { background: rgba(0,255,133,0.2); color: #f5f5f0; }

        /* Dot grid */
        .friday-dot-grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        /* Progress bar */
        .friday-progress {
          position: fixed;
          top: 0; left: 0;
          height: 2px;
          background: #00FF85;
          z-index: 200;
          transition: width 0.1s linear;
        }

        /* Typewriter cursor */
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .friday-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background: #00FF85;
          margin-left: 4px;
          vertical-align: text-bottom;
          animation: blink 0.8s steps(1) infinite;
        }

        /* Tagline — layered: opacity + translateY + scale + blur */
        .friday-tagline {
          opacity: 0;
          transform: translateY(12px) scale(0.97);
          filter: blur(4px);
          transition: opacity 0.45s cubic-bezier(0.16,1,0.3,1),
                      transform 0.45s cubic-bezier(0.16,1,0.3,1),
                      filter 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .friday-tagline.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        /* Paragraph reveal — layered: opacity + translateY + scale */
        .friday-para {
          opacity: 0;
          transform: translateY(16px) scale(0.99);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1),
                      transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .friday-para.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Letter card slide */
        .friday-letter-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease;
        }
        .friday-letter-card.slide-left {
          transform: translateX(-60px);
          opacity: 0;
        }
        .friday-letter-card.slide-right {
          transform: translateX(60px);
          opacity: 0;
        }

        /* Subscribe bar — fast rise with settle */
        .friday-subscribe {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 150;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .friday-subscribe.show {
          transform: translateY(0);
        }

        /* Scroll hint — drops in as reaction to hero completing */
        @keyframes scrollDrop {
          0% { opacity: 0; transform: translateY(-16px) scaleY(0.3); }
          60% { opacity: 0.4; transform: translateY(4px) scaleY(1.05); }
          100% { opacity: 0.3; transform: translateY(0) scaleY(1); }
        }
        .friday-scroll-hint {
          animation: scrollDrop 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* Subscribed confirmation */
        @keyframes confirmFade {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .friday-confirmed {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 150;
          animation: confirmFade 3s ease forwards;
        }

        /* Nav buttons */
        .friday-nav-btn {
          background: none;
          border: 1px solid rgba(0,255,133,0.2);
          color: #00FF85;
          padding: 0.8rem 2rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          border-radius: 0;
        }
        .friday-nav-btn:hover {
          background: rgba(0,255,133,0.06);
          border-color: rgba(0,255,133,0.5);
        }
        .friday-nav-btn:disabled {
          opacity: 0.2;
          cursor: default;
        }
        .friday-nav-btn:disabled:hover {
          background: none;
          border-color: rgba(0,255,133,0.2);
        }

        @media (max-width: 640px) {
          .friday-hero-title { font-size: clamp(2rem, 8vw, 3rem) !important; }
          .friday-letter-title { font-size: clamp(1.6rem, 6vw, 2.2rem) !important; }
          .friday-card-inner { padding: 2rem 1.5rem !important; }
          .friday-nav-row { flex-direction: column; gap: 0.75rem !important; }
          .friday-nav-btn { width: 100%; }
        }
      `}</style>

      {/* Minimal back link — no full nav */}
      <a
        href="/"
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "clamp(1.25rem, 5vw, 3rem)",
          zIndex: 100,
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          textDecoration: "none",
          color: "#f5f5f0",
          opacity: 0.5,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.5")}
      >
        martin<span style={{ color: "#00FF85" }}>.builds</span>
      </a>

      {/* Dot grid */}
      <div className="friday-dot-grid" />

      {/* Scroll progress */}
      <div className="friday-progress" style={{ width: `${scrollPct * 100}%` }} />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem clamp(1.5rem, 5vw, 3rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          className="friday-hero-title"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "6px",
            lineHeight: 1.1,
            color: "#f5f5f0",
          }}
        >
          {title.slice(0, typedChars)}
          <span className="friday-cursor" />
        </h1>

        <p
          className={`friday-tagline ${taglineVisible ? "visible" : ""}`}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "#888",
            letterSpacing: "1px",
            marginTop: "1.5rem",
          }}
        >
          Business. Building. Capital. Every Friday.
        </p>

        {/* Scroll hint */}
        {heroDone && (
          <div
            className="friday-scroll-hint"
            style={{
              position: "absolute",
              bottom: "3rem",
            }}
          >
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "linear-gradient(to bottom, #00FF85, transparent)",
                margin: "0 auto",
              }}
            />
          </div>
        )}
      </section>

      {/* ── LETTER ────────────────────────────────────────────── */}
      <section
        ref={letterRef}
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 3rem) 6rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className={`friday-letter-card ${slideDir === "left" ? "slide-left" : ""} ${slideDir === "right" ? "slide-right" : ""}`}
        >
          <div
            className="friday-card-inner"
            style={{
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "4px",
              padding: "3.5rem clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Issue + date */}
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "#00FF85",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Issue {letter.issue} &mdash; {letter.date}
            </div>

            {/* Title */}
            <h2
              className="friday-letter-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#f5f5f0",
                marginBottom: "2.5rem",
                letterSpacing: "-0.5px",
              }}
            >
              {letter.title}
            </h2>

            {/* Body */}
            {letter.paragraphs.map((p, i) => (
              <RevealParagraph key={`${letter.issue}-${i}`} index={i}>
                {p}
              </RevealParagraph>
            ))}
          </div>

          {/* Navigation */}
          <div
            className="friday-nav-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              marginTop: "3rem",
            }}
          >
            <button
              className="friday-nav-btn"
              disabled={currentIndex === 0}
              onClick={() => goTo("prev")}
            >
              &larr; Prev Issue
            </button>
            <button
              className="friday-nav-btn"
              disabled={currentIndex === letters.length - 1}
              onClick={() => goTo("next")}
            >
              Next Issue &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE BAR ─────────────────────────────────────── */}
      <div className={`friday-subscribe ${showSubscribe && !subscribed ? "show" : ""}`}>
        <div
          style={{
            background: "#0a0a0a",
            borderTop: "1px solid rgba(0,255,133,0.15)",
            padding: "1rem clamp(1.5rem, 5vw, 3rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "#00FF85",
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
            }}
          >
            Get this every Friday.
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            style={{
              background: "#111",
              border: "1px solid rgba(0,255,133,0.2)",
              color: "#f5f5f0",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.8rem",
              padding: "0.6rem 1rem",
              borderRadius: "0",
              outline: "none",
              width: "240px",
              maxWidth: "100%",
            }}
          />
          <button
            onClick={handleSubscribe}
            style={{
              background: "#00FF85",
              border: "none",
              color: "#0a0a0a",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.85rem",
              fontWeight: 600,
              padding: "0.6rem 1.2rem",
              cursor: "pointer",
              borderRadius: "0",
              lineHeight: 1,
            }}
          >
            &rarr;
          </button>
        </div>
      </div>

      {/* Confirmed message */}
      {subscribed && (
        <div className="friday-confirmed">
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#00FF85",
              letterSpacing: "1px",
            }}
          >
            See you Friday.
          </span>
        </div>
      )}
    </>
  );
}

/* ── REVEAL PARAGRAPH ───────────────────────────────────────── */

function RevealParagraph({
  children,
  index,
}: {
  children: string;
  index: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isSignoff = children === "See you next Friday.";

  return (
    <p
      ref={ref}
      className={`friday-para ${visible ? "visible" : ""}`}
      style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "1.05rem",
        fontWeight: 300,
        lineHeight: 1.85,
        color: isSignoff ? "#00FF85" : "#ccc",
        fontStyle: isSignoff ? "italic" : "normal",
        marginBottom: "1.5rem",
        transitionDelay: `${index * 0.06}s`,
      }}
    >
      {children}
    </p>
  );
}
