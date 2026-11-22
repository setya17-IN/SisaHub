import type { Metadata } from "next";
import { LoginForm } from "@/features/auth";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Selamat datang kembali</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Masuk ke akun SisaHub</h1>
        <p className="mt-2 text-sm leading-6 text-text-muted">Kelola material, permintaan, dan dampak Anda dalam satu tempat.</p>
      </div>
      <LoginForm />
      <div className="rounded-card border border-border bg-surface p-3 text-xs leading-5 text-text-muted">
        <p className="font-semibold text-text">Mode pratinjau</p>
        <p className="mt-1">Gunakan tombol &quot;Lihat sebagai&quot; di kiri bawah untuk mencoba tampilan pemilik, pencari, dan admin.</p>
      </div>
    </div>
  );
}
