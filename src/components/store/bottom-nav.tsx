import { Link, useRouterState } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/shop-by", label: "Shop by", icon: LayoutGrid },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  return (
    <nav className="sticky bottom-0 z-30 border-t border-[var(--hairline)]/40 bg-[var(--emerald-deep)] px-2 pb-3 pt-1">
      <div className="flex items-stretch">
        {tabs.map((t) => {
          const active = path === t.to || path.startsWith(t.to + "/");
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className="flex flex-1 flex-col items-center gap-1 pt-2">
              <span className="relative">
                <Icon
                  size={20}
                  strokeWidth={active ? 2.4 : 1.8}
                  className={active ? "text-[var(--pastel)]" : "text-white/60"}
                />
                {t.to === "/cart" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 min-w-[15px] rounded-full bg-[var(--pastel)] px-1 text-center text-[9px] font-extrabold leading-[15px] text-[var(--emerald-deep)]">
                    {count}
                  </span>
                )}
              </span>
              <span
                className={`kicker ${active ? "text-[var(--pastel)]" : "text-white/55"}`}
              >
                {t.label}
              </span>
              <span
                className={`mt-1 h-[2px] w-7 rounded-full ${
                  active ? "bg-[var(--pastel)]" : "bg-transparent"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
