"use client";
import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils/cn";

type SelectedFile = { file: File; preview: string };

export function FileUploader({
  value,
  onChange,
  maxFiles = 5,
  maxSizeMb = 5,
  error,
}: {
  value?: File[];
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMb?: number;
  error?: string;
}) {
  const id = useId();
  const [files, setFiles] = useState<SelectedFile[]>(() =>
    (value ?? []).map((file) => ({ file, preview: URL.createObjectURL(file) })),
  );
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const filesRef = useRef(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    return () => {
      filesRef.current.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, []);

  const update = (next: SelectedFile[]) => {
    setFiles(next);
    onChange?.(next.map((item) => item.file));
  };

  const add = (incoming: FileList | null) => {
    if (!incoming) return;
    const slots = Math.max(0, maxFiles - files.length);
    const candidates = Array.from(incoming);
    const valid = candidates.filter(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
        file.size <= maxSizeMb * 1024 * 1024,
    );
    const allowed = valid.slice(0, slots).map((file) => ({ file, preview: URL.createObjectURL(file) }));
    const rejected = candidates.length - allowed.length;
    setLocalError(
      rejected > 0
        ? `${rejected} berkas dilewati. Gunakan JPG, PNG, atau WebP maksimal ${maxSizeMb} MB dan maksimal ${maxFiles} foto.`
        : null,
    );
    update([...files, ...allowed]);
  };

  const remove = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    setLocalError(null);
    update(files.filter((_, current) => current !== index));
  };

  const message = error ?? localError;

  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          add(event.dataTransfer.files);
        }}
        className={cn(
          "flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-card border border-dashed px-4 py-6 text-center",
          message
            ? "border-danger"
            : dragging
              ? "border-primary-500 bg-primary-50"
              : "border-neutral-300 bg-surface hover:border-primary-300",
        )}
      >
        <ImagePlus className="mb-2 size-7 text-primary" aria-hidden="true" />
        <span className="font-medium text-text">Pilih atau seret foto ke sini</span>
        <span className="mt-1 text-sm text-text-muted">
          JPG, PNG, atau WebP - maks. {maxFiles} foto, {maxSizeMb} MB per foto
        </span>
      </label>
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="sr-only"
        onChange={(event) => {
          add(event.currentTarget.files);
          event.currentTarget.value = "";
        }}
        aria-describedby={message ? `${id}-error` : undefined}
      />
      {message && (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {message}
        </p>
      )}
      {files.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {files.map((item, index) => (
            <li key={`${item.file.name}-${index}`} className="relative aspect-square overflow-hidden rounded-control bg-surface">
              <Image
                src={item.preview}
                alt={`Pratinjau ${item.file.name}`}
                fill
                unoptimized
                sizes="150px"
                className="object-cover"
              />
              <IconButton
                label={`Hapus ${item.file.name}`}
                className="absolute right-1 top-1 z-10 bg-background"
                onClick={() => remove(index)}
              >
                <X className="size-4" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
