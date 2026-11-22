"use client";
import { SessionProvider } from "@/lib/auth/session";
import { ToastProvider } from "@/components/ui/toast";
import { RolePreview } from "@/components/layout/role-preview";

export function Providers({ children }: { children: React.ReactNode }) { return <SessionProvider><ToastProvider><a href="#main-content" className="sr-only fixed left-4 top-4 z-[70] rounded-control bg-background px-4 py-3 text-primary focus:not-sr-only">Lewati ke konten utama</a><div id="main-content" tabIndex={-1}>{children}</div><RolePreview /></ToastProvider></SessionProvider>; }
