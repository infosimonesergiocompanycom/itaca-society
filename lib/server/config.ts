/** Parametri dell'associazione e dei servizi esterni, letti dalle variabili d'ambiente. */

export const MEMBERSHIP_FEE_CENTS = Number(process.env.MEMBERSHIP_FEE_CENTS ?? 2000);
export const MEMBERSHIP_MONTHS = 12;

export function siteUrl(): string {
  // SITE_URL è letta all'avvio del server (le variabili NEXT_PUBLIC_* verrebbero fissate in compilazione)
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/** Email che ricevono automaticamente il ruolo di amministratore (consiglio direttivo, staff). */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function authSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET mancante o troppo corto (almeno 32 caratteri).");
  }
  return "itaca-dev-secret-solo-per-sviluppo-locale-000000";
}

export type PaymentMode = "stripe" | "demo" | "disabled";

/** Stripe se configurato; pagamento simulato solo se esplicitamente consentito (sviluppo e prove). */
export function paymentMode(): PaymentMode {
  if (process.env.STRIPE_SECRET_KEY) return "stripe";
  if (process.env.ALLOW_DEMO_PAYMENTS === "true") return "demo";
  return "disabled";
}

export function formatFee(cents = MEMBERSHIP_FEE_CENTS) {
  const euros = cents / 100;
  return `${Number.isInteger(euros) ? euros : euros.toFixed(2).replace(".", ",")} €`;
}
