"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Bookmark,
  Compass,
  Heart,
  LayoutDashboard,
  Menu,
  PackagePlus,
  Recycle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "@/components/ui/drawer";
import { IconButton } from "@/components/ui/icon-button";
import { useSession } from "@/lib/auth/session";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

const navItems = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Bagikan material", href: ROUTES.newMaterial, icon: PackagePlus },
  { label: "Permintaan", href: ROUTES.requests, icon: Compass, badge: "2" },
  { label: "Favorit", href: ROUTES.favorites, icon: Heart },
  { label: "Notifikasi", href: ROUTES.notifications, icon: Bell, badge: "3" },
  { label: "Pengaturan", href: ROUTES.settings, icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { role, user } = useSession();
  return (
    <div className="flex h-full flex-col">
      <Link href={ROUTES.home} onClick={onNavigate} className="flex min-h-16 items-center gap-2 border-b border-border px-5 text-lg font-bold text-primary">
        <span className="inline-flex size-9 items-center justify-center rounded-control bg-primary-50">
          <Recycle className="size-5" aria-hidden="true" />
        </span>
        SisaHub
      </Link>

      <nav aria-label="Navigasi dashboard" className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">Menu akun</p>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== ROUTES.dashboard && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium",
                active ? "bg-primary-50 text-primary" : "text-text-muted hover:bg-surface hover:text-text",
              )}
            >
              <item.icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {item.badge && <Badge tone={item.label === "Notifikasi" ? "danger" : "accent"}>{item.badge}</Badge>}
            </Link>
          );
        })}

        <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-text-muted">Jelajahi</p>
        <Link href={ROUTES.explore} onClick={onNavigate} className="flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium text-text-muted hover:bg-surface hover:text-text">
          <Search className="size-4" aria-hidden="true" />
          Cari material
        </Link>
        <Link href={ROUTES.wanted} onClick={onNavigate} className="flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium text-text-muted hover:bg-surface hover:text-text">
          <Sparkles className="size-4" aria-hidden="true" />
          Material dicari
        </Link>
        <Link href={ROUTES.favorites} onClick={onNavigate} className="flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium text-text-muted hover:bg-surface hover:text-text">
          <Bookmark className="size-4" aria-hidden="true" />
          Tersimpan
        </Link>
        {role === "admin" && (
          <Link href={ROUTES.admin} onClick={onNavigate} className="flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium text-text-muted hover:bg-surface hover:text-text">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Admin
          </Link>
        )}
      </nav>

      <div className="border-t border-border p-3">
        <Link href={ROUTES.profile("saya")} onClick={onNavigate} className="flex items-center gap-3 rounded-control p-2 hover:bg-surface">
          <Avatar name={user?.name ?? "Pengguna"} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user?.name ?? "Tamu SisaHub"}</p>
            <p className="truncate text-xs text-text-muted">Lihat profil</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user } = useSession();

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background lg:block">
        <SidebarContent />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-background">
          <Container className="flex min-h-16 items-center gap-3">
            <IconButton label="Buka menu dashboard" className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="size-5" />
            </IconButton>

            <div className="hidden min-w-0 flex-1 sm:block">
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Cari material atau kebutuhan..."
                  aria-label="Cari material atau kebutuhan"
                  className="min-h-10 w-full rounded-control border border-border bg-surface pl-9 pr-3 text-sm placeholder:text-neutral-500 focus:border-focus-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-1">
              <Link href={ROUTES.explore} className="hidden min-h-10 items-center rounded-control px-3 text-sm font-medium text-text-muted hover:bg-surface sm:inline-flex">
                Lihat situs
              </Link>
              <Link href={ROUTES.notifications} aria-label="Notifikasi" className="relative inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:bg-surface">
                <Bell className="size-5" aria-hidden="true" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-background" />
              </Link>
              <Link href={ROUTES.profile("saya")} aria-label="Buka profil" className="ml-1 inline-flex">
                <Avatar name={user?.name ?? "Pengguna"} size="sm" />
              </Link>
            </div>
          </Container>
        </header>

        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)} title="Menu dashboard" side="left">
        <div className="-m-5">
          <SidebarContent onNavigate={() => setOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
