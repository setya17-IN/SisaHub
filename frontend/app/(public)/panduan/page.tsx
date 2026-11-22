import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Camera, CheckCircle2, Handshake, MessageSquare, PackagePlus, Search, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Panduan" };

const ownerSteps = [
  { icon: Camera, title: "Siapkan foto dan detail", description: "Ambil foto material dengan pencahayaan cukup. Catat jumlah, kondisi, dan lokasi pengambilan." },
  { icon: PackagePlus, title: "Unggah material", description: "Gunakan formulir material baru. AI Scanner dapat membantu mengisi kategori dan kondisi." },
  { icon: MessageSquare, title: "Tanggapi permintaan", description: "Tinjau permintaan masuk, sepakati jumlah dan waktu pengambilan, lalu konfirmasi." },
  { icon: CheckCircle2, title: "Selesaikan transaksi", description: "Setelah material diambil, tandai transaksi selesai agar dampak tercatat." },
];

const seekerSteps = [
  { icon: Search, title: "Cari material", description: "Gunakan filter kategori, lokasi, kondisi, dan harga untuk mempersempit pilihan." },
  { icon: Handshake, title: "Ajukan permintaan", description: "Jelaskan rencana penggunaan dan jumlah yang dibutuhkan. Sertakan preferensi waktu." },
  { icon: MessageSquare, title: "Koordinasi", description: "Diskusikan lokasi dan metode pengambilan melalui fitur pesan atau WhatsApp." },
  { icon: CheckCircle2, title: "Beri ulasan", description: "Ulasan membantu komunitas mengenali pemilik material yang responsif dan terpercaya." },
];

const faqs = [
  { question: "Apakah SisaHub memungut biaya?", answer: "Menggunakan SisaHub gratis. Pemilik material dapat menetapkan harga untuk material tertentu, tetapi tidak ada biaya platform untuk transaksi gratis." },
  { question: "Bagaimana material diverifikasi?", answer: "Tim moderasi memeriksa listing yang dilaporkan. Pemilik dengan identitas terverifikasi mendapat lencana khusus." },
  { question: "Siapa yang mengatur pengiriman?", answer: "Pengambilan atau pengiriman disepakati langsung antara pemilik dan pencari. SisaHub menyediakan panduan keselamatan." },
  { question: "Apa yang harus dilakukan jika terjadi masalah?", answer: "Gunakan tombol laporkan pada listing atau hubungi tim melalui halaman tentang. Sertakan bukti percakapan bila ada." },
];

export default function GuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Pusat panduan"
        title="Panduan menggunakan SisaHub"
        description="Langkah praktis untuk membagikan material, mencari bahan, dan bertransaksi dengan aman."
        actions={
          <Link href="/material/baru">
            <Button>Mulai bagikan material</Button>
          </Link>
        }
      />

      <main className="py-8">
        <Container className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <div className="flex items-center gap-2">
                <Badge tone="primary">Untuk pemilik</Badge>
                <h2 className="text-lg font-bold">Membagikan material</h2>
              </div>
              <ol className="mt-4 space-y-4">
                {ownerSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                      <step.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{index + 1}. {step.title}</p>
                      <p className="mt-0.5 text-sm leading-6 text-text-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card>
              <div className="flex items-center gap-2">
                <Badge tone="info">Untuk pencari</Badge>
                <h2 className="text-lg font-bold">Mencari material</h2>
              </div>
              <ol className="mt-4 space-y-4">
                {seekerSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
                      <step.icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{index + 1}. {step.title}</p>
                      <p className="mt-0.5 text-sm leading-6 text-text-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <Card className="bg-primary-50">
            <h2 className="flex items-center gap-2 text-lg font-bold text-primary-900">
              <ShieldCheck className="size-5" aria-hidden="true" />
              Tips transaksi aman
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Periksa material sebelum dibawa.",
                "Pilih lokasi pengambilan yang ramai.",
                "Jangan mengirim uang muka tanpa kesepakatan.",
                "Konfirmasi status setelah serah-terima.",
              ].map((tip) => (
                <p key={tip} className="flex gap-2 rounded-control bg-background p-3 text-sm leading-6 text-primary-900">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {tip}
                </p>
              ))}
            </div>
          </Card>

          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold">Pertanyaan yang sering diajukan</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {faqs.map((faq) => (
                <Card key={faq.question} className="p-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-muted">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </section>

          <Card className="flex items-start gap-3 border-accent-200 bg-accent-50">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent-700" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-accent-700">Material terlarang</h2>
              <p className="mt-1 text-sm leading-6 text-text-muted">Beberapa material tidak boleh dicantumkan karena alasan keselamatan dan regulasi. Periksa daftarnya sebelum mengunggah.</p>
              <Link href="/material-terlarang" className="mt-2 inline-flex min-h-9 items-center text-sm font-medium text-accent-700 hover:underline">
                Lihat daftar material terlarang
              </Link>
            </div>
          </Card>
        </Container>
      </main>
    </>
  );
}
