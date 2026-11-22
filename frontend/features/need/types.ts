import type { MaterialCategory } from "@/features/material";
import type { BadgeTone } from "@/components/ui/badge";

export type WantedUrgency = "high" | "normal";
export type WantedStatus = "open" | "matched" | "closed";

export type WantedItem = {
  id: string;
  title: string;
  description: string;
  category: MaterialCategory;
  quantity: number;
  unit: string;
  city: string;
  deadline: string;
  urgency: WantedUrgency;
  status: WantedStatus;
  offers: number;
  requester: {
    id: string;
    name: string;
    organization: string;
    verified: boolean;
    rating: number;
  };
  createdAt: string;
};

export const WANTED_URGENCY_LABELS: Record<WantedUrgency, string> = {
  high: "Mendesak",
  normal: "Fleksibel",
};

export const WANTED_STATUS_LABELS: Record<WantedStatus, string> = {
  open: "Terbuka",
  matched: "Sudah cocok",
  closed: "Ditutup",
};

export const WANTED_URGENCY_TONES: Record<WantedUrgency, BadgeTone> = {
  high: "danger",
  normal: "neutral",
};
