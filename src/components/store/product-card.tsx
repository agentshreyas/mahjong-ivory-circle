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
        className="w-full rounded-[9px] bg-[var(--soft)] py-[7px] text-[11px] font-extrabold uppercase tracking-[0.08em] text-[var(--emerald)] active:scale-[0.97]"
      >
        Add
      </button>
    );
  }

  return (
    <div className="flex w-full items-center justify-between rounded-[9px] bg-[var(--emerald)] px-1.5 py-[6px] text-white">
      <button
        aria-label="Decrease"
        onClick={() => setQty(product.id, n - 1)}
        className="px-1.5 text-[14px] font-extrabold leading-none"
      >
        −
      </button>
      <span className="text-[12px] font-extrabold">{n}</span>
      <button
        aria-label="Increase"
        onClick={() => setQty(product.id, n + 1)}
        className="px-1.5 text-[14px] font-extrabold leading-none"
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
      className={`overflow-hidden rounded-[12px] border border-[var(--hairline)] bg-white ${
        wide ? "" : "w-[142px] shrink-0"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6f7f6]">
        <SmartImage
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {off > 0 && (
          <span className="absolute left-0 top-0 rounded-br-[9px] bg-[var(--tata-blue)] px-1.5 py-[3px] text-[9.5px] font-extrabold uppercase tracking-[0.06em] text-white">
            {off}% off
          </span>
        )}
        <span className="absolute bottom-1.5 left-1.5 rounded-[5px] bg-white/92 px-1.5 py-[2px] text-[8.5px] font-extrabold uppercase tracking-[0.1em] text-[var(--slate)]">
          9 min
        </span>
      </div>
      <div className="p-2">
        <p className="line-clamp-2 min-h-[30px] text-[12px] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--ink)]">
          {product.name}
        </p>
        <p className="mt-1 text-[10.5px] font-semibold text-[var(--slate)]">{product.pack}</p>
        <p className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[var(--slate)]">
          <Star size={9} className="fill-[var(--emerald)] text-[var(--emerald)]" />
          {product.rating}
          <span className="font-semibold text-[var(--slate)]/70">({product.ratingCount})</span>
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[13px] font-extrabold leading-none text-[var(--ink)]">
              ₹{product.price}
            </p>
            {product.mrp > product.price && (
              <p className="mt-0.5 text-[10px] font-semibold text-[var(--slate)] line-through">
                ₹{product.mrp}
              </p>
            )}
          </div>
          <div className="w-[60px] shrink-0">
            <AddButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
