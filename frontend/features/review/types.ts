export type Review = {
  id: string;
  materialId?: string;
  profileId: string;
  authorName: string;
  authorRole: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
};

export type ReviewSummaryData = {
  average: number;
  total: number;
  distribution: Array<{ stars: number; count: number }>;
};
