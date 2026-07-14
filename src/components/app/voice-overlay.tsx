import { Mic, X } from "lucide-react";
import { useVoice } from "./voice-context";

const prompts = [
  "Find a game in Mumbai this weekend",
  "Show me how to score a hand",
  "Tell me about the Gaurav Gupta collection",
  "Who's playing in Delhi tonight?",
];

const results = [
  { kind: "Event", title: "Bandra Drawing Room · Sat 7pm", note: "5 members attending" },
  { kind: "Article", title: "A short history of the Wind tiles", note: "4 min read" },
  { kind: "Member", title: "Aarti Mehra · Mumbai", note: "Plays Wednesdays" },
  { kind: "Collection", title: "The Tile Cuff in champagne gold", note: "Atelier piece" },
];

export function VoiceOverlay() {
  const { open, setOpen } = useVoice();
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[var(--ivory)]/98 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">Voice search</p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="grid h-9 w-9 place-items-center rounded-full border border-[var(--hairline)] text-[var(--ink)]"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex flex-col items-center px-6 pt-6">
        <div className="relative grid h-24 w-24 place-items-center">
          <span className="mic-pulse absolute inset-0 rounded-full" />
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-[var(--hsbc)] text-[var(--ivory)] shadow-[0_10px_30px_-8px_rgba(219,0,17,0.5)]">
            <Mic size={28} strokeWidth={1.75} />
          </span>
        </div>
        <p className="mt-6 font-display text-[22px] leading-tight text-[var(--ink)]">Listening…</p>
        <p className="mt-1 text-[12px] text-[var(--taupe)]">Speak naturally, in English or Hinglish.</p>
      </div>

      <div className="px-6 pt-7">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">Try asking</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {prompts.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-3 py-1.5 text-[12px] text-[var(--ink)]"
            >
              "{p}"
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto px-6 pb-6">
        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">Suggested results</p>
        <div className="mt-3 divide-y divide-[var(--hairline)] rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40">
          {results.map((r) => (
            <div key={r.title} className="flex items-start justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)]">{r.kind}</p>
                <p className="truncate text-[14px] font-medium text-[var(--ink)]">{r.title}</p>
                <p className="truncate text-[12px] text-[var(--taupe)]">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-[11px] text-[var(--taupe)]">
          Voice search stays within the app and on‑topic.
        </p>
      </div>
    </div>
  );
}