/** Formattazione date deterministica (identica su server e client). */
const MONTHS = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];
const MONTHS_SHORT = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
const WEEKDAYS = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  // Calcolo del giorno della settimana in UTC per evitare scarti di fuso
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { y, m, d, weekday };
}

export function dateParts(iso: string) {
  const { y, m, d, weekday } = parse(iso);
  return {
    day: String(d).padStart(2, "0"),
    month: MONTHS[m - 1],
    monthShort: MONTHS_SHORT[m - 1],
    weekday: WEEKDAYS[weekday],
    year: String(y),
  };
}

export function longDate(iso: string) {
  const p = dateParts(iso);
  return `${p.weekday} ${Number(p.day)} ${p.month} ${p.year}`;
}

export function shortDate(iso: string) {
  const p = dateParts(iso);
  return `${Number(p.day)} ${p.month} ${p.year}`;
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
