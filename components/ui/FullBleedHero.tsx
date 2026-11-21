"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

export function FullBleedHero({
  image,
  alt,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section ref={ref} className="relative mt-16 h-[80svh] min-h-[520px] overflow-hidden bg-carbone text-calce">
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute inset-0"
        >
          <Image src={image} alt={alt} fill priority sizes="100vw" className="grade object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-carbone/80 via-carbone/15 to-carbone/35" />
      <div className="relative mx-auto flex h-full flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="eyebrow text-calce/85"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          className="mt-3 text-[2.6rem] leading-[1.05] sm:text-6xl"
        >
          {title}
        </motion.h1>
        {(subtitle || children) && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            {subtitle && <p className="max-w-lg text-lg text-calce/90">{subtitle}</p>}
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
