"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BrandMark } from "@/components/ui/Logo";
import { EASE } from "@/lib/motion";

/** Apertura a tutto schermo: marchio, tagline «live the journey» e freccia per scendere. */
export function Intro({ image, targetId }: { image: string; targetId: string }) {
  const go = () => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
        className="absolute inset-0"
      >
        <Image src={image} alt="" fill priority sizes="100vw" className="grade object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-calce/55" />
      <div className="relative flex flex-col items-center px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.3 }}>
          <BrandMark width={190} priority />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          className="mt-8 font-serif text-[2.2rem] italic leading-none sm:text-[3.4rem]"
        >
          «live the journey»
        </motion.p>
        <motion.button
          type="button"
          onClick={go}
          aria-label="Scendi al contenuto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex h-11 w-11 items-center justify-center rounded-full bg-calce text-carbone shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-carbone hover:text-calce"
        >
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.button>
      </div>
    </section>
  );
}
