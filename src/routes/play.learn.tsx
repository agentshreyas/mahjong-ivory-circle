import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MahjongTileFace, type TileSpec } from "@/components/app/mahjong-tile-face";

export const Route = createFileRoute("/play/learn")({
  head: () => ({
    meta: [
      { title: "Indian Heritage Mahjong: Basics — Mahjong Circle" },
      {
        name: "description",
        content:
          "A ten-step tutorial on Indian Heritage Mahjong: tiles, melds, the pair, fishing and claim priority.",
      },
      {
        property: "og:title",
        content: "Indian Heritage Mahjong: Basics — Mahjong Circle",
      },
      {
        property: "og:description",
        content:
          "A ten-step tutorial on Indian Heritage Mahjong: tiles, melds, the pair, fishing and claim priority.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnMahjong,
});

const b = (rank: number): TileSpec => ({ suit: "bamboo", rank });
const c = (rank: number): TileSpec => ({ suit: "chars", rank });
const d = (rank: number): TileSpec => ({ suit: "dots", rank });
const wind = (w: "E" | "S" | "W" | "N"): TileSpec => ({ suit: "wind", wind: w });
const dragon = (x: "red" | "green" | "white"): TileSpec => ({
  suit: "dragon",
  dragon: x,
});

type Slide = {
  title: string;
  body: string;
  rows?: TileSpec[][];
  highlight?: boolean;
};

const slides: Slide[] = [
  {
    title: "The Tiles",
    body: "IHM uses 144 tiles: three suits (Bamboo, Characters, Dots) ranked 1–9, four Winds, three Dragons, and eight Joker tiles (Flowers & Seasons).",
    rows: [
      [b(1), b(5), b(9)],
      [c(1), c(5), c(9)],
      [d(1), d(5), d(9)],
      [wind("E"), wind("S"), wind("W"), wind("N")],
      [dragon("red"), dragon("green"), dragon("white")],
    ],
  },
  {
    title: "Goal: Build a Winning Hand",
    body: "A winning hand has 14 tiles arranged as 4 melds (sets of 3 or 4) plus 1 pair. Win by declaring Mahjong once your hand is complete.",
    rows: [
      [b(1), b(2), b(3), c(4), c(5), c(6), d(7), d(8)],
      [d(9), dragon("red"), dragon("red"), dragon("red"), wind("E"), wind("E")],
    ],
  },
  {
    title: "Pung — Three Identical Tiles",
    body: "A Pung is three copies of the same tile. Jokers can substitute for one tile in a Pung.",
    rows: [[dragon("red"), dragon("red"), dragon("red")]],
    highlight: true,
  },
  {
    title: "Chow — Three Consecutive Tiles",
    body: "A Chow is three consecutive ranks in the same suit, e.g. Bamboo 1-2-3. Jokers can substitute for one tile.",
    rows: [[b(1), b(2), b(3)]],
    highlight: true,
  },
  {
    title: "Kong — Four Identical Tiles",
    body: "A Kong is four copies of the same tile. Unlike Pung/Chow, Jokers cannot substitute in a Kong. Declaring a Kong draws a replacement tile from the dead wall.",
    rows: [[c(7), c(7), c(7), c(7)]],
  },
  {
    title: "Jokers (Flowers & Seasons)",
    body: "Eight Joker tiles stand in for any tile in a Pung or Chow. They cannot be used in a Kong, and a hand leaning on Jokers scores less.",
    rows: [[{ suit: "joker" }, { suit: "joker" }, { suit: "joker" }]],
    highlight: true,
  },
  {
    title: "The Pair",
    body: 'Every winning hand needs exactly one pair — two identical tiles. A "Knit Pair" using a Joker is allowed only if your hand contains a Crotchet meld.',
    rows: [[wind("E"), wind("E")]],
  },
  {
    title: "Fishing (Tenpai)",
    body: 'When your hand is one tile away from winning, you are "Fishing". You must be Fishing before you can declare Mahjong — either by drawing the winning tile yourself or claiming it from another player\'s discard.',
    rows: [
      [b(1), b(2), b(3), c(4), c(5), c(6), d(7), d(8)],
      [d(9), dragon("red"), dragon("red"), wind("E"), wind("E")],
    ],
  },
  {
    title: "Claim Priority",
    body: "When a tile is discarded, multiple players may want it. Priority is: Mahjong > Kong = Pung > Chow. A Chow may only be claimed by the player seated immediately after the discarder.",
  },
  {
    title: "You're Ready",
    body: "You now know the core building blocks of Indian Heritage Mahjong: tiles, melds, the pair, fishing, and claims. Head to the table and try a game!",
  },
];

function LearnMahjong() {
  const [step, setStep] = useState(0);
  const total = slides.length;
  const slide = slides[step];
  const progress = ((step + 1) / total) * 100;

  return (
    <div className="flex min-h-full flex-col bg-[var(--ivory)]">
      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
              Tutorial
            </p>
            <h1 className="mt-1.5 font-display text-[21px] leading-[1.2] text-[var(--ink)]">
              Indian Heritage Mahjong: Basics
            </h1>
          </div>
          <Link
            to="/play"
            className="shrink-0 rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-4 py-1.5 text-[11px] tracking-wide text-[var(--ink)] transition-transform active:scale-[0.96]"
          >
            Exit
          </Link>
        </div>

        <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-[var(--hairline)]">
          <div
            className="h-full rounded-full bg-[var(--gold)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-[var(--taupe)]">
          Step <span className="text-[var(--ink)]">{step + 1}</span> of {total}
        </p>
      </header>

      {/* Card */}
      <section className="flex-1 px-5 pb-4">
        <div className="rounded-3xl border border-[var(--hairline)] bg-[#FFFCF5] p-6 shadow-[0_18px_44px_-24px_rgba(0,0,0,0.25)]">
          <h2 className="font-display text-[19px] leading-[1.25] text-[var(--ink)]">
            {slide.title}
          </h2>
          <p className="mt-3 text-[13px] leading-[1.7] text-[var(--taupe)]">
            {slide.body}
          </p>

          {slide.rows ? (
            <div className="mt-6 flex flex-col gap-2.5">
              {slide.rows.map((row, i) => (
                <div key={i} className="flex flex-wrap gap-2">
                  {row.map((tile, j) => (
                    <MahjongTileFace
                      key={j}
                      tile={tile}
                      highlight={slide.highlight}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Footer controls */}
      <footer className="flex items-center justify-between gap-4 px-6 pb-8 pt-2">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-4 py-2 text-[12px] text-[var(--ink)] transition-transform active:scale-[0.96] disabled:opacity-35"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          Back
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-[5px] rounded-full transition-all ${
                i === step
                  ? "w-[14px] bg-[var(--gold)]"
                  : "w-[5px] bg-[var(--hairline)]"
              }`}
            />
          ))}
        </div>

        {step === total - 1 ? (
          <Link
            to="/play"
            className="flex items-center gap-1.5 rounded-full bg-[var(--hsbc)] px-4 py-2 text-[12px] text-white transition-transform active:scale-[0.96]"
          >
            Finish
            <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(total - 1, s + 1))}
            className="flex items-center gap-1.5 rounded-full bg-[var(--gold)] px-4 py-2 text-[12px] text-[#2A2013] transition-transform active:scale-[0.96]"
          >
            Next
            <ArrowRight size={14} strokeWidth={1.75} />
          </button>
        )}
      </footer>
    </div>
  );
}
