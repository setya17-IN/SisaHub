"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, Check, Clock3, MapPin, Package, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { formatDateId } from "@/lib/utils/format";
import { MATERIAL_CATEGORY_LABELS } from "@/features/material";
import type { MaterialRequest, RequestStatus } from "../types";
import { REQUEST_DIRECTION_LABELS } from "../types";
import { RequestStatusBadge } from "./request-status-badge";

function RequestCard({
  request,
  status,
  onStatusChange,
}: {
  request: MaterialRequest;
  status: RequestStatus;
  onStatusChange: (id: string, status: RequestStatus) => void;
}) {
  const { toast } = useToast();
  const counterpart = request.direction === "incoming" ? request.requester : request.owner;

  const act = (next: RequestStatus) => {
    onStatusChange(request.id, next);
    toast({
      title: next === "accepted" ? "Permintaan diterima" : "Permintaan ditolak",
      description: next === "accepted" ? `Anda dapat mengatur waktu serah-terima dengan ${counterpart.name}.` : "Pengguna akan menerima notifikasi penolakan.",
      tone: next === "accepted" ? "success" : "info",
    });
  };

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge tone={request.direction === "incoming" ? "primary" : "info"}>
            {request.direction === "incoming" ? <ArrowDownLeft className="mr-1 size-3" aria-hidden="true" /> : <ArrowUpRight className="mr-1 size-3" aria-hidden="true" />}
            {REQUEST_DIRECTION_LABELS[request.direction]}
          </Badge>
          <RequestStatusBadge status={status} />
          {request.unread && status === "pending" && <span className="size-2 rounded-full bg-danger" aria-label="Belum dibaca" />}
        </div>
        <span className="text-xs text-text-muted">{formatDateId(request.createdAt)}</span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <Link href={`/permintaan/${request.id}`} className="text-base font-semibold text-text hover:text-primary">
            {request.materialTitle}
          </Link>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
            <span className="inline-flex items-center gap-1"><Package className="size-3.5" aria-hidden="true" />{request.quantity} {request.unit}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden="true" />{request.city}</span>
            <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" aria-hidden="true" />{MATERIAL_CATEGORY_LABELS[request.category]}</span>
          </div>
          <p className="mt-3 line-clamp-2 rounded-control bg-surface p-3 text-sm leading-6 text-text-muted">{request.note}</p>
        </div>

        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
          <Avatar name={counterpart.name} size="sm" />
          <div className="min-w-0 text-sm">
            <p className="truncate font-medium">{counterpart.name}</p>
            <p className="truncate text-xs text-text-muted">{counterpart.organization ?? (request.direction === "incoming" ? "Pencari material" : "Pemilik material")}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
        <span className="text-xs text-text-muted">ID: {request.id}</span>
        <div className="flex gap-2">
          {request.direction === "incoming" && status === "pending" ? (
            <>
              <Button variant="secondary" size="sm" onClick={() => act("rejected")}>
                <X className="size-4" aria-hidden="true" />
                Tolak
              </Button>
              <Button size="sm" onClick={() => act("accepted")}>
                <Check className="size-4" aria-hidden="true" />
                Terima
              </Button>
            </>
          ) : (
            <Link href={`/permintaan/${request.id}`}>
              <Button variant="secondary" size="sm">Lihat detail</Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}

export function RequestList({ items }: { items: MaterialRequest[] }) {
  const [statuses, setStatuses] = useState<Record<string, RequestStatus>>(
    Object.fromEntries(items.map((item) => [item.id, item.status])),
  );

  const updateStatus = (id: string, status: RequestStatus) => {
    setStatuses((current) => ({ ...current, [id]: status }));
  };

  const renderList = (filter: (item: MaterialRequest) => boolean) => {
    const filtered = items.filter(filter);
    if (filtered.length === 0) {
      return <p className="rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-text-muted">Belum ada permintaan pada bagian ini.</p>;
    }
    return (
      <div className="space-y-4">
        {filtered.map((item) => (
          <RequestCard key={item.id} request={item} status={statuses[item.id] ?? item.status} onStatusChange={updateStatus} />
        ))}
      </div>
    );
  };

  const pendingCount = useMemo(
    () => items.filter((item) => (statuses[item.id] ?? item.status) === "pending").length,
    [items, statuses],
  );

  return (
    <Tabs
      tabs={[
        {
          id: "all",
          label: `Semua (${items.length})`,
          content: renderList(() => true),
        },
        {
          id: "incoming",
          label: `Masuk (${items.filter((item) => item.direction === "incoming").length})`,
          content: renderList((item) => item.direction === "incoming"),
        },
        {
          id: "outgoing",
          label: `Keluar (${items.filter((item) => item.direction === "outgoing").length})`,
          content: renderList((item) => item.direction === "outgoing"),
        },
        {
          id: "pending",
          label: `Menunggu (${pendingCount})`,
          content: renderList((item) => (statuses[item.id] ?? item.status) === "pending"),
        },
        {
          id: "completed",
          label: "Selesai",
          content: renderList((item) => (statuses[item.id] ?? item.status) === "completed"),
        },
      ]}
    />
  );
}
