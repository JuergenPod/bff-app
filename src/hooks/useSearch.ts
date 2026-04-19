import { useMemo } from "react";
import type { Activity, ActivityStatus, Category } from "@/types";

interface Filters {
  query: string;
  categories: Category[];
  statuses: ActivityStatus[];
}

export function useSearch(activities: Activity[], filters: Filters): Activity[] {
  return useMemo(() => {
    let result = activities;
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.notes.toLowerCase().includes(q)
      );
    }
    if (filters.categories.length > 0) {
      result = result.filter((a) => filters.categories.includes(a.category));
    }
    if (filters.statuses.length > 0) {
      result = result.filter((a) => filters.statuses.includes(a.status));
    }
    return result;
  }, [activities, filters]);
}
