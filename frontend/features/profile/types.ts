export type ProfileType = "individual" | "business" | "community";

export type Profile = {
  id: string;
  name: string;
  type: ProfileType;
  organization?: string;
  bio: string;
  city: string;
  province: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  joinedAt: string;
  responseTime: string;
  stats: {
    listings: number;
    completed: number;
    weightKg: number;
    followers: number;
  };
  badges: string[];
};

export const PROFILE_TYPE_LABELS: Record<ProfileType, string> = {
  individual: "Perorangan",
  business: "Usaha",
  community: "Komunitas",
};
