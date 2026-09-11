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
    <nav className="sticky bottom-0 z-30 border-t border-[var(--hairline)] bg-white/95 px-2 pb-3 pt-0 backdrop-blur-md">
      <div className="flex items-stretch">
        {tabs.map((t) => {
          const active = path === t.to || path.startsWith(t.to + "/");
          const Icon = t.icon;
          return (
            <Link key={t.to} to={t.to} className="flex flex-1 flex-col items-center">
              <span
                className={`h-[2px] w-8 rounded-b-full ${
                  active ? "bg-[var(--emerald)]" : "bg-transparent"
                }`}
              />
              <span className="relative mt-2">
                <Icon
                  size={20}
                  strokeWidth={active ? 2.3 : 1.7}
                  className={active ? "text-[var(--emerald)]" : "text-[var(--slate)]"}
                />
                {t.to === "/cart" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 min-w-[15px] rounded-full bg-[var(--emerald)] px-1 text-center text-[9px] font-extrabold leading-[15px] text-white">
                    {count}
                  </span>
                )}
              </span>
              <span
                className={`mt-1 text-[10px] font-bold tracking-[-0.01em] ${
                  active ? "text-[var(--emerald)]" : "text-[var(--slate)]"
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
