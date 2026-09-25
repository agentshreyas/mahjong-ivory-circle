type Suit = "bamboo" | "chars" | "dots" | "wind" | "dragon" | "joker";

export type TileSpec = {
  suit: Suit;
  rank?: number; // 1-9 for suits
  wind?: "E" | "S" | "W" | "N";
  dragon?: "red" | "green" | "white";
};

const CHINESE = ["一", "二", "三", "四", "伍", "六", "七", "八", "九"];
const WIND_GLYPH: Record<string, string> = {
  E: "東",
  S: "南",
  W: "西",
  N: "北",
};

function Bamboo({ n }: { n: number }) {
  const stick = (
    <span className="flex h-[13px] w-[5px] flex-col items-center justify-between">
      <span className="h-[3px] w-full rounded-[1px] bg-[var(--jade)]" />
      <span className="h-[5px] w-[2px] bg-[var(--jade)]" />
      <span className="h-[3px] w-full rounded-[1px] bg-[var(--jade)]" />
    </span>
  );
  const count = Math.min(Math.max(n, 1), 9);
  return (
    <span className="flex flex-wrap items-center justify-center gap-[3px] px-[2px]">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>{stick}</span>
      ))}
    </span>
  );
}

function Dots({ n }: { n: number }) {
  const count = Math.min(Math.max(n, 1), 9);
  const cols = count <= 2 ? 1 : count <= 4 ? 2 : 3;
  return (
    <span
      className="grid justify-center gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-[7px] w-[7px] rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--hsbc)]/25"
        />
      ))}
    </span>
  );
}

export function MahjongTileFace({
  tile,
  highlight = false,
}: {
  tile: TileSpec;
  highlight?: boolean;
}) {
  let body: React.ReactNode = null;
  let corner: string | null = null;

  if (tile.suit === "bamboo") {
    body = <Bamboo n={tile.rank ?? 1} />;
    corner = String(tile.rank ?? 1);
  } else if (tile.suit === "dots") {
    body = <Dots n={tile.rank ?? 1} />;
    corner = String(tile.rank ?? 1);
  } else if (tile.suit === "chars") {
    body = (
      <span className="flex flex-col items-center leading-none">
        <span className="text-[15px] text-[var(--ink)]">
          {CHINESE[(tile.rank ?? 1) - 1]}
        </span>
        <span className="mt-[2px] text-[15px] text-[var(--hsbc)]">萬</span>
      </span>
    );
    corner = String(tile.rank ?? 1);
  } else if (tile.suit === "wind") {
    body = (
      <span className="text-[22px] leading-none text-[#1F3A93]">
        {WIND_GLYPH[tile.wind ?? "E"]}
      </span>
    );
    corner = tile.wind ?? "E";
  } else if (tile.suit === "dragon") {
    body =
      tile.dragon === "green" ? (
        <span className="text-[22px] leading-none text-[var(--jade)]">發</span>
      ) : tile.dragon === "white" ? (
        <span className="h-[26px] w-[16px] rounded-[3px] border-[1.5px] border-[#1F3A93]" />
      ) : (
        <span className="text-[22px] leading-none text-[var(--hsbc)]">中</span>
      );
    corner = null;
  } else {
    body = (
      <span className="font-display text-[17px] leading-none text-[var(--gold)]">
        J
      </span>
    );
    corner = null;
  }

  return (
    <span
      className={`relative flex h-[52px] w-[38px] shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-b from-[#fffdf7] via-[var(--ivory)] to-[#f1e8d8] ${
        highlight
          ? "border border-[var(--gold)] shadow-[0_8px_18px_-10px_rgba(183,150,92,0.7),inset_0_1px_0_rgba(255,255,255,0.9)]"
          : "border border-[var(--hairline)] shadow-[0_6px_14px_-9px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.9)]"
      }`}
    >
      {body}
      {corner ? (
        <span className="absolute bottom-[3px] right-[3px] rounded-[2px] bg-[var(--ink)]/75 px-[3px] text-[7px] leading-[1.5] text-[var(--ivory)]">
          {corner}
        </span>
      ) : null}
    </span>
  );
}
