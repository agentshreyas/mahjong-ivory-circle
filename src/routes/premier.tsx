import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app/screen";
import { Crown, ShieldCheck, Globe2, Sparkles, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/premier")({
  head: () => ({
    meta: [
      { title: "HSBC Premier — Your Journey" },
      {
        name: "description",
        content:
          "HSBC Premier — a private banking journey for high-net-worth clients. Global privileges, dedicated relationship management, and wealth advisory.",
      },
      { property: "og:title", content: "HSBC Premier — Your Journey" },
      {
        property: "og:description",
        content:
          "A private banking journey for HSBC Premier clients — global privileges, dedicated relationship management, and wealth advisory.",
      },
    ],
  }),
  component: Premier,
});

const pillars = [
  {
    icon: Globe2,
    title: "Global Privileges",
    body: "Fee-free access to your money in 30+ markets, priority servicing worldwide, and instant transfers between Premier accounts.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Relationship Manager",
    body: "A named Premier RM who understands your family, business and ambitions — one call, one point of contact.",
  },
  {
    icon: Sparkles,
    title: "Wealth & Advisory",
    body: "Curated investment ideas, portfolio reviews and legacy planning from HSBC's global wealth desk.",
  },
];

const journey = [
  { step: "01", title: "Discover", body: "A private conversation to map your goals across banking, wealth and lifestyle." },
  { step: "02", title: "Onboard", body: "White-glove onboarding with your Premier RM — accounts, cards and access set up end-to-end." },
  { step: "03", title: "Grow", body: "Ongoing advisory reviews, curated events like The Mahjong Circle, and global mobility support." },
];

function Premier() {
  return (
    <Screen>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-6 pb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hsbc)] via-[#a4000f] to-[#5c0009]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur">
            <Crown size={12} className="text-[var(--gold)]" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/90">
              HSBC Premier
            </span>
          </div>
          <h1 className="mt-4 font-display text-[30px] font-medium leading-[1.1] text-white">
            Your journey,<br />privately advised.
          </h1>
          <p className="mt-3 max-w-[280px] text-[13px] leading-relaxed text-white/80">
            A relationship banking experience designed for HNIs and their families — global reach, quiet
            expertise, and access to moments like The Mahjong Circle.
          </p>
          <a
            href="https://www.hsbc.co.in/premier/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2.5 text-[12px] font-medium tracking-wide text-[var(--hsbc)] shadow-lg transition active:scale-[0.98]"
          >
            Explore Premier <ChevronRight size={14} />
          </a>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-5 pt-8">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">Why Premier</p>
        <h2 className="mt-1 font-display text-[22px] leading-tight text-[var(--ink)]">
          Built around the way you live.
        </h2>
        <div className="mt-5 space-y-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex gap-3 rounded-2xl border border-[var(--hairline)] bg-white/60 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--hsbc)]/10 text-[var(--hsbc)]">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[var(--ink)]">{p.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[var(--taupe)]">{p.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Journey */}
      <section className="px-5 pt-10">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">The Journey</p>
        <h2 className="mt-1 font-display text-[22px] leading-tight text-[var(--ink)]">
          Three quiet steps.
        </h2>
        <ol className="mt-5 space-y-4">
          {journey.map((j) => (
            <li key={j.step} className="flex gap-4">
              <span className="font-display text-[22px] leading-none text-[var(--hsbc)]">
                {j.step}
              </span>
              <div>
                <p className="text-[13px] font-medium text-[var(--ink)]">{j.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--taupe)]">{j.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="px-5 pt-10 pb-24">
        <div className="rounded-3xl bg-[var(--ink)] p-6 text-center text-[var(--ivory)]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">Ready when you are</p>
          <h3 className="mt-2 font-display text-[20px] leading-tight">
            Speak with a Premier Relationship Manager
          </h3>
          <p className="mx-auto mt-2 max-w-[260px] text-[12px] leading-relaxed text-[var(--ivory)]/70">
            Request a private conversation — no obligation, no bank login required.
          </p>
          <Link
            to="/register"
            className="mt-5 inline-block rounded-full bg-[var(--hsbc)] px-6 py-3 text-[13px] font-medium tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(219,0,17,0.6)] transition active:scale-[0.98]"
          >
            Request a callback
          </Link>
        </div>
      </section>
    </Screen>
  );
}