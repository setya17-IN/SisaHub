export type NotificationType = "request" | "message" | "system" | "review" | "match";

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  href?: string;
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  request: "Permintaan",
  message: "Pesan",
  system: "Sistem",
  review: "Ulasan",
  match: "Smart Match",
};
