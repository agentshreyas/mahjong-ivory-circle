import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { Screen } from "@/components/store/screen";
import { SmartImage } from "@/components/store/smart-image";
import { AddButton } from "@/components/store/product-card";
import { useCart } from "@/lib/cart-store";
import { useUser } from "@/lib/user-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Tata NutriKorner" },
      { name: "description", content: "Review your basket, savings and delivery address." },
      { property: "og:title", content: "Your cart — Tata NutriKorner" },
      { property: "og:description", content: "Review your basket, savings and delivery address." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { lines, total, saved, count } = useCart();
  const user = useUser();

  return (
    <Screen>
      <header className="sticky top-0 z-20 bg-[var(--emerald)] px-4 pb-4 pt-4">
        <h1 className="text-[20px] font-extrabold tracking-[-0.03em] text-white">Your cart</h1>
        <p className="kicker mt-1 text-[var(--pastel)]">
          {count} item{count === 1 ? "" : "s"} · delivering to {user.pincode}
        </p>
      </header>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
          <ShoppingCart size={34} className="text-[var(--emerald)]/60" />
          <p className="mt-4 text-[15px] font-extrabold tracking-[-0.02em] text-[var(--emerald-deep)]">
            Your cart is empty
          </p>
          <p className="mt-1.5 text-[12px] font-semibold text-[var(--emerald-deep)]/70">
            Add a few essentials and they&apos;ll show up here.
          </p>
          <Link
            to="/home"
            className="kicker mt-6 rounded-[9px] bg-[var(--emerald)] px-4 py-3 text-white"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-2.5 px-4 pt-4">
            {lines.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 rounded-[16px] bg-white p-2.5">
                <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[11px]">
                  <SmartImage
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
                    {product.name}
                  </p>
                  <p className="text-[10.5px] font-semibold text-[var(--slate)]">{product.pack}</p>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[13px] font-extrabold text-[var(--ink)]">
                        ₹{product.price * qty}
                      </span>
                      {product.mrp > product.price && (
                        <span className="text-[10px] font-semibold text-[var(--slate)] line-through">
                          ₹{product.mrp * qty}
                        </span>
                      )}
                    </div>
                    <div className="w-[78px]">
                      <AddButton product={product} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 px-4">
            <div className="card-soft p-4">
              <p className="kicker text-[var(--emerald)]">Bill summary</p>
              <Row label="Item total" value={`₹${total}`} />
              <Row label="Delivery fee" value="FREE" />
              <Row label="Handling" value="₹9" />
              <div className="my-2.5 h-px bg-[var(--hairline)]" />
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-extrabold text-[var(--ink)]">To pay</span>
                <span className="text-[15px] font-extrabold text-[var(--ink)]">₹{total + 9}</span>
              </div>
              <p className="mt-2 rounded-[9px] bg-[var(--soft)] px-2.5 py-1.5 text-[11px] font-extrabold text-[var(--emerald-deep)]">
                You save ₹{saved} on this order
              </p>
            </div>
          </div>

          <div className="mt-4 px-4 pb-4">
            <div className="rounded-[16px] bg-white p-3.5">
              <p className="kicker text-[var(--emerald)]">Delivery address</p>
              <p className="mt-1 text-[12.5px] font-bold text-[var(--ink)]">{user.address}</p>
              <p className="text-[11.5px] font-semibold text-[var(--slate)]">{user.pincode}</p>
            </div>
          </div>

          <div className="sticky bottom-[74px] z-20 mx-4 mb-2 flex items-center justify-between rounded-[14px] bg-[var(--emerald)] px-4 py-3 shadow-[0_14px_30px_-12px_rgba(7,81,58,0.7)]">
            <div>
              <p className="kicker text-[var(--pastel)]">Total</p>
              <p className="text-[14px] font-extrabold text-white">₹{total + 9}</p>
            </div>
            <span className="kicker rounded-[9px] bg-[var(--ground)] px-3.5 py-2.5 text-[var(--emerald-deep)]">
              Checkout
            </span>
          </div>
        </>
      )}
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex items-center justify-between">
      <span className="text-[12px] font-semibold text-[var(--slate)]">{label}</span>
      <span className="text-[12px] font-bold text-[var(--ink)]">{value}</span>
    </div>
  );
}
