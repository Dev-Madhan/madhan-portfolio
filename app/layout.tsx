import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
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
        className={`${archivoFont.variable} ${interFont.variable} antialiased bg-stone-200 text-stone-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
