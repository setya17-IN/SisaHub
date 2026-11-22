import type { AppNotification } from "./types";

export const notifications: AppNotification[] = [
  {
    id: "notif-1",
    type: "request",
    title: "Permintaan baru untuk kain katun",
    description: "Siti Rahma dari Komunitas Karya Baru mengajukan 8 meter kain untuk pelatihan menjahit.",
    createdAt: "2026-11-20T08:15:00",
    read: false,
    href: "/permintaan/REQ-2026-1042",
  },
  {
    id: "notif-2",
    type: "message",
    title: "Pesan dari Dimas Prakoso",
    description: "Halo, apakah botol PET masih tersedia untuk diambil akhir pekan ini?",
    createdAt: "2026-11-19T16:40:00",
    read: false,
    href: "/permintaan/REQ-2026-1039",
  },
  {
    id: "notif-3",
    type: "match",
    title: "Smart Match menemukan 3 material",
    description: "Ada material baru di sekitar Bandung yang cocok dengan kebutuhan kain perca Anda.",
    createdAt: "2026-11-19T10:05:00",
    read: false,
    href: "/jelajahi",
  },
  {
    id: "notif-4",
    type: "review",
    title: "Ulasan baru dari Bank Sampah Melati",
    description: "Mereka memberi rating 5 untuk transaksi botol PET bersih.",
    createdAt: "2026-11-18T14:22:00",
    read: true,
    href: "/profil/hijau",
  },
  {
    id: "notif-5",
    type: "system",
    title: "Verifikasi akun berhasil",
    description: "Akun Anda sudah terverifikasi. Material Anda akan tampil dengan label terverifikasi.",
    createdAt: "2026-11-15T09:00:00",
    read: true,
    href: "/pengaturan",
  },
  {
    id: "notif-6",
    type: "request",
    title: "Permintaan selesai",
    description: "Transaksi kardus bekas ekspedisi dengan Dapur Rumah Kue telah selesai.",
    createdAt: "2026-11-10T17:30:00",
    read: true,
    href: "/permintaan/REQ-2026-1031",
  },
];

export const unreadNotificationCount = notifications.filter((notification) => !notification.read).length;
