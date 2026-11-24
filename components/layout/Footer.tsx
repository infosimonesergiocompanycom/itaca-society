"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

const columns = [
  {
    title: "Itaca Society",
    links: [
      { label: "Il Club", href: "/il-club" },
      { label: "Formati", href: "/formati" },
      { label: "Eventi", href: "/eventi" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Risorse",
    links: [
      { label: "Tesseramento", href: "/membership" },
      { label: "Il patto tra soci", href: "/regole" },
      { label: "Area soci", href: "/area-soci" },
      { label: "Privacy", href: "/privacy" },
      { label: "Crediti fotografici", href: "/crediti" },
    ],
  },
  {
    title: "Contatti",
    links: [
      { label: "Pietrasanta · Versilia", href: "/contatti" },
      { label: "info@itacasociety.com", href: "mailto:info@itacasociety.com" },
      { label: "soci@itacasociety.com", href: "mailto:soci@itacasociety.com" },
    ],
  },
];

/** Footer a colonne: marchio, link, contatti e lettere da Itaca. */
export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/anteprima")) return null;

  return (
    <footer className="px-4 pb-6 sm:px-8">
      <div className="border-t border-carbone/20 pt-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <BrandMark width={130} />
          {columns.map((c) => (
            <div key={c.title}>
              <p className="caps text-[0.66rem] tracking-[0.12em]">{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-[0.9rem]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-terracotta">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="caps text-[0.66rem] tracking-[0.12em]">Lettere da Itaca</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-carbone/20 pt-5 text-[0.7rem] text-tortora">
          <p>© 2026 Itaca Society · Associazione culturale · Pietrasanta (LU) · Comunità · Cultura · Versilia</p>
          <p className="font-serif text-[0.85rem] italic">«live the journey»</p>
        </div>
      </div>
    </footer>
  );
}
