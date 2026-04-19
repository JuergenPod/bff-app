import { useState } from "react";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/shared/GradientHeading";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageTransition } from "@/components/layout/PageTransition";
import { ActivityGrid } from "@/components/activity/ActivityGrid";
import { ActivityForm } from "@/components/activity/ActivityForm";
import { ActivityDetail } from "@/components/activity/ActivityDetail";
import { useActivities } from "@/hooks/useActivities";
import type { Activity } from "@/types";

export function WishlistPage() {
  const { activities, loading } = useActivities();
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Activity | undefined>();
  const [viewTarget, setViewTarget] = useState<Activity | null>(null);

  const wishlist = activities.filter((a) => a.status === "wishlist");

  const openNewWishlist = () => {
    setEditTarget(undefined);
    setShowForm(true);
  };

  return (
    <PageTransition>
      <div className="flex items-center justify-between mb-2">
        <GradientHeading className="text-2xl">Bucket List</GradientHeading>
        <Button onClick={openNewWishlist} className="bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-2xl">
          <Plus className="w-4 h-4 mr-1" /> Add dream
        </Button>
      </div>
      <p className="text-gray-500 text-sm mb-6 flex items-center gap-1">
        <Heart className="w-4 h-4 text-rose-400" />
        Things you two want to do someday
      </p>

      {loading ? <LoadingSpinner /> : (
        <ActivityGrid
          activities={wishlist}
          onEdit={(a) => { setEditTarget(a); setShowForm(true); }}
          onView={setViewTarget}
          emptyEmoji="💭"
          emptyTitle="Dream list is empty"
          emptyDescription="What adventures are you dreaming of?"
          emptyAction={
            <Button onClick={openNewWishlist} className="bg-gradient-to-r from-rose-500 to-violet-500 text-white rounded-2xl">
              Add your first dream ✨
            </Button>
          }
        />
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={openNewWishlist}
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
