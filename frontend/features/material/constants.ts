import type { BadgeTone } from "@/components/ui/badge";
import type { MaterialCategory, MaterialCondition, MaterialStatus, PriceType } from "./types";

export const MATERIAL_CATEGORY_LABELS: Record<MaterialCategory, string> = {
  kain: "Kain",
  "kertas-kardus": "Kertas & kardus",
  kayu: "Kayu",
  plastik: "Plastik",
  logam: "Logam",
  "bahan-kerajinan": "Bahan kerajinan",
};

export const MATERIAL_CATEGORY_TONES: Record<MaterialCategory, BadgeTone> = {
  kain: "rose",
  "kertas-kardus": "accent",
  kayu: "orange",
  plastik: "sky",
  logam: "slate",
  "bahan-kerajinan": "violet",
};

export const MATERIAL_CONDITION_LABELS: Record<MaterialCondition, string> = {
  new: "Baru",
  good: "Baik",
  fair: "Cukup",
};

export const MATERIAL_STATUS_LABELS: Record<MaterialStatus, string> = {
  available: "Tersedia",
  reserved: "Direservasi",
  completed: "Selesai",
  inactive: "Tidak aktif",
  removed: "Dihapus",
};

export const PRICE_TYPE_LABELS: Record<PriceType, string> = {
  free: "Gratis",
  paid: "Berbayar",
};

export const MATERIAL_STATUS_TONES: Record<MaterialStatus, BadgeTone> = {
  available: "primary",
  reserved: "accent",
  completed: "neutral",
  inactive: "neutral",
  removed: "danger",
};

export const MATERIAL_CONDITION_TONES: Record<MaterialCondition, BadgeTone> = {
  new: "primary",
  good: "sky",
  fair: "accent",
};

export const PRICE_TYPE_TONES: Record<PriceType, BadgeTone> = {
  free: "primary",
  paid: "accent",
};

export const MATERIAL_CATEGORY_OPTIONS = Object.entries(MATERIAL_CATEGORY_LABELS).map(([value, label]) => ({
  value: value as MaterialCategory,
  label,
}));

export const MATERIAL_CONDITION_OPTIONS = Object.entries(MATERIAL_CONDITION_LABELS).map(([value, label]) => ({
  value: value as MaterialCondition,
  label,
}));

export const MATERIAL_SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "nearest", label: "Terdekat" },
  { value: "cheapest", label: "Harga terendah" },
  { value: "popular", label: "Paling populer" },
] as const;

export const MATERIAL_CITIES = [
  "Semua kota",
  "Jakarta Selatan",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Solo",
  "Tangerang",
  "Bekasi",
] as const;
