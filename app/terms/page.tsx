import type { Metadata } from "next";
import Nav from "@/components/Nav";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms — martin.builds",
  description: "Terms of service for martin.builds.",
};

const sectionStyle: React.CSSProperties = { marginBottom: "2.5rem" };
const h2Style: React.CSSProperties = { fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f5f5f0" };
const pStyle: React.CSSProperties = { fontSize: "1rem", lineHeight: 1.8, color: "#ccc", marginBottom: "1rem" };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", padding: "clamp(6rem,12vw,8rem) clamp(1.25rem,5vw,3rem) 4rem" }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem" }}>
            LEGAL
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, letterSpacing: "-2px", marginBottom: "1rem" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "3rem" }}>Last updated: March 2026</p>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Services</h2>
            <p style={pStyle}>
              martin.builds offers AI tool development, web application builds, AI agent creation, and consulting services for small businesses. Specific deliverables, timelines, and pricing are agreed upon before any project begins.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Project Terms</h2>
            <p style={pStyle}>
              All projects begin with a clearly defined scope. Typical project timelines are 2-3 weeks from kickoff to delivery. If the scope changes significantly during a project, timelines and pricing may be adjusted with mutual agreement.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Payment Terms</h2>
            <p style={pStyle}>
              All payments are processed securely through Stripe. Payment structures vary by service:
            </p>
            <ul style={{ ...pStyle, paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#f5f5f0" }}>Starter / Sprint</strong> — 50% upfront, 50% on delivery</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#f5f5f0" }}>Retainer</strong> — billed monthly, cancel anytime</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#f5f5f0" }}>Power Hour</strong> — full payment upfront</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#f5f5f0" }}>AI Agent</strong> — billed monthly, cancel anytime</li>
            </ul>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Intellectual Property</h2>
            <p style={pStyle}>
              Upon full payment, you own all deliverables created specifically for your project. martin.builds retains the right to showcase the work in portfolios and case studies. Internal tools, frameworks, and reusable components built by martin.builds remain the property of martin.builds.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>AI Agent Terms</h2>
            <p style={pStyle}>
              AI agents are trained on information you provide about your business. Guardrails are put in place to keep agents on-topic and aligned with your brand. That said, AI-generated responses are not guaranteed to be 100% accurate. You are responsible for reviewing agent output and flagging any issues.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Refunds</h2>
            <p style={pStyle}>
              <strong style={{ color: "#f5f5f0" }}>Power Hour:</strong> full refund, no questions asked, if you are not satisfied.
            </p>
            <p style={pStyle}>
              <strong style={{ color: "#f5f5f0" }}>Projects (Starter / Sprint):</strong> no refunds once work has begun. If a project has not started, a full refund of the deposit will be issued.
            </p>
            <p style={pStyle}>
              <strong style={{ color: "#f5f5f0" }}>AI Agent / Retainer:</strong> cancel anytime. No refunds for the current billing period.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Limitation of Liability</h2>
            <p style={pStyle}>
              martin.builds provides services on an as-is basis. We are not liable for indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability is limited to the amount you paid for the specific service in question.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Termination</h2>
            <p style={pStyle}>
              Either party may terminate an ongoing engagement with written notice. For subscription services (Retainer, AI Agent), cancellation takes effect at the end of the current billing period.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Governing Law</h2>
            <p style={pStyle}>
              These terms are governed by the laws of the State of Georgia, United States.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Contact</h2>
            <p style={pStyle}>
              Questions about these terms? Use the contact form at <a href="/contact" style={{ color: "#c8ff00", textDecoration: "none" }}>/contact</a>.
            </p>
          </div>
        </div>
      </main>
      <NewsletterFooter />
      <Footer />
    </>
  );
}
