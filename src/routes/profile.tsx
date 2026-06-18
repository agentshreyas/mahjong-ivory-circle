import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Settings } from "lucide-react";
import profileMe from "@/assets/profile-me.jpg";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · HSBC Mahjong Circle" }] }),
  component: Profile,
});

function Profile() {
  const [tab, setTab] = useState<"posts" | "events" | "friends">("posts");
  return (
    <Screen>
      <div className="relative px-6 pt-2">
        <button className="absolute right-5 top-2 grid h-9 w-9 place-items-center rounded-full border border-[var(--hairline)] text-[var(--taupe)]">
          <Settings size={15} strokeWidth={1.5} />
        </button>

        <div className="flex flex-col items-center pt-2 text-center">
          <div className="rounded-full border border-[var(--gold)]/60 p-1">
            <img src={profileMe} alt="" className="h-24 w-24 rounded-full object-cover" />
          </div>
          <h1 className="mt-4 font-display text-[24px] leading-tight text-[var(--ink)]">Aanya Bhatia</h1>
          <p className="mt-1 text-[12px] text-[var(--taupe)]">Mumbai · Member since 2024</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["History & Heritage", "Events Near Me", "Etiquette"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--hairline)] bg-[var(--sand)]/60 px-3 py-1 text-[11px] text-[var(--ink)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="gold-rule my-6" />

        <div className="flex justify-center gap-1 text-[12px]">
          {(["posts", "events", "friends"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 capitalize transition ${
                tab === t
                  ? "bg-[var(--ink)] text-[var(--ivory)]"
                  : "text-[var(--taupe)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6">
        {tab === "posts" && (
          <div className="grid grid-cols-3 gap-1.5">
            {[community1, community2, community3, event1, event2, community1].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {tab === "events" && (
          <div className="space-y-3">
            {[
              { img: event1, title: "An evening at Khotachiwadi", date: "Sat · 22 Jun" },
              { img: event2, title: "The Delhi Long Table", date: "Wed · 26 Jun" },
            ].map((e) => (
              <div key={e.title} className="flex gap-3 rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-2">
                <img src={e.img} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1 py-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)]">{e.date}</p>
                  <p className="mt-1 truncate font-display text-[14px] text-[var(--ink)]">{e.title}</p>
                  <p className="mt-0.5 text-[11px] text-[var(--jade)]">Seat held</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "friends" && (
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { img: avatar1, name: "Aarti" },
              { img: avatar2, name: "Vikram" },
              { img: avatar3, name: "Naina" },
              { img: avatar4, name: "Sushila" },
            ].map((f) => (
              <div key={f.name}>
                <img src={f.img} alt="" className="mx-auto h-14 w-14 rounded-full object-cover" />
                <p className="mt-1.5 text-[11px] text-[var(--ink)]">{f.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Screen>
  );
}