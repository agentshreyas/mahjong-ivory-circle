import { Link, useRouter } from "@tanstack/react-router";
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
        ) : (
          <Link to="/home" className="shrink-0">
            <span className="font-display text-[15px] font-medium tracking-tight text-[var(--ink)]">
              HSBC <span className="text-[var(--hsbc)]">·</span> Mahjong Circle
            </span>
          </Link>
        )}
        {title && (
          <div className="min-w-0">
            {eyebrow && (
              <p className="truncate text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">
                {eyebrow}
              </p>
            )}
            <h1 className="truncate font-display text-[17px] font-medium text-[var(--ink)]">{title}</h1>
          </div>
        )}
      </div>
      <button
        onClick={() => setOpen(true)}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--hairline)] bg-[var(--ivory)] text-[var(--ink)] shadow-sm transition hover:bg-[var(--sand)]"
        aria-label="Voice search"
      >
        <Mic size={16} strokeWidth={1.75} />
      </button>
    </header>
  );
}