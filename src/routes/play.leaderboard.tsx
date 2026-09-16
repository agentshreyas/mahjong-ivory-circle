import { createFileRoute } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { Screen } from "@/components/app/screen";

export const Route = createFileRoute("/play/leaderboard")({
  head: () => ({
    meta: [
      { title: "Top Circleites — Mahjong Circle" },
      {
        name: "description",
        content: "This month's leading Circleites across the Mahjong Circle.",
      },
      { property: "og:title", content: "Top Circleites — Mahjong Circle" },
      {
        property: "og:description",
        content: "This month's leading Circleites across the Mahjong Circle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeaderboardPage,
});

const leaderboard = [
  { name: "Ananya R.", city: "Mumbai", points: 4820 },
  { name: "Vikram S.", city: "Delhi", points: 4510 },
  { name: "Meher K.", city: "Bengaluru", points: 4295 },
  { name: "Rohan D.", city: "Mumbai", points: 3980 },
  { name: "Ishita M.", city: "Kolkata", points: 3745 },
];

function LeaderboardPage() {
  return (
    <Screen eyebrow="The Circle" title="Top Circleites">
      <section className="px-6 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Trophy size={16} strokeWidth={1.5} className="text-[var(--gold)]" />
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--taupe)]">
            This month
          </p>
        </div>

        <ol className="mt-5 divide-y divide-[var(--hairline)] overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/40">
          {leaderboard.map((p, i) => (
            <li key={p.name} className="flex items-center gap-4 px-5 py-4">
              <span
                className={`w-5 text-[13px] tabular-nums ${
                  i === 0 ? "text-[var(--hsbc)] font-medium" : "text-[var(--taupe)]"
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] text-[var(--ink)]">{p.name}</p>
                <p className="text-[11px] text-[var(--taupe)]">{p.city}</p>
              </div>
              <span className="text-[13px] tabular-nums text-[var(--ink)]">
                {p.points.toLocaleString("en-IN")}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </Screen>
  );
}
