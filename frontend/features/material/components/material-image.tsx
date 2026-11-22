import { Box, CarFront, Hammer, Layers3, Recycle, Scissors } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { MaterialCategory } from "../types";

const categoryStyles: Record<MaterialCategory, { icon: LucideIcon; className: string }> = {
  kain: { icon: Scissors, className: "bg-rose-50 text-rose-700" },
  "kertas-kardus": { icon: Layers3, className: "bg-accent-50 text-accent-700" },
  kayu: { icon: Hammer, className: "bg-orange-50 text-orange-700" },
  plastik: { icon: Recycle, className: "bg-primary-50 text-primary-700" },
  logam: { icon: CarFront, className: "bg-neutral-100 text-neutral-700" },
  "bahan-kerajinan": { icon: Box, className: "bg-violet-50 text-violet-700" },
};

export function MaterialImage({
  category,
  title,
  imageUrl,
  className,
}: {
  category: MaterialCategory;
  title: string;
  imageUrl?: string | null;
  className?: string;
}) {
  const { icon: Icon, className: tint } = categoryStyles[category];
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden", tint, className)}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <div aria-label={`Ilustrasi kategori ${category}`} className="relative flex size-full items-center justify-center">
          <span className="absolute -right-6 -top-6 size-24 rounded-full bg-white/40" aria-hidden="true" />
          <span className="absolute -bottom-8 -left-6 size-28 rounded-full bg-white/30" aria-hidden="true" />
          <span className="absolute right-8 bottom-6 size-3 rounded-full bg-current opacity-30" aria-hidden="true" />
          <Icon className="relative size-14" strokeWidth={1.4} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
