import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/data/itacaData";
import { requireAdmin } from "@/lib/server/auth";
import { checkinCounts, todayIso } from "@/lib/server/members";
import { shortDate } from "@/lib/format";
import { Scanner } from "@/components/members/Scanner";

export const metadata: Metadata = { title: "Controllo ingressi", robots: { index: false } };

export default async function CheckinPage() {
  await requireAdmin();
  const counts = await checkinCounts();
  const today = todayIso();
  // Prima gli eventi di oggi e quelli in arrivo, poi quelli passati
  const sorted = [...events].sort((a, b) => {
    const fa = a.date >= today ? 0 : 1;
    const fb = b.date >= today ? 0 : 1;
    return fa - fb || (fa === 0 ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));
  });
  const options = [
    ...sorted.map((e) => ({ slug: e.slug, label: `${shortDate(e.date)} — ${e.title}` })),
    { slug: "ingresso-generico", label: "Altro evento o ingresso generico" },
  ];

  return (
    <div className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <Link href="/admin" className="text-[0.8125rem] font-semibold hover:underline hover:underline-offset-4">
        ← Amministrazione
      </Link>
      <h1 className="mt-4 text-[1.9rem] font-semibold sm:text-[2.7rem]">Controllo ingressi</h1>
      <p className="mb-10 mt-2 text-[0.9375rem] text-tortora">
        Scegli l&apos;evento e inquadra il QR della tessera. Ogni socio viene registrato una sola volta per evento.
      </p>
      <Scanner events={options} counts={counts} />
    </div>
  );
}
