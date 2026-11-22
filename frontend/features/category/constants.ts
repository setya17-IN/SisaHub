import type { BadgeTone } from "@/components/ui/badge";

export type CategoryKey =
  | "kain"
  | "kertas-kardus"
  | "kayu"
  | "plastik"
  | "logam"
  | "bahan-kerajinan";

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  kain: "Kain",
  "kertas-kardus": "Kertas & kardus",
  kayu: "Kayu",
  plastik: "Plastik",
  logam: "Logam",
  "bahan-kerajinan": "Bahan kerajinan",
};

export const CATEGORY_TONES: Record<CategoryKey, BadgeTone> = {
  kain: "rose",
  "kertas-kardus": "accent",
  kayu: "orange",
  plastik: "sky",
  logam: "slate",
  "bahan-kerajinan": "violet",
};

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value: value as CategoryKey,
  label,
}));
