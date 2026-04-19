import { Link, useLocation } from "react-router-dom";
import { Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/dashboard", label: "Home" },
  { to: "/activities", label: "Activities" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/stats", label: "Stats" },
  { to: "/achievements", label: "Badges" },
];

export function NavBar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg bg-gradient-to-r from-rose-500 via-violet-500 to-amber-500 bg-clip-text text-transparent">
          <Sparkles className="w-5 h-5 text-rose-500" />
          BFF Moments
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                pathname.startsWith(link.to)
                  ? "bg-rose-100 text-rose-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Settings className="w-4 h-4 text-gray-600" />
        </Link>
      </div>
    </header>
  );
}
