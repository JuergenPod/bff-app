import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/shared/GradientHeading";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorBanner } from "@/components/shared/ErrorBanner";
import { PageTransition } from "@/components/layout/PageTransition";
import { ActivityGrid } from "@/components/activity/ActivityGrid";
import { ActivityForm } from "@/components/activity/ActivityForm";
import { ActivityDetail } from "@/components/activity/ActivityDetail";
import { useActivities } from "@/hooks/useActivities";
import type { Activity } from "@/types";

export function DashboardPage() {
  const { activities, loading, error } = useActivities();
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Activity | undefined>();
  const [viewTarget, setViewTarget] = useState<Activity | null>(null);

  const planned = activities
    .filter((a) => a.status === "planned")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  const recentMemories = activities
    .filter((a) => a.status === "completed")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-6">
        <div>
          <GradientHeading className="text-3xl mb-1">Hey besties! 💫</GradientHeading>
          <p className="text-gray-500 text-sm">Your shared adventure log</p>
        </div>
        <Button
          onClick={() => { setEditTarget(undefined); setShowForm(true); }}
          className="bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-2xl font-semibold shadow-lg"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>

      {error && <ErrorBanner message={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {planned.length > 0 && (
            <section className="mb-8">
              <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" /> Coming up
              </h2>
              <ActivityGrid
                activities={planned}
                onEdit={(a) => { setEditTarget(a); setShowForm(true); }}
                onView={setViewTarget}
              />
            </section>
          )}
          <section>
            <h2 className="font-semibold text-gray-800 mb-3">Recent memories</h2>
            <ActivityGrid
              activities={recentMemories}
              onEdit={(a) => { setEditTarget(a); setShowForm(true); }}
              onView={setViewTarget}
              emptyEmoji="📸"
              emptyTitle="No memories yet"
              emptyDescription="Complete your first activity to see it here!"
              emptyAction={
                <Button
                  onClick={() => { setEditTarget(undefined); setShowForm(true); }}
                  className="bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-2xl"
                >
                  <Plus className="w-4 h-4 mr-1" /> Plan something
                </Button>
              }
            />
          </section>
        </>
      )}

      {/* FAB for mobile */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setEditTarget(undefined); setShowForm(true); }}
        className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-br from-rose-500 to-violet-500 rounded-full shadow-xl flex items-center justify-center text-white z-30"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      <ActivityForm
        open={showForm}
        onClose={() => setShowForm(false)}
        initial={editTarget}
      />
      <ActivityDetail
        activity={viewTarget}
        onClose={() => setViewTarget(null)}
        onEdit={(a) => { setViewTarget(null); setEditTarget(a); setShowForm(true); }}
      />
    </PageTransition>
  );
}
