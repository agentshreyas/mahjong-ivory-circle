import { Link } from "@tanstack/react-router";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useUser } from "@/lib/user-store";

export function StoreHeader({ searchPlaceholder = "Search for atta, milk, snacks…" }: { searchPlaceholder?: string }) {
  const user = useUser();
  return (
    <header className="sticky top-0 z-20 bg-[var(--emerald)] px-4 pb-3 pt-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="kicker flex items-center gap-1 text-[var(--pastel)]">
            <MapPin size={11} strokeWidth={2.4} /> Delivering to {user.pincode}
          </p>
          <p className="mt-1 flex items-center gap-1 truncate text-[13px] font-bold text-white">
            <span className="truncate">{user.address}</span>
            <ChevronDown size={14} className="shrink-0 text-white/70" />
          </p>
        </div>
        <Link
          to="/profile"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--pastel)] text-[13px] font-extrabold text-[var(--emerald-deep)]"
        >
          {(user.name || "G").slice(0, 1).toUpperCase()}
        </Link>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-[11px] bg-white px-3 py-2.5">
        <Search size={16} className="text-[var(--slate)]" />
        <input
          placeholder={searchPlaceholder}
          className="w-full bg-transparent text-[13px] font-semibold text-[var(--ink)] outline-none placeholder:font-medium placeholder:text-[var(--slate)]"
        />
      </div>
    </header>
  );
}
