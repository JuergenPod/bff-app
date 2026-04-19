import { cn } from "@/lib/utils";
import { STATUS_CONFIG } from "@/constants";
import type { ActivityStatus } from "@/types";

export function ActivityStatusBadge({ status }: { status: ActivityStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", cfg.bg, cfg.color)}>
      {cfg.label}
    </span>
  );
}
