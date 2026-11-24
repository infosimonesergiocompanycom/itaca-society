import type { Metadata, Viewport } from "next";
import { DM_Mono, Hanken_Grotesk, IM_Fell_English, Newsreader } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { unstable_rethrow } from "next/navigation";
import { currentMember } from "@/lib/server/auth";
import "./globals.css";

// Tipografia (brand book, revisione novembre 2026): Newsreader per titoli e testi, Hanken Grotesk per
// navigazione e testo di servizio, DM Mono per le etichette, IM Fell English solo per il wordmark
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-hanken", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dmmono", display: "swap" });

const fell = IM_Fell_English({ subsets: ["latin"], weight: "400", variable: "--font-imfell", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Itaca Society — Live the journey",
    template: "%s — Itaca Society",
  },
  description:
    "Comunità, cultura, Versilia. Itaca Society crea a Pietrasanta esperienze ed eventi che diffondono gli ideali classici di bellezza, armonia, virtù e conoscenza.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Il sito resta navigabile anche se il database non è raggiungibile
  let member = null;
  try {
    member = await currentMember();
  } catch (err) {
    unstable_rethrow(err);
    console.error("Sessione non disponibile:", err);
  }
  return (
    <html lang="it" className={`${newsreader.variable} ${hanken.variable} ${dmMono.variable} ${fell.variable}`}>
      <body className="min-h-screen bg-calce font-sans text-carbone">
        <Header member={member ? { firstName: member.first_name, role: member.role } : null} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
