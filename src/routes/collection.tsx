import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { ChevronRight } from "lucide-react";
import gg1 from "@/assets/gg-look-1.jpg";
import gg2 from "@/assets/gg-look-2.jpg";
import gg3 from "@/assets/gg-look-3.jpg";

export const Route = createFileRoute("/collection")({
  head: () => ({ meta: [{ title: "The Gaurav Gupta Collection" }] }),
  component: Collection,
});

const looks = [
  {
    img: gg1,
    name: "The Tile Gown",
    note: "Hand‑embroidered, in champagne silk",
    price: "₹ On request",
  },
  {
    img: gg2,
    name: "The Tile Minaudière",
    note: "Resin and brass · atelier piece",
    price: "₹ 4,80,000",
  },
  {
    img: gg3,
    name: "The Wallet Line",
    note: "Soft calf, jade and ivory",
    price: "₹ 1,20,000",
  },
];

function Collection() {
  return (
    <Screen eyebrow="A Capsule" title="Gaurav Gupta">
      <div className="px-6 pt-2 pb-5">
        <h1 className="font-display text-[30px] font-medium leading-tight text-[var(--ink)]">
          A capsule for the Circle.
        </h1>
        <div className="gold-rule my-4 w-24" />
        <p className="text-[13px] leading-relaxed text-[var(--taupe)]">
          A small collection — couture, accessories, a wallet line — celebrating the geometry of
          the tile. Each piece is made to order in the atelier.
        </p>
      </div>

      <div className="space-y-8 px-5 pb-6">
        {looks.map((l, i) => (
          <article key={l.name}>
            <div className="relative overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/50">
              <img src={l.img} alt={l.name} loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-display text-[20px] leading-tight text-[var(--ink)]">{l.name}</h3>
                <p className="mt-1 text-[12px] text-[var(--taupe)]">{l.note}</p>
              </div>
              <p className="shrink-0 font-display text-[14px] text-[var(--ink)]">{l.price}</p>
            </div>
            <button className="mt-4 flex w-full items-center justify-between rounded-2xl border border-[var(--ink)]/15 bg-transparent px-4 py-3 text-[13px] text-[var(--ink)] transition active:bg-[var(--sand)]">
              <span>Register interest with our concierge</span>
              <ChevronRight size={16} />
            </button>
          </article>
        ))}

        <p className="pt-2 text-center text-[11px] text-[var(--taupe)]">
          All pieces are display only. No checkout in the app.
        </p>
      </div>
    </Screen>
  );
}