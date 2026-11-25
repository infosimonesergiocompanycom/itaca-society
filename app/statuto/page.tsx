import type { Metadata } from "next";
import Link from "next/link";
import { association, statuto } from "@/data/statuto";

export const metadata: Metadata = {
  title: "Statuto",
  description: "Lo statuto di Itaca Society Associazione Culturale: scopi, soci, organi e risorse dell'associazione.",
};

export default function StatutePage() {
  return (
    <>
      <section className="px-5 pb-12 pt-32 text-center sm:px-16 sm:pt-40">
        <p className="eyebrow">Il Club · Documenti</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-[2.6rem] leading-[1.02] sm:text-[3.6rem]">Statuto dell&apos;associazione</h1>
        <p className="mx-auto mt-6 max-w-xl font-serif text-[1.05rem] leading-snug text-tortora">
          {association.name}. Allegato «A» all&apos;{association.registration.charAt(0).toLowerCase() + association.registration.slice(1)}.
        </p>
      </section>

      <article className="mx-auto max-w-3xl px-5 pb-24 sm:px-6 sm:pb-32">
        <nav aria-label="Indice dello statuto" className="mb-14 border-y border-linea py-5">
          <ol className="grid gap-x-8 gap-y-2 text-[0.85rem] sm:grid-cols-2">
            {statuto.map((t, i) => (
              <li key={t.title}>
                <a href={`#titolo-${i + 1}`} className="hover:text-terracotta">
                  {t.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {statuto.map((t, i) => (
          <section key={t.title} id={`titolo-${i + 1}`} className="scroll-mt-24 border-t border-linea pt-10 first-of-type:border-t-0 first-of-type:pt-0 [&+section]:mt-14">
            <h2 className="text-[1.6rem] leading-tight sm:text-[2rem]">{t.title}</h2>
            <div className="mt-8 space-y-9">
              {t.blocks.map((b) => (
                <div key={b.article ?? b.paragraphs[0]} className="grid gap-3 sm:grid-cols-[6rem_1fr] sm:gap-6">
                  {b.article && <p className="eyebrow pt-1">{b.article}</p>}
                  <div className="space-y-3 font-serif text-[1.05rem] leading-relaxed">
                    {b.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {b.list && (
                      <ul className={/^[a-z]\)/.test(b.list[0]) ? "space-y-2" : "list-disc space-y-2 pl-5 marker:text-terracotta"}>
                        {b.list.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    )}
                    {b.after?.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-16 border-t border-linea pt-8 text-[0.9rem] text-tortora">
          <p>
            {association.name} · {association.address} · C.F. {association.fiscalCode} · P.IVA {association.vat}
          </p>
          <p className="mt-3">
            Trascrizione del testo registrato. L&apos;originale con le firme dei soci fondatori è conservato presso la sede ed è consultabile dai soci
            su richiesta a{" "}
            <a href="mailto:info@itacasociety.com" className="underline underline-offset-4">
              info@itacasociety.com
            </a>
            .
          </p>
          <p className="mt-6">
            <Link href="/diventa-socio" className="font-semibold text-carbone underline underline-offset-4">
              Diventa socio
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
