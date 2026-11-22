import type { ImpactSummary } from "./types";

export const impactSummary: ImpactSummary = {
  materialsSaved: 8420,
  weightSavedKg: 12480,
  co2AvoidedKg: 18640,
  communityMembers: 2140,
  activeCities: 18,
  completedRequests: 1268,
  monthly: [
    { month: "Jun", materials: 540, weightKg: 780, co2Kg: 1120 },
    { month: "Jul", materials: 620, weightKg: 910, co2Kg: 1310 },
    { month: "Agu", materials: 710, weightKg: 1040, co2Kg: 1490 },
    { month: "Sep", materials: 680, weightKg: 990, co2Kg: 1420 },
    { month: "Okt", materials: 820, weightKg: 1180, co2Kg: 1710 },
    { month: "Nov", materials: 940, weightKg: 1360, co2Kg: 1960 },
  ],
};

export const impactAssumptions = [
  "Berat material dihitung dari jumlah yang dicantumkan pemilik saat transaksi selesai.",
  "Faktor emisi CO2e mengacu pada rata-rata faktor konversi limbah campuran domestik.",
  "Data dampak diperbarui setiap bulan dan tidak menghitung material yang gagal diserahterimakan.",
  "Angka komunitas mencakup pengguna aktif yang menyelesaikan minimal satu transaksi.",
];

export const impactHighlights = [
  { label: "Material terselamatkan", value: "8.420", unit: "listing", description: "Material yang kembali digunakan, bukan dibuang." },
  { label: "Berat material", value: "12.480", unit: "kg", description: "Total berat material yang berpindah tangan." },
  { label: "Emisi dihindari", value: "18.640", unit: "kg CO2e", description: "Estimasi emisi yang tidak dihasilkan." },
  { label: "Anggota komunitas", value: "2.140", unit: "orang", description: "Pemilik, pencari, dan pengrajin aktif." },
];
