import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { AdminOverview } from "@/features/admin";

export const metadata: Metadata = { title: "Admin statistik" };

export default function AdminPage() {
  return (
    <>
      <PageHeader eyebrow="Admin" title="Statistik operasional" description="Pantau pertumbuhan listing, moderasi, dan aktivitas pengguna SisaHub." />
      <div className="py-8">
        <Container>
          <AdminOverview />
        </Container>
      </div>
    </>
  );
}
