"use client";
import { useMemo, useState } from "react";
import { Filter, RotateCcw, Search, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/controls";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import {
  MATERIAL_CATEGORY_LABELS,
  MATERIAL_CATEGORY_OPTIONS,
  MATERIAL_CITIES,
  MATERIAL_CONDITION_LABELS,
  MATERIAL_SORT_OPTIONS,
} from "../constants";
import type { MaterialCardItem, MaterialCategory, MaterialCondition, MaterialFilterState, PriceType } from "../types";
import { MaterialGrid } from "./material-grid";

const initialFilters: MaterialFilterState = {
  query: "",
  category: "all",
  condition: "all",
  price: "all",
  city: "Semua kota",
  sort: "newest",
};

export function MaterialExplorer({
  materials,
  initialQuery = "",
  initialCategory = "all",
}: {
  materials: MaterialCardItem[];
  initialQuery?: string;
  initialCategory?: MaterialCategory | "all";
}) {
  const [filters, setFilters] = useState<MaterialFilterState>({ ...initialFilters, query: initialQuery, category: initialCategory });
  const [visible, setVisible] = useState(6);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const result = materials.filter((material) => {
      const matchesQuery =
        !query ||
        material.title.toLowerCase().includes(query) ||
        material.ownerName.toLowerCase().includes(query) ||
        material.city.toLowerCase().includes(query);
      const matchesCategory = filters.category === "all" || material.category === filters.category;
      const matchesPrice =
        filters.price === "all" || (filters.price === "free" ? material.free : !material.free);
      const matchesCity = filters.city === "Semua kota" || material.city === filters.city;
      const conditionLabel = material.conditionLabel.toLowerCase();
      const matchesCondition =
        filters.condition === "all" ||
        (filters.condition === "new" && conditionLabel === "baru") ||
        (filters.condition === "good" && conditionLabel === "baik") ||
        (filters.condition === "fair" && conditionLabel === "cukup");
      return matchesQuery && matchesCategory && matchesPrice && matchesCity && matchesCondition;
    });

    return [...result].sort((a, b) => {
      if (filters.sort === "cheapest") return (a.priceAmount ?? 0) - (b.priceAmount ?? 0);
      if (filters.sort === "nearest") return Number.parseInt(a.distance ?? "999", 10) - Number.parseInt(b.distance ?? "999", 10);
      if (filters.sort === "popular") return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
      return 0;
    });
  }, [filters, materials]);

  const reset = () => {
    setFilters(initialFilters);
    setVisible(6);
  };

  const activeCount = [
    filters.category !== "all",
    filters.condition !== "all",
    filters.price !== "all",
    filters.city !== "Semua kota",
  ].filter(Boolean).length;

  const set = <K extends keyof MaterialFilterState>(key: K, value: MaterialFilterState[K]) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setVisible(6);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center justify-between lg:hidden">
          <Button variant="secondary" onClick={() => setMobileFilters((open) => !open)}>
            <Filter className="size-4" aria-hidden="true" />
            Filter
            {activeCount > 0 && <Badge tone="primary">{activeCount}</Badge>}
          </Button>
          <span className="text-sm text-text-muted">{filtered.length} material</span>
        </div>

        <Card className={cn("space-y-5 p-5", !mobileFilters && "hidden lg:block")}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Filter material</h2>
            <button type="button" onClick={reset} className="inline-flex min-h-9 items-center gap-1 rounded-control px-2 text-xs font-medium text-primary hover:bg-primary-50">
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>

          <div>
            <label htmlFor="material-search" className="mb-1.5 block text-sm font-medium">
              Kata kunci
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
              <Input
                id="material-search"
                value={filters.query}
                onChange={(event) => set("query", event.target.value)}
                placeholder="Kain, kardus, kota..."
                className="pl-9"
              />
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">Kategori</legend>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => set("category", "all")}
                className={cn("min-h-9 rounded-full border px-3 text-xs font-medium", filters.category === "all" ? "border-primary bg-primary-50 text-primary" : "border-border text-text-muted hover:bg-surface")}
              >
                Semua
              </button>
              {MATERIAL_CATEGORY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => set("category", option.value as MaterialCategory)}
                  className={cn("min-h-9 rounded-full border px-3 text-xs font-medium", filters.category === option.value ? "border-primary bg-primary-50 text-primary" : "border-border text-text-muted hover:bg-surface")}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <label htmlFor="material-condition" className="mb-1.5 block text-sm font-medium">
                Kondisi
              </label>
              <Select id="material-condition" value={filters.condition} onChange={(event) => set("condition", event.target.value as MaterialCondition | "all")}>
                <option value="all">Semua kondisi</option>
                {Object.entries(MATERIAL_CONDITION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="material-price" className="mb-1.5 block text-sm font-medium">
                Harga
              </label>
              <Select id="material-price" value={filters.price} onChange={(event) => set("price", event.target.value as PriceType | "all")}>
                <option value="all">Semua harga</option>
                <option value="free">Gratis</option>
                <option value="paid">Berbayar</option>
              </Select>
            </div>
            <div>
              <label htmlFor="material-city" className="mb-1.5 block text-sm font-medium">
                Lokasi
              </label>
              <Select id="material-city" value={filters.city} onChange={(event) => set("city", event.target.value)}>
                {MATERIAL_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="rounded-control bg-primary-50 p-3 text-xs leading-5 text-primary-900">
            <p className="flex items-center gap-1.5 font-semibold">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Smart Matching aktif
            </p>
            <p className="mt-1">Material diurutkan berdasarkan kedekatan lokasi, kondisi, dan kebutuhan Anda.</p>
          </div>
        </Card>
      </div>

      <div className="min-w-0">
        <div className="mb-4 flex flex-col gap-3 rounded-card border border-border bg-surface p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-text">{filtered.length} material ditemukan</span>
            {filters.query && <Badge tone="neutral">Kata kunci: {filters.query}</Badge>}
            {filters.category !== "all" && <Badge tone="primary">{MATERIAL_CATEGORY_LABELS[filters.category]}</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="material-sort" className="shrink-0 text-sm text-text-muted">
              Urutkan
            </label>
            <Select id="material-sort" value={filters.sort} onChange={(event) => set("sort", event.target.value as MaterialFilterState["sort"])} className="min-h-10 w-auto text-sm">
              {MATERIAL_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {activeCount > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {filters.category !== "all" && (
              <button type="button" onClick={() => set("category", "all")} className="inline-flex min-h-8 items-center gap-1 rounded-full bg-primary-50 px-3 text-xs font-medium text-primary">
                {MATERIAL_CATEGORY_LABELS[filters.category]} <X className="size-3" aria-hidden="true" />
              </button>
            )}
            {filters.city !== "Semua kota" && (
              <button type="button" onClick={() => set("city", "Semua kota")} className="inline-flex min-h-8 items-center gap-1 rounded-full bg-primary-50 px-3 text-xs font-medium text-primary">
                {filters.city} <X className="size-3" aria-hidden="true" />
              </button>
            )}
            {filters.condition !== "all" && (
              <button type="button" onClick={() => set("condition", "all")} className="inline-flex min-h-8 items-center gap-1 rounded-full bg-primary-50 px-3 text-xs font-medium text-primary">
                {MATERIAL_CONDITION_LABELS[filters.condition]} <X className="size-3" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        <MaterialGrid materials={filtered.slice(0, visible)} emptyAction={<Button variant="secondary" onClick={reset}>Reset filter</Button>} />

        {visible < filtered.length && (
          <div className="mt-6 flex justify-center">
            <Button variant="secondary" onClick={() => setVisible((current) => current + 6)}>
              Tampilkan lebih banyak ({filtered.length - visible} lagi)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
