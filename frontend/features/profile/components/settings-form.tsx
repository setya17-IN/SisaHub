"use client";
import { useState } from "react";
import { Bell, LockKeyhole, Save, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField, Select, Switch, Textarea } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";

export function SettingsForm() {
  const { toast } = useToast();
  const [emailNotif, setEmailNotif] = useState(true);
  const [requestNotif, setRequestNotif] = useState(true);
  const [matchNotif, setMatchNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showCity, setShowCity] = useState(true);
  const [saving, setSaving] = useState(false);

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toast({ title: "Pengaturan disimpan", description: "Perubahan Anda sudah diterapkan.", tone: "success" });
    }, 500);
  };

  return (
    <Tabs
      tabs={[
        {
          id: "profile",
          label: "Profil",
          content: (
            <form onSubmit={save} className="space-y-4">
              <Card className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserRound className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="font-bold">Informasi profil</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Nama lengkap" htmlFor="settings-name" required>
                    <Input id="settings-name" defaultValue="Rina Putri" />
                  </FormField>
                  <FormField label="Nama organisasi" htmlFor="settings-org">
                    <Input id="settings-org" defaultValue="Rina Konveksi" />
                  </FormField>
                  <FormField label="Email" htmlFor="settings-email" required>
                    <Input id="settings-email" type="email" defaultValue="rina@example.com" />
                  </FormField>
                  <FormField label="Nomor telepon" htmlFor="settings-phone">
                    <Input id="settings-phone" type="tel" defaultValue="081234567890" />
                  </FormField>
                  <FormField label="Kota" htmlFor="settings-city">
                    <Select id="settings-city" defaultValue="Surabaya">
                      <option>Surabaya</option>
                      <option>Bandung</option>
                      <option>Jakarta Selatan</option>
                      <option>Yogyakarta</option>
                      <option>Solo</option>
                      <option>Semarang</option>
                    </Select>
                  </FormField>
                  <FormField label="Jenis akun" htmlFor="settings-type">
                    <Select id="settings-type" defaultValue="owner">
                      <option value="owner">Pemilik material</option>
                      <option value="seeker">Pencari material</option>
                      <option value="both">Keduanya</option>
                    </Select>
                  </FormField>
                </div>
                <FormField label="Bio" htmlFor="settings-bio" hint="Tampil di profil publik Anda.">
                  <Textarea id="settings-bio" defaultValue="Pemilik konveksi kecil di Surabaya yang rutin menyisihkan kain perca untuk pengrajin dan komunitas." />
                </FormField>
              </Card>

              <Card className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="font-bold">Privasi profil</h2>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-control bg-surface p-3">
                  <div><p className="text-sm font-medium">Profil publik</p><p className="text-xs text-text-muted">Izinkan pengguna lain melihat profil dan listing Anda.</p></div>
                  <Switch label="Profil publik" checked={publicProfile} onChange={setPublicProfile} />
                </div>
                <div className="flex items-start justify-between gap-4 rounded-control bg-surface p-3">
                  <div><p className="text-sm font-medium">Tampilkan kota</p><p className="text-xs text-text-muted">Kota ditampilkan pada listing dan profil.</p></div>
                  <Switch label="Tampilkan kota" checked={showCity} onChange={setShowCity} />
                </div>
              </Card>

              <Button type="submit" loading={saving}><Save className="size-4" aria-hidden="true" />Simpan perubahan</Button>
            </form>
          ),
        },
        {
          id: "notifications",
          label: "Notifikasi",
          content: (
            <form onSubmit={save} className="space-y-4">
              <Card className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="font-bold">Preferensi notifikasi</h2>
                </div>
                {[
                  { label: "Email transaksi", description: "Permintaan baru, persetujuan, dan pembaruan status.", value: emailNotif, onChange: setEmailNotif },
                  { label: "Permintaan material", description: "Notifikasi saat ada permintaan masuk.", value: requestNotif, onChange: setRequestNotif },
                  { label: "Smart Match", description: "Rekomendasi material yang cocok dengan kebutuhan.", value: matchNotif, onChange: setMatchNotif },
                  { label: "Info dan promosi", description: "Kabar produk, tips, dan program komunitas.", value: marketing, onChange: setMarketing },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 rounded-control bg-surface p-3">
                    <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-text-muted">{item.description}</p></div>
                    <Switch label={item.label} checked={item.value} onChange={item.onChange} />
                  </div>
                ))}
              </Card>
              <Button type="submit" loading={saving}><Save className="size-4" aria-hidden="true" />Simpan preferensi</Button>
            </form>
          ),
        },
        {
          id: "security",
          label: "Keamanan",
          content: (
            <form onSubmit={save} className="space-y-4">
              <Card className="space-y-4">
                <div className="flex items-center gap-2">
                  <LockKeyhole className="size-5 text-primary" aria-hidden="true" />
                  <h2 className="font-bold">Kata sandi</h2>
                </div>
                <FormField label="Kata sandi saat ini" htmlFor="settings-current-password" required>
                  <Input id="settings-current-password" type="password" autoComplete="current-password" />
                </FormField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Kata sandi baru" htmlFor="settings-new-password" hint="Minimal 8 karakter." required>
                    <Input id="settings-new-password" type="password" autoComplete="new-password" />
                  </FormField>
                  <FormField label="Konfirmasi kata sandi baru" htmlFor="settings-confirm-password" required>
                    <Input id="settings-confirm-password" type="password" autoComplete="new-password" />
                  </FormField>
                </div>
              </Card>
              <Card className="bg-surface">
                <h2 className="font-bold">Sesi aktif</h2>
                <p className="mt-1 text-sm text-text-muted">Anda masuk dari 2 perangkat. Keluar dari perangkat yang tidak dikenal untuk menjaga keamanan.</p>
                <div className="mt-3 flex items-center justify-between rounded-control border border-border bg-background p-3 text-sm">
                  <div><p className="font-medium">Chrome - Windows</p><p className="text-xs text-text-muted">Surabaya, aktif sekarang</p></div>
                  <Button type="button" variant="secondary" size="sm" onClick={() => toast({ title: "Sesi lain diakhiri", tone: "success" })}>Akhiri</Button>
                </div>
              </Card>
              <Button type="submit" loading={saving}><Save className="size-4" aria-hidden="true" />Perbarui keamanan</Button>
            </form>
          ),
        },
      ]}
    />
  );
}
