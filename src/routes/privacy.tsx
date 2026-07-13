import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "./landing";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Mahjong Circle" },
      { name: "description", content: "How Nexaar Pvt Ltd handles your data for the Mahjong Circle." },
      { property: "og:title", content: "Privacy Policy — Mahjong Circle" },
      { property: "og:description", content: "How Nexaar Pvt Ltd handles your data for the Mahjong Circle." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)]">
      <LegalHeader />
      <article className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gold)]">Draft — pending legal review</p>
        <h1 className="mt-3 font-display text-[36px] leading-tight md:text-[44px]">Privacy Policy</h1>
        <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-[var(--taupe)]">
          Last updated: {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </p>
        <div className="prose-legal mt-10 space-y-8 text-[14px] leading-relaxed text-[var(--taupe)]">
          <P>
            Nexaar Pvt Ltd ("Nexaar", "we", "us") operates the Mahjong Circle
            (the "Circle") in partnership with HSBC Premier. This policy explains
            what we collect, why, and your choices.
          </P>
          <Section title="1. What we collect">
            <P>
              Information you provide when you request an invitation or interact
              with the Circle — including your name, email address, city, any
              referrer's name, and the reasons you share for wishing to join.
              We also collect limited technical information such as device type
              and basic analytics required to operate the site.
            </P>
          </Section>
          <Section title="2. How we use it">
            <P>
              To review your application to the Circle, to contact you if there
              is a fit, to run and improve the Circle's events and experiences,
              and to meet our legal obligations. We do not sell your data.
            </P>
          </Section>
          <Section title="3. Lawful basis">
            <P>
              We process your data on the basis of your consent (when you submit
              a request), our legitimate interests in operating the Circle, and
              where necessary to comply with law.
            </P>
          </Section>
          <Section title="4. Sharing">
            <P>
              Where relevant to a Premier-linked privilege you specifically
              request, and only with your consent, we may share limited
              information with HSBC. We use trusted processors to host, secure,
              and communicate — bound by confidentiality and data protection
              obligations. We do not share your data for advertising.
            </P>
          </Section>
          <Section title="5. Retention">
            <P>
              We keep waitlist submissions for up to 24 months from your last
              interaction with the Circle, after which they are deleted or
              anonymised. Member records are held for the duration of
              membership and a reasonable period thereafter.
            </P>
          </Section>
          <Section title="6. Your rights">
            <P>
              You may request access, correction, deletion, or a copy of your
              data. You may withdraw your consent at any time by writing to
              us. Where applicable, you have the right to complain to your
              local data protection authority.
            </P>
          </Section>
          <Section title="7. Cookies">
            <P>
              We use a small number of first-party cookies and similar
              technologies to keep the site working and to understand
              aggregate usage. We do not use third-party advertising cookies.
            </P>
          </Section>
          <Section title="8. Contact">
            <P>
              For any privacy question, write to{" "}
              <a href="mailto:privacy@nexaar.co" className="underline underline-offset-2 hover:text-[var(--ink)]">
                privacy@nexaar.co
              </a>
              . Nexaar Pvt Ltd, Mumbai, India.
            </P>
          </Section>
          <P className="italic">
            This draft is provided for review and will be updated before the
            Circle opens to members.
          </P>
        </div>
        <div className="mt-14">
          <Link to="/landing" className="text-[12px] uppercase tracking-[0.22em] text-[var(--taupe)] hover:text-[var(--ink)]">
            ← Back to Mahjong Circle
          </Link>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}

export function LegalHeader() {
  return (
    <header className="border-b border-[var(--hairline)] bg-[var(--ivory)]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/landing" className="font-display text-[17px] font-medium tracking-tight">
          Mahjong Circle
        </Link>
        <nav className="flex items-center gap-6 text-[12px] uppercase tracking-[0.2em] text-[var(--taupe)]">
          <Link to="/privacy" className="hover:text-[var(--ink)]">Privacy</Link>
          <Link to="/terms" className="hover:text-[var(--ink)]">Terms</Link>
          <Link to="/contact" className="hover:text-[var(--ink)]">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[20px] text-[var(--ink)]">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={className}>{children}</p>;
}