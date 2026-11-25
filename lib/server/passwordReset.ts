import { createHash, randomBytes } from "node:crypto";
import { one, sql } from "./db";
import { findMemberByEmail, type Member } from "./members";

const TTL_MINUTES = 60;
const MAX_PER_HOUR = 3;

const hashToken = (t: string) => createHash("sha256").update(t).digest("hex");

/**
 * Crea un link di reimpostazione per l'email indicata, se appartiene a un socio.
 * Nel database resta solo l'impronta del codice: il link in chiaro esiste solo nell'email.
 */
export async function createResetToken(email: string): Promise<{ member: Member; token: string } | null> {
  const member = await findMemberByEmail(email.trim().toLowerCase());
  if (!member) return null;
  const recent = await one<{ n: number }>(
    `SELECT count(*)::int AS n FROM password_resets WHERE member_id = $1 AND created_at > now() - interval '1 hour'`,
    [member.id],
  );
  if ((recent?.n ?? 0) >= MAX_PER_HOUR) return null;
  const token = randomBytes(32).toString("base64url");
  await sql(
    `INSERT INTO password_resets (token_hash, member_id, expires_at) VALUES ($1, $2, now() + ($3 || ' minutes')::interval)`,
    [hashToken(token), member.id, String(TTL_MINUTES)],
  );
  return { member, token };
}

/** Verifica che il link sia valido, non usato e non scaduto. */
export async function checkResetToken(token: string): Promise<{ memberId: string } | null> {
  if (!token) return null;
  const row = await one<{ member_id: string }>(
    `SELECT member_id FROM password_resets WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()`,
    [hashToken(token)],
  );
  return row ? { memberId: row.member_id } : null;
}

/**
 * Imposta la nuova password e chiude il link (e tutti gli altri link aperti per lo stesso socio).
 * Le sessioni aperte prima di questo momento smettono di valere.
 */
export async function consumeResetToken(token: string, passwordHash: string, changedAtMs: number): Promise<string | null> {
  const valid = await checkResetToken(token);
  if (!valid) return null;
  const used = await sql(`UPDATE password_resets SET used_at = now() WHERE token_hash = $1 AND used_at IS NULL RETURNING member_id`, [
    hashToken(token),
  ]);
  if (used.length === 0) return null;
  await sql(`UPDATE members SET password_hash = $2, password_changed_at = to_timestamp($3::double precision / 1000) WHERE id = $1`, [
    valid.memberId,
    passwordHash,
    changedAtMs,
  ]);
  await sql(`UPDATE password_resets SET used_at = now() WHERE member_id = $1 AND used_at IS NULL`, [valid.memberId]);
  return valid.memberId;
}

export const RESET_TTL_MINUTES = TTL_MINUTES;
