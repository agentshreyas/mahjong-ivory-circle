import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { BellRing, BookmarkCheck, ChevronRight, Pencil, Sparkles } from "lucide-react";
import profileMe from "@/assets/profile-me.jpg";
import { useEffect, useState } from "react";
import { useMember, writeMember } from "@/lib/member-store";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile · HSBC Mahjong Circle" }] }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const member = useMember();
  const [editing, setEditing] = useState(false);
  const [mobile, setMobile] = useState(member.mobile);
  const [email, setEmail] = useState(member.email);

  useEffect(() => {
    setMobile(member.mobile);
    setEmail(member.email);
  }, [member.mobile, member.email]);

  if (member.guest) {
    return (
      <Screen>
        <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--sand)] text-[var(--gold)]">
            <Sparkles size={22} />
          </div>
          <h1 className="mt-5 font-display text-[24px] leading-tight text-[var(--ink)]">
            Sign up to see your profile.
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-[var(--taupe)]">
            Guests may browse the Circle, but profiles are reserved for members.
          </p>
          <button
            onClick={() => {
              writeMember({ guest: false });
              navigate({ to: "/register" });
            }}
            className="mt-7 w-full max-w-[260px] rounded-2xl bg-[var(--hsbc)] py-3.5 text-[14px] font-medium text-[var(--ivory)] active:bg-[var(--hsbc-pressed)]"
          >
            Join the Circle
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="px-6 pt-2">
        <div className="flex flex-col items-center pt-2 text-center">
          <div className="rounded-full border border-[var(--gold)]/60 p-1">
            <img src={profileMe} alt="" className="h-24 w-24 rounded-full object-cover" />
          </div>
          <h1 className="mt-4 font-display text-[24px] leading-tight text-[var(--ink)]">{member.name || "—"}</h1>
          <p className="mt-1 text-[12px] text-[var(--taupe)]">
            {member.city || "City"} · Member since {member.memberSince}
          </p>

          {(member.styles.length > 0 || member.skill) && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {member.styles.map((s) => {
                const primary = s === member.primaryStyle;
                return (
                  <span
                    key={s}
                    className={`rounded-full border px-3 py-1 text-[11px] ${
                      primary
                        ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--ink)]"
                        : "border-[var(--hairline)] bg-[var(--sand)]/60 text-[var(--ink)]"
                    }`}
                  >
                    {primary && "★ "}{s}
                  </span>
                );
              })}
              {member.skill && (
                <span className="rounded-full border border-[var(--hairline)] bg-[var(--ivory)] px-3 py-1 text-[11px] text-[var(--taupe)]">
                  Skill · {member.skill}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="gold-rule my-6" />

        {/* Personal details */}
        <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--sand)]/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">Personal details</p>
            <button
              onClick={() => {
                if (editing) writeMember({ mobile, email });
                setEditing(!editing);
              }}
              className="flex items-center gap-1 text-[11px] text-[var(--ink)] underline underline-offset-2"
            >
              {editing ? "Save" : (<><Pencil size={11} /> Edit</>)}
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">Mobile</label>
              {editing ? (
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mt-1 w-full border-0 border-b border-[var(--hairline)] bg-transparent pb-1 text-[14px] text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-[14px] text-[var(--ink)]">{member.mobile}</p>
              )}
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.18em] text-[var(--taupe)]">Email</label>
              {editing ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border-0 border-b border-[var(--hairline)] bg-transparent pb-1 text-[14px] text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-[14px] text-[var(--ink)]">{member.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-4 divide-y divide-[var(--hairline)] rounded-2xl border border-[var(--hairline)] bg-[var(--ivory)]">
          <Link to="/my-bookings" className="flex items-center justify-between px-4 py-3.5">
            <span className="flex items-center gap-3 text-[13.5px] text-[var(--ink)]">
              <BookmarkCheck size={16} className="text-[var(--gold)]" /> My bookings
            </span>
            <ChevronRight size={16} className="text-[var(--taupe)]" />
          </Link>
          <Link to="/notifications" className="flex items-center justify-between px-4 py-3.5">
            <span className="flex items-center gap-3 text-[13.5px] text-[var(--ink)]">
              <BellRing size={16} className="text-[var(--gold)]" /> Manage notifications
            </span>
            <ChevronRight size={16} className="text-[var(--taupe)]" />
          </Link>
        </div>

        {/* HSBC Premier click-out */}
        <a
          href="https://www.hsbc.co.in/premier/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 mb-8 block overflow-hidden rounded-2xl border border-[var(--hsbc)]/25 bg-[var(--ink)] p-5 text-[var(--ivory)]"
        >
          <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--gold)]">HSBC Premier</p>
          <p className="mt-2 font-display text-[18px] leading-snug">
            Start your HSBC Premier journey.
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--ivory)]/70">
            Global privileges, concierge and Circle-only invitations.
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-[12px] text-[var(--ivory)]">
            Learn more <ChevronRight size={13} />
          </span>
        </a>
      </div>
    </Screen>
  );
}