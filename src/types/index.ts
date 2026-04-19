export type Category = "food" | "concert" | "sports";
export type ActivityStatus = "wishlist" | "planned" | "completed";

export interface Activity {
  id: string;
  title: string;
  category: Category;
  status: ActivityStatus;
  date: string;
  location: string;
  notes: string;
  rating: number | null;
  emoji: string;
  photos: string[];
  createdAt: string;
}

export interface AppSettings {
  pat: string;
  owner: string;
  repo: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Stats {
  totalCompleted: number;
  totalPlanned: number;
  totalWishlist: number;
  byCategory: Record<Category, number>;
  averageRating: number | null;
  currentStreak: number;
  longestStreak: number;
  topRated: Activity[];
  recentMemories: Activity[];
  nextUpcoming: Activity | null;
}
