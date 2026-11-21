import type { Metadata } from "next";
import { brand, kavafis, manifesto, photos, values } from "@/data/itacaData";
import { Hero } from "@/components/wilde/Blocks";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ButtonLink, TextLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Il Club",
  description: "Il nome, il viaggio, il ritorno: missione, valori e ambizione di Itaca Society, da Pietrasanta per la Versilia.",
};

export default function ClubPage() {
  return (
    <>
      <Hero
        eyebrow="Il Club"
        title={
          <>
            <em>Il nome,</em> il viaggio, il ritorno
          </>
        }
        subtitle={`«${kavafis.closing}»`}
        image={photos.mareScogli}
        alt="Una figura sugli scogli, davanti al mare della Versilia"
      />

      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{manifesto.eyebrow}</p>
            <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem]">{manifesto.title}</h2>
            <span className="rule" />
          </Reveal>
          <div className="space-y-6 text-[1.02rem] font-light leading-[1.85] lg:col-span-6 lg:col-start-7">
            {manifesto.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-travertino px-4 py-20 sm:px-6 sm:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Missione, visione, ambizione</p>
          <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem]">Da Pietrasanta, per la Versilia</h2>
          <span className="rule mx-auto" />
          <blockquote className="mt-10 font-serif text-[1.6rem] italic leading-[1.35] sm:text-[2rem]">«{brand.mission}»</blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-[1rem] font-light leading-relaxed">
            {brand.missionLong} L&apos;ambizione è costruire attorno a Pietrasanta un format capace di tenere insieme musica, arte, cultura,
            enogastronomia e benessere dentro un&apos;unica cornice di valori, e di radicarsi qui prima di ogni replica altrove.
          </p>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <p className="eyebrow">I valori</p>
        <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem]">Sette ideali, sette comportamenti</h2>
        <span className="rule" />
        <dl className="mt-12 border-t border-carbone">
          {values.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.04}>
              <div className="grid gap-3 border-b border-linea py-6 md:grid-cols-[12rem_1fr_1fr] md:gap-8">
                <dt className="text-[0.85rem] font-medium uppercase tracking-[0.2em] text-terracotta">{v.name}</dt>
                <dd className="font-serif text-[1.15rem] italic leading-snug">{v.idea}</dd>
                <dd className="text-[0.98rem] font-light leading-relaxed">Si traduce in: {v.practice.charAt(0).toLowerCase() + v.practice.slice(1)}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <ParallaxImage src={photos.ombra} alt="Un'ombra con cappello su una parete, accanto a uno specchio in rattan" className="aspect-[4/5]" sizes="(min-width: 1024px) 50vw, 100vw" />
          <Reveal className="lg:pl-12">
            <p className="eyebrow">Perché Itaca</p>
            <blockquote className="mt-8 font-serif text-[1.8rem] italic leading-[1.3] sm:text-[2.3rem]">«{kavafis.wisdom}»</blockquote>
            <p className="mt-5 text-[0.72rem] uppercase tracking-[0.2em] text-tortora">{kavafis.source}</p>
            <p className="mt-10 max-w-md text-[1rem] font-light leading-[1.8]">
              Celebrare la cultura come valore collettivo, universale e senza tempo, invitando ciascuno a trovare la propria Itaca.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <ButtonLink href="/diventa-socio">Diventa socio</ButtonLink>
              <TextLink href="/formati">I formati</TextLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
