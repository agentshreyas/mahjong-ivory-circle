import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Truck } from "lucide-react";
import { Screen } from "@/components/store/screen";
import { previouslyOrdered, trending } from "@/lib/store-data";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My orders — GreenBasket" },
      { name: "description", content: "Track your live order and revisit previous baskets." },
      { property: "og:title", content: "My orders — GreenBasket" },
      { property: "og:description", content: "Track your live order and revisit previous baskets." },
    ],
  }),
  component: Orders,
});

const steps = ["Order placed", "Packed", "Out for delivery", "Delivered"];

function Orders() {
  return (
    <Screen>
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-[var(--emerald)] px-4 pb-4 pt-4">
        <Link to="/profile" aria-label="Back">
          <ArrowLeft size={18} className="text-white" />
        </Link>
        <h1 className="text-[18px] font-extrabold tracking-[-0.03em] text-white">My orders</h1>
      </header>

      <div className="px-4 pt-4">
        <div className="card-soft p-4">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-[var(--emerald)]" />
            <p className="kicker text-[var(--emerald)]">Arriving in 8 mins</p>
          </div>
          <p className="mt-1 text-[14px] font-extrabold tracking-[-0.02em] text-[var(--ink)]">
            Order #GB4821 · 6 items · ₹742
          </p>
          <div className="mt-3 space-y-2.5">
            {steps.map((s, i) => {
              const done = i < 3;
              return (
                <div key={s} className="flex items-center gap-2.5">
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full ${
                      done ? "bg-[var(--emerald)]" : "bg-[var(--soft)]"
                    }`}
                  >
                    {done && <Check size={11} className="text-white" strokeWidth={3} />}
                  </span>
                  <span
                    className={`text-[12px] font-bold ${
                      done ? "text-[var(--ink)]" : "text-[var(--slate)]"
                    }`}
                  >
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 px-4 pb-6">
        <h2 className="text-[15px] font-extrabold tracking-[-0.03em] text-[var(--emerald-deep)]">
          Previous orders
        </h2>
        <div className="mt-3 space-y-2.5">
          {[
            { id: "GB4712", date: "12 Sep", items: previouslyOrdered, amount: 486 },
            { id: "GB4590", date: "4 Sep", items: trending.slice(0, 3), amount: 1215 },
          ].map((o) => (
            <div key={o.id} className="rounded-[16px] bg-white p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[12.5px] font-extrabold text-[var(--ink)]">#{o.id}</p>
                <p className="kicker text-[var(--emerald)]">Delivered · {o.date}</p>
              </div>
              <p className="mt-1 text-[11.5px] font-semibold text-[var(--slate)]">
                {o.items.map((i) => i.name).join(", ")}
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-[var(--ink)]">₹{o.amount}</span>
                <span className="kicker rounded-[9px] border border-[var(--emerald)] px-3 py-2 text-[var(--emerald)]">
                  Reorder
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
