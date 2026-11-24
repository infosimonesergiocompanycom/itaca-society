import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formats, formatStatusLabel, houseRules } from "@/data/itacaData";
import {
  AboutBlock,
  AmenityBand,
  ColorBlock,
  FeatureCards,
  InfoBlock,
  PageTitle,
  StatementBand,
} from "@/components/house/HouseBlocks";
import { Reveal } from "@/components/ui/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return formats.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const f = formats.find((x) => x.slug === slug);
  return f ? { title: f.name, description: f.tagline } : {};
}

export default async function FormatPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const f = formats.find((x) => x.slug === slug);
  if (!f) notFound();

  const tabs = [
    { label: "Il formato", href: "#formato" },
    { label: "Esperienza", href: "#esperienza" },
    { label: f.block.title, href: "#racconto" },
    { label: "Il patto tra soci", href: "#patto" },
    { label: "Informazioni importanti", href: "#info" },
  ];

  return (
    <>
      <PageTitle
        eyebrow={`${f.role}${f.alias ? ` · «${f.alias}»` : ""} · ${formatStatusLabel[f.status]}`}
        title={f.name}
        tabs={tabs}
        image={f.card}
      />

      <StatementBand
        id="formato"
        statement={f.statement}
        body={f.body}
        fee="La tessera associativa costa 10 € l'anno"
        primary={{ label: "Diventa socio", href: "/diventa-socio" }}
        secondary={{ label: "Calendario eventi", href: "/eventi" }}
      />

      <AmenityBand items={f.highlights} />

      <FeatureCards id="esperienza" items={f.features} />

      <ColorBlock id="racconto" title={f.block.title} text={f.block.text} image={f.block.image} cta={{ label: "Calendario eventi", href: "/eventi" }} />

      <section id="patto" className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-20">
        <p className="eyebrow">Il Club</p>
        <h2 className="mt-3 text-[1.9rem] sm:text-[2.6rem]">Il patto tra soci</h2>
        <span className="rule" />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {houseRules.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.05} className="border-t border-carbone pt-4">
              <h3 className="text-[0.85rem]">{r.title}</h3>
              <p className="mt-2 text-[0.9375rem] font-light leading-relaxed">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <InfoBlock id="info" image={f.card} rows={f.info} />

      <AboutBlock title={f.name} text={f.about} />
    </>
  );
}
