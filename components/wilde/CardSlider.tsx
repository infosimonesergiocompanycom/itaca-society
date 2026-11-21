"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type SliderCard = { title: string; subtitle: string; image: string; href: string };

/** Slider orizzontale di card con bordo sottile, «Vedi tutti» e frecce tonde. */
export function CardSlider({
  id,
  title,
  viewAll,
  cards,
}: {
  id?: string;
  title: React.ReactNode;
  viewAll?: { label: string; href: string };
  cards: SliderCard[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (el) el.scrollBy({ left: dir * (card ? card.offsetWidth + 6 : el.clientWidth * 0.8), behavior: "smooth" });
  };
  const round =
    "flex h-9 w-9 items-center justify-center rounded-full bg-travertino text-carbone transition-colors duration-300 hover:bg-carbone hover:text-calce";

  return (
    <section id={id} className="scroll-mt-8 py-16 sm:py-20">
      <div className="flex items-center justify-between gap-6 px-4 sm:px-10">
        <h2 className="text-[1.6rem] sm:text-[2rem]">{title}</h2>
        <div className="flex items-center gap-5">
          {viewAll && (
            <Link href={viewAll.href} className="text-[0.85rem] underline underline-offset-4 hover:text-terracotta">
              {viewAll.label}
            </Link>
          )}
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Precedenti" className={round}>
              <ArrowLeft size={15} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Successivi" className={round}>
              <ArrowRight size={15} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <div ref={track} className="no-scrollbar mt-7 flex snap-x gap-1.5 overflow-x-auto scroll-smooth px-4 sm:px-10 [scroll-padding-inline:1rem] sm:[scroll-padding-inline:2.5rem]">
        {cards.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            data-card
            className="group w-[78vw] shrink-0 snap-start border border-carbone/25 bg-calce sm:w-[44vw] lg:w-[29.5vw]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={c.image} alt={c.title} fill sizes="(min-width: 1024px) 30vw, 78vw" className="grade object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]" />
            </div>
            <div className="px-3 pb-3 pt-3">
              <h3 className="text-[1.05rem]">{c.title}</h3>
              <p className="caps mt-1 text-[0.72rem]">{c.subtitle}</p>
            </div>
          </Link>
        ))}
        <span className="w-px shrink-0" aria-hidden />
      </div>
    </section>
  );
}
