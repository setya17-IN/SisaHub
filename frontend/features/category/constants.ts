import type { BadgeTone } from "@/components/ui/badge";
export const CATEGORY_LABELS = { textile: "Kain", paperCardboard: "Kertas & kardus", wood: "Kayu", plastic: "Plastik", metal: "Logam", craftMaterial: "Bahan kerajinan" } as const;
export const CATEGORY_TONES: Record<keyof typeof CATEGORY_LABELS, BadgeTone> = { textile: "rose", paperCardboard: "accent", wood: "orange", plastic: "sky", metal: "slate", craftMaterial: "violet" };
