import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/play/learn")({
  head: () => ({
    meta: [
      { title: "Learn Mahjong — Mahjong Circle" },
      {
        name: "description",
        content: "Learn how to play Mahjong, step by step.",
      },
      { property: "og:title", content: "Learn Mahjong — Mahjong Circle" },
      {
        property: "og:description",
        content: "Learn how to play Mahjong, step by step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnMahjong,
});

const resources = [
  {
    title: "The Basics",
    description:
      "What you need to know before sitting at the table — tiles, sets, and the flow of a round.",
    href: "https://en.wikipedia.org/wiki/Mahjong",
  },
  {
    title: "Riichi (Japanese)",
    description:
      "The modern Japanese style with riichi declarations, dora, and all-in-last hands.",
    href: "https://en.wikipedia.org/wiki/Japanese_mahjong",
  },
  {
    title: "Hong Kong (Cantonese)",
    description:
      "The classic three-player-favoured southern style — clean, fast, and formal.",
    href: "https://en.wikipedia.org/wiki/Hong_Kong_mahjong",
  },
] as const;

function LearnMahjong() {
  return (
    <Screen eyebrow="The Circle" title="Learn Mahjong" back>
      <section className="px-6 pt-4 pb-2 text-center">
        <p className="mx-auto max-w-[280px] text-[13px] leading-[1.65] text-[var(--taupe)]/90">
          It's never too late to learn. Start with the basics, or pick a style
          and study the rules.
        </p>
      </section>

      <section className="px-6 pt-6 pb-10">
        <div className="flex flex-col gap-4">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-5 text-left transition-all active:scale-[0.98] hover:bg-[var(--sand)]/70"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--ivory)] text-[var(--hsbc)] font-display text-[18px]">
                M
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[16px] text-[var(--ink)]">
                  {r.title}
                </p>
                <p className="text-[12px] leading-[1.5] text-[var(--taupe)]">
                  {r.description}
                </p>
              </div>
              <ArrowUpRight
                size={18}
                strokeWidth={1.5}
                className="shrink-0 text-[var(--taupe)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 pb-10 text-center">
        <Link
          to="/play"
          className="text-[12px] tracking-wide text-[var(--taupe)] underline underline-offset-4"
        >
          Back to The Rooms
        </Link>
      </section>
    </Screen>
  );
}
