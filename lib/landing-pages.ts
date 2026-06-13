/**
 * Per-channel paid-ads landing page config.
 *
 * Every paid channel renders the SAME page component at /go/[channel] — only the
 * copy below changes. To launch a new channel (e.g. /go/tiktok), add an entry to
 * LANDING_PAGES. No new routes or components required.
 */

export interface FAQ {
  q: string;
  a: string;
}

export interface HowItWorksStep {
  title: string;
  body: string;
}

export interface LandingPageConfig {
  /** URL slug — also stored on the lead as `type` */
  slug: string;
  /** Human label for the channel, e.g. "Google Ads" */
  channelLabel: string;
  /** Fallback campaign label if the ad URL omits utm_campaign */
  defaultCampaign: string;
  /** Hero headline — the core offer */
  headline: string;
  /** Hero supporting line */
  subhead: string;
  /** Primary CTA button label */
  ctaLabel: string;
  howItWorks: [HowItWorksStep, HowItWorksStep, HowItWorksStep];
  /** Proof / credibility bullets */
  proofPoints: string[];
  /** Pricing anchor block */
  pricingAnchor: {
    heading: string;
    body: string;
  };
  faqs: FAQ[];
  finalCta: {
    heading: string;
    body: string;
  };
}

const SHARED_HOW_IT_WORKS: [HowItWorksStep, HowItWorksStep, HowItWorksStep] = [
  {
    title: "Scope the build",
    body: "A short call to pin down exactly what gets built and what it costs. Fixed price, agreed before any work starts — no hourly surprises.",
  },
  {
    title: "Build in a ~14-day sprint",
    body: "I build your platform, dashboard, or client portal in a focused two-week sprint. You see progress as it ships, not at the end.",
  },
  {
    title: "Launch and own it",
    body: "You get the keys — the whole system is yours. Hand-off, training, and a working product live on your domain.",
  },
];

const SHARED_PROOF: string[] = [
  "Fixed-price builds — you know the number before we start.",
  "AI platforms, dashboards, and client portals built for service businesses.",
  "Shipped in ~14-day sprints, not multi-month engagements.",
  "You own the code and the data — no lock-in, no per-seat rent.",
  "One builder, direct line. No account managers, no hand-offs.",
];

const SHARED_PRICING = {
  heading: "Fixed price, scoped before we start",
  body: "No hourly billing, no open-ended retainers. We agree the scope and the price up front, then I build it in a ~14-day sprint. If it isn't scoped, it isn't started.",
};

const SHARED_FAQS: FAQ[] = [
  {
    q: "What exactly do you build?",
    a: "Custom AI platforms, operational dashboards, and client portals for service businesses — the internal tools and customer-facing systems that off-the-shelf software can't quite do.",
  },
  {
    q: "How much does it cost?",
    a: "Every build is fixed-price and scoped before we begin, so you approve the exact number before any work starts. Most builds land in a clear, predictable range we'll confirm on the scoping call.",
  },
  {
    q: "How long does it take?",
    a: "Most builds ship in a focused ~14-day sprint. Larger systems are broken into sprints so you always have something working in two weeks.",
  },
  {
    q: "Do I own what you build?",
    a: "Yes — completely. The code and the data live on your infrastructure and your domain. No per-seat fees, no platform lock-in.",
  },
  {
    q: "What happens after I submit the form?",
    a: "I personally read every submission and reply within a few hours — usually faster — to set up a short scoping call. No sales team, no drip sequence.",
  },
];

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  google: {
    slug: "google",
    channelLabel: "Google Ads",
    defaultCampaign: "google_paid",
    headline: "Fixed-price AI platforms, dashboards, and portals for service businesses.",
    subhead: "Custom software built and shipped in ~14-day sprints. Scoped and priced before we start — you own everything we build.",
    ctaLabel: "Book a build",
    howItWorks: SHARED_HOW_IT_WORKS,
    proofPoints: SHARED_PROOF,
    pricingAnchor: SHARED_PRICING,
    faqs: SHARED_FAQS,
    finalCta: {
      heading: "Tell me what you want built.",
      body: "Fixed price, scoped up front, shipped in about two weeks. Send the details and I'll reply within hours.",
    },
  },

  meta: {
    slug: "meta",
    channelLabel: "Meta Ads",
    defaultCampaign: "meta_paid",
    headline: "Custom AI tools and dashboards for service businesses — fixed price, ~14 days.",
    subhead: "Stop renting clunky software. Get a platform built for how your business actually runs, and own it outright.",
    ctaLabel: "Book a build",
    howItWorks: SHARED_HOW_IT_WORKS,
    proofPoints: SHARED_PROOF,
    pricingAnchor: SHARED_PRICING,
    faqs: SHARED_FAQS,
    finalCta: {
      heading: "Tell me what you want built.",
      body: "Fixed price, scoped up front, shipped in about two weeks. Send the details and I'll reply within hours.",
    },
  },

  linkedin: {
    slug: "linkedin",
    channelLabel: "LinkedIn Ads",
    defaultCampaign: "linkedin_paid",
    headline: "Bespoke platforms, dashboards, and client portals — delivered in ~14-day sprints.",
    subhead: "Fixed-price custom software for service businesses that have outgrown spreadsheets and SaaS workarounds.",
    ctaLabel: "Book a build",
    howItWorks: SHARED_HOW_IT_WORKS,
    proofPoints: SHARED_PROOF,
    pricingAnchor: SHARED_PRICING,
    faqs: SHARED_FAQS,
    finalCta: {
      heading: "Tell me what you want built.",
      body: "Fixed price, scoped up front, shipped in about two weeks. Send the details and I'll reply within hours.",
    },
  },
};

export function getLandingPage(slug: string): LandingPageConfig | undefined {
  return LANDING_PAGES[slug];
}

export const BUDGET_RANGES = [
  "Under $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k+",
  "Not sure yet",
] as const;
