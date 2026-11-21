"use client";

import { useEffect } from "react";

/** Blocca lo scroll della pagina e chiude con Esc finché `active` è vero. */
export function useLockBody(active: boolean, onEscape?: () => void) {
  useEffect(() => {
    if (!active) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape?.();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onEscape]);
}
