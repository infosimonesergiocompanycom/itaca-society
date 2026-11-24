import Link from "next/link";
import { brand, footerColumns } from "@/data/itacaData";
import { BrandMark } from "@/components/ui/Logo";
import { LetterForm } from "./LetterForm";

/** Chiusura di ogni pagina: invito alle Lettere da Itaca, poi marchio, colonne di link e contatti. */
export function Footer() {
  return (
    <>
      <section className="px-5 pb-24 pt-8 sm:px-16 sm:pb-32 sm:pt-16" aria-labelledby="lettere-titolo">
        <h2 id="lettere-titolo" className="mx-auto max-w-3xl text-center text-[2.1rem] leading-[1.05] sm:text-[3.2rem]">
          Le date dei prossimi incontri, direttamente nella tua casella.
        </h2>
        <LetterForm />
      </section>

      <footer className="border-t border-carbone/15 px-5 pb-10 pt-16 sm:px-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] lg:gap-12">
          <div className="col-span-2 max-w-xs lg:col-span-1">
            <BrandMark tone="ink" width={120} />
            <p className="mt-6 text-[0.8rem] leading-relaxed text-tortora">{brand.positioning}</p>
          </div>
          {footerColumns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <ul className="space-y-4">
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-[0.7rem] font-medium uppercase tracking-[0.12em] hover:text-terracotta">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 text-[0.68rem] uppercase tracking-[0.12em] text-tortora">
          <a href="mailto:info@itacasociety.com" className="hover:text-terracotta">
            info@itacasociety.com
          </a>
          <p className="normal-case tracking-normal">Itaca Society 2026 · Associazione culturale · Pietrasanta (LU) · «live the journey»</p>
        </div>
      </footer>
    </>
  );
}
