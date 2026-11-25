"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { notifyActivated, notifyApproved, notifyNewApplication, sendPasswordReset } from "@/lib/server/emails";
import { consumeResetToken, createResetToken, RESET_TTL_MINUTES } from "@/lib/server/passwordReset";
import { redirect } from "next/navigation";
import { endSession, hashPassword, requireAdmin, requireMember, startSession, verifyPassword } from "@/lib/server/auth";
import { verifyCardToken } from "@/lib/server/card";
import { MEMBERSHIP_FEE_CENTS, paymentMode } from "@/lib/server/config";
import {
  approveMember,
  createMember,
  findMemberByEmail,
  findMemberById,
  recordCheckin,
  recordPayment,
  setConsents,
  setMemberStatus,
  standing,
} from "@/lib/server/members";
import { createCheckout } from "@/lib/server/payments";
import { subscribe, unsubscribe } from "@/lib/server/newsletter";

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
  if (fd.get("privacy") !== "on") e.privacy = "Conferma di aver letto l'informativa sulla privacy.";

  if (!e.email && (await findMemberByEmail(v.email))) {
    e.email = "Esiste già un account con questa email. Prova ad accedere.";
  }
  if (Object.keys(e).length > 0) {
    return {
      fieldErrors: e,
      values: { ...v, marketing: fd.get("marketing") === "on" ? "on" : "", sponsor: fd.get("sponsor") === "on" ? "on" : "" },
    };
  }

  const member = await createMember({
    ...v,
    passwordHash: await hashPassword(password),
    // Consensi facoltativi, mai preselezionati e indipendenti dall'ammissione
    marketingConsent: fd.get("marketing") === "on",
    sponsorConsent: fd.get("sponsor") === "on",
  });
  // Avviso alla segreteria dopo la risposta, senza rallentare l'iscrizione
  after(() => notifyNewApplication(member));
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

export async function logoutAction(fd?: FormData) {
  await endSession();
  const next = fd ? str(fd, "next") : "";
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/");
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
  const id = str(fd, "id");
  if (await approveMember(id, admin.id)) {
    after(async () => {
      const m = await findMemberById(id);
      if (m) await notifyApproved(m);
    });
  }
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
  const id = str(fd, "id");
  if (await recordPayment({ memberId: id, amountCents: MEMBERSHIP_FEE_CENTS, method, recordedBy: admin.id })) {
    after(async () => {
      const m = await findMemberById(id);
      if (m) await notifyActivated(m);
    });
  }
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

/* --------------------------- Consensi promozionali -------------------------- */

export async function updateConsentsAction(fd: FormData) {
  const member = await requireMember();
  await setConsents(member, { marketing: fd.get("marketing") === "on", sponsor: fd.get("sponsor") === "on" });
  revalidatePath("/area-soci");
  redirect("/area-soci?consensi=ok#consensi");
}

/* ------------------------------- Newsletter ------------------------------- */

export type NewsletterState = { status: "idle" | "done" | "error"; message?: string; email?: string };

export async function subscribeNewsletterAction(_prev: NewsletterState, fd: FormData): Promise<NewsletterState> {
  const email = str(fd, "email").toLowerCase();
  // campo esca: lo compilano solo i programmi automatici
  if (str(fd, "website")) return { status: "done" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return { status: "error", message: "Controlla l'indirizzo email.", email };
  }
  if (fd.get("consent") !== "on") {
    return { status: "error", message: "Per iscriverti serve il consenso a ricevere le lettere.", email };
  }
  try {
    await subscribe(email, "footer");
  } catch (err) {
    console.error("newsletter", err);
    return { status: "error", message: "Non è stato possibile completare l'iscrizione. Riprova tra poco.", email };
  }
  return { status: "done" };
}

export async function unsubscribeNewsletterAction(fd: FormData) {
  const token = str(fd, "t");
  const ok = token ? await unsubscribe(token) : false;
  redirect(`/newsletter/disiscrizione?t=${encodeURIComponent(token)}&esito=${ok ? "ok" : "errore"}`);
}

/* --------------------------- Password dimenticata -------------------------- */

export type ResetRequestState = { done?: boolean; error?: string; email?: string };

export async function requestPasswordResetAction(_prev: ResetRequestState, fd: FormData): Promise<ResetRequestState> {
  const email = str(fd, "email").toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Inserisci l'indirizzo email con cui ti sei registrato.", email };
  const created = await createResetToken(email);
  if (created) after(() => sendPasswordReset(created.member, created.token, RESET_TTL_MINUTES));
  // Stessa risposta in ogni caso, per non rivelare quali indirizzi sono registrati
  return { done: true, email };
}

export async function resetPasswordAction(_prev: FormState, fd: FormData): Promise<FormState> {
  const token = str(fd, "t");
  const password = String(fd.get("password") ?? "");
  const password2 = String(fd.get("password2") ?? "");
  const e: Record<string, string> = {};
  if (password.length < 8) e.password = "La password deve avere almeno 8 caratteri.";
  else if (password !== password2) e.password2 = "Le due password non coincidono.";
  if (Object.keys(e).length > 0) return { fieldErrors: e };
  const changedAt = Date.now();
  const memberId = await consumeResetToken(token, await hashPassword(password), changedAt);
  if (!memberId) return { error: "Il link non è più valido. Chiedine uno nuovo dalla pagina «Password dimenticata»." };
  await startSession(memberId);
  redirect("/area-soci?password=ok");
}
