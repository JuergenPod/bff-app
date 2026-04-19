import type { Category } from "@/types";

export const CATEGORY_CONFIG: Record<Category, { label: string; emoji: string; color: string; bg: string }> = {
  food: { label: "Food", emoji: "🍜", color: "text-amber-600", bg: "bg-amber-100" },
  concert: { label: "Concert", emoji: "🎵", color: "text-violet-600", bg: "bg-violet-100" },
  sports: { label: "Hike / Sports", emoji: "🥾", color: "text-emerald-600", bg: "bg-emerald-100" },
};

export const STATUS_CONFIG = {
  wishlist: { label: "Wishlist", color: "text-sky-600", bg: "bg-sky-100" },
  planned: { label: "Planned", color: "text-violet-600", bg: "bg-violet-100" },
  completed: { label: "Done ✓", color: "text-emerald-600", bg: "bg-emerald-100" },
};

export const ACHIEVEMENT_DEFS = [
  { id: "first-activity", name: "First Memory", emoji: "🌟", description: "Log your very first activity" },
  { id: "foodie-5", name: "Foodie Duo", emoji: "🍜", description: "Complete 5 food outings" },
  { id: "concert-3", name: "Music Lovers", emoji: "🎵", description: "Attend 3 concerts" },
  { id: "hike-5", name: "Trail Blazers", emoji: "🥾", description: "Complete 5 hikes or sports" },
  { id: "all-cats", name: "Variety Queens", emoji: "🌈", description: "Complete at least 1 of each category" },
  { id: "wishlist-10", name: "Dreamers", emoji: "✨", description: "Add 10 things to the wishlist" },
  { id: "streak-4", name: "Weekly Warriors", emoji: "🔥", description: "Do something 4 weeks in a row" },
  { id: "perfect-rating", name: "Perfectionists", emoji: "⭐", description: "Give a 5-star rating 3 times" },
  { id: "planner-5", name: "Future Focused", emoji: "📅", description: "Have 5 activities in Planned state" },
  { id: "century", name: "Centennial Besties", emoji: "💯", description: "Log 100 total activities" },
];

export const SUGGESTED_EMOJIS = [
  "🎵", "🍜", "🥾", "🎭", "🎨", "🏖️", "🎢", "🍕", "🍣", "🎪",
  "🏔️", "🎸", "🍰", "🎬", "🏋️", "🚴", "🧁", "🎤", "🌸", "🎊",
];

export const DATA_FILE_PATH = "bff-data/activities.json";
export const PHOTOS_DIR = "bff-data/photos";
