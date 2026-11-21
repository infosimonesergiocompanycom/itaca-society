import { currentMember } from "@/lib/server/auth";
import { listMembers, standing, standingLabel } from "@/lib/server/members";

/** Esporta il libro soci in CSV (separatore ";" per Excel in italiano). */
export async function GET() {
  const me = await currentMember();
  if (!me || me.role !== "admin") return new Response("Non autorizzato", { status: 403 });

  const members = await listMembers();
  const header = [
    "Numero tessera", "Cognome", "Nome", "Codice fiscale", "Data di nascita", "Luogo di nascita",
    "Indirizzo", "Comune", "Email", "Telefono", "Stato", "Data ammissione", "Quota valida fino al", "Data domanda",
  ];
  const esc = (v: string | null | undefined) => {
    const s = String(v ?? "");
    return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = members.map((m) =>
    [
      m.card_number, m.last_name, m.first_name, m.fiscal_code, m.birth_date, m.birth_place, m.address, m.city,
      m.email, m.phone, standingLabel[standing(m)], m.approved_at?.slice(0, 10), m.paid_until, m.created_at.slice(0, 10),
    ].map(esc).join(";"),
  );
  const csv = "﻿" + [header.join(";"), ...lines].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="libro-soci-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
