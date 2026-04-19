import { Link, useLocation } from "react-router-dom";
import { Home, List, Heart, BarChart2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/activities", icon: List, label: "Activities" },
  { to: "/wishlist", icon: Heart, label: "Wishlist" },
  { to: "/stats", icon: BarChart2, label: "Stats" },
  { to: "/achievements", icon: Trophy, label: "Badges" },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/90 border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around h-16">
        {tabs.map(({ to, icon: Icon, label }) => {
          const active = pathname.startsWith(to);
          return (
            <Link key={to} to={to} className="flex flex-col items-center gap-0.5 flex-1 py-2">
              <Icon className={cn("w-5 h-5", active ? "text-rose-500" : "text-gray-400")} />
              <span className={cn("text-[10px] font-medium", active ? "text-rose-500" : "text-gray-400")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
