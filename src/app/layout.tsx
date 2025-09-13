import DevBadge from "@/components/ui/dev-badge";
import { khInterference, ppFraktionMono } from "@/lib/fonts";
import "@/styles/globals.scss";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Taopik Hidayat - Portfolio",
  description: "Personal portfolio website of Taopik Hidayat - Developer exploring AI and Web3 technologies",
  keywords: ["taopikhidayat", "portfolio", "web development", "AI", "Web3", "developer"],
  authors: [{ name: "Taopik Hidayat" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${khInterference.variable} ${ppFraktionMono.variable}`}>
      <body>
        {children}
        <DevBadge />
      </body>
    </html>
  );
}
