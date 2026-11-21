"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BrandMark } from "@/components/ui/Logo";
import { EASE } from "@/lib/motion";

/**
 * Apertura a tutto schermo, come la copertina del brand book:
 * fondo ink, claim in terracotta, marchio color crema, tagline e freccia per scendere.
 * Con `video` il trailer scorre in sottofondo, muto e in loop, sotto un velo ink che tiene leggibile il marchio.
 * Chi ha chiesto di ridurre le animazioni vede solo il fotogramma di copertina.
 */
export type IntroVideo = { mp4: string; webm?: string; poster: string };

export function Intro({ targetId, video }: { targetId: string; video?: IntroVideo | null }) {
  const go = () => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) v.pause();
      else v.play().catch(() => undefined);
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-carbone text-calce">
      {video && (
        <>
          <video
            ref={ref}
            className={`grade absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${playing ? "opacity-100" : "opacity-0"}`}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
          >
            {video.webm && <source src={video.webm} type="video/webm" />}
            <source src={video.mp4} type="video/mp4" />
          </video>
          {/* fotogramma di copertina finché il video non parte (o se non parte affatto) */}
          {!playing && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={video.poster} alt="" aria-hidden className="grade absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-carbone/55" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,31,32,0.15)_0%,rgba(35,31,32,0.7)_100%)]" aria-hidden />
        </>
      )}
      <div className="relative flex flex-col items-center px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="eyebrow text-[0.68rem] tracking-[0.42em] sm:text-[0.78rem]"
        >
          Comunità · Cultura · Versilia
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          className="mt-10"
        >
          <BrandMark tone="cream" width={230} priority />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          className="mt-10 font-serif text-[1.9rem] italic leading-none sm:text-[2.6rem]"
        >
          «live the journey»
        </motion.p>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
          className="mt-8 block h-px w-16 bg-terracotta"
          aria-hidden
        />
        <motion.button
          type="button"
          onClick={go}
          aria-label="Scendi al contenuto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 flex h-11 w-11 items-center justify-center rounded-full border border-calce/40 text-calce transition-colors duration-300 hover:border-terracotta hover:bg-terracotta"
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.button>
      </div>
    </section>
  );
}
