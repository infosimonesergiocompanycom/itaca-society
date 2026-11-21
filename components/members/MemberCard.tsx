import { cn, shortDate } from "@/lib/format";

/** Tessera digitale: da mostrare dal telefono all'ingresso degli eventi. */
export function MemberCard({
  name,
  number,
  validUntil,
  active,
  qrSvg,
}: {
  name: string;
  number: string;
  validUntil: string | null;
  active: boolean;
  qrSvg: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[380px] overflow-hidden rounded-[18px] bg-carbone p-6 text-calce shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)]",
        !active && "opacity-60 grayscale",
      )}
    >
      <div className="flex items-start justify-between">
        <p className="wordmark text-[0.85rem]">Itaca Society</p>
        <p className="text-[0.75rem]">Tessera associativa</p>
      </div>
      <div className="mt-6 rounded-xl bg-calce p-5">
        <div className="mx-auto aspect-square w-full max-w-[240px] text-carbone [&_svg]:h-full [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
      </div>
      <p className="mt-6 font-serif text-[1.9rem] leading-tight">{name}</p>
      <div className="mt-3 flex items-end justify-between gap-4 text-sm">
        <div>
          <p className="text-calce/60">Numero</p>
          <p className="font-medium tracking-wide">{number}</p>
        </div>
        <div className="text-right">
          <p className="text-calce/60">{active ? "Valida fino al" : "Scaduta il"}</p>
          <p className="font-medium">{validUntil ? shortDate(validUntil) : "—"}</p>
        </div>
      </div>
      <p className={cn("mt-5 rounded-full px-3 py-1.5 text-center text-xs font-semibold", active ? "bg-[#3d6b4f] text-calce" : "bg-calce/15")}>
        {active ? "Socio in regola" : "Tessera non valida: rinnova la quota"}
      </p>
    </div>
  );
}
