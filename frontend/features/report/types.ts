export type ReportReason = "prohibited" | "misleading" | "spam" | "inappropriate" | "fraud";

export const REPORT_REASON_OPTIONS: Array<{ value: ReportReason; label: string }> = [
  { value: "prohibited", label: "Material terlarang" },
  { value: "misleading", label: "Informasi menyesatkan" },
  { value: "spam", label: "Spam atau duplikat" },
  { value: "inappropriate", label: "Konten tidak pantas" },
  { value: "fraud", label: "Indikasi penipuan" },
];
