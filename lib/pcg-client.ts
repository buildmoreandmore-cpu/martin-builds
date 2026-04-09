/**
 * PCG Screening External Agent API client
 * Used by Parker (Telegram bot) to fetch live PCG dashboard data via Claude tool calls.
 *
 * Credentials live in Vercel env vars:
 *   PCG_API_BASE_URL    e.g. https://app.pcgscreening.net/api/agent
 *   PCG_API_KEY         bearer token issued by PCG
 *
 * Future: read per-client overrides from clients table (clients.pcg_api_base_url, etc.)
 * so multiple agent clients can each be wired to their own backend.
 */

const PCG_BASE = (process.env.PCG_API_BASE_URL || "").trim();
const PCG_KEY = (process.env.PCG_API_KEY || "").trim();

async function pcgFetch(path: string): Promise<unknown> {
  if (!PCG_BASE || !PCG_KEY) {
    throw new Error("PCG API not configured");
  }
  const url = `${PCG_BASE}${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${PCG_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`PCG API ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export async function getCandidates(opts: { status?: string; limit?: number; since?: string } = {}) {
  const params = new URLSearchParams();
  if (opts.status) params.set("status", opts.status);
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.since) params.set("since", opts.since);
  const qs = params.toString();
  return pcgFetch(`/candidates${qs ? `?${qs}` : ""}`);
}

export async function getCandidate(id: string) {
  return pcgFetch(`/candidates/${encodeURIComponent(id)}`);
}

export async function getScreenings(opts: { status?: string; limit?: number; since?: string } = {}) {
  const params = new URLSearchParams();
  if (opts.status) params.set("status", opts.status);
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.since) params.set("since", opts.since);
  const qs = params.toString();
  return pcgFetch(`/screenings${qs ? `?${qs}` : ""}`);
}

export async function getClients() {
  return pcgFetch(`/clients`);
}

export async function getStats() {
  return pcgFetch(`/stats`);
}

export async function getRecentActivity(days: number = 7) {
  return pcgFetch(`/recent-activity?days=${days}`);
}

export const PCG_TOOLS = [
  {
    name: "get_stats",
    description: "Get high-level PCG dashboard stats: total candidates, active/pending/completed screenings, counts for this week and this month. Use this for overview questions like 'how busy am I' or 'what's my pipeline look like'.",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "get_candidates",
    description: "List candidates across all PCG employer clients. Filter by status if needed. Use this when the user asks about specific candidates, recent submissions, or candidate counts by status.",
    input_schema: {
      type: "object" as const,
      properties: {
        status: { type: "string", description: "Filter by status (e.g. pending, in_progress, complete, flagged)" },
        limit: { type: "number", description: "Max results, default 20" },
      },
      required: [],
    },
  },
  {
    name: "get_candidate_detail",
    description: "Get full details for a single candidate by id. Use only after the user asks about a specific candidate by name or id.",
    input_schema: {
      type: "object" as const,
      properties: {
        id: { type: "string", description: "Candidate id" },
      },
      required: ["id"],
    },
  },
  {
    name: "get_screenings",
    description: "List screenings across all PCG employer clients. Filter by status. Use for questions about background checks, screening status, completions.",
    input_schema: {
      type: "object" as const,
      properties: {
        status: { type: "string", description: "Filter by status (e.g. pending, in_progress, complete, flagged)" },
        limit: { type: "number", description: "Max results, default 20" },
      },
      required: [],
    },
  },
  {
    name: "get_employer_clients",
    description: "List PCG's employer clients (the businesses that hire PCG to run screenings). Use when user asks 'who are my clients' or about specific employer accounts.",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "get_recent_activity",
    description: "Get recent activity feed: new submissions, status changes, completions. Use for 'what's new', 'what happened today', 'recent activity' questions.",
    input_schema: {
      type: "object" as const,
      properties: {
        days: { type: "number", description: "Look back this many days, default 7" },
      },
      required: [],
    },
  },
];

export async function executePcgTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case "get_stats":
      return getStats();
    case "get_candidates":
      return getCandidates(input as { status?: string; limit?: number });
    case "get_candidate_detail":
      return getCandidate(String(input.id));
    case "get_screenings":
      return getScreenings(input as { status?: string; limit?: number });
    case "get_employer_clients":
      return getClients();
    case "get_recent_activity":
      return getRecentActivity(typeof input.days === "number" ? input.days : 7);
    default:
      throw new Error(`Unknown PCG tool: ${name}`);
  }
}
