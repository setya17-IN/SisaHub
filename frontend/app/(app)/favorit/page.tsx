import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { FavoriteList, favorites } from "@/features/favorite";
import { materials, toMaterialCardItem } from "@/features/material";

export const metadata: Metadata = { title: "Favorit" };

export default function FavoritesPage() {
  const saved = favorites
    .map((favorite) => materials.find((material) => material.id === favorite.materialId))
    .filter((material): material is (typeof materials)[number] => Boolean(material))
    .map((material) => ({ ...toMaterialCardItem(material), isFavorite: true }));

  return (
    <>
      <PageHeader
        eyebrow="Koleksi pribadi"
        title="Favorit"
        description="Material yang Anda simpan untuk dipertimbangkan kembali."
        actions={
          <Link href="/jelajahi">
            <Button variant="secondary">Cari material lain</Button>
          </Link>
        }
      />
      <main className="py-8">
        <Container>
          <FavoriteList materials={saved} />
        </Container>
      </main>
    </>
  );
}
