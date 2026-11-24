import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { admission } from "@/data/itacaData";
import { currentMember } from "@/lib/server/auth";
import { PageTitle } from "@/components/house/HouseBlocks";
import { RegistrationForm } from "@/components/members/RegistrationForm";

export const metadata: Metadata = {
  title: "Diventa socio",
  description: "Registrati a Itaca Society: domanda di ammissione online, quota associativa di 10 € l'anno e tessera digitale.",
};

export default async function JoinPage() {
  if (await currentMember()) redirect("/area-soci");
  return (
    <>
      <PageTitle title="Diventa socio" />
      <div className="mt-12 grid gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="bg-travertino p-8 lg:sticky lg:top-24">
            <p className="font-serif text-[1.6rem] leading-snug">Quota associativa: 10 € l&apos;anno</p>
            <ol className="mt-6 space-y-4">
              {admission.map((a) => (
                <li key={a.step} className="grid grid-cols-[1.5rem_1fr] gap-2 text-[0.9375rem]">
                  <span className="font-serif text-lg leading-6">{a.step}</span>
                  <span>
                    <span className="font-medium">{a.title}.</span> {a.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <div className="lg:col-span-7 lg:col-start-6">
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}
