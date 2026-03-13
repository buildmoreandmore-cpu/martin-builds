import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact — martin.builds",
  description:
    "Get in touch about AI tools, websites, or products for your business. Based in Atlanta, GA. Response within 24 hours.",
  alternates: { canonical: "https://martinbuilds.ai/contact" },
  openGraph: {
    title: "Contact — martin.builds",
    description: "Get in touch with Francis Martin. Responds within 24 hours.",
    url: "https://martinbuilds.ai/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — martin.builds",
    description: "Get in touch with Francis Martin. Responds within 24 hours.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section style={{ padding: "10rem 3rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div className="animate-fade-up-1" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Contact
        </div>
        <h1
          className="animate-fade-up-2"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-3px", maxWidth: "800px" }}
        >
          Let&apos;s talk about
          <br />
          <span style={{ color: "#c8ff00" }}>what you need built.</span>
        </h1>
        <p
          className="animate-fade-up-3"
          style={{ fontSize: "1.1rem", fontWeight: 300, color: "#888", maxWidth: "520px", marginTop: "1.5rem", lineHeight: 1.7 }}
        >
          Whether it&apos;s a quick question or a full project — drop me a line. I respond within 24 hours.
        </p>
      </section>

      {/* Two-column layout */}
      <section style={{ padding: "2rem 3rem 6rem" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Form */}
          <ScrollReveal>
            <div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#c8ff00", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                Send a Message
              </p>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Info */}
          <div style={{ paddingTop: "2.5rem" }}>
            <ContactInfo />
          </div>
        </div>
      </section>

      <NewsletterFooter />
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </>
  );
}
