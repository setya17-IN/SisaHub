"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/controls";
import { MATERIAL_CATEGORY_OPTIONS } from "@/features/material";
import { cn } from "@/lib/utils/cn";
import type { WantedItem } from "../types";
import { WantedCard } from "./wanted-card";

export function WantedExplorer({ items }: { items: WantedItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [urgency, setUrgency] = useState("all");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.city.toLowerCase().includes(search) ||
        item.requester.organization.toLowerCase().includes(search);
      const matchesCategory = category === "all" || item.category === category;
      const matchesUrgency = urgency === "all" || item.urgency === urgency;
      return matchesSearch && matchesCategory && matchesUrgency;
    });
  }, [items, query, category, urgency]);

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-border bg-surface p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_14rem_12rem_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kebutuhan, organisasi, atau kota..." className="pl-9" aria-label="Cari kebutuhan material" />
          </div>
          <Select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter kategori">
            <option value="all">Semua kategori</option>
            {MATERIAL_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select value={urgency} onChange={(event) => setUrgency(event.target.value)} aria-label="Filter urgensi">
            <option value="all">Semua urgensi</option>
            <option value="high">Mendesak</option>
            <option value="normal">Fleksibel</option>
          </Select>
          <Button variant="secondary" onClick={() => { setQuery(""); setCategory("all"); setUrgency("all"); }}>
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            Reset
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <span>{filtered.length} kebutuhan ditemukan</span>
          {category !== "all" && <Badge tone="primary">{MATERIAL_CATEGORY_OPTIONS.find((option) => option.value === category)?.label}</Badge>}
          {urgency !== "all" && <Badge tone="accent">{urgency === "high" ? "Mendesak" : "Fleksibel"}</Badge>}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-card border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-semibold">Belum ada kebutuhan yang cocok</p>
          <p className="mt-1 text-sm text-text-muted">Coba kata kunci atau filter lain.</p>
          <Button variant="secondary" className="mt-4" onClick={() => { setQuery(""); setCategory("all"); setUrgency("all"); }}>
            Tampilkan semua
          </Button>
        </div>
      ) : (
        <div className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-3")}>
          {filtered.map((item) => (
            <div key={item.id} id={item.id}>
              <WantedCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
