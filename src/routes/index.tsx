import { createFileRoute, useNavigate } from "@tanstack/react-router";
import heroSplash from "@/assets/hero-splash.jpg";
import { writeMember } from "@/lib/member-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HSBC Mahjong Circle" },
      { name: "description", content: "A private members' circle for connoisseurs of the game." },
      { property: "og:title", content: "HSBC Mahjong Circle" },
      { property: "og:description", content: "A private members' circle for connoisseurs of the game." },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      {/* GG hero */}
      <div className="relative h-[50%] w-full overflow-hidden">
        <img
          src={heroSplash}
          alt="Gaurav Gupta couture — tile motif"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--ivory)]" />
      </div>

      <div className="flex flex-1 flex-col items-center px-7 pt-5 text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--gold)]">HSBC PRESENTS</p>
        <h1 className="mt-3 font-display text-[36px] font-medium leading-[1.05] text-[var(--ink)]">
          The Mahjong<br />Circle
        </h1>
        <div className="my-5 gold-rule w-24" />
        <p className="max-w-[280px] text-[13px] leading-relaxed text-[var(--taupe)]">
          A members' circle for connoisseurs of the game. Quiet rooms, considered company,
          and a couture collection celebrating the tile.
        </p>

        <div className="mt-auto w-full space-y-3 pb-8 pt-8">
          <button
            onClick={() => navigate({ to: "/register" })}
            className="block w-full rounded-2xl bg-[var(--hsbc)] py-3.5 text-center text-[14px] font-medium tracking-wide text-[var(--ivory)] shadow-[0_8px_24px_-8px_rgba(219,0,17,0.45)] transition active:bg-[var(--hsbc-pressed)]"
          >
            Get Started
          </button>
          <button
            onClick={() => {
              writeMember({ guest: true });
              navigate({ to: "/home" });
            }}
            className="block w-full rounded-2xl border border-[var(--ink)]/15 bg-transparent py-3.5 text-center text-[14px] font-medium text-[var(--ink)] transition active:bg-[var(--sand)]"
          >
            Explore as Guest
          </button>
          <p className="pt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">
            No bank login required
          </p>
        </div>
      </div>
    </div>
  );
}
