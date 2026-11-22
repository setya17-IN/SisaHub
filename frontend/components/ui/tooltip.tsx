import { useId } from "react";
import type { ReactNode } from "react";
export function Tooltip({ content, children }: { content: string; children: ReactNode }) { const id = useId(); return <span className="group relative inline-flex"><span tabIndex={0} aria-describedby={id}>{children}</span><span id={id} role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-control bg-neutral-900 px-2 py-1 text-xs text-white group-hover:block group-focus-within:block">{content}</span></span>; }
