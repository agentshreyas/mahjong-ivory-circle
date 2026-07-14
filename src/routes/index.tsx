import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CalendarDays, Sparkles, Crown, Feather, Users, Lock, ChevronDown } from "lucide-react";
import heroSplash from "@/assets/hero-splash.jpg";
import hsbcLogo from "@/assets/hsbc-logo.png";
import { addWaitlistEntry } from "@/lib/waitlist-store";

export const Route = createFileRoute("/")({
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
        content: "https://mahjongcircle.in/",
      },
    ],
    links: [
      { rel: "canonical", href: "https://mahjongcircle.in/" },
    ],
  }),
  component: LandingPage,
});

const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Please share your full name").max(80),
  email: z.string().trim().email("A valid email, please").max(160),
  city: z.string().trim().min(2, "City").max(60),
  referredBy: z.string().trim().max(80).optional(),
  reason: z.string().trim().max(500).optional(),
});

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--ivory)] text-[var(--ink)]">
      <SiteHeader />
      <Hero />
      <Ethos />
      <Exclusivity />
      <Waitlist />
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
        <Link to="/" className="font-display text-[17px] font-medium tracking-tight">
          Mahjong Circle
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] text-[var(--taupe)] md:flex">
          <a href="#ethos" className="hover:text-[var(--ink)]">Ethos</a>
          <a href="#exclusivity" className="hover:text-[var(--ink)]">Membership</a>
          <a href="#faq" className="hover:text-[var(--ink)]">FAQ</a>
          <Link to="/contact" className="hover:text-[var(--ink)]">Contact</Link>
        </nav>
        <a
          href="#waitlist"
          className="rounded-full bg-[var(--hsbc)] px-4 py-2 text-[12px] font-medium tracking-wide text-[var(--ivory)] shadow-[0_8px_20px_-8px_rgba(219,0,17,0.5)] transition active:bg-[var(--hsbc-pressed)]"
        >
          Request invitation
        </a>
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
        <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--gold)]">HSBC Presents</p>
        <h1 className="mt-5 font-display text-[44px] font-medium leading-[1.05] md:text-[68px]">
          The Mahjong<br />Circle
        </h1>
        <div className="mx-auto my-6 gold-rule w-28" />
        <p className="mx-auto max-w-[520px] text-[14px] leading-relaxed text-[var(--taupe)] md:text-[15px]">
          A private members' circle for connoisseurs of the game. Quiet rooms,
          considered company, and a couture collection celebrating the tile.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#waitlist"
            className="rounded-full bg-[var(--hsbc)] px-7 py-3.5 text-[13px] font-medium tracking-wide text-[var(--ivory)] shadow-[0_10px_30px_-10px_rgba(219,0,17,0.55)] transition active:bg-[var(--hsbc-pressed)]"
          >
            Request an invitation
          </a>
          <a
            href="#ethos"
            className="rounded-full border border-[var(--ink)]/15 px-7 py-3.5 text-[13px] font-medium text-[var(--ink)] transition hover:bg-[var(--sand)]"
          >
            Discover the circle
          </a>
        </div>
        <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-[var(--taupe)]">
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

function Waitlist() {
  const [state, setState] = useState<{
    name: string;
    email: string;
    city: string;
    referredBy: string;
    reason: string;
  }>({ name: "", email: "", city: "", referredBy: "", reason: "" });
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse(state);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your entries");
      return;
    }
    setError(null);
    addWaitlistEntry(parsed.data);
    setDone(true);
  }

  return (
    <section id="waitlist" className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gold)]">The Waitlist</p>
        <h2 className="mt-3 font-display text-[30px] leading-tight md:text-[40px]">
          Request an invitation.
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[13px] leading-relaxed text-[var(--taupe)]">
          Applications are reviewed monthly. We only reach out if there is a fit.
        </p>
      </div>

      {done ? (
        <div className="mt-12 rounded-3xl border border-[var(--gold)]/40 bg-[var(--ivory)] p-10 text-center">
          <Crown size={22} className="mx-auto text-[var(--gold)]" />
          <h3 className="mt-4 font-display text-[22px]">Received with thanks.</h3>
          <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-relaxed text-[var(--taupe)]">
            Your request is with the Circle. If there is a fit, we will be in
            touch at {state.email}.
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-12 grid gap-4 rounded-3xl border border-[var(--hairline)] bg-white/60 p-6 md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name">
              <input
                required
                maxLength={80}
                value={state.name}
                onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                className="input"
                placeholder="Aanya Bhatia"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                maxLength={160}
                value={state.email}
                onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                className="input"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="City">
              <input
                required
                maxLength={60}
                value={state.city}
                onChange={(e) => setState((s) => ({ ...s, city: e.target.value }))}
                className="input"
                placeholder="Mumbai"
              />
            </Field>
            <Field label="Referred by (optional)">
              <input
                maxLength={80}
                value={state.referredBy}
                onChange={(e) => setState((s) => ({ ...s, referredBy: e.target.value }))}
                className="input"
                placeholder="A member's name"
              />
            </Field>
          </div>
          <Field label="Why you'd like to join (optional)">
            <textarea
              maxLength={500}
              rows={4}
              value={state.reason}
              onChange={(e) => setState((s) => ({ ...s, reason: e.target.value }))}
              className="input resize-none"
              placeholder="A few lines is plenty."
            />
          </Field>
          {error && (
            <p className="text-[12px] text-[var(--hsbc)]">{error}</p>
          )}
          <button
            type="submit"
            className="mt-2 rounded-2xl bg-[var(--hsbc)] py-3.5 text-[13px] font-medium tracking-wide text-[var(--ivory)] shadow-[0_10px_28px_-10px_rgba(219,0,17,0.55)] transition active:bg-[var(--hsbc-pressed)]"
          >
            Submit request
          </button>
          <p className="text-center text-[11px] text-[var(--taupe)]">
            We use your details only to review your request. See our{" "}
            <Link to="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-[var(--taupe)]">
        {label}
      </span>
      {children}
      <style>{`
        .input {
          width: 100%;
          border: 1px solid var(--hairline);
          background: var(--ivory);
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 13px;
          color: var(--ink);
          outline: none;
          transition: border-color .15s;
        }
        .input:focus { border-color: var(--gold); }
      `}</style>
    </label>
  );
}

const preview = [
  { icon: CalendarDays, title: "Salons & Tournaments", body: "Intimate evenings in landmark rooms." },
  { icon: Sparkles, title: "The Collection", body: "A couture capsule celebrating the tile." },
  { icon: Crown, title: "Premier Privileges", body: "Curated benefits for HSBC Premier members." },
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
            <div
              key={p.title}
              className="rounded-3xl border border-[var(--hairline)] bg-white/60 p-8 transition hover:border-[var(--gold)]/50"
            >
              <Icon size={20} strokeWidth={1.5} className="text-[var(--hsbc)]" />
              <h3 className="mt-5 font-display text-[18px]">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--taupe)]">{p.body}</p>
            </div>
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
        <img src={hsbcLogo} alt="HSBC Premier" className="h-6 w-auto" />
        <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--taupe)] md:inline">
          · Premier
        </span>
      </div>
    </section>
  );
}

const faq = [
  { q: "How do I get invited?", a: "Members nominate future members. You may also request an invitation via the waitlist — the Circle reviews requests monthly." },
  { q: "Is there a fee?", a: "There is no application fee. Certain salons, tournaments and collection pieces are priced separately for members." },
  { q: "Where are events held?", a: "Landmark private rooms in select cities. Members receive location details on confirmation." },
  { q: "How is my data used?", a: "Only to review your request and, if there is a fit, to contact you. See our Privacy Policy for details." },
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
            In partnership with Nexaar & HSBC Premier.
          </p>
          <a
            href="https://www.esmagico.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[12px] leading-relaxed text-[var(--taupe)] hover:text-[var(--ink)]"
          >
            Crafted by Es Magico Experiences Pvt Lrd
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
            <li>Es Magico Experiences Pvt Ltd</li>
            <li>Mumbai, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--hairline)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-[0.22em] text-[var(--taupe)] md:flex-row">
          <span>© {new Date().getFullYear()}&nbsp;ES MAGICO. ALL RIGHTS RESERVED.</span>
          <span>By invitation only</span>
        </div>
      </div>
    </footer>
  );
}