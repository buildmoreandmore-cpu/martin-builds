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

async function pcgFetch(path: string, options?: { method?: string; body?: unknown }): Promise<unknown> {
  if (!PCG_BASE || !PCG_KEY) {
    throw new Error("PCG API not configured");
  }
  const url = `${PCG_BASE}${path}`;
  const res = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      Authorization: `Bearer ${PCG_KEY}`,
      ...(options?.body ? { "Content-Type": "application/json" } : {}),
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
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

// ─── Write Operations ───

export async function createCandidate(data: {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  employer_client_id?: string;
  position?: string;
  notes?: string;
}) {
  return pcgFetch("/candidates", { method: "POST", body: data });
}

export async function updateCandidate(id: string, data: {
  status?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  position?: string;
  notes?: string;
}) {
  return pcgFetch(`/candidates/${encodeURIComponent(id)}`, { method: "PATCH", body: data });
}

export async function updateScreening(id: string, data: {
  status?: string;
  notes?: string;
}) {
  return pcgFetch(`/screenings/${encodeURIComponent(id)}`, { method: "PATCH", body: data });
}

export async function createSupportTicket(data: {
  title: string;
  description: string;
  priority?: string;
  reported_by?: string;
}) {
  return pcgFetch("/support-tickets", { method: "POST", body: data });
}

export async function getSupportTickets(status?: string) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : "";
  return pcgFetch(`/support-tickets${qs}`);
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
  {
    name: "create_candidate",
    description: "Create a new candidate in the PCG system. Use when Gwen asks to add a new candidate for screening.",
    input_schema: {
      type: "object" as const,
      properties: {
        first_name: { type: "string", description: "Candidate first name" },
        last_name: { type: "string", description: "Candidate last name" },
        email: { type: "string", description: "Candidate email address" },
        phone: { type: "string", description: "Candidate phone number" },
        employer_client_id: { type: "string", description: "ID of the employer client requesting the screening" },
        position: { type: "string", description: "Position the candidate is applying for" },
        notes: { type: "string", description: "Any notes about the candidate" },
      },
      required: ["first_name", "last_name"],
    },
  },
  {
    name: "update_candidate",
    description: "Update a candidate's status or details. Use when Gwen asks to change a candidate's status (e.g. to 'in_progress', 'complete', 'flagged') or update their info.",
    input_schema: {
      type: "object" as const,
      properties: {
        id: { type: "string", description: "Candidate ID to update" },
        status: { type: "string", description: "New status (e.g. pending, in_progress, complete, flagged, withdrawn)" },
        first_name: { type: "string", description: "Updated first name" },
        last_name: { type: "string", description: "Updated last name" },
        email: { type: "string", description: "Updated email" },
        phone: { type: "string", description: "Updated phone" },
        position: { type: "string", description: "Updated position" },
        notes: { type: "string", description: "Updated notes" },
      },
      required: ["id"],
    },
  },
  {
    name: "update_screening",
    description: "Update a screening's status or add notes. Use when Gwen asks to change a screening status (e.g. mark as complete, flag an issue).",
    input_schema: {
      type: "object" as const,
      properties: {
        id: { type: "string", description: "Screening ID to update" },
        status: { type: "string", description: "New status (e.g. pending, in_progress, complete, flagged)" },
        notes: { type: "string", description: "Notes about the screening update" },
      },
      required: ["id"],
    },
  },
  {
    name: "create_support_ticket",
    description: "Log a bug report or issue. Use when Gwen reports a problem, bug, or requests a feature. Always confirm the details before creating.",
    input_schema: {
      type: "object" as const,
      properties: {
        title: { type: "string", description: "Short title describing the issue" },
        description: { type: "string", description: "Detailed description of the bug, issue, or feature request" },
        priority: { type: "string", description: "Priority level: low, medium, high, critical. Default medium." },
        reported_by: { type: "string", description: "Name of the person reporting, default Gwen" },
      },
      required: ["title", "description"],
    },
  },
  {
    name: "get_support_tickets",
    description: "List support tickets. Use when Gwen asks about open tickets, bug status, or reported issues.",
    input_schema: {
      type: "object" as const,
      properties: {
        status: { type: "string", description: "Filter by status: open, in_progress, resolved, closed" },
      },
      required: [],
    },
  },
];

/**
 * Sync a message to PCG's shared conversation store so Patrick
 * (admin panel) sees Telegram messages and vice versa.
 */
export async function syncMessageToPcg(
  role: "user" | "assistant",
  content: string,
  source: string,
  senderName?: string
) {
  if (!PCG_BASE || !PCG_KEY) return;
  try {
    await fetch(`${PCG_BASE}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PCG_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        content,
        source,
        sender_name: senderName || undefined,
        thread_id: "pcg-admin",
      }),
    });
  } catch (e) {
    console.error("[PCG Sync] Failed to sync message:", e);
  }
}

/**
 * Load recent messages from PCG's conversation store so Parker
 * has context from Patrick (admin panel) conversations.
 */
export async function loadPcgHistory(limit: number = 20): Promise<{ role: "user" | "assistant"; content: string }[]> {
  if (!PCG_BASE || !PCG_KEY) return [];
  try {
    const res = await fetch(`${PCG_BASE}/messages?thread_id=pcg-admin&limit=${limit}`, {
      headers: { Authorization: `Bearer ${PCG_KEY}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const messages = Array.isArray(data) ? data : data.messages || [];
    return messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
  } catch {
    return [];
  }
}

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
    case "create_candidate":
      return createCandidate(input as { first_name: string; last_name: string; email?: string; phone?: string; employer_client_id?: string; position?: string; notes?: string });
    case "update_candidate":
      return updateCandidate(String(input.id), input as { status?: string; first_name?: string; last_name?: string; email?: string; phone?: string; position?: string; notes?: string });
    case "update_screening":
      return updateScreening(String(input.id), input as { status?: string; notes?: string });
    case "create_support_ticket":
      return createSupportTicket(input as { title: string; description: string; priority?: string; reported_by?: string });
    case "get_support_tickets":
      return getSupportTickets(input.status as string | undefined);
    default:
      throw new Error(`Unknown PCG tool: ${name}`);
  }
}
