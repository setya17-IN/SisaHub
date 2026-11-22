import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { NotificationList, notifications } from "@/features/notification";

export const metadata: Metadata = { title: "Notifikasi" };

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pembaruan"
        title="Notifikasi"
        description="Permintaan, pesan, Smart Match, dan pembaruan akun dalam satu tempat."
      />
      <main className="py-8">
        <Container>
          <NotificationList items={notifications} />
        </Container>
      </main>
    </>
  );
}
