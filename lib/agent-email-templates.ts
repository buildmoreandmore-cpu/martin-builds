/**
 * Branded email templates for AI agent lifecycle:
 * - Welcome / onboarding after purchase
 * - Weekly usage summary
 */

interface WelcomeEmailData {
  name: string;
  botName: string;
  businessName: string;
  telegramLink: string;
  connectInstructions: string;
}

export function buildAgentWelcomeEmail(data: WelcomeEmailData): string {
  const { name, botName, businessName, telegramLink, connectInstructions } = data;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<div style="margin-bottom:24px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">AI Agent for ${businessName}</p>
</div>

<div style="height:1px;background:#222;margin-bottom:28px;"></div>

<h2 style="font-size:24px;font-weight:700;color:#f5f5f0;margin:0 0 8px 0;letter-spacing:-0.5px;">${botName} is ready, ${name}.</h2>
<p style="color:#ccc;font-size:15px;line-height:1.7;margin:0 0 24px 0;">Your AI agent is set up and waiting for you. Here's how to get started in 60 seconds.</p>

<!-- Step 1: Connect -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:16px;">
<h3 style="font-size:13px;color:#c8ff00;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">Step 1 — Connect</h3>
<p style="color:#ccc;font-size:14px;line-height:1.6;margin:0 0 16px 0;">${connectInstructions}</p>
<a href="${telegramLink}" style="display:inline-block;padding:12px 28px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:8px;text-decoration:none;">Open ${botName} on Telegram</a>
</div>

<!-- Step 2: Try these -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:16px;">
<h3 style="font-size:13px;color:#c8ff00;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">Step 2 — Try These Right Now</h3>
<p style="color:#888;font-size:13px;margin:0 0 12px 0;">Copy and paste any of these into your agent:</p>
<table style="width:100%;border-collapse:collapse;">
<tr>
<td style="padding:8px 0;border-bottom:1px solid #222;color:#f5f5f0;font-size:14px;font-family:monospace;">"Check my emails"</td>
</tr>
<tr>
<td style="padding:8px 0;border-bottom:1px solid #222;color:#f5f5f0;font-size:14px;font-family:monospace;">"What's on my calendar today?"</td>
</tr>
<tr>
<td style="padding:8px 0;border-bottom:1px solid #222;color:#f5f5f0;font-size:14px;font-family:monospace;">"Schedule a meeting for tomorrow at 2pm"</td>
</tr>
<tr>
<td style="padding:8px 0;border-bottom:1px solid #222;color:#f5f5f0;font-size:14px;font-family:monospace;">"Draft a reply to the last email from [name]"</td>
</tr>
<tr>
<td style="padding:8px 0;color:#f5f5f0;font-size:14px;font-family:monospace;">"What can you do?"</td>
</tr>
</table>
</div>

<!-- Step 3: Connect tools -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:24px;">
<h3 style="font-size:13px;color:#c8ff00;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">Step 3 — Connect Your Tools</h3>
<p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">Tell your agent <strong style="color:#f5f5f0;">"Connect my Gmail"</strong> or <strong style="color:#f5f5f0;">"Connect my calendar"</strong> and it will send you a secure link to authorize access. The more tools you connect, the more your agent can do.</p>
</div>

<div style="background:rgba(200,255,0,0.06);border:1px solid rgba(200,255,0,0.15);border-radius:12px;padding:16px 20px;margin-bottom:24px;text-align:center;">
<p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">
<strong style="color:#c8ff00;">Pro tip:</strong> The more you use your agent, the better it gets at understanding how you work. Start with one task a day — checking emails is the easiest first step.
</p>
</div>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 24px 0;">Questions? Just reply to this email — I read every one.<br/><strong style="color:#f5f5f0;">— Martin</strong></p>

<div style="height:1px;background:#222;margin-bottom:20px;"></div>
<p style="color:#666;font-size:12px;text-align:center;margin:0;"><a href="https://martinbuilds.ai" style="color:#c8ff00;text-decoration:none;">martinbuilds.ai</a></p>
</div></body></html>`;
}

interface WeeklySummaryData {
  name: string;
  botName: string;
  businessName: string;
  messageCount: number;
  topActions: string[];
  telegramLink: string;
}

export function buildWeeklySummaryEmail(data: WeeklySummaryData): string {
  const { name, botName, businessName, messageCount, topActions, telegramLink } = data;

  const actionRows = topActions.length > 0
    ? topActions.map(a => `<tr><td style="padding:6px 0;border-bottom:1px solid #222;color:#ccc;font-size:14px;">• ${a}</td></tr>`).join("")
    : `<tr><td style="padding:6px 0;color:#888;font-size:14px;">No activity this week — try messaging your agent!</td></tr>`;

  const engagement = messageCount === 0
    ? `You haven't used ${botName} this week. Even one message a day can save you hours — try asking <strong style="color:#f5f5f0;">"Check my emails"</strong> tomorrow morning.`
    : messageCount < 5
      ? `You sent ${messageCount} messages this week. You're getting started — try connecting more tools to unlock more capabilities.`
      : `You sent ${messageCount} messages this week. ${botName} is becoming part of your workflow — nice.`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<div style="margin-bottom:24px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">Weekly Agent Report — ${businessName}</p>
</div>

<div style="height:1px;background:#222;margin-bottom:28px;"></div>

<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 16px 0;letter-spacing:-0.5px;">Your week with ${botName}</h2>

<div style="display:flex;gap:16px;margin-bottom:24px;">
<div style="flex:1;background:#111;border-radius:12px;padding:20px;text-align:center;">
<div style="font-size:2.5rem;font-weight:800;color:#c8ff00;">${messageCount}</div>
<div style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-top:4px;">Messages</div>
</div>
</div>

<p style="color:#ccc;font-size:14px;line-height:1.7;margin:0 0 20px 0;">${engagement}</p>

<div style="background:#111;border:1px solid #222;border-radius:12px;padding:20px;margin-bottom:24px;">
<h3 style="font-size:13px;color:#c8ff00;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:1px;">This Week's Activity</h3>
<table style="width:100%;border-collapse:collapse;">
${actionRows}
</table>
</div>

<div style="text-align:center;margin-bottom:24px;">
<a href="${telegramLink}" style="display:inline-block;padding:12px 28px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:8px;text-decoration:none;">Message ${botName}</a>
</div>

<p style="color:#888;font-size:14px;line-height:1.7;margin:0 0 24px 0;">— Martin</p>

<div style="height:1px;background:#222;margin-bottom:20px;"></div>
<p style="color:#666;font-size:12px;text-align:center;margin:0;"><a href="https://martinbuilds.ai" style="color:#c8ff00;text-decoration:none;">martinbuilds.ai</a></p>
</div></body></html>`;
}
