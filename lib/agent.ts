/**
 * Unified AI Agent Brain — single function handles all messages
 * regardless of source (web widget or Telegram).
 * Uses Claude API with tier-based model selection.
 */

import { supabase } from "./supabase";

export interface AgentInput {
  clientId: string;
  message: string;
  interface: "widget" | "telegram";
}

export interface AgentOutput {
  response: string;
  action: AgentAction | null;
}

export interface AgentAction {
  type: string;
  data: Record<string, unknown>;
}

interface ClientWithTraining {
  id: string;
  business_name: string;
  tier: string;
  is_active: boolean;
  agent_training: {
    business_description: string | null;
    services: string | null;
    coverage_area: string | null;
    pricing_notes: string | null;
    tone: string;
    intake_questions: string | null;
    custom_instructions: string | null;
  } | null;
}

function getModel(tier: string): string {
  if (tier === "enterprise") return "claude-sonnet-4-6";
  return "claude-haiku-4-5-20251001";
}

export function canUseTelegram(tier: string): boolean {
  return tier === "professional" || tier === "enterprise";
}

async function getClientWithTraining(clientId: string): Promise<ClientWithTraining | null> {
  const { data: client } = await supabase
    .from("utility_clients")
    .select("id, business_name, tier, is_active")
    .eq("id", clientId)
    .single();

  if (!client) return null;

  const { data: training } = await supabase
    .from("agent_training")
    .select("*")
    .eq("client_id", clientId)
    .single();

  return { ...client, agent_training: training || null };
}

async function getRecentHistory(clientId: string, limit: number = 10) {
  const { data } = await supabase
    .from("agent_messages")
    .select("role, content")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!data) return [];
  return data.reverse() as { role: string; content: string }[];
}

async function saveMessages(
  clientId: string,
  userMsg: string,
  assistantMsg: string,
  source: string
) {
  await supabase.from("agent_messages").insert([
    { client_id: clientId, role: "user", content: userMsg, interface: source },
    { client_id: clientId, role: "assistant", content: assistantMsg, interface: source },
  ]);
}

async function logUsage(clientId: string, source: string, tokensUsed: number) {
  await supabase.from("usage_log").insert({
    client_id: clientId,
    interface: source,
    tokens_used: tokensUsed,
  });
}

function buildSystemPrompt(client: ClientWithTraining, source: string): string {
  const t = client.agent_training;
  const sections = [
    `You are the AI agent for ${client.business_name}.`,
    "You help the business owner manage their operations via natural conversation.",
  ];

  if (t) {
    if (t.business_description) sections.push(`\nAbout this business:\n${t.business_description}`);
    if (t.services) sections.push(`\nServices offered:\n${t.services}`);
    if (t.coverage_area) sections.push(`\nCoverage area:\n${t.coverage_area}`);
    if (t.pricing_notes) sections.push(`\nPricing notes:\n${t.pricing_notes}`);
    sections.push(`\nTone: ${t.tone || "professional"}`);
    if (t.intake_questions) sections.push(`\nWhen collecting new leads ask:\n${t.intake_questions}`);
    if (t.custom_instructions) sections.push(`\nAdditional instructions:\n${t.custom_instructions}`);
  }

  sections.push(`
When taking an action include a JSON block:
<action>{"type": "add_client", "data": {...}}</action>

Available action types:
- add_client: { name, phone, email, notes }
- update_client: { id, fields }
- add_job: { client_id, description, amount, status }
- add_note: { client_id, note }
- add_lead: { name, phone, email, source, notes }
- list_records: { type, filter, limit }
- mark_complete: { record_id, type }

Keep responses short. Be direct.
Current date: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.
Interface: ${source}`);

  return sections.join("\n");
}

function parseAction(response: string): AgentAction | null {
  const match = response.match(/<action>([\s\S]*?)<\/action>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1]);
  } catch {
    return null;
  }
}

function stripActionBlock(response: string): string {
  return response.replace(/<action>[\s\S]*?<\/action>/, "").trim();
}

async function executeAction(clientId: string, action: AgentAction) {
  try {
    switch (action.type) {
      case "add_client":
      case "add_lead":
      case "add_job":
      case "add_note": {
        await supabase.from("client_data").insert({
          client_id: clientId,
          record_type: action.type.replace("add_", ""),
          data: action.data,
          status: "active",
        });
        break;
      }
      case "update_client": {
        const { id, ...fields } = action.data as { id: string; [key: string]: unknown };
        if (id) {
          const { data: existing } = await supabase
            .from("client_data")
            .select("data")
            .eq("id", id)
            .eq("client_id", clientId)
            .single();
          if (existing) {
            await supabase
              .from("client_data")
              .update({ data: { ...existing.data, ...fields } })
              .eq("id", id)
              .eq("client_id", clientId);
          }
        }
        break;
      }
      case "mark_complete": {
        const { record_id } = action.data as { record_id: string };
        if (record_id) {
          await supabase
            .from("client_data")
            .update({ status: "complete" })
            .eq("id", record_id)
            .eq("client_id", clientId);
        }
        break;
      }
      case "list_records": {
        // Read-only — agent already has the response text
        break;
      }
    }
  } catch (err) {
    console.error("[agent] Action execution error:", err);
  }
}

/**
 * Core agent function — handles all messages regardless of source.
 */
export async function runAgent({
  clientId,
  message,
  interface: source,
}: AgentInput): Promise<AgentOutput> {
  // 1. Fetch client + training data
  const client = await getClientWithTraining(clientId);
  if (!client) {
    return {
      response: "I couldn't find your account. Please contact support at martinbuilds.ai/contact.",
      action: null,
    };
  }

  // 2. Check tier gating for Telegram
  if (source === "telegram" && !canUseTelegram(client.tier)) {
    return {
      response: "Telegram access is available on the Professional plan. Upgrade at martinbuilds.ai/utility",
      action: null,
    };
  }

  // 3. Fetch recent history
  const history = await getRecentHistory(clientId, 10);

  // 4. Build system prompt
  const systemPrompt = buildSystemPrompt(client, source);

  // 5. Call Claude API
  const model = getModel(client.tier);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { response: "Agent is temporarily unavailable. Please try again later.", action: null };
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          ...history.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: message },
        ],
      }),
    });

    if (!res.ok) {
      console.error("[agent] Claude API error:", res.status, await res.text());
      return { response: "I'm having trouble right now. Try again in a moment.", action: null };
    }

    const data = await res.json();
    const rawResponse = data.content?.[0]?.text || "I couldn't generate a response.";
    const tokensUsed = (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);

    // 6. Parse action and clean response
    const action = parseAction(rawResponse);
    const cleanResponse = stripActionBlock(rawResponse);

    // 7. Execute action if present
    if (action) {
      await executeAction(clientId, action);
    }

    // 8. Save messages and log usage
    await saveMessages(clientId, message, cleanResponse, source);
    await logUsage(clientId, source, tokensUsed);

    return { response: cleanResponse, action };
  } catch (err) {
    console.error("[agent] Error:", err);
    return { response: "Something went wrong. Please try again.", action: null };
  }
}
