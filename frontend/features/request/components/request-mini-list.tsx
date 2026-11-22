import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatDateId } from "@/lib/utils/format";
import { MATERIAL_CATEGORY_LABELS } from "@/features/material";
import type { MaterialRequest } from "../types";
import { RequestStatusBadge } from "./request-status-badge";

export function RequestMiniList({ items, limit = 4 }: { items: MaterialRequest[]; limit?: number }) {
  return (
    <ul className="divide-y divide-border">
      {items.slice(0, limit).map((request) => (
        <li key={request.id}>
          <Link href={`/permintaan/${request.id}`} className="flex items-center gap-3 py-3 hover:bg-surface">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text">{request.materialTitle}</p>
              <p className="mt-0.5 text-xs text-text-muted">
                {request.direction === "incoming" ? request.requester.name : request.owner.name} - {MATERIAL_CATEGORY_LABELS[request.category]} - {formatDateId(request.createdAt)}
              </p>
            </div>
            <RequestStatusBadge status={request.status} />
            <ChevronRight className="size-4 shrink-0 text-text-muted" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
