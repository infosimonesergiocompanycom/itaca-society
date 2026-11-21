"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, hashPassword, requireAdmin, requireMember, startSession, verifyPassword } from "@/lib/server/auth";
import { verifyCardToken } from "@/lib/server/card";
import { MEMBERSHIP_FEE_CENTS, paymentMode } from "@/lib/server/config";
import {
  approveMember,
  createMember,
  findMemberByEmail,
  recordCheckin,
  recordPayment,
  setMemberStatus,
  standing,
} from "@/lib/server/members";
import { createCheckout } from "@/lib/server/payments";

export type FormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

function ageOn(birthIso: string, today = new Date()): number {
  const [y, m, d] = birthIso.split("-").map(Number);
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age -= 1;
  return age;
}

/* ------------------------------ Registrazione ----------------------------- */

export async function registerAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const v = {
    firstName: str(fd, "firstName"),
    lastName: str(fd, "lastName"),
    birthDate: str(fd, "birthDate"),
    birthPlace: str(fd, "birthPlace"),
    fiscalCode: str(fd, "fiscalCode").toUpperCase().replace(/\s/g, ""),
    address: str(fd, "address"),
    city: str(fd, "city"),
    phone: str(fd, "phone"),
    email: str(fd, "email").toLowerCase(),
    interests: fd.getAll("interests").map(String).join(", "),
    motivation: str(fd, "motivation"),
  };
  const password = String(fd.get("password") ?? "");
  const password2 = String(fd.get("password2") ?? "");
  const e: Record<string, string> = {};

  if (!v.firstName) e.firstName = "Indica il nome.";
  if (!v.lastName) e.lastName = "Indica il cognome.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v.birthDate)) e.birthDate = "Indica la data di nascita.";
  else if (ageOn(v.birthDate) < 18) e.birthDate = "La registrazione online è riservata ai maggiorenni. Per i minori scrivi alla segreteria.";
  else if (ageOn(v.birthDate) > 110) e.birthDate = "Controlla la data inserita.";
  if (!v.birthPlace) e.birthPlace = "Indica il luogo di nascita.";
  if (!/^[A-Z0-9]{16}$/.test(v.fiscalCode)) e.fiscalCode = "Il codice fiscale deve avere 16 caratteri.";
  if (!v.address) e.address = "Indica l'indirizzo di residenza.";
  if (!v.city) e.city = "Indica il comune di residenza.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Serve un indirizzo email valido.";
  if (password.length < 8) e.password = "La password deve avere almeno 8 caratteri.";
  else if (password !== password2) e.password2 = "Le due password non coincidono.";
  if (fd.get("statute") !== "on") e.statute = "Per associarti devi accettare lo statuto e il regolamento.";
  if (fd.get("privacy") !== "on") e.privacy = "Serve il consenso al trattamento dei dati.";

  if (!e.email && (await findMemberByEmail(v.email))) {
    e.email = "Esiste già un account con questa email. Prova ad accedere.";
  }
  if (Object.keys(e).length > 0) return { fieldErrors: e, values: v };

  const member = await createMember({ ...v, passwordHash: await hashPassword(password) });
  await startSession(member.id);
  redirect("/area-soci?benvenuto=1");
}

/* --------------------------------- Accesso -------------------------------- */

export async function loginAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const email = str(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  const member = email ? await findMemberByEmail(email) : null;
  if (!member || !(await verifyPassword(password, member.password_hash))) {
    return { error: "Email o password non corrette.", values: { email } };
  }
  await startSession(member.id);
  const next = str(fd, "next");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/area-soci");
}

export async function logoutAction() {
  await endSession();
  redirect("/");
}

/* -------------------------------- Pagamento ------------------------------- */

export async function startPaymentAction() {
  const member = await requireMember();
  const s = standing(member);
  if (s !== "awaiting_payment" && s !== "expired" && s !== "active") redirect("/area-soci");

  const mode = paymentMode();
  if (mode === "stripe") {
    redirect(await createCheckout(member));
  }
  if (mode === "demo") {
    await recordPayment({ memberId: member.id, amountCents: MEMBERSHIP_FEE_CENTS, method: "demo" });
    revalidatePath("/area-soci");
    redirect("/area-soci?pagamento=ok");
  }
  redirect("/area-soci?pagamento=non-attivo");
}

/* ----------------------------- Amministrazione ---------------------------- */

export async function approveAction(fd: FormData) {
  const admin = await requireAdmin();
  await approveMember(str(fd, "id"), admin.id);
  revalidatePath("/admin");
}

export async function rejectAction(fd: FormData) {
  const admin = await requireAdmin();
  await setMemberStatus(str(fd, "id"), "rejected", admin.id);
  revalidatePath("/admin");
}

export async function suspendAction(fd: FormData) {
  const admin = await requireAdmin();
  await setMemberStatus(str(fd, "id"), "suspended", admin.id);
  revalidatePath("/admin");
}

export async function manualPaymentAction(fd: FormData) {
  const admin = await requireAdmin();
  const method = str(fd, "method") === "transfer" ? "transfer" : "cash";
  await recordPayment({ memberId: str(fd, "id"), amountCents: MEMBERSHIP_FEE_CENTS, method, recordedBy: admin.id });
  revalidatePath("/admin");
}

/* --------------------------- Controllo all'ingresso ------------------------ */

export type CheckinResult =
  | { status: "invalid" }
  | {
      status: "ok" | "already" | "refused";
      reason: string;
      name: string;
      cardNumber: string | null;
      birthYear: string;
      paidUntil: string | null;
    };

export async function checkinAction(token: string, eventSlug: string): Promise<CheckinResult> {
  const staff = await requireAdmin();
  const v = await verifyCardToken(token);
  if (v.reason === "invalid" || !("member" in v)) return { status: "invalid" };
  const base = {
    reason: v.reason,
    name: `${v.member.first_name} ${v.member.last_name}`,
    cardNumber: v.member.card_number,
    birthYear: v.member.birth_date.slice(0, 4),
    paidUntil: v.member.paid_until,
  };
  if (!v.ok) return { status: "refused", ...base };
  const fresh = await recordCheckin(v.member.id, eventSlug || "ingresso-generico", staff.id);
  return { status: fresh ? "ok" : "already", ...base };
}

/** Ingresso con il numero di tessera, se il socio non riesce a mostrare il QR. */
export async function checkinByNumberAction(cardNumber: string, eventSlug: string): Promise<CheckinResult> {
  await requireAdmin();
  const { findMemberByCardNumber } = await import("@/lib/server/members");
  const { cardToken } = await import("@/lib/server/card");
  const member = await findMemberByCardNumber(cardNumber);
  if (!member) return { status: "invalid" };
  return checkinAction(cardToken(member.id), eventSlug);
}
