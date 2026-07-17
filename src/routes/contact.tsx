import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Clock } from "lucide-react";
import { SiteFooter } from "./landing";
import { LegalHeader } from "./privacy";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mahjong Circle" },
      { name: "description", content: "Reach the Mahjong Circle team at Nexaar Pvt Ltd." },
      { property: "og:title", content: "Contact — Mahjong Circle" },
      { property: "og:description", content: "Reach the Mahjong Circle team at Nexaar Pvt Ltd." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)]">
      <LegalHeader />
      <section className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gold)]">Contact</p>
        <h1 className="mt-3 font-display text-[36px] leading-tight md:text-[48px]">
          We prefer a quiet conversation.
        </h1>
        <div className="my-6 gold-rule w-24" />
        <p className="max-w-[520px] text-[14px] leading-relaxed text-[var(--taupe)]">
          The Circle is small by design. Write to us and a member of the team
          will reply personally — usually within two working days.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Card icon={Mail} title="Write" body="concierge@mahjongcircle.in" href="mailto:concierge@mahjongcircle.in" />
          <Card icon={Clock} title="Reply time" body="Within two working days" />
          <Card icon={MapPin} title="Office" body="Nexaar Pvt Ltd, Mumbai, India" />
          <Card icon={Mail} title="Privacy" body="privacy@nexaar.co" href="mailto:privacy@nexaar.co" />
        </div>

        <div className="mt-14 rounded-3xl border border-[var(--hairline)] bg-white/60 p-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">Membership</p>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--taupe)]">
            The Circle is by invitation only. Members nominate future members.
          </p>
          <Link
            to="/landing"
            className="mt-5 inline-block rounded-full bg-[var(--hsbc)] px-6 py-3 text-[13px] font-medium tracking-wide text-[var(--ivory)] shadow-[0_10px_24px_-8px_rgba(219,0,17,0.55)] transition active:bg-[var(--hsbc-pressed)]"
          >
            Learn more
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  body,
  href,
}: {
  icon: typeof Mail;
  title: string;
  body: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-[var(--hairline)] bg-white/60 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--hsbc)]/10 text-[var(--hsbc)]">
        <Icon size={16} strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--taupe)]">{title}</p>
        <p className="mt-1 text-[14px] text-[var(--ink)]">{body}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition hover:opacity-90">
      {inner}
    </a>
  ) : (
    inner
  );
}