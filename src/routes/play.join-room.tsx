import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Search, Mail, User, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/play/join-room")({
  head: () => ({
    meta: [
      { title: "Join Room — Mahjong Circle" },
      {
        name: "description",
        content:
          "Search for a host and view your open room invitations in the Circle.",
      },
      { property: "og:title", content: "Join Room — Mahjong Circle" },
      {
        property: "og:description",
        content:
          "Search for a host and view your open room invitations in the Circle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JoinRoom,
});

const invitations = [
  {
    id: "inv-1",
    host: "Ananya R.",
    roomName: "Saturday Soirée",
    time: "Sat, 6 Sep · 7:00 PM",
    status: "Pending",
  },
  {
    id: "inv-2",
    host: "Vikram S.",
    roomName: "Lacquer Table",
    time: "Sun, 7 Sep · 4:30 PM",
    status: "Pending",
  },
  {
    id: "inv-3",
    host: "Meher K.",
    roomName: "Jade Tiles Night",
    time: "Mon, 8 Sep · 8:00 PM",
    status: "Accepted",
  },
];

function JoinRoom() {
  const [query, setQuery] = useState("");

  const filteredInvitations = invitations.filter((inv) =>
    inv.host.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Screen eyebrow="The Circle" title="Join Room" back>
      <section className="px-6 pt-4 pb-2 text-center">
        <p className="mx-auto max-w-[280px] text-[13px] leading-[1.65] text-[var(--taupe)]/90">
          Search for a host by name or pick an open invitation below.
        </p>
      </section>

      {/* Search by host name */}
      <section className="px-6 pt-6 pb-2">
        <div className="relative">
          <Search
            size={18}
            strokeWidth={1.5}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--taupe)]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search host name"
            className="h-12 w-full rounded-full border border-[var(--hairline)] bg-[var(--sand)]/40 pl-11 pr-4 text-[14px] text-[var(--ink)] placeholder:text-[var(--taupe)]/60 focus:border-[var(--gold)] focus:bg-[var(--ivory)] focus:outline-none"
          />
        </div>
      </section>

      <div className="mx-6 mt-6 gold-rule" />

      {/* Room invitations */}
      <section className="px-6 pt-6 pb-10">
        <div className="flex items-center gap-2">
          <Mail size={16} strokeWidth={1.5} className="text-[var(--gold)]" />
          <h2 className="font-display text-[18px] text-[var(--ink)]">
            Room invitations
          </h2>
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[var(--taupe)]">
          Open invites
        </p>

        <div className="mt-5 flex flex-col gap-4">
          {filteredInvitations.length === 0 ? (
            <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/40 px-6 py-10 text-center">
              <p className="text-[13px] text-[var(--taupe)]">
                No invitations found for that host.
              </p>
            </div>
          ) : (
            filteredInvitations.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center gap-4 rounded-3xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--ivory)] text-[var(--hsbc)]">
                  <User size={22} strokeWidth={1.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] text-[var(--ink)]">
                    {inv.roomName}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-[var(--taupe)]">
                    <User size={11} strokeWidth={1.5} />
                    <span className="truncate">Host: {inv.host}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--taupe)]">
                    <Clock size={11} strokeWidth={1.5} />
                    <span>{inv.time}</span>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] ${
                    inv.status === "Accepted"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-[var(--hsbc)]/10 text-[var(--hsbc)]"
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </Screen>
  );
}
