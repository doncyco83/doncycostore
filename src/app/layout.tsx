import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "DonCyco Store | Koleksi Musik Vintage & Rilisan Fisik Langka",
  description:
    "DonCyco Store menyediakan piringan hitam (vinyl), kaset pita, CD, dan action figure kolektibel antik. Berdiri sejak 2010, berbasis di Semarang, melayani kolektor musik bawah tanah.",
  keywords: [
    "DonCyco Store",
    "DonCyco",
    "piringan hitam",
    "vinyl",
    "kaset pita",
    "kaset jadul",
    "CD musik",
    "action figure",
    "musik vintage",
    "toko musik Semarang",
    "Semarang",
  ],
  authors: [{ name: "DonCyco Store Team" }],
  openGraph: {
    title: "DonCyco Store | Koleksi Musik Vintage & Rilisan Fisik Langka",
    description:
      "Markas rilisan fisik vintage: vinyl, kaset, CD, dan collectible items. Berburu rilisan lokal & internasional langka sejak 2010 di Semarang.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${nunito.variable} font-body bg-brand-dark text-white min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
        <AudioPlayer />
      </body>
    </html>
  );
}
