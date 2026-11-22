"use client";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import type { MaterialCategory } from "./material-image";
import { MaterialImage } from "./material-image";
import { CategoryChip, ConditionBadge, PriceBadge } from "./material-badges";

export type MaterialCardItem = { id: string; title: string; category: MaterialCategory; quantityLabel: string; conditionLabel: string; conditionTone?: "primary" | "info" | "accent"; free: boolean; priceAmount?: number | null; city: string; distance?: string | null; ownerName: string; ownerAvatar?: string | null; imageUrl?: string | null; href?: string };
export function MaterialCard({ material, onFavorite, className }: { material: MaterialCardItem; onFavorite?: (id: string, favorite: boolean) => void; className?: string }) {
  const [favorite, setFavorite] = useState(false);
  const href = material.href ?? `/material/${material.id}`;
  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); event.stopPropagation(); setFavorite((current) => { onFavorite?.(material.id, !current); return !current; }); };
  return <Card className={cn("group relative overflow-hidden p-0 transition-colors hover:border-primary-300", className)}><Link href={href} aria-label={`Lihat ${material.title}`} className="absolute inset-0 z-10 rounded-card focus-visible:outline-2 focus-visible:outline-focus-ring" /><div className="relative"><MaterialImage category={material.category} title={material.title} imageUrl={material.imageUrl} /><div className="pointer-events-none absolute left-3 top-3"><CategoryChip category={material.category} /></div><IconButton label={favorite ? "Hapus dari favorit" : "Simpan ke favorit"} aria-pressed={favorite} className="absolute right-3 top-3 z-20 bg-background shadow-card hover:text-danger" onClick={toggleFavorite}><Heart className={cn("size-5", favorite && "fill-danger text-danger")} aria-hidden="true" /></IconButton></div><div className="relative z-20 space-y-3 p-4"><h3 className="line-clamp-2 min-h-12 font-semibold leading-6 text-text">{material.title}</h3><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-medium text-text">{material.quantityLabel}</span><ConditionBadge label={material.conditionLabel} tone={material.conditionTone} /></div><PriceBadge free={material.free} amount={material.priceAmount} /><div className="flex items-center gap-2 border-t border-border pt-3"><Avatar name={material.ownerName} src={material.ownerAvatar} size="sm" /><span className="min-w-0 flex-1 truncate text-sm text-text-muted">{material.ownerName}</span><span className="inline-flex shrink-0 items-center gap-1 text-xs text-text-muted"><MapPin className="size-3.5" aria-hidden="true" />{material.city}{material.distance ? ` · ${material.distance}` : ""}</span></div></div></Card>;
}
