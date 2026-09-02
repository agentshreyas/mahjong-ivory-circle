import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { PlusCircle, LogIn, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play — Mahjong Circle" },
      {
        name: "description",
        content:
          "Create a room, join a table, or gather your Circle — and see this month's leading Circleites.",
      },
      { property: "og:title", content: "Play — Mahjong Circle" },
      {
        property: "og:description",
        content:
          "Create a room, join a table, or gather your Circle — and see this month's leading Circleites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Play,
});

const actions = [
  { label: "Create Room", icon: PlusCircle },
  { label: "Join Room", icon: LogIn },
  { label: "My Circle", icon: Users },
] as const;

const leaderboard = [
  { name: "Ananya R.", city: "Mumbai", points: 4820 },
  { name: "Vikram S.", city: "Delhi", points: 4510 },
  { name: "Meher K.", city: "Bengaluru", points: 4295 },
  { name: "Rohan D.", city: "Mumbai", points: 3980 },
  { name: "Ishita M.", city: "Kolkata", points: 3745 },
];

function ActionOrb({ label, Icon }: { label: string; Icon: typeof PlusCircle }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-3 active:scale-[0.97] transition-transform"
      aria-label={label}
    >
      <span className="flex h-[104px] w-[104px] items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--sand)]/70 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.28)]">
        <Icon size={40} strokeWidth={1.25} className="text-[var(--hsbc)]" />
      </span>
      <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink)]">
        {label}
      </span>
    </button>
  );
}

function Play() {
  return (
    <Screen eyebrow="The Circle" title="Play">
      <section className="px-6 pt-4 pb-2 text-center">
        <p className="mx-auto max-w-[260px] text-[13px] leading-[1.65] text-[var(--taupe)]/90">
          Set a table, take a seat, or gather the ones you play with most.
        </p>
      </section>

      {/* Triangle arrangement */}
      <section className="px-6 pt-8 pb-10">
        <div className="flex justify-center">
          <ActionOrb label={actions[0].label} Icon={actions[0].icon} />
        </div>
        <div className="mt-8 flex items-start justify-center gap-8">
          <ActionOrb label={actions[1].label} Icon={actions[1].icon} />
          <ActionOrb label={actions[2].label} Icon={actions[2].icon} />
        </div>
      </section>

      <div className="mx-6 gold-rule" />

      {/* Leaderboard */}
      <section className="px-6 pt-8 pb-4">
        <div className="flex items-center gap-2">
          <Trophy size={16} strokeWidth={1.5} className="text-[var(--gold)]" />
          <h2 className="font-display text-[18px] text-[var(--ink)]">
            Top Circleites
          </h2>
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--taupe)]">
          This month
        </p>

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
