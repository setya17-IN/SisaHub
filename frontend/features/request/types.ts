import type { MaterialCategory } from "@/features/material";
import type { BadgeTone } from "@/components/ui/badge";

export type RequestStatus = "pending" | "accepted" | "rejected" | "cancelled" | "completed";
export type RequestDirection = "incoming" | "outgoing";

export type RequestTimelineItem = {
  title: string;
  description?: string;
  date?: string;
  done: boolean;
};

export type MaterialRequest = {
  id: string;
  materialId: string;
  materialTitle: string;
  category: MaterialCategory;
  quantity: number;
  unit: string;
  status: RequestStatus;
  direction: RequestDirection;
  city: string;
  createdAt: string;
  note: string;
  requester: { id: string; name: string; organization?: string; verified: boolean };
  owner: { id: string; name: string; organization?: string; verified: boolean };
  timeline: RequestTimelineItem[];
  unread: boolean;
};

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  pending: "Menunggu",
  accepted: "Diterima",
  rejected: "Ditolak",
  cancelled: "Dibatalkan",
  completed: "Selesai",
};

export const REQUEST_STATUS_TONES: Record<RequestStatus, BadgeTone> = {
  pending: "accent",
  accepted: "info",
  rejected: "danger",
  cancelled: "neutral",
  completed: "primary",
};

export const REQUEST_DIRECTION_LABELS: Record<RequestDirection, string> = {
  incoming: "Masuk",
  outgoing: "Keluar",
};
