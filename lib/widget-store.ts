/**
 * Widget Chat Storage — stores widget conversations as JSON files per client.
 */

import { readFile, writeFile, mkdir, readdir } from "fs/promises";
import path from "path";

const WIDGET_DIR = path.join(process.cwd(), "data", "widget-chats");

export interface WidgetMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

async function ensureDir(): Promise<void> {
  try {
    await mkdir(WIDGET_DIR, { recursive: true });
  } catch {
    // exists
  }
}

function clientFile(clientId: string): string {
  const safe = clientId.replace(/[^a-zA-Z0-9_@.\-]/g, "_");
  return path.join(WIDGET_DIR, `${safe}.json`);
}

export async function loadWidgetChats(clientId: string): Promise<WidgetMessage[]> {
  try {
    const raw = await readFile(clientFile(clientId), "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveWidgetMessage(
  clientId: string,
  userMessage: string,
  assistantReply: string
): Promise<void> {
  await ensureDir();
  const chats = await loadWidgetChats(clientId);
  const now = new Date().toISOString();
  chats.push(
    { role: "user", content: userMessage, timestamp: now },
    { role: "assistant", content: assistantReply, timestamp: now }
  );
  await writeFile(clientFile(clientId), JSON.stringify(chats, null, 2));
}

/**
 * Get recent widget chats for a client within the last N hours (default 24).
 */
export async function getRecentChats(
  clientId: string,
  hours: number = 24
): Promise<WidgetMessage[]> {
  const chats = await loadWidgetChats(clientId);
  const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  return chats.filter((msg) => msg.timestamp >= cutoff);
}

/**
 * Get a summary of widget chat activity for a client.
 */
export async function getChatSummary(
  clientId: string
): Promise<{
  totalChatsToday: number;
  totalMessagesToday: number;
  recentUserMessages: string[];
}> {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  const cutoff = todayStart.toISOString();

  const chats = await loadWidgetChats(clientId);
  const todayMessages = chats.filter((msg) => msg.timestamp >= cutoff);
  const userMessages = todayMessages.filter((msg) => msg.role === "user");

  // Count "conversations" as groups of user messages (each user msg = 1 chat interaction)
  return {
    totalChatsToday: userMessages.length,
    totalMessagesToday: todayMessages.length,
    recentUserMessages: userMessages.slice(-20).map((m) => m.content),
  };
}
