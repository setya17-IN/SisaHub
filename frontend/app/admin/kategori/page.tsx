import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { AdminCategoriesManager, adminCategories } from "@/features/admin";

export const metadata: Metadata = { title: "Admin kategori" };

export default function AdminCategoriesPage() {
  return (
    <>
      <PageHeader eyebrow="Katalog" title="Kategori material" description="Kelola kategori yang digunakan pada listing dan pencarian material." />
      <div className="py-8">
        <Container>
          <AdminCategoriesManager items={adminCategories} />
        </Container>
      </div>
    </>
  );
}
