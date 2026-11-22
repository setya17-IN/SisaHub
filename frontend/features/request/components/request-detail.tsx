"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Check, MapPin, MessageSquare, Package, Phone, ShieldCheck, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timeline } from "@/components/ui/timeline";
import { useToast } from "@/components/ui/toast";
import { formatDateId } from "@/lib/utils/format";
import { MATERIAL_CATEGORY_LABELS } from "@/features/material";
import type { MaterialRequest, RequestStatus } from "../types";
import { REQUEST_DIRECTION_LABELS } from "../types";
import { RequestStatusBadge } from "./request-status-badge";

export function RequestDetail({ request }: { request: MaterialRequest }) {
  const { toast } = useToast();
  const [status, setStatus] = useState<RequestStatus>(request.status);
  const counterpart = request.direction === "incoming" ? request.requester : request.owner;
  const currentStep = Math.max(0, request.timeline.findIndex((item) => !item.done));

  const act = (next: RequestStatus) => {
    setStatus(next);
    toast({
      title: next === "accepted" ? "Permintaan diterima" : next === "rejected" ? "Permintaan ditolak" : "Permintaan dibatalkan",
      description: "Status permintaan telah diperbarui.",
      tone: next === "accepted" ? "success" : "info",
    });
  };

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Permintaan", href: "/permintaan" }, { label: request.id }]} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/permintaan" className="mb-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-text-muted hover:text-primary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke permintaan
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={request.direction === "incoming" ? "primary" : "info"}>{REQUEST_DIRECTION_LABELS[request.direction]}</Badge>
              <RequestStatusBadge status={status} />
              <span className="text-xs text-text-muted">{request.id}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">{request.materialTitle}</h1>
            <p className="mt-1 text-sm text-text-muted">Diajukan {formatDateId(request.createdAt)}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-bold">Detail permintaan</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-control bg-surface p-3">
                  <Package className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-text-muted">Jumlah diminta</dt>
                    <dd className="text-sm font-medium">{request.quantity} {request.unit}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-control bg-surface p-3">
                  <MapPin className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-text-muted">Lokasi</dt>
                    <dd className="text-sm font-medium">{request.city}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-control bg-surface p-3">
                  <CalendarDays className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-text-muted">Kategori</dt>
                    <dd className="text-sm font-medium">{MATERIAL_CATEGORY_LABELS[request.category]}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-control bg-surface p-3">
                  <ShieldCheck className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-text-muted">Status</dt>
                    <dd className="text-sm font-medium">{status === "pending" ? "Menunggu konfirmasi" : status === "accepted" ? "Disetujui" : status === "rejected" ? "Ditolak" : status === "completed" ? "Selesai" : "Dibatalkan"}</dd>
                  </div>
                </div>
              </dl>
              <div className="mt-4 rounded-control border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Pesan pengaju</p>
                <p className="mt-2 text-sm leading-6 text-text">{request.note}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/material/${request.materialId}`}>
                  <Button variant="secondary">Lihat material</Button>
                </Link>
                {status === "accepted" && <Button onClick={() => act("completed")}><Check className="size-4" aria-hidden="true" />Tandai selesai</Button>}
                {status === "pending" && request.direction === "incoming" && (
                  <>
                    <Button variant="secondary" onClick={() => act("rejected")}><X className="size-4" aria-hidden="true" />Tolak</Button>
                    <Button onClick={() => act("accepted")}><Check className="size-4" aria-hidden="true" />Terima permintaan</Button>
                  </>
                )}
                {status === "pending" && request.direction === "outgoing" && (
                  <Button variant="secondary" onClick={() => act("cancelled")}>Batalkan permintaan</Button>
                )}
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-bold">Riwayat permintaan</h2>
              <div className="mt-4">
                <Timeline steps={request.timeline.map((item) => ({ title: item.title, description: item.description }))} currentStep={currentStep} />
              </div>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{request.direction === "incoming" ? "Pemohon" : "Pemilik material"}</p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar name={counterpart.name} size="lg" />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{counterpart.name}</p>
                  <p className="truncate text-xs text-text-muted">{counterpart.organization ?? "Pengguna SisaHub"}</p>
                  {counterpart.verified && <p className="mt-1 inline-flex items-center gap-1 text-xs text-primary"><ShieldCheck className="size-3.5" aria-hidden="true" />Terverifikasi</p>}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full"><MessageSquare className="size-4" aria-hidden="true" />Kirim pesan</Button>
                <Button variant="secondary" className="w-full"><Phone className="size-4" aria-hidden="true" />Hubungi via WhatsApp</Button>
              </div>
            </Card>

            <Card className="bg-primary-50">
              <p className="text-sm font-semibold text-primary-900">Aman bertransaksi</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-primary-800">
                <li>Sepakati lokasi netral atau tempat umum.</li>
                <li>Periksa material sebelum dibawa.</li>
                <li>Konfirmasi status setelah serah-terima.</li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
