import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Play, Clock, Bookmark } from "lucide-react";
import feedTiles from "@/assets/feed-tiles.jpg";
import feedGathering from "@/assets/feed-gathering.jpg";
import ggBanner from "@/assets/gg-banner.jpg";
import community1 from "@/assets/community-1.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home · HSBC Mahjong Circle" }] }),
  component: Home,
});

function Home() {
  return (
    <Screen>
      <div className="px-5 pt-2 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Thursday · Monsoon edition</p>
        <h1 className="mt-1 font-display text-[28px] font-medium leading-tight text-[var(--ink)]">
          Good evening, Aanya.
        </h1>
        <p className="mt-1 text-[13px] text-[var(--taupe)]">A short edit chosen for you tonight.</p>
      </div>

      {/* This Week in Mahjong */}
      <section className="mx-5 mb-6 overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]">
        <div className="relative h-44 w-full overflow-hidden">
          <img src={feedGathering} alt="" loading="lazy" className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-[var(--ivory)]/85 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[var(--ink)]">
            This Week in Mahjong
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display text-[19px] leading-snug text-[var(--ink)]">
            Six drawing rooms quietly returned to the table this week.
          </h3>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-[var(--taupe)]">
            <span className="flex items-center gap-1.5"><Clock size={12} /> 3 min read</span>
            <span className="h-1 w-1 rounded-full bg-[var(--hairline)]" />
            <span>Editor's letter</span>
          </div>
        </div>
      </section>

      {/* GG featured banner */}
      <Link to="/collection" className="mx-5 mb-7 block overflow-hidden rounded-3xl border border-[var(--gold)]/40">
        <div className="relative h-48 w-full overflow-hidden">
          <img src={ggBanner} alt="Gaurav Gupta capsule" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">A Capsule · Atelier</p>
            <p className="mt-1 font-display text-[20px] leading-tight text-[var(--ivory)]">
              Gaurav Gupta for the Circle
            </p>
          </div>
        </div>
      </Link>

      <div className="px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[18px] text-[var(--ink)]">For your evening</h2>
          <button className="text-[11px] uppercase tracking-[0.18em] text-[var(--taupe)]">Filter</button>
        </div>
        <div className="gold-rule mt-2" />
      </div>

      <div className="space-y-6 px-5 pb-6 pt-5">
        <FeedVideo
          img={feedTiles}
          kind="Short film"
          duration="2:14"
          title="Why the West wind opens the round"
          author="Editorial"
        />
        <Link to="/article" className="block">
          <FeedArticle
            img={community1}
            kind="Heritage"
            time="6 min read"
            title="A short history of the bamboo tile — from Shanghai parlours to Bombay verandas"
            author="Niharika Sen"
          />
        </Link>
        <FeedVideo
          img={feedGathering}
          kind="How to"
          duration="1:42"
          title="Etiquette at the table, in three small gestures"
          author="Editorial"
        />
      </div>
    </Screen>
  );
}

function FeedVideo({ img, kind, duration, title, author }: any) {
  return (
    <article>
      <div className="relative h-56 w-full overflow-hidden rounded-2xl">
        <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[var(--ivory)]/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--ink)]">
          <Play size={10} className="fill-current" /> {kind}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-[var(--ivory)] backdrop-blur">
          {duration}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[17px] leading-snug text-[var(--ink)]">{title}</h3>
          <p className="mt-1 text-[11px] text-[var(--taupe)]">{author}</p>
        </div>
        <Bookmark size={16} className="shrink-0 text-[var(--taupe)]" strokeWidth={1.5} />
      </div>
    </article>
  );
}

function FeedArticle({ img, kind, time, title, author }: any) {
  return (
    <article className="grid grid-cols-[112px_1fr] gap-4">
      <div className="h-[112px] w-[112px] overflow-hidden rounded-2xl">
        <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--gold)]">{kind} · {time}</p>
        <h3 className="mt-1 font-display text-[16px] leading-snug text-[var(--ink)]">{title}</h3>
        <p className="mt-2 text-[11px] text-[var(--taupe)]">{author}</p>
      </div>
    </article>
  );
}