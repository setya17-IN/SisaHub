export type ImpactPoint = {
  month: string;
  materials: number;
  weightKg: number;
  co2Kg: number;
};

export type ImpactSummary = {
  materialsSaved: number;
  weightSavedKg: number;
  co2AvoidedKg: number;
  communityMembers: number;
  activeCities: number;
  completedRequests: number;
  monthly: ImpactPoint[];
};

export type ImpactBadge = {
  label: string;
  description: string;
  icon: "recycle" | "cloud" | "users" | "map";
};
