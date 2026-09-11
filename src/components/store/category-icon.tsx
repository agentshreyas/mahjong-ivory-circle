import {
  Bean,
  Coffee,
  Cookie,
  Droplet,
  Flame,
  HeartPulse,
  Salad,
  Wheat,
} from "lucide-react";

const map = {
  wheat: Wheat,
  beans: Bean,
  flame: Flame,
  cup: Coffee,
  salt: Salad,
  heart: HeartPulse,
  droplet: Droplet,
  cookie: Cookie,
} as const;

export function CategoryIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = map[name as keyof typeof map] ?? Wheat;
  return <Icon size={size} strokeWidth={1.8} className="text-[var(--emerald)]" />;
}
