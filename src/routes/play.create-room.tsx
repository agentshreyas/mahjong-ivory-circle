import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Users, Palette, PlayCircle, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/play/create-room")({
  head: () => ({
    meta: [
      { title: "Create Room — Mahjong Circle" },
      {
        name: "description",
        content:
          "Invite friends, select your table style, and start a game in the Circle.",
      },
      { property: "og:title", content: "Create Room — Mahjong Circle" },
      {
        property: "og:description",
        content:
          "Invite friends, select your table style, and start a game in the Circle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreateRoom,
});

const steps = [
  {
    id: "invite",
    label: "Invite friends",
    description: "Choose who sits at your table.",
    icon: Users,
  },
  {
    id: "style",
    label: "Select style",
    description: "Pick tiles, table felt, and mood.",
    icon: Palette,
  },
  {
    id: "start",
    label: "Start game",
    description: "Begin when everyone is ready.",
    icon: PlayCircle,
  },
] as const;

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const Icon = step.icon;
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-4 rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-5 text-left transition-all active:scale-[0.98] hover:bg-[var(--sand)]/70"
      aria-label={step.label}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--ivory)] text-[var(--hsbc)]">
        <Icon size={22} strokeWidth={1.5} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--taupe)]">
            Step {index + 1}
          </span>
        </div>
        <p className="mt-0.5 font-display text-[16px] text-[var(--ink)]">
          {step.label}
        </p>
        <p className="text-[12px] text-[var(--taupe)]">{step.description}</p>
      </div>
      <ChevronRight
        size={18}
        strokeWidth={1.5}
        className="shrink-0 text-[var(--taupe)] transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
}

function CreateRoom() {
  return (
    <Screen eyebrow="The Circle" title="Create Room" back>
      <section className="px-6 pt-4 pb-2 text-center">
        <p className="mx-auto max-w-[280px] text-[13px] leading-[1.65] text-[var(--taupe)]/90">
          Invite friends, select a style, and start the game.
        </p>
      </section>

      <section className="px-6 pt-8 pb-10">
        <div className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </section>

      <section className="px-6 pb-10">
        <Link
          to="/play"
          className="flex w-full items-center justify-center rounded-full bg-[var(--hsbc)] py-4 text-[13px] font-medium tracking-[0.04em] text-[var(--ivory)] transition-colors hover:bg-[var(--hsbc-pressed)] active:scale-[0.98]"
        >
          Start Game
        </Link>
      </section>
    </Screen>
  );
}
