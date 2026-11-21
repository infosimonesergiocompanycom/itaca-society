import { redirect } from "next/navigation";
import { requireMember } from "@/lib/server/auth";
import { paymentMode } from "@/lib/server/config";
import { confirmCheckoutSession } from "@/lib/server/payments";

/** Ritorno da Stripe Checkout: conferma il pagamento e torna all'Area Soci. */
export default async function PaymentResultPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const member = await requireMember();
  const { session_id } = await searchParams;
  if (!session_id || paymentMode() !== "stripe") redirect("/area-soci");

  let paid = false;
  try {
    const res = await confirmCheckoutSession(session_id);
    paid = res.paid && res.memberId === member.id;
  } catch (err) {
    console.error("Conferma pagamento non riuscita:", err);
  }
  redirect(paid ? "/area-soci?pagamento=ok" : "/area-soci?pagamento=attesa");
}
