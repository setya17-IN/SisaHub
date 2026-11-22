import { Container } from "./container";
export function AdminShell({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-surface"><header className="border-b border-border bg-neutral-900 text-white"><Container className="flex min-h-16 items-center font-semibold">SisaHub Admin</Container></header>{children}</div>; }
