import type { BadgeTone } from "@/components/ui/badge";
export const REQUEST_STATUS_LABELS = { pending: "Menunggu", accepted: "Diterima", rejected: "Ditolak", cancelled: "Dibatalkan", completed: "Selesai" } as const;
export const REQUEST_STATUS_TONES: Record<keyof typeof REQUEST_STATUS_LABELS, BadgeTone> = { pending: "accent", accepted: "info", rejected: "danger", cancelled: "neutral", completed: "primary" };
