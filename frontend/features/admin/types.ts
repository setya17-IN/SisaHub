import type { MaterialCategory, MaterialStatus } from "@/features/material";

export type AdminStats = {
  totalListings: number;
  pendingListings: number;
  openReports: number;
  newUsers: number;
  completedRequests: number;
  activeUsers: number;
  monthlyListings: Array<{ month: string; count: number }>;
};

export type AdminListing = {
  id: string;
  title: string;
  owner: string;
  category: MaterialCategory;
  status: MaterialStatus;
  reports: number;
  createdAt: string;
  views: number;
};

export type AdminReport = {
  id: string;
  target: string;
  targetType: "listing" | "user" | "review";
  reporter: string;
  reason: string;
  severity: "high" | "medium" | "low";
  status: "open" | "resolved" | "dismissed";
  createdAt: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "seeker" | "admin";
  status: "active" | "suspended" | "pending";
  joinedAt: string;
  listings: number;
  verified: boolean;
};

export type AdminCategory = {
  id: string;
  label: string;
  slug: string;
  count: number;
  active: boolean;
  description: string;
};

export const REPORT_REASON_LABELS: Record<string, string> = {
  prohibited: "Material terlarang",
  misleading: "Informasi menyesatkan",
  spam: "Spam atau duplikat",
  inappropriate: "Konten tidak pantas",
  fraud: "Indikasi penipuan",
};

export const ADMIN_USER_ROLE_LABELS: Record<AdminUser["role"], string> = {
  owner: "Pemilik",
  seeker: "Pencari",
  admin: "Admin",
};

export const ADMIN_USER_STATUS_LABELS: Record<AdminUser["status"], string> = {
  active: "Aktif",
  suspended: "Ditangguhkan",
  pending: "Menunggu verifikasi",
};

export const REPORT_SEVERITY_LABELS: Record<AdminReport["severity"], string> = {
  high: "Tinggi",
  medium: "Sedang",
  low: "Rendah",
};
