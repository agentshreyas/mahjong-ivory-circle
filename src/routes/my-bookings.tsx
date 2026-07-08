import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TopBar } from "@/components/app/top-bar";
import { CalendarDays, MapPin } from "lucide-react";
import { useBookings } from "@/lib/bookings-store";
import { useMember } from "@/lib/member-store";

export const Route = createFileRoute("/my-bookings")({
  head: () => ({ meta: [{ title: "My Bookings · HSBC Mahjong Circle" }] }),
  component: MyBookings,
});

function MyBookings() {
  const navigate = useNavigate();
  const member = useMember();
  const bookings = useBookings();
  if (member.guest) {
    return (
      <div className="flex h-full flex-col bg-[var(--ivory)]">
        <TopBar back title="My bookings" />
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="font-display text-[22px] leading-tight text-[var(--ink)]">
            Sign up to book &amp; view.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-[var(--taupe)]">
            Bookings are reserved for members of the Circle.
          </p>
          <button
            onClick={() => navigate({ to: "/register" })}
            className="mt-6 w-full max-w-[240px] rounded-2xl bg-[var(--hsbc)] py-3 text-[13px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]"
          >
            Join the Circle
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col bg-[var(--ivory)]">
      <TopBar back title="My bookings" />
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {bookings.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-display text-[20px] text-[var(--ink)]">No bookings yet</p>
            <p className="mt-2 text-[12px] text-[var(--taupe)]">
              When you book a table, it will appear here.
            </p>
            <Link to="/events" className="mt-6 inline-block rounded-2xl bg-[var(--hsbc)] px-5 py-2.5 text-[13px] font-medium text-[var(--ivory)]">
              Browse events
            </Link>
          </div>
        ) : (
          <div className="space-y-3 pt-4">
            {bookings.map((b) => (
              <Link key={b.id} to="/event-detail" className="flex gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-3">
                <img src={b.img} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1 py-0.5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">{b.date}</p>
                  <p className="mt-1 truncate font-display text-[15px] text-[var(--ink)]">{b.title}</p>
                  <p className="mt-1 flex items-center gap-1.5 truncate text-[11px] text-[var(--taupe)]"><MapPin size={11} /> {b.venue}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--jade)]"><CalendarDays size={11} /> Seat booked</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}