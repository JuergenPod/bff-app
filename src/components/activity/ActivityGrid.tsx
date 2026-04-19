import { motion } from "framer-motion";
import type { Activity } from "@/types";
import { ActivityCard } from "./ActivityCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface Props {
  activities: Activity[];
  onEdit: (a: Activity) => void;
  onView: (a: Activity) => void;
  emptyEmoji?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ActivityGrid({ activities, onEdit, onView, emptyEmoji = "✨", emptyTitle = "Nothing here yet", emptyDescription = "Add your first activity!", emptyAction }: Props) {
  if (activities.length === 0) {
    return <EmptyState emoji={emptyEmoji} title={emptyTitle} description={emptyDescription} action={emptyAction} />;
  }
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {activities.map((a) => (
        <motion.div key={a.id} variants={item}>
          <ActivityCard activity={a} onEdit={onEdit} onView={onView} />
        </motion.div>
      ))}
    </motion.div>
  );
}
