import {
  Anchor, Armchair, BedDouble, BookOpen, CalendarDays, Mountain, Sailboat, UsersRound, Coffee, Compass, Disc3, Droplets, Film, Flame,
  Footprints, Headphones, KeyRound, Landmark, Leaf, Library, Palette, Plane, Sprout, Sun,
  Sunset, TreePine, UtensilsCrossed, Wine, type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/data/itacaData";

const map: Record<IconKey, LucideIcon> = {
  headphones: Headphones,
  utensils: UtensilsCrossed,
  leaf: Leaf,
  palette: Palette,
  wine: Wine,
  sunset: Sunset,
  bed: BedDouble,
  library: Library,
  footprints: Footprints,
  flame: Flame,
  droplets: Droplets,
  sprout: Sprout,
  anchor: Anchor,
  compass: Compass,
  key: KeyRound,
  film: Film,
  coffee: Coffee,
  trees: TreePine,
  landmark: Landmark,
  plane: Plane,
  sun: Sun,
  armchair: Armchair,
  disc: Disc3,
  calendar: CalendarDays,
  users: UsersRound,
  mountain: Mountain,
  sailboat: Sailboat,
};

export function Icon({ name, size = 22, className }: { name: IconKey; size?: number; className?: string }) {
  const Cmp = map[name] ?? BookOpen;
  return <Cmp size={size} strokeWidth={1.25} className={className} aria-hidden />;
}
