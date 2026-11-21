import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "Privacy" };

const sections = [
  {
    title: "Titolare del trattamento",
    text: "Itaca Society, associazione culturale con sede a Pietrasanta (LU). Per ogni richiesta relativa ai dati personali è possibile scrivere a info@itacasociety.com.",
  },
  {
    title: "Dati raccolti",
    text: "Raccogliamo i dati che ci fornisci con la domanda di ammissione e l'iscrizione alla newsletter: dati anagrafici, codice fiscale, residenza e recapiti, oltre agli interessi che scegli di condividere. Registriamo inoltre i pagamenti della quota e le presenze agli eventi. I dati della carta di pagamento sono gestiti esclusivamente da Stripe e non transitano dai nostri sistemi.",
  },
  {
    title: "Finalità",
    text: "I dati servono a valutare la domanda di ammissione, a tenere il libro soci, a gestire quote, tessere e accessi agli eventi e, con il tuo consenso, a inviarti le lettere da Itaca. Non cediamo dati a terzi per finalità commerciali.",
  },
  {
    title: "Conservazione e diritti",
    text: "Conserviamo i dati per il tempo necessario alle finalità indicate. Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione o limitazione del trattamento, secondo il Regolamento (UE) 2016/679.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Informativa" title={<>Privacy</>} intro="La discrezione è una delle nostre regole. Vale anche per i tuoi dati." />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-linea pt-8">
              <h2 className="text-3xl">{s.title}</h2>
              <p className="mt-4 text-[0.98rem] leading-[1.8] text-tortora">{s.text}</p>
            </div>
          ))}
          <p className="text-xs text-tortora">Ultimo aggiornamento: novembre 2026.</p>
        </div>
      </section>
    </>
  );
}
