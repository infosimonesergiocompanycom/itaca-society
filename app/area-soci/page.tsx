import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/data/itacaData";
import { logoutAction, startPaymentAction } from "@/app/actions";
import { requireMember } from "@/lib/server/auth";
import { cardQrSvg } from "@/lib/server/card";
import { formatFee, paymentMode } from "@/lib/server/config";
import { checkinsFor, paymentsFor, standing, standingLabel, todayIso, type Standing } from "@/lib/server/members";
import { cn, dateParts, shortDate } from "@/lib/format";
import { PageTitle } from "@/components/house/HouseBlocks";
import { MemberCard } from "@/components/members/MemberCard";

export const metadata: Metadata = { title: "Area Soci", robots: { index: false } };

const STEPS: { key: Standing[]; label: string }[] = [
  { key: ["pending"], label: "Domanda inviata" },
  { key: ["awaiting_payment"], label: "Domanda approvata" },
  { key: ["active", "expired"], label: "Quota versata" },
];

const notices: Record<string, string> = {
  ok: "Pagamento ricevuto: la tua tessera è attiva. Benvenuto a Itaca.",
  annullato: "Il pagamento è stato annullato. Puoi riprovare quando vuoi.",
  attesa: "Il pagamento è in fase di conferma: la tessera si attiverà a breve. Ricarica la pagina tra qualche istante.",
  "non-attivo": "I pagamenti online non sono ancora attivi. Contatta la segreteria per versare la quota.",
};

function PayButton({ label }: { label: string }) {
  return (
    <form action={startPaymentAction}>
      <button
        type="submit"
        className="rounded-full bg-carbone px-6 py-3 text-[0.875rem] font-semibold text-calce transition-colors duration-300 hover:bg-carbone/80"
      >
        {label}
      </button>
    </form>
  );
}

export default async function MemberAreaPage({
  searchParams,
}: {
  searchParams: Promise<{ benvenuto?: string; pagamento?: string }>;
}) {
  const member = await requireMember();
  const params = await searchParams;
  const s = standing(member);
  const [payments, checkins] = await Promise.all([paymentsFor(member.id), checkinsFor(member.id)]);
  const qr = member.card_number && (s === "active" || s === "expired") ? await cardQrSvg(member.id) : null;
  const mode = paymentMode();
  const fee = formatFee();
  const today = todayIso();
  const upcoming = events.filter((e) => e.date >= today).slice(0, 6);
  const daysLeft = member.paid_until
    ? Math.round((Date.parse(member.paid_until) - Date.parse(today)) / 86_400_000)
    : null;
  const reached = STEPS.findIndex((st) => st.key.includes(s));

  return (
    <>
      <PageTitle title={`Ciao, ${member.first_name}`} />

      <div className="mt-12 px-4 pb-24 sm:px-6">
        {params.benvenuto && (
          <p className="mb-8 bg-travertino px-5 py-4 text-[0.9375rem]" role="status">
            Abbiamo ricevuto la tua domanda di ammissione. Il Consiglio Direttivo la esaminerà a breve: segui qui lo stato.
          </p>
        )}
        {params.pagamento && notices[params.pagamento] && (
          <p className="mb-8 bg-travertino px-5 py-4 text-[0.9375rem]" role="status">
            {notices[params.pagamento]}
          </p>
        )}

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Tessera o stato della domanda */}
          <section className="lg:col-span-5">
            {qr && member.card_number ? (
              <>
                <MemberCard
                  name={`${member.first_name} ${member.last_name}`}
                  number={member.card_number}
                  validUntil={member.paid_until}
                  active={s === "active"}
                  qrSvg={qr}
                />
                <p className="mx-auto mt-4 max-w-[380px] text-center text-sm text-tortora">
                  Mostra questa schermata all&apos;ingresso degli eventi. Consiglio: aggiungi la pagina alla schermata Home del telefono.
                </p>
              </>
            ) : (
              <div className="bg-nebbia p-8">
                <h2 className="text-[1.8rem]">La tua tessera</h2>
                <ol className="mt-6 space-y-3">
                  {STEPS.map((st, i) => (
                    <li key={st.label} className="flex items-center gap-3 text-[0.9375rem]">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs",
                          i < reached || (i === reached && s !== "pending" && s !== "awaiting_payment")
                            ? "border-carbone bg-carbone text-calce"
                            : i === reached
                              ? "border-carbone"
                              : "border-carbone/30 text-tortora",
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className={i <= reached ? "" : "text-tortora"}>{st.label}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 border-t border-linea pt-6 text-[0.9375rem] leading-relaxed">
                  {s === "pending" && <p>La tua domanda è in attesa di approvazione da parte del Consiglio Direttivo. Riceverai la tessera subito dopo il versamento della quota.</p>}
                  {s === "awaiting_payment" && (
                    <>
                      <p>
                        La tua domanda è stata approvata: benvenuto! Il numero della tua tessera è <strong>{member.card_number}</strong>. Versa la quota
                        associativa di {fee} per attivarla.
                      </p>
                      <div className="mt-6">
                        <PayButton label={`Paga ${fee} con carta`} />
                      </div>
                      {mode === "demo" && <p className="mt-3 text-xs text-tortora">Modalità di prova: nessun addebito reale.</p>}
                    </>
                  )}
                  {s === "rejected" && <p>La domanda non è stata accolta. Per chiarimenti scrivi a soci@itacasociety.com.</p>}
                  {s === "suspended" && <p>La tua tessera è sospesa. Per chiarimenti scrivi a soci@itacasociety.com.</p>}
                </div>
              </div>
            )}

            {(s === "expired" || (s === "active" && daysLeft !== null && daysLeft <= 30)) && (
              <div className="mx-auto mt-6 max-w-[380px] bg-travertino p-6 text-center">
                <p className="text-[0.9375rem]">
                  {s === "expired" ? "La tessera è scaduta." : `La tessera scade tra ${daysLeft} giorni.`} Rinnova per altri dodici mesi.
                </p>
                <div className="mt-4 flex justify-center">
                  <PayButton label={`Rinnova · ${fee}`} />
                </div>
              </div>
            )}
          </section>

          {/* Dettagli */}
          <div className="space-y-14 lg:col-span-6 lg:col-start-7">
            <section>
              <h2 className="text-[1.8rem]">I tuoi dati</h2>
              <dl className="mt-4 divide-y divide-linea border-y border-linea text-[0.9375rem]">
                {[
                  ["Stato", standingLabel[s]],
                  ["Numero tessera", member.card_number ?? "Assegnato all'approvazione"],
                  ["Nome", `${member.first_name} ${member.last_name}`],
                  ["Email", member.email],
                  ["Nascita", `${shortDate(member.birth_date)}, ${member.birth_place}`],
                  ["Codice fiscale", member.fiscal_code],
                  ["Residenza", `${member.address}, ${member.city}`],
                ].map(([k, val]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                    <dt className="text-tortora">{k}</dt>
                    <dd>{val}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-tortora">Per correggere i dati scrivi a soci@itacasociety.com.</p>
            </section>

            <section>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-[1.8rem]">Prossimi eventi</h2>
                <Link href="/eventi" className="text-[0.8125rem] font-semibold hover:underline hover:underline-offset-4">
                  Calendario completo
                </Link>
              </div>
              <ul className="mt-4 divide-y divide-linea border-y border-linea">
                {upcoming.map((e) => {
                  const d = dateParts(e.date);
                  const attended = checkins.some((c) => c.event_slug === e.slug);
                  return (
                    <li key={e.slug} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 py-3">
                      <span className="text-center">
                        <span className="block font-serif text-2xl leading-none">{d.day}</span>
                        <span className="text-xs">{d.monthShort}</span>
                      </span>
                      <span className="text-[0.9375rem]">
                        <span className="block font-medium">{e.title}</span>
                        <span className="text-sm text-tortora">
                          {e.place} · {e.time}
                        </span>
                      </span>
                      {attended && <span className="rounded-full bg-carbone px-3 py-1 text-xs text-calce">Presente</span>}
                    </li>
                  );
                })}
                {upcoming.length === 0 && <li className="py-4 text-[0.9375rem] text-tortora">Nuovi eventi in arrivo.</li>}
              </ul>
            </section>

            <section>
              <h2 className="text-[1.8rem]">Presenze e quote</h2>
              <div className="mt-4 grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Eventi a cui hai partecipato</p>
                  <ul className="mt-2 space-y-1 text-[0.9375rem]">
                    {checkins.length === 0 && <li className="text-tortora">Ancora nessuno.</li>}
                    {checkins.map((c) => (
                      <li key={c.event_slug}>
                        {events.find((e) => e.slug === c.event_slug)?.title ?? "Ingresso"} · {shortDate(c.created_at.slice(0, 10))}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium">Quote versate</p>
                  <ul className="mt-2 space-y-1 text-[0.9375rem]">
                    {payments.length === 0 && <li className="text-tortora">Nessun versamento.</li>}
                    {payments.map((p) => (
                      <li key={p.created_at}>
                        {formatFee(p.amount_cents)} · {shortDate(p.period_start)} – {shortDate(p.period_end)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-4 border-t border-linea pt-6">
              {member.role === "admin" && (
                <Link href="/admin" className="rounded-full border border-carbone px-5 py-2.5 text-[0.8125rem] font-semibold hover:bg-carbone hover:text-calce">
                  Amministrazione
                </Link>
              )}
              <form action={logoutAction}>
                <button type="submit" className="text-[0.8125rem] font-semibold underline underline-offset-4">
                  Esci
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
