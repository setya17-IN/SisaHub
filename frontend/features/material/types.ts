export type MaterialCategory =
  | "kain"
  | "kertas-kardus"
  | "kayu"
  | "plastik"
  | "logam"
  | "bahan-kerajinan";

export type MaterialCondition = "new" | "good" | "fair";
export type MaterialStatus = "available" | "reserved" | "completed" | "inactive" | "removed";
export type PriceType = "free" | "paid";

export type MaterialOwner = {
  id: string;
  name: string;
  avatar?: string | null;
  city: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  joinedAt: string;
};

export type Material = {
  id: string;
  title: string;
  description: string;
  category: MaterialCategory;
  condition: MaterialCondition;
  status: MaterialStatus;
  quantity: number;
  unit: string;
  priceType: PriceType;
  priceAmount?: number | null;
  city: string;
  province: string;
  distanceKm?: number | null;
  owner: MaterialOwner;
  imageUrl?: string | null;
  tags: string[];
  createdAt: string;
  views: number;
  favoriteCount: number;
  isFavorite?: boolean;
};

export type MaterialCardItem = {
  id: string;
  title: string;
  category: MaterialCategory;
  quantityLabel: string;
  conditionLabel: string;
  conditionTone?: "primary" | "info" | "accent";
  free: boolean;
  priceAmount?: number | null;
  city: string;
  distance?: string | null;
  ownerName: string;
  ownerAvatar?: string | null;
  imageUrl?: string | null;
  href?: string;
  isFavorite?: boolean;
};

export type MaterialFilterState = {
  query: string;
  category: MaterialCategory | "all";
  condition: MaterialCondition | "all";
  price: PriceType | "all";
  city: string;
  sort: "newest" | "cheapest" | "nearest" | "popular";
};
