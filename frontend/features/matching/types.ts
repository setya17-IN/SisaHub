import type { MaterialCategory } from "@/features/material";

export type MatchSuggestion = {
  id: string;
  materialId: string;
  title: string;
  category: MaterialCategory;
  city: string;
  distanceKm: number;
  score: number;
  reason: string;
  quantityLabel: string;
  priceLabel: string;
};
