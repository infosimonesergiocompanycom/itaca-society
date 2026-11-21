import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { PillNav } from "@/components/layout/PillNav";

/* -------------------------------------------------------------------------- */
/*  Apertura di pagina: titolo grande, sottotitolo, foto con navigazione       */
/* -------------------------------------------------------------------------- */

export function Hero({
  id,
  eyebrow,
  title,
  subtitle,
  cta,
  image,
  alt = "",
  tabs,
  children,
}: {
  id?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  cta?: { label: string; href: string };
  image?: string;
  alt?: string;
  tabs?: { label: string; href: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-4 pt-28 sm:pt-32">
      <Reveal className="px-4 text-center sm:px-8">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="mx-auto max-w-[16ch] text-[2.2rem] leading-[1.06] sm:max-w-[22ch] sm:text-[3.8rem] lg:text-[5rem]">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-[34ch] text-[0.95rem] leading-snug">{subtitle}</p>}
        {cta && (
          <Link href={cta.href} className="caps mt-6 inline-block hover:text-terracotta">
            {cta.label}
          </Link>
        )}
        {children}
        {tabs && tabs.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {tabs.map((t) => (
              <li key={t.href}>
                <a href={t.href} className="text-[0.85rem] underline-offset-4 hover:underline">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
      {image ? (
        <div className="relative mt-10 h-[62vh] min-h-[380px] overflow-hidden sm:h-[72vh]">
          <ParallaxImage src={image} alt={alt} className="h-full w-full" priority strength={6} />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
            <PillNav />
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <PillNav onLight />
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sezione con titolo grande e due fotografie sfalsate                        */
/* -------------------------------------------------------------------------- */

export function Feature({
  id,
  title,
  text,
  cta,
  images,
  children,
}: {
  id?: string;
  title: React.ReactNode;
  text: React.ReactNode;
  cta?: { label: string; href: string };
  images: [string, string];
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 pt-16 sm:pt-20">
      <Reveal className="px-4 sm:px-10">
        <h2 className="max-w-[12ch] text-[2.4rem] leading-[1.04] sm:text-[3.7rem]">{title}</h2>
        <div className="mt-4 max-w-[30ch] text-[0.95rem] leading-snug">{text}</div>
        {children}
        {cta && (
          <Link href={cta.href} className="caps mt-6 inline-block hover:text-terracotta">
            {cta.label}
          </Link>
        )}
      </Reveal>
      <div className="mt-10 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] items-start gap-0 pl-4 sm:mt-12 sm:pl-10">
        <Reveal className="relative mt-[12%] aspect-[4/5] overflow-hidden">
          <Image src={images[0]} alt="" fill sizes="45vw" className="grade object-cover" />
        </Reveal>
        <Reveal delay={0.1} className="relative aspect-[4/4.4] overflow-hidden">
          <Image src={images[1]} alt="" fill sizes="55vw" className="grade object-cover" />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fotografia a sinistra a filo pagina, testo a destra                        */
/* -------------------------------------------------------------------------- */

export function Split({
  id,
  title,
  text,
  cta,
  image,
  alt = "",
  children,
}: {
  id?: string;
  title: React.ReactNode;
  text: React.ReactNode;
  cta?: { label: string; href: string };
  image: string;
  alt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 pt-16 sm:pt-20">
      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[700/955]">
          <ParallaxImage src={image} alt={alt} className="h-full w-full" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <Reveal className="px-4 md:px-0 md:pr-10 md:pt-10">
          <h2 className="text-[2.4rem] leading-[1.04] sm:text-[3.7rem]">{title}</h2>
          <div className="mt-4 max-w-[34ch] text-[0.95rem] leading-snug">{text}</div>
          {children}
          {cta && (
            <Link href={cta.href} className="caps mt-6 inline-block hover:text-terracotta">
              {cta.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fascia fotografica a tutta larghezza e chiusura «Diventa socio»            */
/* -------------------------------------------------------------------------- */

export function ImageBand({ image, alt = "", className }: { image: string; alt?: string; className?: string }) {
  return (
    <div className={cn("relative mt-16 h-[60vh] min-h-[360px] overflow-hidden sm:mt-20 sm:h-[75vh]", className)}>
      <ParallaxImage src={image} alt={alt} className="h-full w-full" strength={10} />
    </div>
  );
}

export function ApplyBand({
  title = "Diventa socio",
  cta = { label: "Registrati", href: "/diventa-socio" },
  note,
}: {
  title?: string;
  cta?: { label: string; href: string };
  note?: string;
}) {
  return (
    <section className="px-4 py-16 text-center sm:py-20">
      <Reveal>
        <h2 className="font-sans text-[2.6rem] font-bold leading-none tracking-[0.01em] sm:text-[4.2rem]">{title}</h2>
        {note && <p className="mt-4 text-[0.9rem]">{note}</p>}
        <Link href={cta.href} className="pill mt-7 min-w-[200px] bg-carbone px-10 text-calce hover:bg-terracotta">
          {cta.label}
        </Link>
      </Reveal>
    </section>
  );
}
