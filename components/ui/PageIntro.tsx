import { Hero } from "@/components/wilde/Blocks";

/** Apertura delle pagine interne: titolo grande centrato, testo breve e navigazione a pillole. */
export function PageIntro({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Hero eyebrow={eyebrow} title={title} subtitle={intro}>
      {children && <div className="mt-6 flex justify-center">{children}</div>}
    </Hero>
  );
}
