/**
 * Claude-powered website page analysis for the scanner.
 * Fetches page HTML, sends to Claude Sonnet for content/UX analysis.
 */

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";

interface PageAnalysis {
  headline: string;
  copyIssues: string[];
  ctaIssues: string[];
  trustSignals: string[];
  diagnosis: string;
}

export async function analyzePageContent(
  url: string,
  industry: string
): Promise<PageAnalysis | null> {
  if (!ANTHROPIC_API_KEY) {
    console.log("[Claude analysis skipped — no API key]");
    return null;
  }

  try {
    // Fetch the page HTML
    const targetUrl = url.startsWith("http") ? url : `https://${url}`;
    const pageRes = await fetch(targetUrl, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "martinbuilds-scanner/1.0" },
    });

    if (!pageRes.ok) return null;

    const html = await pageRes.text();
    // Strip scripts/styles, keep text content (limit to 8K chars for token efficiency)
    const cleanHtml = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 8000);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `You are a conversion optimization expert analyzing a ${industry || "service business"} website. Analyze this page content and return a JSON object with your findings.

PAGE TEXT CONTENT:
${cleanHtml}

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "headline": "A one-sentence trust-first diagnosis: acknowledge what the business does well (based on content), then state the gap. Example: 'Your 20 years of experience is clear from your content — but a first-time visitor wouldn't know you exist.'",
  "copyIssues": ["Up to 3 specific copy problems. Be concrete: 'Homepage mentions services 4 times but never states pricing or turnaround time' not 'copy could be better'"],
  "ctaIssues": ["Up to 3 CTA problems. Example: 'Only CTA is generic Contact Us — no urgency, no specificity'"],
  "trustSignals": ["Up to 3 missing trust signals. Example: 'No testimonials or reviews visible', 'No certifications or licenses displayed'"],
  "diagnosis": "A 2-sentence diagnosis paragraph using this format: 'Your [business type] clearly [what they do well based on content]. But [the specific gap] means [what it's costing them]. A business like yours should have [specific infrastructure they're missing].'"
}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("[Claude analysis failed]", res.status);
      return null;
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    // Parse the JSON response
    const parsed = JSON.parse(text);
    return {
      headline: parsed.headline || "",
      copyIssues: parsed.copyIssues || [],
      ctaIssues: parsed.ctaIssues || [],
      trustSignals: parsed.trustSignals || [],
      diagnosis: parsed.diagnosis || "",
    };
  } catch (err) {
    console.error("[Claude page analysis error]", err);
    return null;
  }
}
