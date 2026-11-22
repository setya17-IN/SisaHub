import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, Mail, ShieldCheck, UserCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Kebijakan privasi" };

const sections = [
  {
    title: "1. Data yang kami kumpulkan",
    body: [
      "Data akun seperti nama, email, nomor telepon, dan kata sandi yang disimpan dalam bentuk terenkripsi.",
      "Data profil seperti kota, jenis akun, deskripsi organisasi, dan foto profil yang Anda unggah.",
      "Data aktivitas seperti listing, permintaan, pesan, ulasan, dan riwayat transaksi.",
      "Data teknis seperti alamat IP, jenis perangkat, dan halaman yang diakses untuk menjaga keamanan layanan.",
    ],
  },
  {
    title: "2. Cara kami menggunakan data",
    body: [
      "Menjalankan layanan, termasuk menampilkan listing dan menghubungkan pemilik dengan pencari material.",
      "Meningkatkan relevansi Smart Matching dan kualitas rekomendasi material.",
      "Mencegah penipuan, spam, dan penyalahgunaan platform.",
      "Mengirim notifikasi terkait akun dan transaksi. Anda dapat mengatur preferensi di halaman pengaturan.",
    ],
  },
  {
    title: "3. Pembagian data",
    body: [
      "Informasi listing dan profil publik dapat dilihat oleh pengguna lain sesuai pengaturan privasi Anda.",
      "Lokasi detail dan kontak pribadi hanya dibagikan setelah kedua pihak menyetujui permintaan.",
      "Kami tidak menjual data pribadi kepada pihak ketiga.",
      "Data dapat diungkapkan kepada otoritas jika diwajibkan oleh hukum yang berlaku.",
    ],
  },
  {
    title: "4. Penyimpanan dan keamanan",
    body: [
      "Data disimpan selama akun aktif atau selama diperlukan untuk memenuhi kewajiban hukum.",
      "Kami menggunakan enkripsi, kontrol akses, dan pemantauan untuk melindungi data.",
      "Tidak ada sistem yang sepenuhnya bebas risiko. Laporkan insiden keamanan melalui halaman kontak.",
    ],
  },
  {
    title: "5. Hak Anda",
    body: [
      "Mengakses, memperbarui, atau menghapus data profil melalui halaman pengaturan.",
      "Meminta salinan data atau penjelasan tentang pemrosesan data.",
      "Menarik persetujuan untuk komunikasi pemasaran kapan saja.",
      "Mengajukan keberatan atas pemrosesan tertentu dengan menghubungi tim privasi.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Kebijakan privasi"
        description="Terakhir diperbarui 1 November 2026. Kami menjelaskan data apa yang dikumpulkan dan bagaimana data tersebut digunakan."
      />

      <main className="py-8">
        <Container className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-4">
            {sections.map((section) => (
              <Card key={section.title} className="p-6">
                <h2 className="text-lg font-bold">{section.title}</h2>
                <ul className="mt-3 space-y-2">
                  {section.body.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-text-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card>
              <h2 className="flex items-center gap-2 font-bold">
                <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                Ringkasan singkat
              </h2>
              <ul className="mt-3 space-y-3 text-sm text-text-muted">
                <li className="flex gap-2"><UserCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />Anda mengontrol data profil yang tampil.</li>
                <li className="flex gap-2"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />Kontak detail dibagikan setelah permintaan disetujui.</li>
                <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />Hubungi privasi@sisahub.id untuk pertanyaan.</li>
              </ul>
            </Card>
            <Card className="bg-primary-50">
              <p className="text-sm font-semibold text-primary-900">Butuh bantuan?</p>
              <p className="mt-1 text-xs leading-5 text-primary-800">Tim kami dapat membantu pertanyaan tentang data dan privasi.</p>
              <Link href="/tentang" className="mt-3 block">
                <Button variant="secondary" className="w-full">Hubungi kami</Button>
              </Link>
            </Card>
          </aside>
        </Container>
      </main>
    </>
  );
}
