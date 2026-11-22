export type ScannerResult = {
  category: string;
  categoryLabel: string;
  condition: "new" | "good" | "fair";
  conditionLabel: string;
  confidence: number;
  suggestedTitle: string;
  suggestedTags: string[];
  note: string;
};
