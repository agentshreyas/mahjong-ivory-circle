import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/app/top-bar";
import { CalendarDays, MapPin, Users } from "lucide-react";
import event1 from "@/assets/event-1.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import { useState } from "react";

export const Route = createFileRoute("/event-detail")({
  head: () => ({ meta: [{ title: "An evening at Khotachiwadi" }] }),
  component: EventDetail,
});

function EventDetail() {
  const [rsvp, setRsvp] = useState(false);
  return (
    <div className="relative flex h-full flex-col bg-[var(--ivory)]">
      <div className="absolute inset-x-0 top-0 z-10">
        <TopBar back transparent />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-72 w-full overflow-hidden">
          <img src={event1} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ivory)] via-transparent to-black/30" />
        </div>

        <div className="-mt-12 relative px-6 pb-8">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--gold)]">Sat · 22 June · 7:00 pm</p>
          <h1 className="mt-2 font-display text-[28px] leading-tight text-[var(--ink)]">
            An evening at Khotachiwadi
          </h1>

          <div className="gold-rule my-5" />

          <div className="space-y-3 text-[13px] text-[var(--taupe)]">
            <p className="flex items-center gap-2.5"><CalendarDays size={15} strokeWidth={1.5} /> Saturday, 22 June · 7:00 – 10:30 pm</p>
            <p className="flex items-center gap-2.5"><MapPin size={15} strokeWidth={1.5} /> A private bungalow, Khotachiwadi, Mumbai</p>
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
            onClick={() => setRsvp(!rsvp)}
            className={`mt-7 w-full rounded-2xl py-3.5 text-[14px] font-medium transition ${
              rsvp
                ? "border border-[var(--jade)] bg-[var(--jade)]/10 text-[var(--jade)]"
                : "bg-[var(--hsbc)] text-[var(--ivory)] shadow-[0_8px_24px_-8px_rgba(219,0,17,0.4)] active:bg-[var(--hsbc-pressed)]"
            }`}
          >
            {rsvp ? "Your seat is held" : "Block Your Time"}
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