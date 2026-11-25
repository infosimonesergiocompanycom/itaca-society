"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestPasswordResetAction, resetPasswordAction, type FormState, type ResetRequestState } from "@/app/actions";
import { Field } from "./Field";

const btn =
  "w-full bg-carbone px-6 py-3 text-[0.875rem] font-semibold text-calce transition-colors duration-300 hover:bg-carbone/80 disabled:opacity-50";

export function RequestResetForm() {
  const [state, action, pending] = useActionState<ResetRequestState, FormData>(requestPasswordResetAction, {});
  if (state.done) {
    return (
      <div className="space-y-4 text-[0.9375rem]" role="status">
        <p>
          Se <strong>{state.email}</strong> è registrato come socio, tra pochi minuti riceverai un&apos;email con il link per scegliere una
          nuova password. Il link vale 60 minuti.
        </p>
        <p className="text-sm text-tortora">Non la trovi? Controlla anche nello spam.</p>
        <Link href="/accedi" className="inline-block text-sm font-semibold underline underline-offset-4">
          Torna all&apos;accesso
        </Link>
      </div>
    );
  }
  return (
    <form action={action} noValidate className="space-y-5">
      <Field name="email" type="email" label="Email" defaultValue={state.email} autoComplete="email" error={state.error} />
      <button type="submit" disabled={pending} className={btn}>
        {pending ? "Invio in corso…" : "Inviami il link"}
      </button>
      <p className="border-t border-linea pt-5 text-sm">
        Ricordi la password?{" "}
        <Link href="/accedi" className="font-semibold underline underline-offset-4">
          Accedi
        </Link>
      </p>
    </form>
  );
}

export function NewPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(resetPasswordAction, {});
  return (
    <form action={action} noValidate className="space-y-5">
      <input type="hidden" name="t" value={token} />
      <Field name="password" type="password" label="Nuova password" autoComplete="new-password" hint="Almeno 8 caratteri" error={state.fieldErrors?.password} />
      <Field name="password2" type="password" label="Ripeti la password" autoComplete="new-password" error={state.fieldErrors?.password2} />
      {state.error && (
        <p className="text-sm text-red-800" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className={btn}>
        {pending ? "Salvataggio…" : "Salva la nuova password"}
      </button>
    </form>
  );
}
