"use client";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
export default function Error({ reset }: { error: Error; reset: () => void }) { return <Container className="flex min-h-screen flex-col items-center justify-center gap-4 text-center"><h1 className="text-2xl font-bold">Terjadi gangguan</h1><p className="text-text-muted">Silakan coba lagi.</p><Button onClick={reset}>Coba lagi</Button></Container>; }
