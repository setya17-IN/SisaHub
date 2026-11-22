import { Box, CarFront, Hammer, Layers3, Recycle, Scissors } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type MaterialCategory = "kain" | "kertas-kardus" | "kayu" | "plastik" | "logam" | "bahan-kerajinan";
const categoryStyles: Record<MaterialCategory, { icon: LucideIcon; className: string }> = {
  kain: { icon: Scissors, className: "bg-rose-50 text-rose-700" },
  "kertas-kardus": { icon: Layers3, className: "bg-accent-50 text-accent-700" },
  kayu: { icon: Hammer, className: "bg-orange-50 text-orange-700" },
  plastik: { icon: Recycle, className: "bg-sky-50 text-sky-700" },
  logam: { icon: CarFront, className: "bg-neutral-100 text-neutral-700" },
  "bahan-kerajinan": { icon: Box, className: "bg-violet-50 text-violet-700" },
};
export function MaterialImage({ category, title, imageUrl, className }: { category: MaterialCategory; title: string; imageUrl?: string | null; className?: string }) {
  const { icon: Icon, className: tint } = categoryStyles[category];
  return <div className={cn("relative aspect-[4/3] overflow-hidden", tint, className)}>{imageUrl ? <Image src={imageUrl} alt={title} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /> : <div aria-label={`Ilustrasi kategori ${category}`} className="flex size-full items-center justify-center"><Icon className="size-12" strokeWidth={1.5} aria-hidden="true" /></div>}</div>;
}
