import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font display (heading) — karakter techy tapi tetep rapi
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

// Font body — enak dibaca buat paragraf panjang
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

// Font mono — buat label/eyebrow ala komentar kode
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rizky Alfath — Frontend Developer",
  description:
    "Portfolio Rizky Alfath, fresh graduate SMK RPL yang fokus di frontend development. Lihat project, skill, dan pengalaman di sini.",
  // Ganti "namakamu" sesuai domain/username kamu nanti
  metadataBase: new URL("https://namakamu.vercel.app"),
  openGraph: {
    title: "Rizky Alfath — Frontend Developer",
    description: "Portfolio Rizky Alfath, fresh graduate SMK RPL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-bg text-primary font-body`}
      >
        {children}
      </body>
    </html>
  );
}