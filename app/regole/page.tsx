import type { Metadata } from "next";
import { houseRules } from "@/data/itacaData";
import { PageIntro } from "@/components/ui/PageIntro";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Regole del Club" };

export default function RulesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Il Club"
        title={<>Il patto tra soci</>}
        intro="Poche indicazioni, condivise da tutti, perché ogni casa resti un luogo in cui sentirsi liberi e al sicuro."
      />
      <section className="py-16 sm:py-24">
        <ol className="mx-auto max-w-5xl px-4 sm:px-6">
          {houseRules.map((r, i) => (
            <li key={r.title} className="border-b border-linea">
              <Reveal delay={i * 0.05} className="grid gap-4 py-10 sm:grid-cols-[5rem_16rem_1fr]">
                <span className="font-serif text-2xl italic text-ottone">0{i + 1}</span>
                <h2 className="text-[1.15rem]">{r.title}</h2>
                <p className="text-[0.98rem] leading-relaxed text-tortora">{r.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
