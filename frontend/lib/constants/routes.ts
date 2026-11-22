export const ROUTES = {
  home: "/", explore: "/jelajahi", wanted: "/dicari", impact: "/dampak", impactMethodology: "/dampak/metodologi", about: "/tentang", guide: "/panduan", privacy: "/privasi", terms: "/syarat", prohibitedMaterials: "/material-terlarang",
  login: "/masuk", register: "/daftar", forgotPassword: "/lupa-password", resetPassword: "/reset-password",
  dashboard: "/dashboard", newMaterial: "/material/baru", requests: "/permintaan", favorites: "/favorit", notifications: "/notifikasi", settings: "/pengaturan",
  admin: "/admin", adminReports: "/admin/laporan", adminListings: "/admin/listing", adminCategories: "/admin/kategori", adminUsers: "/admin/pengguna",
  material: (id: string) => `/material/${id}`, profile: (id: string) => `/profil/${id}`, editMaterial: (id: string) => `/material/${id}/edit`, request: (id: string) => `/permintaan/${id}`,
} as const;
