import { Cloud, MapPin, PackageCheck, Recycle, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";
import { impactHighlights, impactSummary } from "../data";

export function ImpactStats({ compact = false }: { compact?: boolean }) {
  const stats = compact ? impactHighlights.slice(0, 3) : impactHighlights;
  const icons = [Recycle, PackageCheck, Cloud, Users];
  return (
    <div className={`grid gap-4 ${compact ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
      {stats.map((item, index) => {
        const Icon = icons[index] ?? Recycle;
        return (
          <StatCard
            key={item.label}
            label={item.label}
            value={`${item.value} ${item.unit}`}
            detail={item.description}
            icon={<Icon className="size-5" />}
            tone={index === 2 ? "success" : index === 3 ? "accent" : "primary"}
          />
        );
      })}
    </div>
  );
}

export function ImpactOverview() {
  const maxWeight = Math.max(...impactSummary.monthly.map((point) => point.weightKg));
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Material terselamatkan" value={impactSummary.materialsSaved.toLocaleString("id-ID")} detail="Listing yang kembali digunakan" icon={<Recycle className="size-5" />} />
        <StatCard label="Berat material" value={`${impactSummary.weightSavedKg.toLocaleString("id-ID")} kg`} detail="Akumulasi sejak 2024" icon={<PackageCheck className="size-5" />} tone="info" />
        <StatCard label="Emisi dihindari" value={`${impactSummary.co2AvoidedKg.toLocaleString("id-ID")} kg`} detail="Estimasi CO2e" icon={<Cloud className="size-5" />} tone="success" />
        <StatCard label="Komunitas aktif" value={impactSummary.communityMembers.toLocaleString("id-ID")} detail={`${impactSummary.activeCities} kota`} icon={<Users className="size-5" />} tone="accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Pertumbuhan dampak 6 bulan</h2>
              <p className="mt-1 text-sm text-text-muted">Berat material yang diserahterimakan per bulan.</p>
            </div>
            <Badge tone="primary">
              <TrendingUp className="mr-1 size-3" aria-hidden="true" />
              +14% bulan ini
            </Badge>
          </div>

          <div className="mt-6 flex h-56 items-end gap-3" role="img" aria-label="Grafik berat material per bulan">
            {impactSummary.monthly.map((point) => (
              <div key={point.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-semibold tabular-nums text-text">{point.weightKg.toLocaleString("id-ID")}</span>
                <div className="w-full rounded-t-control bg-primary-600 transition-all hover:bg-primary-700" style={{ height: `${Math.max(12, (point.weightKg / maxWeight) * 100)}%` }} />
                <span className="text-xs text-text-muted">{point.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center text-sm">
            <div>
              <p className="font-bold tabular-nums text-text">{impactSummary.completedRequests.toLocaleString("id-ID")}</p>
              <p className="text-xs text-text-muted">transaksi selesai</p>
            </div>
            <div>
              <p className="font-bold tabular-nums text-text">{impactSummary.activeCities}</p>
              <p className="text-xs text-text-muted">kota aktif</p>
            </div>
            <div>
              <p className="font-bold tabular-nums text-text">{(impactSummary.weightSavedKg / Math.max(1, impactSummary.completedRequests)).toFixed(1)} kg</p>
              <p className="text-xs text-text-muted">rata-rata per transaksi</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold">Sebaran dampak</h2>
          <p className="mt-1 text-sm text-text-muted">Kontribusi berdasarkan jenis material.</p>
          <div className="mt-5 space-y-4">
            {[
              { label: "Kain", percent: 32, color: "bg-rose-400" },
              { label: "Kertas & kardus", percent: 26, color: "bg-accent-500" },
              { label: "Plastik", percent: 21, color: "bg-primary-600" },
              { label: "Kayu", percent: 12, color: "bg-orange-500" },
              { label: "Logam & lainnya", percent: 9, color: "bg-neutral-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-semibold tabular-nums">{item.percent}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-2 rounded-control bg-primary-50 p-3 text-xs leading-5 text-primary-900">
            <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            <p>Dampak terbesar berasal dari Jawa Timur, Jawa Barat, dan DKI Jakarta.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
