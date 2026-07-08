import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CalendarDays, Sparkles, User } from "lucide-react";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/collection", label: "Collection", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 z-20 border-t border-[var(--hairline)] bg-[var(--ivory)]/95 px-2 pb-3 pt-2 backdrop-blur">
      <div className="flex items-stretch justify-between">
        {tabs.map((t) => {
          const active = path === t.to || path.startsWith(t.to + "/");
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="flex flex-1 flex-col items-center gap-1 py-1"
            >
              <Icon
                size={20}
                strokeWidth={active ? 2 : 1.5}
                className={active ? "text-[var(--hsbc)]" : "text-[var(--taupe)]"}
              />
              <span
                className={`text-[10px] tracking-wide ${
                  active ? "text-[var(--ink)] font-medium" : "text-[var(--taupe)]"
                }`}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}