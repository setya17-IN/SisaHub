import type { Metadata } from "next";
import { ResetPasswordForm } from "@/features/auth";

export const metadata: Metadata = { title: "Atur ulang kata sandi" };

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Keamanan akun</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Atur ulang kata sandi</h1>
        <p className="mt-2 text-sm leading-6 text-text-muted">Buat kata sandi baru untuk mengamankan akun Anda.</p>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
