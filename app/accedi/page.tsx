import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentMember } from "@/lib/server/auth";
import { LoginForm } from "@/components/members/LoginForm";

export const metadata: Metadata = { title: "Accedi" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : undefined;
  if (await currentMember()) redirect(safeNext ?? "/area-soci");
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 pb-20 pt-28">
      <div className="w-full max-w-[420px] border border-linea bg-calce px-8 py-10">
        <h1 className="text-center text-[2.2rem]">Area Soci</h1>
        <p className="mb-8 mt-2 text-center text-[0.9375rem] text-tortora">
          {safeNext === "/admin" ? "Accedi con l'indirizzo amministratore." : "Accedi per aprire la tua tessera digitale."}
        </p>
        <LoginForm next={safeNext} />
      </div>
    </section>
  );
}
