import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { AdminUsersTable, adminUsers } from "@/features/admin";

export const metadata: Metadata = { title: "Admin pengguna" };

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader eyebrow="Komunitas" title="Pengguna" description="Verifikasi, aktifkan, atau tangguhkan akun pengguna SisaHub." />
      <div className="py-8">
        <Container>
          <AdminUsersTable items={adminUsers} />
        </Container>
      </div>
    </>
  );
}
