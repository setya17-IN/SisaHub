"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LayoutDashboard, LogOut, Menu, Plus, Recycle, Search, Settings, UserRound, X } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/lib/constants/routes";
import { useSession } from "@/lib/auth/session";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

const mainLinks = [
  { label: "Jelajahi", href: ROUTES.explore },
  { label: "Dicari", href: ROUTES.wanted },
  { label: "Dampak", href: ROUTES.impact },
  { label: "Panduan", href: ROUTES.guide },
] as const;

export function Navbar() {
  const { role, user } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const loggedIn = role !== "guest";
  const linkButton = "inline-flex min-h-11 items-center justify-center rounded-control px-4 text-sm font-medium";

  return (
    <nav aria-label="Navigasi utama" className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link href={ROUTES.home} className="inline-flex shrink-0 items-center gap-2 text-lg font-bold text-primary">
          <span className="inline-flex size-9 items-center justify-center rounded-control bg-primary-50">
            <Recycle className="size-5" aria-hidden="true" />
          </span>
          SisaHub
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              className={cn("inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium", pathname === link.href ? "bg-primary-50 text-primary" : "text-text-muted hover:bg-surface hover:text-primary")}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <Link href={ROUTES.explore} aria-label="Cari material" className="inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:bg-surface-muted hover:text-text">
            <Search className="size-5" aria-hidden="true" />
          </Link>
          {loggedIn ? (
            <>
              <Link href={ROUTES.dashboard} className={cn("inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium", pathname.startsWith("/dashboard") ? "text-primary" : "text-text-muted hover:text-primary")}>
                Dashboard
              </Link>
              <Link className={`${linkButton} bg-primary text-white hover:bg-primary-hover`} href={ROUTES.newMaterial}>
                <Plus className="mr-1 size-4" aria-hidden="true" />
                Bagikan material
              </Link>
              <Link href={ROUTES.notifications} aria-label="Notifikasi, 2 belum dibaca" className="relative inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:bg-surface-muted">
                <Bell className="size-5" aria-hidden="true" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-background" />
              </Link>
              {role === "admin" && (
                <Link href={ROUTES.admin} className="min-h-11 inline-flex items-center rounded-control px-2 text-sm font-medium text-text-muted hover:text-primary">
                  Admin
                </Link>
              )}
              <DropdownMenu label={user?.name ?? "Akun"}>
                <Link href={ROUTES.dashboard} className="gap-2"><LayoutDashboard className="size-4" aria-hidden="true" />Dashboard</Link>
                <Link href={ROUTES.profile("saya")} className="gap-2"><UserRound className="size-4" aria-hidden="true" />Profil</Link>
                <Link href={ROUTES.settings} className="gap-2"><Settings className="size-4" aria-hidden="true" />Pengaturan</Link>
                <Link href={ROUTES.login} className="gap-2"><LogOut className="size-4" aria-hidden="true" />Keluar (pratinjau)</Link>
              </DropdownMenu>
              <Avatar name={user?.name ?? "Pengguna"} size="sm" />
            </>
          ) : (
            <>
              <Link className={`${linkButton} text-text hover:bg-surface-muted`} href={ROUTES.login}>
                Masuk
              </Link>
              <Link className={`${linkButton} bg-primary text-white hover:bg-primary-hover`} href={ROUTES.register}>
                Daftar gratis
              </Link>
            </>
          )}
        </div>

        <IconButton label={mobileOpen ? "Tutup navigasi" : "Buka navigasi"} className="lg:hidden" onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </IconButton>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col py-3">
            {mainLinks.map((link) => (
              <Link key={link.href} onClick={() => setMobileOpen(false)} className="min-h-11 inline-flex items-center rounded-control px-2 text-sm font-medium text-text-muted hover:bg-surface" href={link.href}>
                {link.label}
              </Link>
            ))}
            {loggedIn ? (
              <>
                <Link onClick={() => setMobileOpen(false)} className="min-h-11 inline-flex items-center rounded-control px-2 text-sm font-medium text-text-muted hover:bg-surface" href={ROUTES.dashboard}>Dashboard</Link>
                <Link onClick={() => setMobileOpen(false)} className="min-h-11 inline-flex items-center rounded-control px-2 text-sm font-medium text-text-muted hover:bg-surface" href={ROUTES.notifications}>
                  Notifikasi <span className="ml-2 rounded-full bg-danger-soft px-2 text-xs text-danger">2</span>
                </Link>
                {role === "admin" && (
                  <Link onClick={() => setMobileOpen(false)} className="min-h-11 inline-flex items-center rounded-control px-2 text-sm font-medium text-text-muted hover:bg-surface" href={ROUTES.admin}>Admin</Link>
                )}
                <Link onClick={() => setMobileOpen(false)} className={`${linkButton} my-2 w-full bg-primary text-white hover:bg-primary-hover`} href={ROUTES.newMaterial}>Bagikan material</Link>
                <Link onClick={() => setMobileOpen(false)} className="min-h-11 inline-flex items-center rounded-control px-2 text-sm text-text-muted hover:bg-surface" href={ROUTES.settings}>Pengaturan</Link>
                <Link onClick={() => setMobileOpen(false)} className="min-h-11 inline-flex items-center rounded-control px-2 text-sm text-text-muted hover:bg-surface" href={ROUTES.login}>Keluar (pratinjau)</Link>
              </>
            ) : (
              <div className="flex gap-2 py-2">
                <Link onClick={() => setMobileOpen(false)} className={`${linkButton} flex-1 border border-border text-text hover:bg-surface-muted`} href={ROUTES.login}>Masuk</Link>
                <Link onClick={() => setMobileOpen(false)} className={`${linkButton} flex-1 bg-primary text-white hover:bg-primary-hover`} href={ROUTES.register}>Daftar</Link>
              </div>
            )}
          </Container>
        </div>
      )}
    </nav>
  );
}
