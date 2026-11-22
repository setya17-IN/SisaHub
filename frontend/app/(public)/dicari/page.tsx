import type { Metadata } from "next";
import Link from "next/link";
import { BellRing, CheckCircle2, Handshake, PackageSearch } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WantedExplorer, wantedItems } from "@/features/need";

export const metadata: Metadata = { title: "Material dicari" };

const tips = [
  { icon: PackageSearch, title: "Temukan kebutuhan", description: "Lihat kebutuhan material yang dipublikasikan komunitas dan usaha kecil." },
  { icon: Handshake, title: "Tawarkan material", description: "Hubungi pemohon dan sepakati jumlah, kondisi, serta waktu pengambilan." },
  { icon: BellRing, title: "Dapatkan notifikasi", description: "Aktifkan Smart Match untuk mendapat pemberitahuan kebutuhan yang relevan." },
];

export default function WantedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Papan kebutuhan"
        title="Material dicari komunitas"
        description="Bantu komunitas, pengrajin, dan usaha kecil menemukan material yang mereka butuhkan."
        actions={
          <Link href="/material/baru">
            <Button>Tawarkan material</Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container>
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {tips.map((tip) => (
              <Card key={tip.title} className="p-4">
                <span className="inline-flex size-10 items-center justify-center rounded-control bg-primary-50 text-primary">
                  <tip.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-3 text-sm font-semibold">{tip.title}</p>
                <p className="mt-1 text-xs leading-5 text-text-muted">{tip.description}</p>
              </Card>
            ))}
          </div>

          <WantedExplorer items={wantedItems} />

          <Card className="mt-8 flex flex-col items-start justify-between gap-4 bg-primary-50 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="flex items-center gap-2 text-lg font-bold text-primary-900">
                <CheckCircle2 className="size-5" aria-hidden="true" />
                Butuh material tertentu?
              </p>
              <p className="mt-1 text-sm text-primary-800">Publikasikan kebutuhan Anda agar pemilik material dapat menghubungi Anda lebih cepat.</p>
            </div>
            <Link href="/masuk">
              <Button>Buat kebutuhan</Button>
            </Link>
          </Card>
        </Container>
      </main>
    </>
  );
}
