# digreno.com — static website

Marketing + legal site for DIGRENO Invoice, hosted on GitHub Pages at **https://digreno.com**.
Plain HTML/CSS/JS, no build step.

| File | Purpose |
|---|---|
| `index.html` | Home: hero with live GST invoice demo, how it works, features, templates, pricing, FAQ |
| `privacy.html`, `terms.html`, `refund.html` | Legal pages (Play Store + Razorpay require these URLs) |
| `contact.html` | Support contact + business details (Razorpay requires this) |
| `delete-account.html` | Account deletion URL for the Play Console Data safety form |
| `404.html` | GitHub Pages not-found page |
| `assets/` | `site.css`, `site.js`, `logo.svg`, `favicon.svg` |
| `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` | Pages config / SEO |

Header and footer are repeated in every page — edit all of them when changing nav links.
Asset paths are root-absolute (`/assets/...`), so preview with a local server, not by double-clicking:
`python -m http.server 8000` in this folder → http://localhost:8000

## Before going live — fill the yellow placeholders
Search for `class="fill"`: legal business name, registered address, Grievance Officer name, support phone/WhatsApp,
support hours, GSTIN, jurisdiction city, and the unused-pack refund window (7 days). Have the legal pages reviewed.
When the app is published, replace the "Coming soon on Google Play" badges (`href="#download"`, `aria-disabled`)
in `index.html` with the Play Store link.

Prices on the home page mirror `plans.Defaults()` (₹10/20, ₹49/100, ₹99/250, ₹199/1000); update them if Sales
changes the live catalog. Support email matches the app (`support@digrenoinvoice.com`).

## Deploy (GitHub Pages)
1. Create a GitHub repo (e.g. `digreno-website`) and push the contents of this folder to `main`.
2. Repo → Settings → Pages → Source: *Deploy from a branch*, `main` / `/ (root)`.
3. Custom domain: `digreno.com` (already in `CNAME`), then tick **Enforce HTTPS** once the certificate is issued.
4. DNS at your registrar for `digreno.com`:
   - `A` records `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `AAAA` `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` `www` → `<your-github-username>.github.io`
   - Leave the existing `api.invoice` and `admin.invoice` records pointing at the droplet.
5. Optional: verify the domain under GitHub → Settings → Pages to prevent takeover.
