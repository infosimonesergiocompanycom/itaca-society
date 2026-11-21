import type { Metadata } from "next";
import { formats, formatStatusLabel, photos } from "@/data/itacaData";
import { FeatureCards, PageTitle, StatementBand } from "@/components/house/HouseBlocks";

export const metadata: Metadata = {
  title: "Formati",
  description: "Il Banchetto di Itaca, Itaca Society Festival e Le Fasi di Itaca: un brand, più formati.",
};

export default function FormatsPage() {
  return (
    <>
      <PageTitle
        eyebrow="Architettura di marca"
        title={
          <>
            Un brand, <em>più formati</em>
          </>
        }
        tabs={formats.map((f) => ({ label: f.name, href: `/formati/${f.slug}` }))}
        image={photos.tamburo}
      />
      <StatementBand
        statement="Il Festival allarga, Le Fasi trattengono, il Banchetto consacra"
        body="Itaca Society è la piattaforma di valori e la comunità. Sotto di essa, formati diversi rispondono a scopi diversi: alcuni aprono la porta a un pubblico ampio, altri custodiscono l'esperienza più alta. Ogni nuovo formato nasce solo quando il precedente è stabile."
        primary={{ label: "Diventa socio", href: "/diventa-socio" }}
        secondary={{ label: "Calendario eventi", href: "/eventi" }}
      />
      <FeatureCards
        columns={3}
        items={formats.map((f) => ({
          title: f.name,
          meta: `${f.role} · ${formatStatusLabel[f.status]}`,
          text: `${f.tagline} ${f.summary}`,
          image: f.card,
          href: `/formati/${f.slug}`,
        }))}
      />
    </>
  );
}
