Create a clean, standalone GitHub repository containing only the Mahjong Circle marketing site: landing, privacy, terms, and a simplified contact page.

### What we'll do

1. **Simplify the contact page**
   - Remove the "Office" and "Privacy" cards (as requested).
   - Keep only the "Write" email and "Reply time" cards.

2. **Strip the project to marketing-only routes**
   - Keep: `/landing`, `/privacy`, `/terms`, `/contact`.
   - Remove all in-app routes: `/home`, `/index`, `/events`, `/event-detail`, `/collection`, `/product`, `/premier`, `/my-bookings`, `/notifications`, `/profile`, `/register`, `/article`.
   - Remove or repurpose the `index.tsx` route so `/` redirects to `/landing` (or becomes the landing page).

3. **Clean up app-only code**
   - Remove the mobile app shell: `PhoneFrame`, `BottomNav`, `TopBar`, `Screen`, `VoiceProvider`, `VoiceOverlay`.
   - Remove unused stores and data: `bookings-store.ts`, `member-store.ts`, `products.ts`, `error-capture.ts`, `error-page.ts`.
   - Keep `waitlist-store.ts` and `utils.ts` as needed.
   - Simplify `src/routes/__root.tsx` to remove the app shell and always render the marketing layout.

4. **Fix landing page internal links**
   - The landing page currently links to `/events`, `/collection`, and `/premier`. These will be removed.
   - Replace them with soft, non-routing CTAs or anchor links so the page still reads correctly.

5. **Build verification**
   - Run the local build to ensure the stripped project compiles cleanly before any external push.

6. **Push to GitHub**
   - Connect the Lovable project to GitHub via the in-editor GitHub integration (Plus menu → GitHub → Connect project).
   - Two-way sync will push the cleaned marketing site to the GitHub repository.

### Important trade-off to confirm

Stripping the project will remove the in-app experiences (events, collection, premier, bookings, profile, etc.) from this Lovable project. If you want the full app to remain, you should create a separate Lovable project for the marketing site and connect that one to GitHub instead. Otherwise, the app pages will be gone once this plan is implemented.

### Deliverable

A GitHub repository with a minimal, clean TanStack Start site that contains only:
- Landing page (`/landing` or `/`)
- Privacy Policy (`/privacy`)
- Terms of Use (`/terms`)
- Contact (`/contact`)

Ready to be deployed or pointed to `mahjongcircle.in`.