"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/format";

export const pillNavLinks = [
  { label: "Home", href: "/" },
  { label: "Il Club", href: "/il-club" },
  { label: "Formati", href: "/formati" },
  { label: "Eventi", href: "/eventi" },
  { label: "Tesseramento", href: "/membership" },
  { label: "Contatti", href: "/contatti" },
];

/** Barra di navigazione a pillole, sospesa sopra le immagini d'apertura. */
export function PillNav({ className, onLight = false }: { className?: string; onLight?: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav aria-label="Navigazione principale" className={cn("no-scrollbar max-w-full overflow-x-auto px-4", className)}>
      <ul className="mx-auto flex w-max items-center gap-2">
        {pillNavLinks.map((l) => {
          const active = isActive(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "pill shadow-[0_6px_20px_-8px_rgba(0,0,0,0.45)]",
                  active
                    ? onLight
                      ? "border border-carbone bg-transparent text-carbone shadow-none"
                      : "bg-calce text-carbone"
                    : "bg-carbone/90 text-calce hover:bg-terracotta",
                )}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
