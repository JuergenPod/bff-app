import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: number | null;
  onChange?: (v: number) => void;
  size?: "sm" | "md";
}

export function RatingStars({ value, onChange, size = "sm" }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          disabled={!onChange}
          className={cn("disabled:cursor-default", onChange && "hover:scale-110 transition-transform")}
        >
          <Star
            className={cn(
              size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5",
              n <= (value ?? 0) ? "text-amber-400 fill-amber-400" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}
