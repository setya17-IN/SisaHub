"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Eye,
  Heart,
  MapPin,
  MessageSquare,
  Package,
  Share2,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/controls";
import { Modal } from "@/components/ui/modal";
import { Rating } from "@/components/ui/rating";
import { useToast } from "@/components/ui/toast";
import { formatDateId, formatRupiah } from "@/lib/utils/format";
import { ReviewList, ReviewSummary, type Review } from "@/features/review";
import { LocationMap, materialPins } from "@/features/map";
import { ReportButton } from "@/features/report";
import type { Material, MaterialCardItem } from "../types";
import { MATERIAL_CATEGORY_LABELS, MATERIAL_CONDITION_LABELS, MATERIAL_STATUS_LABELS } from "../constants";
import { MaterialGrid } from "./material-grid";
import { MaterialImage } from "./material-image";
import { CategoryChip, MaterialStatusBadge, PriceBadge } from "./material-badges";

export function MaterialDetail({
  material,
  related,
  reviews,
}: {
  material: Material;
  related: MaterialCardItem[];
  reviews: Review[];
}) {
  const { toast } = useToast();
  const [favorite, setFavorite] = useState(material.isFavorite ?? false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Tautan disalin", description: "Bagikan material ini ke komunitas Anda.", tone: "success" });
    } catch {
      toast({ title: "Tidak dapat menyalin", description: "Salin alamat halaman secara manual.", tone: "error" });
    }
  };

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Jelajahi", href: "/jelajahi" },
              { label: MATERIAL_CATEGORY_LABELS[material.category], href: "/jelajahi" },
              { label: material.title },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_22rem] lg:px-8">
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryChip category={material.category} />
            <MaterialStatusBadge status={material.status} />
            <Badge tone="neutral">Kondisi: {MATERIAL_CONDITION_LABELS[material.condition]}</Badge>
            <Badge tone="primary">
              <Sparkles className="mr-1 size-3" aria-hidden="true" /> Smart Match 92%
            </Badge>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{material.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" aria-hidden="true" />
                {material.city}, {material.province}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="size-4" aria-hidden="true" />
                Diunggah {formatDateId(material.createdAt)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye className="size-4" aria-hidden="true" />
                {material.views} dilihat
              </span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-4">
            <div className="sm:col-span-3">
              <MaterialImage category={material.category} title={material.title} imageUrl={material.imageUrl} className="rounded-card border border-border" />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-1">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative overflow-hidden rounded-control border border-border">
                  <MaterialImage category={material.category} title={`${material.title} - foto ${index + 2}`} className="aspect-square" />
                  <span className="absolute inset-0 bg-neutral-900/5" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <Card>
            <h2 className="text-lg font-bold">Deskripsi material</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-text-muted">{material.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {material.tags.map((tag) => (
                <span key={tag} className="inline-flex min-h-8 items-center rounded-full bg-surface px-3 text-xs font-medium text-text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold">Detail material</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Kategori", value: MATERIAL_CATEGORY_LABELS[material.category], icon: Tag },
                { label: "Jumlah tersedia", value: `${material.quantity} ${material.unit}`, icon: Package },
                { label: "Kondisi", value: MATERIAL_CONDITION_LABELS[material.condition], icon: CheckCircle2 },
                { label: "Status", value: MATERIAL_STATUS_LABELS[material.status], icon: ShieldCheck },
                { label: "Harga", value: material.priceType === "free" ? "Gratis" : formatRupiah(material.priceAmount ?? 0), icon: Tag },
                { label: "Pengambilan", value: "Ambil sendiri atau kirim", icon: Truck },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-control bg-surface p-3">
                  <item.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-text-muted">{item.label}</dt>
                    <dd className="text-sm font-medium text-text">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Card>

          <section aria-labelledby="review-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="review-heading" className="text-lg font-bold">
                Ulasan komunitas
              </h2>
              <Rating value={reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0} />
            </div>
            <ReviewSummary reviews={reviews} />
            <ReviewList reviews={reviews} />
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related-heading">
              <div className="mb-4 flex items-center justify-between">
                <h2 id="related-heading" className="text-lg font-bold">
                  Material serupa
                </h2>
                <Link href="/jelajahi" className="text-sm font-medium text-primary hover:underline">
                  Lihat semua
                </Link>
              </div>
              <MaterialGrid materials={related} columns={3} />
            </section>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted">Harga</p>
                <p className="text-2xl font-bold text-text">
                  {material.priceType === "free" ? "Gratis" : formatRupiah(material.priceAmount ?? 0)}
                </p>
              </div>
              <PriceBadge free={material.priceType === "free"} amount={material.priceAmount} />
            </div>

            <div className="rounded-control bg-primary-50 p-3 text-sm text-primary-900">
              <p className="font-semibold">Tersedia untuk diambil</p>
              <p className="mt-1 text-xs leading-5">Ajukan permintaan, lalu sepakati waktu dan metode pengambilan bersama pemilik.</p>
            </div>

            <Button className="w-full" size="lg" onClick={() => setRequestOpen(true)} disabled={material.status !== "available"}>
              <MessageSquare className="size-4" aria-hidden="true" />
              Ajukan permintaan
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" onClick={() => { setFavorite((current) => !current); toast({ title: favorite ? "Dihapus dari favorit" : "Disimpan ke favorit", tone: "success" }); }}>
                <Heart className={favorite ? "size-4 fill-danger text-danger" : "size-4"} aria-hidden="true" />
                {favorite ? "Tersimpan" : "Simpan"}
              </Button>
              <Button variant="secondary" onClick={share}>
                <Share2 className="size-4" aria-hidden="true" />
                Bagikan
              </Button>
            </div>
            <p className="text-center text-xs text-text-muted">Permintaan tidak dikenakan biaya.</p>
          </Card>

          <Card className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Pemilik material</p>
            <div className="flex items-center gap-3">
              <Avatar name={material.owner.name} src={material.owner.avatar} size="lg" />
              <div className="min-w-0">
                <p className="flex items-center gap-1 font-semibold text-text">
                  {material.owner.name}
                  {material.owner.verified && <CheckCircle2 className="size-4 text-primary" aria-label="Terverifikasi" />}
                </p>
                <p className="text-xs text-text-muted">{material.owner.city}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Rating value={material.owner.rating} />
                  <span className="text-xs text-text-muted">({material.owner.reviewCount})</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-control bg-surface p-2">
                <p className="font-bold text-text">{material.owner.reviewCount}</p>
                <p className="text-text-muted">transaksi</p>
              </div>
              <div className="rounded-control bg-surface p-2">
                <p className="font-bold text-text">Sejak {new Date(material.owner.joinedAt).getFullYear()}</p>
                <p className="text-text-muted">bergabung</p>
              </div>
            </div>
            <Link href={`/profil/${material.owner.id}`} className="inline-flex min-h-11 w-full items-center justify-center rounded-control border border-border text-sm font-medium text-text hover:bg-surface">
              Lihat profil pemilik
            </Link>
          </Card>

          <Card className="bg-surface p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-text">
              <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
              Transaksi aman
            </p>
            <ul className="mt-2 space-y-1.5 text-xs leading-5 text-text-muted">
              <li>Periksa material sebelum serah-terima.</li>
              <li>Jangan mengirim uang muka tanpa kesepakatan.</li>
              <li>Laporkan aktivitas mencurigakan ke admin.</li>
            </ul>
            <div className="mt-2 border-t border-border pt-2">
              <ReportButton target={material.title} />
            </div>
          </Card>

          <LocationMap pins={materialPins} title="Lokasi sekitar" />
        </aside>
      </div>

      <Modal open={requestOpen} onClose={() => setRequestOpen(false)} title="Ajukan permintaan material">
        {requestSent ? (
          <div className="space-y-4 text-center">
            <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Permintaan terkirim</h3>
              <p className="mt-1 text-sm text-text-muted">Pemilik akan menerima notifikasi dan menghubungi Anda melalui kanal yang tersedia.</p>
            </div>
            <Button className="w-full" onClick={() => { setRequestOpen(false); setRequestSent(false); }}>
              Selesai
            </Button>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setRequestSent(true);
            }}
          >
            <div className="rounded-control bg-surface p-3 text-sm">
              <p className="font-semibold text-text">{material.title}</p>
              <p className="mt-1 text-xs text-text-muted">{material.quantity} {material.unit} - {material.city}</p>
            </div>
            <FormField label="Jumlah yang dibutuhkan" htmlFor="request-quantity" required hint={`Maksimal ${material.quantity} ${material.unit}.`}>
              <Input id="request-quantity" type="number" min={1} max={material.quantity} defaultValue={Math.min(1, material.quantity)} required />
            </FormField>
            <FormField label="Rencana penggunaan" htmlFor="request-purpose" required>
              <Textarea id="request-purpose" placeholder="Contoh: bahan pelatihan kerajinan untuk 15 peserta." required />
            </FormField>
            <FormField label="Pesan untuk pemilik" htmlFor="request-message" hint="Sertakan preferensi waktu pengambilan bila ada.">
              <Textarea id="request-message" placeholder="Halo, apakah material masih tersedia minggu ini?" />
            </FormField>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={() => setRequestOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Kirim permintaan</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
