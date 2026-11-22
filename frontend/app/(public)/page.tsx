import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
export const metadata: Metadata = { title: "Beranda" };
export default function HomePage() { return <><PageHeader title="SisaHub" description="Platform penghubung material sisa layak pakai." /><main className="py-8"><Container><EmptyState title="Halaman Beranda akan dibangun pada fase Pxx" description="Kerangka halaman telah siap." /></Container></main></>; }
