import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { Container } from "./container";
const links = [["Tentang", ROUTES.about], ["Panduan", ROUTES.guide], ["Privasi", ROUTES.privacy], ["Syarat", ROUTES.terms], ["Material terlarang", ROUTES.prohibitedMaterials], ["Dampak", ROUTES.impact]] as const;
export function Footer() { return <footer className="mt-auto border-t border-border bg-surface py-8"><Container><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><Link className="font-bold text-primary" href={ROUTES.home}>SisaHub</Link><nav aria-label="Tautan footer" className="flex flex-wrap gap-x-5 gap-y-2">{links.map(([label, href]) => <Link key={href} className="min-h-11 inline-flex items-center text-sm text-text-muted hover:text-primary" href={href}>{label}</Link>)}</nav></div><p className="mt-4 text-sm text-text-muted">Menghubungkan sisa bahan dengan peluang baru.</p></Container></footer>; }
