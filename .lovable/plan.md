# Mahjong Circle — Landing Page

A single, quiet, couture-grade marketing page that sits at a new public route (so the existing in-app `/` flow stays intact). Same palette and typography as the app: ivory canvas, HSBC red accent, gold hairline rules, Fraunces display + Manrope body.

## Route & structure

- New route: `src/routes/landing.tsx` at URL `/landing` (keeps app entry `/` untouched).
- Sub-routes for legal:
  - `src/routes/privacy.tsx` → `/privacy`
  - `src/routes/terms.tsx` → `/terms`
  - `src/routes/contact.tsx` → `/contact`
- Each route sets its own `head()` (title, description, og:title, og:description).
- No bottom tab bar / phone frame here — this is a real responsive web page, not the prototype shell.

## Sections (top → bottom)

1. **Hero / Teaser**
   - Eyebrow: "HSBC Presents"
   - Headline: "The Mahjong Circle"
   - Sub: one line — "A private members' circle for connoisseurs of the game."
   - Gold rule + a single primary CTA: "Request an invitation" → scrolls to waitlist.
   - Reuses `hero-splash.jpg` as a muted background.

2. **The Ethos** (3 short pillars, icon + one line each)
   - Quiet Rooms · Considered Company · Couture Collection.

3. **Exclusivity / By Invitation Only**
   - Short manifesto paragraph making clear membership is invite-only, curated, and capped.
   - Small factlets: "Membership capped · Vetted by the Circle · No bank login required".

4. **Waitlist form**
   - Fields: Full name, Email, City, Referred by (optional), short "Why you'd like to join" (optional textarea).
   - Submit is a front-end-only stub (writes to `localStorage` via a small store, shows a confirmation state). No backend in this plan.
   - Fine print: "Applications reviewed monthly. We'll only reach out if there's a fit."

5. **What members experience** (light preview)
   - Three cards: Salons & Tournaments · The Collection · Premier privileges. Each links into the existing app routes (`/events`, `/collection`, `/premier`) for people already inside.

6. **Press / trust strip** (optional, subtle)
   - "In partnership with HSBC Premier" lockup with the HSBC logo. No fake press logos.

7. **FAQ** (4 items, accordion)
   - How do I get invited? · Is there a fee? · Where are events held? · How is my data used? (links to /privacy).

8. **Footer**
   - Left: "Mahjong Circle — a Nexaar Pvt Ltd initiative, in partnership with HSBC Premier."
   - Links: Privacy Policy · Terms of Use · Contact Us.
   - Contact block: email `hello@nexaar.co` (placeholder), registered office line (placeholder), copyright.

## Legal pages (drafts, clearly marked "Draft")

- **Privacy Policy** — Nexaar Pvt Ltd as data controller. Sections: what we collect (waitlist form data, basic analytics), how we use it (review applications, contact you), lawful basis, retention, sharing (HSBC only where relevant to Premier privileges, with consent), your rights (access, deletion, correction), cookies, contact for privacy queries. Marked "Draft — pending legal review".
- **Terms of Use** — eligibility (18+, invitation only), acceptable use, intellectual property, membership at Nexaar's discretion, disclaimers, limitation of liability, governing law (India / Mumbai jurisdiction, placeholder), changes to terms. Marked "Draft — pending legal review".
- **Contact Us** — email, registered office placeholder, response-time note, form-less (mailto link).

## What else I'd recommend adding

- **Referral / "Nominate a member"** micro-CTA on the exclusivity section — reinforces the invite-only tone and gives existing members a role.
- **Founding Members note** — a single line acknowledging the first cohort, adds scarcity/prestige.
- **Anti-spam & data-use microcopy** directly under the waitlist form (one sentence + link to /privacy) — required feel for a premium brand and helps with trust.
- **Reduced-motion & responsive care** — no autoplaying video, mobile-first spacing that still reads well on desktop.

## Technical notes

- Pure frontend; no schema, no server functions. Waitlist submit → optimistic UI + `localStorage`.
- Palette uses existing tokens in `src/styles.css` (`--ivory`, `--ink`, `--gold`, `--hsbc`, `--hairline`, `--taupe`).
- Each new route file adds distinct `head()` metadata. `og:image` only on `/landing` (hero image), not on legal pages.
- Landing page is not linked from the in-app bottom nav; it's reached directly at `/landing` and cross-links into the app.

## Open questions before I build

1. Should the landing page take over `/` (replacing the current app entry), or live at `/landing` while the app entry stays as-is? Default in this plan: **`/landing`**, leave `/` alone.
2. Contact email + registered office address for Nexaar Pvt Ltd — placeholders used unless you provide real values.
