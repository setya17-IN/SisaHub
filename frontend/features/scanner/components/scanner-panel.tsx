"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, LoaderCircle, ScanLine, Sparkles, Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils/cn";
import type { ScannerResult } from "../types";

const demoResult: ScannerResult = {
  category: "kain",
  categoryLabel: "Kain",
  condition: "good",
  conditionLabel: "Baik",
  confidence: 0.94,
  suggestedTitle: "Sisa kain katun perca",
  suggestedTags: ["katun", "perca", "kerajinan"],
  note: "Tidak terdeteksi jamur atau noda berat. Sortir ulang bagian yang berbulu.",
};

export function ScannerPanel({ onResult }: { onResult?: (result: ScannerResult) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ScannerResult | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== "scanning") return;
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer);
          setPhase("done");
          setResult(demoResult);
          onResult?.(demoResult);
          return 100;
        }
        return current + 10;
      });
    }, 140);
    return () => window.clearInterval(timer);
  }, [phase, onResult]);

  const selectFile = (file: File | undefined) => {
    if (!file) return;
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = URL.createObjectURL(file);
    previewRef.current = url;
    setPreview(url);
    setResult(null);
    setProgress(0);
    setPhase("scanning");
  };

  const reset = () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null;
    setPreview(null);
    setResult(null);
    setProgress(0);
    setPhase("idle");
  };

  return (
    <div className="overflow-hidden rounded-card border border-border bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-primary-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-8 items-center justify-center rounded-control bg-primary text-white">
            <ScanLine className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-primary-900">AI Material Scanner</p>
            <p className="text-xs text-primary-800">Deteksi kategori dan kondisi dari foto.</p>
          </div>
        </div>
        <Badge tone="primary">Beta</Badge>
      </div>

      <div className="p-4">
        {phase === "idle" && (
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-control border border-dashed border-primary-300 bg-primary-50/50 px-4 text-center hover:bg-primary-50">
            <Camera className="mb-2 size-8 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-text">Unggah foto material</span>
            <span className="mt-1 text-xs text-text-muted">JPG, PNG, atau WebP - maks. 5 MB</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => {
                selectFile(event.currentTarget.files?.[0]);
                event.currentTarget.value = "";
              }}
            />
          </label>
        )}

        {phase !== "idle" && preview && (
          <div className="space-y-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-control bg-surface">
              <Image src={preview} alt="Foto material yang dipindai" fill unoptimized sizes="480px" className="object-cover" />
              <IconButton label="Hapus foto" className="absolute right-2 top-2 bg-background" onClick={reset}>
                <X className="size-4" />
              </IconButton>
              {phase === "scanning" && (
                <div className="absolute inset-x-0 top-0 h-0.5 animate-pulse bg-primary" aria-hidden="true" />
              )}
            </div>

            {phase === "scanning" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
                    Menganalisis tekstur dan warna...
                  </span>
                  <span className="tabular-nums">{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div className={cn("h-full rounded-full bg-primary transition-all duration-150")} style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {phase === "done" && result && (
              <div className="space-y-3 rounded-control border border-primary-200 bg-primary-50 p-3">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-primary-900">
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  Material dikenali
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="primary">{result.categoryLabel}</Badge>
                  <Badge tone="info">Kondisi {result.conditionLabel}</Badge>
                  <Badge tone="neutral">Keyakinan {Math.round(result.confidence * 100)}%</Badge>
                </div>
                <div className="text-sm">
                  <p className="text-xs text-text-muted">Judul yang disarankan</p>
                  <p className="font-medium text-text">{result.suggestedTitle}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.suggestedTags.map((tag) => (
                    <span key={tag} className="rounded-full bg-background px-2 py-0.5 text-xs text-text-muted">#{tag}</span>
                  ))}
                </div>
                <p className="text-xs leading-5 text-text-muted">{result.note}</p>
                <Button type="button" variant="secondary" size="sm" className="w-full" onClick={reset}>
                  <Upload className="size-4" aria-hidden="true" />
                  Pindai foto lain
                </Button>
              </div>
            )}
          </div>
        )}

        <p className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Hasil scanner membantu mengisi formulir, tetap periksa sebelum publikasi.
        </p>
      </div>
    </div>
  );
}
