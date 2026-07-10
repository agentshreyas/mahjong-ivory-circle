import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TopBar } from "@/components/app/top-bar";
import { CalendarDays, MapPin, Users, Share2, Check } from "lucide-react";
import event1 from "@/assets/event-1.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import { useEffect, useState } from "react";
import { toggleBooking, isBooked } from "@/lib/bookings-store";
import { useMember } from "@/lib/member-store";

export const Route = createFileRoute("/event-detail")({
  head: () => ({ meta: [{ title: "An evening at Khotachiwadi" }] }),
  component: EventDetail,
});

const EVENT = {
  id: "1",
  title: "An evening at Khotachiwadi",
  date: "Sat · 22 Jun · 7:00 pm",
  venue: "A private bungalow, Khotachiwadi, Mumbai",
  img: event1,
};

function EventDetail() {
  const navigate = useNavigate();
  const member = useMember();
  const [rsvp, setRsvp] = useState(false);
  const [shared, setShared] = useState(false);
  useEffect(() => setRsvp(isBooked(EVENT.id)), []);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = { title: EVENT.title, text: `${EVENT.title} · ${EVENT.date}`, url };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nav: any = navigator;
      if (nav.share) await nav.share(data);
      else if (nav.clipboard) await nav.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      /* no-op */
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      <div className="absolute inset-x-0 top-0 z-10">
        <TopBar back transparent />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-72 w-full overflow-hidden">
          <img src={EVENT.img} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ivory)] via-transparent to-black/30" />
        </div>

        <div className="-mt-12 relative px-6 pb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold)]">Sat · 22 June · 7:00 pm</p>
              <h1 className="mt-2 font-display text-[28px] leading-tight text-[var(--ink)]">
                {EVENT.title}
              </h1>
            </div>
            <button
              onClick={onShare}
              aria-label="Share event"
              className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--hairline)] bg-[var(--ivory)] text-[var(--ink)] shadow-sm"
            >
              {shared ? <Check size={16} /> : <Share2 size={16} strokeWidth={1.75} />}
            </button>
          </div>

          {/* Style & skill */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-[var(--gold)]/60 bg-[var(--gold)]/10 px-3 py-1 text-[11px] text-[var(--ink)]">Style · Cantonese</span>
            <span className="rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-3 py-1 text-[11px] text-[var(--ink)]">Skill · Intermediate & up</span>
          </div>

          <div className="gold-rule my-5" />

          <div className="space-y-3 text-[13px] text-[var(--taupe)]">
            <p className="flex items-center gap-2.5"><CalendarDays size={15} strokeWidth={1.5} /> Saturday, 22 June · 7:00 – 10:30 pm</p>
            <p className="flex items-center gap-2.5"><MapPin size={15} strokeWidth={1.5} /> {EVENT.venue}</p>
            <p className="flex items-center gap-2.5"><Users size={15} strokeWidth={1.5} /> 12 seats · 7 confirmed</p>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/50 p-3">
            <img src={avatar1} className="h-12 w-12 shrink-0 rounded-full object-cover" alt="" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Hosted by</p>
              <p className="truncate font-display text-[16px] text-[var(--ink)]">Aarti Mehra</p>
              <p className="truncate text-[11px] text-[var(--taupe)]">A long‑standing member of the Bombay Circle</p>
            </div>
          </div>

          <p className="mt-6 text-[14px] leading-relaxed text-[var(--ink)]">
            An intimate evening of three tables, light supper and a quiet introduction to scoring
            for those new to the game. Linen dress code; please arrive a little before seven.
          </p>
          <p className="mt-3 text-[12px] text-[var(--taupe)]">
            A nominal table fee of ₹2,500 may be settled at the venue.
          </p>

          <button
            onClick={() => {
              if (member.guest) {
                navigate({ to: "/register" });
                return;
              }
              toggleBooking({ id: EVENT.id, title: EVENT.title, date: EVENT.date, venue: EVENT.venue, img: EVENT.img });
              setRsvp(!rsvp);
            }}
            className={`mt-7 w-full rounded-2xl py-3.5 text-[14px] font-medium transition ${
              rsvp
                ? "border border-[var(--jade)] bg-[var(--jade)]/10 text-[var(--jade)]"
                : "bg-[var(--hsbc)] text-[var(--ivory)] shadow-[0_8px_24px_-8px_rgba(219,0,17,0.4)] active:bg-[var(--hsbc-pressed)]"
            }`}
          >
            {member.guest ? "Sign up to join waitlist" : rsvp ? "Waitlist joined" : "Join the Waitlist"}
          </button>
          {rsvp ? (
            <p className="mt-3 text-center text-[12px] text-[var(--taupe)]">
              We'll confirm by email and WhatsApp the morning of the event.
            </p>
          ) : (
            <p className="mt-3 text-center text-[11px] text-[var(--taupe)]">
              We'll confirm by email / WhatsApp. No payment required to RSVP.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}