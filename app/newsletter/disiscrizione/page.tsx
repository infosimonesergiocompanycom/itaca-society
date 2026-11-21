import type { Metadata } from "next";
import Link from "next/link";
import { unsubscribeNewsletterAction } from "@/app/actions";
import { findByToken } from "@/lib/server/newsletter";

export const metadata: Metadata = { title: "Disiscrizione", robots: { index: false } };
export const dynamic = "force-dynamic";

/**
 * Pagina raggiunta dal link in fondo a ogni lettera. La disiscrizione richiede un clic sul pulsante,
 * così i sistemi che aprono in anticipo i link delle email non la attivano per errore.
 */
export default async function UnsubscribePage({ searchParams }: { searchParams: Promise<{ t?: string; esito?: string }> }) {
  const { t = "", esito } = await searchParams;
  const sub = t ? await findByToken(t) : null;

  let body: React.ReactNode;
  if (esito === "ok" || (sub && sub.unsubscribed_at)) {
    body = (
      <>
        <h1 className="text-[1.6rem] sm:text-[2rem]">Disiscrizione completata</h1>
        <p className="mt-5 text-tortora">
          L&apos;indirizzo <strong className="text-carbone">{sub?.email}</strong> non riceverà più le Lettere da Itaca. Se cambi idea,
          puoi iscriverti di nuovo dal fondo di ogni pagina.
        </p>
      </>
    );
  } else if (!sub) {
    body = (
      <>
        <h1 className="text-[1.6rem] sm:text-[2rem]">Link non valido</h1>
        <p className="mt-5 text-tortora">
          Non troviamo questa iscrizione. Per qualsiasi richiesta scrivi a{" "}
          <a href="mailto:info@itacasociety.com" className="link-underline text-carbone">
            info@itacasociety.com
          </a>
          .
        </p>
      </>
    );
  } else {
    body = (
      <>
        <h1 className="text-[1.6rem] sm:text-[2rem]">Lettere da Itaca</h1>
        <p className="mt-5 text-tortora">
          Vuoi smettere di ricevere la newsletter all&apos;indirizzo <strong className="text-carbone">{sub.email}</strong>?
        </p>
        <form action={unsubscribeNewsletterAction} className="mt-8">
          <input type="hidden" name="t" value={t} />
          <button type="submit" className="pill bg-carbone text-calce hover:bg-terracotta">
            Conferma la disiscrizione
          </button>
        </form>
      </>
    );
  }

  return (
    <section className="px-4 pb-24 pt-36 sm:px-6 sm:pt-44">
      <div className="mx-auto max-w-xl text-center">
        {body}
        <p className="mt-12 text-sm">
          <Link href="/" className="link-underline">
            Torna alla home
          </Link>
        </p>
      </div>
    </section>
  );
}
