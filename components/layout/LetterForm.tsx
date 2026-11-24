"use client";

import Link from "next/link";
import { useActionState } from "react";
import { subscribeNewsletterAction, type NewsletterState } from "@/app/actions";
import { newsletterConsentText } from "@/lib/consents";

const initial: NewsletterState = { status: "idle" };

/** Iscrizione alle Lettere da Itaca, in chiusura di ogni pagina. */
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
