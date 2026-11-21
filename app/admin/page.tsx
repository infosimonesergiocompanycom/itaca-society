import type { Metadata } from "next";
import Link from "next/link";
import { approveAction, manualPaymentAction, rejectAction, suspendAction } from "@/app/actions";
import { requireAdmin } from "@/lib/server/auth";
import { formatFee, paymentMode } from "@/lib/server/config";
import { listMembers, memberStats, standing, standingLabel, type Standing } from "@/lib/server/members";
import { cn, shortDate } from "@/lib/format";

export const metadata: Metadata = { title: "Amministrazione", robots: { index: false } };

const FILTERS: { key: Standing | "all"; label: string }[] = [
  { key: "pending", label: "Da approvare" },
  { key: "awaiting_payment", label: "Quota da versare" },
  { key: "active", label: "Attivi" },
  { key: "expired", label: "Scaduti" },
  { key: "rejected", label: "Non accolte" },
  { key: "suspended", label: "Sospesi" },
  { key: "all", label: "Tutti" },
];

const btn = "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ stato?: string; q?: string }> }) {
  await requireAdmin();
  const { stato = "pending", q = "" } = await searchParams;
  const [all, stats] = await Promise.all([listMembers(), memberStats()]);
  const query = q.trim().toLowerCase();
  const rows = all
    .filter((m) => stato === "all" || standing(m) === stato)
    .filter((m) => !query || `${m.first_name} ${m.last_name} ${m.email} ${m.card_number ?? ""} ${m.fiscal_code}`.toLowerCase().includes(query));
  const fee = formatFee();

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-[1.9rem] font-semibold sm:text-[2.7rem]">Amministrazione</h1>
          <p className="mt-2 text-[0.9375rem] text-tortora">
            Domande di ammissione, libro soci e quote · pagamenti online: {paymentMode() === "stripe" ? "Stripe attivo" : paymentMode() === "demo" ? "modalità di prova" : "non attivi"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/ingressi" className="rounded-full bg-carbone px-5 py-2.5 text-[0.8125rem] font-semibold text-calce hover:bg-carbone/80">
            Controllo ingressi
          </Link>
          <a href="/admin/export" className="rounded-full border border-carbone px-5 py-2.5 text-[0.8125rem] font-semibold hover:bg-carbone hover:text-calce">
            Esporta libro soci (CSV)
          </a>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {(
          [
            ["Da approvare", stats.pending],
            ["Quota da versare", stats.awaiting_payment],
            ["Soci attivi", stats.active],
            ["Scaduti", stats.expired],
          ] as const
        ).map(([label, n]) => (
          <div key={label} className="bg-nebbia px-5 py-4">
            <p className="font-serif text-4xl">{n}</p>
            <p className="text-sm text-tortora">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <nav className="no-scrollbar flex gap-2 overflow-x-auto" aria-label="Filtra per stato">
          {FILTERS.map((f) => (
            <Link
              key={f.key}
              href={`/admin?stato=${f.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] font-medium",
                stato === f.key ? "border-carbone bg-carbone text-calce" : "border-carbone/30 hover:border-carbone",
              )}
            >
              {f.label}
              {f.key !== "all" && ` · ${stats[f.key]}`}
            </Link>
          ))}
        </nav>
        <form className="flex items-center gap-2">
          <input type="hidden" name="stato" value={stato} />
          <input name="q" defaultValue={q} placeholder="Cerca nome, email, tessera…" className="field mt-0 w-64 py-2 text-sm" />
        </form>
      </div>

      <div className="mt-6 overflow-x-auto border-t border-carbone">
        <table className="w-full min-w-[880px] text-left text-[0.875rem]">
          <thead className="text-tortora">
            <tr className="border-b border-linea">
              <th className="py-3 pr-4 font-medium">Socio</th>
              <th className="py-3 pr-4 font-medium">Dati</th>
              <th className="py-3 pr-4 font-medium">Tessera</th>
              <th className="py-3 pr-4 font-medium">Stato</th>
              <th className="py-3 font-medium">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-tortora">
                  Nessun socio in questa lista.
                </td>
              </tr>
            )}
            {rows.map((m) => {
              const s = standing(m);
              return (
                <tr key={m.id} className="border-b border-linea align-top">
                  <td className="py-4 pr-4">
                    <p className="font-medium">
                      {m.first_name} {m.last_name}
                      {m.role === "admin" && <span className="ml-2 rounded-full bg-nebbia px-2 py-0.5 text-xs">admin</span>}
                    </p>
                    <p className="text-tortora">{m.email}</p>
                    {m.phone && <p className="text-tortora">{m.phone}</p>}
                    <p className="mt-1 text-xs text-tortora">Domanda del {shortDate(m.created_at.slice(0, 10))}</p>
                  </td>
                  <td className="py-4 pr-4">
                    <p>{m.fiscal_code}</p>
                    <p className="text-tortora">
                      Nato/a il {shortDate(m.birth_date)} a {m.birth_place}
                    </p>
                    <p className="text-tortora">
                      {m.address}, {m.city}
                    </p>
                    {m.interests && <p className="mt-1 text-xs text-tortora">Interessi: {m.interests}</p>}
                    {m.motivation && <p className="mt-1 max-w-xs text-xs italic text-tortora">«{m.motivation}»</p>}
                  </td>
                  <td className="py-4 pr-4">
                    <p>{m.card_number ?? "—"}</p>
                    {m.paid_until && <p className="text-tortora">fino al {shortDate(m.paid_until)}</p>}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-medium",
                        s === "active" ? "bg-[#3d6b4f] text-calce" : s === "pending" ? "bg-pesca" : "bg-nebbia",
                      )}
                    >
                      {standingLabel[s]}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-2">
                      {(s === "pending" || s === "rejected" || s === "suspended") && (
                        <form action={approveAction}>
                          <input type="hidden" name="id" value={m.id} />
                          <button className={cn(btn, "border-carbone bg-carbone text-calce hover:bg-carbone/80")}>
                            {s === "pending" ? "Approva" : "Riammetti"}
                          </button>
                        </form>
                      )}
                      {s === "pending" && (
                        <form action={rejectAction}>
                          <input type="hidden" name="id" value={m.id} />
                          <button className={cn(btn, "border-carbone/40 hover:border-carbone")}>Respingi</button>
                        </form>
                      )}
                      {(s === "awaiting_payment" || s === "expired" || s === "active") && (
                        <>
                          <form action={manualPaymentAction}>
                            <input type="hidden" name="id" value={m.id} />
                            <input type="hidden" name="method" value="cash" />
                            <button className={cn(btn, "border-carbone/40 hover:border-carbone")}>Quota in contanti · {fee}</button>
                          </form>
                          <form action={manualPaymentAction}>
                            <input type="hidden" name="id" value={m.id} />
                            <input type="hidden" name="method" value="transfer" />
                            <button className={cn(btn, "border-carbone/40 hover:border-carbone")}>Bonifico ricevuto</button>
                          </form>
                        </>
                      )}
                      {(s === "active" || s === "awaiting_payment" || s === "expired") && (
                        <form action={suspendAction}>
                          <input type="hidden" name="id" value={m.id} />
                          <button className={cn(btn, "border-carbone/40 text-tortora hover:border-carbone")}>Sospendi</button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
