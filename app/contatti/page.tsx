import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { social } from "@/data/itacaData";

export const metadata: Metadata = { title: "Contatti" };

const contacts = [
  { label: "Informazioni", value: "info@itacasociety.com", note: "Collaborazioni, stampa, partner e richieste generali" },
  { label: "Soci e tesseramento", value: "soci@itacasociety.com", note: "Domande di ammissione, quote, tessera digitale" },
  { label: "Dove", value: "Pietrasanta · Versilia", note: "I luoghi degli incontri vengono comunicati ai soci" },
  { label: "Instagram", value: `@${social.instagram.handle}`, note: "Immagini, annunci e retroscena degli incontri", href: social.instagram.url },
];

export default function ContactsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contatti"
        title={<>Scriveteci, con calma</>}
        intro="Rispondiamo a ogni messaggio personalmente. Per la tessera e le presenze è disponibile l'Area Soci."
      />
      <section className="py-16 sm:py-24">
        <div className="grid gap-px border-y border-linea bg-linea px-0 sm:grid-cols-2">
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06} className="bg-calce px-5 py-12 sm:px-8 lg:px-12">
              <p className="eyebrow text-ottone">{c.label}</p>
              {"href" in c && c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-5 block font-serif text-3xl hover:text-terracotta sm:text-4xl">
                  {c.value}
                </a>
              ) : (
                <p className="mt-5 font-serif text-3xl sm:text-4xl">{c.value}</p>
              )}
              <p className="mt-3 text-sm text-tortora">{c.note}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
