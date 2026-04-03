import type { Metadata } from "next";
import Nav from "@/components/Nav";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Service Agreement — martin.builds",
  description:
    "Martin Builds service agreement. Payment terms, refund policy, delivery, ownership, and dispute resolution.",
  alternates: { canonical: "https://martinbuilds.ai/terms" },
};

const accent = "#c8ff00";
const white = "#f5f5f0";
const grayText = "#888";

const todayFormatted = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date());

export default function TermsPage() {
  return (
    <>
      <Nav />
      <article
        style={{
          maxWidth: "740px",
          margin: "0 auto",
          paddingTop: "120px",
          paddingBottom: "4rem",
          paddingLeft: "clamp(1.25rem, 5vw, 3rem)",
          paddingRight: "clamp(1.25rem, 5vw, 3rem)",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: accent,
            display: "block",
            marginBottom: "0.75rem",
          }}
        >
          Legal
        </span>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 700,
            letterSpacing: "-1px",
            color: white,
            marginBottom: "0.5rem",
          }}
        >
          Martin Builds — Service Agreement
        </h1>
        <p style={{ fontSize: "0.88rem", color: grayText, marginBottom: "0.25rem" }}>
          Effective Date: {todayFormatted}
        </p>
        <p style={{ fontSize: "0.88rem", color: grayText, marginBottom: "3rem" }}>
          Governing Jurisdiction: Atlanta, Georgia
        </p>

        <Section num="1" title="Parties">
          <P>
            This agreement is between Martin Builds (&ldquo;Builder&rdquo;), a sole proprietorship operated by Francis Martin, and the individual or entity (&ldquo;Client&rdquo;) making payment through this platform.
          </P>
        </Section>

        <Section num="2" title="Scope of Work">
          <P>
            All deliverables are defined at the project level and communicated to the Client prior to payment. Payment constitutes the Client&apos;s acknowledgment and acceptance of the defined scope. No work outside the agreed scope will be performed without a written change order and additional payment. For multi-phase projects, each phase is scoped and invoiced independently. No phase begins until the prior phase invoice is paid in full.
          </P>
        </Section>

        <Section num="3" title="Payment Terms">
          <Ul>
            <Li>All projects require payment before work begins. No exceptions.</Li>
            <Li>For split-payment projects: a 50% deposit is due at booking; the remaining 50% is due before final delivery and handoff.</Li>
            <Li>For multi-phase projects: each phase is invoiced separately and must be paid in full before that phase begins.</Li>
            <Li>Add-ons and scope changes require a revised or supplemental invoice before work begins. Verbal agreements are not honored.</Li>
            <Li>Monthly retainers are billed automatically via Stripe on the same date each month and continue until cancelled in writing.</Li>
            <Li>Accepted payment methods: credit/debit card or ACH via Stripe. No cash, check, or peer-to-peer transfers accepted.</Li>
          </Ul>
        </Section>

        <Section num="4" title="Refund Policy">
          <Ul>
            <Li>Deposits are non-refundable once work has begun.</Li>
            <Li>Full payments for completed projects are non-refundable.</Li>
            <Li>Payments for completed phases of multi-phase projects are non-refundable.</Li>
            <Li>If Martin Builds cancels a project before work begins, a full refund will be issued within 5 business days.</Li>
            <Li>Dissatisfaction with a delivered product does not constitute grounds for a refund where the deliverable matches the agreed scope.</Li>
          </Ul>
        </Section>

        <Section num="5" title="Delivery">
          <Ul>
            <Li>Martin Builds operates on a 14-day delivery model for standard website projects. Timelines are estimates and may vary based on Client responsiveness.</Li>
            <Li>Final project files, credentials, and assets will not be transferred until all outstanding balances are paid in full.</Li>
            <Li>For multi-phase projects, phase deliverables are transferred upon completion of that phase and receipt of that phase&apos;s payment. Final credentials and full handoff occur after the final phase invoice is paid.</Li>
            <Li>Client is responsible for providing all content, copy, images, and brand assets required for the project within 48 hours of kickoff. Delays in asset delivery may extend the delivery timeline at no fault of Martin Builds.</Li>
          </Ul>
        </Section>

        <Section num="6" title="Ownership & Licensing">
          <Ul>
            <Li>Upon receipt of final payment, the Client owns all custom code and design assets created for their project.</Li>
            <Li>Martin Builds retains the right to display completed work in its portfolio and marketing materials unless the Client requests otherwise in writing prior to project kickoff.</Li>
            <Li>Third-party tools, platforms, and subscriptions (Vercel, Supabase, Stripe, etc.) remain subject to their own licensing terms.</Li>
          </Ul>
        </Section>

        <Section num="7" title="Revisions">
          <Ul>
            <Li>Each project includes up to two rounds of revisions within the agreed scope.</Li>
            <Li>Revisions outside of scope or requested after project delivery are billed at Martin Builds&apos; current hourly rate.</Li>
            <Li>Revision requests for completed phases of multi-phase projects are treated as new scope and invoiced accordingly.</Li>
          </Ul>
        </Section>

        <Section num="8" title="Limitation of Liability">
          <P>
            Martin Builds is not liable for any indirect, incidental, or consequential damages arising from the use of delivered work. Total liability shall not exceed the amount paid for the specific project or phase in dispute.
          </P>
        </Section>

        <Section num="9" title="Dispute Resolution">
          <P>
            Any disputes arising from this agreement will be resolved first through good-faith negotiation. If unresolved, disputes will be submitted to binding arbitration in Atlanta, Georgia under the rules of the American Arbitration Association. Georgia law governs this agreement.
          </P>
        </Section>

        <Section num="10" title="Intellectual Property & Pre-Payment Rights">
          <Ul>
            <Li>All work product — including but not limited to designs, wireframes, technical architecture, code, strategy documents, scope documents, and system blueprints — remains the sole intellectual property of Martin Builds until full payment is received and cleared.</Li>
            <Li>Any concepts, strategies, designs, technical architecture, or proprietary methodologies shared during discovery, scoping, or the build process are confidential. Client agrees not to use, reproduce, or engage a third party to recreate work based on these materials without prior written consent from Martin Builds.</Li>
            <Li>Client shall not engage a third party to build, replicate, or substantially recreate the system, design, or technical approach presented by Martin Builds for a period of twelve (12) months following the last communication between the parties.</Li>
            <Li>In the event of a violation of this section, Client agrees to pay liquidated damages equal to the full quoted project value as compensation for the unauthorized use of Martin Builds&apos; proprietary work product. Both parties agree this amount is a reasonable estimate of damages and not a penalty.</Li>
          </Ul>
        </Section>

        <Section num="11" title="Entire Agreement" last>
          <P>
            This document, combined with the project scope and invoice details communicated prior to payment, constitutes the entire agreement between the parties. No verbal agreements or prior communications override these terms.
          </P>
        </Section>
      </article>
      <NewsletterFooter />
      <Footer />
    </>
  );
}

/* ── Sub-components ────────────────────────────────────── */

function Section({
  num,
  title,
  children,
  last,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section style={{ marginBottom: last ? 0 : "2.5rem" }}>
      <h2
        style={{
          fontSize: "1.15rem",
          fontWeight: 700,
          color: white,
          marginBottom: "0.75rem",
        }}
      >
        <span style={{ color: accent, fontFamily: "'Space Mono', monospace", marginRight: "0.5rem" }}>
          {num}.
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: grayText }}>
      {children}
    </p>
  );
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      {children}
    </ul>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        fontSize: "0.92rem",
        lineHeight: 1.75,
        color: grayText,
        paddingLeft: "1.25rem",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          color: accent,
        }}
      >
        &bull;
      </span>
      {children}
    </li>
  );
}
