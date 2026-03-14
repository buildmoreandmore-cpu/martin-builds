import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const FUNNEL_PATH = path.join(process.cwd(), "data", "funnel.json");

export interface FunnelEntry {
  name: string;
  businessName: string;
  industry: string;
  slug: string;
  ctaHitAt: string;
  emailsSent: number[];
  surveyCompleted: boolean;
  surveyAnswers: Record<string, string>;
  createdAt: string;
}

type FunnelData = Record<string, FunnelEntry>;

function readFunnel(): FunnelData {
  const dir = path.dirname(FUNNEL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(FUNNEL_PATH)) return {};
  try {
    return JSON.parse(readFileSync(FUNNEL_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeFunnel(data: FunnelData) {
  const dir = path.dirname(FUNNEL_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(FUNNEL_PATH, JSON.stringify(data, null, 2));
}

export function addToFunnel(data: { email: string; name: string; businessName: string; industry: string; slug: string }) {
  const funnel = readFunnel();
  if (funnel[data.email]) {
    // Update existing entry with CTA hit
    funnel[data.email].ctaHitAt = new Date().toISOString();
    funnel[data.email].slug = data.slug || funnel[data.email].slug;
  } else {
    funnel[data.email] = {
      name: data.name,
      businessName: data.businessName,
      industry: data.industry,
      slug: data.slug,
      ctaHitAt: new Date().toISOString(),
      emailsSent: [],
      surveyCompleted: false,
      surveyAnswers: {},
      createdAt: new Date().toISOString(),
    };
  }
  writeFunnel(funnel);
  return funnel[data.email];
}

export function getFunnelEntry(email: string): FunnelEntry | null {
  const funnel = readFunnel();
  return funnel[email] || null;
}

export function updateFunnelEntry(email: string, data: Partial<FunnelEntry>) {
  const funnel = readFunnel();
  if (!funnel[email]) return null;
  funnel[email] = { ...funnel[email], ...data };
  writeFunnel(funnel);
  return funnel[email];
}

export function getEntriesDueForEmail(dayNumber: number): { email: string; entry: FunnelEntry }[] {
  const funnel = readFunnel();
  const now = Date.now();
  const results: { email: string; entry: FunnelEntry }[] = [];

  for (const [email, entry] of Object.entries(funnel)) {
    if (!entry.ctaHitAt) continue;
    const daysSince = (now - new Date(entry.ctaHitAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince >= dayNumber && !entry.emailsSent.includes(dayNumber)) {
      results.push({ email, entry });
    }
  }
  return results;
}

export function getAllEntries(): FunnelData {
  return readFunnel();
}
