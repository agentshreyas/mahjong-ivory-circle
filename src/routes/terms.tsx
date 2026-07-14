import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "./index";
import { LegalHeader } from "./privacy";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Mahjong Circle" },
      { name: "description", content: "Terms governing use of the Mahjong Circle by Nexaar Pvt Ltd." },
      { property: "og:title", content: "Terms of Use — Mahjong Circle" },
      { property: "og:description", content: "Terms governing use of the Mahjong Circle by Nexaar Pvt Ltd." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)]">
      <LegalHeader />
      <article className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gold)]">Draft — pending legal review</p>
        <h1 className="mt-3 font-display text-[36px] leading-tight md:text-[44px]">Terms of Use</h1>
        <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-[var(--taupe)]">
          Last updated: {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-[var(--taupe)]">
          <p>
            These terms govern your use of the Mahjong Circle (the "Circle")
            operated by Es Magico Experiences Pvt Ltd & Nexaar Pvt Ltd ("Nexaar", "we", "us"). By using the
            site, submitting a request, or accepting an invitation, you agree
            to these terms.
          </p>

          <S title="1. Eligibility">
            You must be at least 18 years old and legally able to enter into a
            contract. Membership is by invitation only and offered at Nexaar's
            sole discretion.
          </S>
          <S title="2. Applications & invitations">
            Submitting a waitlist request does not create a right to
            membership. We may accept, decline, or defer any request without
            giving reasons. Invitations are personal and non-transferable.
          </S>
          <S title="3. Member conduct">
            Members and guests agree to conduct themselves with discretion and
            civility, to respect the privacy of other members, and to comply
            with the house rules of any venue. Nexaar may suspend or terminate
            membership for conduct that harms the Circle.
          </S>
          <S title="4. Fees & purchases">
            The Circle itself has no application fee. Certain salons,
            tournaments and collection items are priced separately and
            governed by their own purchase terms at the point of order.
          </S>
          <S title="5. Intellectual property">
            All content on this site — including text, imagery, brand marks,
            and the couture collection designs — belongs to Nexaar, its
            partners, or their licensors. You may not copy, reproduce, or
            create derivative works without written permission.
          </S>
          <S title="6. Third parties">
            The Circle operates in partnership with HSBC Premier, but Nexaar
            is not HSBC and HSBC is not responsible for the Circle. Any
            Premier privilege is subject to HSBC's own terms.
          </S>
          <S title="7. Disclaimers">
            The site and Circle experiences are provided "as is". To the
            fullest extent permitted by law, Nexaar disclaims all implied
            warranties, including merchantability and fitness for a
            particular purpose.
          </S>
          <S title="8. Limitation of liability">
            To the fullest extent permitted by law, Nexaar's total liability
            arising out of or relating to the Circle is limited to the amount
            you have paid to Nexaar in the twelve months preceding the claim.
            We are not liable for indirect or consequential losses.
          </S>
          <S title="9. Governing law">
            These terms are governed by the laws of India. The courts at
            Mumbai have exclusive jurisdiction, subject to any mandatory
            consumer rights you may have.
          </S>
          <S title="10. Changes">
            We may update these terms from time to time. Material changes
            will be notified via the site or email. Continued use after a
            change constitutes acceptance.
          </S>
          <S title="11. Contact">
            For any question about these terms, write to{" "}
            <a href="mailto:legal@nexaar.co" className="underline underline-offset-2 hover:text-[var(--ink)]">
              legal@nexaar.co
            </a>
            .
          </S>

          <p className="italic">
            This draft is provided for review and will be finalised before the
            Circle opens to members.
          </p>
        </div>

        <div className="mt-14">
          <Link to="/" className="text-[12px] uppercase tracking-[0.22em] text-[var(--taupe)] hover:text-[var(--ink)]">
            ← Back to Mahjong Circle
          </Link>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}

function S({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[20px] text-[var(--ink)]">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}