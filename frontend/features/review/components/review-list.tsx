import { ThumbsUp } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { formatDateId } from "@/lib/utils/format";
import type { Review } from "../types";
import { summarizeReviews } from "../data";

export function ReviewSummary({ reviews }: { reviews: Review[] }) {
  const summary = summarizeReviews(reviews);
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="text-center sm:w-32">
          <p className="text-4xl font-bold tabular-nums text-text">{summary.average.toFixed(1)}</p>
          <div className="mt-1 flex justify-center">
            <Rating value={summary.average} />
          </div>
          <p className="mt-1 text-xs text-text-muted">{summary.total} ulasan</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {summary.distribution.map((item) => {
            const percent = summary.total === 0 ? 0 : Math.round((item.count / summary.total) * 100);
            return (
              <div key={item.stars} className="flex items-center gap-2 text-xs">
                <span className="w-8 shrink-0 text-text-muted">{item.stars} bintang</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-accent-500" style={{ width: `${percent}%` }} />
                </div>
                <span className="w-6 text-right tabular-nums text-text-muted">{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="rounded-card border border-dashed border-border bg-surface p-6 text-sm text-text-muted">Belum ada ulasan untuk material ini.</p>;
  }
  return (
    <ul className="divide-y divide-border rounded-card border border-border bg-background">
      {reviews.map((review) => (
        <li key={review.id} className="p-5">
          <div className="flex items-start gap-3">
            <Avatar name={review.authorName} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-text">{review.authorName}</p>
                  <p className="text-xs text-text-muted">{review.authorRole}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Rating value={review.rating} />
                  <span className="text-xs text-text-muted">{formatDateId(review.createdAt)}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-text-muted">{review.comment}</p>
              <button type="button" className="mt-3 inline-flex min-h-8 items-center gap-1.5 rounded-control px-2 text-xs font-medium text-text-muted hover:bg-surface hover:text-primary">
                <ThumbsUp className="size-3.5" aria-hidden="true" />
                Membantu ({review.helpful})
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
