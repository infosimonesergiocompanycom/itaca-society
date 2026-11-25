import type { Member } from "./members";
import { formatFee, siteUrl } from "./config";
import { notifyEmails, sendMail } from "./mail";
import { bankTransfer } from "@/data/itacaData";
import { paymentReason } from "@/lib/payment-reason";
import { longDate } from "@/lib/format";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Impaginazione comune: fondo bianco, Georgia come ripiego di Newsreader, una sola azione. */
function layout(title: string, paragraphs: string[], action?: { label: string; href: string }, rows?: [string, string][]) {
  const table = rows
    ? `<table role="presentation" style="width:100%;border-collapse:collapse;margin:20px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #e4e1dc;color:#5d5755;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #e4e1dc;color:#231f20">${esc(v)}</td></tr>`,
        )
        .join("")}</table>`
    : "";
  const button = action
    ? `<p style="margin:28px 0"><a href="${esc(action.href)}" style="display:inline-block;background:#231f20;color:#ffffff;text-decoration:none;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase">${esc(action.label)}</a></p>`
    : "";
  return `<!doctype html><html lang="it"><body style="margin:0;background:#ffffff;color:#231f20">
<div style="max-width:560px;margin:0 auto;padding:40px 24px;font-family:Georgia,'Times New Roman',serif">
<p style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;margin:0 0 24px"><span style="color:#b5613a">/</span> Itaca Society</p>
<h1 style="font-weight:400;font-size:28px;line-height:1.15;margin:0 0 20px">${esc(title)}</h1>
${paragraphs.map((p) => `<p style="font-size:16px;line-height:1.5;margin:0 0 14px">${esc(p)}</p>`).join("")}
${table}${button}
<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#5d5755;border-top:1px solid #e4e1dc;padding-top:16px;margin-top:32px">Itaca Society · Associazione culturale · Pietrasanta (LU) · «live the journey»</p>
</div></body></html>`;
}

function plain(title: string, paragraphs: string[], action?: { label: string; href: string }, rows?: [string, string][]) {
  return [title, "", ...paragraphs, ...(rows ? ["", ...rows.map(([k, v]) => `${k}: ${v}`)] : []), ...(action ? ["", `${action.label}: ${action.href}`] : []), "", "Itaca Society · Pietrasanta (LU)"].join("\n");
}

function build(title: string, paragraphs: string[], action?: { label: string; href: string }, rows?: [string, string][]) {
  return { html: layout(title, paragraphs, action, rows), text: plain(title, paragraphs, action, rows) };
}

/** Alla segreteria: è arrivata una nuova domanda di ammissione. */
export async function notifyNewApplication(m: Member) {
  const title = "Nuova domanda di ammissione";
  const body = build(
    title,
    [`${m.first_name} ${m.last_name} ha chiesto di diventare socio di Itaca Society. La domanda attende la decisione del Consiglio Direttivo.`],
    { label: "Apri le domande da approvare", href: `${siteUrl()}/admin?stato=pending` },
    [
      ["Nome", `${m.first_name} ${m.last_name}`],
      ["Email", m.email],
      ["Comune", m.city],
      ...(m.phone ? ([["Telefono", m.phone]] as [string, string][]) : []),
      ...(m.interests ? ([["Interessi", m.interests]] as [string, string][]) : []),
    ],
  );
  return sendMail({ to: notifyEmails(), subject: `Nuova domanda: ${m.first_name} ${m.last_name}`, replyTo: m.email, ...body });
}

/** Al socio: la domanda è stata accolta, con le istruzioni per versare la quota. */
export async function notifyApproved(m: Member) {
  const body = build(
    `Benvenuto in Itaca Society, ${m.first_name}`,
    [
      "Il Consiglio Direttivo ha accolto la tua domanda di ammissione.",
      `Per attivare la tessera digitale versa la quota associativa di ${formatFee()} con un bonifico, usando esattamente la causale qui sotto. Appena registriamo il versamento, la tessera si attiva nella tua Area Soci.`,
    ],
    { label: "Vai alla tua Area Soci", href: `${siteUrl()}/area-soci` },
    [
      ["Numero di tessera", m.card_number ?? "—"],
      ["Intestatario", `${bankTransfer.beneficiary} · ${bankTransfer.bank}`],
      ["IBAN", bankTransfer.iban.replace(/(.{4})/g, "$1 ").trim()],
      ["Importo", formatFee()],
      ["Causale", paymentReason(m)],
    ],
  );
  return sendMail({ to: m.email, subject: "La tua domanda è stata accolta", ...body });
}

/** Al socio: quota registrata, tessera attiva. */
export async function notifyActivated(m: Member) {
  const body = build(
    "La tua tessera è attiva",
    [
      `Ciao ${m.first_name}, abbiamo registrato la tua quota associativa. La tessera digitale è attiva: la trovi nella tua Area Soci, con il codice QR da mostrare all'ingresso di ogni incontro.`,
    ],
    { label: "Apri la tessera", href: `${siteUrl()}/area-soci` },
    [
      ["Numero di tessera", m.card_number ?? "—"],
      ["Valida fino al", m.paid_until ? longDate(m.paid_until) : "—"],
    ],
  );
  return sendMail({ to: m.email, subject: "La tua tessera Itaca Society è attiva", ...body });
}

/** Al socio: link per scegliere una nuova password. */
export async function sendPasswordReset(m: Member, token: string, ttlMinutes: number) {
  const link = `${siteUrl()}/password-reset?t=${encodeURIComponent(token)}`;
  const body = build(
    "Reimposta la tua password",
    [
      `Ciao ${m.first_name}, abbiamo ricevuto una richiesta per reimpostare la password del tuo account Itaca Society.`,
      `Il link qui sotto vale ${ttlMinutes} minuti e si può usare una sola volta. Se non sei stato tu a chiederlo, ignora questa email: la tua password resta quella di prima.`,
    ],
    { label: "Scegli una nuova password", href: link },
  );
  return sendMail({ to: m.email, subject: "Reimposta la password di Itaca Society", ...body });
}
