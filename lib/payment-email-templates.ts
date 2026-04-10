type PaymentEmailType =
  | "full"
  | "deposit"
  | "final"
  | "installment"
  | "installment_complete";

interface ThankYouEmailData {
  type: PaymentEmailType;
  clientName: string;
  projectName: string;
  amount: number; // cents
  totalAmount?: number; // cents
  installmentNumber?: number;
  totalInstallments?: number;
}

const CONTENT: Record<
  PaymentEmailType,
  {
    headline: (name: string) => string;
    subject: (project: string) => string;
    steps: string[];
    closingLine: string;
  }
> = {
  full: {
    headline: (name) => `Thanks, ${name} &mdash; we&rsquo;re building.`,
    subject: (project) => `Payment Confirmed: ${project}`,
    steps: [
      "Project kickoff starts today",
      "You'll receive progress updates throughout the build",
      "Delivery on schedule &mdash; I'll keep you posted",
    ],
    closingLine:
      "I'm excited to bring this to life. You'll hear from me soon with the first update.",
  },
  deposit: {
    headline: (name) => `Deposit received &mdash; let&rsquo;s go, ${name}.`,
    subject: (project) => `Deposit Received: ${project}`,
    steps: [
      "Project kickoff begins now",
      "Build + progress updates along the way",
      "Review together when it's ready",
      "Final payment to wrap up and deliver",
    ],
    closingLine:
      "Your project is officially in motion. I'll reach out shortly with next steps.",
  },
  final: {
    headline: (name) => `All paid &mdash; project complete, ${name}.`,
    subject: (project) => `All Paid: ${project}`,
    steps: [
      "Final delivery incoming &mdash; check your inbox",
      "All project files and assets included",
      "30-day support window for any tweaks",
    ],
    closingLine:
      "It's been great building this with you. Don't hesitate to reach out if anything comes up.",
  },
  installment: {
    headline: (name) => `Payment received, ${name}.`,
    subject: (project) => `Installment Received: ${project}`,
    steps: [
      "Card on file &mdash; next month charges automatically",
      "You&rsquo;ll get a receipt each month the payment clears",
      "Project stays in motion while payments come in",
    ],
    closingLine:
      "Thanks for the payment. Autopay is active &mdash; no action needed until next month.",
  },
  installment_complete: {
    headline: (name) => `All payments received &mdash; paid in full, ${name}.`,
    subject: (project) => `Paid In Full: ${project}`,
    steps: [
      "Final installment cleared &mdash; project is fully paid",
      "No further charges will be made",
      "Full ownership &mdash; everything is yours",
    ],
    closingLine:
      "That&rsquo;s the last payment. It&rsquo;s been great building this with you &mdash; reach out anytime.",
  },
};

export function getThankYouSubject(
  type: PaymentEmailType,
  projectName: string
): string {
  return CONTENT[type].subject(projectName);
}

export function buildThankYouEmail(data: ThankYouEmailData): string {
  const { type, clientName, projectName, amount, totalAmount, installmentNumber, totalInstallments } = data;
  const c = CONTENT[type];
  const dollars = (amount / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let totalLine = "";
  if (type === "installment" && installmentNumber && totalInstallments) {
    const remaining = totalInstallments - installmentNumber;
    const remainingLine =
      remaining > 0
        ? `<p style="color:#888;font-size:13px;margin:4px 0 0 0;">${remaining} payment${remaining === 1 ? "" : "s"} remaining</p>`
        : "";
    totalLine =
      `<p style="color:#888;font-size:13px;margin:8px 0 0 0;">Payment ${installmentNumber} of ${totalInstallments}${totalAmount ? ` &middot; Total project: $${(totalAmount / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</p>` +
      remainingLine;
  } else if (totalAmount && type !== "full") {
    totalLine = `<p style="color:#888;font-size:13px;margin:8px 0 0 0;">Total project: $${(totalAmount / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;
  }

  const typeBadge =
    type === "full"
      ? "Paid in Full"
      : type === "deposit"
        ? "Deposit (50%)"
        : type === "final"
          ? "Final Payment"
          : type === "installment_complete"
            ? "Paid In Full"
            : installmentNumber && totalInstallments
              ? `Installment ${installmentNumber} of ${totalInstallments}`
              : "Installment";

  const stepsHtml = c.steps
    .map(
      (step, i) =>
        `<tr>
<td style="width:36px;vertical-align:top;padding:8px 0;">
<div style="width:28px;height:28px;border-radius:50%;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;line-height:28px;text-align:center;">${i + 1}</div>
</td>
<td style="padding:10px 0 10px 12px;color:#f5f5f0;font-size:15px;line-height:1.5;">${step}</td>
</tr>`
    )
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;color:#f5f5f0;font-family:Arial,'Helvetica Neue',sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 24px;">

<!-- Header -->
<div style="margin-bottom:32px;">
<h1 style="font-size:20px;font-weight:700;letter-spacing:-0.5px;margin:0 0 4px 0;"><span style="color:#f5f5f0;">martin</span><span style="color:#c8ff00;">.</span><span style="color:#f5f5f0;">builds</span></h1>
<p style="color:#888;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">AI Tools for Small Business</p>
</div>

<!-- Divider -->
<div style="height:1px;background:#222;margin-bottom:32px;"></div>

<!-- Payment Badge -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:24px;text-align:center;margin-bottom:32px;">
<div style="display:inline-block;background:#c8ff00;color:#0a0a0a;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:4px 12px;border-radius:100px;margin-bottom:16px;">${typeBadge}</div>
<p style="font-size:36px;font-weight:800;color:#c8ff00;margin:8px 0 4px 0;">$${dollars}</p>
<p style="color:#ccc;font-size:14px;margin:0;">${projectName}</p>
${totalLine}
</div>

<!-- Headline -->
<h2 style="font-size:22px;font-weight:700;color:#f5f5f0;margin:0 0 8px 0;letter-spacing:-0.5px;">${c.headline(clientName)}</h2>
<p style="color:#888;font-size:14px;line-height:1.6;margin:0 0 28px 0;">${c.closingLine}</p>

<!-- Timeline -->
<div style="background:#111;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:32px;">
<h3 style="font-size:13px;color:#c8ff00;margin:0 0 16px 0;text-transform:uppercase;letter-spacing:1px;">What Happens Next</h3>
<table style="width:100%;border-collapse:collapse;">${stepsHtml}</table>
</div>

<!-- CTA -->
<div style="text-align:center;margin-bottom:32px;">
<a href="https://martinbuilds.ai/contact" style="display:inline-block;padding:14px 32px;background:#c8ff00;color:#0a0a0a;font-weight:700;font-size:14px;border-radius:100px;text-decoration:none;letter-spacing:0.5px;">Questions? Get in Touch</a>
</div>

<!-- Footer -->
<div style="height:1px;background:#222;margin-bottom:24px;"></div>
<p style="color:#666;font-size:12px;text-align:center;margin:0;">
<a href="https://martinbuilds.ai" style="color:#c8ff00;text-decoration:none;">martinbuilds.ai</a>
</p>

</div></body></html>`;
}
