import type { ReactNode } from "react";
import { CircleDashed } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-card border border-dashed border-neutral-300 bg-surface px-6 py-10 text-center">
      <span className="mb-3 inline-flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary">
        <CircleDashed className="size-6" aria-hidden="true" />
      </span>
      <h2 className="font-semibold text-text">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-text-muted">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
