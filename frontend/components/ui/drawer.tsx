"use client";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils/cn";
export function Drawer({ open, onClose, title, children, side = "right" }: { open: boolean; onClose: () => void; title: string; children: ReactNode; side?: "left" | "right" }) { useEffect(() => { if (!open) return; const handler = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, [open, onClose]); if (!open) return null; return <div className="fixed inset-0 z-50 bg-neutral-900/50" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="drawer-title" className={cn("absolute inset-y-0 flex w-full max-w-sm flex-col bg-background p-5 shadow-card", side === "right" ? "right-0" : "left-0")}><header className="mb-5 flex items-center justify-between"><h2 id="drawer-title" className="text-lg font-bold">{title}</h2><IconButton label="Tutup menu" onClick={onClose}><X className="size-5" /></IconButton></header><div className="overflow-y-auto">{children}</div></section></div>; }
