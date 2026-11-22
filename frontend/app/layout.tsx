import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "SisaHub", template: "%s | SisaHub" },
  description: "Platform penghubung material sisa layak pakai.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={inter.variable}
    >
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
