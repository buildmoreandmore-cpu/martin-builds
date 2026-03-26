import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Find customer by email
    const customers = await stripe.customers.list({
      email,
      limit: 5,
    });

    if (!customers.data.length) {
      return NextResponse.json({ invoices: [] });
    }

    const allInvoices: {
      id: string;
      project_name: string;
      description: string;
      amount: number;
      payment_type: string;
      status: string | null;
      payment_intent_id: string | null;
      pay_url: string | null;
    }[] = [];

    for (const customer of customers.data) {
      const invoices = await stripe.invoices.list({
        customer: customer.id,
        status: "open",
        limit: 20,
      });

      for (const inv of invoices.data) {
        if (inv.metadata?.created_by !== "martin.builds admin") continue;

        // Get payment intent ID from metadata (set by admin panel)
        const piId = inv.metadata?.payment_intent_id || null;

        allInvoices.push({
          id: inv.id,
          project_name: inv.metadata?.project_name || "Project Payment",
          description: inv.description || "",
          amount: inv.amount_due / 100,
          payment_type: inv.metadata?.payment_type || "full",
          status: inv.status,
          payment_intent_id: piId,
          pay_url: piId ? `/pay/${piId}` : null,
        });
      }
    }

    return NextResponse.json({ invoices: allInvoices });
  } catch (err) {
    console.error("Pay lookup error:", err);
    return NextResponse.json(
      { error: "Failed to look up payments" },
      { status: 500 }
    );
  }
}
