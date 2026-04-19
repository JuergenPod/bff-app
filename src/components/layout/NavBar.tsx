import { Link, useLocation } from "react-router-dom";
import { Settings, Sparkles, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { to: "/dashboard", label: "Home" },
  { to: "/activities", label: "Activities" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/stats", label: "Stats" },
  { to: "/achievements", label: "Badges" },
];

export function NavBar() {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-white/20 dark:border-violet-500/20 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-lg bg-gradient-to-r from-rose-500 via-violet-500 to-amber-500 dark:from-violet-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
        >
          <Sparkles className="w-5 h-5 text-rose-500 dark:text-violet-400" />
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
                  ? "bg-rose-100 text-rose-600 dark:bg-violet-500/20 dark:text-violet-300"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark"
              ? <Sun className="w-4 h-4 text-amber-400" />
              : <Moon className="w-4 h-4 text-gray-600" />
            }
          </button>
          <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </Link>
        </div>
      </div>
    </header>
  );
}
