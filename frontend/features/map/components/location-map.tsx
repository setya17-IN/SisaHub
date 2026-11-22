import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { MapPinPoint } from "../types";

export function LocationMap({
  pins,
  title = "Sebaran material",
  className,
}: {
  pins: MapPinPoint[];
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-card border border-border bg-primary-50", className)}>
      <div className="flex items-center justify-between border-b border-primary-100 px-4 py-3">
        <p className="text-sm font-semibold text-primary-900">{title}</p>
        <span className="text-xs text-primary-800">{pins.length} lokasi</span>
      </div>
      <div
        className="relative aspect-[4/3] w-full"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-100) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="absolute inset-4 rounded-control border border-dashed border-primary-200" aria-hidden="true" />
        {pins.map((pin) => (
          <div key={pin.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
            <div className={cn("flex flex-col items-center", pin.active && "z-10")}>
              <span className={cn("rounded-control px-1.5 py-0.5 text-[10px] font-semibold shadow-card", pin.active ? "bg-primary text-white" : "bg-background text-text")}>
                {pin.city}
              </span>
              <MapPin className={cn("size-6", pin.active ? "fill-primary text-primary-900" : "fill-background text-primary-700")} aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
      <p className="px-4 py-2 text-xs text-primary-800">Peta ilustratif. Lokasi tepat dibagikan setelah permintaan disetujui.</p>
    </div>
  );
}
