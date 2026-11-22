import Link from "next/link";
import { AlertTriangle, ArrowRight, ClipboardCheck, Flag, PackageCheck, TrendingUp, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { MATERIAL_CATEGORY_LABELS, MATERIAL_STATUS_LABELS, MATERIAL_STATUS_TONES } from "@/features/material";
import { adminListings, adminReports, adminStats } from "../data";
import { REPORT_SEVERITY_LABELS } from "../types";

export function AdminOverview() {
  const max = Math.max(...adminStats.monthlyListings.map((item) => item.count));
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total listing" value={adminStats.totalListings.toLocaleString("id-ID")} detail={`${adminStats.pendingListings} menunggu moderasi`} icon={<PackageCheck className="size-5" />} />
        <StatCard label="Laporan terbuka" value={String(adminStats.openReports)} detail="Perlu ditinjau hari ini" icon={<Flag className="size-5" />} tone="accent" />
        <StatCard label="Pengguna baru" value={String(adminStats.newUsers)} detail="7 hari terakhir" icon={<UserPlus className="size-5" />} tone="info" />
        <StatCard label="Pengguna aktif" value={adminStats.activeUsers.toLocaleString("id-ID")} detail={`${adminStats.completedRequests.toLocaleString("id-ID")} transaksi selesai`} icon={<Users className="size-5" />} tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Listing baru per bulan</h2>
              <p className="mt-1 text-sm text-text-muted">Enam bulan terakhir.</p>
            </div>
            <Badge tone="primary">
              <TrendingUp className="mr-1 size-3" aria-hidden="true" />
              +13,5%
            </Badge>
          </div>
          <div className="mt-6 flex h-52 items-end gap-3" role="img" aria-label="Grafik listing baru per bulan">
            {adminStats.monthlyListings.map((item) => (
              <div key={item.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-semibold tabular-nums">{item.count}</span>
                <div className="w-full rounded-t-control bg-primary-600" style={{ height: `${Math.max(10, (item.count / max) * 100)}%` }} />
                <span className="text-xs text-text-muted">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Antrean moderasi</h2>
            <Badge tone="accent">{adminStats.pendingListings}</Badge>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {adminListings.slice(0, 4).map((listing) => (
              <li key={listing.id} className="flex items-center gap-3 py-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-control bg-primary-50 text-primary">
                  <ClipboardCheck className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{listing.title}</p>
                  <p className="text-xs text-text-muted">{listing.owner} - {MATERIAL_CATEGORY_LABELS[listing.category]}</p>
                </div>
                <Badge tone={MATERIAL_STATUS_TONES[listing.status]}>{MATERIAL_STATUS_LABELS[listing.status]}</Badge>
              </li>
            ))}
          </ul>
          <Link href="/admin/listing" className="mt-3 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-primary hover:underline">
            Buka moderasi <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Laporan terbaru</h2>
            <Link href="/admin/laporan" className="text-sm font-medium text-primary hover:underline">Lihat semua</Link>
          </div>
          <ul className="mt-4 space-y-3">
            {adminReports.slice(0, 4).map((report) => (
              <li key={report.id} className="flex items-start gap-3 rounded-control border border-border p-3">
                <span className={`mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full ${report.severity === "high" ? "bg-danger-soft text-danger" : report.severity === "medium" ? "bg-accent-100 text-accent-700" : "bg-surface-muted text-text-muted"}`}>
                  <AlertTriangle className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{report.target}</p>
                  <p className="text-xs text-text-muted">{report.reason} - {report.reporter}</p>
                </div>
                <Badge tone={report.severity === "high" ? "danger" : report.severity === "medium" ? "accent" : "neutral"}>
                  {REPORT_SEVERITY_LABELS[report.severity]}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-lg font-bold">Aksi cepat</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Moderasi listing", description: "Tinjau listing baru", href: "/admin/listing", icon: PackageCheck },
              { label: "Tindak laporan", description: "Selesaikan laporan", href: "/admin/laporan", icon: Flag },
              { label: "Kelola kategori", description: "Atur kategori material", href: "/admin/kategori", icon: ClipboardCheck },
              { label: "Periksa pengguna", description: "Verifikasi akun", href: "/admin/pengguna", icon: Users },
            ].map((action) => (
              <Link key={action.href} href={action.href} className="flex items-start gap-3 rounded-control border border-border p-3 hover:border-primary-300 hover:bg-primary-50">
                <action.icon className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-text-muted">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 rounded-control bg-primary-50 p-3 text-xs leading-5 text-primary-900">
            <p className="font-semibold">Prioritas hari ini</p>
            <p className="mt-1">Ada {adminStats.openReports} laporan terbuka dan {adminStats.pendingListings} listing menunggu persetujuan.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
