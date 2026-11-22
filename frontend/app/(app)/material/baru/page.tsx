import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { MaterialForm } from "@/features/material";

export const metadata: Metadata = { title: "Material baru" };

export default function NewMaterialPage() {
  return (
    <>
      <PageHeader
        eyebrow="Bagikan material"
        title="Material baru"
        description="Lengkapi informasi material sisa layak pakai. Semakin jelas detailnya, semakin cepat menemukan penerima yang tepat."
      />
      <main className="py-8">
        <Container>
          <MaterialForm />
        </Container>
      </main>
    </>
  );
}
