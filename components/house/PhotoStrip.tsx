"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Una fila di fotografie scorrevole, con frecce tonde ai lati. */
function Row({ images, offset }: { images: string[]; offset: number }) {
  const track = useRef<HTMLDivElement>(null);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
  };
  const arrow =
    "absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-calce/90 text-carbone shadow-sm transition-colors duration-300 hover:bg-calce";

  return (
    <div className="relative">
      <div ref={track} className="no-scrollbar flex gap-1.5 overflow-x-auto scroll-smooth" style={{ paddingLeft: offset }}>
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={
              "relative h-[220px] shrink-0 overflow-hidden bg-travertino sm:h-[310px] " +
              (i % 3 === 1 ? "w-[300px] sm:w-[410px]" : "w-[205px] sm:w-[290px]")
            }
          >
            <Image src={src} alt="" fill sizes="410px" className="grade object-cover" />
          </div>
        ))}
      </div>
      <button type="button" aria-label="Foto precedenti" onClick={() => move(-1)} className={arrow + " left-4"}>
        <ChevronLeft size={16} strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Foto successive" onClick={() => move(1)} className={arrow + " right-4"}>
        <ChevronRight size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}

/** Galleria su due file sfalsate, come apertura delle pagine. */
export function PhotoStrip({ images }: { images: string[] }) {
  const half = Math.ceil(images.length / 2);
  const top = images.slice(0, half);
  const bottom = [...images.slice(half), ...images.slice(0, Math.max(0, half - (images.length - half)))];
  return (
    <section aria-label="Galleria fotografica" className="space-y-1.5">
      <Row images={top} offset={0} />
      <Row images={bottom} offset={0} />
    </section>
  );
}
