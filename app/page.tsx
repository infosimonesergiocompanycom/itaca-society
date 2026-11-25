import Image from "next/image";
import Link from "next/link";
import { clubIntro, formats, introVideo, kavafis, manifesto, photos, publishedEvents } from "@/data/itacaData";
import { BrandMark } from "@/components/ui/Logo";
import { Carousel, HeroVideo, type Slide } from "@/components/home/Editorial";
import { todayIso } from "@/lib/server/members";
import { longDate } from "@/lib/format";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

const btn =
  "inline-block border px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300";

const fasi: Slide[] = [
  { title: "Musica", text: "Dischi ascoltati per intero, dal primo all'ultimo solco, e DJ set organici fino a tardi.", image: photos.djNotte, href: "/musica" },
  { title: "Talk", text: "Filosofia, cinema e letteratura: conversazioni che lasciano qualcosa, seguite da una cena.", image: photos.talk, href: "/eventi" },
  { title: "Wellness", text: "Respiro, meditazione e cammini all'alba, tra le Apuane e il mare d'inverno.", image: photos.yoga, href: "/eventi" },
  { title: "Arte", text: "Il marmo e la bottega: laboratori di scultura e fonderie artistiche di Pietrasanta.", image: photos.portico, href: "/eventi" },
  { title: "Convivio", text: "Una tavola unica, ospiti selezionati e la cura di ogni dettaglio, dall'aperitivo al fuoco.", image: photos.convivio, href: "/eventi" },
  { title: "Natura", text: "Il Procinto, il Monte Forato, la battigia di Marina: la Versilia a passo lento.", image: photos.battigia, href: "/eventi" },
];

const chapterImage: Record<string, string> = {
  "il-banchetto-di-itaca": photos.banchettoConsole,
  festival: photos.sax,
  "le-fasi-di-itaca": photos.scoglio,
};

/** Punto focale delle foto verticali nei capitoli a tutto schermo. */
const chapterFocus: Record<string, string> = { festival: "object-[50%_30%]" };

export default function HomePage() {
  const next = publishedEvents(todayIso())[0];

  return (
    <>
      {/* 1 · Copertina a tutto schermo */}
      <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-carbone">
        {introVideo ? (
          <HeroVideo {...introVideo} />
        ) : (
          <Image src={photos.controluce} alt="" fill priority sizes="100vw" quality={85} className="grade object-cover" />
        )}
        <div className={`absolute inset-0 ${introVideo ? "bg-carbone/30" : "bg-carbone/20"}`} aria-hidden />
        <div className="relative">
          <BrandMark tone="cream" width={300} priority />
        </div>
      </section>

      {/* 2 · Il prossimo incontro */}
      {next && (
        <section id="inizio" className="px-5 py-24 sm:px-16 sm:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden bg-nebbia lg:max-w-[560px]">
              <Image src={next.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="grade object-cover" />
            </div>
            <div className="max-w-md">
              <Label>Il prossimo incontro</Label>
              <h1 className="mt-6 font-serif text-[2.4rem] font-normal normal-case leading-[1.02] sm:text-[3.4rem]">{next.title.replace("Le Fasi di Itaca — ", "")}</h1>
              <p className="mt-6 font-serif text-[1.05rem] leading-snug">{next.excerpt}</p>
              <p className="mt-5 font-serif text-[1.05rem] leading-snug">
                {longDate(next.date)}
                {/^\d/.test(next.time) ? `, ore ${next.time}` : ""}
                <br />
                {next.place} · {next.room}
              </p>
              <Link href="/eventi" className={`${btn} mt-10 border-carbone/40 hover:border-carbone hover:bg-carbone hover:text-calce`}>
                Il calendario
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 3 · Il club */}
      <section className="px-5 pb-24 sm:px-16 sm:pb-40">
        <div className="border-t border-carbone/30 pt-5">
          <p className="text-[0.8rem] uppercase tracking-[0.06em]">Il club</p>
        </div>
        <h2 className="mt-14 font-sans text-[1.65rem] leading-[1.08] sm:ml-[25%] sm:text-[2.6rem]">«{clubIntro.quote}»</h2>
        <div className="mt-14 grid items-center gap-12 sm:mt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <div className="max-w-xl">
            <p className="font-serif text-[1.2rem] leading-[1.45] lg:text-[1.3rem]">{clubIntro.text}</p>
            <div className="mt-12">
              <Label>Visione</Label>
              <p className="mt-5 font-serif text-[1.2rem] italic leading-[1.45] lg:text-[1.3rem]">{clubIntro.vision}</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-nebbia lg:max-w-[560px]">
            <Image src={photos.mani} alt="Due soci si tengono per mano all'opening di Cala Marella" fill sizes="(min-width: 1024px) 560px, 100vw" className="grade object-cover" />
          </div>
        </div>
      </section>

      {/* 4 · Le Fasi di Itaca, carosello */}
      <section className="pb-24 sm:pb-40">
        <div className="px-5 sm:px-16">
          <Label>Le Fasi di Itaca</Label>
        </div>
        <div className="mt-8">
          <Carousel slides={fasi} label="Le Fasi di Itaca" />
        </div>
      </section>

      {/* 5 · I formati, capitoli scuri a tutto schermo */}
      <div className="space-y-2.5">
        {formats.map((f, i) => (
          <section key={f.slug} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-carbone px-5 py-24 text-center text-calce">
            <Image src={chapterImage[f.slug] ?? f.card} alt="" fill sizes="100vw" quality={85} className={`grade object-cover ${chapterFocus[f.slug] ?? ""}`} />
            <div className="absolute inset-0 bg-carbone/55" aria-hidden />
            <div className="relative max-w-xl">
              <Label>
                Formato {["I", "II", "III"][i]} · {f.role}
              </Label>
              <h2 className="mt-6 font-serif text-[2.6rem] font-normal normal-case leading-none sm:text-[4.4rem]">{f.name}</h2>
              <p className="mx-auto mt-10 max-w-md font-serif text-[1.05rem] leading-snug">{f.statement}.</p>
              <Link href={`/formati/${f.slug}`} className="mt-8 inline-block font-serif text-[1rem] italic underline underline-offset-4 hover:text-terracotta">
                Scopri il formato
              </Link>
            </div>
          </section>
        ))}
      </div>

      {/* 6 · Il nome */}
      <section className="px-5 py-24 sm:px-16 sm:py-40">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-nebbia lg:max-w-[560px]">
            <Image src={photos.piediPontile} alt="Piedi nudi che avanzano su un pontile di legno" fill sizes="(min-width: 1024px) 560px, 100vw" className="grade object-cover" />
          </div>
          <div className="mx-auto max-w-md text-center lg:self-center">
            <Label>{manifesto.eyebrow}</Label>
            <h2 className="mt-6 font-serif text-[2.6rem] font-normal normal-case leading-none sm:text-[3.4rem]">{manifesto.title}</h2>
            <p className="mt-10 font-serif text-[1.05rem] italic leading-snug">«{kavafis.opening}»</p>
            <p className="mt-2 text-[0.75rem] uppercase tracking-[0.12em] text-tortora">{kavafis.source}</p>
            <p className="mt-8 font-serif text-[1.05rem] leading-snug">{manifesto.paragraphs[1]}</p>
            <Link href="/il-club" className="mt-6 inline-block font-serif text-[1rem] italic underline underline-offset-4 hover:text-terracotta">
              Leggi il manifesto
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
