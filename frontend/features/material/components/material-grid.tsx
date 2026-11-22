import type { ReactNode } from "react";
import type { MaterialCardItem } from "../types";
import { MaterialCard } from "./material-card";
import { EmptyState } from "@/components/ui/empty-state";

export function MaterialGrid({
  materials,
  emptyTitle = "Material belum ditemukan",
  emptyDescription = "Coba ubah kata kunci atau filter lokasi untuk melihat material lain.",
  emptyAction,
  columns = 3,
  onFavorite,
}: {
  materials: MaterialCardItem[];
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  columns?: 2 | 3 | 4;
  onFavorite?: (id: string, favorite: boolean) => void;
}) {
  if (materials.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }

  const columnClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid grid-cols-1 gap-4 ${columnClass}`}>
      {materials.map((material) => (
        <MaterialCard key={material.id} material={material} onFavorite={onFavorite} />
      ))}
    </div>
  );
}
