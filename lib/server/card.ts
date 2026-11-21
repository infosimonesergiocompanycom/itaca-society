import QRCode from "qrcode";
import { safeEqual, sign } from "./auth";
import { findMemberById, standing, type Member, type Standing } from "./members";

/**
 * Il QR della tessera contiene un codice firmato: "ITACA1.<id socio>.<firma>".
 * La firma (HMAC con AUTH_SECRET) impedisce di falsificare una tessera;
 * la validità viene sempre verificata in tempo reale sul database,
 * quindi una tessera scaduta o sospesa risulta subito non valida.
 */
const PREFIX = "ITACA1";

export function cardToken(memberId: string): string {
  return `${PREFIX}.${memberId}.${sign(memberId, "card")}`;
}

export async function cardQrSvg(memberId: string): Promise<string> {
  return QRCode.toString(cardToken(memberId), {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
    color: { dark: "#000000", light: "#00000000" },
  });
}

export type Verification =
  | { ok: false; reason: "invalid" }
  | { ok: boolean; reason: Standing; member: Pick<Member, "id" | "first_name" | "last_name" | "card_number" | "birth_date" | "paid_until"> };

export async function verifyCardToken(token: string): Promise<Verification> {
  const parts = token.trim().split(".");
  if (parts.length !== 3 || parts[0] !== PREFIX) return { ok: false, reason: "invalid" };
  const [, id, sig] = parts;
  if (!safeEqual(sig, sign(id, "card"))) return { ok: false, reason: "invalid" };
  const member = await findMemberById(id);
  if (!member) return { ok: false, reason: "invalid" };
  const s = standing(member);
  return {
    ok: s === "active",
    reason: s,
    member: {
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      card_number: member.card_number,
      birth_date: member.birth_date,
      paid_until: member.paid_until,
    },
  };
}
