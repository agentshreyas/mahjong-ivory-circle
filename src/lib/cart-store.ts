import { useEffect, useState } from "react";
import { byId, products } from "./store-data";

const KEY = "greengrocer.cart";
const listeners = new Set<() => void>();
let cart: Record<string, number> = {};
let loaded = false;

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    cart = JSON.parse(window.localStorage.getItem(KEY) || "{}");
  } catch {
    cart = {};
  }
}

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(cart));
  }
  listeners.forEach((l) => l());
}

export function setQty(id: string, qty: number) {
  load();
  if (qty <= 0) delete cart[id];
  else cart[id] = qty;
  persist();
}

export function clearCart() {
  cart = {};
  persist();
}

export function useCart() {
  const [snapshot, setSnapshot] = useState<Record<string, number>>({});

  useEffect(() => {
    load();
    setSnapshot({ ...cart });
    const l = () => setSnapshot({ ...cart });
    listeners.add(l);
    return () => listeners.delete(l);
  }, []);

  const lines = Object.entries(snapshot)
    .map(([id, qty]) => ({ product: byId(id), qty }))
    .filter((l): l is { product: (typeof products)[number]; qty: number } => !!l.product);

  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const saved = lines.reduce((s, l) => s + (l.product.mrp - l.product.price) * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return { qty: snapshot, lines, total, saved, count, setQty, clearCart };
}
