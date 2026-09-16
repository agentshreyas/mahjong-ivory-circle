import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { PlusCircle, LogIn, Users, Trophy, BookOpen, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/play/")({
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
  component: PlayIndex,
});

const actions = [
  { label: "Create Room", icon: PlusCircle, to: "/play/create-room" },
  { label: "Join Room", icon: LogIn, to: "/play/join-room" },
  { label: "My Circle", icon: Users, to: "/play/my-circle" },
  { label: "Leaderboard", icon: Trophy, to: "/play/leaderboard" },
] as const;

function ActionOrb({
  label,
  Icon,
  to,
}: {
  label: string;
  Icon: typeof PlusCircle;
  to?: string;
}) {
  const content = (
    <>
      <span className="flex h-[104px] w-[104px] items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--sand)]/70 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.28)]">
        <Icon size={40} strokeWidth={1.25} className="text-[var(--hsbc)]" />
      </span>
      <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink)]">
        {label}
      </span>
    </>
  );

  if (to) {
    return (
      <a
        href={to}
        className="flex flex-col items-center gap-3 transition-transform active:scale-[0.97]"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="flex flex-col items-center gap-3 transition-transform active:scale-[0.97]"
      aria-label={label}
    >
      {content}
    </button>
  );
}

function PlayIndex() {
  return (
    <Screen eyebrow="The Circle" title="Play">
      <section className="px-6 pt-4 pb-2 text-center">
        <p className="mx-auto max-w-[260px] text-[13px] leading-[1.65] text-[var(--taupe)]/90">
          Set a table, take a seat, or gather the ones you play with most.
        </p>
      </section>

      {/* Diamond arrangement */}
      <section className="px-6 pt-8 pb-10">
        <div className="flex justify-center">
          <ActionOrb
            label={actions[0].label}
            Icon={actions[0].icon}
            to={actions[0].to}
          />
        </div>
        <div className="mt-8 flex items-start justify-center gap-8">
          <ActionOrb
            label={actions[1].label}
            Icon={actions[1].icon}
            to={actions[1].to}
          />
          <ActionOrb
            label={actions[2].label}
            Icon={actions[2].icon}
            to={actions[2].to}
          />
        </div>
        <div className="mt-8 flex justify-center">
          <ActionOrb
            label={actions[3].label}
            Icon={actions[3].icon}
            to={actions[3].to}
          />
        </div>
      </section>

      <div className="mx-6 gold-rule" />

      {/* How to play */}
      <section className="px-6 pt-8 pb-4">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--hsbc)]/40 bg-[var(--hsbc)] p-6 text-left shadow-[0_18px_40px_-18px_rgba(219,20,20,0.55)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              background:
                "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.9), transparent 45%), radial-gradient(circle at 10% 95%, rgba(0,0,0,0.8), transparent 50%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-2">
              <BookOpen size={16} strokeWidth={1.5} className="text-white/80" />
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
                Learn
              </p>
            </div>
            <h2 className="mt-3 font-display text-[19px] leading-[1.3] text-white">
              Don't know how to play?
              <br />
              It's never too late to learn!
            </h2>

            <div className="mt-3 h-px w-full bg-white/25" />

            <a
              href="https://en.wikipedia.org/wiki/Mahjong"
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-between rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 transition-transform active:scale-[0.97]"
            >
              <span className="font-display text-[16px] text-white">
                Learn Mahjong
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <ArrowUpRight size={16} strokeWidth={1.75} className="text-white" />
              </span>
            </a>
          </div>
        </div>
      </section>
    </Screen>
  );
}


