import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/utils/format";
import {
  MATERIAL_CATEGORY_LABELS,
  MATERIAL_CATEGORY_TONES,
  MATERIAL_CONDITION_LABELS,
  MATERIAL_CONDITION_TONES,
  MATERIAL_STATUS_LABELS,
  MATERIAL_STATUS_TONES,
  PRICE_TYPE_LABELS,
} from "../constants";
import type { MaterialCategory, MaterialCondition, MaterialStatus } from "../types";

export function CategoryChip({ category }: { category: MaterialCategory }) {
  return <Badge tone={MATERIAL_CATEGORY_TONES[category]}>{MATERIAL_CATEGORY_LABELS[category]}</Badge>;
}

export function ConditionBadge({
  condition,
  label,
  tone = "neutral",
}: {
  condition?: MaterialCondition;
  label?: string;
  tone?: "primary" | "info" | "accent" | "neutral";
}) {
  if (condition) {
    return <Badge tone={MATERIAL_CONDITION_TONES[condition]}>Kondisi: {MATERIAL_CONDITION_LABELS[condition]}</Badge>;
  }
  return <Badge tone={tone}>{label ?? "Kondisi"}</Badge>;
}

export function PriceBadge({ amount, free }: { amount?: number | null; free: boolean }) {
  return (
    <Badge tone={free ? "primary" : "accent"}>
      {free ? PRICE_TYPE_LABELS.free : amount == null ? PRICE_TYPE_LABELS.paid : formatRupiah(amount)}
    </Badge>
  );
}

export function MaterialStatusBadge({ status }: { status: MaterialStatus }) {
  return <Badge tone={MATERIAL_STATUS_TONES[status]}>{MATERIAL_STATUS_LABELS[status]}</Badge>;
}
