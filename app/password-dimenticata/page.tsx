import type { Metadata } from "next";
import { RequestResetForm } from "@/components/members/PasswordResetForms";

export const metadata: Metadata = { title: "Password dimenticata", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 pb-20 pt-28">
      <div className="w-full max-w-[420px] border border-linea bg-calce px-8 py-10">
        <h1 className="text-center text-[2.2rem]">Password dimenticata</h1>
        <p className="mb-8 mt-2 text-center text-[0.9375rem] text-tortora">
          Scrivi l&apos;email con cui ti sei registrato: ti mandiamo un link per sceglierne una nuova.
        </p>
        <RequestResetForm />
      </div>
    </section>
  );
}
