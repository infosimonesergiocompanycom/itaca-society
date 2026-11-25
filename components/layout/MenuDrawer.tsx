"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { drawerLinks, kavafis, photos, social } from "@/data/itacaData";
import type { HeaderMember } from "./Header";
import { useLockBody } from "@/lib/useLockBody";
import { EASE } from "@/lib/motion";
import { BrandMark, Logo } from "@/components/ui/Logo";

export function MenuDrawer({ open, onClose, member }: { open: boolean; onClose: () => void; member: HeaderMember }) {
  const close = useCallback(() => onClose(), [onClose]);
  useLockBody(open, close);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principale"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="fixed inset-0 z-50 grid bg-calce text-carbone lg:grid-cols-[1.1fr_1fr]"
        >
          {/* Colonna sinistra: navigazione */}
          <div className="flex min-h-0 flex-col overflow-y-auto px-5 pb-10 sm:px-8 lg:px-12">
            <div className="flex h-16 shrink-0 items-center justify-between">
              <button type="button" onClick={close} className="-ml-1 flex items-center gap-3 p-1" aria-label="Chiudi il menu">
                <X size={22} strokeWidth={1.25} aria-hidden />
                <span className="hidden text-[0.9375rem] font-medium sm:inline">Chiudi</span>
              </button>
              <Logo onClick={close} className="lg:hidden" />
              <span className="w-8 lg:hidden" aria-hidden />
            </div>

            <nav aria-label="Menu completo" className="my-auto py-10">
              <ul>
                {drawerLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.06 }}
                    className="border-b border-linea first:border-t"
                  >
                    <Link
                      href={l.href}
                      onClick={close}
                      className="group flex items-baseline justify-between gap-6 py-4 sm:py-5"
                    >
                      <span className="text-[1.7rem] font-medium uppercase leading-none tracking-[0.06em] transition-colors duration-300 group-hover:text-terracotta sm:text-[2.4rem]">
                        {l.label}
                      </span>
                      <span className="hidden text-right text-xs text-tortora sm:block">{l.note}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-linea pt-6 text-[0.8rem] text-tortora">
              {member ? (
                member.role === "admin" && (
                  <Link href="/admin" onClick={close} className="link-underline pb-1 text-carbone">
                    Amministrazione
                  </Link>
                )
              ) : (
                <Link href="/accedi" onClick={close} className="link-underline pb-1 text-carbone">
                  Accedi all&apos;Area Soci
                </Link>
              )}
              <Link href="/regole" onClick={close} className="link-underline pb-1">Il patto tra soci</Link>
              <Link href="/contatti" onClick={close} className="link-underline pb-1">Contatti</Link>
              <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline pb-1">Instagram</a>
              <span className="ml-auto hidden sm:inline">Comunità · Cultura · Versilia</span>
            </div>
          </div>

          {/* Colonna destra: immagine e manifestino */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative hidden overflow-hidden lg:block"
          >
            <Image src={photos.palma} alt="Foglie di palma in controluce" fill sizes="50vw" className="grade object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-carbone/75 via-carbone/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-12 text-calce">
              <div className="mb-8"><BrandMark tone="cream" width={140} /></div>
              <p className="max-w-md font-serif text-[1.8rem] italic leading-[1.25]">
                Celebrare la cultura come valore collettivo, invitando ciascuno a trovare la propria Itaca.
              </p>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-calce/70">«{kavafis.opening}»</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
