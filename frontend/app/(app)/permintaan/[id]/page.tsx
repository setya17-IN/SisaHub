import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequestDetail, getRequestById } from "@/features/request";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const request = getRequestById(id);
  return { title: request ? `Permintaan ${request.id}` : "Permintaan tidak ditemukan" };
}

export default async function RequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = getRequestById(id);
  if (!request) notFound();
  return <RequestDetail request={request} />;
}
