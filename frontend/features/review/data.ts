import type { Review, ReviewSummaryData } from "./types";

export const reviews: Review[] = [
  {
    id: "review-1",
    materialId: "sisa-kain-katun-50-meter",
    profileId: "rina",
    authorName: "Dimas Prakoso",
    authorRole: "Pengrajin tas",
    rating: 5,
    comment:
      "Kainnya bersih dan sudah disortir. Komunikasi cepat, proses serah-terima juga mudah. Sudah dipakai untuk 20 pouch pesanan.",
    createdAt: "2026-10-22",
    helpful: 14,
  },
  {
    id: "review-2",
    materialId: "sisa-kain-katun-50-meter",
    profileId: "rina",
    authorName: "Komunitas Karya Baru",
    authorRole: "Komunitas",
    rating: 5,
    comment: "Jumlah sesuai deskripsi. Pemilik ramah dan mau membantu mengangkat barang saat pengambilan.",
    createdAt: "2026-09-30",
    helpful: 9,
  },
  {
    id: "review-3",
    materialId: "kardus-bekas-ekspedisi-20-kg",
    profileId: "karya",
    authorName: "Toko Rumah Kecil",
    authorRole: "UMKM",
    rating: 4,
    comment: "Kardus kokoh dan kering. Beberapa lembar ada lipatan dalam, tapi masih sangat layak pakai.",
    createdAt: "2026-10-12",
    helpful: 6,
  },
  {
    id: "review-4",
    materialId: "botol-pet-bersih-8-kg",
    profileId: "hijau",
    authorName: "Bank Sampah Melati",
    authorRole: "Bank sampah",
    rating: 5,
    comment: "Sudah dipisahkan dari label dan tutup. Sangat membantu program daur ulang kami.",
    createdAt: "2026-10-05",
    helpful: 21,
  },
  {
    id: "review-5",
    materialId: "potongan-kayu-jati-15-batang",
    profileId: "jati",
    authorName: "Rani Interior",
    authorRole: "Studio interior",
    rating: 4,
    comment: "Kayu jati kering dan motifnya bagus. Pengiriman perlu diatur sendiri, tapi sepadan.",
    createdAt: "2026-09-18",
    helpful: 4,
  },
];

export function getReviewsForMaterial(materialId: string) {
  return reviews.filter((review) => review.materialId === materialId);
}

export function getReviewsForProfile(profileId: string) {
  return reviews.filter((review) => review.profileId === profileId);
}

export function summarizeReviews(items: Review[]): ReviewSummaryData {
  const total = items.length;
  const average = total === 0 ? 0 : items.reduce((sum, review) => sum + review.rating, 0) / total;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: items.filter((review) => review.rating === stars).length,
  }));
  return { average, total, distribution };
}
