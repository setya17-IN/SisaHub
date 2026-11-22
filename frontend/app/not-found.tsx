import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
export default function NotFound() { return <><PageHeader title="Halaman tidak ditemukan" description="Alamat yang Anda buka tidak tersedia." /><main className="py-8"><Container><EmptyState title="404" description="Periksa kembali alamat halaman yang Anda tuju." /></Container></main></>; }
