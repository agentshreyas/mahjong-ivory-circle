import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { z } from "zod";
import { getProduct, products, type Product } from "@/lib/products";

const searchSchema = z.object({ id: z.string().optional() });

export const Route = createFileRoute("/product")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "A piece from the Circle collection" }] }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useSearch();
  const product: Product = (id && getProduct(id)) || products[0];
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== idx) setIdx(i);
  };

  return (
    <Screen back eyebrow="Gaurav Gupta ∞ HSBC" title={product.name}>
      <div className="pb-8">
        {/* Carousel */}
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {product.images.map((src, i) => (
              <div key={i} className="min-w-full snap-center px-5">
                <div className="overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/50">
                  <img
                    src={src}
                    alt={`${product.name} — image ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {product.images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-5 bg-[var(--ink)]" : "w-1.5 bg-[var(--ink)]/25"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pt-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">
            Gaurav Gupta ∞ HSBC
          </p>
          <h1 className="mt-2 font-display text-[26px] font-medium leading-tight text-[var(--ink)]">
            {product.name}
          </h1>
          <p className="mt-1.5 text-[13px] text-[var(--taupe)]">{product.tagline}</p>
          <div className="gold-rule my-4 w-24" />
          <p className="text-[13px] leading-relaxed text-[var(--taupe)]">{product.description}</p>
        </div>

        <div className="mt-6 px-6">
          <h3 className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">
            The Piece
          </h3>
          <dl className="mt-3 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {product.details.map((d) => (
              <div key={d.label} className="flex items-start justify-between gap-6 py-3">
                <dt className="text-[12px] uppercase tracking-[0.12em] text-[var(--taupe)]">
                  {d.label}
                </dt>
                <dd className="text-right text-[13px] text-[var(--ink)]">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 flex items-baseline justify-between px-6">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">
            Atelier price
          </span>
          <span className="font-display text-[18px] text-[var(--ink)]">{product.price}</span>
        </div>

        <div className="mt-4 space-y-3 px-5">
          <button className="flex w-full items-center justify-between rounded-2xl bg-[var(--ink)] px-5 py-3.5 text-[13px] text-[var(--ivory)] transition active:bg-black">
            <span>Register interest with our concierge</span>
            <ChevronRight size={16} />
          </button>
          <Link
            to="/collection"
            className="block text-center text-[11px] uppercase tracking-[0.18em] text-[var(--taupe)]"
          >
            Back to the collection
          </Link>
        </div>

        <p className="mt-6 text-center text-[11px] text-[var(--taupe)]">
          A display piece for members. No checkout in the app.
        </p>
      </div>
    </Screen>
  );
}
