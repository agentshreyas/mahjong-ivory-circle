import { Star } from "lucide-react";
import { discountOf, type Product } from "@/lib/store-data";
import { useCart } from "@/lib/cart-store";
import { SmartImage } from "./smart-image";

export function AddButton({ product }: { product: Product }) {
  const { qty, setQty } = useCart();
  const n = qty[product.id] || 0;

  if (n === 0) {
    return (
      <button
        onClick={() => setQty(product.id, 1)}
        className="w-full rounded-[9px] border border-[var(--emerald)] bg-white py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[var(--emerald)] active:bg-[var(--soft)]"
      >
        Add
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between rounded-[9px] bg-[var(--emerald)] px-2 py-1.5 text-white">
      <button
        aria-label="Decrease"
        onClick={() => setQty(product.id, n - 1)}
        className="px-1.5 text-[15px] font-extrabold leading-none"
      >
        −
      </button>
      <span className="text-[12px] font-extrabold">{n}</span>
      <button
        aria-label="Increase"
        onClick={() => setQty(product.id, n + 1)}
        className="px-1.5 text-[15px] font-extrabold leading-none"
      >
        +
      </button>
    </div>
  );
}

export function ProductCard({ product, wide }: { product: Product; wide?: boolean }) {
  const off = discountOf(product);
  return (
    <div
      className={`overflow-hidden rounded-[16px] bg-white ${wide ? "" : "w-[150px] shrink-0"}`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <SmartImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {off > 0 && (
          <div className="absolute left-0 top-0 rounded-br-[10px] bg-[var(--emerald-deep)] px-1.5 py-1 text-center">
            <p className="text-[11px] font-extrabold leading-none text-[var(--pastel)]">{off}%</p>
            <p className="kicker mt-0.5 text-[7px] text-white/80">off</p>
          </div>
        )}
      </div>
      <div className="p-2.5">
        <span className="inline-flex items-center gap-1 rounded-[6px] bg-[var(--soft)] px-1.5 py-0.5 text-[10px] font-extrabold text-[var(--emerald-deep)]">
          <Star size={9} className="fill-current" /> {product.rating}
        </span>
        <span className="ml-1 text-[10px] font-semibold text-[var(--slate)]">
          ({product.ratingCount})
        </span>
        <p className="mt-1 line-clamp-2 text-[12.5px] font-extrabold leading-tight tracking-[-0.02em] text-[var(--ink)]">
          {product.name}
        </p>
        <p className="mt-0.5 text-[10.5px] font-semibold text-[var(--slate)]">{product.pack}</p>
        <div className="mt-2 flex items-end justify-between gap-2">
          <div>
            <p className="text-[13px] font-extrabold text-[var(--ink)]">₹{product.price}</p>
            {product.mrp > product.price && (
              <p className="text-[10px] font-semibold text-[var(--slate)] line-through">
                ₹{product.mrp}
              </p>
            )}
          </div>
          <div className="w-[62px]">
            <AddButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
