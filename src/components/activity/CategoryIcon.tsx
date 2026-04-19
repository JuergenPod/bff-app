import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG } from "@/constants";
import type { Category } from "@/types";

export function CategoryIcon({ category, size = "sm" }: { category: Category; size?: "sm" | "md" }) {
  const cfg = CATEGORY_CONFIG[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        cfg.bg, cfg.color,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      {cfg.emoji} {cfg.label}
    </span>
  );
}
