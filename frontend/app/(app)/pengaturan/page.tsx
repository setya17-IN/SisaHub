import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { SettingsForm } from "@/features/profile";

export const metadata: Metadata = { title: "Pengaturan" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Akun"
        title="Pengaturan"
        description="Kelola profil, preferensi notifikasi, dan keamanan akun Anda."
      />
      <main className="py-8">
        <Container>
          <SettingsForm />
        </Container>
      </main>
    </>
  );
}
