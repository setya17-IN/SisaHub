import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaterialDetail, getMaterialById, materials, toMaterialCardItem } from "@/features/material";
import { getReviewsForMaterial } from "@/features/review";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const material = getMaterialById(id);
  if (!material) return { title: "Material tidak ditemukan" };
  return {
    title: material.title,
    description: material.description.slice(0, 155),
  };
}

export default async function MaterialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const material = getMaterialById(id);
  if (!material) notFound();

  const related = materials
    .filter((item) => item.id !== material.id && (item.category === material.category || item.city === material.city))
    .slice(0, 3)
    .map(toMaterialCardItem);

  return <MaterialDetail material={material} related={related} reviews={getReviewsForMaterial(material.id)} />;
}
