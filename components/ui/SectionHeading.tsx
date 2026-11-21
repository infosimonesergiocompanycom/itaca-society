import { cn } from "@/lib/format";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <p className={cn("eyebrow mb-6", tone === "dark" ? "text-ottone" : "text-ottone/90")}>{eyebrow}</p>
      <h2 className={cn("text-[1.9rem] sm:text-[2.6rem]", tone === "dark" ? "text-carbone" : "text-calce")}>{title}</h2>
      {intro && (
        <p className={cn("mt-6 max-w-xl text-[0.95rem] leading-relaxed", align === "center" && "mx-auto", tone === "dark" ? "text-tortora" : "text-calce/70")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
