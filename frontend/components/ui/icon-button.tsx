import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
export function IconButton({ label, children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) { return <button type="button" aria-label={label} title={label} className={cn("inline-flex size-11 items-center justify-center rounded-control text-text-muted hover:bg-surface-muted hover:text-text disabled:opacity-50", className)} {...props}>{children}</button>; }
