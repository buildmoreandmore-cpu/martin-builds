interface TemplateData {
  name: string;
  businessName: string;
  industry: string;
  email: string;
}

const INDUSTRY_BULLETS: Record<string, string[]> = {
  "Healthcare & Dental": [
    "Answer patient questions 24/7 — insurance, prep instructions, office hours",
    "Book and confirm appointments automatically, reducing no-shows by 30%",
    "Follow up with patients who haven't scheduled their next visit",
    "Handle new patient intake forms before they even walk in",
  ],
  "Law Firm": [
    "Qualify potential clients 24/7 with intake questions",
    "Schedule consultations directly into your calendar",
    "Answer common legal FAQs so your team focuses on billable work",
    "Follow up with leads who visited your site but didn't book",
  ],
  "Energy/HVAC": [
    "Capture emergency service requests at 2 AM — no missed calls",
    "Schedule estimates and maintenance appointments automatically",
    "Follow up on quotes that haven't been accepted yet",
    "Answer questions about services, pricing, and availability instantly",
  ],
  "Real Estate": [
    "Respond to property inquiries instantly — even at midnight",
    "Qualify buyers and sellers with smart intake questions",
    "Schedule showings and open house visits automatically",
    "Follow up with leads from Zillow, Realtor.com, and your website",
  ],
  "Financial Services": [
    "Pre-qualify prospects before they speak with an advisor",
    "Answer questions about services, fees, and process 24/7",
    "Schedule consultations directly into your calendar",
    "Follow up with prospects who downloaded guides or visited key pages",
  ],
  "Insurance": [
    "Capture quote requests 24/7 — even outside business hours",
    "Answer coverage questions and guide prospects to the right products",
    "Schedule policy reviews and consultations automatically",
    "Follow up with leads who started but didn't finish a quote",
  ],
};

const INDUSTRY_PAIN: Record<string, { pain: string; stat: string }> = {
  "Healthcare & Dental": {
    pain: "missed calls and no-show appointments",
    stat: "The average dental practice loses $150K/year to no-shows and missed new patient calls",
  },
  "Law Firm": {
    pain: "unqualified consultations eating billable hours",
    stat: "67% of law firms say their biggest bottleneck is time spent on non-billable intake work",
  },
  "Energy/HVAC": {
    pain: "after-hours emergency calls going to voicemail",
    stat: "78% of homeowners hire the first HVAC company that responds — speed wins",
  },
  "Real Estate": {
    pain: "slow response times killing hot leads",
    stat: "Agents who respond within 5 minutes are 100x more likely to connect vs. 30 minutes",
  },
  "Financial Services": {
    pain: "prospects ghosting after the first touchpoint",
    stat: "80% of financial service leads require 5+ follow-ups — most advisors stop at 2",
  },
  "Insurance": {
    pain: "quote requests that never convert",
    stat: "Insurance agencies that respond within 10 minutes see 4x higher conversion rates",
  },
};

function getBullets(industry: string): string[] {
  return INDUSTRY_BULLETS[industry] || INDUSTRY_BULLETS["Real Estate"];
}

function getPain(industry: string): { pain: string; stat: string } {
  return INDUSTRY_PAIN[industry] || { pain: "repetitive tasks eating your day", stat: "Businesses using AI automation save 15+ hours per week on average" };
}

export function getEmailTemplate(dayNumber: number, data: TemplateData): { subject: string; body: string } | null {
  const { name, businessName, industry, email } = data;

  switch (dayNumber) {
    case 0: {
      const bullets = getBullets(industry);
      return {
        subject: `Here's what your full AI agent would look like, ${name}`,
        body: `Hey ${name},\n\nYou just tried the demo for ${businessName} — pretty cool, right?\n\nBut that was just a taste. Here's what a full AI agent would do for you:\n\n${bullets.map(b => `• ${b}`).join("\n")}\n\nNo setup fees. Live in 48 hours. Cancel anytime.\n\nWant to see exactly what I'd build for ${businessName}? Book a quick 15-min call:\nhttps://martinbuilds.ai/discovery-call\n\nTalk soon,\nMartin`,
      };
    }
    case 2: {
      const { pain, stat } = getPain(industry);
      return {
        subject: `The #1 time drain for ${industry} businesses`,
        body: `Hey ${name},\n\nFor most ${industry.toLowerCase()} businesses, the biggest time drain is ${pain}.\n\nHere's a stat that might hit home: ${stat}.\n\nThe fix? An AI agent that handles this automatically — 24/7, no breaks, no missed opportunities.\n\nYour AI agent handles this automatically. See how:\nhttps://martinbuilds.ai/discovery-call\n\n— Martin`,
      };
    }
    case 4: {
      const encoded = encodeURIComponent(email);
      return {
        subject: `Quick question, ${name}`,
        body: `Hey ${name},\n\nI'd love to know what would make an AI agent most useful for ${businessName}.\n\n30 seconds — just 3 quick questions:\nhttps://martinbuilds.ai/survey?e=${encoded}\n\nYour answers help me build something that actually fits your workflow.\n\n— Martin`,
      };
    }
    case 7: {
      return {
        subject: `Last call, ${name}`,
        body: `Hey ${name},\n\nI don't want to keep emailing if it's not the right time.\n\nBut if you're still thinking about it — the offer stands. 48-hour setup, cancel anytime.\n\nhttps://martinbuilds.ai/discovery-call\n\nEither way, I wish ${businessName} all the best.\n\n— Martin`,
      };
    }
    default:
      return null;
  }
}
