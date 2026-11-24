import { adminEmails } from "./config";

/**
 * Invio delle email automatiche. Funziona con uno dei due servizi, scelto dalle variabili d'ambiente:
 * - RESEND_API_KEY (servizio Resend), oppure
 * - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD (per esempio la casella soci@ su Serverplan).
 * Senza configurazione le email non partono e il sito funziona come prima.
 */
export type Mail = { to: string | string[]; subject: string; text: string; html: string; replyTo?: string };

export function mailFrom(): string {
  return process.env.MAIL_FROM || "Itaca Society <soci@itacasociety.com>";
}

/** Chi riceve gli avvisi per la segreteria: NOTIFY_EMAILS, oppure gli indirizzi amministratori. */
export function notifyEmails(): string[] {
  const list = (process.env.NOTIFY_EMAILS ?? "").split(",").map((e) => e.trim()).filter(Boolean);
  return list.length > 0 ? list : adminEmails();
}

export function mailProvider(): "resend" | "smtp" | null {
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) return "smtp";
  return null;
}

export async function sendMail(mail: Mail): Promise<boolean> {
  const to = Array.isArray(mail.to) ? mail.to : [mail.to];
  if (to.length === 0) return false;
  const provider = mailProvider();
  if (!provider) {
    console.info(`[email non inviata: servizio non configurato] ${mail.subject} → ${to.length} destinatari`);
    return false;
  }
  try {
    if (provider === "resend") {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: mailFrom(), to, subject: mail.subject, text: mail.text, html: mail.html, reply_to: mail.replyTo }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return true;
    }
    const nodemailer = await import("nodemailer");
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });
    await transport.sendMail({ from: mailFrom(), to, subject: mail.subject, text: mail.text, html: mail.html, replyTo: mail.replyTo });
    return true;
  } catch (err) {
    // Un'email non partita non deve mai bloccare iscrizioni, approvazioni o pagamenti
    console.error("[email non inviata]", mail.subject, err);
    return false;
  }
}
