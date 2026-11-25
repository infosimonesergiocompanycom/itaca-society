import { randomUUID } from "node:crypto";
import { one, sql } from "./db";
import { adminEmails, MEMBERSHIP_MONTHS } from "./config";
import { CONSENT_VERSION, type ConsentKind } from "@/lib/consents";

export type MemberStatus = "pending" | "approved" | "rejected" | "suspended";

export type Member = {
  id: string;
  email: string;
  role: "member" | "admin";
  first_name: string;
  last_name: string;
  birth_date: string;
  birth_place: string;
  fiscal_code: string;
  address: string;
  city: string;
  phone: string | null;
  interests: string | null;
  motivation: string | null;
  status: MemberStatus;
  card_number: string | null;
  paid_until: string | null;
  approved_at: string | null;
  created_at: string;
  marketing_consent: boolean;
  marketing_consent_at: string | null;
  sponsor_consent: boolean;
  sponsor_consent_at: string | null;
  /** Millisecondi dell'ultimo cambio password (stringa numerica), per invalidare le sessioni precedenti. */
  password_changed_ms: string | null;
};

/** Stato effettivo, combinando l'esito della domanda con la validità della quota. */
export type Standing = "pending" | "awaiting_payment" | "active" | "expired" | "rejected" | "suspended";

const COLUMNS = `id, email, role, first_name, last_name, birth_date::text AS birth_date, birth_place,
  fiscal_code, address, city, phone, interests, motivation, status, card_number,
  paid_until::text AS paid_until, approved_at::text AS approved_at, created_at::text AS created_at,
  marketing_consent, marketing_consent_at::text AS marketing_consent_at,
  sponsor_consent, sponsor_consent_at::text AS sponsor_consent_at,
  (extract(epoch from password_changed_at) * 1000)::bigint::text AS password_changed_ms`;

/** Data odierna (aaaa-mm-gg) secondo il fuso di Pietrasanta, non quello del server. */
export function todayIso(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" }).format(new Date());
}

export function standing(m: Pick<Member, "status" | "paid_until">): Standing {
  if (m.status === "pending") return "pending";
  if (m.status === "rejected") return "rejected";
  if (m.status === "suspended") return "suspended";
  if (!m.paid_until) return "awaiting_payment";
  return m.paid_until >= todayIso() ? "active" : "expired";
}

export const standingLabel: Record<Standing, string> = {
  pending: "In attesa di approvazione",
  awaiting_payment: "Approvata · quota da versare",
  active: "Attiva",
  expired: "Scaduta",
  rejected: "Non accolta",
  suspended: "Sospesa",
};

export async function findMemberByEmail(email: string) {
  return one<Member & { password_hash: string }>(
    `SELECT ${COLUMNS}, password_hash FROM members WHERE email = $1`,
    [email.trim().toLowerCase()],
  );
}

export async function findMemberById(id: string) {
  return one<Member>(`SELECT ${COLUMNS} FROM members WHERE id = $1`, [id]);
}

export type NewMember = {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  fiscalCode: string;
  address: string;
  city: string;
  phone?: string;
  interests?: string;
  motivation?: string;
  marketingConsent: boolean;
  sponsorConsent: boolean;
};

export async function createMember(input: NewMember): Promise<Member> {
  const id = randomUUID();
  const email = input.email.trim().toLowerCase();
  const role = adminEmails().includes(email) ? "admin" : "member";
  await sql(
    `INSERT INTO members (id, email, password_hash, role, first_name, last_name, birth_date, birth_place,
       fiscal_code, address, city, phone, interests, motivation, privacy_accepted_at,
       marketing_consent, marketing_consent_at, sponsor_consent, sponsor_consent_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, now(),
       $15, CASE WHEN $15 THEN now() END, $16, CASE WHEN $16 THEN now() END)`,
    [
      id,
      email,
      input.passwordHash,
      role,
      input.firstName.trim(),
      input.lastName.trim(),
      input.birthDate,
      input.birthPlace.trim(),
      input.fiscalCode.trim().toUpperCase(),
      input.address.trim(),
      input.city.trim(),
      input.phone?.trim() || null,
      input.interests?.trim() || null,
      input.motivation?.trim() || null,
      input.marketingConsent,
      input.sponsorConsent,
    ],
  );
  await logConsent(id, "marketing", input.marketingConsent, "registrazione");
  await logConsent(id, "sponsor", input.sponsorConsent, "registrazione");
  const created = await findMemberById(id);
  if (!created) throw new Error("Creazione del socio non riuscita");
  return created;
}

/** Allinea il ruolo alla lista ADMIN_EMAILS a ogni accesso. */
export async function syncRole(member: Member): Promise<Member> {
  const shouldBeAdmin = adminEmails().includes(member.email);
  const role = shouldBeAdmin ? "admin" : member.role === "admin" && adminEmails().length > 0 ? "member" : member.role;
  if (role !== member.role) {
    await sql(`UPDATE members SET role = $1 WHERE id = $2`, [role, member.id]);
    return { ...member, role };
  }
  return member;
}

export async function listMembers(filter?: MemberStatus) {
  if (filter) {
    return sql<Member>(`SELECT ${COLUMNS} FROM members WHERE status = $1 ORDER BY created_at DESC`, [filter]);
  }
  return sql<Member>(`SELECT ${COLUMNS} FROM members ORDER BY created_at DESC`);
}

/** Accoglie la domanda e assegna il numero di tessera. Restituisce true solo se lo stato è cambiato. */
export async function approveMember(id: string, adminId: string): Promise<boolean> {
  const seq = await one<{ n: string }>(`SELECT nextval('card_seq')::text AS n`);
  const year = new Date().getFullYear();
  const number = `IS-${year}-${String(seq?.n ?? "0").padStart(4, "0")}`;
  const rows = await sql(
    `UPDATE members SET status = 'approved', approved_at = now(), decided_by = $2,
       card_number = COALESCE(card_number, $3)
     WHERE id = $1 AND status IN ('pending','rejected','suspended') RETURNING id`,
    [id, adminId, number],
  );
  return rows.length > 0;
}

export async function setMemberStatus(id: string, status: "rejected" | "suspended", adminId: string) {
  await sql(`UPDATE members SET status = $2, decided_by = $3 WHERE id = $1`, [id, status, adminId]);
}

function nextDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

/** Ultimo giorno di validità: stessa data dopo `months` mesi, meno un giorno. */
function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1 + months, d));
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

/**
 * Registra il versamento della quota. La validità parte da oggi, oppure
 * dalla scadenza precedente se la tessera è ancora attiva (rinnovo anticipato).
 * Idempotente rispetto alla sessione Stripe. Restituisce true se il versamento è stato registrato ora.
 */
export async function recordPayment(opts: {
  memberId: string;
  amountCents: number;
  method: "stripe" | "cash" | "transfer" | "demo";
  stripeSessionId?: string;
  recordedBy?: string;
}): Promise<boolean> {
  if (opts.stripeSessionId) {
    const existing = await one(`SELECT id FROM payments WHERE stripe_session_id = $1`, [opts.stripeSessionId]);
    if (existing) return false;
  }
  const member = await findMemberById(opts.memberId);
  if (!member) throw new Error("Socio non trovato");

  const today = todayIso();
  const start = member.paid_until && member.paid_until >= today ? nextDay(member.paid_until) : today;
  const end = addMonths(start, MEMBERSHIP_MONTHS);

  await sql(
    `INSERT INTO payments (id, member_id, amount_cents, method, stripe_session_id, period_start, period_end, recorded_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [randomUUID(), opts.memberId, opts.amountCents, opts.method, opts.stripeSessionId ?? null, start, end, opts.recordedBy ?? null],
  );
  await sql(`UPDATE members SET paid_until = $2 WHERE id = $1`, [opts.memberId, end]);
  return true;
}

export async function paymentsFor(memberId: string) {
  return sql<{ amount_cents: number; method: string; period_start: string; period_end: string; created_at: string }>(
    `SELECT amount_cents, method, period_start::text AS period_start, period_end::text AS period_end, created_at::text AS created_at
     FROM payments WHERE member_id = $1 ORDER BY created_at DESC`,
    [memberId],
  );
}

export async function recordCheckin(memberId: string, eventSlug: string, staffId: string) {
  const rows = await sql<{ id: string }>(
    `INSERT INTO checkins (id, member_id, event_slug, staff_id) VALUES ($1,$2,$3,$4)
     ON CONFLICT (member_id, event_slug) DO NOTHING RETURNING id`,
    [randomUUID(), memberId, eventSlug, staffId],
  );
  return rows.length > 0; // false = ingresso già registrato
}

export async function checkinsFor(memberId: string) {
  return sql<{ event_slug: string; created_at: string }>(
    `SELECT event_slug, created_at::text AS created_at FROM checkins WHERE member_id = $1 ORDER BY created_at DESC`,
    [memberId],
  );
}

export async function checkinCounts() {
  const rows = await sql<{ event_slug: string; n: string }>(
    `SELECT event_slug, count(*)::text AS n FROM checkins GROUP BY event_slug`,
  );
  return Object.fromEntries(rows.map((r) => [r.event_slug, Number(r.n)]));
}

export async function findMemberByCardNumber(cardNumber: string) {
  return one<Member>(`SELECT ${COLUMNS} FROM members WHERE upper(card_number) = upper($1)`, [cardNumber.trim()]);
}

export async function memberStats() {
  const rows = await sql<{ status: string; paid_until: string | null }>(
    `SELECT status, paid_until::text AS paid_until FROM members`,
  );
  const counts: Record<Standing, number> = { pending: 0, awaiting_payment: 0, active: 0, expired: 0, rejected: 0, suspended: 0 };
  for (const r of rows) counts[standing(r as Pick<Member, "status" | "paid_until">)]++;
  return counts;
}


/* -------------------------------------------------------------------------- */
/*  Consensi promozionali                                                      */
/* -------------------------------------------------------------------------- */

async function logConsent(memberId: string, kind: ConsentKind, granted: boolean, source: string) {
  await sql(
    `INSERT INTO consent_log (id, member_id, kind, granted, version, source) VALUES ($1,$2,$3,$4,$5,$6)`,
    [randomUUID(), memberId, kind, granted, CONSENT_VERSION, source],
  );
}

/**
 * Aggiorna i consensi del socio. Registra nel log solo ciò che cambia;
 * la data del consenso riparte da ogni nuova accettazione e si azzera alla revoca.
 */
export async function setConsents(
  member: Pick<Member, "id" | "marketing_consent" | "sponsor_consent">,
  next: { marketing: boolean; sponsor: boolean },
  source = "area-soci",
) {
  const changes: [ConsentKind, boolean][] = [];
  if (next.marketing !== member.marketing_consent) changes.push(["marketing", next.marketing]);
  if (next.sponsor !== member.sponsor_consent) changes.push(["sponsor", next.sponsor]);
  for (const [kind, granted] of changes) {
    await sql(
      `UPDATE members SET ${kind}_consent = $2, ${kind}_consent_at = CASE WHEN $2 THEN now() ELSE NULL END WHERE id = $1`,
      [member.id, granted],
    );
    await logConsent(member.id, kind, granted, source);
  }
  return changes.length;
}

export async function consentHistory(memberId: string) {
  return sql<{ kind: ConsentKind; granted: boolean; source: string; created_at: string }>(
    `SELECT kind, granted, source, created_at::text AS created_at FROM consent_log WHERE member_id = $1 ORDER BY created_at DESC LIMIT 20`,
    [memberId],
  );
}

/** Contatti condivisibili con gli sponsor: solo chi ha dato il consenso specifico. */
export async function sponsorContacts() {
  return sql<Member>(
    `SELECT ${COLUMNS} FROM members WHERE sponsor_consent = true AND status NOT IN ('rejected','suspended') ORDER BY last_name, first_name`,
  );
}
