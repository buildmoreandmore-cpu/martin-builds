import { NextResponse } from "next/server";

const COMPOSIO_API_KEY = process.env.COMPOSIO_API_KEY || "";
const COMPOSIO_BASE = "https://backend.composio.dev/api/v1";

const VALID_APPS = [
  "whatsapp", "gmail", "googlecalendar", "slack", "googlesheets",
  "googledrive", "hubspot", "salesforce", "shopify", "quickbooks",
];

async function getIntegrationId(appName: string): Promise<string> {
  const res = await fetch(`${COMPOSIO_BASE}/integrations?appName=${appName}`, {
    headers: { "x-api-key": COMPOSIO_API_KEY },
  });
  const data = await res.json();
  const items = data.items || data;
  if (Array.isArray(items) && items.length > 0) {
    return items[0].id;
  }
  throw new Error(`No integration found for ${appName}`);
}

export async function POST(req: Request) {
  try {
    const { app, clientEmail } = await req.json();

    if (!app || !VALID_APPS.includes(app)) {
      return NextResponse.json({ error: "Invalid app" }, { status: 400 });
    }
    if (!clientEmail) {
      return NextResponse.json({ error: "Missing clientEmail" }, { status: 400 });
    }

    const integrationId = await getIntegrationId(app);
    const redirectUri = `https://martinbuilds.ai/connect?email=${encodeURIComponent(clientEmail)}&connected=${app}`;

    const res = await fetch(`${COMPOSIO_BASE}/connectedAccounts`, {
      method: "POST",
      headers: {
        "x-api-key": COMPOSIO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        integrationId,
        redirectUri,
        entityId: clientEmail,
      }),
    });

    const data = await res.json();

    if (data.redirectUrl) {
      return NextResponse.json({
        redirectUrl: data.redirectUrl,
        connectedAccountId: data.id || data.connectedAccountId,
      });
    }

    return NextResponse.json({ error: "Failed to create connection", details: data }, { status: 500 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[Connect] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
