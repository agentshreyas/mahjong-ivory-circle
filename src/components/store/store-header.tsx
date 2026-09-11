import { Link } from "@tanstack/react-router";
import { ChevronDown, Search, Zap } from "lucide-react";
import { useUser } from "@/lib/user-store";
import { TataMark } from "./tata-mark";

export function StoreHeader({
  searchPlaceholder = 'Search "Tata Sampann atta"',
}: {
  searchPlaceholder?: string;
}) {
  const user = useUser();
  return (
    <header className="sticky top-0 z-20 bg-[var(--emerald)] px-4 pb-3 pt-3">
      <div className="flex items-center justify-between gap-3">
        <TataMark size="sm" />
        <Link
          to="/profile"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 text-[12px] font-extrabold text-white ring-1 ring-white/25"
        >
          {(user.name || "G").slice(0, 1).toUpperCase()}
        </Link>
      </div>

      <div className="mt-2.5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1 text-[16px] font-extrabold leading-none tracking-[-0.03em] text-white">
            <Zap size={14} className="fill-current text-[var(--pastel)]" />
            Delivery in 9 minutes
          </p>
          <p className="mt-1.5 flex items-center gap-1 truncate text-[11.5px] font-semibold text-white/75">
            <span className="truncate">
              {user.address} · {user.pincode}
            </span>
            <ChevronDown size={13} className="shrink-0" />
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-[11px] bg-white px-3 py-2.5 shadow-[0_6px_14px_-10px_rgba(0,0,0,0.5)]">
        <Search size={15} className="shrink-0 text-[var(--slate)]" />
        <input
          placeholder={searchPlaceholder}
          className="w-full bg-transparent text-[13px] font-semibold text-[var(--ink)] outline-none placeholder:font-medium placeholder:text-[var(--slate)]"
        />
      </div>
    </header>
  );
}
