import type { Metadata } from "next";
import { EventGrid } from "@/components/events/EventGrid";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Eventi & Cultura",
  description: "Ascolti integrali su vinile, talk di filosofia e cinema, atelier d'arte e rituali di benessere nelle case di Itaca Society.",
};

export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Le Fasi di Itaca"
        title={<>Il calendario d&apos;inverno</>}
        intro="Da novembre a gennaio, tra Pietrasanta, il mare e le Apuane. Gli incontri sono a numero chiuso e riservati ai soci: all'ingresso basta mostrare la tessera digitale."
      />
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:px-6">
          <EventGrid />
        </div>
      </section>
    </>
  );
}
