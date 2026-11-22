"use client";
import { useEffect, useId } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils/cn";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn("max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-card bg-background p-6 shadow-card", className)}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold text-text">
            {title}
          </h2>
          <IconButton label="Tutup dialog" onClick={onClose}>
            <X className="size-5" />
          </IconButton>
        </div>
        {children}
      </section>
    </div>
  );
}
