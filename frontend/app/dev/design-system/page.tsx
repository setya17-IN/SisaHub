import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ComponentShowcase } from "@/components/ui/component-showcase";
import { MaterialShowcase } from "@/features/material";

const palette = [
  {
    name: "primary",
    values: [
      ["50", "#EFF6FF"],
      ["100", "#DBEAFE"],
      ["200", "#BFDBFE"],
      ["300", "#93C5FD"],
      ["400", "#60A5FA"],
      ["500", "#3B82F6"],
      ["600", "#2563EB"],
      ["700", "#1D4ED8"],
      ["800", "#1E40AF"],
      ["900", "#1E3A8A"],
    ],
  },
  {
    name: "accent",
    values: [
      ["50", "#FFFBEB"],
      ["100", "#FEF3C7"],
      ["200", "#FDE68A"],
      ["500", "#F59E0B"],
      ["600", "#D97706"],
      ["700", "#B45309"],
    ],
  },
  {
    name: "neutral",
    values: [
      ["50", "#F8FAFC"],
      ["100", "#F1F5F9"],
      ["200", "#E2E8F0"],
      ["300", "#CBD5E1"],
      ["400", "#94A3B8"],
      ["500", "#64748B"],
      ["600", "#475569"],
      ["700", "#334155"],
      ["800", "#1E293B"],
      ["900", "#0F172A"],
    ],
  },
] as const;

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <PageHeader title="Design system" description="Referensi token dan komponen dasar SisaHub dengan warna utama biru." />
      <main className="py-8">
        <Container className="space-y-8">
          <Card>
            <h2 className="text-xl font-bold">Palet token</h2>
            <p className="mt-1 text-sm text-text-muted">Primary biru, accent amber, dan neutral slate.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {palette.map((group) => (
                <div key={group.name}>
                  <h3 className="mb-2 font-semibold capitalize">{group.name}</h3>
                  <div className="space-y-1">
                    {group.values.map(([scale, hex], index) => (
                      <div
                        key={scale}
                        className={`flex min-h-11 items-center justify-between rounded-control px-3 text-xs ${index >= 6 ? "text-white" : "text-text"}`}
                        style={{ backgroundColor: hex }}
                      >
                        <span>--color-{group.name}-{scale}</span>
                        <span>{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-2 text-sm text-text-muted">
              <p><strong className="text-text">Teks utama:</strong> neutral-900 di putih = 17.85:1</p>
              <p><strong className="text-text">Teks sekunder:</strong> neutral-600 di putih = 7.58:1</p>
              <p><strong className="text-text">Tombol utama:</strong> putih di primary-700 = 7.05:1</p>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Tipografi dan ruang</h2>
            <p className="mt-2 text-text-muted">Inter - skala ruang 8 px - radius kontrol 8 px - radius kartu 12 px.</p>
            <h1 className="mt-4 text-3xl font-bold">Judul halaman</h1>
            <p className="mt-2 text-base">Teks isi 16 piksel untuk kenyamanan membaca.</p>
            <p className="mt-1 text-sm text-text-muted">Teks bantu 14 piksel, tetap jelas dan mudah dibaca.</p>
          </Card>

          <ComponentShowcase />

          <Card>
            <MaterialShowcase />
          </Card>
        </Container>
      </main>
    </>
  );
}
