import type { Metadata } from "next";
import { Inter, Mukta_Malar } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const muktaMalar = Mukta_Malar({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["tamil"],
  variable: "--font-mukta",
});

export const metadata: Metadata = {
  title: "TN PolitiGuide 2026",
  description: "A neutral, data-driven guide for Tamil Nadu voters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${muktaMalar.variable} antialiased bg-slate-50 text-slate-900 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
