"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Comparsa lenta dal basso quando l'elemento entra nel viewport. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
