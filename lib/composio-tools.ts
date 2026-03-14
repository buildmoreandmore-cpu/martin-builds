const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY || "ak_icRzYQpAsFuxXVExa4xQ";
const COMPOSIO_BASE = "https://backend.composio.dev/api/v2";

interface ComposioResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

async function composioRequest(
  path: string,
  method: "GET" | "POST" = "GET",
  body?: Record<string, unknown>
): Promise<ComposioResponse> {
  const res = await fetch(`${COMPOSIO_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": COMPOSIO_API_KEY,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Composio API error (${res.status}): ${text}`);
  }

  return res.json();
}

/**
 * List connected tools/integrations for an entity (client).
 */
export async function getConnectedTools(entityId: string): Promise<string[]> {
  try {
    const data = await composioRequest(
      `/connectedAccounts?user_uuid=${encodeURIComponent(entityId)}&showActiveOnly=true`
    );
    const items = data.items || data.results || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((item: any) => item.appName || item.app_name || "unknown");
  } catch (err) {
    console.error("getConnectedTools error:", err);
    return [];
  }
}

/**
 * Execute a Composio action on behalf of a client entity.
 */
export async function executeAction(
  entityId: string,
  actionName: string,
  params: Record<string, unknown> = {}
): Promise<unknown> {
  const data = await composioRequest(
    `/actions/${actionName}/execute`,
    "POST",
    {
      entityId,
      input: params,
    }
  );
  return data.response_data ?? data.data ?? data;
}

/**
 * Generate an OAuth connection URL for a client to connect a new tool.
 */
export async function getConnectionUrl(
  entityId: string,
  appKey: string
): Promise<string> {
  const data = await composioRequest(
    `/connectedAccounts`,
    "POST",
    {
      integrationId: appKey,
      userUuid: entityId,
      redirectUrl: "https://newhyer.com/connect/success",
    }
  );
  return data.redirectUrl || data.connectionUrl || data.url || "";
}

/**
 * Send a WhatsApp message to a client via Composio.
 */
export async function sendWhatsAppMessage(
  entityId: string,
  to: string,
  message: string
): Promise<void> {
  await executeAction(entityId, "WHATSAPP_SEND_MESSAGE", {
    to,
    body: message,
  });
}

/**
 * Fetch recent emails via Composio Gmail integration.
 */
export async function getEmails(
  entityId: string,
  query?: string
): Promise<unknown[]> {
  try {
    const params: Record<string, unknown> = {
      max_results: 10,
    };
    if (query) params.query = query;

    const result = await executeAction(entityId, "GMAIL_LIST_EMAILS", params);
    return Array.isArray(result) ? result : (result as ComposioResponse)?.messages || [];
  } catch (err) {
    console.error("getEmails error:", err);
    return [];
  }
}

/**
 * Fetch calendar events via Composio Google Calendar integration.
 */
export async function getCalendarEvents(
  entityId: string,
  date?: string
): Promise<unknown[]> {
  try {
    const params: Record<string, unknown> = {};
    if (date) {
      params.timeMin = `${date}T00:00:00Z`;
      params.timeMax = `${date}T23:59:59Z`;
    } else {
      const today = new Date().toISOString().split("T")[0];
      params.timeMin = `${today}T00:00:00Z`;
      params.timeMax = `${today}T23:59:59Z`;
    }
    params.maxResults = 20;

    const result = await executeAction(entityId, "GOOGLECALENDAR_LIST_EVENTS", params);
    return Array.isArray(result) ? result : (result as ComposioResponse)?.items || [];
  } catch (err) {
    console.error("getCalendarEvents error:", err);
    return [];
  }
}

/**
 * Create a calendar event via Composio Google Calendar integration.
 */
export async function createCalendarEvent(
  entityId: string,
  event: { summary: string; description?: string; start: string; end: string; location?: string }
): Promise<unknown> {
  return executeAction(entityId, "GOOGLECALENDAR_CREATE_EVENT", {
    summary: event.summary,
    description: event.description || "",
    start_datetime: event.start,
    end_datetime: event.end,
    location: event.location || "",
  });
}
