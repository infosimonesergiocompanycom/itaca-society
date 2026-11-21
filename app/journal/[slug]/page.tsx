import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/itacaData";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { ZoomImage } from "@/components/ui/ZoomImage";
import { ArticleMeta } from "@/components/journal/ArticleMeta";
import { TextLink } from "@/components/ui/Button";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.excerpt } : {};
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const half = Math.ceil(article.body.length / 2);

  return (
    <article>
      <header className="pb-14 pt-36 sm:pt-44 lg:pt-52">
        <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Link href="/journal" className="eyebrow text-tortora transition-colors duration-700 hover:text-carbone">
            Itaca Journal
          </Link>
          <span className="eyebrow mx-3 text-linea">/</span>
          <span className="eyebrow text-ottone">{article.category}</span>
          <h1 className="mt-8 text-[1.9rem] font-semibold sm:text-[2.7rem]">{article.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-tortora">{article.excerpt}</p>
          <div className="mt-8">
            <ArticleMeta article={article} />
          </div>
        </Reveal>
      </header>

      <div className="px-4 sm:px-6">
        <ParallaxImage src={article.image} alt={article.title} className="aspect-[16/10] lg:aspect-[21/9]" priority strength={6} />
      </div>

      <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="space-y-7 text-[1.05rem] leading-[1.9] text-carbone/85">
          {article.body.slice(0, half).map((p, i) => (
            <Reveal key={i}>
              <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-serif first-letter:text-[4.6rem] first-letter:leading-[0.8] first-letter:text-carbone" : undefined}>
                {p}
              </p>
            </Reveal>
          ))}
        </div>
        {article.pullQuote && (
          <Reveal>
            <blockquote className="my-16 border-y border-linea py-12 text-center font-serif text-[2.1rem] italic leading-[1.2] text-pineta sm:-mx-16 sm:text-[2.6rem]">
              {article.pullQuote}
            </blockquote>
          </Reveal>
        )}
        <div className="space-y-7 text-[1.05rem] leading-[1.9] text-carbone/85">
          {article.body.slice(half).map((p, i) => (
            <Reveal key={i}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-16 font-serif text-2xl text-ottone" aria-hidden>
          ⁂
        </p>
      </div>

      <section className="border-t border-linea bg-travertino py-20 sm:py-24">
        <div className="px-4 sm:px-6">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl">
              Continua a leggere
            </h2>
            <TextLink href="/journal">Tutto il Journal</TextLink>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {others.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}`} className="group block">
                <ZoomImage src={a.image} alt={a.title} className="aspect-[4/3]" />
                <p className="eyebrow mt-5 text-ottone">{a.category}</p>
                <h3 className="mt-3 text-[1.8rem] leading-[1.1]">
                  <span className="link-underline">{a.title}</span>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
