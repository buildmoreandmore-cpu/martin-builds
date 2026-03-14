/**
 * Client Registry — JSON file-based for MVP.
 * Maps WhatsApp phone numbers to client profiles.
 * Will move to DB later.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const CLIENTS_FILE = path.join(DATA_DIR, "clients.json");

export interface WhatsAppClient {
  email: string;
  name: string;
  phone: string;
  businessName: string;
  industry: string;
  plan: string;
  connectedTools: string[];
  createdAt: string;
  telegramChatId?: string;
  linkingCode?: string;
}

type ClientsMap = Record<string, WhatsAppClient>;

async function ensureDataDir(): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
    // already exists
  }
}

async function loadClients(): Promise<ClientsMap> {
  try {
    const raw = await readFile(CLIENTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveClients(clients: ClientsMap): Promise<void> {
  await ensureDataDir();
  await writeFile(CLIENTS_FILE, JSON.stringify(clients, null, 2));
}

/**
 * Normalize phone: strip spaces, dashes, ensure + prefix.
 */
function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

export async function getClientByPhone(phone: string): Promise<WhatsAppClient | null> {
  const clients = await loadClients();
  return clients[normalizePhone(phone)] || null;
}

export async function getClientByEmail(email: string): Promise<WhatsAppClient | null> {
  const clients = await loadClients();
  const normalized = email.toLowerCase();
  for (const client of Object.values(clients)) {
    if (client.email.toLowerCase() === normalized) return client;
  }
  return null;
}

export async function registerClient(data: {
  email: string;
  name: string;
  phone: string;
  businessName: string;
  industry: string;
  plan?: string;
}): Promise<WhatsAppClient> {
  const clients = await loadClients();
  const phone = normalizePhone(data.phone);

  const client: WhatsAppClient = {
    email: data.email,
    name: data.name,
    phone,
    businessName: data.businessName,
    industry: data.industry,
    plan: data.plan || "starter",
    connectedTools: [],
    createdAt: new Date().toISOString(),
  };

  clients[phone] = client;
  await saveClients(clients);
  return client;
}

export async function getClientByTelegramId(chatId: string): Promise<WhatsAppClient | null> {
  const clients = await loadClients();
  for (const client of Object.values(clients)) {
    if (client.telegramChatId === chatId) return client;
  }
  return null;
}

export async function linkTelegram(code: string, chatId: string): Promise<WhatsAppClient | null> {
  const clients = await loadClients();
  for (const [phone, client] of Object.entries(clients)) {
    if (client.linkingCode === code) {
      clients[phone] = { ...client, telegramChatId: chatId, linkingCode: undefined };
      await saveClients(clients);
      return clients[phone];
    }
  }
  return null;
}

export async function generateLinkingCode(email: string): Promise<string | null> {
  const clients = await loadClients();
  const normalized = email.toLowerCase();
  for (const [phone, client] of Object.entries(clients)) {
    if (client.email.toLowerCase() === normalized) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      clients[phone] = { ...client, linkingCode: code };
      await saveClients(clients);
      return code;
    }
  }
  return null;
}

export async function updateClient(
  email: string,
  updates: Partial<WhatsAppClient>
): Promise<WhatsAppClient | null> {
  const clients = await loadClients();
  const normalized = email.toLowerCase();

  for (const [phone, client] of Object.entries(clients)) {
    if (client.email.toLowerCase() === normalized) {
      clients[phone] = { ...client, ...updates };
      await saveClients(clients);
      return clients[phone];
    }
  }
  return null;
}
