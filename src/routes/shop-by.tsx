import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Screen } from "@/components/store/screen";
import { ProductCard } from "@/components/store/product-card";
import { CategoryIcon } from "@/components/store/category-icon";
import { brands, categories, products } from "@/lib/store-data";
import { useCart } from "@/lib/cart-store";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shop-by")({
  head: () => ({
    meta: [
      { title: "Shop by category & brand — Tata NutriKorner" },
      {
        name: "description",
        content: "Browse every product available in your pincode by category or by brand.",
      },
      { property: "og:title", content: "Shop by category & brand — Tata NutriKorner" },
      {
        property: "og:description",
        content: "Browse every product available in your pincode by category or by brand.",
      },
    ],
  }),
  component: ShopBy,
});

function ShopBy() {
  const [tab, setTab] = useState<"categories" | "brands">("categories");
  const [activeCat, setActiveCat] = useState<string>(categories[0].id);
  const [activeBrand, setActiveBrand] = useState(brands[0].name);
  const [query, setQuery] = useState("");
  const [scoped, setScoped] = useState(true);
  const { total, count } = useCart();

  const activeLabel =
    tab === "categories"
      ? categories.find((c) => c.id === activeCat)?.name || ""
      : activeBrand;

  const list = useMemo(() => {
    let items = products;
    if (scoped) {
      items =
        tab === "categories"
          ? items.filter((p) => p.category === activeCat)
          : items.filter((p) => p.brand === activeBrand);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }
    return items;
  }, [tab, activeCat, activeBrand, query, scoped]);

  return (
    <Screen>
      <header className="sticky top-0 z-20 bg-[var(--emerald)] px-4 pb-3 pt-4">
        <h1 className="text-[20px] font-extrabold tracking-[-0.03em] text-white">Shop by</h1>

        <div className="mt-3 flex items-center gap-2 rounded-[11px] bg-white px-3 py-2.5">
          <Search size={16} className="text-[var(--slate)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Tata products"
            className="w-full bg-transparent text-[13px] font-semibold text-[var(--ink)] outline-none placeholder:font-medium placeholder:text-[var(--slate)]"
          />
        </div>

        {scoped && (
          <button
            onClick={() => setScoped(false)}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[var(--ground)] px-2.5 py-1"
          >
            <span className="kicker text-[var(--emerald-deep)]">in {activeLabel}</span>
            <X size={11} className="text-[var(--emerald-deep)]" />
          </button>
        )}
        {!scoped && (
          <button
            onClick={() => setScoped(true)}
            className="kicker mt-2 rounded-full bg-white/15 px-2.5 py-1 text-[var(--pastel)]"
          >
            searching all products
          </button>
        )}

        <div className="mt-3 flex rounded-[11px] bg-[var(--emerald-deep)]/50 p-1">
          {(["categories", "brands"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`kicker flex-1 rounded-[8px] py-2 ${
                tab === t ? "bg-[var(--ground)] text-[var(--emerald-deep)]" : "text-white/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1">
        {/* left rail */}
        <div className="no-bar w-[92px] shrink-0 overflow-y-auto bg-white/45 py-2">
          {tab === "categories"
            ? categories.map((c) => {
                const active = c.id === activeCat;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCat(c.id)}
                    className={`flex w-full flex-col items-center gap-1 px-1.5 py-2.5 ${
                      active ? "bg-white" : ""
                    }`}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-[var(--soft)]">
                      <CategoryIcon name={c.icon} size={19} />
                    </span>
                    <span
                      className={`text-center text-[9.5px] font-extrabold leading-tight ${
                        active ? "text-[var(--emerald)]" : "text-[var(--emerald-deep)]/70"
                      }`}
                    >
                      {c.name}
                    </span>
                  </button>
                );
              })
            : brands.map((b) => {
                const active = b.name === activeBrand;
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBrand(b.name)}
                    className={`flex w-full flex-col items-center gap-1 px-1.5 py-2.5 ${
                      active ? "bg-white" : ""
                    }`}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[12px] font-extrabold text-[var(--emerald-deep)]">
                      {b.name.slice(0, 2)}
                    </span>
                    <span
                      className={`text-center text-[9.5px] font-extrabold ${
                        active ? "text-[var(--emerald)]" : "text-[var(--emerald-deep)]/70"
                      }`}
                    >
                      {b.name}
                    </span>
                  </button>
                );
              })}
        </div>

        {/* grid */}
        <div className="flex-1 px-3 py-3">
          <p className="kicker text-[var(--emerald-deep)]/70">
            {list.length} item{list.length === 1 ? "" : "s"} in your pincode
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2.5">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} wide />
            ))}
          </div>
          {list.length === 0 && (
            <p className="mt-8 text-center text-[12px] font-semibold text-[var(--emerald-deep)]/60">
              Nothing matched. Try widening your search.
            </p>
          )}
        </div>
      </div>

      {count > 0 && (
        <div className="sticky bottom-[74px] z-20 mx-4 mb-2 flex items-center justify-between rounded-[14px] bg-[var(--emerald)] px-4 py-3 shadow-[0_14px_30px_-12px_rgba(7,81,58,0.7)]">
          <div>
            <p className="kicker text-[var(--pastel)]">
              {count} item{count > 1 ? "s" : ""}
            </p>
            <p className="text-[14px] font-extrabold text-white">₹{total}</p>
          </div>
          <Link to="/cart" className="kicker rounded-[9px] bg-[var(--pastel)] px-3.5 py-2.5 text-[var(--emerald-deep)]">
            Checkout
          </Link>
        </div>
      )}
    </Screen>
  );
}
