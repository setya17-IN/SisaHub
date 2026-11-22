import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Sparkles, TrendingUp, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MATERIAL_CATEGORY_OPTIONS,
  MaterialExplorer,
  materials,
  toMaterialCardItem,
  type MaterialCategory,
} from "@/features/material";
import { LocationMap, materialPins } from "@/features/map";

export const metadata: Metadata = { title: "Jelajahi material" };

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}) {
  const params = await searchParams;
  const category = MATERIAL_CATEGORY_OPTIONS.some((option) => option.value === params.kategori)
    ? (params.kategori as MaterialCategory)
    : "all";

  return (
    <>
      <PageHeader
        eyebrow="Katalog material"
        title="Jelajahi material sisa"
        description="Temukan kain, kardus, kayu, plastik, dan bahan lain dari komunitas terverifikasi di sekitar Anda."
        actions={
          <Link href="/material/baru">
            <Button>Bagikan material</Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container>
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: TrendingUp, label: "Material tersedia", value: `${materials.length} listing aktif`, detail: "Diperbarui hari ini" },
              { icon: MapPin, label: "Kota aktif", value: "18 kota", detail: "Jawa, Bali, Sumatera" },
              { icon: Users, label: "Komunitas", value: "2.140 anggota", detail: "Pemilik dan pencari" },
            ].map((item) => (
              <Card key={item.label} className="flex items-center gap-3 p-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control bg-primary-50 text-primary">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-text-muted">{item.label}</p>
                  <p className="text-sm font-bold">{item.value}</p>
                  <p className="text-xs text-text-muted">{item.detail}</p>
                </div>
              </Card>
            ))}
          </div>

          <MaterialExplorer
            materials={materials.map(toMaterialCardItem)}
            initialQuery={params.q ?? ""}
            initialCategory={category}
          />

          <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <LocationMap pins={materialPins} title="Sebaran material terbaru" />
            <Card className="flex flex-col justify-center bg-primary-50 p-6">
              <Sparkles className="size-8 text-primary" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold text-primary-900">Tidak menemukan yang cocok?</h2>
              <p className="mt-2 text-sm leading-6 text-primary-800">
                Buat kebutuhan material dan biarkan Smart Matching menghubungkan Anda dengan pemilik material yang tepat.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link href="/dicari"><Button>Buat kebutuhan</Button></Link>
                <Link href="/panduan"><Button variant="secondary">Baca panduan</Button></Link>
              </div>
            </Card>
          </section>
        </Container>
      </main>
    </>
  );
}
