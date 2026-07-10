import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Play, Bookmark, MapPin, ChevronRight } from "lucide-react";
import feedTiles from "@/assets/feed-tiles.jpg";
import feedGathering from "@/assets/feed-gathering.jpg";
import ggBanner from "@/assets/gg-banner.jpg";
import community1 from "@/assets/community-1.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import { useMember } from "@/lib/member-store";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home · HSBC Mahjong Circle" }] }),
  component: Home,
});

function Home() {
  const member = useMember();
  const firstName = (member.name || "there").split(" ")[0];
  const hasCity = !member.guest && !!member.city;
  const city = member.city;
  const cities = ["Mumbai", "Delhi", "Bengaluru"];
  return (
    <Screen>
      <div className="px-5 pt-2 pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Thursday · Monsoon edition</p>
        <h1 className="mt-1 font-display text-[28px] font-medium leading-tight text-[var(--ink)]">
          Welcome to Mahjong Circle, {firstName}.
        </h1>
        <p className="mt-1 text-[13px] text-[var(--taupe)]">A short edit chosen for you tonight.</p>
      </div>

      {/* 1. Gaurav Gupta banner (top) → Collection */}
      <Link to="/collection" className="mx-5 mb-6 block overflow-hidden rounded-3xl border border-[var(--gold)]/40">
        <div className="relative h-48 w-full overflow-hidden">
          <img src={ggBanner} alt="Gaurav Gupta capsule" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">A Capsule · Atelier</p>
            <p className="mt-1 font-display text-[20px] leading-tight text-[var(--ivory)]">
              Gaurav Gupta for the Circle
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--ivory)]/80">
              View the Collection <ChevronRight size={12} />
            </p>
          </div>
        </div>
      </Link>

      {/* 2. Upcoming events in your city */}
      <section className="px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[18px] text-[var(--ink)]">
            {hasCity ? `Upcoming in ${city}` : "Upcoming events"}
          </h2>
          <Link to="/events" className="text-[11px] uppercase tracking-[0.18em] text-[var(--taupe)]">All events</Link>
        </div>
        <div className="gold-rule mt-2" />
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { img: event1, title: "An evening at Khotachiwadi", date: "Sat · 22 Jun · 7pm", venue: hasCity ? city : cities[0] },
            { img: event2, title: "The Long Table", date: "Wed · 26 Jun · 6:30pm", venue: hasCity ? city : cities[1] },
          ].map((e) => (
            <Link key={e.title} to="/event-detail" className="w-[240px] shrink-0 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/50">
              <img src={e.img} alt="" className="h-28 w-full object-cover" />
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--gold)]">{e.date}</p>
                <p className="mt-1 font-display text-[14px] leading-tight text-[var(--ink)]">{e.title}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-[var(--taupe)]"><MapPin size={11} /> {e.venue}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. HSBC Circle teaser */}
      <Link
        to="/events"
        search={{ tab: "hsbc" }}
        className="mx-5 mt-6 block overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--ink)] text-[var(--ivory)]"
      >
        <div className="p-5">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">HSBC Premier</p>
          <h3 className="mt-2 font-display text-[20px] leading-tight">
            A quieter side of banking, for the Circle.
          </h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--ivory)]/70">
            Concierge, global privileges and invitations to Circle-only tables.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--ivory)]/40 px-4 py-2 text-[12px] text-[var(--ivory)]">
            See HSBC hosted events <ChevronRight size={13} />
          </span>
        </div>
      </Link>

      {/* 4. Magazine feed */}
      <div className="mt-7 px-5">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[18px] text-[var(--ink)]">The Magazine</h2>
        </div>
        <div className="gold-rule mt-2" />
      </div>
      <div className="space-y-6 px-5 pb-6 pt-5">
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
          img={feedTiles}
          kind="Short film"
          duration="2:14"
          title="Why the West wind opens the round"
          author="Editorial"
        />
        <Link to="/article" className="block">
          <FeedArticle
            img={feedGathering}
            kind="Editor's letter"
            time="3 min read"
            title="Six drawing rooms quietly returned to the table this week"
            author="Editorial"
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