import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Package } from "lucide-react";
import { Screen } from "@/components/store/screen";
import { StoreHeader } from "@/components/store/store-header";
import { ProductCard } from "@/components/store/product-card";
import { SmartImage } from "@/components/store/smart-image";
import { CategoryIcon } from "@/components/store/category-icon";
import { categories, brands, trending, previouslyOrdered, products } from "@/lib/store-data";
import { useCart } from "@/lib/cart-store";
import bannerFresh from "@/assets/banner-fresh.jpg";
import bannerGifting from "@/assets/banner-gifting.jpg";
import bannerEssentials from "@/assets/banner-essentials.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Tata NutriKorner" },
      {
        name: "description",
        content:
          "Reorder Tata Sampann, Tata Salt and Tata Tea essentials, shop today's offers and track your live order.",
      },
      { property: "og:title", content: "Home — Tata NutriKorner" },
      {
        property: "og:description",
        content: "Reorder Tata essentials, shop offers and track your live order.",
      },
    ],
  }),
  component: HomeScreen,
});

function SectionHead({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between px-4">
      <h2 className="text-[15px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">{title}</h2>
      {action && (
        <span className="flex items-center gap-0.5 text-[11px] font-extrabold text-[var(--emerald)]">
          {action} <ChevronRight size={12} />
        </span>
      )}
    </div>
  );
}

function Rail({ children }: { children: React.ReactNode }) {
  return <div className="no-bar mt-3 flex gap-2.5 overflow-x-auto px-4 pb-1">{children}</div>;
}

function HomeScreen() {
  const { total, count } = useCart();

  return (
    <Screen>
      <StoreHeader />

      {/* Live order tracker */}
      <div className="px-4 pt-3.5">
        <div className="card-soft flex items-center gap-3 p-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[var(--soft)]">
            <Package size={17} className="text-[var(--emerald)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12.5px] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
              Arriving in 8 minutes
            </p>
            <p className="mt-0.5 truncate text-[10.5px] font-semibold text-[var(--slate)]">
              Order #TNK4821 · 6 items · rider on the way
            </p>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[var(--hairline)]">
              <div className="h-full w-[68%] rounded-full bg-[var(--emerald)]" />
            </div>
          </div>
          <span className="shrink-0 rounded-[8px] bg-[var(--emerald)] px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.08em] text-white">
            Track
          </span>
        </div>
      </div>

      {/* Category grid */}
      <div className="mt-4 px-4">
        <div className="grid grid-cols-4 gap-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/shop-by"
              className="flex flex-col items-center gap-1.5 rounded-[12px] border border-[var(--hairline)] bg-white px-1 py-2.5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--soft)]">
                <CategoryIcon name={c.icon} size={19} />
              </span>
              <span className="text-center text-[9.5px] font-bold leading-tight text-[var(--ink)]">
                {c.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured banners */}
      <div className="no-bar mt-4 flex gap-2.5 overflow-x-auto px-4">
        {[
          { img: bannerFresh, kicker: "Tata Sampann", title: "Unpolished dals, up to 20% off" },
          { img: bannerEssentials, kicker: "Monthly stock-up", title: "Atta, rice & salt combos" },
          { img: bannerGifting, kicker: "Tata Soulfull", title: "Millet breakfast, new packs" },
        ].map((b) => (
          <div
            key={b.title}
            className="relative h-[118px] w-[272px] shrink-0 overflow-hidden rounded-[14px]"
          >
            <img
              src={b.img}
              alt={b.title}
              loading="lazy"
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex w-[64%] flex-col justify-center p-3.5">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/80">
                {b.kicker}
              </p>
              <p className="mt-1 text-[15px] font-extrabold leading-[1.15] tracking-[-0.03em] text-white">
                {b.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Buy it again */}
      <div className="mt-5">
        <SectionHead title="Buy it again" action="All orders" />
        <Rail>
          {previouslyOrdered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Rail>
      </div>

      {/* Trending / bestsellers */}
      <div className="mt-5">
        <SectionHead title="Bestsellers near you" action="See all" />
        <Rail>
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Rail>
      </div>

      {/* Watch & shop */}
      <div className="mt-5">
        <SectionHead title="Watch & shop" />
        <Rail>
          {products.slice(8, 13).map((p) => (
            <div key={p.id} className="w-[116px] shrink-0">
              <div className="relative h-[164px] w-full overflow-hidden rounded-[12px]">
                <SmartImage src={p.image} alt={p.name} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2">
                  <p className="line-clamp-2 text-[10px] font-bold leading-tight text-white">
                    {p.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Rail>
      </div>

      {/* Brand rail */}
      <div className="mt-5">
        <SectionHead title="Tata brands" action="All brands" />
        <div className="no-bar mt-3 flex gap-2.5 overflow-x-auto px-4">
          {brands.map((b) => (
            <Link
              key={b.id}
              to="/shop-by"
              className="flex w-[104px] shrink-0 flex-col items-center gap-1.5 rounded-[12px] border border-[var(--hairline)] bg-white px-2 py-3"
            >
              <span className="grid h-9 w-full place-items-center rounded-[8px] bg-[var(--tata-blue)] text-[10px] font-extrabold tracking-[0.16em] text-white">
                TATA
              </span>
              <span className="text-center text-[10px] font-bold leading-tight text-[var(--ink)]">
                {b.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Loyalty strip */}
      <div className="mt-5 px-4">
        <div className="rounded-[14px] bg-[var(--emerald-deep)] p-4">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--pastel)]">
            NutriPoints
          </p>
          <p className="mt-1 text-[14.5px] font-extrabold tracking-[-0.03em] text-white">
            420 points · ₹210 off your next basket
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 border-t border-[var(--hairline)] bg-white px-4 py-6">
        <p className="text-[15px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
          Tata NutriKorner
        </p>
        <p className="mt-1.5 text-[11px] font-semibold leading-relaxed text-[var(--slate)]">
          Tata Sampann, Tata Salt, Tata Tea, Tata Soulfull and Himalayan essentials, delivered across
          your city in minutes.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-y-2">
          {["About us", "Careers", "Help centre", "Terms of use", "Privacy policy", "Contact"].map(
            (l) => (
              <span key={l} className="text-[11px] font-semibold text-[var(--slate)]">
                {l}
              </span>
            ),
          )}
        </div>
        <p className="mt-4 text-[9.5px] font-semibold leading-relaxed text-[var(--slate)]/70">
          Prototype for demonstration. Brand names and products are shown for illustration only.
        </p>
      </footer>

      {/* Floating cart bar */}
      {count > 0 && (
        <div className="sticky bottom-[76px] z-20 mx-4 mb-2 flex items-center justify-between rounded-[12px] bg-[var(--emerald)] px-4 py-2.5 shadow-[0_14px_30px_-14px_rgba(11,110,79,0.8)]">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--pastel)]">
              {count} item{count > 1 ? "s" : ""}
            </p>
            <p className="text-[14px] font-extrabold text-white">₹{total}</p>
          </div>
          <Link
            to="/cart"
            className="rounded-[9px] bg-white px-3.5 py-2 text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[var(--emerald)]"
          >
            Checkout
          </Link>
        </div>
      )}
    </Screen>
  );
}
