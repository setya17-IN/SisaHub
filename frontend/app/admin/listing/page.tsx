import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { AdminListingsTable, adminListings } from "@/features/admin";

export const metadata: Metadata = { title: "Admin listing" };

export default function AdminListingsPage() {
  return (
    <>
      <PageHeader eyebrow="Moderasi" title="Listing material" description="Tinjau, setujui, atau nonaktifkan listing material dari pengguna." />
      <div className="py-8">
        <Container>
          <AdminListingsTable items={adminListings} />
        </Container>
      </div>
    </>
  );
}
