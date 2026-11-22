"use client";
import { useState } from "react";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, Select, Textarea } from "@/components/ui/controls";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { REPORT_REASON_OPTIONS, type ReportReason } from "../types";

export function ReportButton({ target }: { target: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>("prohibited");
  const [detail, setDetail] = useState("");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-control px-2 text-xs font-medium text-text-muted hover:bg-surface hover:text-danger"
      >
        <Flag className="size-3.5" aria-hidden="true" />
        Laporkan
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Laporkan konten">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
            setDetail("");
            toast({ title: "Laporan terkirim", description: "Tim moderasi akan meninjau laporan Anda.", tone: "success" });
          }}
        >
          <p className="rounded-control bg-surface p-3 text-sm text-text-muted">{target}</p>
          <FormField label="Alasan laporan" htmlFor="report-reason" required>
            <Select id="report-reason" value={reason} onChange={(event) => setReason(event.target.value as ReportReason)}>
              {REPORT_REASON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
          </FormField>
          <FormField label="Keterangan tambahan" htmlFor="report-detail" hint="Jelaskan bukti atau kronologi bila ada.">
            <Textarea id="report-detail" value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="Tuliskan detail laporan..." />
          </FormField>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit" variant="danger">Kirim laporan</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
