import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand, footerColumns, formats, introVideo, kavafis, manifesto, photos, publishedEvents } from "@/data/itacaData";
import { BrandMark } from "@/components/ui/Logo";
import { Carousel, HeroVideo, LetterForm, TopBar, type Slide } from "@/components/scorpios/Client";
import { currentMember } from "@/lib/server/auth";
import { todayIso } from "@/lib/server/members";
import { longDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Anteprima · versione editoriale",
  robots: { index: false, follow: false },
};

/* Grana pellicola sopra le immagini scure, come nei video del riferimento */
const grain =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.66rem] font-medium uppercase tracking-[0.22em] ${light ? "text-calce" : "text-carbone"}`}>
      <span className="mr-2 text-terracotta">/</span>
      {children}
    </p>
  );
}

const btn =
  "inline-block border px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300";

const fasi: Slide[] = [
  { title: "Musica", text: "Dischi ascoltati per intero, dal primo all'ultimo solco, e DJ set organici fino a tardi.", image: photos.vinile, href: "/eventi" },
  { title: "Talk", text: "Filosofia, cinema e letteratura: conversazioni che lasciano qualcosa, seguite da una cena.", image: photos.biblioteca, href: "/eventi" },
  { title: "Wellness", text: "Respiro, meditazione e cammini all'alba, tra le Apuane e il mare d'inverno.", image: photos.campana, href: "/eventi" },
  { title: "Arte", text: "Il marmo e la bottega: laboratori di scultura e fonderie artistiche di Pietrasanta.", image: photos.marmoParete, href: "/eventi" },
  { title: "Convivio", text: "Una tavola unica, pochi ospiti e la cura di ogni dettaglio, dall'aperitivo al fuoco.", image: photos.piatto, href: "/eventi" },
  { title: "Natura", text: "Il Procinto, il Monte Forato, la battigia di Marina: la Versilia a passo lento.", image: photos.procinto, href: "/eventi" },
];

const chapterImage: Record<string, string> = {
  "il-banchetto-di-itaca": photos.fuoco,
  festival: photos.marinaTramonto,
  "le-fasi-di-itaca": photos.procintoAlba,
};

export default async function ScorpiosPreview() {
  const member = await currentMember().catch(() => null);
  const headerMember = member ? { firstName: member.first_name, role: member.role } : null;
  const next = publishedEvents(todayIso())[0];

  return (
    <div className="bg-calce text-carbone">
      {/* 1 · Copertina a tutto schermo */}
      <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-carbone">
        <TopBar member={headerMember} />
        {introVideo ? (
          <HeroVideo {...introVideo} />
        ) : (
          <Image src={photos.fuoco} alt="" fill priority sizes="100vw" className="grade scale-110 object-cover blur-[6px]" />
        )}
        <div className="absolute inset-0 bg-carbone/45" aria-hidden />
        <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: grain }} aria-hidden />
        <div className="relative">
          <BrandMark tone="cream" width={300} priority />
        </div>
      </section>

      {/* 2 · Il prossimo incontro */}
      {next && (
        <section className="px-5 py-24 sm:px-16 sm:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden bg-nebbia lg:max-w-[560px]">
              <Image src={next.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="grade object-cover" />
            </div>
            <div className="max-w-md">
              <Label>Il prossimo incontro</Label>
              <h1 className="mt-6 font-serif text-[2.4rem] font-normal normal-case leading-[1.02] sm:text-[3.4rem]">{next.title.replace("Le Fasi di Itaca — ", "")}</h1>
              <p className="mt-6 font-serif text-[1.05rem] leading-snug">{next.excerpt}</p>
              <p className="mt-5 font-serif text-[1.05rem] leading-snug">
                {longDate(next.date)}, ore {next.time}
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
        <h2 className="mt-14 text-[1.65rem] leading-[1.08] sm:ml-[25%] sm:text-[2.6rem]">
          Itaca Society è il luogo in cui le domande antiche diventano incontri: a tavola, in cammino, davanti al mare.
        </h2>
        <div className="mt-14 grid items-center gap-10 sm:mt-20 lg:grid-cols-[1fr_2.6fr] lg:gap-16">
          <p className="font-serif text-[1.3rem] leading-[1.3] lg:text-[1.45rem]">{brand.missionLong}</p>
          <div className="relative aspect-[16/10] overflow-hidden bg-nebbia">
            <Image src={photos.tamburo} alt="Percussioni al tramonto sulla spiaggia" fill sizes="(min-width: 1024px) 70vw, 100vw" className="grade object-cover" />
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
      <div className="space-y-2.5 bg-calce">
        {formats.map((f, i) => (
          <section key={f.slug} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-carbone px-5 py-24 text-center text-calce">
            <Image src={chapterImage[f.slug] ?? f.card} alt="" fill sizes="100vw" className="grade object-cover" />
            <div className="absolute inset-0 bg-carbone/55" aria-hidden />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: grain }} aria-hidden />
            <div className="relative max-w-xl">
              <Label light>
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
          <div className="relative aspect-[5/3] overflow-hidden bg-nebbia">
            <Image src={photos.mareScogli} alt="Scogli e mare della Versilia" fill sizes="(min-width: 1024px) 50vw, 100vw" className="grade object-cover" />
          </div>
          <div className="mx-auto max-w-md text-center lg:mt-28">
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

      {/* 7 · Lettere da Itaca */}
      <section className="px-5 pb-24 sm:px-16 sm:pb-32">
        <h2 className="mx-auto max-w-3xl text-center font-serif text-[2.1rem] font-normal normal-case leading-[1.05] sm:text-[3.2rem]">
          Le date dei prossimi incontri, direttamente nella tua casella.
        </h2>
        <LetterForm />
      </section>

      {/* 8 · Footer scuro */}
      <footer className="bg-carbone px-5 pb-10 pt-16 text-calce sm:px-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] lg:gap-12">
          <div className="col-span-2 max-w-xs lg:col-span-1">
            <BrandMark tone="cream" width={120} />
            <p className="mt-6 text-[0.8rem] leading-relaxed text-calce/80">{brand.positioning}</p>
          </div>
          {footerColumns.map((c) => (
            <ul key={c.title} className="space-y-4">
              {c.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-[0.7rem] font-medium uppercase tracking-[0.12em] hover:text-terracotta">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 text-[0.68rem] uppercase tracking-[0.12em] text-calce/70">
          <a href="mailto:info@itacasociety.com" className="hover:text-terracotta">
            info@itacasociety.com
          </a>
          <p className="normal-case tracking-normal">Itaca Society 2026 | Associazione culturale · Pietrasanta (LU)</p>
        </div>
      </footer>
    </div>
  );
}
