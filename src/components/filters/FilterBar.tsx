import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG, STATUS_CONFIG } from "@/constants";
import type { Category, ActivityStatus } from "@/types";

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  categories: Category[];
  onCategoriesChange: (c: Category[]) => void;
  statuses: ActivityStatus[];
  onStatusesChange: (s: ActivityStatus[]) => void;
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export function FilterBar({ query, onQueryChange, categories, onCategoriesChange, statuses, onStatusesChange }: Props) {
  return (
    <div className="space-y-3 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search activities..."
          className="pl-9 pr-9 rounded-xl"
        />
        {query && (
          <button onClick={() => onQueryChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.entries(CATEGORY_CONFIG) as [Category, { label: string; emoji: string; bg: string; color: string }][]).map(([k, v]) => (
          <button
            key={k}
            onClick={() => onCategoriesChange(toggle(categories, k))}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              categories.includes(k)
                ? `${v.bg} ${v.color} border-current`
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            )}
          >
            {v.emoji} {v.label}
          </button>
        ))}
        {(Object.entries(STATUS_CONFIG) as [ActivityStatus, { label: string; bg: string; color: string }][]).map(([k, v]) => (
          <button
            key={k}
            onClick={() => onStatusesChange(toggle(statuses, k))}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              statuses.includes(k)
                ? `${v.bg} ${v.color} border-current`
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
