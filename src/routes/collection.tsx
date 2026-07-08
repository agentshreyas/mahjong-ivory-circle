import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { ChevronRight, Infinity as InfinityIcon } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/collection")({
  head: () => ({ meta: [{ title: "Gaurav Gupta ∞ HSBC — The Collection" }] }),
  component: Collection,
});

function Collection() {
  return (
    <Screen hideTop={false} eyebrow="" title="">
      {/* Branding header */}
      <div className="px-6 pt-1 pb-5">
        <div className="flex items-center justify-center gap-3">
          <span className="font-display text-[22px] font-medium tracking-tight text-[var(--ink)]">
            Gaurav Gupta
          </span>
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-full border border-[var(--gold)]/60 text-[var(--gold)]"
          >
            <InfinityIcon size={14} strokeWidth={1.75} />
          </span>
          <span className="font-display text-[22px] font-medium tracking-tight text-[var(--hsbc)]">
            HSBC
          </span>
        </div>

        <div className="mt-3 flex justify-center">
          <span className="rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[var(--taupe)]">
            A capsule for the Circle
          </span>
        </div>

        <div className="gold-rule mx-auto my-5 w-24" />

        <p className="text-center text-[13px] leading-relaxed text-[var(--taupe)]">
          Two Mahjong boxes, made to order. Each celebrates the geometry of the tile —
          one ceremonial, one made to travel.
        </p>
      </div>

      {/* Product cards */}
      <div className="space-y-8 px-5 pb-6">
        {products.map((p) => (
          <Link
            key={p.id}
            to="/product"
            search={{ id: p.id }}
            className="group block"
            aria-label={`${p.name} — view details`}
          >
            <article>
              <div className="relative overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/50">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-active:scale-[1.01]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-[var(--ivory)]/90 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[var(--taupe)] backdrop-blur">
                  {p.images.length} images
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-[20px] leading-tight text-[var(--ink)]">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[12px] text-[var(--taupe)]">{p.tagline}</p>
                </div>
                <p className="shrink-0 font-display text-[14px] text-[var(--ink)]">{p.price}</p>
              </div>
              <div className="mt-4 flex w-full items-center justify-between rounded-2xl border border-[var(--ink)]/15 bg-transparent px-4 py-3 text-[13px] text-[var(--ink)] transition group-active:bg-[var(--sand)]">
                <span>View the piece</span>
                <ChevronRight size={16} />
              </div>
            </article>
          </Link>
        ))}

        <p className="pt-2 text-center text-[11px] text-[var(--taupe)]">
          Display only. Concierge enquiries within the app.
        </p>
      </div>
    </Screen>
  );
}
