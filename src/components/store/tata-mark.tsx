/**
 * Wordmark lockup for the app. Text-only rendering of the "TATA" name in the
 * corporate blue — no official trademark artwork is bundled with the project.
 */
export function TataMark({
  size = "md",
  tone = "light",
}: {
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
}) {
  const dims = {
    sm: { box: "h-[26px] px-2", word: "text-[11px]", sub: "text-[10.5px]" },
    md: { box: "h-[30px] px-2.5", word: "text-[13px]", sub: "text-[13px]" },
    lg: { box: "h-[44px] px-4", word: "text-[19px]", sub: "text-[20px]" },
  }[size];

  return (
    <span className="flex items-center gap-2">
      <span
        className={`grid place-items-center rounded-[7px] bg-[var(--tata-blue)] ${dims.box}`}
      >
        <span
          className={`font-extrabold leading-none tracking-[0.16em] text-white ${dims.word}`}
        >
          TATA
        </span>
      </span>
      <span
        className={`font-extrabold leading-none tracking-[-0.03em] ${dims.sub} ${
          tone === "light" ? "text-white" : "text-[var(--ink)]"
        }`}
      >
        NutriKorner
      </span>
    </span>
  );
}
