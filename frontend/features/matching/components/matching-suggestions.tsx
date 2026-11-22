import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MATERIAL_CATEGORY_LABELS, MATERIAL_CATEGORY_TONES } from "@/features/material";
import type { MatchSuggestion } from "../types";

export function MatchingSuggestions({ items }: { items: MatchSuggestion[] }) {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Sparkles className="size-5 text-primary" aria-hidden="true" />
            Smart Matching
          </h2>
          <p className="mt-1 text-sm text-text-muted">Material yang paling sesuai dengan kebutuhan dan lokasi Anda.</p>
        </div>
        <Link href="/jelajahi" className="inline-flex min-h-9 items-center gap-1 text-sm font-medium text-primary hover:underline">
          Lihat semua <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-4 divide-y divide-border">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/material/${item.materialId}`} className="flex items-center gap-3 py-3 hover:bg-surface">
              <span className="inline-flex size-12 shrink-0 flex-col items-center justify-center rounded-control bg-primary-50 text-primary">
                <span className="text-sm font-bold tabular-nums">{item.score}</span>
                <span className="text-[10px]">match</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-text-muted">
                  <Badge tone={MATERIAL_CATEGORY_TONES[item.category]}>{MATERIAL_CATEGORY_LABELS[item.category]}</Badge>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3" aria-hidden="true" />{item.city} - {item.distanceKm} km</span>
                  <span>{item.quantityLabel}</span>
                  <span className="font-medium text-text">{item.priceLabel}</span>
                </p>
                <p className="mt-1 text-xs text-primary-800">{item.reason}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
