import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/auth";

export const metadata: Metadata = { title: "Lupa kata sandi" };

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Pemulihan akun</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Lupa kata sandi?</h1>
        <p className="mt-2 text-sm leading-6 text-text-muted">Masukkan email terdaftar untuk menerima tautan pengaturan ulang.</p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
