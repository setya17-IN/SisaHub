"use client";
import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Handshake, MessageSquare, Settings2, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils/cn";
import type { AppNotification, NotificationType } from "../types";
import { NOTIFICATION_TYPE_LABELS } from "../types";

const icons: Record<NotificationType, typeof Bell> = {
  request: Handshake,
  message: MessageSquare,
  system: Settings2,
  review: Star,
  match: Sparkles,
};

function timeAgo(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Baru saja";
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export function NotificationList({ items }: { items: AppNotification[] }) {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(items);

  const markAll = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
    toast({ title: "Semua notifikasi ditandai dibaca", tone: "success" });
  };

  const markOne = (id: string) => {
    setNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const list = (filter: (item: AppNotification) => boolean) => {
    const filtered = notifications.filter(filter);
    if (filtered.length === 0) {
      return <p className="rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-text-muted">Tidak ada notifikasi di bagian ini.</p>;
    }
    return (
      <ul className="divide-y divide-border overflow-hidden rounded-card border border-border bg-background">
        {filtered.map((item) => {
          const Icon = icons[item.type];
          return (
            <li key={item.id} className={cn("relative flex gap-3 p-4 sm:p-5", !item.read && "bg-primary-50/60")}>
              <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full", item.read ? "bg-surface text-text-muted" : "bg-primary-100 text-primary")}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={item.read ? "neutral" : "primary"}>{NOTIFICATION_TYPE_LABELS[item.type]}</Badge>
                  <span className="text-xs text-text-muted">{timeAgo(item.createdAt)}</span>
                  {!item.read && <span className="size-2 rounded-full bg-primary" aria-label="Belum dibaca" />}
                </div>
                <p className="mt-1.5 font-semibold text-text">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-text-muted">{item.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {item.href && (
                    <Link href={item.href} onClick={() => markOne(item.id)} className="inline-flex min-h-9 items-center text-sm font-medium text-primary hover:underline">
                      Lihat detail
                    </Link>
                  )}
                  {!item.read && (
                    <button type="button" onClick={() => markOne(item.id)} className="inline-flex min-h-9 items-center text-xs font-medium text-text-muted hover:text-text">
                      Tandai dibaca
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const unread = notifications.filter((item) => !item.read).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-text-muted">{unread} notifikasi belum dibaca dari {notifications.length} total.</p>
        <Button variant="secondary" size="sm" onClick={markAll} disabled={unread === 0}>
          <CheckCheck className="size-4" aria-hidden="true" />
          Tandai semua dibaca
        </Button>
      </div>
      <Tabs
        tabs={[
          { id: "all", label: `Semua (${notifications.length})`, content: list(() => true) },
          { id: "unread", label: `Belum dibaca (${unread})`, content: list((item) => !item.read) },
          { id: "request", label: "Permintaan", content: list((item) => item.type === "request") },
          { id: "system", label: "Sistem", content: list((item) => item.type === "system") },
        ]}
      />
      <Card className="bg-surface p-4">
        <p className="text-sm font-semibold">Atur notifikasi</p>
        <p className="mt-1 text-sm text-text-muted">Pilih kanal dan jenis notifikasi yang ingin Anda terima di halaman pengaturan.</p>
        <Link href="/pengaturan" className="mt-3 inline-flex min-h-10 items-center text-sm font-medium text-primary hover:underline">
          Buka pengaturan notifikasi
        </Link>
      </Card>
    </div>
  );
}
