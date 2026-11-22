"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox, FormField, RadioGroup } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { validateEmail, validatePassword, validateRequired } from "../schemas";

type AccountRole = "owner" | "seeker";
type Errors = Partial<Record<"name" | "email" | "phone" | "password" | "confirm" | "terms", string>>;

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<AccountRole>("owner");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Errors = {
      name: validateRequired(name, "Nama"),
      email: validateEmail(email),
      phone: validateRequired(phone, "Nomor telepon"),
      password: validatePassword(password),
      confirm: password !== confirm ? "Konfirmasi kata sandi belum sama." : undefined,
      terms: terms ? undefined : "Anda perlu menyetujui syarat dan ketentuan.",
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toast({ title: "Akun berhasil dibuat", description: "Lengkapi profil Anda untuk mulai bertransaksi.", tone: "success" });
      router.push("/dashboard");
    }, 700);
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <RadioGroup
        label="Saya ingin..."
        name="register-role"
        value={role}
        onChange={setRole}
        options={[
          { value: "owner", label: "Membagikan material" },
          { value: "seeker", label: "Mencari material" },
        ]}
      />

      <FormField label="Nama lengkap atau organisasi" htmlFor="register-name" error={errors.name} required>
        <Input id="register-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="Contoh: Rina Putri" />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Email" htmlFor="register-email" error={errors.email} required>
          <Input id="register-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="nama@email.com" />
        </FormField>
        <FormField label="Nomor telepon" htmlFor="register-phone" error={errors.phone} required>
          <Input id="register-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" placeholder="0812xxxxxxx" />
        </FormField>
      </div>

      <FormField label="Kata sandi" htmlFor="register-password" error={errors.password} hint="Minimal 8 karakter." required>
        <div className="relative">
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            placeholder="Buat kata sandi"
            className="pr-12"
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

      <FormField label="Konfirmasi kata sandi" htmlFor="register-confirm" error={errors.confirm} required>
        <Input id="register-confirm" type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" placeholder="Ulangi kata sandi" />
      </FormField>

      <div>
        <label className="flex min-h-11 items-start gap-2 text-sm leading-6">
          <Checkbox checked={terms} onChange={(event) => setTerms(event.target.checked)} className="mt-0.5" />
          <span>
            Saya menyetujui{" "}
            <Link href="/syarat" className="font-medium text-primary hover:underline">syarat dan ketentuan</Link>{" "}
            serta{" "}
            <Link href="/privasi" className="font-medium text-primary hover:underline">kebijakan privasi</Link>.
          </span>
        </label>
        {errors.terms && <p role="alert" className="text-sm text-danger">{errors.terms}</p>}
      </div>

      <Button type="submit" className="w-full" size="lg" loading={loading}>
        <UserPlus className="size-4" aria-hidden="true" />
        Buat akun
      </Button>

      <p className="text-center text-sm text-text-muted">
        Sudah punya akun?{" "}
        <Link href="/masuk" className="font-medium text-primary hover:underline">Masuk</Link>
      </p>
    </form>
  );
}
