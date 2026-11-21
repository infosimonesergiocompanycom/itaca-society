import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/format";

/** Wordmark «Itaca Society» in IM Fell English (unico uso consentito di questo carattere). */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Itaca Society — Home"
      className={cn("wordmark whitespace-nowrap text-[0.8rem] tracking-[0.2em] sm:text-[1.05rem] sm:tracking-[0.32em]", className)}
    >
      Itaca Society
    </Link>
  );
}

/**
 * Il marchio con l'occhio. Brand book: segno unico, mai deformato o ricolorato,
 * versione ink su fondo chiaro e cream su fondo scuro, larghezza minima 120 px a schermo.
 */
export function BrandMark({
  tone = "ink",
  width = 200,
  className,
  priority,
}: {
  tone?: "ink" | "cream";
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  const w = Math.max(120, width);
  return (
    <Image
      src={tone === "ink" ? "/brand/logo-ink.png" : "/brand/logo-cream.png"}
      alt="Itaca Society"
      width={w}
      height={Math.round((w * 1616) / 1931)}
      priority={priority}
      className={className}
    />
  );
}
