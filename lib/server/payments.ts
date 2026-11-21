import Stripe from "stripe";
import { MEMBERSHIP_FEE_CENTS, siteUrl } from "./config";
import { recordPayment, type Member } from "./members";

let client: Stripe | null = null;

export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY non configurata");
  if (!client) client = new Stripe(key);
  return client;
}

/** Crea una sessione di Stripe Checkout per la quota associativa annuale. */
export async function createCheckout(member: Member): Promise<string> {
  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    customer_email: member.email,
    client_reference_id: member.id,
    metadata: { member_id: member.id, purpose: "quota_associativa" },
    locale: "it",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: MEMBERSHIP_FEE_CENTS,
          product_data: {
            name: "Quota associativa annuale — Itaca Society",
            description: `Tessera n. ${member.card_number ?? ""} · validità 12 mesi`,
          },
        },
      },
    ],
    success_url: `${siteUrl()}/area-soci/pagamento/esito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/area-soci?pagamento=annullato`,
  });
  if (!session.url) throw new Error("Stripe non ha restituito l'indirizzo di pagamento");
  return session.url;
}

/**
 * Conferma un pagamento a partire dalla sessione Stripe. Usata sia al ritorno
 * dal checkout sia dal webhook: la registrazione è idempotente.
 */
export async function confirmCheckoutSession(sessionId: string): Promise<{ paid: boolean; memberId?: string }> {
  const session = await stripe().checkout.sessions.retrieve(sessionId);
  const memberId = session.metadata?.member_id ?? session.client_reference_id ?? undefined;
  if (session.payment_status !== "paid" || !memberId) return { paid: false, memberId };
  await recordPayment({
    memberId,
    amountCents: session.amount_total ?? MEMBERSHIP_FEE_CENTS,
    method: "stripe",
    stripeSessionId: session.id,
  });
  return { paid: true, memberId };
}
