"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Transizione di pagina: dissolvenza lenta a ogni cambio di rotta. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      {children}
    </motion.div>
  );
}
