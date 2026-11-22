import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
export type BadgeTone = "primary" | "accent" | "info" | "danger" | "neutral" | "rose" | "orange" | "sky" | "slate" | "violet";
const tones: Record<BadgeTone, string> = { primary: "bg-primary-100 text-primary-700", accent: "bg-accent-100 text-accent-700", info: "bg-info-soft text-info", danger: "bg-danger-soft text-danger", neutral: "bg-neutral-100 text-neutral-700", rose: "bg-rose-50 text-rose-700", orange: "bg-orange-50 text-orange-700", sky: "bg-sky-50 text-sky-700", slate: "bg-neutral-100 text-neutral-700", violet: "bg-violet-50 text-violet-700" };
export function Badge({ tone = "neutral", className, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) { return <span className={cn("inline-flex min-h-6 items-center rounded-full px-2 py-0.5 text-xs font-semibold", tones[tone], className)} {...props} />; }
