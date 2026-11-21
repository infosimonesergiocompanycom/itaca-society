import type { Metadata } from "next";
import Link from "next/link";
import { EventGrid } from "@/components/events/EventGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { calendar, publishedEvents } from "@/data/itacaData";
import { todayIso } from "@/lib/server/members";

export const metadata: Metadata = {
  title: "Eventi & Cultura",
  description: "Ascolti integrali su vinile, talk di filosofia e cinema, atelier d'arte e rituali di benessere nelle case di Itaca Society.",
};

// La pagina si rigenera ogni ora: gli eventi passati escono dal calendario senza nuove pubblicazioni.
export const revalidate = 3600;

export default function EventsPage() {
  const upcoming = publishedEvents(todayIso());
  return (
    <>
      <PageIntro eyebrow={calendar.eyebrow} title={<>{calendar.title}</>} intro={calendar.intro} />
      <section className="py-16 sm:py-24">
        <div className="px-4 sm:px-6">
          {upcoming.length > 0 ? (
            <EventGrid events={upcoming} />
          ) : (
            <div className="mx-auto max-w-2xl border-y border-linea py-16 text-center">
              <p className="font-serif text-[1.7rem] italic leading-snug sm:text-[2.1rem]">Il prossimo calendario è in preparazione.</p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-tortora">
                Le nuove date arrivano prima ai soci e a chi riceve le Lettere da Itaca: puoi iscriverti in fondo alla pagina.
              </p>
              <Link href="/membership" className="pill mt-8 inline-flex bg-carbone text-calce hover:bg-terracotta">
                Diventa socio
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
