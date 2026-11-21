"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/format";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Ampiezza dello spostamento verticale in percentuale. */
  strength?: number;
  zoomOnHover?: boolean;
};

/** Immagine con parallax leggero legato allo scroll e zoom impercettibile all'hover. */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
  strength: strengthProp = 8,
  zoomOnHover = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Con un margine del 18% lo spostamento massimo sicuro è circa il 13%
  const strength = Math.min(strengthProp, 12);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("group relative overflow-hidden bg-travertino", className)}>
      <motion.div
        style={{ y: reduce ? 0 : y }}
        className="absolute inset-x-0 -inset-y-[18%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "grade object-cover",
            zoomOnHover && "transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]",
          )}
        />
      </motion.div>
    </div>
  );
}
