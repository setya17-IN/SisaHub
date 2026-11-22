import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { AdminReportsTable, adminReports } from "@/features/admin";

export const metadata: Metadata = { title: "Admin laporan" };

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader eyebrow="Moderasi" title="Laporan pengguna" description="Tindak lanjuti laporan terkait listing, pengguna, dan ulasan." />
      <div className="py-8">
        <Container>
          <AdminReportsTable items={adminReports} />
        </Container>
      </div>
    </>
  );
}
