import Link from "next/link";
import { Recycle } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { Container } from "./container";
export function Navbar() { return <nav className="border-b border-border bg-background"><Container className="flex min-h-16 items-center justify-between gap-4"><Link href={ROUTES.home} className="inline-flex items-center gap-2 font-bold text-primary"><Recycle className="size-5" aria-hidden="true" />SisaHub</Link><div className="flex items-center gap-4 text-sm font-medium text-text-muted"><Link href={ROUTES.explore}>Jelajahi</Link><Link href={ROUTES.impact}>Dampak</Link><Link href={ROUTES.login}>Masuk</Link></div></Container></nav>; }
