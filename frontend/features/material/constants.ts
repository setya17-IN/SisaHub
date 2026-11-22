import type { BadgeTone } from "@/components/ui/badge";
export const MATERIAL_CONDITION_LABELS = { new: "Baru", good: "Baik", fair: "Cukup" } as const;
export const MATERIAL_STATUS_LABELS = { available: "Tersedia", reserved: "Direservasi", completed: "Selesai", inactive: "Tidak aktif", removed: "Dihapus" } as const;
export const PRICE_TYPE_LABELS = { free: "Gratis", paid: "Berbayar" } as const;
export const MATERIAL_STATUS_TONES: Record<keyof typeof MATERIAL_STATUS_LABELS, BadgeTone> = { available: "primary", reserved: "accent", completed: "neutral", inactive: "neutral", removed: "danger" };
export const MATERIAL_CONDITION_TONES: Record<keyof typeof MATERIAL_CONDITION_LABELS, BadgeTone> = { new: "primary", good: "sky", fair: "accent" };
export const PRICE_TYPE_TONES: Record<keyof typeof PRICE_TYPE_LABELS, BadgeTone> = { free: "primary", paid: "accent" };
