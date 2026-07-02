import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import TeamIntakeForm from "@/components/team/TeamIntakeForm";

export const metadata: Metadata = {
  title: "Tell Us Who You Need — martin.builds",
  description: "Roles, volume, timeline. We'll come back with the hiring machine and the price.",
  alternates: { canonical: "https://martinbuilds.ai/team/intake" },
};

export default function TeamIntakePage() {
  return (
    <>
      <Nav />
      <section style={{ padding: "10rem 3rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Build Your Team
        </p>
        <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2.5px", maxWidth: 720 }}>
          Tell us who <span style={{ color: "#c8ff00" }}>you need.</span>
        </h1>
        <p style={{ fontSize: "1rem", fontWeight: 300, color: "#888", maxWidth: 480, marginTop: "1.25rem", lineHeight: 1.7 }}>
          Roles, volume, timeline. No discovery-call maze — we come back with the machine and the price.
        </p>
      </section>

      <section style={{ padding: "0 3rem 6rem" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <ScrollReveal>
            <TeamIntakeForm />
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
