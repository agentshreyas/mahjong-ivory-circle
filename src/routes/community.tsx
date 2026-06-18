import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Heart, MessageCircle, Plus, UserPlus } from "lucide-react";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community · HSBC Mahjong Circle" }] }),
  component: Community,
});

const members = [
  { name: "Aarti Mehra", city: "Mumbai", img: avatar1 },
  { name: "Vikram Iyer", city: "Bengaluru", img: avatar2 },
  { name: "Naina Khanna", city: "Delhi", img: avatar3 },
  { name: "Sushila Rao", city: "Hyderabad", img: avatar4 },
];

const posts = [
  {
    name: "Aarti Mehra",
    where: "Bombay · Wednesday play",
    avatar: avatar1,
    img: community1,
    caption: "A long, slow evening at the Khotachiwadi table. The bamboos behaved themselves.",
    likes: 18,
    comments: 4,
  },
  {
    name: "Vikram Iyer",
    where: "Bengaluru",
    avatar: avatar2,
    img: community2,
    caption: "First light, second pot of Darjeeling. The tiles can wait.",
    likes: 11,
    comments: 2,
  },
  {
    name: "Naina Khanna",
    where: "Delhi",
    avatar: avatar3,
    img: community3,
    caption: "Hosted my mother's circle on the veranda last night. She won, of course.",
    likes: 27,
    comments: 9,
  },
];

function Community() {
  return (
    <Screen title="Community" eyebrow="The Circle">
      {/* Members near you */}
      <section className="pl-5 pt-2">
        <div className="flex items-center justify-between pr-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Members near you</p>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">Mumbai</span>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto pb-4 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {members.map((m) => (
            <div
              key={m.name}
              className="w-[128px] shrink-0 rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/50 p-3 text-center"
            >
              <img src={m.img} alt="" className="mx-auto h-14 w-14 rounded-full object-cover" />
              <p className="mt-2 truncate font-display text-[13px] text-[var(--ink)]">{m.name}</p>
              <p className="text-[10px] text-[var(--taupe)]">{m.city}</p>
              <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-full border border-[var(--hairline)] py-1.5 text-[10px] uppercase tracking-[0.16em] text-[var(--ink)]">
                <UserPlus size={11} /> Add
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="px-5">
        <div className="gold-rule" />
      </div>

      {/* Feed */}
      <section className="space-y-7 px-5 pb-6 pt-5">
        {posts.map((p, i) => (
          <article key={i}>
            <div className="mb-3 flex items-center gap-3">
              <img src={p.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="truncate font-display text-[14px] text-[var(--ink)]">{p.name}</p>
                <p className="truncate text-[11px] text-[var(--taupe)]">{p.where}</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--hairline)]">
              <img src={p.img} alt="" loading="lazy" className="h-72 w-full object-cover" />
            </div>
            <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--ink)]">{p.caption}</p>
            <div className="mt-2 flex items-center gap-5 text-[11px] text-[var(--taupe)]">
              <button className="flex items-center gap-1"><Heart size={13} strokeWidth={1.5} /> {p.likes}</button>
              <button className="flex items-center gap-1"><MessageCircle size={13} strokeWidth={1.5} /> {p.comments}</button>
            </div>
          </article>
        ))}
      </section>

      {/* FAB */}
      <Link
        to="/create-post"
        className="absolute bottom-20 right-5 z-10 grid h-12 w-12 place-items-center rounded-full bg-[var(--hsbc)] text-[var(--ivory)] shadow-[0_10px_24px_-6px_rgba(219,0,17,0.5)]"
        aria-label="Share a photo"
      >
        <Plus size={20} />
      </Link>
    </Screen>
  );
}