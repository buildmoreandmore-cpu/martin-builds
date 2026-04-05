import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

/* ─── GET: fetch all admin-created invoices, grouped by project ─── */
export async function GET() {
  try {
    const stripe = getStripe();

    const invoices = await stripe.invoices.list({
      limit: 100,
      expand: ["data.customer"],
    });

    // Filter to only invoices created by this admin panel
    const adminInvoices = invoices.data.filter(
      (inv) => inv.metadata?.created_by === "martin.builds admin"
    );

    // Also fetch active subscriptions with our metadata
    const subscriptions = await stripe.subscriptions.list({
      limit: 100,
      expand: ["data.customer"],
    });
    const adminSubs = subscriptions.data.filter(
      (sub) => sub.metadata?.created_by === "martin.builds admin"
    );

    // Group invoices by project_name
    const projectMap: Record<string, ProjectCard> = {};

    for (const inv of adminInvoices) {
      const projectName = inv.metadata?.project_name || "Unnamed Project";
      const key = `${inv.metadata?.client_name}::${projectName}`;

      if (!projectMap[key]) {
        projectMap[key] = {
          client_name: inv.metadata?.client_name || "Unknown",
          project_name: projectName,
          payment_type: inv.metadata?.payment_type === "deposit" || inv.metadata?.payment_type === "final" ? "split" : inv.metadata?.payment_type || "full",
          phase: inv.metadata?.phase || null,
          invoices: [],
          status: "awaiting_payment",
          status_label: "Awaiting payment",
          total_amount: 0,
          amount_paid: 0,
        };
      }

      const customer = inv.customer as Stripe.Customer | null;

      projectMap[key].invoices.push({
        id: inv.id,
        amount: inv.amount_due / 100,
        amount_paid: inv.amount_paid / 100,
        status: inv.status,
        due_date: inv.due_date ? new Date(inv.due_date * 1000).toISOString() : null,
        hosted_invoice_url: inv.hosted_invoice_url ?? null,
        invoice_pdf: inv.invoice_pdf ?? null,
        payment_type: inv.metadata?.payment_type || "full",
        stripe_url: `https://dashboard.stripe.com/invoices/${inv.id}`,
        customer_email: customer?.email || inv.customer_email || null,
        pay_url: inv.metadata?.pay_url || null,
        description: inv.description || null,
        line_items: (inv.lines?.data || []).map((li) => ({
          id: li.id,
          description: li.description || "",
          amount: (li.amount || 0) / 100,
        })),
      });

      projectMap[key].total_amount += inv.amount_due / 100;
      projectMap[key].amount_paid += inv.amount_paid / 100;
    }

    // Add retainer subscriptions
    for (const sub of adminSubs) {
      const projectName = sub.metadata?.project_name || "Unnamed Project";
      const key = `${sub.metadata?.client_name}::${projectName}`;
      const customer = sub.customer as Stripe.Customer | null;

      if (!projectMap[key]) {
        const monthlyAmount = sub.items.data[0]?.price?.unit_amount
          ? sub.items.data[0].price.unit_amount / 100
          : 0;

        projectMap[key] = {
          client_name: sub.metadata?.client_name || "Unknown",
          project_name: projectName,
          payment_type: "retainer",
          phase: null,
          invoices: [],
          status: sub.status === "active" ? "paid_full" : "awaiting_payment",
          status_label:
            sub.status === "active" ? "Retainer active" : "Retainer pending",
          total_amount: monthlyAmount,
          amount_paid: 0,
          subscription: {
            id: sub.id,
            status: sub.status,
            current_period_end: new Date(
              ((sub as unknown as { current_period_end: number }).current_period_end || 0) * 1000
            ).toISOString(),
            monthly_amount: monthlyAmount,
            stripe_url: `https://dashboard.stripe.com/subscriptions/${sub.id}`,
            customer_email: customer?.email || null,
          },
        };
      }
    }

    // Compute statuses
    for (const card of Object.values(projectMap)) {
      card.status = computeStatus(card);
      card.status_label = statusLabel(card.status, card);
    }

    const projects = Object.values(projectMap).sort((a, b) => {
      const order: Record<string, number> = {
        overdue: 0,
        draft_saved: 1,
        deposit_pending: 2,
        awaiting_payment: 3,
        final_sent: 4,
        deposit_paid: 5,
        paid_full: 6,
      };
      return (order[a.status] ?? 9) - (order[b.status] ?? 9);
    });

    return NextResponse.json({ projects });
  } catch (err) {
    console.error("GET /api/admin/invoices error:", err);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

/* ─── POST: create invoices ─── */
export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.json();

    const {
      client_name,
      client_email,
      project_name,
      phase_number,
      total_phases,
      line_items,
      payment_type,
      memo,
      due_date,
    } = body;

    // Validate
    if (!client_name || !client_email || !project_name) {
      return NextResponse.json(
        { error: "client_name, client_email, and project_name are required" },
        { status: 400 }
      );
    }
    if (!line_items?.length) {
      return NextResponse.json(
        { error: "At least one line item is required" },
        { status: 400 }
      );
    }

    // Find or create customer
    const existing = await stripe.customers.list({
      email: client_email,
      limit: 1,
    });
    const customer =
      existing.data[0] ||
      (await stripe.customers.create({
        name: client_name,
        email: client_email,
      }));

    const phaseLabel =
      phase_number && total_phases ? ` — Phase ${phase_number} of ${total_phases}` : "";
    const invoiceTitle = `${project_name}${phaseLabel}`;
    const totalCents = line_items.reduce(
      (sum: number, li: { amount: number }) => sum + Math.round(li.amount * 100),
      0
    );
    const dateCreated = new Date().toISOString();

    const baseMeta: Record<string, string> = {
      client_name,
      project_name,
      created_by: "martin.builds admin",
      date_created: dateCreated,
      ...(memo ? { scope_summary: memo.slice(0, 500) } : {}),
      ...(phase_number ? { phase: `${phase_number}/${total_phases}` } : {}),
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://martinbuilds.ai";

    if (payment_type === "full") {
      const { send_later } = body;

      // Create payment intent for on-site payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCents,
        currency: "usd",
        customer: customer.id,
        receipt_email: client_email,
        metadata: {
          ...baseMeta,
          payment_type: "full",
          total_amount: totalCents.toString(),
        },
        description: invoiceTitle,
      });

      const invoice = await stripe.invoices.create({
        customer: customer.id,
        collection_method: "send_invoice",
        days_until_due: due_date === "receipt" ? 0 : undefined,
        due_date:
          due_date && due_date !== "receipt"
            ? Math.floor(new Date(due_date).getTime() / 1000)
            : undefined,
        metadata: {
          ...baseMeta,
          payment_type: "full",
          payment_intent_id: paymentIntent.id,
          pay_url: `/pay/${paymentIntent.id}`,
        },
        description: invoiceTitle,
      });

      for (const li of line_items) {
        await stripe.invoiceItems.create({
          customer: customer.id,
          invoice: invoice.id,
          description: li.description,
          amount: Math.round(li.amount * 100),
          currency: "usd",
        });
      }

      if (send_later) {
        // Keep as draft — do not finalize or send
        return NextResponse.json({
          success: true,
          type: "draft",
          invoice_id: invoice.id,
          payment_link: `${baseUrl}/pay/${paymentIntent.id}`,
        });
      }

      const finalized = await stripe.invoices.finalizeInvoice(invoice.id);
      await stripe.invoices.sendInvoice(finalized.id);

      return NextResponse.json({
        success: true,
        type: "full",
        invoice_id: finalized.id,
        payment_link: `${baseUrl}/pay/${paymentIntent.id}`,
      });
    }

    if (payment_type === "split") {
      const halfCents = Math.round(totalCents / 2);

      // Create payment intent for deposit (on-site payment)
      const depositPI = await stripe.paymentIntents.create({
        amount: halfCents,
        currency: "usd",
        customer: customer.id,
        receipt_email: client_email,
        metadata: {
          ...baseMeta,
          payment_type: "deposit",
          phase: "1",
          total_phases: "2",
          total_amount: totalCents.toString(),
        },
        description: `${invoiceTitle} — Deposit (50%)`,
      });

      // Invoice 1: deposit (finalize + send)
      const depositInvoice = await stripe.invoices.create({
        customer: customer.id,
        collection_method: "send_invoice",
        days_until_due: due_date === "receipt" ? 0 : undefined,
        due_date:
          due_date && due_date !== "receipt"
            ? Math.floor(new Date(due_date).getTime() / 1000)
            : undefined,
        metadata: {
          ...baseMeta,
          payment_type: "deposit",
          payment_intent_id: depositPI.id,
          pay_url: `/pay/${depositPI.id}`,
        },
        description: `${invoiceTitle} — Deposit (1 of 2)`,
      });

      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: depositInvoice.id,
        description: `${invoiceTitle} — Deposit (50%)`,
        amount: halfCents,
        currency: "usd",
      });

      const finalizedDeposit = await stripe.invoices.finalizeInvoice(
        depositInvoice.id
      );
      await stripe.invoices.sendInvoice(finalizedDeposit.id);

      // Invoice 2: final (draft — do NOT send)
      const finalInvoice = await stripe.invoices.create({
        customer: customer.id,
        collection_method: "send_invoice",
        days_until_due: 0,
        metadata: {
          ...baseMeta,
          payment_type: "final",
          linked_deposit_invoice: finalizedDeposit.id,
        },
        description: `${invoiceTitle} — Final Balance (2 of 2)`,
      });

      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: finalInvoice.id,
        description: `${invoiceTitle} — Final Payment (50%)`,
        amount: totalCents - halfCents,
        currency: "usd",
      });

      // Update deposit with link to final
      await stripe.invoices.update(finalizedDeposit.id, {
        metadata: {
          ...finalizedDeposit.metadata,
          linked_final_invoice: finalInvoice.id,
        },
      });

      return NextResponse.json({
        success: true,
        type: "split",
        deposit_invoice_id: finalizedDeposit.id,
        final_invoice_id: finalInvoice.id,
        payment_link: `${baseUrl}/pay/${depositPI.id}`,
      });
    }

    if (payment_type === "retainer") {
      const monthlyAmount = totalCents;

      const price = await stripe.prices.create({
        currency: "usd",
        unit_amount: monthlyAmount,
        recurring: { interval: "month" },
        product_data: {
          name: `${invoiceTitle} — Monthly Retainer`,
        },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        metadata: { ...baseMeta, payment_type: "retainer" },
        description: `${invoiceTitle} — Monthly Retainer`,
      });

      return NextResponse.json({
        success: true,
        type: "retainer",
        subscription_id: subscription.id,
      });
    }

    return NextResponse.json(
      { error: "Invalid payment_type. Use: full, split, or retainer" },
      { status: 400 }
    );
  } catch (err) {
    console.error("POST /api/admin/invoices error:", err);
    const message = err instanceof Error ? err.message : "Failed to create invoice";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/* ─── Helpers ─── */

interface InvoiceEntry {
  id: string;
  amount: number;
  amount_paid: number;
  status: string | null;
  due_date: string | null;
  hosted_invoice_url: string | null;
  invoice_pdf: string | null;
  payment_type: string;
  stripe_url: string;
  customer_email: string | null;
  pay_url: string | null;
  description: string | null;
  line_items: { id: string; description: string; amount: number }[];
}

interface SubscriptionEntry {
  id: string;
  status: string;
  current_period_end: string;
  monthly_amount: number;
  stripe_url: string;
  customer_email: string | null;
}

interface ProjectCard {
  client_name: string;
  project_name: string;
  payment_type: string;
  phase: string | null;
  invoices: InvoiceEntry[];
  status: string;
  status_label: string;
  total_amount: number;
  amount_paid: number;
  subscription?: SubscriptionEntry;
}

function computeStatus(card: ProjectCard): string {
  if (card.subscription) {
    return card.subscription.status === "active" ? "paid_full" : "awaiting_payment";
  }

  const invoices = card.invoices;
  const allPaid = invoices.every((i) => i.status === "paid");
  if (allPaid && invoices.length > 0) return "paid_full";

  // Check for saved drafts (full invoices kept as draft)
  const hasDraftFull = invoices.some(
    (i) => i.status === "draft" && i.payment_type === "full"
  );
  if (hasDraftFull) return "draft_saved";

  // Check overdue
  const now = Date.now();
  const hasOverdue = invoices.some(
    (i) =>
      i.status === "open" &&
      i.due_date &&
      new Date(i.due_date).getTime() < now
  );
  if (hasOverdue) return "overdue";

  // Split payment logic
  const deposit = invoices.find((i) => i.payment_type === "deposit");
  const final = invoices.find((i) => i.payment_type === "final");

  if (deposit && final) {
    if (deposit.status === "open") return "deposit_pending";
    if (deposit.status === "paid" && final.status === "draft")
      return "deposit_paid";
    if (deposit.status === "paid" && final.status === "open")
      return "final_sent";
  }

  return "awaiting_payment";
}

function statusLabel(status: string, card: ProjectCard): string {
  switch (status) {
    case "draft_saved":
      return "Draft — not sent yet";
    case "deposit_pending":
      return "Deposit pending";
    case "deposit_paid":
      return "Deposit paid — in build";
    case "final_sent":
      return "Final invoice sent";
    case "paid_full":
      return card.subscription ? "Retainer active" : "Paid in full";
    case "overdue": {
      const overdue = card.invoices.find(
        (i) =>
          i.status === "open" &&
          i.due_date &&
          new Date(i.due_date).getTime() < Date.now()
      );
      if (overdue?.due_date) {
        const days = Math.floor(
          (Date.now() - new Date(overdue.due_date).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        return `Overdue — ${days} days`;
      }
      return "Overdue";
    }
    default:
      return "Awaiting payment";
  }
}
