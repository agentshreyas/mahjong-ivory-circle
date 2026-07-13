Hostinger static deployment plan for Mahjong Circle marketing site

Objective
---------
Deploy the current Lovable project (TanStack Start marketing site with 4 pages: /, /privacy, /terms, /contact) as a static HTML/CSS/JS site to Hostinger shared hosting via File Manager public_html upload.

Background
----------
The project is currently a TanStack Start app that builds to a server-aware bundle (Nitro/Cloudflare Workers). To upload it to Hostinger shared hosting as a zip, we must first switch the build to static prerendering so it outputs plain HTML files in dist/client/ that any static host can serve.

Steps
-----

1. Enable static prerendering
   - Update vite.config.ts to add prerender configuration inside the tanstackStart object:
     - enabled: true
     - crawlLinks: true
     - This will generate index.html files for every static route discovered from the home page links.

2. Build the project
   - Run the production build command.
   - Verify the output contains dist/client/ with at least:
     - index.html (home page)
     - privacy/index.html
     - terms/index.html
     - contact/index.html
     - assets/ (JS, CSS, images, fonts)

3. Prepare the upload package
   - Create a zip archive of the contents of dist/client/ (not the dist/ folder itself, so index.html sits at the root of the zip).
   - The zip will be uploaded to Hostinger and extracted into public_html.

4. Upload to Hostinger
   - Log in to Hostinger hPanel.
   - Go to File Manager → public_html.
   - Upload the zip file and extract it.
   - Ensure index.html is at public_html/index.html.

5. Point the custom domain to Hostinger
   - In Hostinger hPanel, find the hosting account IP address (usually shown under hosting details or in the domain setup instructions).
   - At the domain registrar (where mahjongcircle.in is managed), add or update these DNS records:
     - A record @ → Hostinger IP
     - A record www → Hostinger IP
   - Wait for DNS propagation (up to a few hours, sometimes longer).
   - In hPanel, add the domain to the hosting if not already done.

6. Verify the live site
   - Visit https://mahjongcircle.in and https://www.mahjongcircle.in.
   - Check /privacy, /terms, /contact all load correctly.
   - Check that the contact email and footer link to Es Magico work.

Notes / trade-offs
------------------
- The waitlist/contact form currently stores submissions in browser localStorage only (no backend). If you want real email capture, that requires a backend/Cloud backend and cannot run on Hostinger static hosting alone.
- Any future content update requires rebuilding, re-zipping, and re-uploading.
- If you want to keep the Lovable-hosted preview/published URL alive as well, this does not affect it; it just adds a separate Hostinger deployment.

