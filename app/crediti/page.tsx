import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = { title: "Crediti fotografici" };

const territorio = [
  { soggetto: "Monte Procinto e Pania della Croce all'alba", autore: "9002Jack", licenza: "CC0 1.0", file: "Monte_Procinto_e_Pania_della_Croce.jpg" },
  { soggetto: "Il Monte Procinto e i suoi Bimbi", autore: "Brachistocrone 21", licenza: "CC BY-SA 4.0", file: "Bimbi_del_Procinto.jpg" },
  { soggetto: "La parete del Monte Procinto", autore: "Brachistocrone 21", licenza: "CC BY-SA 4.0", file: "Monte_Procinto_2022.jpg" },
  { soggetto: "Il Monte Forato, Alpi Apuane", autore: "Lorenzo Vannoni (Retignano)", licenza: "CC BY-SA 4.0", file: "Monte_Forato_(Alpi_Apuane),_panorama._Aprile_2017.jpg" },
  { soggetto: "Cava di marmo sopra Carrara", autore: "Ingo Mehling", licenza: "CC BY-SA 4.0", file: "Marble_Quarry_near_Carrera.jpg" },
  { soggetto: "Fronte di cava, marmo di Carrara", autore: "Wittylama", licenza: "CC BY-SA 4.0", file: "Carrara_marble_quarry_face.jpg" },
  { soggetto: "Tramonto a Marina di Pietrasanta", autore: "borto.jpg", licenza: "CC BY-SA 4.0", file: "Sunset_in_a_beach_in_Marina_di_Pietrasanta_2.jpg" },
  { soggetto: "Onde sulla battigia, Versilia", autore: "borto.jpg", licenza: "CC BY-SA 4.0", file: "Onde_del_Mare_sbattono_sulla_spiaggia_.jpg" },
  { soggetto: "Il pontile di Forte dei Marmi", autore: "Alex2015Genova", licenza: "CC BY-SA 4.0", file: "Pontile_Forte_dei_Marmi.jpg" },
];

const licenze: Record<string, string> = {
  "CC0 1.0": "https://creativecommons.org/publicdomain/zero/1.0/deed.it",
  "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/deed.it",
};

export default function CreditsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Note"
        title={<>Crediti fotografici</>}
        intro="Le fotografie di Itaca Society provengono dal nostro archivio. Per raccontare i luoghi del territorio usiamo anche immagini di autori che le hanno condivise con licenza libera: le citiamo qui, con gratitudine."
      />
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-[1.15rem] tracking-[0.14em]">Il territorio</h2>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-tortora">
            Da Wikimedia Commons. Le immagini sono state ridimensionate per il web; le versioni adattate restano soggette alla stessa licenza dell&apos;originale.
          </p>
          <ul className="mt-8 border-t border-linea">
            {territorio.map((c) => (
              <li key={c.file} className="grid gap-1 border-b border-linea py-5 text-[0.95rem] sm:grid-cols-[1fr_14rem_9rem] sm:gap-6">
                <a
                  href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(c.file)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {c.soggetto}
                </a>
                <span className="text-tortora">{c.autore}</span>
                <a href={licenze[c.licenza]} target="_blank" rel="noopener noreferrer" className="text-tortora hover:text-terracotta">
                  {c.licenza}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-16 text-[1.15rem] tracking-[0.14em]">Altre immagini</h2>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-tortora">
            Le fotografie dedicate ai temi delle serate (musica, libri, cinema, ceramica, benessere, convivio) provengono da{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="link-underline">
              Unsplash
            </a>{" "}
            e sono utilizzate secondo la relativa licenza.
          </p>
        </div>
      </section>
    </>
  );
}
