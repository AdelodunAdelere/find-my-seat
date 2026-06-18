import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Pinyon_Script } from "next/font/google";
import { EVENT } from "@/lib/event";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `Find your seat — ${EVENT.celebrantName}'s 60th birthday and 25th wedding anniversary celebration`,
  description: `Find your table for ${EVENT.celebrantName}'s 60th birthday and 25th wedding anniversary celebration.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hankenGrotesk.variable} ${pinyonScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
