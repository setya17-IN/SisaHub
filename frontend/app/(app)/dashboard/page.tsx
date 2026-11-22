import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, Eye, Heart, Leaf, PackagePlus, Plus, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  MATERIAL_CATEGORY_LABELS,
  MATERIAL_CATEGORY_TONES,
  MaterialStatusBadge,
  materials,
} from "@/features/material";
import { MatchingSuggestions, matchSuggestions } from "@/features/matching";
import { RequestMiniList, pendingRequestCount, requests } from "@/features/request";
import { ImpactStats } from "@/features/impact";
import { unreadNotificationCount } from "@/features/notification";
import { favoriteMaterials } from "@/features/material";
import { ROUTES } from "@/lib/constants/routes";
import { formatDateId } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Dashboard" };

const myMaterials = materials.filter((material) => material.owner.id === "rina");
const incomingRequests = requests.filter((request) => request.direction === "incoming");

export default function DashboardPage() {
  return (
    <div className="py-6">
      <Container className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-text-muted">Minggu, 22 November 2026</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Halo, Rina Putri</h1>
            <p className="mt-1 text-sm text-text-muted">Berikut ringkasan aktivitas dan material Anda hari ini.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={ROUTES.newMaterial}>
              <Button><Plus className="size-4" aria-hidden="true" />Material baru</Button>
            </Link>
            <Link href={ROUTES.requests}>
              <Button variant="secondary"><Bell className="size-4" aria-hidden="true" />Permintaan {pendingRequestCount > 0 && <Badge tone="danger">{pendingRequestCount}</Badge>}</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Listing aktif" value={String(myMaterials.length)} detail="2 menunggu pembaruan" icon={<PackagePlus className="size-5" />} />
          <StatCard label="Permintaan masuk" value={String(incomingRequests.length)} detail={`${pendingRequestCount} menunggu respons`} icon={<Bell className="size-5" />} tone="accent" />
          <StatCard label="Favorit tersimpan" value={String(favoriteMaterials.length)} detail="Material yang Anda pantau" icon={<Heart className="size-5" />} tone="info" />
          <StatCard label="Material dibagikan" value="640 kg" detail="Sejak bergabung" icon={<Leaf className="size-5" />} tone="success" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <MatchingSuggestions items={matchSuggestions} />

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Permintaan terbaru</h2>
                <p className="mt-1 text-sm text-text-muted">{pendingRequestCount} permintaan menunggu tindakan.</p>
              </div>
              <Link href={ROUTES.requests} className="inline-flex min-h-9 items-center gap-1 text-sm font-medium text-primary hover:underline">
                Semua <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-2">
              <RequestMiniList items={requests} limit={4} />
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Material saya</h2>
                <p className="mt-1 text-sm text-text-muted">Kelola listing dan pantau performanya.</p>
              </div>
              <Link href={ROUTES.newMaterial} className="inline-flex min-h-9 items-center gap-1 text-sm font-medium text-primary hover:underline">
                Tambah material <Plus className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                <caption className="sr-only">Material milik Rina Putri</caption>
                <thead className="bg-surface text-xs uppercase tracking-wide text-text-muted">
                  <tr>
                    <th scope="col" className="px-3 py-2 font-semibold">Material</th>
                    <th scope="col" className="px-3 py-2 font-semibold">Status</th>
                    <th scope="col" className="px-3 py-2 font-semibold">Dilihat</th>
                    <th scope="col" className="px-3 py-2 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myMaterials.map((material) => (
                    <tr key={material.id}>
                      <td className="px-3 py-3">
                        <p className="font-medium">{material.title}</p>
                        <p className="text-xs text-text-muted">{MATERIAL_CATEGORY_LABELS[material.category]} - {formatDateId(material.createdAt)}</p>
                      </td>
                      <td className="px-3 py-3"><MaterialStatusBadge status={material.status} /></td>
                      <td className="px-3 py-3 tabular-nums">{material.views}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1">
                          <Link href={ROUTES.material(material.id)} aria-label={`Lihat ${material.title}`} className="inline-flex size-9 items-center justify-center rounded-control text-text-muted hover:bg-surface hover:text-primary"><Eye className="size-4" aria-hidden="true" /></Link>
                          <Link href={ROUTES.editMaterial(material.id)} className="inline-flex min-h-9 items-center rounded-control px-2 text-xs font-medium text-primary hover:bg-primary-50">Edit</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Dampak Anda</h2>
              <Badge tone="primary"><TrendingUp className="mr-1 size-3" aria-hidden="true" />+12%</Badge>
            </div>
            <div className="mt-4">
              <ImpactStats compact />
            </div>
            <Link href={ROUTES.impact} className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-primary hover:underline">
              Lihat laporan dampak <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-primary-50">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control bg-background text-primary">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold text-primary-900">Smart Match menemukan 3 material baru</h2>
                <p className="mt-1 text-sm leading-6 text-primary-800">Ada kain dan kertas di sekitar Surabaya yang cocok dengan kebutuhan Anda.</p>
                <Link href={ROUTES.explore} className="mt-3 inline-flex">
                  <Button variant="secondary">Lihat rekomendasi</Button>
                </Link>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control bg-surface text-primary">
                <Bell className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-bold">Notifikasi belum dibaca</h2>
                <p className="mt-1 text-sm leading-6 text-text-muted">Ada {unreadNotificationCount} pembaruan permintaan, pesan, dan Smart Match yang menunggu.</p>
                <Link href={ROUTES.notifications} className="mt-3 inline-flex">
                  <Button variant="secondary">Buka notifikasi</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Rekomendasi untuk Anda</h2>
              <p className="mt-1 text-sm text-text-muted">Material terbaru yang mungkin Anda butuhkan.</p>
            </div>
            <Link href={ROUTES.explore} className="text-sm font-medium text-primary hover:underline">Jelajahi semua</Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {materials.filter((material) => material.owner.id !== "rina").slice(0, 3).map((material) => (
              <Link key={material.id} href={ROUTES.material(material.id)} className="rounded-card border border-border p-4 hover:border-primary-300 hover:bg-primary-50">
                <Badge tone={MATERIAL_CATEGORY_TONES[material.category]}>{MATERIAL_CATEGORY_LABELS[material.category]}</Badge>
                <p className="mt-2 line-clamp-2 text-sm font-semibold">{material.title}</p>
                <p className="mt-1 text-xs text-text-muted">{material.quantity} {material.unit} - {material.city}</p>
                <p className="mt-2 text-xs font-medium text-primary">{material.priceType === "free" ? "Gratis" : "Berbayar"}</p>
              </Link>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
}
