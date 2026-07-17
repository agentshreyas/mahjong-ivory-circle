import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Sparkles, Crown, Feather, Users, Lock, ChevronDown } from "lucide-react";
import heroSplash from "@/assets/hero-splash.jpg";
import hsbcLogo from "@/assets/hsbc-logo.png.asset.json";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "The Mahjong Circle — By Invitation Only" },
      {
        name: "description",
        content:
          "A private members' circle for connoisseurs of the game. Quiet rooms, considered company, and a couture collection celebrating the tile. Invitation only.",
      },
      { property: "og:title", content: "The Mahjong Circle — By Invitation Only" },
      {
        property: "og:description",
        content:
          "A private members' circle for connoisseurs of the game. Invitation only.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://mahjong-ivory-circle.lovable.app/landing",
      },
    ],
    links: [
      { rel: "canonical", href: "https://mahjong-ivory-circle.lovable.app/landing" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--ivory)] text-[var(--ink)]">
      <SiteHeader />
      <Hero />
      <Ethos />
      <Exclusivity />
      <Preview />
      <PartnerStrip />
      <FAQ />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--hairline)] bg-[var(--ivory)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/landing" className="font-display text-[17px] font-medium tracking-tight">
          Mahjong Circle
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] text-[var(--taupe)] md:flex">
          <a href="#ethos" className="hover:text-[var(--ink)]">Ethos</a>
          <a href="#exclusivity" className="hover:text-[var(--ink)]">Membership</a>
          <a href="#faq" className="hover:text-[var(--ink)]">FAQ</a>
          <Link to="/contact" className="hover:text-[var(--ink)]">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroSplash} alt="" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ivory)]/30 via-[var(--ivory)]/60 to-[var(--ivory)]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-32 text-center md:pt-36 md:pb-44">
        <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--hsbc)]">HSBC Presents</p>
        <h1 className="mt-5 font-display text-[44px] font-medium leading-[1.05] md:text-[68px]">
          The Mahjong<br />Circle
        </h1>
        <div className="mx-auto my-6 gold-rule w-28" />
        <p className="mx-auto max-w-[520px] text-[14px] leading-relaxed text-[var(--taupe)] md:text-[15px]">
          A private members' circle for connoisseurs of the game. Quiet rooms,
          considered company, and a couture collection celebrating the tile.
        </p>
        <p className="mt-9 text-[10px] uppercase tracking-[0.24em] text-[var(--taupe)]">
          By invitation only · No bank login required
        </p>
      </div>
    </section>
  );
}

const pillars = [
  { icon: Feather, title: "Quiet Rooms", body: "Private salons in landmark addresses across select cities." },
  { icon: Users, title: "Considered Company", body: "A vetted circle of players, collectors and hosts." },
  { icon: Sparkles, title: "Couture Collection", body: "A limited edition capsule celebrating the tile." },
];

function Ethos() {
  return (
    <section id="ethos" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gold)]">The Ethos</p>
        <h2 className="mt-3 font-display text-[30px] leading-tight md:text-[40px]">
          A slower way to play.
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="rounded-3xl border border-[var(--hairline)] bg-white/50 p-8 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[var(--hsbc)]/10 text-[var(--hsbc)]">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-[18px] text-[var(--ink)]">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--taupe)]">{p.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Exclusivity() {
  return (
    <section id="exclusivity" className="bg-[var(--sand)]/60 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-[var(--ivory)] px-3 py-1">
          <Lock size={11} className="text-[var(--gold)]" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--taupe)]">
            By Invitation Only
          </span>
        </div>
        <h2 className="mt-6 font-display text-[30px] leading-tight md:text-[42px]">
          Not for everyone —<br className="hidden md:block" /> and that is the point.
        </h2>
        <div className="mx-auto my-6 gold-rule w-24" />
        <p className="mx-auto max-w-[560px] text-[14px] leading-relaxed text-[var(--taupe)] md:text-[15px]">
          Membership is capped and vetted. Each cohort is curated by hand — a
          quiet room of players, hosts and collectors introduced by those
          already inside. There is no application fee, no public sign-up, and
          no shortcut. If the circle is right for you, we will find our way to
          each other.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-[var(--taupe)]">
          <span>Membership capped</span>
          <span className="text-[var(--gold)]">·</span>
          <span>Vetted by the Circle</span>
          <span className="text-[var(--gold)]">·</span>
          <span>Founding cohort 2026</span>
        </div>
      </div>
    </section>
  );
}

const preview = [
  { icon: CalendarDays, title: "Salons & Tournaments", body: "Intimate evenings in landmark rooms.", to: "/events" as const },
  { icon: Sparkles, title: "The Collection", body: "A couture capsule celebrating the tile.", to: "/collection" as const },
  { icon: Crown, title: "Premier Privileges", body: "Curated benefits for HSBC Premier members.", to: "/premier" as const },
];

function Preview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gold)]">Inside the Circle</p>
        <h2 className="mt-3 font-display text-[30px] leading-tight md:text-[40px]">
          What members experience.
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {preview.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.title}
              to={p.to}
              className="group rounded-3xl border border-[var(--hairline)] bg-white/60 p-8 transition hover:border-[var(--gold)]/50"
            >
              <Icon size={20} strokeWidth={1.5} className="text-[var(--hsbc)]" />
              <h3 className="mt-5 font-display text-[18px]">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--taupe)]">{p.body}</p>
              <span className="mt-5 inline-block text-[11px] uppercase tracking-[0.22em] text-[var(--taupe)] group-hover:text-[var(--ink)]">
                Preview →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function PartnerStrip() {
  return (
    <section className="border-y border-[var(--hairline)] bg-[var(--sand)]/40 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-4 px-6 md:flex-row md:gap-8">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--taupe)]">
          In partnership with
        </span>
        <img src={hsbcLogo.url} alt="HSBC Premier" className="h-6 w-auto" />
        <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--taupe)] md:inline">
          · Premier
        </span>
      </div>
    </section>
  );
}

const faq = [
  { q: "How do I get invited?", a: "Members nominate future members. The Circle reviews nominations monthly and reaches out if there is a fit." },
  { q: "Is there a fee?", a: "There is no application fee. Certain salons, tournaments and collection pieces are priced separately for members." },
  { q: "Where are events held?", a: "Landmark private rooms in select cities. Members receive location details on confirmation." },
  { q: "How is my data used?", a: "Only to communicate with members and prospects. See our Privacy Policy for details." },
];

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gold)]">Questions</p>
        <h2 className="mt-3 font-display text-[30px] leading-tight md:text-[40px]">
          Frequently, quietly, asked.
        </h2>
      </div>
      <div className="mt-10 divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
        {faq.map((f, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-display text-[16px] text-[var(--ink)]">{f.q}</span>
              <ChevronDown
                size={16}
                className="text-[var(--taupe)] transition group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--taupe)]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--ivory)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-[18px] text-[var(--ink)]">Mahjong Circle</p>
          <p className="mt-3 max-w-[280px] text-[12px] leading-relaxed text-[var(--taupe)]">
            A Nexaar Pvt Ltd initiative, in partnership with HSBC Premier.
          </p>
          <a
            href="https://www.esmagico.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[12px] leading-relaxed text-[var(--taupe)] hover:text-[var(--ink)]"
          >
            Crafted by Es Magico
          </a>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">Company</p>
          <ul className="mt-4 space-y-2 text-[13px] text-[var(--taupe)]">
            <li><Link to="/privacy" className="hover:text-[var(--ink)]">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[var(--ink)]">Terms of Use</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--ink)]">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">Contact</p>
          <ul className="mt-4 space-y-2 text-[13px] text-[var(--taupe)]">
            <li>
              <a href="mailto:concierge@mahjongcircle.in" className="hover:text-[var(--ink)]">
                concierge@mahjongcircle.in
              </a>
            </li>
            <li>Nexaar Pvt Ltd</li>
            <li>Mumbai, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--hairline)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.22em] text-[var(--taupe)] md:flex-row">
          <span>© {new Date().getFullYear()} Nexaar Pvt Ltd. All rights reserved.</span>
          <span>By invitation only</span>
        </div>
      </div>
    </footer>
  );
}
