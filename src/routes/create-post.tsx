import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/app/top-bar";
import { Camera, Info } from "lucide-react";

export const Route = createFileRoute("/create-post")({
  head: () => ({ meta: [{ title: "Share a photo" }] }),
  component: CreatePost,
});

function CreatePost() {
  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      <TopBar back title="Share a photo" />
      <div className="flex-1 overflow-y-auto px-5 pb-10">
        <button className="mt-3 grid h-64 w-full place-items-center rounded-3xl border border-dashed border-[var(--hairline)] bg-[var(--sand)]/40 text-center">
          <div className="flex flex-col items-center text-[var(--taupe)]">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-[var(--hairline)] bg-[var(--ivory)]">
              <Camera size={20} strokeWidth={1.5} />
            </div>
            <p className="mt-3 font-display text-[16px] text-[var(--ink)]">Add a photograph</p>
            <p className="mt-1 text-[12px]">JPG or PNG · up to 12 MB</p>
          </div>
        </button>

        <div className="mt-6">
          <label className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">Caption</label>
          <textarea
            rows={4}
            placeholder="A line or two — keep it considered."
            className="mt-2 w-full resize-none rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-3 text-[13.5px] leading-relaxed text-[var(--ink)] placeholder:text-[var(--taupe)]/70 focus:border-[var(--gold)] focus:outline-none"
          />
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/30 p-3 text-[12px] text-[var(--taupe)]">
          <Info size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" strokeWidth={1.5} />
          <p>
            Videos are curated by our editorial team. Members may share still photographs only —
            a small kindness that keeps the feed quiet.
          </p>
        </div>

        <button className="mt-8 w-full rounded-2xl bg-[var(--hsbc)] py-3.5 text-[14px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]">
          Share with the Circle
        </button>
      </div>
    </div>
  );
}