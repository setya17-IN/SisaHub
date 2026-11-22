import Link from "next/link";
import { Building2, CalendarClock, CheckCircle2, MapPin, MessageSquare, Package, Users } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { formatDateId } from "@/lib/utils/format";
import { MATERIAL_CATEGORY_LABELS, MATERIAL_CATEGORY_TONES } from "@/features/material";
import type { WantedItem } from "../types";
import { WANTED_STATUS_LABELS, WANTED_URGENCY_LABELS, WANTED_URGENCY_TONES } from "../types";

export function WantedCard({ item }: { item: WantedItem }) {
  return (
    <Card className="flex h-full flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={MATERIAL_CATEGORY_TONES[item.category]}>{MATERIAL_CATEGORY_LABELS[item.category]}</Badge>
        <Badge tone={WANTED_URGENCY_TONES[item.urgency]}>{WANTED_URGENCY_LABELS[item.urgency]}</Badge>
        <Badge tone={item.status === "open" ? "primary" : "neutral"}>{WANTED_STATUS_LABELS[item.status]}</Badge>
      </div>

      <div>
        <h3 className="text-lg font-semibold leading-6 text-text">
          <Link href={`/dicari#${item.id}`} className="hover:text-primary">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-text-muted">{item.description}</p>
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Package className="size-4 text-primary" aria-hidden="true" />
          <div>
            <dt className="text-xs text-text-muted">Kebutuhan</dt>
            <dd className="font-medium">{item.quantity} {item.unit}</dd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" aria-hidden="true" />
          <div>
            <dt className="text-xs text-text-muted">Lokasi</dt>
            <dd className="font-medium">{item.city}</dd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarClock className="size-4 text-primary" aria-hidden="true" />
          <div>
            <dt className="text-xs text-text-muted">Batas waktu</dt>
            <dd className="font-medium">{formatDateId(item.deadline)}</dd>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" aria-hidden="true" />
          <div>
            <dt className="text-xs text-text-muted">Penawaran</dt>
            <dd className="font-medium">{item.offers} penawaran</dd>
          </div>
        </div>
      </dl>

      <div className="mt-auto flex items-center gap-2 border-t border-border pt-4">
        <Avatar name={item.requester.name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-sm font-medium">
            {item.requester.name}
            {item.requester.verified && <CheckCircle2 className="size-3.5 shrink-0 text-primary" aria-label="Terverifikasi" />}
          </p>
          <p className="flex items-center gap-1 truncate text-xs text-text-muted">
            <Building2 className="size-3" aria-hidden="true" />
            {item.requester.organization}
          </p>
        </div>
        <Rating value={item.requester.rating} />
      </div>

      <Button variant="secondary" className="w-full">
        <MessageSquare className="size-4" aria-hidden="true" />
        Tawarkan material
      </Button>
    </Card>
  );
}
