import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "Privacy" };

const sections = [
  {
    title: "Titolare del trattamento",
    text: "Itaca Society, associazione culturale con sede a Pietrasanta (LU). Per ogni richiesta relativa ai dati personali, compresa la revoca dei consensi, è possibile scrivere a info@itacasociety.com.",
  },
  {
    title: "Dati raccolti",
    text: "Raccogliamo i dati che ci fornisci con la domanda di ammissione e l'iscrizione alla newsletter: dati anagrafici, codice fiscale, residenza e recapiti, oltre agli interessi che scegli di condividere. Registriamo inoltre i pagamenti della quota, le presenze agli eventi e le scelte che fai sui consensi facoltativi. I dati della carta di pagamento sono gestiti esclusivamente da Stripe e non transitano dai nostri sistemi.",
  },
  {
    title: "Gestione del rapporto associativo",
    text: "I dati servono a valutare la domanda di ammissione, a tenere il libro soci e a gestire quote, tessere e accessi agli eventi. La base giuridica è il rapporto associativo che instauri con la domanda di ammissione e gli obblighi di legge connessi (art. 6, par. 1, lett. b e c del Regolamento UE 2016/679). Senza questi dati non è possibile associarsi.",
  },
  {
    title: "Comunicazioni promozionali (facoltativo)",
    text: "Solo se ci dai il consenso specifico, usiamo email, telefono e interessi per inviarti comunicazioni promozionali su eventi, iniziative e attività dell'associazione, anche realizzate insieme a sponsor e partner. La base giuridica è il tuo consenso (art. 6, par. 1, lett. a). Il consenso è facoltativo e non incide sull'ammissione.",
  },
  {
    title: "Comunicazione dei dati a sponsor e partner (facoltativo)",
    text: "Solo se ci dai un secondo consenso, distinto dal precedente, comunichiamo nome, cognome, email, telefono, comune di residenza e interessi a sponsor e partner di Itaca Society, che potranno contattarti per proprie finalità promozionali nei settori cultura, eventi, enogastronomia, benessere e lifestyle. Gli sponsor agiscono come autonomi titolari del trattamento e ti forniranno la propria informativa al primo contatto. Non comunichiamo mai codice fiscale, data di nascita, indirizzo, presenze o dati di pagamento. L'elenco aggiornato degli sponsor a cui sono stati comunicati i dati è disponibile su richiesta.",
  },
  {
    title: "Revoca dei consensi",
    text: "Puoi dare o revocare ciascun consenso in qualsiasi momento, gratuitamente, dalla sezione «Privacy e consensi» della tua Area Soci oppure scrivendo a info@itacasociety.com. La revoca vale per il futuro e non pregiudica la liceità dei trattamenti già effettuati. Registriamo data e versione di ogni consenso dato o revocato per poterne dare prova.",
  },
  {
    title: "Conservazione e diritti",
    text: "Conserviamo i dati del rapporto associativo per il tempo necessario e per gli obblighi di legge; i dati usati a fini promozionali fino alla revoca del consenso. Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione, portabilità e opposizione al trattamento, e proporre reclamo al Garante per la protezione dei dati personali, secondo il Regolamento (UE) 2016/679.",
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
