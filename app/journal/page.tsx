import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/itacaData";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { ArticleMeta } from "@/components/journal/ArticleMeta";

export const metadata: Metadata = {
  title: "Journal",
  description: "Il magazine di Itaca Society: mestieri, musica, filosofia del viaggio e storie dei soci.",
};

export default function JournalPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <PageIntro
        eyebrow="Itaca Journal"
        title={<>Lettere da Itaca</>}
        intro="Storie raccolte nelle botteghe, sui sentieri e alla tavola lunga. Scritte con calma, da leggere con calma."
      />
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:px-6">
          <Reveal>
            <Link href={`/journal/${lead.slug}`} className="group grid gap-10 lg:grid-cols-12 lg:items-end">
              <ZoomImage src={lead.image} alt={lead.title} className="aspect-[16/10] lg:col-span-8" sizes="(min-width: 1024px) 66vw, 100vw" priority />
              <div className="lg:col-span-4">
                <p className="eyebrow text-ottone">{lead.category}</p>
                <h2 className="mt-4 text-[2.2rem] leading-[1.1] sm:text-5xl">
                  <span className="link-underline">{lead.title}</span>
                </h2>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-tortora">{lead.excerpt}</p>
                <div className="mt-6">
                  <ArticleMeta article={lead} />
                </div>
              </div>
            </Link>
          </Reveal>

          <div className="mt-24 grid gap-x-8 gap-y-16 border-t border-linea pt-16 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 4) * 0.07}>
                <Link href={`/journal/${a.slug}`} className="group block">
                  <ZoomImage src={a.image} alt={a.title} className="aspect-[3/4]" sizes="(min-width: 1024px) 25vw, 50vw" />
                  <p className="eyebrow mt-6 text-ottone">{a.category}</p>
                  <h3 className="mt-3 text-[1.9rem] leading-[1.08]">
                    <span className="link-underline">{a.title}</span>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-tortora">{a.excerpt}</p>
                  <div className="mt-4">
                    <ArticleMeta article={a} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
