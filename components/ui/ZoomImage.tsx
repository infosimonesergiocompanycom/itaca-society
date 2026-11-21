import Image from "next/image";
import { cn } from "@/lib/format";

/** Immagine statica con zoom impercettibile al passaggio del cursore sul gruppo padre. */
export function ZoomImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-travertino", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="grade object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03]"
      />
    </div>
  );
}
