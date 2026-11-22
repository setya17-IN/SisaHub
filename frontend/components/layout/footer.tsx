import Link from "next/link";
import { Mail, MapPin, Recycle } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { Container } from "./container";

const groups = [
  {
    title: "Jelajahi",
    links: [
      { label: "Cari material", href: ROUTES.explore },
      { label: "Material dicari", href: ROUTES.wanted },
      { label: "Dampak", href: ROUTES.impact },
      { label: "Metodologi dampak", href: ROUTES.impactMethodology },
    ],
  },
  {
    title: "Tentang SisaHub",
    links: [
      { label: "Tentang kami", href: ROUTES.about },
      { label: "Panduan penggunaan", href: ROUTES.guide },
      { label: "Material terlarang", href: ROUTES.prohibitedMaterials },
      { label: "Kebijakan privasi", href: ROUTES.privacy },
      { label: "Syarat dan ketentuan", href: ROUTES.terms },
    ],
  },
  {
    title: "Untuk komunitas",
    links: [
      { label: "Bagikan material", href: ROUTES.newMaterial },
      { label: "Buat kebutuhan", href: ROUTES.wanted },
      { label: "Pusat bantuan", href: ROUTES.guide },
      { label: "Laporkan konten", href: ROUTES.prohibitedMaterials },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link className="inline-flex items-center gap-2 text-lg font-bold text-primary" href={ROUTES.home}>
              <span className="inline-flex size-9 items-center justify-center rounded-control bg-primary-50">
                <Recycle className="size-5" aria-hidden="true" />
              </span>
              SisaHub
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-text-muted">
              Platform penghubung material sisa layak pakai dengan pengrajin, komunitas, dan usaha kecil. Dari sisa menjadi bernilai.
            </p>
            <div className="mt-4 space-y-2 text-sm text-text-muted">
              <p className="flex items-center gap-2"><Mail className="size-4 text-primary" aria-hidden="true" />halo@sisahub.id</p>
              <p className="flex items-center gap-2"><MapPin className="size-4 text-primary" aria-hidden="true" />Surabaya, Indonesia</p>
            </div>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-text">{group.title}</h2>
              <ul className="mt-3 space-y-1">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}-${link.label}`}>
                    <Link className="inline-flex min-h-9 items-center text-sm text-text-muted hover:text-primary" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SisaHub. Dibangun untuk ekonomi sirkular.</p>
          <div className="flex flex-wrap gap-4">
            <Link href={ROUTES.privacy} className="hover:text-primary">Privasi</Link>
            <Link href={ROUTES.terms} className="hover:text-primary">Syarat</Link>
            <Link href={ROUTES.impact} className="hover:text-primary">Dampak</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
