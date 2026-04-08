/**
 * Widget Chat API — handles messages from the embeddable web widget.
 * POST { embed_key, message }
 */

import { NextRequest, NextResponse } from "next/server";
import { identifyByEmbedKey } from "@/lib/middleware/identify";
import { runAgent } from "@/lib/agent";

export async function POST(req: NextRequest) {
  try {
    const { embed_key, message } = await req.json();

    if (!embed_key || !message) {
      return NextResponse.json(
        { error: "Missing embed_key or message" },
        { status: 400 }
      );
    }

    const client = await identifyByEmbedKey(embed_key);
    if (!client) {
      return NextResponse.json({ error: "Invalid embed key" }, { status: 401 });
    }

    if (!client.is_active) {
      return NextResponse.json(
        { error: "Agent is currently paused. Contact support." },
        { status: 403 }
      );
    }

    const result = await runAgent({
      clientId: client.id,
      message,
      interface: "widget",
    });

    return NextResponse.json({ response: result.response });
  } catch (err) {
    console.error("[widget/chat] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
