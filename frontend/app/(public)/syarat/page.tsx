import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Syarat dan ketentuan" };

const sections = [
  {
    title: "1. Penerimaan ketentuan",
    body: "Dengan membuat akun atau menggunakan SisaHub, Anda menyetujui syarat dan ketentuan ini. Jika tidak setuju, mohon tidak menggunakan layanan.",
  },
  {
    title: "2. Akun pengguna",
    body: "Anda bertanggung jawab menjaga kerahasiaan kata sandi dan seluruh aktivitas pada akun. Gunakan data yang benar dan perbarui bila berubah. Akun tidak boleh dipindahtangankan tanpa persetujuan SisaHub.",
  },
  {
    title: "3. Peran platform",
    body: "SisaHub mempertemukan pemilik dan pencari material. Kami tidak menjadi pihak dalam transaksi, tidak menjamin kualitas material, dan tidak bertanggung jawab atas kerugian yang timbul dari kesepakatan antarpengguna. Pengguna wajib memeriksa material sebelum serah-terima.",
  },
  {
    title: "4. Konten dan listing",
    body: "Anda menjamin memiliki hak untuk membagikan material yang diunggah. Listing harus akurat, tidak menyesatkan, dan tidak melanggar daftar material terlarang. SisaHub dapat menurunkan atau menghapus listing yang melanggar.",
  },
  {
    title: "5. Perilaku terlarang",
    body: "Dilarang menggunakan SisaHub untuk penipuan, spam, pelecehan, penyebaran konten ilegal, atau transaksi material berbahaya. Pelanggaran dapat menyebabkan penangguhan akun tanpa pemberitahuan sebelumnya.",
  },
  {
    title: "6. Pembayaran dan biaya",
    body: "Layanan dasar SisaHub gratis. Pemilik material dapat menetapkan harga untuk material tertentu. Pembayaran dan pengiriman disepakati langsung antarpengguna. SisaHub tidak memproses pembayaran pada versi ini.",
  },
  {
    title: "7. Batasan tanggung jawab",
    body: "Layanan disediakan apa adanya. Sejauh diizinkan hukum, SisaHub tidak bertanggung jawab atas kerugian tidak langsung, kehilangan data, atau kerusakan yang timbul dari penggunaan layanan.",
  },
  {
    title: "8. Perubahan ketentuan",
    body: "Kami dapat memperbarui ketentuan ini. Perubahan material akan diberitahukan melalui email atau notifikasi platform. Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujui versi terbaru.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Syarat dan ketentuan"
        description="Terakhir diperbarui 1 November 2026. Ketentuan ini mengatur penggunaan platform SisaHub."
      />

      <main className="py-8">
        <Container className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-4">
            {sections.map((section) => (
              <Card key={section.title} className="p-6">
                <h2 className="text-lg font-bold">{section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-text-muted">{section.body}</p>
              </Card>
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card>
              <h2 className="flex items-center gap-2 font-bold">
                <FileText className="size-5 text-primary" aria-hidden="true" />
                Dokumen terkait
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link className="inline-flex min-h-9 items-center text-primary hover:underline" href="/privasi">Kebijakan privasi</Link></li>
                <li><Link className="inline-flex min-h-9 items-center text-primary hover:underline" href="/material-terlarang">Material terlarang</Link></li>
                <li><Link className="inline-flex min-h-9 items-center text-primary hover:underline" href="/panduan">Panduan penggunaan</Link></li>
              </ul>
            </Card>
            <Card className="border-accent-200 bg-accent-50">
              <p className="flex items-center gap-2 text-sm font-semibold text-accent-700">
                <AlertTriangle className="size-4" aria-hidden="true" />
                Perhatikan
              </p>
              <p className="mt-1 text-xs leading-5 text-text-muted">Transaksi dilakukan langsung antarpengguna. Selalu ikuti panduan keselamatan dan periksa material sebelum dibawa.</p>
            </Card>
          </aside>
        </Container>
      </main>
    </>
  );
}
