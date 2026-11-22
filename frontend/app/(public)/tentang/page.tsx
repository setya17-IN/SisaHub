import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe2, HeartHandshake, Leaf, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImpactStats } from "@/features/impact";

export const metadata: Metadata = { title: "Tentang SisaHub" };

const values = [
  { icon: Leaf, title: "Sirkular, bukan sekadar daur ulang", description: "Kami menjaga material tetap bernilai selama mungkin sebelum menjadi limbah." },
  { icon: Users, title: "Komunitas lebih dulu", description: "Keputusan produk dan kebijakan kami mempertimbangkan dampak bagi pengrajin dan komunitas lokal." },
  { icon: ShieldCheck, title: "Aman dan transparan", description: "Verifikasi, moderasi, dan panduan transaksi membantu menjaga kepercayaan semua pihak." },
  { icon: Sparkles, title: "Teknologi yang membantu", description: "Smart Matching dan AI Material Scanner mengurangi hambatan, bukan menggantikan keputusan manusia." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang kami"
        title="Mengubah sisa menjadi peluang"
        description="SisaHub lahir dari keyakinan sederhana: material yang tidak lagi berguna bagi satu orang bisa menjadi bahan berharga bagi orang lain."
        actions={
          <Link href="/register">
            <Button>Bergabung</Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card>
              <h2 className="text-xl font-bold">Misi kami</h2>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                Menghubungkan pemilik material sisa layak pakai dengan pengrajin, komunitas, dan usaha kecil melalui platform yang mudah, aman, dan terukur. Kami ingin setiap material mendapat kesempatan kedua sebelum berakhir di tempat pembuangan.
              </p>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                SisaHub bukan hanya marketplace. Kami membangun ekosistem di mana pemilik material, pencari material, dan komunitas dapat saling membantu, belajar, dan mencatat dampak bersama.
              </p>
            </Card>
            <Card className="bg-primary-50">
              <Globe2 className="size-8 text-primary" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold text-primary-900">Visi 2030</h2>
              <p className="mt-2 text-sm leading-7 text-primary-800">
                Menjadi jaringan material sirkular terbesar di Indonesia yang dapat diakses siapa saja, dari kota besar hingga desa, dengan data dampak yang terbuka.
              </p>
            </Card>
          </div>

          <section aria-labelledby="values-heading">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Nilai kami</p>
                <h2 id="values-heading" className="mt-1 text-2xl font-bold">Empat prinsip yang kami pegang</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <Card key={value.title} className="p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-control bg-primary-50 text-primary">
                    <value.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 font-bold">{value.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-text-muted">{value.description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section aria-labelledby="numbers-heading">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Angka kami</p>
              <h2 id="numbers-heading" className="mt-1 text-2xl font-bold">Tumbuh bersama komunitas</h2>
            </div>
            <ImpactStats />
          </section>

          <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <HeartHandshake className="mt-0.5 size-8 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-bold">Ingin berkolaborasi?</h2>
                <p className="mt-1 text-sm text-text-muted">Kami terbuka untuk komunitas, sekolah, bank sampah, dan mitra usaha yang ingin membangun program sirkular.</p>
              </div>
            </div>
            <Link href="/panduan">
              <Button variant="secondary">
                Baca panduan <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </Link>
          </Card>
        </Container>
      </main>
    </>
  );
}
