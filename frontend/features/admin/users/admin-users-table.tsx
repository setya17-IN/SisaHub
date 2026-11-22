"use client";
import { useMemo, useState } from "react";
import { CheckCircle2, Search, ShieldCheck, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/controls";
import { useToast } from "@/components/ui/toast";
import { formatDateId } from "@/lib/utils/format";
import type { AdminUser } from "../types";
import { ADMIN_USER_ROLE_LABELS, ADMIN_USER_STATUS_LABELS } from "../types";

export function AdminUsersTable({ items }: { items: AdminUser[] }) {
  const { toast } = useToast();
  const [rows, setRows] = useState(items);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<AdminUser["role"] | "all">("all");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesQuery = !search || row.name.toLowerCase().includes(search) || row.email.toLowerCase().includes(search) || row.id.toLowerCase().includes(search);
      return matchesQuery && (role === "all" || row.role === role);
    });
  }, [rows, query, role]);

  const setStatus = (id: string, status: AdminUser["status"]) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status, verified: status === "active" ? true : row.verified } : row)));
    toast({ title: status === "active" ? "Pengguna diaktifkan" : "Pengguna ditangguhkan", tone: "success" });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_14rem_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, email, atau ID pengguna..." className="pl-9" aria-label="Cari pengguna" />
          </div>
          <Select value={role} onChange={(event) => setRole(event.target.value as AdminUser["role"] | "all")} aria-label="Filter peran pengguna">
            <option value="all">Semua peran</option>
            <option value="owner">Pemilik</option>
            <option value="seeker">Pencari</option>
            <option value="admin">Admin</option>
          </Select>
          <Button variant="secondary" onClick={() => { setQuery(""); setRole("all"); }}>Reset</Button>
        </div>
        <p className="mt-3 text-sm text-text-muted">{filtered.length} pengguna ditampilkan.</p>
      </Card>

      <DataTable
        caption="Daftar pengguna SisaHub"
        rows={filtered}
        columns={[
          {
            key: "user",
            header: "Pengguna",
            render: (row) => (
              <div>
                <p className="flex items-center gap-1 font-medium">{row.name}{row.verified && <ShieldCheck className="size-3.5 text-primary" aria-label="Terverifikasi" />}</p>
                <p className="text-xs text-text-muted">{row.email}</p>
              </div>
            ),
          },
          { key: "role", header: "Peran", render: (row) => <Badge tone={row.role === "admin" ? "violet" : row.role === "owner" ? "primary" : "info"}>{ADMIN_USER_ROLE_LABELS[row.role]}</Badge> },
          { key: "status", header: "Status", render: (row) => <Badge tone={row.status === "active" ? "primary" : row.status === "suspended" ? "danger" : "accent"}>{ADMIN_USER_STATUS_LABELS[row.status]}</Badge> },
          { key: "listings", header: "Listing", render: (row) => <span className="tabular-nums">{row.listings}</span> },
          { key: "joined", header: "Bergabung", render: (row) => <span className="text-sm">{formatDateId(row.joinedAt)}</span> },
          {
            key: "actions",
            header: "Aksi",
            render: (row) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" aria-label={`Aktifkan ${row.name}`} onClick={() => setStatus(row.id, "active")}>
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="sm" className="text-danger" aria-label={`Tangguhkan ${row.name}`} onClick={() => setStatus(row.id, "suspended")}>
                  <ShieldOff className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
