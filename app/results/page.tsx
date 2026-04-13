import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Results — martin.builds",
  description:
    "Real build reports from real businesses. See what changed after working with martin.builds — dashboards, portals, and AI tools in action.",
  alternates: { canonical: "https://martinbuilds.ai/results" },
};

export const revalidate = 60;

interface Report {
  id: string;
  name: string;
  business_name: string;
  industry: string;
  location: string | null;
  before: string;
  built: string;
  tech_tags: string[];
  impact: string;
  rating: string | null;
  quote: string | null;
  created_at: string;
}

async function getApprovedReports(): Promise<Report[]> {
  try {
    const { data, error } = await supabase
      .from("build_reports")
      .select("id, name, business_name, industry, location, before, built, tech_tags, impact, rating, quote, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Results] Fetch error:", error);
      return [];
    }
    return (data as Report[]) || [];
  } catch {
    return [];
  }
}

function RatingBadge({ rating }: { rating: string }) {
  const labels: Record<string, string> = {
    good: "Good",
    exceptional: "Exceptional",
    game_changer: "Game Changer",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 10,
        padding: "4px 10px",
        background: "rgba(200,255,0,0.08)",
        border: "1px solid rgba(200,255,0,0.2)",
        borderRadius: 3,
        color: "#c8ff00",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontWeight: 600,
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {rating === "game_changer" && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        </svg>
      )}
      {rating === "exceptional" && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      )}
      {rating === "good" && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )}
      {labels[rating] || rating}
    </span>
  );
}

export default async function ResultsPage() {
  const reports = await getApprovedReports();

  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#f5f5f0",
          fontFamily: "'Outfit', sans-serif",
          paddingTop: "100px",
        }}
      >
        {/* Header */}
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 clamp(1.25rem, 5vw, 3rem) 3rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c8ff00",
              marginBottom: 16,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            martin.builds &mdash; client results
          </div>
          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: "1rem",
            }}
          >
            The Build <span style={{ color: "#c8ff00" }}>Wall.</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              color: "#888",
              maxWidth: 560,
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            Real stories from real businesses. What they were dealing with, what got built, and what changed.
          </p>
          <Link
            href="/results/submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              background: "#c8ff00",
              color: "#0a0a0a",
              borderRadius: 100,
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              letterSpacing: "0.5px",
            }}
          >
            Submit Your Report
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Results Wall */}
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 clamp(1.25rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)",
          }}
        >
          {reports.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1rem",
                color: "#888",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  margin: "0 auto 1.5rem",
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
                </svg>
              </div>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f5f5f0", marginBottom: "0.5rem" }}>
                First reports coming soon.
              </p>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                We&apos;re collecting stories from our first builds. Yours could be the first on the wall.
              </p>
            </div>
          )}

          {reports.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {reports.map((r) => (
                <article
                  key={r.id}
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid rgba(245,245,240,0.06)",
                    borderRadius: 16,
                    padding: "2rem 2rem 1.75rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Accent line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#c8ff00" }} />

                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.1rem", fontWeight: 700, marginBottom: 2 }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#888" }}>
                        {r.business_name} &middot; {r.industry}
                        {r.location && <> &middot; {r.location}</>}
                      </div>
                    </div>
                    {r.rating && <RatingBadge rating={r.rating} />}
                  </div>

                  {/* Quote callout */}
                  {r.quote && (
                    <div
                      style={{
                        padding: "1rem 1.25rem",
                        borderLeft: "2px solid #c8ff00",
                        background: "rgba(200,255,0,0.03)",
                        borderRadius: "0 8px 8px 0",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <p style={{ fontSize: "1rem", fontStyle: "italic", color: "#ddd", lineHeight: 1.7, margin: 0 }}>
                        &ldquo;{r.quote}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Before / Built / Impact */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "1.25rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>
                        Before
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#bbb", lineHeight: 1.7, margin: 0 }}>
                        {r.before}
                      </p>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>
                        What Was Built
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#bbb", lineHeight: 1.7, margin: 0 }}>
                        {r.built}
                      </p>
                    </div>
                  </div>

                  {/* Impact */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: 10, color: "#c8ff00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>
                      Impact
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "#ddd", lineHeight: 1.7, margin: 0 }}>
                      {r.impact}
                    </p>
                  </div>

                  {/* Tags */}
                  {r.tech_tags && r.tech_tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {r.tech_tags.map((t: string) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 10,
                            padding: "4px 10px",
                            border: "1px solid #2a2a2a",
                            borderRadius: 2,
                            color: "#888",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            fontFamily: "'Space Mono', monospace",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ textAlign: "center", padding: "3rem 0 2rem" }}>
            <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
              Built something with martin.builds?
            </p>
            <Link
              href="/results/submit"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                background: "#c8ff00",
                color: "#0a0a0a",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Submit Your Build Report
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
