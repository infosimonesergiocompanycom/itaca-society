import type { Metadata } from "next";
import { admission, faqs, photos } from "@/data/itacaData";
import { ColorBlock, PageTitle, StatementBand } from "@/components/house/HouseBlocks";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tesseramento",
  description: "Come diventare socio di Itaca Society: registrazione online, approvazione del Consiglio Direttivo, quota di 10 € l'anno e tessera digitale.",
};

export default function MembershipPage() {
  return (
    <>
      <PageTitle
        eyebrow="Quota associativa 10 € l'anno"
        title="Tesseramento"
        image={photos.mani}
        tabs={[
          { label: "La tessera", href: "#tessera" },
          { label: "Come funziona", href: "#passaggi" },
          { label: "Domande frequenti", href: "#faq" },
        ]}
      />

      <StatementBand
        id="tessera"
        statement="Itaca Society è un'associazione culturale: con la tessera partecipi a incontri, ascolti, laboratori e cammini, e contribuisci a sostenerli"
        body="La quota associativa vale dodici mesi e comprende l'accesso a tutte le attività riservate ai soci. La tessera è digitale: la trovi nella tua Area Soci e la mostri dal telefono all'ingresso di ogni evento."
        fee="Quota associativa: 10 € l'anno"
        primary={{ label: "Diventa socio", href: "/diventa-socio" }}
        secondary={{ label: "Accedi", href: "/accedi" }}
      />

      <section id="passaggi" className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-[1.9rem] sm:text-[2.6rem]">Come funziona</h2>
        <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {admission.map((a, i) => (
            <li key={a.step} className="border-t border-carbone pt-4">
              <Reveal delay={i * 0.06}>
                <p className="font-serif text-3xl">{a.step}</p>
                <h3 className="mt-3 font-sans text-[0.9375rem] font-medium">{a.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{a.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <ColorBlock
        title="La tessera digitale"
        text="Nome, numero di tessera, scadenza e un codice QR firmato. All'ingresso lo staff lo inquadra con il telefono: la verifica è immediata e la presenza viene registrata."
        image={photos.luceOmbra}
        cta={{ label: "Registrati", href: "/diventa-socio" }}
      />

      <section id="faq" className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="text-[1.9rem] sm:text-[2.6rem] lg:col-span-4">Domande frequenti</h2>
          <div className="lg:col-span-8">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
