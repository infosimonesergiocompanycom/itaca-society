"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuDrawer } from "@/components/layout/MenuDrawer";
import type { HeaderMember } from "@/components/layout/Header";
import { subscribeNewsletterAction, type NewsletterState } from "@/app/actions";
import { newsletterConsentText } from "@/lib/consents";

/** Barra superiore sopra la copertina: menu a sinistra, pulsante rettangolare a destra. */
export function TopBar({ member }: { member: HeaderMember }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-7 text-calce sm:px-16 sm:py-9">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Apri il menu"
          aria-expanded={open}
          className="group flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.12em] hover:text-terracotta"
        >
          <span className="flex w-7 flex-col gap-[6px]" aria-hidden>
            <span className="block h-px w-full bg-current" />
            <span className="block h-px w-full bg-current" />
          </span>
          Menu
        </button>
        <Link
          href={member ? "/area-soci" : "/diventa-socio"}
          className="border border-calce bg-calce px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-carbone transition-colors duration-300 hover:border-terracotta hover:bg-terracotta hover:text-calce sm:px-6"
        >
          {member ? "Area soci" : "Diventa socio"}
        </Link>
      </header>
      <MenuDrawer open={open} onClose={() => setOpen(false)} member={member} />
    </>
  );
}

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

const initial: NewsletterState = { status: "idle" };

/** Iscrizione alle Lettere da Itaca, impaginata come il modulo di chiusura del riferimento. */
export function LetterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletterAction, initial);
  if (state.status === "done") {
    return (
      <p className="mt-12 text-center font-serif text-xl italic" role="status">
        Grazie. Riceverai la prossima lettera da Itaca.
      </p>
    );
  }
  return (
    <form action={action} className="mx-auto mt-14 max-w-xl text-center">
      <label htmlFor="lettere-email" className="sr-only">
        Indirizzo email
      </label>
      <input
        id="lettere-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        defaultValue={state.email}
        placeholder="Indirizzo email*"
        className="w-full border-b border-carbone/50 bg-transparent py-3 text-center text-[0.95rem] placeholder:text-carbone focus:border-carbone focus:outline-none"
      />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <label className="mx-auto mt-8 flex max-w-md items-start justify-center gap-2.5 text-left text-[0.75rem] leading-snug">
        <input type="checkbox" name="consent" required className="mt-0.5 shrink-0 accent-carbone" />
        <span>
          {newsletterConsentText}{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-terracotta">
            Informativa
          </Link>
          *
        </span>
      </label>
      {state.status === "error" && (
        <p className="mt-3 text-xs text-terracotta" role="alert">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-8 border border-carbone/40 px-7 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 hover:border-carbone hover:bg-carbone hover:text-calce disabled:opacity-60"
      >
        {pending ? "Un momento…" : "Iscriviti"}
      </button>
      <p className="mt-2 font-serif text-[0.7rem] italic text-tortora">*obbligatorio</p>
    </form>
  );
}
