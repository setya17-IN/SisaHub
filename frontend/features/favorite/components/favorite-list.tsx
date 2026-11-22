"use client";
import { useState } from "react";
import Link from "next/link";
import { HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { MaterialCard, type MaterialCardItem } from "@/features/material";
import { EmptyState } from "@/components/ui/empty-state";

export function FavoriteList({ materials }: { materials: MaterialCardItem[] }) {
  const { toast } = useToast();
  const [items, setItems] = useState(materials);

  const remove = (id: string, favorite: boolean) => {
    if (favorite) return;
    setItems((current) => current.filter((item) => item.id !== id));
    toast({ title: "Dihapus dari favorit", description: "Material tidak lagi tersimpan di daftar Anda.", tone: "info" });
  };

  if (items.length === 0) {
    return (
      <EmptyState
        title="Belum ada material favorit"
        description="Simpan material yang menarik agar mudah ditemukan kembali."
        action={
          <Link href="/jelajahi">
            <Button>Jelajahi material</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <p className="flex items-center gap-2 text-sm text-text-muted">
        <HeartOff className="size-4 text-primary" aria-hidden="true" />
        {items.length} material tersimpan. Klik ikon hati untuk menghapus.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((material) => (
          <MaterialCard key={material.id} material={{ ...material, isFavorite: true }} onFavorite={remove} />
        ))}
      </div>
    </div>
  );
}
