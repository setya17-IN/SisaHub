import type { ReactNode } from "react";
import { Container } from "./container";

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  breadcrumb,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <header className="border-b border-border bg-surface py-8 sm:py-10">
      <Container>
        {breadcrumb && <div className="mb-3">{breadcrumb}</div>}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>}
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{title}</h1>
            {description && <p className="mt-2 max-w-2xl text-text-muted">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
      </Container>
    </header>
  );
}
