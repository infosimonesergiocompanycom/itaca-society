import type { Transition } from "framer-motion";

/** Curva editoriale: partenza decisa, arrivo lunghissimo. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const slow: Transition = { duration: 0.7, ease: EASE };
