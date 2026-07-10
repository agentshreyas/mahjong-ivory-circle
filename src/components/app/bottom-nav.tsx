import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CalendarDays, Sparkles, User } from "lucide-react";

// HSBC hexagon mark: red rectangle with a white horizontal hourglass ("bowtie") cut-out.
function HsbcMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 120 80"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="120" height="80" fill="#DB0011" />
      <polygon points="0,0 60,40 0,80" fill="#ffffff" />
      <polygon points="120,0 60,40 120,80" fill="#ffffff" />
    </svg>
  );
}

const leftTabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/events", label: "Events", icon: CalendarDays },
] as const;

const rightTabs = [
  { to: "/collection", label: "Collection", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const premierActive = path === "/premier" || path.startsWith("/premier/");
  return (
    <nav className="sticky bottom-8 z-20 mx-4 mb-6 rounded-full border border-[var(--hairline)] bg-[var(--ivory)]/85 px-3 py-2 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25),0_4px_12px_-6px_rgba(0,0,0,0.15)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-1">
        {leftTabs.map((t) => renderTab(t, path))}

        <Link
          to="/premier"
          aria-label="HSBC Premier"
          className={`flex flex-1 flex-col items-center gap-1 py-1 ${
            premierActive ? "brightness-110" : ""
          }`}
        >
          <HsbcMark size={20} />
          <span
            className={`text-[10px] tracking-wide ${
              premierActive ? "text-[var(--hsbc)] font-medium" : "text-[var(--hsbc)]/80"
            }`}
          >
            Premier
          </span>
        </Link>

        {rightTabs.map((t) => renderTab(t, path))}
      </div>
    </nav>
  );
}

function renderTab(
  t: { to: string; label: string; icon: typeof Home },
  path: string,
) {
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
}