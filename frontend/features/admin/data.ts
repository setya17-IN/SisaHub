import type { AdminCategory, AdminListing, AdminReport, AdminStats, AdminUser } from "./types";

export const adminStats: AdminStats = {
  totalListings: 1284,
  pendingListings: 18,
  openReports: 7,
  newUsers: 46,
  completedRequests: 1268,
  activeUsers: 2140,
  monthlyListings: [
    { month: "Jun", count: 148 },
    { month: "Jul", count: 172 },
    { month: "Agu", count: 196 },
    { month: "Sep", count: 181 },
    { month: "Okt", count: 214 },
    { month: "Nov", count: 243 },
  ],
};

export const adminListings: AdminListing[] = [
  { id: "LST-1284", title: "Sisa kain katun perca 50 meter", owner: "Rina Putri", category: "kain", status: "available", reports: 0, createdAt: "2026-11-18", views: 412 },
  { id: "LST-1283", title: "Kardus bekas ekspedisi 20 kg", owner: "CV Karya Kemas", category: "kertas-kardus", status: "available", reports: 1, createdAt: "2026-11-17", views: 286 },
  { id: "LST-1282", title: "Potongan kayu jati 15 batang", owner: "Bengkel Kayu Jati", category: "kayu", status: "available", reports: 0, createdAt: "2026-11-16", views: 198 },
  { id: "LST-1281", title: "Botol PET bersih 8 kg", owner: "Komunitas Hijau Jakarta", category: "plastik", status: "available", reports: 2, createdAt: "2026-11-15", views: 521 },
  { id: "LST-1280", title: "Plat aluminium sisa produksi 12 kg", owner: "Logam Nusantara", category: "logam", status: "reserved", reports: 0, createdAt: "2026-11-14", views: 167 },
  { id: "LST-1279", title: "Kain perca batik 5 kg", owner: "Griya Batik Solo", category: "kain", status: "available", reports: 0, createdAt: "2026-11-13", views: 344 },
  { id: "LST-1278", title: "Gulungan kertas kraft 30 kg", owner: "Kertas Kita Semarang", category: "kertas-kardus", status: "available", reports: 0, createdAt: "2026-11-12", views: 231 },
  { id: "LST-1277", title: "Bahan kerajinan kulit sintetis", owner: "Studio Kulit Bandung", category: "bahan-kerajinan", status: "reserved", reports: 0, createdAt: "2026-11-11", views: 189 },
];

export const adminReports: AdminReport[] = [
  { id: "RPT-091", target: "Botol PET bersih 8 kg", targetType: "listing", reporter: "Dimas Prakoso", reason: "Informasi menyesatkan", severity: "high", status: "open", createdAt: "2026-11-20" },
  { id: "RPT-090", target: "Kardus bekas ekspedisi 20 kg", targetType: "listing", reporter: "Maya Lestari", reason: "Spam atau duplikat", severity: "medium", status: "open", createdAt: "2026-11-19" },
  { id: "RPT-089", target: "Logam Nusantara", targetType: "user", reporter: "Siti Rahma", reason: "Indikasi penipuan", severity: "high", status: "open", createdAt: "2026-11-18" },
  { id: "RPT-088", target: "Ulasan pada Sisa kain katun", targetType: "review", reporter: "Rina Putri", reason: "Konten tidak pantas", severity: "low", status: "resolved", createdAt: "2026-11-16" },
  { id: "RPT-087", target: "Plat aluminium sisa produksi", targetType: "listing", reporter: "Bagas Pratama", reason: "Material terlarang", severity: "medium", status: "dismissed", createdAt: "2026-11-15" },
];

export const adminUsers: AdminUser[] = [
  { id: "USR-201", name: "Rina Putri", email: "rina@example.com", role: "owner", status: "active", joinedAt: "2024-02-11", listings: 24, verified: true },
  { id: "USR-202", name: "CV Karya Kemas", email: "karya@example.com", role: "owner", status: "active", joinedAt: "2023-08-04", listings: 52, verified: true },
  { id: "USR-203", name: "Dimas Prakoso", email: "dimas@example.com", role: "seeker", status: "active", joinedAt: "2024-07-19", listings: 0, verified: true },
  { id: "USR-204", name: "Logam Nusantara", email: "logam@example.com", role: "owner", status: "suspended", joinedAt: "2025-01-23", listings: 12, verified: false },
  { id: "USR-205", name: "Studio Kulit Bandung", email: "kulit@example.com", role: "owner", status: "pending", joinedAt: "2025-04-02", listings: 12, verified: false },
  { id: "USR-206", name: "Maya Lestari", email: "maya@example.com", role: "seeker", status: "active", joinedAt: "2025-02-14", listings: 0, verified: false },
  { id: "USR-207", name: "Admin SisaHub", email: "admin@sisahub.id", role: "admin", status: "active", joinedAt: "2023-06-01", listings: 0, verified: true },
];

export const adminCategories: AdminCategory[] = [
  { id: "cat-1", label: "Kain", slug: "kain", count: 284, active: true, description: "Kain perca, sisa konveksi, dan tekstil layak pakai." },
  { id: "cat-2", label: "Kertas & kardus", slug: "kertas-kardus", count: 312, active: true, description: "Kardus, kertas kraft, dan kemasan bekas." },
  { id: "cat-3", label: "Kayu", slug: "kayu", count: 196, active: true, description: "Potongan kayu, palet, dan sisa mebel." },
  { id: "cat-4", label: "Plastik", slug: "plastik", count: 241, active: true, description: "Botol PET, pipa PVC, dan plastik kemasan." },
  { id: "cat-5", label: "Logam", slug: "logam", count: 148, active: true, description: "Plat, pipa, dan potongan logam sisa produksi." },
  { id: "cat-6", label: "Bahan kerajinan", slug: "bahan-kerajinan", count: 103, active: true, description: "Kulit sintetis, manik-manik, dan bahan kreatif." },
];
