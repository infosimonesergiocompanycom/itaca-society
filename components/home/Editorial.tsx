"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/** Video della copertina: muto, in loop, fermo per chi riduce le animazioni. */
export function HeroVideo({ mp4, webm, poster }: { mp4: string; webm?: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (reduce.matches ? v.pause() : void v.play().catch(() => undefined));
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);
  return (
    <video ref={ref} className="absolute inset-0 h-full w-full object-cover" poster={poster} muted loop playsInline preload="metadata" aria-hidden tabIndex={-1}>
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}

export type Slide = { title: string; text: string; image: string; href: string };

/** Carosello orizzontale con barra di avanzamento, scorrevole con il dito, il trackpad o la tastiera. */
export function Carousel({ slides, label }: { slides: Slide[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ left: 0, width: 0.25 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const width = Math.min(1, el.clientWidth / el.scrollWidth);
      setProgress({ width, left: max > 0 ? (el.scrollLeft / max) * (1 - width) : 0 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto scroll-smooth px-5 sm:scroll-px-16 focus-visible:outline-none sm:gap-6 sm:px-16"
      >
        {slides.map((s) => (
          <Link key={s.title} href={s.href} className="group w-[72vw] shrink-0 snap-start sm:w-[300px]">
            <div className="relative aspect-[3/4] overflow-hidden bg-nebbia">
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(min-width: 640px) 300px, 72vw"
                className="grade object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.08em]">{s.title}</p>
            <p className="mt-1.5 text-[0.8rem] leading-snug text-tortora">{s.text}</p>
          </Link>
        ))}
        <span className="w-px shrink-0" aria-hidden />
      </div>
      <div className="mx-5 mt-14 h-[3px] bg-linea sm:mx-16" aria-hidden>
        <div
          className="h-full bg-carbone transition-[margin] duration-150"
          style={{ width: `${progress.width * 100}%`, marginLeft: `${progress.left * 100}%` }}
        />
      </div>
    </div>
  );
}
