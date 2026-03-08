import type { Metadata } from "next";
import Nav from "@/components/Nav";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — martin.builds",
  description: "Privacy policy for martin.builds. How we collect, use, and protect your information.",
};

const sectionStyle: React.CSSProperties = { marginBottom: "2.5rem" };
const h2Style: React.CSSProperties = { fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f5f5f0" };
const pStyle: React.CSSProperties = { fontSize: "1rem", lineHeight: 1.8, color: "#ccc", marginBottom: "1rem" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", padding: "clamp(6rem,12vw,8rem) clamp(1.25rem,5vw,3rem) 4rem" }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1rem" }}>
            LEGAL
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, letterSpacing: "-2px", marginBottom: "1rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "3rem" }}>Last updated: March 2026</p>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Information We Collect</h2>
            <p style={pStyle}>
              When you use martin.builds, we may collect information you provide directly — such as your name, business name, and project details submitted through forms on this site. We also collect basic analytics data (pages visited, referral source, device type) to understand how people use the site and improve it.
            </p>
            <p style={pStyle}>
              If you purchase a service, payments are processed through Stripe. We do not store your credit card details. Stripe handles all payment data in accordance with PCI compliance standards.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>How We Use Your Information</h2>
            <p style={pStyle}>
              We use the information we collect to respond to your inquiries, deliver the services you purchase, send occasional updates if you opt in, and improve the site experience. We do not sell your data to third parties.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Third-Party Services</h2>
            <p style={pStyle}>
              This site relies on a handful of trusted third-party services to operate:
            </p>
            <ul style={{ ...pStyle, paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#f5f5f0" }}>Stripe</strong> — payment processing</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#f5f5f0" }}>Supabase</strong> — database and backend infrastructure</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#f5f5f0" }}>Vercel</strong> — hosting and deployment</li>
            </ul>
            <p style={pStyle}>
              Each of these services has its own privacy policy governing how they handle data.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>AI Agent Data</h2>
            <p style={pStyle}>
              If you use one of our AI agent services, the agent may be trained on information you provide (business details, FAQs, product info, etc.). You own that data. We use it solely to build and operate your agent. We do not use your data to train agents for other clients.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Your Rights</h2>
            <p style={pStyle}>
              You can request access to, correction of, or deletion of your personal data at any time. If you want us to remove your information from our systems, just reach out and we will take care of it promptly.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Cookies</h2>
            <p style={pStyle}>
              This site may use cookies for analytics and basic functionality. No advertising cookies are used. You can disable cookies in your browser settings at any time.
            </p>
          </div>

          <div style={sectionStyle}>
            <h2 style={h2Style}>Contact</h2>
            <p style={pStyle}>
              Questions about this policy? Use the contact form at <a href="/contact" style={{ color: "#c8ff00", textDecoration: "none" }}>/contact</a>.
            </p>
          </div>
        </div>
      </main>
      <NewsletterFooter />
      <Footer />
    </>
  );
}
