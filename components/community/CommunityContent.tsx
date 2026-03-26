"use client";

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

const sectionPad = "clamp(1.25rem, 5vw, 3rem)";

export default function CommunityContent() {
  return (
    <div style={{ paddingTop: "120px", paddingBottom: "4rem" }}>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        style={{
          textAlign: "center",
          padding: `0 ${sectionPad} 4rem`,
          maxWidth: "780px",
          margin: "0 auto",
        }}
      >
        <SectionTag>Nonprofit Initiative</SectionTag>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            color: white,
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
        >
          Martin Builds{" "}
          <span style={{ color: accent }}>Community</span>
        </h1>
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: grayText,
            lineHeight: 1.7,
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          Bringing AI literacy to the next generation. We partner with schools
          and organizations to run hands-on AI workshops and curriculum —
          taught by a working builder, not a textbook.
        </p>
        <a
          href="#partner"
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            background: accent,
            color: black,
            borderRadius: "100px",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Partner With Us
        </a>
      </section>

      {/* ── What We Teach ─────────────────────────────────── */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 4rem`,
        }}
      >
        <SectionTag>What We Teach</SectionTag>
        <h2 style={h2Style}>AI education that mirrors the real world</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
            marginTop: "2rem",
          }}
        >
          {[
            {
              title: "AI in the Real World",
              desc: "How AI is already shaping industries students care about — healthcare, music, sports, and business. No hype, just what's actually happening.",
            },
            {
              title: "Building with AI Tools",
              desc: "Hands-on prompt engineering and using AI assistants to solve real problems. Students learn by doing, not watching.",
            },
            {
              title: "AI-Powered Projects",
              desc: "Every student builds a working AI tool — a chatbot, a data app, or an automation. They leave with something they made.",
            },
            {
              title: "Responsible AI",
              desc: "Guardrails, bias, ethics, and what it means to use AI responsibly. The conversation every school should be having.",
            },
            {
              title: "Career Paths in AI",
              desc: "What AI jobs actually look like today. Many don't require a CS degree — students need to know that.",
            },
          ].map((topic) => (
            <div
              key={topic.title}
              style={{
                padding: "1.5rem",
                background: grayDark,
                borderRadius: "12px",
                border: `1px solid ${grayMid}`,
                transition: "border-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = grayMid;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: white,
                  marginBottom: "0.5rem",
                }}
              >
                {topic.title}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.65,
                  color: grayText,
                }}
              >
                {topic.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 4rem`,
        }}
      >
        <SectionTag>How It Works</SectionTag>
        <h2 style={h2Style}>Three steps to bring AI to your school</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginTop: "1.5rem",
          }}
        >
          {[
            {
              num: "01",
              title: "Reach out",
              desc: "Your school or organization connects with us. We learn what your students need and where AI fits in your curriculum.",
            },
            {
              num: "02",
              title: "We scope the program",
              desc: "Single workshop, multi-week series, or full semester partnership — we design a format that works for your school.",
            },
            {
              num: "03",
              title: "Students build",
              desc: "Students work with real AI tools and build real projects. They walk away with skills they can use immediately.",
            },
          ].map((step) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                padding: "1.25rem 1.5rem",
                background: grayDark,
                borderRadius: "12px",
                border: `1px solid ${grayMid}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: accent,
                  minWidth: "28px",
                }}
              >
                {step.num}
              </span>
              <div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: white,
                    marginBottom: "0.35rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: grayText,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Partner With Us ────────────────────────────── */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 4rem`,
        }}
      >
        <SectionTag>Why Us</SectionTag>
        <h2 style={h2Style}>Not theory. Not a slide deck.</h2>

        <ul
          style={{
            listStyle: "none",
            marginTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          {[
            "Led by a working AI builder — students learn from someone who ships products, not lectures",
            "Curriculum mapped to real industry tools — ChatGPT, Claude, Vercel, and more",
            "Flexible format — single workshop, multi-week series, or semester-long partnership",
            "Atlanta-based — local-first, in-person preferred, available nationwide",
          ].map((item) => (
            <li
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: white,
              }}
            >
              <span style={{ color: accent, fontSize: "1rem", lineHeight: "1.6" }}>
                &#10003;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section
        id="partner"
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: `0 ${sectionPad} 2rem`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "3rem 2rem",
            background: grayDark,
            borderRadius: "12px",
            border: `1px solid ${grayMid}`,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              fontWeight: 700,
              color: white,
              marginBottom: "0.75rem",
            }}
          >
            Bring AI to your school
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: grayText,
              marginBottom: "2rem",
              maxWidth: "480px",
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Whether it&apos;s a one-day workshop or a full semester, we&apos;ll build a
            program that fits your students.
          </p>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              padding: "0.75rem 2.5rem",
              background: accent,
              color: black,
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,255,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}

/* ── Shared helpers ──────────────────────────────────────── */

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: accent,
        marginBottom: "0.75rem",
        display: "block",
      }}
    >
      {children}
    </span>
  );
}

const h2Style: React.CSSProperties = {
  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  color: white,
};
