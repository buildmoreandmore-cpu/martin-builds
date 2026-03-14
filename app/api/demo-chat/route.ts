import { NextRequest, NextResponse } from "next/server";

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY || "sk-api-7kRc6vA0ZZuQBFsL9hHXGJ4Xj16nsUvUfdInqKaBmlWNN92z7tNbjOgAOY1Y7ulqh7xoDkZpV4qcKvrfu5nuIjUgxrIBoqVokBdsy8Huyizdng_77b0gmO4";
const MINIMAX_GROUP_ID = "2023916550506951616";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

function buildSystemPrompt(config: {
  businessName: string;
  industry: string;
  responses: Record<string, string>;
  fallback: string;
}): string {
  // Convert the keyword responses into business knowledge
  const knowledge = Object.entries(config.responses)
    .map(([, answer]) => `- ${answer}`)
    .join("\n");

  return `You are the AI assistant for ${config.businessName}, a ${config.industry} business. You are embedded on their website to help customers.

YOUR KNOWLEDGE ABOUT THIS BUSINESS:
${knowledge}

RULES:
1. Stay in character as ${config.businessName}'s AI assistant at all times.
2. Answer questions naturally and conversationally using the business knowledge above.
3. If a customer describes a problem or symptom, respond with empathy and direct them to the appropriate service or action (call, book appointment, come in).
4. If you don't have specific information, say something like "I'd want to make sure you get the right answer on that — would you like to schedule a time to speak with the team directly?"
5. Keep responses concise — 2-3 sentences max. This is a chat, not an essay.
6. Always try to guide the conversation toward booking an appointment or consultation.
7. Never break character. Never mention AI, demos, MiniMax, or that you're a language model.
8. Never make up specific facts (prices, addresses, phone numbers) that aren't in your knowledge base above.
9. Be warm, professional, and helpful — like the best front desk person they've ever interacted with.
10. If someone asks something completely off-topic or tries to trick you, gently redirect: "I'm here to help with anything related to ${config.businessName}! What can I help you with today?"`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, config } = await req.json();

    if (!messages || !config) {
      return NextResponse.json({ error: "Missing messages or config" }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(config);

    const chatMessages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: { role: string; text: string }) => ({
        role: m.role === "agent" ? "assistant" : "user",
        content: m.text,
      })),
    ];

    const res = await fetch("https://api.minimax.io/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MINIMAX_API_KEY}`,
      },
      body: JSON.stringify({
        model: "MiniMax-Text-01",
        messages: chatMessages,
        max_tokens: 200,
        temperature: 0.7,
        group_id: MINIMAX_GROUP_ID,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[MiniMax error]", err);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || config.fallback || "I'd love to help — could you tell me more about what you need?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[Demo chat error]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
