"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type FormState } from "@/app/actions";
import { Field } from "./Field";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(loginAction, {});
  return (
    <form action={action} noValidate className="space-y-5">
      <input type="hidden" name="next" value={next ?? ""} />
      <Field name="email" type="email" label="Email" defaultValue={state.values?.email} autoComplete="email" />
      <Field name="password" type="password" label="Password" autoComplete="current-password" />
      {state.error && (
        <p className="text-sm text-red-800" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-carbone px-6 py-3 text-[0.875rem] font-semibold text-calce transition-colors duration-300 hover:bg-carbone/80 disabled:opacity-50"
      >
        {pending ? "Accesso in corso…" : "Accedi"}
      </button>
      <p className="text-sm text-tortora">
        <Link href="/password-dimenticata" className="underline underline-offset-4 hover:text-carbone">
          Password dimenticata?
        </Link>
      </p>
      <p className="border-t border-linea pt-5 text-sm">
        Non sei ancora socio?{" "}
        <Link href="/diventa-socio" className="font-semibold underline underline-offset-4">
          Registrati
        </Link>
      </p>
    </form>
  );
}
