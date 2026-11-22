"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import { validateEmail } from "../schemas";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateEmail(email);
    setError(next);
    if (next) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  if (sent) {
    return (
      <div className="space-y-4 text-center">
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary">
          <MailCheck className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-bold">Periksa email Anda</h2>
          <p className="mt-2 text-sm leading-6 text-text-muted">
            Kami mengirim tautan pengaturan ulang kata sandi ke <strong className="text-text">{email}</strong>. Tautan berlaku selama 30 menit.
          </p>
        </div>
        <Button variant="secondary" className="w-full" onClick={() => setSent(false)}>
          Kirim ulang email
        </Button>
        <Link href="/masuk" className="inline-flex min-h-11 items-center justify-center gap-1 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke halaman masuk
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <p className="text-sm leading-6 text-text-muted">Masukkan email yang terdaftar. Kami akan mengirim tautan untuk membuat kata sandi baru.</p>
      <FormField label="Email" htmlFor="forgot-email" error={error} required>
        <Input id="forgot-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="nama@email.com" />
      </FormField>
      <Button type="submit" className="w-full" size="lg" loading={loading}>
        <Send className="size-4" aria-hidden="true" />
        Kirim tautan reset
      </Button>
      <Link href="/masuk" className="inline-flex min-h-11 w-full items-center justify-center gap-1 text-sm font-medium text-primary hover:underline">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Kembali ke halaman masuk
      </Link>
    </form>
  );
}
