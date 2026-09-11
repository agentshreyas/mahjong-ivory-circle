import { Baby, Cookie, CupSoda, Leaf, Milk, Sparkles, SprayCan, Wheat } from "lucide-react";

const map = {
  leaf: Leaf,
  milk: Milk,
  wheat: Wheat,
  cookie: Cookie,
  cup: CupSoda,
  spray: SprayCan,
  sparkles: Sparkles,
  baby: Baby,
} as const;

export function CategoryIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = map[name as keyof typeof map] ?? Leaf;
  return <Icon size={size} strokeWidth={1.9} className="text-[var(--emerald)]" />;
}
