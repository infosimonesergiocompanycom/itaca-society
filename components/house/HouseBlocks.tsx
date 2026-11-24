import Image from "next/image";
import Link from "next/link";
import type { Highlight } from "@/data/itacaData";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/format";
import { Hero, Split } from "@/components/wilde/Blocks";

/* -------------------------------------------------------------------------- */
/*  Titolo di pagina con sotto-navigazione a schede                           */
/* -------------------------------------------------------------------------- */

export function PageTitle({
  title,
  eyebrow,
  tabs,
  image,
}: {
  title: React.ReactNode;
  eyebrow?: string;
  tabs?: { label: string; href: string }[];
  image?: string;
}) {
  return <Hero eyebrow={eyebrow} title={title} tabs={tabs} image={image} />;
}

/* -------------------------------------------------------------------------- */
/*  Fascia sabbia con dichiarazione centrata                                  */
/* -------------------------------------------------------------------------- */

export function StatementBand({
  id,
  statement,
  body,
  fee,
  primary,
  secondary,
}: {
  id?: string;
  statement: string;
  body: string;
  fee?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section id={id} className="scroll-mt-16 bg-travertino px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 className="font-serif text-[1.7rem] italic leading-[1.3] sm:text-[2.4rem] sm:leading-[1.28]">{statement}</h2>
        <p className="mx-auto mt-8 max-w-[580px] text-[1rem] font-light leading-relaxed">{body}</p>
        {fee && <p className="mt-6 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-terracotta">{fee}</p>}
        {(primary || secondary) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fascia ardesia con i servizi in icone                                     */
/* -------------------------------------------------------------------------- */

export function AmenityBand({ items }: { items: Highlight[] }) {
  return (
    <section className="bg-ardesia px-4 py-16 text-calce sm:px-6 sm:py-20">
      <ul className="mx-auto grid max-w-[1200px] grid-cols-2 gap-y-12 sm:grid-cols-4">
        {items.map((h) => (
          <li key={h.label} className="flex flex-col items-center gap-3 px-2 text-center text-[0.78rem] uppercase tracking-[0.14em]">
            <Icon name={h.icon} size={26} className="text-terracotta" />
            {h.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Schede a due colonne: immagine, titolo, testo, "Per saperne di più"        */
/* -------------------------------------------------------------------------- */

export function FeatureCards({
  id,
  title,
  items,
  columns = 2,
}: {
  id?: string;
  title?: string;
  items: { title: string; text: string; image: string; href?: string; meta?: string }[];
  columns?: 2 | 3;
}) {
  return (
    <section id={id} className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20">
      {title && (
        <div className="mb-10">
          <h2 className="text-[1.9rem] sm:text-[2.6rem]">{title}</h2>
          <span className="rule" />
        </div>
      )}
      <div className={cn("grid gap-x-1.5 gap-y-12", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {items.map((it, i) => (
          <Reveal key={it.title} delay={(i % columns) * 0.06}>
            <article className="group">
              <div className={cn("relative overflow-hidden bg-travertino", columns === 2 ? "aspect-[1/1]" : "aspect-[4/5]")}>
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes={columns === 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                  className="grade object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
                />
              </div>
              <div className="pr-4 pt-4">
                {it.meta && <p className="eyebrow mb-2">{it.meta}</p>}
                <h3 className="text-[0.95rem] font-medium">{it.title}</h3>
                <p className="mt-3 text-[0.98rem] font-light leading-relaxed">{it.text}</p>
                {it.href && (
                  <Link href={it.href} className="mt-3 inline-block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-terracotta hover:underline hover:underline-offset-4">
                    Per saperne di più
                  </Link>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Blocco di colore pieno: titolo grande, testo in basso, immagine a destra   */
/* -------------------------------------------------------------------------- */

export function ColorBlock({
  id,
  title,
  text,
  image,
  cta,
  children,
}: {
  id?: string;
  title: string;
  text: string;
  image: string;
  cta?: { label: string; href: string };
  tone?: "pesca" | "travertino" | "nebbia";
  children?: React.ReactNode;
}) {
  return (
    <Split id={id} title={title} text={text} image={image} cta={cta}>
      {children}
    </Split>
  );
}

/* -------------------------------------------------------------------------- */
/*  Informazioni importanti: immagine e scheda grigia                          */
/* -------------------------------------------------------------------------- */

export function InfoBlock({
  id,
  image,
  rows,
}: {
  id?: string;
  image: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[1160px] items-start gap-8 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="grade object-cover" />
        </div>
        <div className="bg-nebbia px-8 py-8">
          <h2 className="text-center text-[1.05rem]">Informazioni importanti</h2>
          <dl className="mt-6 space-y-6">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="eyebrow">{r.label}</dt>
                <dd className="mt-1 text-[0.98rem] font-light">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Paragrafo finale centrato                                                  */
/* -------------------------------------------------------------------------- */

export function AboutBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <Reveal className="mx-auto max-w-[560px] text-center">
        <h2 className="text-[1.6rem] sm:text-[2.1rem]">{title}</h2>
        <span className="rule mx-auto" />
        <p className="mt-8 text-[1rem] font-light leading-relaxed">{text}</p>
      </Reveal>
    </section>
  );
}
