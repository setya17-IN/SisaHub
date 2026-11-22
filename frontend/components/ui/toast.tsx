"use client";
import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils/cn";
type ToastItem = { id: number; title: string; description?: string; tone: "success" | "error" | "info" };
type ToastContextValue = { toast: (item: Omit<ToastItem, "id">) => void };
const ToastContext = createContext<ToastContextValue | null>(null);
export function ToastProvider({ children }: { children: ReactNode }) { const [items, setItems] = useState<ToastItem[]>([]); const toast = useCallback((item: Omit<ToastItem, "id">) => { const id = Date.now() + Math.random(); setItems((current) => [...current, { ...item, id }]); window.setTimeout(() => setItems((current) => current.filter((toastItem) => toastItem.id !== id)), 4500); }, []); const dismiss = (id: number) => setItems((current) => current.filter((item) => item.id !== id)); return <ToastContext.Provider value={{ toast }}>{children}<div aria-live="polite" aria-atomic="false" className="fixed bottom-4 right-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2">{items.map((item) => <div key={item.id} role={item.tone === "error" ? "alert" : "status"} className={cn("flex items-start justify-between gap-3 rounded-card border bg-background p-4 shadow-card", item.tone === "error" ? "border-danger text-danger" : item.tone === "success" ? "border-primary-300 text-primary-800" : "border-info-soft text-info")}><div><p className="font-semibold">{item.title}</p>{item.description && <p className="mt-1 text-sm text-text-muted">{item.description}</p>}</div><IconButton label="Tutup notifikasi" onClick={() => dismiss(item.id)}><X className="size-4" /></IconButton></div>)}</div></ToastContext.Provider>; }
export function useToast() { const context = useContext(ToastContext); if (!context) throw new Error("useToast harus digunakan di dalam ToastProvider."); return context; }
