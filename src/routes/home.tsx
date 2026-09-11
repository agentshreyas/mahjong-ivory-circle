import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clock } from "lucide-react";
import { Screen } from "@/components/store/screen";
import { StoreHeader } from "@/components/store/store-header";
import { ProductCard } from "@/components/store/product-card";
import { SmartImage } from "@/components/store/smart-image";
import { categories, brands, trending, previouslyOrdered, products } from "@/lib/store-data";
import { useCart } from "@/lib/cart-store";
import bannerFresh from "@/assets/banner-fresh.jpg";
import bannerGifting from "@/assets/banner-gifting.jpg";
import bannerEssentials from "@/assets/banner-essentials.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — GreenBasket groceries" },
      {
        name: "description",
        content: "Reorder your essentials, shop trending deals and track your live order.",
      },
      { property: "og:title", content: "Home — GreenBasket groceries" },
      {
        property: "og:description",
        content: "Reorder your essentials, shop trending deals and track your live order.",
      },
    ],
  }),
  component: HomeScreen,
});

function SectionHead({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-end justify-between px-4">
      <h2 className="text-[16px] font-extrabold tracking-[-0.03em] text-[var(--emerald-deep)]">
        {title}
      </h2>
      {action && (
        <span className="kicker flex items-center gap-0.5 text-[var(--emerald)]">
          {action} <ChevronRight size={11} />
        </span>
      )}
    </div>
  );
}

function Rail({ children }: { children: React.ReactNode }) {
  return (
    <div className="no-bar mt-3 flex gap-3 overflow-x-auto px-4 pb-1">{children}</div>
  );
}

function HomeScreen() {
  const { total, count } = useCart();

  return (
    <Screen>
      <StoreHeader />

      {/* Live order tracker */}
      <div className="px-4 pt-4">
        <div className="card-soft flex items-center gap-3 p-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-[var(--soft)]">
            <Clock size={18} className="text-[var(--emerald)]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="kicker text-[var(--emerald)]">Arriving in 8 mins</p>
            <p className="mt-0.5 truncate text-[13px] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
              Order #GB4821 · 6 items
            </p>
            <div className="mt-2 h-[4px] w-full overflow-hidden rounded-full bg-[var(--soft)]">
              <div className="h-full w-[68%] rounded-full bg-[var(--emerald)]" />
            </div>
          </div>
          <span className="kicker shrink-0 rounded-[9px] bg-[var(--emerald)] px-2.5 py-2 text-white">
            Track
          </span>
        </div>
      </div>

      {/* Category circles */}
      <div className="no-bar mt-5 flex gap-4 overflow-x-auto px-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/shop-by"
            className="flex w-[62px] shrink-0 flex-col items-center gap-1.5"
          >
            <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-[var(--soft)] text-[24px]">
              {c.emoji}
            </span>
            <span className="text-center text-[10px] font-bold leading-tight text-[var(--emerald-deep)]">
              {c.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Featured banners */}
      <div className="no-bar mt-5 flex gap-3 overflow-x-auto px-4">
        {[
          { img: bannerFresh, kicker: "Fresh today", title: "Farm picks under ₹49" },
          { img: bannerEssentials, kicker: "Monthly stock-up", title: "Up to 30% off staples" },
          { img: bannerGifting, kicker: "Gifting", title: "Hampers, ready in 30 mins" },
        ].map((b) => (
          <div
            key={b.title}
            className="relative h-[128px] w-[280px] shrink-0 overflow-hidden rounded-[18px]"
          >
            <img
              src={b.img}
              alt={b.title}
              loading="lazy"
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--emerald-deep)]/85 via-[var(--emerald-deep)]/25 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex w-[62%] flex-col justify-center p-3.5">
              <p className="kicker text-[var(--pastel)]">{b.kicker}</p>
              <p className="mt-1 text-[16px] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                {b.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Buy it again */}
      <div className="mt-6">
        <SectionHead title="Buy it again" action="All orders" />
        <Rail>
          {previouslyOrdered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Rail>
      </div>

      {/* Trending / bestsellers */}
      <div className="mt-6">
        <SectionHead title="Trending in 560001" action="See all" />
        <Rail>
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Rail>
      </div>

      {/* Watch & shop */}
      <div className="mt-6">
        <SectionHead title="Watch & shop" />
        <Rail>
          {products.slice(8, 13).map((p) => (
            <div key={p.id} className="w-[120px] shrink-0">
              <div className="relative h-[170px] w-full overflow-hidden rounded-[14px]">
                <SmartImage
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-[10.5px] font-extrabold leading-tight text-white">{p.name}</p>
                </div>
              </div>
            </div>
          ))}
        </Rail>
      </div>

      {/* Brand circles */}
      <div className="mt-6">
        <SectionHead title="Shop by brand" action="All brands" />
        <div className="no-bar mt-3 flex gap-4 overflow-x-auto px-4">
          {brands.map((b) => (
            <Link
              key={b.id}
              to="/shop-by"
              className="flex w-[64px] shrink-0 flex-col items-center gap-1.5"
            >
              <span className="grid h-[58px] w-[58px] place-items-center rounded-full bg-white text-[13px] font-extrabold text-[var(--emerald-deep)]">
                {b.name.slice(0, 2)}
              </span>
              <span className="text-center text-[10px] font-bold text-[var(--emerald-deep)]">
                {b.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Offer strip */}
      <div className="mt-6 px-4">
        <div className="rounded-[16px] bg-[var(--soft)] p-4">
          <p className="kicker text-[var(--emerald)]">Loyalty</p>
          <p className="mt-1 text-[15px] font-extrabold tracking-[-0.03em] text-[var(--emerald-deep)]">
            420 points · ₹210 off your next basket
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-7 bg-[var(--emerald-deep)] px-4 py-7">
        <p className="text-[17px] font-extrabold tracking-[-0.03em] text-white">GreenBasket</p>
        <p className="mt-1.5 text-[11.5px] font-semibold leading-relaxed text-[var(--mint)]">
          Groceries, fresh produce and daily essentials delivered across your city.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-y-2">
          {["About us", "Careers", "Help centre", "Terms of use", "Privacy policy", "Contact"].map(
            (l) => (
              <span key={l} className="text-[11.5px] font-semibold text-white/70">
                {l}
              </span>
            ),
          )}
        </div>
      </footer>

      {/* Floating cart bar */}
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
