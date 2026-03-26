import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Payment Successful — martin.builds",
  description: "Your payment has been processed successfully.",
};

const accent = "#c8ff00";
const black = "#0a0a0a";
const white = "#f5f5f0";
const grayDark = "#1a1a1a";
const grayMid = "#2a2a2a";
const grayText = "#888";

export default function PaymentSuccessPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: "120px", paddingBottom: "4rem" }}>
        <section
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-1px",
              marginBottom: "1rem",
              color: accent,
            }}
          >
            Payment Successful!
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: grayText,
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Thank you for your payment. You'll receive a receipt via email shortly.
          </p>

          <div
            style={{
              padding: "2rem",
              background: grayDark,
              borderRadius: "12px",
              border: `1px solid ${grayMid}`,
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: white,
                marginBottom: "1rem",
              }}
            >
              What's Next?
            </h2>

            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                "You'll receive a confirmation email with your receipt",
                "I'll start working on your project right away",
                "For split payments: You'll get a link for the final 50% when the project is ready for review",
                "I'll keep you updated throughout the build process",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: white,
                  }}
                >
                  <span style={{ color: accent, fontSize: "1rem" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              padding: "1.5rem",
              background: grayDark,
              borderRadius: "12px",
              border: `1px solid ${grayMid}`,
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
                color: grayText,
                marginBottom: "1rem",
              }}
            >
              Questions or need to get in touch?
            </p>
            <a
              href="/contact"
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
                textDecoration: "none",
              }}
            >
              Contact Me
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
