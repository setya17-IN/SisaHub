import type { ReactNode } from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils/cn";

export function StatCard({
  label,
  value,
  detail,
  icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  detail?: string;
  icon?: ReactNode;
  tone?: "primary" | "accent" | "info" | "success";
}) {
  const tones = {
    primary: "bg-primary-50 text-primary",
    accent: "bg-accent-50 text-accent-700",
    info: "bg-info-soft text-info",
    success: "bg-success-soft text-success",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-text">{value}</p>
          {detail && <p className="mt-1 text-xs text-text-muted">{detail}</p>}
        </div>
        {icon && <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-control", tones[tone])}>{icon}</span>}
      </div>
    </Card>
  );
}
