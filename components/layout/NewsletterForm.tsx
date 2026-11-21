"use client";

import Link from "next/link";
import { useActionState } from "react";
import { subscribeNewsletterAction, type NewsletterState } from "@/app/actions";
import { newsletterConsentText } from "@/lib/consents";

const initial: NewsletterState = { status: "idle" };

/** Iscrizione alle «Lettere da Itaca»: salva l'indirizzo e il consenso, con la versione del testo accettato. */
export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletterAction, initial);

  if (state.status === "done") {
    return (
      <p className="mt-4 text-[0.9rem]" role="status">
        Grazie. Riceverai la prossima lettera da Itaca.
      </p>
    );
  }

  return (
    <form action={action} className="mt-4">
      <label htmlFor="newsletter" className="sr-only">
        Indirizzo email
      </label>
      <input
        id="newsletter"
        name="email"
        type="email"
        required
        autoComplete="email"
        defaultValue={state.email}
        placeholder="La tua email"
        aria-invalid={state.status === "error"}
        aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
        className="w-full border-b border-carbone/40 bg-transparent py-2 text-[0.9rem] placeholder:text-tortora focus:border-carbone focus:outline-none"
      />
      {/* campo esca contro l'invio automatico: invisibile alle persone */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <label className="mt-3 flex items-start gap-2 text-[0.72rem] leading-snug text-tortora">
        <input type="checkbox" name="consent" required className="mt-0.5 shrink-0 accent-carbone" />
        <span>
          {newsletterConsentText}{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-terracotta">
            Informativa
          </Link>
        </span>
      </label>
      {state.status === "error" && (
        <p id="newsletter-error" className="mt-2 text-xs text-terracotta" role="alert">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="pill mt-4 bg-carbone text-calce hover:bg-terracotta disabled:opacity-60">
        {pending ? "Un momento…" : "Iscriviti"}
      </button>
    </form>
  );
}
