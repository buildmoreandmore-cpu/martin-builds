/**
 * Dashboard Chat API
 * POST { clientId, message }
 * Saves messages, loads cross-interface history, calls Claude, returns response.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/agent-prompt";
import { saveMessage, loadHistory } from "@/lib/client-messages";

const anthropic = new Anthropic({
  apiKey: (process.env.ANTHROPIC_API_KEY || "").trim(),
});

export async function POST(req: NextRequest) {
  try {
    const { clientId, message } = await req.json();

    if (!clientId || !message) {
      return NextResponse.json(
        { error: "clientId and message are required" },
        { status: 400 }
      );
    }

    // Look up the client
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .single();

    if (clientError || !client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Save the user message
    await saveMessage(clientId, "user", message, "dashboard");

    // Load cross-interface conversation history (last 20 messages)
    const history = await loadHistory(clientId, 20);

    // Call Claude with system prompt + history
    const systemPrompt = buildSystemPrompt(client);
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: history,
    });

    const reply =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I couldn't process that. Try again?";

    // Save the assistant response
    await saveMessage(clientId, "assistant", reply, "dashboard");

    return NextResponse.json({ role: "assistant", content: reply });
  } catch (err) {
    console.error("[dashboard/chat] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
