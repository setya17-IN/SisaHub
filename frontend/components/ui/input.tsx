import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn("min-h-11 w-full rounded-control border border-border bg-background px-3 text-text placeholder:text-neutral-500 focus:border-focus-ring focus:outline-none", className)} {...props} />; }
