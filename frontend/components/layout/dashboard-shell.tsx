import { Container } from "./container";
export function DashboardShell({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-surface"><header className="border-b border-border bg-background"><Container className="flex min-h-16 items-center font-semibold text-primary">SisaHub Dashboard</Container></header>{children}</div>; }
