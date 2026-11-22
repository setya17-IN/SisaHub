import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { MaterialForm, getMaterialById } from "@/features/material";

export const metadata: Metadata = { title: "Edit material" };

export default async function EditMaterialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const material = getMaterialById(id);
  if (!material) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Kelola listing"
        title="Edit material"
        description="Perbarui informasi, ketersediaan, atau harga material Anda."
      />
      <main className="py-8">
        <Container>
          <MaterialForm material={material} />
        </Container>
      </main>
    </>
  );
}
