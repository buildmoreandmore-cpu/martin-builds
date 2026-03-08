import type { Metadata } from "next";
import Nav from "@/components/Nav";
import DiscoveryBookingCard from "@/components/discovery/DiscoveryBookingCard";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Discovery Call — martin.builds",
  description: "Book a free 30-minute discovery call. I'll tell you what I'd build, what it costs, and how fast we ship.",
};

export default function DiscoveryCallPage() {
  return (
    <>
      <Nav />

      <section
        className="discovery-section"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,3rem) 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "4rem",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
          className="discovery-hero-grid"
        >
          <div>
            <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Free Discovery Call
            </div>
            <h1
              className="animate-fade-up-2 discovery-h1"
              style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px" }}
            >
              Not sure what you need?
              <br />
              <span style={{ color: "#c8ff00" }}>Let&apos;s figure it out.</span>
            </h1>
            <p
              className="animate-fade-up-3 discovery-sub"
              style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", fontWeight: 300, color: "#888", marginTop: "1.5rem", lineHeight: 1.7, maxWidth: "520px" }}
            >
              30 minutes. Just you and me. We&apos;ll talk about your business, where AI fits in, and whether working together makes sense. No pitch deck. No pressure.
            </p>

            <div className="animate-fade-up-4 discovery-stats" style={{ display: "flex", gap: "2.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {[
                { num: "30 min", label: "Zoom call" },
                { num: "Free", label: "No obligation" },
                { num: "24h", label: "Invite sent within" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 700, color: "#c8ff00", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.3rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up-3">
            <DiscoveryBookingCard />
          </div>
        </div>
      </section>

      <NewsletterFooter />
      <Footer />

      <style>{`
        .discovery-section {
          min-height: 100vh;
        }
        @media (max-width: 900px) {
          .discovery-section {
            min-height: auto;
          }
          .discovery-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .discovery-stats {
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .discovery-section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}
