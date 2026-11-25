"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { registerAction, type FormState } from "@/app/actions";
import { passions } from "@/data/itacaData";
import { consentNote, consentTexts } from "@/lib/consents";
import { cn } from "@/lib/format";
import { Field } from "./Field";

export function RegistrationForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(registerAction, {});
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const [picked, setPicked] = useState<string[]>(() => (v.interests ? v.interests.split(", ") : []));

  const toggle = (p: string) => setPicked((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  const hasErrors = Object.keys(e).length > 0;
  const formRef = useRef<HTMLFormElement>(null);

  // Dopo un invio con errori porta la vista sul primo campo da correggere
  useEffect(() => {
    const first = Object.keys(state.fieldErrors ?? {})[0];
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus({ preventScroll: true });
  }, [state]);

  return (
    <form ref={formRef} action={action} noValidate className="space-y-14">
      {hasErrors && (
        <p className="border border-red-800 px-4 py-3 text-sm text-red-900" role="alert">
          Alcuni campi vanno completati o corretti: li trovi evidenziati qui sotto.
        </p>
      )}

      <fieldset>
        <legend className="font-serif text-[1.8rem]">1. Dati anagrafici</legend>
        <p className="mt-1 text-sm text-tortora">Servono per il libro soci dell&apos;associazione.</p>
        <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field name="firstName" label="Nome" defaultValue={v.firstName} error={e.firstName} autoComplete="given-name" />
          <Field name="lastName" label="Cognome" defaultValue={v.lastName} error={e.lastName} autoComplete="family-name" />
          <Field name="birthDate" type="date" label="Data di nascita" defaultValue={v.birthDate} error={e.birthDate} autoComplete="bday" />
          <Field name="birthPlace" label="Luogo di nascita" defaultValue={v.birthPlace} error={e.birthPlace} placeholder="Comune o Stato estero" />
          <Field name="fiscalCode" label="Codice fiscale" defaultValue={v.fiscalCode} error={e.fiscalCode} placeholder="RSSMRA85T10G628X" />
          <Field name="phone" type="tel" label="Telefono" defaultValue={v.phone} optional autoComplete="tel" />
          <Field name="address" label="Indirizzo di residenza" defaultValue={v.address} error={e.address} autoComplete="street-address" className="sm:col-span-2" />
          <Field name="city" label="Comune di residenza" defaultValue={v.city} error={e.city} autoComplete="address-level2" />
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-serif text-[1.8rem]">2. Il tuo account</legend>
        <p className="mt-1 text-sm text-tortora">Userai email e password per entrare nell&apos;Area Soci e aprire la tessera.</p>
        <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <Field name="email" type="email" label="Email" defaultValue={v.email} error={e.email} autoComplete="email" className="sm:col-span-2" />
          <Field name="password" type="password" label="Password" error={e.password} autoComplete="new-password" hint="Almeno 8 caratteri" />
          <Field name="password2" type="password" label="Ripeti la password" error={e.password2} autoComplete="new-password" />
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-serif text-[1.8rem]">3. I tuoi interessi</legend>
        <p className="mt-1 text-sm text-tortora">Facoltativo: ci aiuta a costruire il programma.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {passions.map((p) => {
            const on = picked.includes(p);
            return (
              <label
                key={p}
                className={cn(
                  "cursor-pointer border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                  on ? "border-carbone bg-carbone text-calce" : "border-carbone/30 hover:border-carbone",
                )}
              >
                <input type="checkbox" name="interests" value={p} checked={on} onChange={() => toggle(p)} className="sr-only" />
                {p}
              </label>
            );
          })}
        </div>
        <label className="mt-6 block">
          <span className="flex justify-between text-sm font-medium">
            Che cosa ti piacerebbe portare all&apos;associazione?
            <span className="font-normal text-tortora">facoltativo</span>
          </span>
          <textarea name="motivation" rows={4} defaultValue={v.motivation} className="field resize-none" />
        </label>
      </fieldset>

      <fieldset>
        <legend className="font-serif text-[1.8rem]">4. Domanda di ammissione</legend>
        <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed">
          <label className="flex items-start gap-3">
            <input type="checkbox" name="statute" defaultChecked={v.statute === "on"} className="mt-1 h-4 w-4 shrink-0 accent-black" />
            <span>
              Chiedo di essere ammesso/a come socio/a di Itaca Society. Dichiaro di aver letto e di accettare lo{" "}
              <Link href="/regole" className="underline underline-offset-4" target="_blank">
                statuto e il regolamento
              </Link>{" "}
              e di impegnarmi a versare la quota associativa annuale di 10 € dopo l&apos;approvazione.
            </span>
          </label>
          {e.statute && <p className="text-xs text-red-800" role="alert">{e.statute}</p>}
          <label className="flex items-start gap-3">
            <input type="checkbox" name="privacy" defaultChecked={v.privacy === "on"} className="mt-1 h-4 w-4 shrink-0 accent-black" />
            <span>
              Dichiaro di aver letto l&apos;{" "}
              <Link href="/privacy" className="underline underline-offset-4" target="_blank">
                informativa sulla privacy
              </Link>{" "}
              sul trattamento dei miei dati per la gestione del rapporto associativo.
            </span>
          </label>
          {e.privacy && <p className="text-xs text-red-800" role="alert">{e.privacy}</p>}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-serif text-[1.8rem]">5. Consensi facoltativi</legend>
        <p className="mt-1 text-sm text-tortora">{consentNote}</p>
        <div className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed">
          {(["marketing", "sponsor"] as const).map((kind) => (
            <div key={kind} className="border border-linea p-4">
              <p className="text-sm font-medium">{consentTexts[kind].title}</p>
              <label className="mt-3 flex items-start gap-3">
                <input
                  type="checkbox"
                  name={kind}
                  defaultChecked={v[kind] === "on"}
                  className="mt-1 h-4 w-4 shrink-0 accent-black"
                />
                <span>{consentTexts[kind].text}</span>
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {hasErrors && (
        <ul className="space-y-1 border border-red-800 px-4 py-3 text-sm text-red-900" role="alert">
          {Object.values(e).map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-4 border-t border-linea pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-tortora">
          Hai già un account?{" "}
          <Link href="/accedi" className="font-semibold text-carbone underline underline-offset-4">
            Accedi
          </Link>
        </p>
        <button
          type="submit"
          disabled={pending}
          className="bg-carbone px-6 py-3 text-[0.875rem] font-semibold text-calce transition-colors duration-300 hover:bg-carbone/80 disabled:opacity-50"
        >
          {pending ? "Invio in corso…" : "Invia la domanda di ammissione"}
        </button>
      </div>
    </form>
  );
}
