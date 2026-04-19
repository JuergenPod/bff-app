import { cn } from "@/lib/utils";

export function GradientHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={cn("font-bold bg-gradient-to-r from-rose-500 via-violet-500 to-amber-500 bg-clip-text text-transparent", className)}>
      {children}
    </h1>
  );
}
