import Link from "next/link";
import { ArrowLeft, Recycle } from "lucide-react";
import { AuthAside } from "@/features/auth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthAside />
      <main className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 sm:px-8 lg:justify-end">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-primary lg:hidden">
            <span className="inline-flex size-9 items-center justify-center rounded-control bg-primary-50">
              <Recycle className="size-5" aria-hidden="true" />
            </span>
            SisaHub
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kembali ke beranda
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
