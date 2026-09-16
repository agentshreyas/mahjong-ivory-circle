import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Gamepad2, Users, Award, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/play/my-circle")({
  head: () => ({
    meta: [
      { title: "My Circle — Mahjong Circle" },
      {
        name: "description",
        content:
          "Your games, friends, and achievements in the Mahjong Circle.",
      },
      { property: "og:title", content: "My Circle — Mahjong Circle" },
      {
        property: "og:description",
        content:
          "Your games, friends, and achievements in the Mahjong Circle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyCircle,
});

const previousGames = [
  { id: 1, date: "28 Aug 2026", table: "Mumbai Night", score: 1240, result: "Won" },
  { id: 2, date: "25 Aug 2026", table: "Delhi Classic", score: 980, result: "Lost" },
  { id: 3, date: "20 Aug 2026", table: "Bangalore Breeze", score: 1560, result: "Won" },
  { id: 4, date: "15 Aug 2026", table: "Chennai Royale", score: 1120, result: "Won" },
];

const friends = [
  { id: 1, name: "Ananya R.", initials: "AR", status: "Online" },
  { id: 2, name: "Vikram S.", initials: "VS", status: "Last seen 2h ago" },
  { id: 3, name: "Meher K.", initials: "MK", status: "Online" },
  { id: 4, name: "Rohan D.", initials: "RD", status: "Last seen 1d ago" },
];

const achievements = [
  { id: 1, title: "First Win", description: "Win your first game", progress: 1, total: 1, unlocked: true },
  { id: 2, title: "Socialite", description: "Make 10 friends in the Circle", progress: 4, total: 10, unlocked: false },
  { id: 3, title: "Regular", description: "Play 10 games", progress: 7, total: 10, unlocked: false },
  { id: 4, title: "High Roller", description: "Score 2000+ in a single game", progress: 1560, total: 2000, unlocked: false },
];

function SectionHeader({ icon: Icon, title }: { icon: typeof Gamepad2; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={18} strokeWidth={1.5} className="text-[var(--hsbc)]" />
      <h2 className="font-display text-[18px] text-[var(--ink)]">{title}</h2>
    </div>
  );
}

function MyCircle() {
  return (
    <Screen eyebrow="The Circle" title="My Circle" back>
      {/* Previous Games */}
      <section className="px-6 pt-6">
        <SectionHeader icon={Gamepad2} title="Previous Games" />
        <div className="mt-4 space-y-3">
          {previousGames.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40 px-4 py-3"
            >
              <div>
                <p className="text-[14px] font-medium text-[var(--ink)]">{game.table}</p>
                <p className="text-[11px] text-[var(--taupe)]">{game.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[14px] tabular-nums text-[var(--ink)]">{game.score.toLocaleString("en-IN")}</p>
                <p className={`text-[11px] ${game.result === "Won" ? "text-emerald-600" : "text-[var(--taupe)]"}`}>
                  {game.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Friends */}
      <section className="px-6 pt-8">
        <div className="flex items-center justify-between">
          <SectionHeader icon={Users} title="My Friends" />
          <button
            type="button"
            className="flex items-center gap-1 text-[12px] font-medium text-[var(--hsbc)]"
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex min-w-[96px] flex-col items-center rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-[13px] font-medium text-[var(--ivory)]">
                {friend.initials}
              </div>
              <p className="mt-2 truncate text-[12px] text-[var(--ink)]">{friend.name}</p>
              <p className="text-[10px] text-[var(--taupe)]">{friend.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="px-6 pt-8 pb-10">
        <SectionHeader icon={Award} title="My Achievements" />
        <div className="mt-4 space-y-3">
          {achievements.map((achievement) => {
            const pct = Math.min(100, Math.round((achievement.progress / achievement.total) * 100));
            return (
              <div
                key={achievement.id}
                className="rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-[var(--ink)]">{achievement.title}</p>
                    <p className="text-[12px] text-[var(--taupe)]">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      Unlocked
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--hairline)]">
                    <div
                      className="h-full rounded-full bg-[var(--hsbc)] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-right text-[11px] text-[var(--taupe)]">
                    {achievement.progress} / {achievement.total}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Screen>
  );
}
