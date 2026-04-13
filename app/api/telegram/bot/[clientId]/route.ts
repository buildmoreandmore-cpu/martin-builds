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
import { buildSystemPrompt } from "@/lib/agent-prompt";
import { saveMessage, loadHistory } from "@/lib/client-messages";
import { PCG_TOOLS, executePcgTool, syncMessageToPcg, loadPcgHistory } from "@/lib/pcg-client";

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

    // Regular conversation — use Claude with shared conversation history
    // Save the incoming user message (local + PCG sync)
    await saveMessage(clientId, "user", text, "telegram");
    await syncMessageToPcg("user", text, "telegram", client.name);

    // Load cross-interface conversation history
    // Try PCG's shared store first (includes Patrick messages), fall back to local
    const pcgHistory = await loadPcgHistory(20);
    const history = pcgHistory.length > 0 ? pcgHistory : await loadHistory(clientId, 20);

    const systemPrompt = buildSystemPrompt(client);

    // Tool-use loop: Claude may call PCG tools, we execute and feed results back
    // Cap iterations to prevent runaway loops (max 5 tool rounds per turn)
    const messages: Anthropic.MessageParam[] = [...history];
    let finalText = "";
    const pcgConfigured = !!process.env.PCG_API_KEY && !!process.env.PCG_API_BASE_URL;

    for (let i = 0; i < 5; i++) {
      const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        tools: pcgConfigured ? PCG_TOOLS : undefined,
        messages,
      });

      // Collect any text output
      for (const block of response.content) {
        if (block.type === "text") finalText += block.text;
      }

      if (response.stop_reason !== "tool_use") break;

      // Execute tool calls and append results
      const toolUseBlocks = response.content.filter((b) => b.type === "tool_use");
      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of toolUseBlocks) {
        if (block.type !== "tool_use") continue;
        try {
          const result = await executePcgTool(block.name, block.input as Record<string, unknown>);
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: JSON.stringify(result),
          });
        } catch (err) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: `Error: ${err instanceof Error ? err.message : "tool failed"}`,
            is_error: true,
          });
        }
      }
      messages.push({ role: "user", content: toolResults });
    }

    const reply = finalText || "I couldn't process that. Try again?";

    // Save the assistant response (local + PCG sync)
    await saveMessage(clientId, "assistant", reply, "telegram");
    await syncMessageToPcg("assistant", reply, "telegram", client.bot_name || "Parker");

    await sendMessage(botToken, chatId, reply);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[telegram/bot] Error:", err);
    return NextResponse.json({ ok: true });
  }
}

