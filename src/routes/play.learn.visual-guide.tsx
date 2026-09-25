import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { MahjongTileFace, type TileSpec } from "@/components/app/mahjong-tile-face";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/play/learn/visual-guide")({
  head: () => ({
    meta: [
      { title: "Visual Guide — Taiwanese Mahjong — Mahjong Circle" },
      { name: "description", content: "Four illustrated modules covering Taiwanese Mahjong tiles, melds, claims, and the Charleston." },
      { property: "og:title", content: "Visual Guide — Taiwanese Mahjong — Mahjong Circle" },
      { property: "og:description", content: "Four illustrated modules covering Taiwanese Mahjong tiles, melds, claims, and the Charleston." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VisualGuide,
});

const b = (rank: number): TileSpec => ({ suit: "bamboo", rank });
const c = (rank: number): TileSpec => ({ suit: "chars", rank });
const d = (rank: number): TileSpec => ({ suit: "dots", rank });
const wind = (value: "E" | "S" | "W" | "N"): TileSpec => ({ suit: "wind", wind: value });
const dragon = (value: "red" | "green" | "white"): TileSpec => ({ suit: "dragon", dragon: value });
const joker = (rank: number): TileSpec => ({ suit: "joker", joker: rank });

const modules = ["What are the tiles?", "Melds & pairs", "Claim priority", "The Charleston"];

const melds = [
  { name: "Pung", description: "Three identical tiles. A Joker may substitute for one of the three.", tiles: [dragon("red"), dragon("red"), dragon("red")] },
  { name: "Chow", description: "Three consecutive tiles from the same suit.", tiles: [b(3), b(4), b(5)] },
  { name: "Kong", description: "Four identical tiles. Jokers cannot substitute in a Kong.", tiles: [c(7), c(7), c(7), c(7)] },
  { name: "Mixed Chow", description: "Three consecutive ranks, each from a different suit.", tiles: [b(4), c(5), d(6)] },
  { name: "Crotchet", description: "A special three-tile combination used in Taiwanese Mahjong.", tiles: [b(2), c(2), d(2)] },
  { name: "Standard Pair", description: "Two identical tiles complete the pair in a winning hand.", tiles: [wind("E"), wind("E")] },
  { name: "Knit Pair", description: "A Joker-assisted pair, allowed with a Crotchet meld.", tiles: [dragon("green"), joker(1)] },
];

const claims = [
  { name: "Mahjong", who: "Any player", detail: "Completes the hand and beats every other claim on the same discard." },
  { name: "Kong / Pung", who: "Any player", detail: "Tied priority — whichever valid claim is declared first wins." },
  { name: "Chow", who: "Only the next player", detail: "Lowest priority, and the only claim restricted by seating order." },
];

const passes = [
  { name: "Pass Right", seat: "West", arrow: "→", text: "Choose three unwanted tiles and pass them to the player on your right — the West seat.", tiles: [wind("N"), d(9), dragon("red")] },
  { name: "Pass Across", seat: "North", arrow: "↑", text: "Pass three more tiles to the player sitting opposite you — the North seat.", tiles: [b(1), c(9), wind("E")] },
  { name: "Pass Left", seat: "East", arrow: "←", text: "The final pass goes to the player on your left — the East seat. Then play begins.", tiles: [dragon("green"), d(1), b(8)] },
];

function TileRow({ tiles }: { tiles: TileSpec[] }) {
  return <div className="flex flex-wrap gap-1.5">{tiles.map((tile, index) => <MahjongTileFace key={index} tile={tile} />)}</div>;
}

function TileDeck() {
  const suits = [
    { name: "Bamboo", note: "Numbered 1–9 · four of each", tiles: Array.from({ length: 9 }, (_, index) => b(index + 1)) },
    { name: "Characters", note: "Numbered 1–9 · four of each", tiles: Array.from({ length: 9 }, (_, index) => c(index + 1)) },
    { name: "Dots", note: "Numbered 1–9 · four of each", tiles: Array.from({ length: 9 }, (_, index) => d(index + 1)) },
    { name: "Winds", note: "Four winds · four of each", tiles: [wind("E"), wind("S"), wind("W"), wind("N")] },
    { name: "Dragons", note: "Three dragons · four of each", tiles: [dragon("red"), dragon("green"), dragon("white")] },
    { name: "Flowers & Seasons", note: "Eight unique bonus tiles", tiles: Array.from({ length: 8 }, (_, index) => joker(index + 1)) },
  ];
  return <div className="space-y-5">{suits.map((suit) => <section key={suit.name}><div className="mb-2 flex items-baseline gap-2"><h3 className="font-display text-[16px] text-[var(--ink)]">{suit.name}</h3><p className="text-[9px] uppercase text-[var(--taupe)]">{suit.note}</p></div><TileRow tiles={suit.tiles} /></section>)}</div>;
}

function Melds() {
  const [selected, setSelected] = useState(0);
  const meld = melds[selected];
  return <><div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{melds.map((item, index) => <Button key={item.name} type="button" size="sm" variant={selected === index ? "default" : "outline"} onClick={() => setSelected(index)} className={selected === index ? "rounded-full bg-[var(--hsbc)] text-[var(--ivory)] hover:bg-[var(--hsbc-pressed)]" : "rounded-full border-[var(--hairline)] bg-white text-[var(--ink)]"}>{item.name}</Button>)}</div><div className="mt-4 border-l-2 border-[var(--hsbc)] bg-[var(--sand)]/50 p-4"><p className="text-[13px] leading-6 text-[var(--taupe)]">{meld.description}</p><div className="mt-4"><TileRow tiles={meld.tiles} /></div></div></>;
}

function ClaimPriority() {
  const [selected, setSelected] = useState(0);
  const claim = claims[selected];
  return <div className="space-y-3"><div className="space-y-2">{claims.map((item, index) => <Button key={item.name} type="button" variant="outline" onClick={() => setSelected(index)} className={`h-12 w-full justify-start rounded-md px-3 ${selected === index ? "border-[var(--hsbc)] bg-[var(--hsbc)]/5" : "border-[var(--hairline)] bg-white"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] ${selected === index ? "bg-[var(--hsbc)] text-[var(--ivory)]" : "bg-[var(--ink)] text-[var(--ivory)]"}`}>{index + 1}</span><span className="text-[13px] text-[var(--ink)]">{item.name}</span><ChevronRight className="ml-auto text-[var(--taupe)]" /></Button>)}</div><div className="border-l-2 border-[var(--hsbc)] bg-[var(--sand)]/50 p-4"><p className="text-[10px] uppercase text-[var(--hsbc)]">Who can claim</p><h3 className="mt-2 font-display text-[18px] text-[var(--ink)]">{claim.who}</h3><p className="mt-2 text-[13px] leading-6 text-[var(--taupe)]">{claim.detail}</p></div></div>;
}

function Charleston() {
  const [selected, setSelected] = useState(0);
  const pass = passes[selected];
  return <><div className="grid grid-cols-3 gap-2">{passes.map((item, index) => <Button key={item.name} type="button" size="sm" variant={selected === index ? "default" : "outline"} onClick={() => setSelected(index)} className={selected === index ? "rounded-full bg-[var(--hsbc)] px-2 text-[10px] text-[var(--ivory)] hover:bg-[var(--hsbc-pressed)]" : "rounded-full border-[var(--hairline)] bg-white px-2 text-[10px] text-[var(--ink)]"}>{index + 1}. {item.name.replace("Pass ", "")}</Button>)}</div><div className="mt-4 bg-[var(--sand)]/50 p-4"><div className="grid grid-cols-3 grid-rows-3 items-center gap-2 text-center text-[11px]"><span /><span className={pass.seat === "North" ? "bg-[var(--hsbc)] py-2 text-[var(--ivory)]" : "border border-[var(--hairline)] py-2"}>North</span><span /><span className={pass.seat === "East" ? "bg-[var(--hsbc)] py-2 text-[var(--ivory)]" : "border border-[var(--hairline)] py-2"}>East</span><span className="font-display text-[26px] text-[var(--hsbc)]">{pass.arrow}</span><span className={pass.seat === "West" ? "bg-[var(--hsbc)] py-2 text-[var(--ivory)]" : "border border-[var(--hairline)] py-2"}>West</span><span /><span className="border border-[var(--hsbc)] py-2"><strong>South</strong><br />you</span><span /></div><p className="mt-4 text-[13px] leading-6 text-[var(--taupe)]">{pass.text}</p><div className="mt-3"><TileRow tiles={pass.tiles} /></div></div></>;
}

function VisualGuide() {
  const [module, setModule] = useState(0);
  const intro = [
    "Taiwanese Mahjong uses 144 tiles across three suits, Winds, Dragons, Flowers and Seasons.",
    "A winning hand is built from melds and a pair. Select each pattern to see it tile by tile.",
    "When several players want one discard, the type of claim decides who takes it.",
    "Before play begins, pass three unwanted tiles right, across, then left.",
  ];
  return <div className="min-h-full bg-white pb-8"><header className="border-b border-[var(--hairline)] px-5 pb-4 pt-6"><div className="flex items-start justify-between gap-3"><div><p className="text-[9px] uppercase tracking-[0.24em] text-[var(--hsbc)]">Taiwanese Mahjong · Visual Guide</p><h1 className="mt-1 font-display text-[22px] text-[var(--ink)]">{modules[module]}</h1></div><Link to="/play/learn/next" className="rounded-full border border-[var(--hairline)] bg-[var(--sand)]/50 px-3 py-1.5 text-[11px] text-[var(--ink)]">Exit</Link></div><p className="mt-2 text-[12px] leading-5 text-[var(--taupe)]">{intro[module]}</p></header><nav className="flex gap-2 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Visual guide modules">{modules.map((name, index) => <Button key={name} type="button" size="sm" variant="ghost" onClick={() => setModule(index)} className={`h-auto min-w-[116px] justify-start rounded-md border px-3 py-2 text-left ${module === index ? "border-[var(--hsbc)] bg-[var(--hsbc)] text-[var(--ivory)] hover:bg-[var(--hsbc-pressed)] hover:text-[var(--ivory)]" : "border-[var(--hairline)] bg-white text-[var(--ink)]"}`}><span className="text-[9px] opacity-65">0{index + 1}</span><span className="text-[10px]">{name}</span></Button>)}</nav><main className="px-5">{module === 0 ? <TileDeck /> : null}{module === 1 ? <Melds /> : null}{module === 2 ? <ClaimPriority /> : null}{module === 3 ? <Charleston /> : null}</main><footer className="mt-7 flex items-center justify-between px-5"><Button type="button" variant="outline" disabled={module === 0} onClick={() => setModule((value) => Math.max(0, value - 1))} className="rounded-full border-[var(--hairline)] bg-white text-[var(--ink)]"><ArrowLeft /> Back</Button><span className="text-[10px] uppercase text-[var(--taupe)]">{module + 1} of 4</span>{module === 3 ? <Button asChild className="rounded-full bg-[var(--hsbc)] text-[var(--ivory)] hover:bg-[var(--hsbc-pressed)]"><Link to="/play/learn/next">Done <ChevronRight /></Link></Button> : <Button type="button" onClick={() => setModule((value) => Math.min(3, value + 1))} className="rounded-full bg-[var(--hsbc)] text-[var(--ivory)] hover:bg-[var(--hsbc-pressed)]">Next <ArrowRight /></Button>}</footer></div>;
}