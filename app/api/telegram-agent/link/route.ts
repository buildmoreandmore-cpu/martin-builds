/**
 * Generate a Telegram linking code for a client.
 * POST { email: "client@example.com" }
 */

import { NextRequest, NextResponse } from "next/server";
import { generateLinkingCode } from "@/lib/clients";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const code = await generateLinkingCode(email);
    if (!code) return NextResponse.json({ error: "Client not found" }, { status: 404 });

    return NextResponse.json({ code });
  } catch (err) {
    console.error("[Link] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
