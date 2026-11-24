import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/format";

type Variant = "solid" | "outline" | "light" | "ghost";

/* Bottoni a pillola, piccoli, in tondo e senza maiuscolo */
const base =
  "group inline-flex items-center justify-center gap-2 px-7 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<Variant, string> = {
  solid: "bg-carbone text-calce hover:bg-terracotta",
  outline: "border border-carbone text-carbone hover:bg-carbone hover:text-calce",
  light: "bg-calce text-carbone hover:bg-calce/85",
  ghost: "px-0 py-1 rounded-none underline underline-offset-4",
};

type Common = { variant?: Variant; arrow?: boolean; className?: string; children: React.ReactNode };

function Inner({ arrow, children }: { arrow?: boolean; children: React.ReactNode }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      )}
    </>
  );
}

export function ButtonLink({ href, variant = "solid", arrow, className, children }: Common & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "solid",
  arrow,
  className,
  children,
  ...rest
}: Common & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

/** Link testuale semplice, in grassetto leggero, come "Per saperne di più". */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("caps underline-offset-4 hover:text-terracotta hover:underline", className)}>
      {children}
    </Link>
  );
}
