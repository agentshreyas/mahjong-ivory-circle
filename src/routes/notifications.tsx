import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/app/top-bar";
import { Check } from "lucide-react";
import { useMember, writeMember } from "@/lib/member-store";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Manage notifications" }] }),
  component: Notifications,
});

const GROUPS: Array<{ key: "editorial" | "events" | "system"; title: string; note: string }> = [
  { key: "editorial", title: "Editorial pings", note: "New articles, films and the weekly letter." },
  { key: "events", title: "Event nudges", note: "RSVP confirmations and gentle reminders — your table is tomorrow." },
  { key: "system", title: "System notes", note: "Account, security and important service updates." },
];

function Notifications() {
  const member = useMember();
  return (
    <div className="flex h-full flex-col bg-[var(--ivory)]">
      <TopBar back title="Manage notifications" />
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-2">
        <p className="text-[12px] leading-relaxed text-[var(--taupe)]">
          Choose what the Circle may send you. You can change these at any time from your profile.
        </p>
        <div className="mt-6 divide-y divide-[var(--hairline)] rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40">
          {GROUPS.map((g) => {
            const on = member.notifications[g.key];
            return (
              <button
                key={g.key}
                onClick={() => writeMember({ notifications: { ...member.notifications, [g.key]: !on } })}
                className="flex w-full items-start gap-3 px-4 py-4 text-left"
              >
                <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border ${on ? "border-[var(--hsbc)] bg-[var(--hsbc)]" : "border-[var(--hairline)] bg-[var(--ivory)]"}`}>
                  {on && <Check size={13} className="text-[var(--ivory)]" />}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15px] text-[var(--ink)]">{g.title}</span>
                  <span className="mt-0.5 block text-[12px] text-[var(--taupe)]">{g.note}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-6 text-center text-[11px] text-[var(--taupe)]">
          The Circle sends sparingly, and only about the game, the rooms and the collection.
        </p>
      </div>
    </div>
  );
}