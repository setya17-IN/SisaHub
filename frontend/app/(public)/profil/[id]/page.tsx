import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { materials, toMaterialCardItem } from "@/features/material";
import { getProfileById, ProfileView } from "@/features/profile";
import { getReviewsForProfile } from "@/features/review";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const profile = getProfileById(id === "saya" ? "rina" : id);
  return { title: profile ? profile.name : "Profil tidak ditemukan" };
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = getProfileById(id === "saya" ? "rina" : id);
  if (!profile) notFound();

  const owned = materials.filter((material) => material.owner.id === profile.id).map(toMaterialCardItem);
  const reviews = getReviewsForProfile(profile.id);

  return <ProfileView profile={profile} materials={owned} reviews={reviews} />;
}
