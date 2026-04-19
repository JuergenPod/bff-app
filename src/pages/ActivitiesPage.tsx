import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/shared/GradientHeading";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorBanner } from "@/components/shared/ErrorBanner";
import { PageTransition } from "@/components/layout/PageTransition";
import { ActivityGrid } from "@/components/activity/ActivityGrid";
import { ActivityForm } from "@/components/activity/ActivityForm";
import { ActivityDetail } from "@/components/activity/ActivityDetail";
import { FilterBar } from "@/components/filters/FilterBar";
import { useActivities } from "@/hooks/useActivities";
import { useSearch } from "@/hooks/useSearch";
import type { Activity, ActivityStatus, Category } from "@/types";

export function ActivitiesPage() {
  const { activities, loading, error } = useActivities();
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Activity | undefined>();
  const [viewTarget, setViewTarget] = useState<Activity | null>(null);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [statuses, setStatuses] = useState<ActivityStatus[]>([]);

  const filtered = useSearch(activities, { query, categories, statuses });

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-4">
        <GradientHeading className="text-2xl">All Activities</GradientHeading>
        <Button
          onClick={() => { setEditTarget(undefined); setShowForm(true); }}
          className="bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-2xl"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      <FilterBar
        query={query} onQueryChange={setQuery}
        categories={categories} onCategoriesChange={setCategories}
        statuses={statuses} onStatusesChange={setStatuses}
      />

      {error && <ErrorBanner message={error} />}
      {loading ? <LoadingSpinner /> : (
        <ActivityGrid
          activities={filtered}
          onEdit={(a) => { setEditTarget(a); setShowForm(true); }}
          onView={setViewTarget}
          emptyEmoji="🎯"
          emptyTitle={query || categories.length || statuses.length ? "No matches" : "No activities yet"}
          emptyDescription={query || categories.length || statuses.length ? "Try different filters" : "Start planning your first adventure!"}
        />
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => { setEditTarget(undefined); setShowForm(true); }}
        className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-rose-500 to-violet-500 rounded-full shadow-xl flex items-center justify-center text-white z-30"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <ActivityForm open={showForm} onClose={() => setShowForm(false)} initial={editTarget} />
      <ActivityDetail
        activity={viewTarget}
        onClose={() => setViewTarget(null)}
        onEdit={(a) => { setViewTarget(null); setEditTarget(a); setShowForm(true); }}
      />
    </PageTransition>
  );
}
