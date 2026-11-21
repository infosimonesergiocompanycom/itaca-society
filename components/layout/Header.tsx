"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/format";
import { MenuDrawer } from "./MenuDrawer";
import { Logo } from "@/components/ui/Logo";

export type HeaderMember = { firstName: string; role: "member" | "admin" } | null;

/**
 * Header essenziale: menu a sinistra, wordmark al centro, pillole scure a destra.
 * Non è fisso: la navigazione principale vive nella barra a pillole sopra le immagini.
 */
export function Header({ member }: { member: HeaderMember }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => setDrawerOpen(false), [pathname]);

  const pill = "pill bg-carbone text-calce hover:bg-terracotta";

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40 text-carbone">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-24 sm:px-8">
          <div>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="group flex items-center gap-3 py-2 hover:text-terracotta"
              aria-label="Apri il menu"
              aria-expanded={drawerOpen}
            >
              {/* Due linee sottili: segno del menu proprio di Itaca Society */}
              <span className="flex w-7 flex-col gap-[7px]" aria-hidden>
                <span className="block h-px w-full bg-current" />
                <span className="block h-px w-[70%] bg-current transition-[width] duration-300 group-hover:w-full" />
              </span>
              <span className="caps hidden text-[0.7rem] tracking-[0.2em] sm:inline">Menu</span>
            </button>
          </div>

          <Logo className="text-[0.85rem] sm:text-[1.15rem]" />

          <div className="flex items-center justify-end gap-2">
            {member ? (
              <>
                {member.role === "admin" && (
                  <Link href="/admin" className={cn(pill, "hidden md:inline-flex")}>
                    Amministrazione
                  </Link>
                )}
                <Link href="/area-soci" className={pill}>
                  Area soci
                </Link>
              </>
            ) : (
              <>
                <Link href="/diventa-socio" className={cn(pill, "hidden min-[420px]:inline-flex")}>
                  Diventa socio
                </Link>
                <Link href="/accedi" className={pill}>
                  Accedi
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} member={member} />
    </>
  );
}
