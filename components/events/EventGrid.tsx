"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { eventCategories, type ItacaEvent } from "@/data/itacaData";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/format";
import { EventCard } from "./EventCard";

type Filter = (typeof eventCategories)[number];

export function EventFilters({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <div role="tablist" aria-label="Filtra per categoria" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
      {eventCategories.map((c) => {
        const active = c === value;
        return (
          <button
            key={c}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(c)}
            className={cn(
              "relative shrink-0 whitespace-nowrap border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300 ease-editorial",
              active ? "border-carbone text-calce" : "border-carbone/30 text-carbone hover:border-carbone",
            )}
          >
            {active && (
              <motion.span
                layoutId="event-filter"
                className="absolute inset-0 bg-carbone"
                transition={{ duration: 0.7, ease: EASE }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        );
      })}
    </div>
  );
}

export function EventGrid({
  events,
  limit,
  renderAction,
}: {
  events: ItacaEvent[];
  limit?: number;
  renderAction?: (e: ItacaEvent) => React.ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("Tutti");

  const list = useMemo(() => {
    const filtered = filter === "Tutti" ? events : events.filter((e) => e.category === filter);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [events, filter, limit]);

  return (
    <div>
      <EventFilters value={filter} onChange={setFilter} />
      <motion.div layout className="mt-10 grid gap-x-1.5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((e, i) => (
            <motion.div
              key={e.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 5) * 0.05 }}
            >
              <EventCard event={e} action={renderAction?.(e)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="mt-12 font-serif text-2xl italic text-tortora">Nessun incontro in calendario per questa categoria.</p>
      )}
    </div>
  );
}
