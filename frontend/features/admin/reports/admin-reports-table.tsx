"use client";
import { useMemo, useState } from "react";
import { CheckCircle2, Eye, Search, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/controls";
import { useToast } from "@/components/ui/toast";
import { formatDateId } from "@/lib/utils/format";
import type { AdminReport } from "../types";
import { REPORT_SEVERITY_LABELS } from "../types";

export function AdminReportsTable({ items }: { items: AdminReport[] }) {
  const { toast } = useToast();
  const [rows, setRows] = useState(items);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AdminReport["status"] | "all">("all");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery = !search || row.target.toLowerCase().includes(search) || row.reporter.toLowerCase().includes(search) || row.id.toLowerCase().includes(search);
      return matchesQuery && (status === "all" || row.status === status);
    });
  }, [rows, query, status]);

  const resolve = (id: string, next: AdminReport["status"]) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status: next } : row)));
    toast({ title: next === "resolved" ? "Laporan diselesaikan" : "Laporan diabaikan", tone: "success" });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_14rem_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari target, pelapor, atau ID laporan..." className="pl-9" aria-label="Cari laporan" />
          </div>
          <Select value={status} onChange={(event) => setStatus(event.target.value as AdminReport["status"] | "all")} aria-label="Filter status laporan">
            <option value="all">Semua status</option>
            <option value="open">Terbuka</option>
            <option value="resolved">Selesai</option>
            <option value="dismissed">Diabaikan</option>
          </Select>
          <Button variant="secondary" onClick={() => { setQuery(""); setStatus("all"); }}>Reset</Button>
        </div>
      </Card>

      <DataTable
        caption="Daftar laporan pengguna"
        rows={filtered}
        columns={[
          { key: "id", header: "Laporan", render: (row) => <div><p className="font-medium">{row.id}</p><p className="text-xs text-text-muted">{formatDateId(row.createdAt)}</p></div> },
          { key: "target", header: "Target", render: (row) => <div><p className="font-medium">{row.target}</p><p className="text-xs capitalize text-text-muted">{row.targetType}</p></div> },
          { key: "reason", header: "Alasan", render: (row) => <span className="text-sm">{row.reason}</span> },
          { key: "reporter", header: "Pelapor", render: (row) => <span className="text-sm">{row.reporter}</span> },
          { key: "severity", header: "Prioritas", render: (row) => <Badge tone={row.severity === "high" ? "danger" : row.severity === "medium" ? "accent" : "neutral"}>{REPORT_SEVERITY_LABELS[row.severity]}</Badge> },
          { key: "status", header: "Status", render: (row) => <Badge tone={row.status === "open" ? "accent" : row.status === "resolved" ? "primary" : "neutral"}>{row.status === "open" ? "Terbuka" : row.status === "resolved" ? "Selesai" : "Diabaikan"}</Badge> },
          {
            key: "actions",
            header: "Aksi",
            render: (row) => (
              <div className="flex flex-wrap gap-1">
                <Button variant="ghost" size="sm" aria-label={`Tinjau ${row.id}`} onClick={() => toast({ title: "Detail laporan", description: `${row.reason} - ${row.target}`, tone: "info" })}>
                  <Eye className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="sm" aria-label={`Selesaikan ${row.id}`} onClick={() => resolve(row.id, "resolved")}>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="sm" aria-label={`Abaikan ${row.id}`} onClick={() => resolve(row.id, "dismissed")}>
                  <XCircle className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ),
          },
        ]}
        emptyMessage="Tidak ada laporan yang cocok."
      />
    </div>
  );
}
