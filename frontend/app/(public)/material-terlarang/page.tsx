import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Flame, FlaskConical, ShieldAlert, Skull, Syringe, Trash2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Material terlarang" };

const prohibited = [
  { icon: FlaskConical, title: "Bahan kimia dan berbahaya", description: "Asbes, pelarut, pestisida, cat berbahan timbal, baterai bocor, dan bahan mudah meledak." },
  { icon: Syringe, title: "Limbah medis dan infeksius", description: "Jarum suntik, perban bekas, limbah laboratorium, dan alat kesehatan sekali pakai." },
  { icon: Skull, title: "Bahan radioaktif dan beracun", description: "Material dengan paparan radiasi atau zat beracun yang memerlukan penanganan khusus." },
  { icon: Flame, title: "Bahan mudah terbakar", description: "Gas, bahan bakar, aerosol, dan cairan mudah terbakar dalam kemasan terbuka." },
  { icon: Trash2, title: "Sampah organik membusuk", description: "Sisa makanan, limbah hewan, dan bahan organik yang menimbulkan bau atau vektor penyakit." },
  { icon: ShieldAlert, title: "Barang ilegal dan berbahaya", description: "Senjata, obat terlarang, dokumen pribadi, serta barang yang melanggar hukum." },
];

export default function ProhibitedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Keselamatan komunitas"
        title="Material yang tidak boleh dicantumkan"
        description="Demi keselamatan semua pengguna, beberapa jenis material tidak dapat dibagikan melalui SisaHub."
        actions={
          <Link href="/material/baru">
            <Button variant="secondary">Kembali ke formulir material</Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container className="space-y-8">
          <Card className="border-accent-200 bg-accent-50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-6 shrink-0 text-accent-700" aria-hidden="true" />
              <div>
                <h2 className="font-bold text-accent-700">Periksa sebelum mengunggah</h2>
                <p className="mt-1 text-sm leading-6 text-text-muted">
                  Jika material Anda memerlukan penanganan khusus, memiliki risiko kesehatan, atau diatur oleh regulasi, jangan mencantumkannya di SisaHub. Hubungi pihak berwenang atau pengelola limbah berizin.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {prohibited.map((item) => (
              <Card key={item.title} className="p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-control bg-danger-soft text-danger">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-3 font-bold">{item.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-text-muted">{item.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h2 className="text-lg font-bold">Yang tetap diperbolehkan</h2>
              <ul className="mt-3 space-y-2">
                {[
                  "Material layak pakai yang bersih dan tidak berbahaya.",
                  "Sisa produksi yang masih dapat digunakan kembali.",
                  "Kemasan bekas yang sudah dicuci dan dikeringkan.",
                  "Bahan kerajinan yang tidak mengandung zat berbahaya.",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-text-muted">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-lg font-bold">Cara melaporkan pelanggaran</h2>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                Temukan tombol laporkan pada halaman material atau profil. Sertakan alasan dan bukti pendukung. Tim moderasi akan meninjau laporan dalam 1-2 hari kerja.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/jelajahi"><Button variant="secondary">Jelajahi material</Button></Link>
                <Link href="/panduan"><Button variant="secondary">Baca panduan</Button></Link>
              </div>
            </Card>
          </div>
        </Container>
      </main>
    </>
  );
}
