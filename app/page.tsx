import { introVideo, photos } from "@/data/itacaData";
import { Intro } from "@/components/wilde/Intro";
import { CardSlider } from "@/components/wilde/CardSlider";
import { ApplyBand, Feature, Hero, ImageBand, Split } from "@/components/wilde/Blocks";

const fasi = [
  { title: "Musica", subtitle: "Ascolti e DJ set organici", image: photos.vinile, href: "/eventi" },
  { title: "Talk", subtitle: "Conoscenza, mai di riempimento", image: photos.biblioteca, href: "/eventi" },
  { title: "Wellness", subtitle: "Corpo, mente, respiro", image: photos.campana, href: "/eventi" },
  { title: "Arte", subtitle: "Il marmo e la bottega", image: photos.marmoParete, href: "/eventi" },
  { title: "Convivio", subtitle: "La tavola condivisa", image: photos.piatto, href: "/eventi" },
  { title: "Natura", subtitle: "Il mare e le Apuane", image: photos.procinto, href: "/eventi" },
];

export default function HomePage() {
  return (
    <>
      <Intro targetId="inizio" video={introVideo} />

      <Hero
        id="inizio"
        title={
          <>
            Una <em>comunità</em> classica nella Versilia di oggi
          </>
        }
        subtitle="Esperienze di benessere, arte e cultura per chi crede che ogni viaggio sia un ritorno a sé stesso."
        cta={{ label: "Scopri di più", href: "/il-club" }}
        image={photos.fuoco}
        alt="Una performer con un ventaglio di fuoco durante il Banchetto di Itaca"
      />

      <CardSlider
        title={
          <>
            <em>Le Fasi</em> di Itaca
          </>
        }
        viewAll={{ label: "Vedi tutti", href: "/eventi" }}
        cards={fasi}
      />

      <Feature
        title={
          <>
            <em>Il</em> Banchetto di Itaca
          </>
        }
        text="Un rito prima che un evento: il fuoco, il vino, la tavola condivisa. Una sera in tre atti, Aperitivo, Convivium e Symposion."
        cta={{ label: "Scopri di più", href: "/formati/il-banchetto-di-itaca" }}
        images={[photos.piatto, photos.tamburo]}
      />

      <Split
        title={<em>Tesseramento</em>}
        text="Itaca Society è un'associazione culturale aperta a chi ne condivide lo spirito. La tessera associativa costa 20 € l'anno ed è digitale: la mostri dal telefono a ogni evento."
        cta={{ label: "Come diventare socio", href: "/membership" }}
        image={photos.ombra}
        alt="Un'ombra con cappello su una parete calda"
      />

      <Feature
        title={
          <>
            <em>I</em> formati
          </>
        }
        text="Il Festival allarga, Le Fasi trattengono, il Banchetto consacra."
        cta={{ label: "Scopri di più", href: "/formati" }}
        images={[photos.ritratto, photos.mareScogli]}
      />

      <Split
        title={
          <>
            <em>Il</em> nome, il viaggio
          </>
        }
        text="Il nome viene dall'Odissea e dalla poesia di Kavafis: conta il cammino, con le esperienze vissute e i legami costruiti lungo la strada. Nasce a Pietrasanta, la «piccola Atene» della Versilia."
        cta={{ label: "Il manifesto", href: "/il-club" }}
        image={photos.vasi}
        alt="Vasi in pietra chiara su fondo scuro"
      />

      <ImageBand image={photos.marinaTramonto} alt="Il tramonto sulla spiaggia di Marina di Pietrasanta" />

      <ApplyBand note="Quota associativa 20 € l'anno · Tessera digitale valida 12 mesi" />
    </>
  );
}
