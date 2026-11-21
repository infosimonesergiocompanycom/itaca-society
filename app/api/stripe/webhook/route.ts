import { NextResponse } from "next/server";
import { confirmCheckoutSession, stripe } from "@/lib/server/payments";

/**
 * Webhook Stripe (facoltativo ma consigliato): conferma il pagamento anche
 * se il socio chiude il browser prima di tornare sul sito.
 * Evento da abilitare nella dashboard Stripe: checkout.session.completed
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Webhook non configurato" }, { status: 503 });
  }
  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Firma mancante" }, { status: 400 });

  let event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Firma non valida" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    await confirmCheckoutSession(event.data.object.id);
  }
  return NextResponse.json({ received: true });
}
