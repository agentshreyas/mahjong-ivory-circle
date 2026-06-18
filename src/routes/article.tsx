import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/app/top-bar";
import { Heart, MessageCircle, Bookmark, Share } from "lucide-react";
import articleHero from "@/assets/article-hero.jpg";

export const Route = createFileRoute("/article")({
  head: () => ({ meta: [{ title: "A short history of the bamboo tile" }] }),
  component: Article,
});

function Article() {
  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      <TopBar back />
      <article className="flex-1 overflow-y-auto">
        <div className="px-7 pt-2 pb-6">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold)]">Heritage · 6 min read</p>
          <h1 className="mt-3 font-display text-[32px] font-medium leading-[1.08] text-[var(--ink)]">
            A short history of the bamboo tile.
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--taupe)]">
            From the parlours of 1920s Shanghai to a Marine Drive veranda — how a single suit kept
            its quiet authority over a century of play.
          </p>
          <div className="mt-5 flex items-center gap-3 text-[11px] text-[var(--taupe)]">
            <span className="text-[var(--ink)]">Niharika Sen</span>
            <span className="h-1 w-1 rounded-full bg-[var(--hairline)]" />
            <span>18 June 2026</span>
          </div>
        </div>

        <div className="h-80 w-full overflow-hidden">
          <img src={articleHero} alt="A bamboo tile" className="h-full w-full object-cover" />
        </div>

        <div className="px-7 py-8 text-[15.5px] leading-[1.75] text-[var(--ink)]">
          <p className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[54px] first-letter:leading-[0.9] first-letter:text-[var(--hsbc)]">
            The bamboo suit was, for the longest time, the suit one underestimated. In a set of
            one hundred and forty‑four tiles it sits between the circles and the characters with
            no ornament beyond a single, drawn stalk.
          </p>

          <blockquote className="my-7 border-l-2 border-[var(--gold)] pl-5 font-display text-[20px] leading-snug text-[var(--ink)]">
            "A good player keeps her bamboos until the room has settled — and only then begins
            to speak."
          </blockquote>

          <p>
            Imported to Bombay by the Sassoons and to Calcutta by Marwari trading families, the
            bamboo tile travelled with the early twentieth century's most curious households. It
            was, for a long while, the tile one used to begin teaching.
          </p>

          <h3 className="mt-7 font-display text-[20px] text-[var(--ink)]">The one‑bamboo</h3>
          <p className="mt-3">
            Look closely at the one of bamboos in any old set and you will see a bird —
            traditionally a sparrow, sometimes a peacock — the only tile in the suit that breaks
            its own pattern. Collectors prize it almost above the dragons.
          </p>

          <div className="gold-rule my-10" />

          <p className="text-center text-[12px] uppercase tracking-[0.22em] text-[var(--taupe)]">
            Continue reading
          </p>
        </div>

        {/* Engagement footer */}
        <div className="sticky bottom-0 border-t border-[var(--hairline)] bg-[var(--ivory)]/95 px-6 py-3 backdrop-blur">
          <div className="flex items-center justify-between text-[var(--taupe)]">
            <div className="flex items-center gap-5 text-[12px]">
              <button className="flex items-center gap-1.5"><Heart size={15} strokeWidth={1.5} /> 24</button>
              <button className="flex items-center gap-1.5"><MessageCircle size={15} strokeWidth={1.5} /> 6</button>
            </div>
            <div className="flex items-center gap-4">
              <Bookmark size={15} strokeWidth={1.5} />
              <Share size={15} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}