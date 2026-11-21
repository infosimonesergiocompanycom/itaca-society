import type { Metadata, Viewport } from "next";
import { IM_Fell_English, Jost, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { unstable_rethrow } from "next/navigation";
import { currentMember } from "@/lib/server/auth";
import "./globals.css";

// Tipografia da brand book: Jost (titoli e testo), Playfair Display (citazioni), IM Fell English (solo wordmark)
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

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
  themeColor: "#F8F4E9",
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
    <html lang="it" className={`${jost.variable} ${playfair.variable} ${fell.variable}`}>
      <body className="min-h-screen bg-calce font-sans text-carbone">
        <Header member={member ? { firstName: member.first_name, role: member.role } : null} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
