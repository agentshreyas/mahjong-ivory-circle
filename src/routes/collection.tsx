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
      <section className="px-8 pt-8 pb-12">
        <div className="mx-auto flex max-w-[320px] items-center justify-between">
          <span className="font-display text-[19px] font-normal leading-none tracking-tight text-[var(--ink)]">
            Gaurav Gupta
          </span>
          <InfinityIcon
            size={20}
            strokeWidth={1.25}
            className="text-[var(--gold)]"
            aria-hidden
          />
          <span className="font-display text-[19px] font-normal leading-none tracking-tight text-[var(--hsbc)]">
            HSBC
          </span>
        </div>

        <div className="mt-10 flex justify-center">
          <span className="border border-[var(--hairline)] px-3 py-1 text-[9px] uppercase tracking-[0.32em] text-[var(--taupe)]">
            A capsule for the Circle
          </span>
        </div>

        <div className="mx-auto mt-10 h-px w-10 bg-[var(--hairline)]" />

        <p className="mx-auto mt-10 max-w-[280px] text-center text-[14px] leading-[1.7] text-[var(--taupe)]/90">
          Two Mahjong boxes, made to order. Each celebrates the geometry of the tile —
          one ceremonial, one made to travel.
        </p>
      </section>

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
