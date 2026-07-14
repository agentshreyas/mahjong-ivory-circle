import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, Mic } from "lucide-react";
import { useVoice } from "./voice-context";

interface Props {
  title?: string;
  eyebrow?: string;
  back?: boolean;
  transparent?: boolean;
}

export function TopBar({ title, eyebrow, back, transparent }: Props) {
  const router = useRouter();
  const { setOpen } = useVoice();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideVoice = pathname === "/" || pathname === "/register";
  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between px-5 pt-3 pb-3 ${
        transparent ? "bg-transparent" : "bg-[var(--ivory)]/95 backdrop-blur"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {back ? (
          <button
            onClick={() => router.history.back()}
            className="-ml-2 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--ink)] hover:bg-[var(--sand)]"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
        ) : null}
        {title ? (
          <div className="min-w-0">
            {eyebrow && (
              <p className="truncate text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">
                {eyebrow}
              </p>
            )}
            <h1 className="truncate font-display text-[17px] font-medium text-[var(--ink)]">{title}</h1>
          </div>
        ) : (
          !back && (
            <Link to="/home" className="shrink-0">
              <span className="font-display text-[16px] font-medium tracking-tight text-[var(--ink)]">
                Mahjong Circle
              </span>
            </Link>
          )
        )}
      </div>
      {!hideVoice && (
        <button
          onClick={() => setOpen(true)}
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--hsbc)] text-[var(--ivory)] shadow-[0_6px_18px_-6px_rgba(219,0,17,0.55)] ring-2 ring-[var(--hsbc)]/15 transition active:bg-[var(--hsbc-pressed)]"
          aria-label="Voice search"
        >
          <Mic size={17} strokeWidth={2} />
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--gold)] ring-2 ring-[var(--ivory)]" />
        </button>
      )}
    </header>
  );
}