import Link from "next/link";
import { CheckCircle2, Recycle, ShieldCheck, Sparkles } from "lucide-react";

const benefits = [
  "Temukan material sisa yang layak pakai di sekitar Anda.",
  "Smart Matching membantu mencocokkan kebutuhan dan material.",
  "AI Material Scanner mempercepat proses unggah material.",
  "Bangun jejak dampak lingkungan dari setiap transaksi.",
];

export function AuthAside() {
  return (
    <aside className="hidden min-h-screen flex-col justify-between bg-primary-900 p-10 text-white lg:flex">
      <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
        <span className="inline-flex size-9 items-center justify-center rounded-control bg-white/15">
          <Recycle className="size-5" aria-hidden="true" />
        </span>
        SisaHub
      </Link>

      <div className="max-w-md">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-primary-100">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Waste to worth
        </p>
        <h2 className="mt-4 text-3xl font-bold leading-tight">Sisa material hari ini, peluang baru besok.</h2>
        <p className="mt-3 text-sm leading-6 text-primary-100">
          Bergabung dengan ribuan pemilik material, pengrajin, dan komunitas yang mengubah sisa bahan menjadi produk bernilai.
        </p>
        <ul className="mt-6 space-y-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-sm leading-6 text-primary-50">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-200" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3 rounded-card bg-white/10 p-4">
        <ShieldCheck className="size-8 shrink-0 text-primary-200" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold">Aman dan terverifikasi</p>
          <p className="text-xs leading-5 text-primary-100">Setiap transaksi dilengkapi panduan keselamatan dan moderasi komunitas.</p>
        </div>
      </div>
    </aside>
  );
}
