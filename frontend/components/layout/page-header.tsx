import { Container } from "./container";
export function PageHeader({ title, description }: { title: string; description: string }) { return <header className="border-b border-border bg-surface py-8 sm:py-12"><Container><h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-text-muted">{description}</p></Container></header>; }
