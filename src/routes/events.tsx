import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { MapPin, CalendarDays } from "lucide-react";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events · HSBC Mahjong Circle" }] }),
  component: Events,
});

const events = [
  {
    id: "1",
    img: event1,
    title: "An evening at Khotachiwadi",
    date: "Sat · 22 Jun · 7:00 pm",
    venue: "Heritage drawing room, Mumbai",
    host: "Hosted by Aarti Mehra",
    hsbc: true,
  },
  {
    id: "2",
    img: event2,
    title: "The Delhi Long Table",
    date: "Wed · 26 Jun · 6:30 pm",
    venue: "The Imperial, New Delhi",
    host: "HSBC Hosted",
    hsbc: true,
  },
  {
    id: "3",
    img: event3,
    title: "Courtyard play, Falaknuma",
    date: "Sun · 30 Jun · 5:00 pm",
    venue: "Hyderabad",
    host: "Hosted by Rohan Reddy",
    hsbc: false,
  },
  {
    id: "4",
    img: event1,
    title: "Bengaluru Garden Circle",
    date: "Sat · 6 Jul · 4:00 pm",
    venue: "Cooke Town bungalow",
    host: "Hosted by Priya Nair",
    hsbc: false,
  },
];

function Events() {
  const [tab, setTab] = useState<"all" | "hsbc">("all");
  const visible = tab === "all" ? events : events.filter((e) => e.hsbc);
  return (
    <Screen title="Events" eyebrow="June · July">
      <div className="px-5">
        <div className="mt-1 flex rounded-full border border-[var(--hairline)] bg-[var(--sand)]/50 p-1">
          {(["all", "hsbc"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2 text-[12px] tracking-wide transition ${
                tab === t
                  ? "bg-[var(--ivory)] font-medium text-[var(--ink)] shadow-sm"
                  : "text-[var(--taupe)]"
              }`}
            >
              {t === "all" ? "All gatherings" : "HSBC Hosted"}
            </button>
          ))}
        </div>

        <p className="mt-5 text-[11px] text-[var(--taupe)]">
          A small payment may be requested at the venue. The Circle never takes payment in the app.
        </p>
      </div>

      <div className="space-y-5 px-5 pb-6 pt-5">
        {visible.map((e) => (
          <Link
            key={e.id}
            to="/event-detail"
            className="block overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/50"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img src={e.img} alt="" loading="lazy" className="h-full w-full object-cover" />
              {e.hsbc && (
                <span className="absolute right-3 top-3 rounded-full bg-[var(--hsbc)] px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[var(--ivory)]">
                  HSBC Hosted
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-display text-[19px] leading-snug text-[var(--ink)]">{e.title}</h3>
              <div className="mt-3 space-y-1.5 text-[12px] text-[var(--taupe)]">
                <p className="flex items-center gap-2"><CalendarDays size={13} strokeWidth={1.5} /> {e.date}</p>
                <p className="flex items-center gap-2"><MapPin size={13} strokeWidth={1.5} /> {e.venue}</p>
              </div>
              <div className="gold-rule mt-3" />
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--gold)]">{e.host}</p>
            </div>
          </Link>
        ))}
      </div>
    </Screen>
  );
}