import type { Metadata } from "next";
import Link from "next/link";
import { NewPasswordForm } from "@/components/members/PasswordResetForms";
import { checkResetToken } from "@/lib/server/passwordReset";

export const metadata: Metadata = { title: "Nuova password", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t = "" } = await searchParams;
  const valid = await checkResetToken(t);
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 pb-20 pt-28">
      <div className="w-full max-w-[420px] border border-linea bg-calce px-8 py-10">
        <h1 className="text-center text-[2.2rem]">Nuova password</h1>
        {valid ? (
          <>
            <p className="mb-8 mt-2 text-center text-[0.9375rem] text-tortora">Scegli la nuova password per entrare nell&apos;Area Soci.</p>
            <NewPasswordForm token={t} />
          </>
        ) : (
          <div className="mt-4 space-y-5 text-center text-[0.9375rem]">
            <p className="text-tortora">Questo link è scaduto o è già stato usato.</p>
            <Link href="/password-dimenticata" className="inline-block bg-carbone px-6 py-3 text-[0.875rem] font-semibold text-calce hover:bg-carbone/80">
              Chiedi un nuovo link
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
