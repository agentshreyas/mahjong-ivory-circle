import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MahjongTileFace, type TileSpec } from "@/components/app/mahjong-tile-face";

export const Route = createFileRoute("/play/learn/next")({
  head: () => ({
    meta: [
      { title: "Keep Going — Taiwanese Mahjong — Mahjong Circle" },
      {
        name: "description",
        content:
          "A visual guide to tile patterns and your first tile move in Taiwanese Mahjong.",
      },
      {
        property: "og:title",
        content: "Keep Going — Taiwanese Mahjong — Mahjong Circle",
      },
      {
        property: "og:description",
        content:
          "A visual guide to tile patterns and your first tile move in Taiwanese Mahjong.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NextSteps,
});

const b = (rank: number): TileSpec => ({ suit: "bamboo", rank });
const c = (rank: number): TileSpec => ({ suit: "chars", rank });
const d = (rank: number): TileSpec => ({ suit: "dots", rank });
const dragon = (x: "red" | "green" | "white"): TileSpec => ({
  suit: "dragon",
  dragon: x,
});

const cards: {
  title: string;
  sub: string;
  body: string;
  rows: TileSpec[][];
  highlight?: boolean;
  to: string;
}[] = [
  {
    title: "Visual guide",
    sub: "SEE THE PATTERNS",
    body: "A picture library of every building block — pungs, chows, kongs, the pair and the jokers — drawn tile by tile.",
    rows: [
      [b(1), b(2), b(3)],
      [c(7), c(7), c(7)],
      [dragon("red"), dragon("red"), dragon("red")],
    ],
    highlight: true,
    to: "/play/learn",
  },
  {
    title: "Your first tile move",
    sub: "PRACTICE A HAND",
    body: "Pick up a starter hand, spot the meld you are closest to completing, and make your very first discard with confidence.",
    rows: [
      [d(2), d(3), d(4), b(8), b(8)],
      [c(5), c(6), dragon("green")],
    ],
    to: "/play/learn",
  },
];

function NextSteps() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--hsbc)]">
              Next Step
            </p>
            <h1 className="mt-1.5 font-display text-[21px] leading-[1.2] text-[var(--ink)]">
              Keep Going
            </h1>
          </div>
          <Link
            to="/play"
            className="shrink-0 rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-4 py-1.5 text-[11px] tracking-wide text-[var(--ink)] transition-transform active:scale-[0.96]"
          >
            Exit
          </Link>
        </div>
        <p className="mt-2 text-[12px] leading-[1.6] text-[var(--taupe)]">
          You know the basics — now see them, then play them.
        </p>
      </header>

      {/* Cards */}
      <section className="flex flex-1 flex-col gap-4 px-5 pb-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="block rounded-3xl border border-[var(--hairline)] bg-white p-6 shadow-[0_18px_44px_-24px_rgba(219,0,17,0.25)] transition-transform active:scale-[0.98]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--hsbc)]">
                  {card.sub}
                </p>
                <h2 className="mt-1.5 font-display text-[19px] leading-[1.25] text-[var(--hsbc)]">
                  {card.title}
                </h2>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--hsbc)]/8 text-[var(--hsbc)]">
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-[1.7] text-[var(--taupe)]">
              {card.body}
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              {card.rows.map((row, i) => (
                <div key={i} className="flex flex-wrap gap-2">
                  {row.map((tile, j) => (
                    <MahjongTileFace
                      key={j}
                      tile={tile}
                      highlight={card.highlight}
                    />
                  ))}
                </div>
              ))}
            </div>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-4 px-6 pb-8 pt-2">
        <Link
          to="/play/learn"
          className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-4 py-2 text-[12px] text-[var(--ink)] transition-transform active:scale-[0.96]"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Back to tutorial
        </Link>
        <Link
          to="/play"
          className="rounded-full bg-[var(--hsbc)] px-5 py-2 text-[12px] text-white transition-transform active:scale-[0.96]"
        >
          The Rooms
        </Link>
      </footer>
    </div>
  );
}
