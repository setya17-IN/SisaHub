import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Leaf, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImpactOverview, impactAssumptions, impactSummary } from "@/features/impact";

export const metadata: Metadata = { title: "Dampak" };

export default function ImpactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Laporan dampak"
        title="Dampak dari material yang kembali bernilai"
        description="Kami mengukur material yang diselamatkan, berat yang dialihkan, dan emisi yang dihindari bersama komunitas SisaHub."
        actions={
          <Link href="/dampak/metodologi">
            <Button variant="secondary">
              <BookOpen className="size-4" aria-hidden="true" />
              Metodologi
            </Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container className="space-y-8">
          <ImpactOverview />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold">Ringkasan capaian</h2>
                <Badge tone="primary">Diperbarui November 2026</Badge>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                  <caption className="sr-only">Ringkasan capaian dampak SisaHub</caption>
                  <thead className="bg-surface text-xs uppercase tracking-wide text-text-muted">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold">Indikator</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Nilai</th>
                      <th scope="col" className="px-3 py-2 font-semibold">Sejak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["Material terselamatkan", `${impactSummary.materialsSaved.toLocaleString("id-ID")} listing`, "2024"],
                      ["Berat material dialihkan", `${impactSummary.weightSavedKg.toLocaleString("id-ID")} kg`, "2024"],
                      ["Emisi dihindari", `${impactSummary.co2AvoidedKg.toLocaleString("id-ID")} kg CO2e`, "2024"],
                      ["Transaksi selesai", impactSummary.completedRequests.toLocaleString("id-ID"), "2024"],
                      ["Kota aktif", String(impactSummary.activeCities), "2025"],
                      ["Anggota komunitas", impactSummary.communityMembers.toLocaleString("id-ID"), "2024"],
                    ].map((row) => (
                      <tr key={row[0]}>
                        <td className="px-3 py-3 font-medium">{row[0]}</td>
                        <td className="px-3 py-3 tabular-nums">{row[1]}</td>
                        <td className="px-3 py-3 text-text-muted">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="bg-primary-50">
                <Leaf className="size-7 text-primary" aria-hidden="true" />
                <h2 className="mt-3 text-lg font-bold text-primary-900">Mengapa dampak penting?</h2>
                <p className="mt-2 text-sm leading-6 text-primary-800">
                  Setiap material yang digunakan kembali mengurangi kebutuhan bahan baru, menghemat ruang TPA, dan membuka peluang ekonomi bagi komunitas.
                </p>
              </Card>
              <Card>
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                  Prinsip perhitungan
                </h2>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                  {impactAssumptions.slice(0, 3).map((assumption) => (
                    <li key={assumption} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {assumption}
                    </li>
                  ))}
                </ul>
                <Link href="/dampak/metodologi" className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Baca metodologi lengkap <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </Card>
            </div>
          </div>

          <Card className="flex flex-col items-start justify-between gap-4 bg-primary-900 p-6 text-white sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">Jadilah bagian dari dampak berikutnya</h2>
              <p className="mt-1 text-sm text-primary-100">Setiap material yang Anda bagikan tercatat dan berkontribusi pada laporan ini.</p>
            </div>
            <Link href="/material/baru">
              <Button className="bg-white text-primary-900 hover:bg-primary-50">Bagikan material</Button>
            </Link>
          </Card>
        </Container>
      </main>
    </>
  );
}
