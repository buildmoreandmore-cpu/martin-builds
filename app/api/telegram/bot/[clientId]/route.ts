/**
 * Dedicated Client Bot Webhook
 * Each client has their own Telegram bot with their own webhook URL:
 *   https://martinbuilds.ai/api/telegram/bot/{clientId}
 *
 * On /start → proactive onboarding questions to understand the business
 * On regular messages → runs through the agent brain
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: (process.env.ANTHROPIC_API_KEY || "").trim(),
});

// In-memory onboarding state (per chat)
const onboardingState = new Map<
  string,
  { step: number; answers: Record<string, string> }
>();

const ONBOARDING_QUESTIONS = [
  {
    key: "services",
    question:
      "First — what are the main services your business offers? List as many as you want.",
  },
  {
    key: "ideal_client",
    question:
      "Who is your ideal client? (Industry, size, location — whatever matters most.)",
  },
  {
    key: "coverage",
    question: "What areas do you serve? (Cities, states, nationwide, etc.)",
  },
  {
    key: "differentiator",
    question:
      "What makes you different from competitors? What do clients always say they love about working with you?",
  },
  {
    key: "tone",
    question:
      'Last one — how should I sound when I talk to your clients? (Professional, friendly, casual, direct — or give me an example like "talk like a helpful assistant who knows staffing inside out.")',
  },
];

async function sendMessage(botToken: string, chatId: string | number, text: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await params;

  try {
    const body = await req.json();
    const message = body.message;
    if (!message?.text || !message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    const text = message.text.trim();

    // Look up the client
    const { data: client, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single();

    if (error || !client || !client.bot_token) {
      return NextResponse.json({ ok: true });
    }

    const botToken = client.bot_token;

    // Link telegram_chat_id on first interaction
    if (!client.telegram_chat_id || client.telegram_chat_id !== chatId) {
      await supabase
        .from("clients")
        .update({ telegram_chat_id: chatId })
        .eq("id", clientId);
    }

    // /start command → begin proactive onboarding
    if (text === "/start") {
      onboardingState.set(chatId, { step: 0, answers: {} });
      await sendMessage(
        botToken,
        chatId,
        `Hey ${client.name.split(" ")[0]}! I'm <b>${client.bot_name || "your agent"}</b> — your AI assistant for <b>${client.business_name}</b>.\n\nBefore I can start working for you, I need to understand your business. I've got ${ONBOARDING_QUESTIONS.length} quick questions. Ready?\n\n${ONBOARDING_QUESTIONS[0].question}`
      );
      return NextResponse.json({ ok: true });
    }

    // Handle onboarding flow
    const state = onboardingState.get(chatId);
    if (state && state.step < ONBOARDING_QUESTIONS.length) {
      // Save answer
      const currentQ = ONBOARDING_QUESTIONS[state.step];
      state.answers[currentQ.key] = text;
      state.step++;

      if (state.step < ONBOARDING_QUESTIONS.length) {
        // Ask next question
        const nextQ = ONBOARDING_QUESTIONS[state.step];
        await sendMessage(
          botToken,
          chatId,
          `Got it. ${nextQ.question}`
        );
      } else {
        // Onboarding complete — save training data
        await supabase.from("clients").update({
          business_description: [
            `Services: ${state.answers.services}`,
            `Ideal client: ${state.answers.ideal_client}`,
            `Coverage: ${state.answers.coverage}`,
            `Differentiator: ${state.answers.differentiator}`,
            `Tone: ${state.answers.tone}`,
          ].join("\n\n"),
        }).eq("id", clientId);

        onboardingState.delete(chatId);

        await sendMessage(
          botToken,
          chatId,
          `That's everything I need. I now understand <b>${client.business_name}</b> and I'm ready to work.\n\nHere's what I can help with:\n• Answer questions about your services\n• Handle incoming leads\n• Draft responses and follow-ups\n• Manage client data\n\nJust message me anytime. I'm here 24/7.`
        );
      }
      return NextResponse.json({ ok: true });
    }

    // Regular conversation — use Claude
    const systemPrompt = buildSystemPrompt(client);
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: text }],
    });

    const reply =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I couldn't process that. Try again?";

    await sendMessage(botToken, chatId, reply);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram/bot] Error:", err);
    return NextResponse.json({ ok: true });
  }
}

function buildSystemPrompt(client: Record<string, unknown>): string {
  const name = client.bot_name || "Agent";
  const biz = client.business_name || "the business";
  const desc = client.business_description || "";

  return `You are ${name}, the AI assistant for ${biz}.

${desc ? `About the business:\n${desc}\n` : ""}
Your role:
- Answer questions about the business accurately based on what you know
- Help manage leads, clients, and follow-ups
- Be proactive — if someone asks about services, give specific answers
- If you don't know something specific, say so honestly and offer to connect them with the owner
- Keep responses concise and helpful — no fluff

Tone: Match what the business owner specified. Default to professional but warm.
Never mention that you are AI unless directly asked. Just be helpful.`;
}
