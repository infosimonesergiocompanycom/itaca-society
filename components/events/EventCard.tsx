import { MapPin } from "lucide-react";
import type { ItacaEvent } from "@/data/itacaData";
import { dateParts } from "@/lib/format";
import { ZoomImage } from "@/components/ui/ZoomImage";

export function EventCard({ event, action }: { event: ItacaEvent; action?: React.ReactNode }) {
  const d = dateParts(event.date);
  return (
    <article className="group flex h-full flex-col">
      <div className="relative">
        <ZoomImage src={event.image} alt={event.title} className="aspect-[4/3]" />
        <div className="absolute left-3 top-3 flex flex-col items-center rounded-full bg-calce px-3 py-2 text-carbone">
          <span className="font-serif text-xl leading-none">{d.day}</span>
          <span className="mt-0.5 text-[0.65rem] font-medium">{d.monthShort}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col pr-4 pt-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-tortora">{event.category}</span>
          <span className="text-xs capitalize text-tortora">
            {d.weekday} · {event.time}
          </span>
        </div>
        <h3 className="mt-2 font-sans text-[0.9375rem] font-medium leading-snug">{event.title}</h3>
        <p className="mt-2 line-clamp-3 text-[0.9375rem] leading-relaxed">{event.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-3">
          <p className="flex items-center gap-2 text-xs text-carbone">
            <MapPin size={14} strokeWidth={1.25} className="text-tortora" aria-hidden />
            {event.place} — {event.room}
          </p>
          {action}
        </div>
      </div>
    </article>
  );
}
