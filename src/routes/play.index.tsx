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
      <span className="relative flex h-[84px] w-[60px] flex-col items-center justify-center rounded-[10px] border border-[var(--hairline)] bg-gradient-to-b from-[#fffdf7] via-[var(--sand)] to-[#efe6d6] shadow-[0_12px_26px_-12px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-7px_0_-1px_rgba(120,95,60,0.22)]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[5px] rounded-[7px] border border-[rgba(120,95,60,0.16)]"
        />
        <Icon size={28} strokeWidth={2.4} className="relative text-[var(--hsbc)]" />
      </span>
      <span className="-mt-1 text-[10px] tracking-[0.12em] uppercase text-[var(--ink)]">
        {label}
      </span>
    </>
  );

  if (to) {
    return (
      <a
        href={to}
        className="flex flex-col items-center gap-2 transition-transform active:scale-[0.97]"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2 transition-transform active:scale-[0.97]"
      aria-label={label}
    >
      {content}
    </button>
  );
}

function PlayIndex() {
  return (
    <Screen eyebrow="The Circle" title="Play">

      {/* Welcome + compact orb arrangement */}
      <section className="px-6 pt-4 pb-5">
        <h2 className="text-center font-display text-[19px] leading-[1.3] text-[var(--ink)]">
          Welcome to The Rooms
          <br />
          by Mahjong Circle
        </h2>
        <p className="mt-1 text-center text-[11px] text-[var(--ink-soft)]">
          Hope you enjoy the game
        </p>
        <div className="mt-4 flex flex-col items-center">
          <ActionOrb
            label={actions[0].label}
            Icon={actions[0].icon}
            to={actions[0].to}
          />
          <div className="mt-2 flex w-full items-start justify-between px-3">
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


