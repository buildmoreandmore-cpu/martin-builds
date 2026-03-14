/**
 * WhatsApp Agent Brain — processes client messages via MiniMax
 * and executes Composio tool actions as needed.
 */

import { chatCompletion } from "./minimax";
import { getClientByPhone, type WhatsAppClient } from "./clients";
import {
  getConnectedTools,
  getEmails,
  getCalendarEvents,
  createCalendarEvent,
  getConnectionUrl,
  sendWhatsAppMessage,
} from "./composio-tools";
import { loadWidgetChats } from "./widget-store";

function buildSystemPrompt(client: WhatsAppClient, connectedTools: string[]): string {
  const toolsList = connectedTools.length > 0
    ? connectedTools.join(", ")
    : "None connected yet";

  return `You are an AI assistant for ${client.businessName}, a ${client.industry} business. You communicate with the business owner via WhatsApp.

Your connected tools: ${toolsList}

You can:
- Check and summarize emails
- Manage calendar and appointments
- Report on website chat activity
- Help with any business questions
- Connect new tools when asked

Be concise — this is WhatsApp, not email. Short, clear messages. Use line breaks for readability. No markdown formatting.

If asked to do something you can't (tool not connected), offer to send them a link to connect it.

IMPORTANT: When you need to perform an action, respond with a JSON action block on its own line:
{"action": "check_emails", "query": "optional search query"}
{"action": "check_calendar", "date": "YYYY-MM-DD"}
{"action": "create_event", "summary": "...", "start": "ISO datetime", "end": "ISO datetime"}
{"action": "connect_tool", "app": "tool_name"}
{"action": "check_widget_chats"}

After receiving action results, summarize them conversationally for the client.`;
}

/**
 * Parse action blocks from the AI response.
 */
function parseActions(response: string): { action: string; [key: string]: unknown }[] {
  const actions: { action: string; [key: string]: unknown }[] = [];
  const lines = response.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("{") && trimmed.includes('"action"')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.action) actions.push(parsed);
      } catch {
        // not valid JSON, skip
      }
    }
  }
  return actions;
}

/**
 * Remove action JSON blocks from the response text.
 */
function cleanResponse(response: string): string {
  return response
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("{") && trimmed.includes('"action"')) {
        try {
          JSON.parse(trimmed);
          return false; // remove action lines
        } catch {
          return true;
        }
      }
      return true;
    })
    .join("\n")
    .trim();
}

/**
 * Execute detected actions and return results.
 */
async function executeActions(
  actions: { action: string; [key: string]: unknown }[],
  entityId: string,
  client: WhatsAppClient
): Promise<string[]> {
  const results: string[] = [];

  for (const act of actions) {
    try {
      switch (act.action) {
        case "check_emails": {
          const emails = await getEmails(entityId, act.query as string | undefined);
          results.push(`Email results: ${JSON.stringify(emails).slice(0, 2000)}`);
          break;
        }
        case "check_calendar": {
          const events = await getCalendarEvents(entityId, act.date as string | undefined);
          results.push(`Calendar events: ${JSON.stringify(events).slice(0, 2000)}`);
          break;
        }
        case "create_event": {
          const event = await createCalendarEvent(entityId, {
            summary: act.summary as string,
            start: act.start as string,
            end: act.end as string,
            description: act.description as string | undefined,
            location: act.location as string | undefined,
          });
          results.push(`Event created: ${JSON.stringify(event).slice(0, 500)}`);
          break;
        }
        case "connect_tool": {
          const url = await getConnectionUrl(entityId, act.app as string);
          results.push(`Connection URL for ${act.app}: ${url}`);
          break;
        }
        case "check_widget_chats": {
          const chats = await loadWidgetChats(client.email);
          const recent = chats.slice(-20);
          results.push(`Recent widget chats: ${JSON.stringify(recent).slice(0, 2000)}`);
          break;
        }
        default:
          results.push(`Unknown action: ${act.action}`);
      }
    } catch (err) {
      console.error(`Action ${act.action} error:`, err);
      results.push(`Error executing ${act.action}: ${(err as Error).message}`);
    }
  }

  return results;
}

/**
 * Main handler: process an incoming WhatsApp message.
 */
export async function handleWhatsAppMessage(
  phone: string,
  messageBody: string
): Promise<string> {
  const client = await getClientByPhone(phone);
  if (!client) {
    return "Hey! It looks like you don't have an active NewHyer agent yet. Visit newhyer.com to get started.";
  }

  const entityId = client.email;
  const connectedTools = await getConnectedTools(entityId);

  const systemPrompt = buildSystemPrompt(client, connectedTools);

  try {
    // First pass: let the AI decide what to do
    const firstResponse = await chatCompletion(
      [{ role: "user", content: messageBody }],
      systemPrompt
    );

    const actions = parseActions(firstResponse.content);
    let textResponse = cleanResponse(firstResponse.content);

    // If the AI requested actions, execute them and do a second pass
    if (actions.length > 0) {
      const actionResults = await executeActions(actions, entityId, client);

      const secondResponse = await chatCompletion(
        [
          { role: "user", content: messageBody },
          { role: "assistant", content: firstResponse.content },
          {
            role: "user",
            content: `Here are the results from the actions you requested:\n\n${actionResults.join("\n\n")}\n\nNow summarize these results conversationally for the business owner. Be concise — this is WhatsApp.`,
          },
        ],
        systemPrompt
      );

      textResponse = cleanResponse(secondResponse.content);
    }

    // If response is empty after cleaning, use a fallback
    if (!textResponse) {
      textResponse = "Let me look into that for you. One moment...";
    }

    return textResponse;
  } catch (err) {
    console.error("WhatsApp agent brain error:", err);
    return "I'm having a bit of trouble right now. Give me a moment and try again!";
  }
}

/**
 * Send a response back to the client via WhatsApp.
 */
export async function sendResponse(
  entityId: string,
  phone: string,
  message: string
): Promise<void> {
  await sendWhatsAppMessage(entityId, phone, message);
}
