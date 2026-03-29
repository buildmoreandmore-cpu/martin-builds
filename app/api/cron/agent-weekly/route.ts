/**
 * Weekly agent summary cron — sends each active client a usage recap email.
 * Trigger via Vercel Cron or external scheduler (Sunday 8pm ET).
 */

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/send-email";
import { buildWeeklySummaryEmail } from "@/lib/agent-email-templates";

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get all active clients with agents
    const { data: clients } = await supabase
      .from("clients")
      .select("id, email, name, business_name, bot_name, bot_username, active")
      .eq("active", true);

    if (!clients || clients.length === 0) {
      return NextResponse.json({ sent: 0 });
    }

    let sent = 0;
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    for (const client of clients) {
      try {
        // Count messages this week
        const { count: messageCount } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("client_id", client.id)
          .gte("created_at", sevenDaysAgo);

        // Get recent messages for activity summary
        const { data: recentMessages } = await supabase
          .from("messages")
          .select("role, content")
          .eq("client_id", client.id)
          .eq("role", "user")
          .gte("created_at", sevenDaysAgo)
          .order("created_at", { ascending: false })
          .limit(10);

        // Extract top actions from user messages
        const topActions: string[] = [];
        const actionPatterns = [
          { pattern: /email/i, label: "Checked emails" },
          { pattern: /calendar|schedule|meeting/i, label: "Managed calendar" },
          { pattern: /connect/i, label: "Connected tools" },
          { pattern: /widget|chat/i, label: "Monitored website chats" },
        ];

        for (const { pattern, label } of actionPatterns) {
          if (recentMessages?.some((m: { role: string; content: string }) => pattern.test(m.content))) {
            topActions.push(label);
          }
        }

        const telegramLink = client.bot_username
          ? `https://t.me/${client.bot_username}`
          : "https://t.me/Martinbuilds_bot";

        const botName = client.bot_name || client.business_name + " Agent";

        await sendEmail({
          to: client.email,
          subject: `Your week with ${botName} — ${messageCount || 0} messages`,
          body: buildWeeklySummaryEmail({
            name: client.name || "there",
            botName,
            businessName: client.business_name,
            messageCount: messageCount || 0,
            topActions,
            telegramLink,
          }),
          isHtml: true,
        });

        sent++;
      } catch (err) {
        console.error(`[Weekly summary failed for ${client.email}]`, err);
      }
    }

    return NextResponse.json({ sent, total: clients.length });
  } catch (err) {
    console.error("[Weekly cron error]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
