"use client";
import { useState } from "react";
import Link from "next/link";
import { Building2, CalendarDays, CheckCircle2, Clock3, MapPin, MessageSquare, Share2, ShieldCheck, Star, UserPlus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { formatDateId } from "@/lib/utils/format";
import { MaterialGrid, type MaterialCardItem } from "@/features/material";
import { ReviewList, ReviewSummary, type Review } from "@/features/review";
import type { Profile } from "../types";
import { PROFILE_TYPE_LABELS } from "../types";

export function ProfileView({
  profile,
  materials,
  reviews,
}: {
  profile: Profile;
  materials: MaterialCardItem[];
  reviews: Review[];
}) {
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);

  return (
    <div className="pb-16">
      <div className="border-b border-border bg-primary-50">
        <div className="mx-auto w-full max-w-7xl px-4 pb-6 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
            <Avatar name={profile.name} size="lg" className="size-24 border-4 border-background text-2xl shadow-card" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="primary">{PROFILE_TYPE_LABELS[profile.type]}</Badge>
                {profile.verified && (
                  <Badge tone="info">
                    <CheckCircle2 className="mr-1 size-3" aria-hidden="true" />
                    Terverifikasi
                  </Badge>
                )}
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{profile.name}</h1>
              {profile.organization && profile.organization !== profile.name && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
                  <Building2 className="size-4" aria-hidden="true" />
                  {profile.organization}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                <span className="inline-flex items-center gap-1"><MapPin className="size-4" aria-hidden="true" />{profile.city}, {profile.province}</span>
                <span className="inline-flex items-center gap-1"><CalendarDays className="size-4" aria-hidden="true" />Bergabung {formatDateId(profile.joinedAt)}</span>
                <span className="inline-flex items-center gap-1"><Star className="size-4 fill-accent-500 text-accent-700" aria-hidden="true" />{profile.rating.toFixed(1)} ({profile.reviewCount} ulasan)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={following ? "secondary" : "primary"} onClick={() => { setFollowing((current) => !current); toast({ title: following ? "Berhenti mengikuti" : "Mengikuti profil", tone: "success" }); }}>
                <UserPlus className="size-4" aria-hidden="true" />
                {following ? "Mengikuti" : "Ikuti"}
              </Button>
              <Button variant="secondary"><MessageSquare className="size-4" aria-hidden="true" />Hubungi</Button>
              <Button variant="secondary" aria-label="Bagikan profil"><Share2 className="size-4" aria-hidden="true" /></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0 space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Listing", value: profile.stats.listings },
                { label: "Transaksi selesai", value: profile.stats.completed },
                { label: "Material dibagikan", value: `${profile.stats.weightKg} kg` },
                { label: "Pengikut", value: profile.stats.followers },
              ].map((item) => (
                <Card key={item.label} className="p-4 text-center">
                  <p className="text-xl font-bold tabular-nums">{item.value}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{item.label}</p>
                </Card>
              ))}
            </div>

            <Tabs
              tabs={[
                {
                  id: "materials",
                  label: `Material (${materials.length})`,
                  content: materials.length ? (
                    <MaterialGrid materials={materials} columns={3} />
                  ) : (
                    <p className="rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-text-muted">Belum ada material aktif.</p>
                  ),
                },
                {
                  id: "reviews",
                  label: `Ulasan (${reviews.length})`,
                  content: (
                    <div className="space-y-4">
                      <ReviewSummary reviews={reviews} />
                      <ReviewList reviews={reviews} />
                    </div>
                  ),
                },
                {
                  id: "about",
                  label: "Tentang",
                  content: (
                    <Card>
                      <h2 className="text-lg font-bold">Tentang {profile.name}</h2>
                      <p className="mt-3 text-sm leading-7 text-text-muted">{profile.bio}</p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-control bg-surface p-3">
                          <p className="text-xs text-text-muted">Waktu respons</p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium"><Clock3 className="size-4 text-primary" aria-hidden="true" />{profile.responseTime}</p>
                        </div>
                        <div className="rounded-control bg-surface p-3">
                          <p className="text-xs text-text-muted">Lokasi</p>
                          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium"><MapPin className="size-4 text-primary" aria-hidden="true" />{profile.city}, {profile.province}</p>
                        </div>
                      </div>
                    </Card>
                  ),
                },
              ]}
            />
          </div>

          <aside className="space-y-4">
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Lencana komunitas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.badges.map((badge) => (
                  <Badge key={badge} tone="primary">{badge}</Badge>
                ))}
              </div>
              <div className="mt-4 rounded-control bg-surface p-3">
                <p className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="size-4 text-primary" aria-hidden="true" />Profil terpercaya</p>
                <p className="mt-1 text-xs leading-5 text-text-muted">Identitas dan transaksi diperiksa oleh tim SisaHub.</p>
              </div>
            </Card>
            <Card className="bg-primary-50">
              <p className="text-sm font-semibold text-primary-900">Punya material serupa?</p>
              <p className="mt-1 text-xs leading-5 text-primary-800">Bagikan material sisa Anda dan temukan penerima yang tepat.</p>
              <Link href="/material/baru" className="mt-3 block">
                <Button className="w-full">Bagikan material</Button>
              </Link>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
