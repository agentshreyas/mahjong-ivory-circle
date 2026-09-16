import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CalendarDays, User } from "lucide-react";
import hsbcLogo from "@/assets/hsbc-logo.png.asset.json";
import tileLogo from "@/assets/mahjong-tile-logo.png";

function MahjongTile({ className }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <img
      src={tileLogo}
      alt="Mahjong tile"
      width={20}
      height={20}
      className={`h-5 w-5 object-contain ${className ?? ""}`}
    />
  );
}

const leftTabs = [
  { to: "/home", label: "Explore", icon: Home },
  { to: "/events", label: "Events", icon: CalendarDays },
] as const;

const rightTabs = [
  { to: "/play", label: "Rooms", icon: MahjongTile },
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
          className={`flex flex-1 flex-col items-center justify-center gap-1 py-1 ${
            premierActive ? "brightness-110" : ""
          }`}
        >
          <img src={hsbcLogo.url} alt="HSBC" className="h-5 w-auto" />
          <span
            className={`text-[10px] tracking-wide whitespace-nowrap ${
              premierActive ? "text-[var(--hsbc)] font-medium" : "text-[var(--hsbc)]/80"
            }`}
          >
            hsbc-premier
          </span>
        </Link>

        {rightTabs.map((t) => renderTab(t, path))}
      </div>
    </nav>
  );
}

function renderTab(t: { to: string; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> }, path: string) {
  const active = path === t.to || path.startsWith(t.to + "/");
  const Icon = t.icon;
  return (
    <Link key={t.to} to={t.to} className="flex flex-1 flex-col items-center gap-1 py-1">
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
