"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BarChart3, Bell, FolderTree, LayoutList, Menu, Recycle, ShieldCheck, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { IconButton } from "@/components/ui/icon-button";
import { ROUTES } from "@/lib/constants/routes";
import { useSession } from "@/lib/auth/session";
import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

const adminNav = [
  { label: "Statistik", href: ROUTES.admin, icon: BarChart3 },
  { label: "Listing", href: ROUTES.adminListings, icon: LayoutList, badge: "18" },
  { label: "Laporan", href: ROUTES.adminReports, icon: ShieldCheck, badge: "7" },
  { label: "Kategori", href: ROUTES.adminCategories, icon: FolderTree },
  { label: "Pengguna", href: ROUTES.adminUsers, icon: Users },
];

function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col bg-neutral-900 text-white">
      <Link href={ROUTES.admin} onClick={onNavigate} className="flex min-h-16 items-center gap-2 border-b border-white/10 px-5 text-lg font-bold">
        <span className="inline-flex size-9 items-center justify-center rounded-control bg-primary-600">
          <Recycle className="size-5" aria-hidden="true" />
        </span>
        SisaHub <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary-100">ADMIN</span>
      </Link>
      <nav aria-label="Navigasi admin" className="flex-1 space-y-1 p-3">
        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Operasional</p>
        {adminNav.map((item) => {
          const active = item.href === ROUTES.admin ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn("flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium", active ? "bg-primary-600 text-white" : "text-neutral-300 hover:bg-white/10 hover:text-white")}
            >
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {item.badge && <Badge tone={item.label === "Laporan" ? "danger" : "accent"}>{item.badge}</Badge>}
            </Link>
          );
        })}
        <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Tautan</p>
        <Link href={ROUTES.dashboard} onClick={onNavigate} className="flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white">
          Dashboard pengguna
        </Link>
        <Link href={ROUTES.home} onClick={onNavigate} className="flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white">
          Lihat situs publik
        </Link>
      </nav>
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-control p-2">
          <Avatar name="Admin SisaHub" size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Admin SisaHub</p>
            <p className="truncate text-xs text-neutral-400">Super admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user } = useSession();
  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <AdminSidebar />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-background">
          <Container className="flex min-h-16 items-center gap-3">
            <IconButton label="Buka menu admin" className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="size-5" />
            </IconButton>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-muted">Panel administrasi</p>
              <p className="truncate text-sm font-semibold">SisaHub Operations</p>
            </div>
            <Link href={ROUTES.notifications} aria-label="Notifikasi admin" className="relative inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:bg-surface">
              <Bell className="size-5" aria-hidden="true" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-background" />
            </Link>
            <Avatar name={user?.name ?? "Admin"} size="sm" />
          </Container>
        </header>
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} title="Menu admin" side="left">
        <div className="-m-5">
          <AdminSidebar onNavigate={() => setOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
