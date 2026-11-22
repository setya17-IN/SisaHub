import type { ButtonHTMLAttributes } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "lg"; loading?: boolean; };
const variants = { primary: "bg-primary text-white hover:bg-primary-hover", secondary: "border border-border bg-background text-text hover:bg-surface-muted", ghost: "text-text hover:bg-surface-muted", danger: "bg-danger text-white hover:opacity-90" };
const sizes = { sm: "min-h-11 px-3 text-sm", md: "min-h-11 px-4", lg: "min-h-12 px-5 text-base" };
export function Button({ className, variant = "primary", size = "md", loading, disabled, children, ...props }: ButtonProps) { return <button className={cn("inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>{loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}{children}</button>; }
