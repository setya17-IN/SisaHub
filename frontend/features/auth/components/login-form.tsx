"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, FormField } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { validateEmail, validatePassword } from "../schemas";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("rina@example.com");
  const [password, setPassword] = useState("sisahub123");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toast({ title: "Berhasil masuk", description: "Selamat datang kembali di SisaHub.", tone: "success" });
      router.push("/dashboard");
    }, 600);
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <FormField label="Email" htmlFor="login-email" error={errors.email} required>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: undefined })); }}
          placeholder="nama@email.com"
          aria-invalid={Boolean(errors.email)}
        />
      </FormField>

      <FormField label="Kata sandi" htmlFor="login-password" error={errors.password} required>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined })); }}
            placeholder="Masukkan kata sandi"
            className="pr-12"
            aria-invalid={Boolean(errors.password)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            className="absolute right-0 top-0 inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:text-text"
          >
            {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </FormField>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="inline-flex min-h-11 items-center gap-2 text-sm">
          <Checkbox checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          Ingat saya
        </label>
        <Link href="/lupa-password" className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">
          Lupa kata sandi?
        </Link>
      </div>

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        <LogIn className="size-4" aria-hidden="true" />
        Masuk
      </Button>

      <p className="text-center text-sm text-text-muted">
        Belum punya akun?{" "}
        <Link href="/daftar" className="font-medium text-primary hover:underline">
          Daftar gratis
        </Link>
      </p>
    </form>
  );
}
