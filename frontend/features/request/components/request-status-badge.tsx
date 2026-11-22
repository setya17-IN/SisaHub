import { Badge } from "@/components/ui/badge";
import { REQUEST_STATUS_LABELS, REQUEST_STATUS_TONES, type RequestStatus } from "../types";

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return <Badge tone={REQUEST_STATUS_TONES[status]}>{REQUEST_STATUS_LABELS[status]}</Badge>;
}
