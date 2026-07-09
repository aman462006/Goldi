import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { SiteChrome } from "@/components/layout/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOPCon — Journey Inside a Solar Cell",
  description:
    "An interactive, cinematic guide to TOPCon solar cell manufacturing — from silicon wafer to high-efficiency photovoltaic device. Every step, physics, chemistry and layer, visualized.",
  keywords: [
    "TOPCon",
    "solar cell",
    "photovoltaics",
    "ALD",
    "LPCVD",
    "PECVD",
    "tunnel oxide",
    "passivated contact",
    "semiconductor manufacturing",
  ],
  authors: [{ name: "TOPCon Journey" }],
  openGraph: {
    title: "TOPCon — Journey Inside a Solar Cell",
    description:
      "Travel inside a TOPCon solar cell and learn the complete manufacturing process, visualized.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <SiteChrome />
          <main className="relative">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
