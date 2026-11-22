import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth";

export const metadata: Metadata = { title: "Daftar" };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Bergabung gratis</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Buat akun SisaHub</h1>
        <p className="mt-2 text-sm leading-6 text-text-muted">Mulai bagikan material atau temukan bahan untuk proyek berikutnya.</p>
      </div>
      <RegisterForm />
    </div>
  );
}
