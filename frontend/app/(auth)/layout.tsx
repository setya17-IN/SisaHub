import { Container } from "@/components/layout/container";
export default function AuthLayout({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-surface"><Container className="py-8"><div className="mb-8 font-bold text-primary">SisaHub</div>{children}</Container></div>; }
