"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ImagePlus, Info, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField, Select, Switch, Textarea } from "@/components/ui/controls";
import { FileUploader } from "@/components/ui/file-uploader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ScannerPanel } from "@/features/scanner";
import type { Material } from "../types";
import {
  MATERIAL_CATEGORY_OPTIONS,
  MATERIAL_CITIES,
  MATERIAL_CONDITION_OPTIONS,
} from "../constants";

export function MaterialForm({ material }: { material?: Material }) {
  const { toast } = useToast();
  const [title, setTitle] = useState(material?.title ?? "");
  const [category, setCategory] = useState(material?.category ?? "kain");
  const [condition, setCondition] = useState(material?.condition ?? "good");
  const [description, setDescription] = useState(material?.description ?? "");
  const [priceType, setPriceType] = useState(material?.priceType ?? "free");
  const [negotiable, setNegotiable] = useState(true);
  const [published, setPublished] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPublished(true);
    toast({
      title: material ? "Perubahan disimpan" : "Material berhasil dipublikasikan",
      description: material ? "Informasi material telah diperbarui." : "Material Anda sekarang terlihat di halaman Jelajahi.",
      tone: "success",
    });
  };

  if (published) {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-2xl font-bold">{material ? "Material diperbarui" : "Material siap dibagikan"}</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          {material
            ? "Perubahan Anda sudah tersimpan dan akan terlihat oleh pencari material."
            : "Material Anda sudah masuk ke daftar. Anda dapat mengelola status dan permintaan dari dashboard."}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto">Kembali ke dashboard</Button>
          </Link>
          <Link href="/jelajahi">
            <Button variant="secondary" className="w-full sm:w-auto">Lihat di Jelajahi</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_21rem]">
      <div className="space-y-6">
        <Card className="space-y-5">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control bg-primary-50 text-primary">
              <ImagePlus className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-bold">Foto material</h2>
              <p className="text-sm text-text-muted">Gunakan foto asli dengan pencahayaan cukup. Foto pertama menjadi sampul.</p>
            </div>
          </div>
          <FileUploader maxFiles={5} maxSizeMb={5} />
        </Card>

        <Card className="space-y-5">
          <div>
            <h2 className="font-bold">Informasi material</h2>
            <p className="text-sm text-text-muted">Tulis informasi yang jelas agar mudah ditemukan oleh pencari material.</p>
          </div>

          <FormField label="Nama material" htmlFor="material-title" required hint="Contoh: Sisa kain katun perca 50 meter.">
            <Input
              id="material-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Masukkan nama material"
              maxLength={100}
              required
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Kategori" htmlFor="material-category" required>
              <Select id="material-category" value={category} onChange={(event) => setCategory(event.target.value as typeof category)}>
                {MATERIAL_CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Kondisi" htmlFor="material-condition" required>
              <Select id="material-condition" value={condition} onChange={(event) => setCondition(event.target.value as typeof condition)}>
                {MATERIAL_CONDITION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Jumlah" htmlFor="material-quantity" required>
              <Input id="material-quantity" type="number" min={1} defaultValue={material?.quantity ?? 1} required />
            </FormField>
            <FormField label="Satuan" htmlFor="material-unit" required>
              <Select id="material-unit" defaultValue={material?.unit ?? "kg"}>
                <option value="kg">kilogram (kg)</option>
                <option value="meter">meter</option>
                <option value="batang">batang</option>
                <option value="lembar">lembar</option>
                <option value="pcs">pcs</option>
                <option value="karung">karung</option>
              </Select>
            </FormField>
          </div>

          <FormField label="Deskripsi" htmlFor="material-description" required hint="Jelaskan asal material, ukuran, dan hal yang perlu diketahui pencari.">
            <Textarea
              id="material-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ceritakan kondisi, ukuran, dan potensi pemanfaatan material..."
              maxLength={1200}
              required
            />
          </FormField>

          <FormField label="Tag" htmlFor="material-tags" hint="Pisahkan dengan koma, maksimal 5 tag.">
            <Input id="material-tags" defaultValue={material?.tags.join(", ")} placeholder="katun, perca, kerajinan" />
          </FormField>
        </Card>

        <Card className="space-y-5">
          <div>
            <h2 className="font-bold">Harga dan pengambilan</h2>
            <p className="text-sm text-text-muted">Material gratis lebih mudah menemukan penerima yang tepat.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Jenis harga" htmlFor="material-price-type" required>
              <Select id="material-price-type" value={priceType} onChange={(event) => setPriceType(event.target.value as typeof priceType)}>
                <option value="free">Gratis</option>
                <option value="paid">Berbayar</option>
              </Select>
            </FormField>
            {priceType === "paid" && (
              <FormField label="Harga" htmlFor="material-price" required hint="Masukkan angka tanpa titik.">
                <Input id="material-price" type="number" min={0} defaultValue={material?.priceAmount ?? undefined} placeholder="150000" required />
              </FormField>
            )}
            <FormField label="Kota" htmlFor="material-city" required>
              <Select id="material-city" defaultValue={material?.city ?? "Surabaya"}>
                {MATERIAL_CITIES.filter((city) => city !== "Semua kota").map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Provinsi" htmlFor="material-province" required>
              <Input id="material-province" defaultValue={material?.province ?? "Jawa Timur"} required />
            </FormField>
          </div>
          <div className="flex items-start justify-between gap-4 rounded-control bg-surface p-3">
            <div>
              <p className="text-sm font-medium">Harga dapat dinegosiasikan</p>
              <p className="text-xs text-text-muted">Izinkan pencari mengajukan penawaran.</p>
            </div>
            <Switch label="Harga dapat dinegosiasikan" checked={negotiable} onChange={setNegotiable} />
          </div>
        </Card>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <Link href="/dashboard">
            <Button type="button" variant="ghost" className="w-full sm:w-auto">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Batal
            </Button>
          </Link>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="button" variant="secondary" onClick={() => toast({ title: "Draf disimpan", description: "Anda dapat melanjutkan nanti dari dashboard.", tone: "info" })}>
              <Save className="size-4" aria-hidden="true" />
              Simpan draf
            </Button>
            <Button type="submit">{material ? "Simpan perubahan" : "Publikasikan material"}</Button>
          </div>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <ScannerPanel
          onResult={(result) => {
            if (!title) setTitle(result.suggestedTitle);
            setCategory(result.category as typeof category);
            setCondition(result.condition);
            if (!description) setDescription(result.note);
          }}
        />
        <Card className="bg-surface p-4">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Tips publikasi
          </p>
          <ul className="mt-2 space-y-2 text-xs leading-5 text-text-muted">
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />Gunakan judul yang menyebut jenis dan jumlah material.</li>
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />Sebutkan lokasi pengambilan secara jelas.</li>
            <li className="flex gap-2"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />Periksa material terlarang sebelum mengunggah.</li>
          </ul>
          <Link href="/material-terlarang" className="mt-3 inline-flex min-h-9 items-center gap-1 text-xs font-medium text-primary hover:underline">
            <Info className="size-3.5" aria-hidden="true" />
            Baca daftar material terlarang
          </Link>
        </Card>
      </aside>
    </form>
  );
}
