/**
 * Verifica del codice fiscale italiano (persone fisiche), secondo il D.M. 23/12/1976:
 * struttura, carattere di controllo, coerenza con cognome, nome e data di nascita.
 * Gestisce l'omocodia (cifre sostituite da lettere). Il sesso non viene chiesto,
 * quindi per il giorno di nascita si accettano entrambe le codifiche (giorno o giorno + 40).
 */

const MONTHS = "ABCDEHLMPRST";
const OMO = "LMNPQRSTUV"; // lettere che sostituiscono 0-9 nei casi di omocodia
const OMO_POSITIONS = [6, 7, 9, 10, 12, 13, 14]; // posizioni (da 0) che possono essere omocodiche

const ODD: Record<string, number> = {
  "0": 1, "1": 0, "2": 5, "3": 7, "4": 9, "5": 13, "6": 15, "7": 17, "8": 19, "9": 21,
  A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18, N: 20,
  O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23,
};
const even = (c: string) => (/\d/.test(c) ? Number(c) : c.charCodeAt(0) - 65);

export function normalizeCf(cf: string): string {
  return cf.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function checkChar(first15: string): string {
  let sum = 0;
  for (let i = 0; i < 15; i++) sum += i % 2 === 0 ? ODD[first15[i]] : even(first15[i]);
  return String.fromCharCode(65 + (sum % 26));
}

/** Riporta a cifre le posizioni omocodiche. */
function deOmocode(cf: string): string {
  const chars = cf.split("");
  for (const p of OMO_POSITIONS) {
    const i = OMO.indexOf(chars[p]);
    if (i >= 0) chars[p] = String(i);
  }
  return chars.join("");
}

const letters = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
const consonants = (s: string) => s.replace(/[AEIOU]/g, "");
const vowels = (s: string) => s.replace(/[^AEIOU]/g, "");

export function surnameCode(lastName: string): string {
  const s = letters(lastName);
  return (consonants(s) + vowels(s) + "XXX").slice(0, 3);
}

export function nameCode(firstName: string): string {
  const s = letters(firstName);
  const c = consonants(s);
  if (c.length >= 4) return c[0] + c[2] + c[3];
  return (c + vowels(s) + "XXX").slice(0, 3);
}

export type CfCheck = { ok: true } | { ok: false; reason: "format" | "check" | "date" | "surname" | "name"; message: string };

export function verifyCf(input: { fiscalCode: string; firstName: string; lastName: string; birthDate: string }): CfCheck {
  const cf = normalizeCf(input.fiscalCode);
  const shape = /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/;
  if (!shape.test(cf)) return { ok: false, reason: "format", message: "Il codice fiscale non ha un formato valido: controlla di averlo copiato per intero." };
  if (checkChar(cf.slice(0, 15)) !== cf[15]) return { ok: false, reason: "check", message: "Il codice fiscale contiene un errore di battitura: l'ultimo carattere non torna." };

  if (surnameCode(input.lastName) !== cf.slice(0, 3))
    return { ok: false, reason: "surname", message: "Il codice fiscale non corrisponde al cognome indicato." };
  if (nameCode(input.firstName) !== cf.slice(3, 6))
    return { ok: false, reason: "name", message: "Il codice fiscale non corrisponde al nome indicato." };

  const plain = deOmocode(cf);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.birthDate);
  if (m) {
    const [, y, mo, d] = m;
    const yy = plain.slice(6, 8);
    const month = MONTHS.indexOf(plain[8]) + 1;
    const day = Number(plain.slice(9, 11));
    const dayOk = day === Number(d) || day === Number(d) + 40;
    if (yy !== y.slice(2) || month !== Number(mo) || !dayOk)
      return { ok: false, reason: "date", message: "Il codice fiscale non corrisponde alla data di nascita indicata." };
  }
  return { ok: true };
}
