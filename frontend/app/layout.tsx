import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "SisaHub - Sisa material, peluang baru", template: "%s | SisaHub" },
  description:
    "SisaHub menghubungkan pemilik material sisa layak pakai dengan pengrajin, komunitas, dan usaha kecil melalui Smart Matching dan AI Material Scanner.",
  applicationName: "SisaHub",
  keywords: ["material sisa", "waste to worth", "daur ulang", "ekonomi sirkular", "SisaHub"],
  authors: [{ name: "SisaHub" }],
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
