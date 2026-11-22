"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import { validatePassword } from "../schemas";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      password: validatePassword(password),
      confirm: password !== confirm ? "Konfirmasi kata sandi belum sama." : undefined,
    };
    setErrors(next);
    if (next.password || next.confirm) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 600);
  };

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-bold">Kata sandi diperbarui</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">Kata sandi baru Anda sudah aktif. Silakan masuk kembali.</p>
        </div>
        <Link href="/masuk">
          <Button className="w-full">Masuk ke akun</Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <p className="text-sm leading-6 text-text-muted">Buat kata sandi baru yang kuat dan mudah Anda ingat.</p>
      <FormField label="Kata sandi baru" htmlFor="reset-password" error={errors.password} hint="Minimal 8 karakter." required>
        <Input id="reset-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" placeholder="Kata sandi baru" />
      </FormField>
      <FormField label="Konfirmasi kata sandi" htmlFor="reset-confirm" error={errors.confirm} required>
        <Input id="reset-confirm" type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" placeholder="Ulangi kata sandi baru" />
      </FormField>
      <Button type="submit" className="w-full" size="lg" loading={loading}>
        <KeyRound className="size-4" aria-hidden="true" />
        Simpan kata sandi
      </Button>
    </form>
  );
}
