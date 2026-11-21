import { randomBytes, randomUUID } from "node:crypto";
import { one, sql } from "./db";
import { NEWSLETTER_CONSENT_VERSION } from "@/lib/consents";

export type Subscriber = { email: string; token: string; created_at: string };

/**
 * Iscrive un indirizzo alle «Lettere da Itaca». Un indirizzo già presente viene riattivato
 * (se si era disiscritto) e mantiene il proprio link di disiscrizione.
 */
export async function subscribe(email: string, source = "footer") {
  const normalized = email.trim().toLowerCase();
  await sql(
    `INSERT INTO newsletter_subscribers (id, email, token, consent_version, source)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO UPDATE
       SET unsubscribed_at = NULL,
           consent_version = EXCLUDED.consent_version,
           created_at = CASE WHEN newsletter_subscribers.unsubscribed_at IS NULL
                             THEN newsletter_subscribers.created_at ELSE now() END`,
    [randomUUID(), normalized, randomBytes(24).toString("base64url"), NEWSLETTER_CONSENT_VERSION, source],
  );
}

export async function findByToken(token: string) {
  return one<{ email: string; unsubscribed_at: string | null }>(
    `SELECT email, unsubscribed_at::text AS unsubscribed_at FROM newsletter_subscribers WHERE token = $1`,
    [token],
  );
}

export async function unsubscribe(token: string): Promise<boolean> {
  const rows = await sql(
    `UPDATE newsletter_subscribers SET unsubscribed_at = COALESCE(unsubscribed_at, now()) WHERE token = $1 RETURNING id`,
    [token],
  );
  return rows.length > 0;
}

export async function activeSubscribers() {
  return sql<Subscriber>(
    `SELECT email, token, created_at::text AS created_at FROM newsletter_subscribers
     WHERE unsubscribed_at IS NULL ORDER BY created_at DESC`,
  );
}

export async function subscriberCount() {
  const r = await one<{ n: number }>(`SELECT count(*)::int AS n FROM newsletter_subscribers WHERE unsubscribed_at IS NULL`);
  return r?.n ?? 0;
}
