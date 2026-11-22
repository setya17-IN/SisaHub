"use client";
import { useMemo, useState } from "react";
import { Check, Eye, Search, ShieldOff, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/controls";
import { useToast } from "@/components/ui/toast";
import { MATERIAL_CATEGORY_LABELS, MATERIAL_STATUS_LABELS, MATERIAL_STATUS_TONES, type MaterialStatus } from "@/features/material";
import type { AdminListing } from "../types";

export function AdminListingsTable({ items }: { items: AdminListing[] }) {
  const { toast } = useToast();
  const [rows, setRows] = useState(items);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<MaterialStatus | "all">("all");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery = !search || row.title.toLowerCase().includes(search) || row.owner.toLowerCase().includes(search) || row.id.toLowerCase().includes(search);
      return matchesQuery && (status === "all" || row.status === status);
    });
  }, [rows, query, status]);

  const update = (id: string, next: MaterialStatus, message: string) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status: next } : row)));
    toast({ title: message, tone: "success" });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_14rem_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul, pemilik, atau ID listing..." className="pl-9" aria-label="Cari listing" />
          </div>
          <Select value={status} onChange={(event) => setStatus(event.target.value as MaterialStatus | "all")} aria-label="Filter status listing">
            <option value="all">Semua status</option>
            {Object.entries(MATERIAL_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <Button variant="secondary" onClick={() => { setQuery(""); setStatus("all"); }}>Reset</Button>
        </div>
        <p className="mt-3 text-sm text-text-muted">{filtered.length} listing ditampilkan dari {rows.length} total.</p>
      </Card>

      <DataTable
        caption="Daftar listing material untuk moderasi"
        rows={filtered}
        columns={[
          {
            key: "listing",
            header: "Listing",
            render: (row) => (
              <div>
                <p className="font-medium text-text">{row.title}</p>
                <p className="text-xs text-text-muted">{row.id} - {row.owner}</p>
              </div>
            ),
          },
          { key: "category", header: "Kategori", render: (row) => <Badge tone="neutral">{MATERIAL_CATEGORY_LABELS[row.category]}</Badge> },
          { key: "status", header: "Status", render: (row) => <Badge tone={MATERIAL_STATUS_TONES[row.status]}>{MATERIAL_STATUS_LABELS[row.status]}</Badge> },
          { key: "reports", header: "Laporan", render: (row) => row.reports > 0 ? <Badge tone="danger">{row.reports} laporan</Badge> : <span className="text-text-muted">-</span> },
          { key: "views", header: "Dilihat", render: (row) => <span className="tabular-nums">{row.views}</span> },
          {
            key: "actions",
            header: "Aksi",
            render: (row) => (
              <div className="flex flex-wrap gap-1">
                <Button variant="ghost" size="sm" aria-label={`Lihat ${row.title}`} onClick={() => toast({ title: "Pratinjau listing", description: row.title, tone: "info" })}>
                  <Eye className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="sm" aria-label={`Setujui ${row.title}`} onClick={() => update(row.id, "available", "Listing disetujui")}>
                  <Check className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="sm" aria-label={`Nonaktifkan ${row.title}`} onClick={() => update(row.id, "inactive", "Listing dinonaktifkan")}>
                  <ShieldOff className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="sm" className="text-danger" aria-label={`Hapus ${row.title}`} onClick={() => update(row.id, "removed", "Listing dihapus")}>
                  <Trash2 className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
