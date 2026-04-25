import type { Metadata } from "next";
import { Archivo, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const archivoFont = Archivo({
  display: 'swap',
  weight: 'variable',
  variable: "--font-archivo",
  subsets: ["latin"],
});

const interFont = Inter({
  display: 'swap',
  weight: 'variable',
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasFont = Bebas_Neue({
  display: 'swap',
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madhan Kumar",
  description: "Designed with unique style and inspired creativity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoFont.variable} ${interFont.variable} ${bebasFont.variable} antialiased bg-stone-200 text-stone-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
