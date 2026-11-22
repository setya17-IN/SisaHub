import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Handshake, Inbox } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RequestList, pendingRequestCount, requests } from "@/features/request";

export const metadata: Metadata = { title: "Permintaan" };

export default function RequestsPage() {
  const accepted = requests.filter((request) => request.status === "accepted").length;
  const completed = requests.filter((request) => request.status === "completed").length;

  return (
    <>
      <PageHeader
        eyebrow="Kolaborasi"
        title="Permintaan material"
        description="Kelola permintaan masuk dan keluar, dari pengajuan hingga serah-terima selesai."
        actions={
          <Link href="/jelajahi">
            <Button variant="secondary">Cari material <ArrowRight className="size-4" aria-hidden="true" /></Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <Card className="flex items-center gap-3 p-4">
              <span className="inline-flex size-10 items-center justify-center rounded-control bg-accent-100 text-accent-700"><Clock3 className="size-5" aria-hidden="true" /></span>
              <div><p className="text-xs text-text-muted">Menunggu</p><p className="text-lg font-bold">{pendingRequestCount}</p></div>
            </Card>
            <Card className="flex items-center gap-3 p-4">
              <span className="inline-flex size-10 items-center justify-center rounded-control bg-info-soft text-info"><Handshake className="size-5" aria-hidden="true" /></span>
              <div><p className="text-xs text-text-muted">Disetujui</p><p className="text-lg font-bold">{accepted}</p></div>
            </Card>
            <Card className="flex items-center gap-3 p-4">
              <span className="inline-flex size-10 items-center justify-center rounded-control bg-primary-50 text-primary"><CheckCircle2 className="size-5" aria-hidden="true" /></span>
              <div><p className="text-xs text-text-muted">Selesai</p><p className="text-lg font-bold">{completed}</p></div>
            </Card>
          </div>

          <RequestList items={requests} />

          <Card className="flex flex-col items-start justify-between gap-3 bg-surface sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <Inbox className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold">Tidak menemukan permintaan tertentu?</p>
                <p className="text-sm text-text-muted">Gunakan filter status atau cari berdasarkan ID melalui menu di atas.</p>
              </div>
            </div>
            <Link href="/notifikasi"><Button variant="secondary">Buka notifikasi</Button></Link>
          </Card>
        </Container>
      </main>
    </>
  );
}
