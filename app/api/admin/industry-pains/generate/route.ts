import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { industry } = await req.json();

    if (!industry) {
      return NextResponse.json({ error: "industry is required" }, { status: 400 });
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        messages: [
          {
            role: "user",
            content: `You are helping generate cold outreach email content for a software agency that builds custom dashboards and AI tools for small businesses.

Given the industry "${industry}", generate:
1. A short comma-separated list of 3 pain points that businesses in this industry deal with daily (e.g. "intake, conflict checks, engagement letters"). Keep each pain point to 2-4 words. No articles (a, the).
2. Exactly 3 "What I'd Build" items, each with a short title and one-line description of what the software tool does for them.

Respond in this exact JSON format, no markdown:
{"pains":"pain1, pain2, pain3","items":[{"title":"Title 1","desc":"description 1"},{"title":"Title 2","desc":"description 2"},{"title":"Title 3","desc":"description 3"}]}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      console.error("[IndustryPains Generate] API error:", errText);
      return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";

    // Parse the JSON from Claude's response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Could not parse AI response" }, { status: 500 });
    }

    const generated = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      pains: generated.pains || "",
      items: generated.items || [],
    });
  } catch (error) {
    console.error("[IndustryPains Generate] Error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
