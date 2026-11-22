import { Badge } from "@/components/ui/badge";
import type { MaterialCategory } from "./material-image";
const categoryMeta: Record<MaterialCategory, { label: string; tone: "rose" | "accent" | "orange" | "sky" | "slate" | "violet" }> = { kain: { label: "Kain", tone: "rose" }, "kertas-kardus": { label: "Kertas & kardus", tone: "accent" }, kayu: { label: "Kayu", tone: "orange" }, plastik: { label: "Plastik", tone: "sky" }, logam: { label: "Logam", tone: "slate" }, "bahan-kerajinan": { label: "Bahan kerajinan", tone: "violet" } };
export function CategoryChip({ category }: { category: MaterialCategory }) { const item = categoryMeta[category]; return <Badge tone={item.tone}>{item.label}</Badge>; }
export function ConditionBadge({ label, tone = "neutral" }: { label: string; tone?: "primary" | "info" | "accent" | "neutral" }) { return <Badge tone={tone}>{label}</Badge>; }
export function PriceBadge({ amount, free }: { amount?: number | null; free: boolean }) { return <Badge tone={free ? "primary" : "accent"}>{free ? "Gratis" : amount == null ? "Berbayar" : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount)}</Badge>; }
export function MaterialStatusBadge({ label, tone = "neutral" }: { label: string; tone?: "primary" | "accent" | "danger" | "neutral" | "info" }) { return <Badge tone={tone}>{label}</Badge>; }
