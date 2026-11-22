import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, Database, FileCheck2, Info } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { impactAssumptions } from "@/features/impact";

export const metadata: Metadata = { title: "Metodologi dampak" };

const steps = [
  {
    icon: Database,
    title: "1. Pengumpulan data",
    description: "Berat dan jumlah material diambil dari data listing yang transaksinya dikonfirmasi selesai oleh pemilik dan pencari.",
  },
  {
    icon: Calculator,
    title: "2. Konversi dampak",
    description: "Berat material dikalikan faktor konversi emisi sesuai jenis material. Faktor mengacu pada rata-rata studi limbah domestik dan faktor emisi bahan baru.",
  },
  {
    icon: FileCheck2,
    title: "3. Validasi dan publikasi",
    description: "Tim SisaHub memeriksa anomali, menghapus transaksi ganda, lalu memperbarui laporan setiap bulan.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparansi"
        title="Metodologi dampak"
        description="Bagaimana SisaHub menghitung material terselamatkan, berat yang dialihkan, dan emisi yang dihindari."
        actions={
          <Link href="/dampak">
            <Button variant="secondary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Kembali ke dampak
            </Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.title} className="p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-control bg-primary-50 text-primary">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 font-bold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-text-muted">{step.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <h2 className="text-lg font-bold">Asumsi yang digunakan</h2>
              <ul className="mt-4 space-y-3">
                {impactAssumptions.map((assumption) => (
                  <li key={assumption} className="flex gap-3 text-sm leading-6 text-text-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {assumption}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="bg-surface">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Info className="size-5 text-primary" aria-hidden="true" />
                Batasan data
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                <li>Estimasi CO2e bersifat indikatif, bukan hasil audit pihak ketiga.</li>
                <li>Material yang tidak dicantumkan beratnya menggunakan estimasi kategori.</li>
                <li>Dampak sosial diukur dari jumlah transaksi dan anggota aktif.</li>
                <li>Data dapat berubah bila ada koreksi dari pengguna.</li>
              </ul>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg font-bold">Contoh perhitungan</h2>
            <div className="mt-4 rounded-control bg-primary-50 p-4 font-mono text-sm text-primary-900">
              <p>Berat material = 12 kg</p>
              <p>Faktor emisi kain = 1,5 kg CO2e / kg</p>
              <p className="mt-2 font-bold">Emisi dihindari = 12 x 1,5 = 18 kg CO2e</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              Angka faktor emisi berbeda per kategori. Tabel faktor lengkap tersedia untuk mitra dan peneliti melalui tim SisaHub.
            </p>
          </Card>

          <div className="flex flex-col items-start justify-between gap-3 rounded-card border border-border bg-surface p-6 sm:flex-row sm:items-center">
            <p className="text-sm text-text-muted">Ada pertanyaan tentang metodologi atau ingin mengusulkan perbaikan?</p>
            <Link href="/tentang">
              <Button variant="secondary">Hubungi tim SisaHub</Button>
            </Link>
          </div>
        </Container>
      </main>
    </>
  );
}
