import { currentMember } from "@/lib/server/auth";
import { listMembers, sponsorContacts, standing, standingLabel } from "@/lib/server/members";

const esc = (v: string | null | undefined) => {
  const s = String(v ?? "");
  return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function csvResponse(header: string[], rows: (string | null | undefined)[][], filename: string) {
  const csv = "﻿" + [header.join(";"), ...rows.map((r) => r.map(esc).join(";"))].join("\r\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

/**
 * Esportazioni in CSV (separatore ";" per Excel in italiano):
 * - senza parametri: libro soci completo, con lo stato dei consensi;
 * - ?tipo=sponsor: solo i soci che hanno acconsentito alla comunicazione dei dati a sponsor
 *   e partner, limitata ai dati indicati nel testo del consenso.
 */
export async function GET(req: Request) {
  const me = await currentMember();
  if (!me || me.role !== "admin") return new Response("Non autorizzato", { status: 403 });

  const date = new Date().toISOString().slice(0, 10);
  const yesNo = (b: boolean) => (b ? "Sì" : "No");

  if (new URL(req.url).searchParams.get("tipo") === "sponsor") {
    const contacts = await sponsorContacts();
    return csvResponse(
      ["Cognome", "Nome", "Email", "Telefono", "Comune", "Interessi", "Consenso sponsor dal"],
      contacts.map((m) => [m.last_name, m.first_name, m.email, m.phone, m.city, m.interests, m.sponsor_consent_at?.slice(0, 10)]),
      `contatti-sponsor-${date}.csv`,
    );
  }

  const members = await listMembers();
  return csvResponse(
    [
      "Numero tessera", "Cognome", "Nome", "Codice fiscale", "Data di nascita", "Luogo di nascita",
      "Indirizzo", "Comune", "Email", "Telefono", "Stato", "Data ammissione", "Quota valida fino al", "Data domanda",
      "Consenso promozioni", "Consenso sponsor",
    ],
    members.map((m) => [
      m.card_number, m.last_name, m.first_name, m.fiscal_code, m.birth_date, m.birth_place, m.address, m.city,
      m.email, m.phone, standingLabel[standing(m)], m.approved_at?.slice(0, 10), m.paid_until, m.created_at.slice(0, 10),
      yesNo(m.marketing_consent), yesNo(m.sponsor_consent),
    ]),
    `libro-soci-${date}.csv`,
  );
}
