"use client";
import { useState } from "react";
import { Bell, Check, Heart, Recycle, Search } from "lucide-react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Breadcrumb } from "./breadcrumb";
import { Button } from "./button";
import { Card } from "./card";
import { Checkbox, FormField, RadioGroup, Select, Switch, Textarea } from "./controls";
import { ConfirmDialog } from "./confirm-dialog";
import { DataTable } from "./data-table";
import { Drawer } from "./drawer";
import { DropdownMenu } from "./dropdown-menu";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { FileUploader } from "./file-uploader";
import { IconButton } from "./icon-button";
import { Input } from "./input";
import { Modal } from "./modal";
import { Pagination } from "./pagination";
import { Rating } from "./rating";
import { Skeleton } from "./skeleton";
import { StatCard } from "./stat-card";
import { Tabs } from "./tabs";
import { Timeline } from "./timeline";
import { ToastProvider, useToast } from "./toast";
import { Tooltip } from "./tooltip";

function ShowcaseContent() {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("owner");
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const rows = [{ id: "sample-1", name: "Sisa kain katun", status: "Tersedia" }];
  return <div className="space-y-6">
    <Card><h2 className="text-xl font-bold">Tombol dan ikon</h2><div className="mt-4 flex flex-wrap items-center gap-3"><Button>Utama</Button><Button variant="secondary">Sekunder</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Bahaya</Button><Button loading>Memuat</Button><Button disabled>Nonaktif</Button><Button size="sm">Kecil</Button><Button size="lg">Besar</Button><IconButton label="Cari"><Search className="size-5" /></IconButton><IconButton label="Simpan"><Heart className="size-5" /></IconButton></div></Card>
    <Card><h2 className="text-xl font-bold">Formulir</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><FormField label="Nama material" htmlFor="showcase-input" required hint="Tulis nama yang mudah dipahami."><Input id="showcase-input" placeholder="Contoh: Sisa kain katun" /></FormField><FormField label="Kategori" htmlFor="showcase-select"><Select id="showcase-select"><option>Kain</option><option>Kertas & kardus</option></Select></FormField><FormField label="Catatan" htmlFor="showcase-textarea"><Textarea id="showcase-textarea" placeholder="Informasi tambahan" /></FormField><div className="space-y-4"><label className="flex min-h-11 items-center gap-2 text-sm"><Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} />Saya memahami ketentuan</label><div className="flex items-center gap-3 text-sm">Notifikasi <Switch label="Aktifkan notifikasi" checked={checked} onChange={setChecked} /></div><RadioGroup label="Jenis akun" name="showcase-role" value={radio} options={[{ value: "owner", label: "Pemilik" }, { value: "seeker", label: "Pencari" }]} onChange={setRadio} /></div></div></Card>
    <Card><h2 className="text-xl font-bold">Panel, dialog, dan notifikasi</h2><div className="mt-4 flex flex-wrap gap-3"><Button variant="secondary" onClick={() => setModal(true)}>Buka modal</Button><Button variant="secondary" onClick={() => setConfirm(true)}>Konfirmasi aksi</Button><Button variant="secondary" onClick={() => setDrawer(true)}>Buka drawer</Button><Button onClick={() => toast({ title: "Tersimpan", description: "Perubahan berhasil disimpan.", tone: "success" })}>Tampilkan toast</Button><DropdownMenu label="Menu aksi"><a href="#showcase-menu">Lihat detail</a><a href="#showcase-menu">Ubah nama</a></DropdownMenu><Tooltip content="Keterangan singkat"><IconButton label="Informasi"><Bell className="size-5" /></IconButton></Tooltip></div><Modal open={modal} onClose={() => setModal(false)} title="Contoh modal"><p className="text-text-muted">Dialog dengan label aksesibel dan kontrol keyboard.</p><Button className="mt-4" onClick={() => setModal(false)}>Selesai</Button></Modal><ConfirmDialog open={confirm} onClose={() => setConfirm(false)} onConfirm={() => setConfirm(false)} title="Hapus item?" description="Aksi ini hanya contoh dan tidak menyimpan perubahan." /><Drawer open={drawer} onClose={() => setDrawer(false)} title="Panel samping"><p className="text-text-muted">Drawer untuk navigasi atau filter pada layar kecil.</p></Drawer></Card>
    <Card><h2 className="text-xl font-bold">Status dan konten</h2><div className="mt-4 space-y-4"><div className="flex flex-wrap gap-2"><Badge tone="accent">Permintaan · Menunggu</Badge><Badge tone="info">Permintaan · Diterima</Badge><Badge tone="danger">Permintaan · Ditolak</Badge><Badge tone="neutral">Permintaan · Dibatalkan</Badge><Badge tone="primary">Permintaan · Selesai</Badge></div><div className="flex flex-wrap gap-2"><Badge tone="primary">Material · Tersedia</Badge><Badge tone="accent">Material · Direservasi</Badge><Badge tone="neutral">Material · Selesai</Badge><Badge tone="neutral">Material · Tidak aktif</Badge><Badge tone="danger">Material · Dihapus</Badge></div><div className="flex flex-wrap gap-2"><Badge tone="primary">Kondisi · Baru</Badge><Badge tone="info">Kondisi · Baik</Badge><Badge tone="accent">Kondisi · Cukup</Badge><Badge tone="primary">Gratis</Badge><Badge tone="accent">Berbayar</Badge></div><div className="flex flex-wrap gap-2"><Badge tone="rose">Kain</Badge><Badge tone="accent">Kertas & kardus</Badge><Badge tone="orange">Kayu</Badge><Badge tone="sky">Plastik</Badge><Badge tone="slate">Logam</Badge><Badge tone="violet">Bahan kerajinan</Badge></div></div><div className="mt-4 flex flex-wrap items-center gap-3"><Rating value={4.8} /><Avatar name="Rina Putri" /><Avatar name="Komunitas Karya" size="lg" /><span className="inline-flex items-center gap-2 text-sm text-primary"><Check className="size-4" />Terverifikasi</span></div><div className="mt-5 grid gap-4 md:grid-cols-2"><EmptyState title="Belum ada data" description="Ajakan yang membantu pengguna memahami langkah berikutnya." /><ErrorState title="Contoh pesan gagal" description="Coba lagi setelah beberapa saat." onRetry={() => toast({ title: "Mencoba kembali", tone: "info" })} /></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><Skeleton className="h-24" /><Skeleton className="h-24" /><Skeleton className="h-24" /></div></Card>
    <Card><h2 className="text-xl font-bold">Tabel, statistik, navigasi</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><StatCard label="Transaksi selesai" value="1.240" detail="Bertumbuh bersama komunitas" icon={<Recycle className="size-5" />} /><StatCard label="Material dimanfaatkan" value="8.420 kg" detail="Estimasi berdasarkan asumsi" /></div><div className="mt-4"><DataTable caption="Contoh listing" columns={[{ key: "name", header: "Material", render: (row) => row.name }, { key: "status", header: "Status", render: (row) => <Badge tone="primary">{row.status}</Badge> }]} rows={rows} /></div><div className="mt-4"><Pagination page={page} pageCount={4} onPageChange={setPage} /></div><div className="mt-4"><Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Jelajahi", href: "/jelajahi" }, { label: "Material" }]} /></div><div className="mt-4"><Tabs tabs={[{ id: "summary", label: "Ringkasan", content: <p className="text-text-muted">Konten ringkasan.</p> }, { id: "activity", label: "Aktivitas", content: <p className="text-text-muted">Konten aktivitas.</p> }]} /></div><div className="mt-5"><Timeline currentStep={1} steps={[{ title: "Permintaan dikirim" }, { title: "Pemilik menerima", description: "Menunggu konfirmasi." }, { title: "Serah-terima" }]} /></div></Card>
    <Card><h2 className="text-xl font-bold">Unggah file</h2><p className="mt-1 text-sm text-text-muted">Pratinjau lokal, maksimal 5 foto dan 5 MB per foto.</p><div className="mt-4"><FileUploader /></div></Card>
  </div>;
}
export function ComponentShowcase() { return <ToastProvider><ShowcaseContent /></ToastProvider>; }
