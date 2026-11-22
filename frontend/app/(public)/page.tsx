import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  MapPin,
  PackageCheck,
  Recycle,
  ScanLine,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/controls";
import { Input } from "@/components/ui/input";
import {
  MATERIAL_CATEGORY_LABELS,
  MATERIAL_CATEGORY_TONES,
  featuredMaterials,
  materialCategories,
} from "@/features/material";
import { ImpactStats } from "@/features/impact";
import { ROUTES } from "@/lib/constants/routes";

export const metadata: Metadata = { title: "Beranda" };

const steps = [
  {
    icon: ScanLine,
    title: "Pindai atau unggah material",
    description: "Foto material sisa Anda. AI Material Scanner membantu mengenali kategori dan kondisi.",
  },
  {
    icon: Sparkles,
    title: "Dapatkan Smart Matching",
    description: "Sistem mencocokkan material dengan kebutuhan pengrajin dan komunitas di sekitar Anda.",
  },
  {
    icon: Handshake,
    title: "Sepakati serah-terima",
    description: "Ajukan permintaan, atur waktu pengambilan, lalu konfirmasi transaksi selesai.",
  },
];

const testimonials = [
  {
    quote: "Dulu kain perca hanya menumpuk di gudang. Sekarang jadi bahan pelatihan untuk 20 pengrajin baru.",
    name: "Rina Putri",
    role: "Pemilik konveksi, Surabaya",
  },
  {
    quote: "Kami menemukan kardus berkualitas untuk packing pesanan tanpa menambah biaya operasional.",
    name: "Maya Lestari",
    role: "UMKM kue rumahan, Bandung",
  },
  {
    quote: "Smart Matching membantu kami menemukan botol PET dalam jumlah besar hanya dalam dua hari.",
    name: "Dimas Prakoso",
    role: "Bank Sampah Melati, Jakarta",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div>
            <Badge tone="primary" className="min-h-7 gap-1.5 px-3">
              <Recycle className="size-3.5" aria-hidden="true" />
              Platform waste to worth
            </Badge>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl">
              Sisa material yang tepat, untuk karya berikutnya.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-text-muted sm:text-lg">
              Hubungkan sisa bahan layak pakai dengan pengrajin, komunitas, dan usaha kecil. Temukan material gratis atau berbagi yang tidak lagi Anda gunakan.
            </p>

            <form action={ROUTES.explore} className="mt-6 grid gap-2 rounded-card border border-border bg-background p-2 shadow-card sm:grid-cols-[1fr_11rem_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                <Input name="q" placeholder="Cari kain, kardus, kayu..." aria-label="Cari material" className="border-0 pl-9 shadow-none" />
              </div>
              <Select name="kategori" aria-label="Pilih kategori" className="border-0 bg-surface shadow-none">
                <option value="">Semua kategori</option>
                {materialCategories.map((category) => (
                  <option key={category.category} value={category.category}>{category.label}</option>
                ))}
              </Select>
              <Button type="submit" className="w-full sm:w-auto">Cari material</Button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-4 text-primary" aria-hidden="true" />Gratis digunakan</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-primary" aria-hidden="true" />18 kota aktif</span>
              <span className="inline-flex items-center gap-1.5"><Users className="size-4 text-primary" aria-hidden="true" />2.140 anggota</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-card border border-primary-200 bg-primary-50 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Material pilihan hari ini</p>
                  <p className="mt-1 text-lg font-bold text-primary-900">Sisa kain katun 50 meter</p>
                </div>
                <Badge tone="primary">Gratis</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {materialCategories.slice(0, 4).map((category) => (
                  <div key={category.category} className="rounded-control border border-primary-200 bg-background p-3">
                    <span className={`inline-flex size-9 items-center justify-center rounded-control ${MATERIAL_CATEGORY_TONES[category.category] === "rose" ? "bg-rose-50 text-rose-700" : MATERIAL_CATEGORY_TONES[category.category] === "accent" ? "bg-accent-50 text-accent-700" : MATERIAL_CATEGORY_TONES[category.category] === "orange" ? "bg-orange-50 text-orange-700" : "bg-primary-50 text-primary"}`}>
                      <PackageCheck className="size-4" aria-hidden="true" />
                    </span>
                    <p className="mt-2 text-sm font-semibold">{category.label}</p>
                    <p className="text-xs text-text-muted">{category.count} material</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-control bg-primary-900 px-4 py-3 text-white">
                <div>
                  <p className="text-xs text-primary-200">Smart Match</p>
                  <p className="text-sm font-semibold">96% cocok dengan kebutuhan Anda</p>
                </div>
                <Sparkles className="size-5 text-primary-200" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-3 hidden rounded-card border border-border bg-background p-3 shadow-card sm:block">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-primary"><CheckCircle2 className="size-4" aria-hidden="true" />Pemilik terverifikasi</p>
              <p className="mt-0.5 text-xs text-text-muted">Respons rata-rata 2 jam</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="categories-heading" className="py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Kategori material</p>
              <h2 id="categories-heading" className="mt-1 text-2xl font-bold tracking-tight">Mulai dari bahan yang Anda butuhkan</h2>
              <p className="mt-1 text-text-muted">Enam kategori utama dengan ribuan material layak pakai.</p>
            </div>
            <Link href={ROUTES.explore} className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-primary hover:underline">
              Lihat semua material <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {materialCategories.map((category) => (
              <Link key={category.category} href={`${ROUTES.explore}?kategori=${category.category}`} className="group rounded-card border border-border bg-background p-4 transition-colors hover:border-primary-300 hover:bg-primary-50">
                <span className="inline-flex size-10 items-center justify-center rounded-control bg-primary-50 text-primary group-hover:bg-background">
                  <Recycle className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-3 text-sm font-semibold leading-5">{category.label}</p>
                <p className="mt-1 text-xs text-text-muted">{category.count} material</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="featured-heading" className="border-y border-border bg-surface py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Terbaru di SisaHub</p>
              <h2 id="featured-heading" className="mt-1 text-2xl font-bold tracking-tight">Material yang siap diambil</h2>
              <p className="mt-1 text-text-muted">Dari komunitas terverifikasi di berbagai kota.</p>
            </div>
            <Link href={ROUTES.explore}>
              <Button variant="secondary">Jelajahi semua</Button>
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMaterials.slice(0, 3).map((material) => (
              <div key={material.id}>
                <Link href={ROUTES.material(material.id)} className="group block rounded-card border border-border bg-background p-4 transition-colors hover:border-primary-300">
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone={MATERIAL_CATEGORY_TONES[material.category]}>{MATERIAL_CATEGORY_LABELS[material.category]}</Badge>
                    <span className="text-xs font-semibold text-primary">{material.priceType === "free" ? "Gratis" : "Berbayar"}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 min-h-12 font-semibold leading-6 group-hover:text-primary">{material.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-text-muted">
                    <span>{material.quantity} {material.unit}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden="true" />{material.city}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs text-text-muted">
                    <span className="font-medium text-text">{material.owner.name}</span>
                    <span>-</span>
                    <span>{material.distanceKm} km</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="how-heading" className="py-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Cara kerja</p>
            <h2 id="how-heading" className="mt-1 text-2xl font-bold tracking-tight">Dari sisa menjadi solusi dalam tiga langkah</h2>
            <p className="mt-2 text-text-muted">Dirancang agar mudah untuk pemilik material maupun pencari material.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="relative p-6">
                <span className="absolute right-5 top-5 text-3xl font-bold text-primary-100">{index + 1}</span>
                <span className="inline-flex size-11 items-center justify-center rounded-control bg-primary-50 text-primary">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="impact-heading" className="border-y border-border bg-primary-50 py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Dampak bersama</p>
              <h2 id="impact-heading" className="mt-1 text-2xl font-bold tracking-tight">Setiap material punya jejak yang bisa dihitung</h2>
              <p className="mt-1 max-w-2xl text-text-muted">Transparan, terukur, dan tumbuh bersama komunitas.</p>
            </div>
            <Link href={ROUTES.impact}>
              <Button variant="secondary">Lihat laporan dampak</Button>
            </Link>
          </div>
          <div className="mt-6">
            <ImpactStats compact />
          </div>
        </Container>
      </section>

      <section aria-labelledby="stories-heading" className="py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Cerita komunitas</p>
              <h2 id="stories-heading" className="mt-1 text-2xl font-bold tracking-tight">Mereka sudah merasakan manfaatnya</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <p className="text-sm leading-7 text-text">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-text-muted">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="rounded-card bg-primary-900 px-6 py-10 text-center text-white sm:px-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Punya material sisa yang masih layak pakai?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-primary-100 sm:text-base">
              Bagikan dalam beberapa menit. AI Material Scanner membantu mengisi detail, Smart Matching menemukan penerima yang tepat.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <Link href={ROUTES.newMaterial}>
                <Button className="w-full bg-white text-primary-900 hover:bg-primary-50 sm:w-auto">Bagikan material</Button>
              </Link>
              <Link href={ROUTES.register}>
                <Button variant="secondary" className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto">Daftar gratis</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
