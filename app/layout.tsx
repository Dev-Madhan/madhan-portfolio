import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivoFont = Archivo({
  display: 'swap',
  weight: 'variable',
  variable: "--font-archivo",
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
        className={`${archivoFont.variable} antialiased bg-stone-200 text-stone-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
