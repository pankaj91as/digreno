# digreno.com — DIGRENO company website

Static site (plain HTML/CSS/JS, no build step) hosted on GitHub Pages at **https://digreno.com**.

```
/                         Company home: products, services, how we work, contact
/contact.html             Company contact + business details
/privacy.html             Website privacy policy
/404.html
/invoice/                 DIGRENO Invoice product page (live GST invoice demo, features, templates, pricing, FAQ)
/invoice/support.html     Invoice support + business details (Razorpay needs this)
/invoice/privacy.html     App privacy policy  -> Play Console "Privacy policy" URL
/invoice/terms.html       App terms
/invoice/refund.html      Refund & cancellation (Razorpay needs this)
/invoice/delete-account.html  -> Play Console "Delete account" URL
/assets/                  site.css, site.js, digreno-mark.svg (company), invoice-logo.svg (product)
CNAME .nojekyll robots.txt sitemap.xml
```

Header and footer are repeated in every page; edit them all when changing nav links.
Paths are root-absolute (`/assets/...`), so preview with a local server: `python -m http.server 8000` → http://localhost:8000

## Adding a product
1. Copy `invoice/` to `<product>/` and rewrite its pages (product nav lives in each page header).
2. On `/index.html`, copy the `<article class="product">` block in `#products`, and add a footer column.
3. Add the new URLs to `sitemap.xml`.

## Before going live
All business details are filled in (DigReno, Mira Road address, GSTIN, phone, Grievance Officer Pankaj Pawar,
support@digreno.com, no-refund policy, Thane jurisdiction). Have the legal pages reviewed. When the app is
published, replace the "Coming soon on Google Play" badges in `invoice/index.html` (`href="#download"`,
`aria-disabled`) with the Play link.

Invoice prices mirror `plans.Defaults()` (₹10/20, ₹49/100, ₹99/250, ₹199/1000); update them if Sales changes the
live catalog. Support email everywhere: `support@digreno.com` (the Android app still defaults to `support@digrenoinvoice.com` in `HelpSupportScreen.kt` unless `/app/config` overrides it).

## Deploy (GitHub Pages)
1. Create a GitHub repo (e.g. `digreno-website`) and push the contents of this folder to `main`.
2. Repo → Settings → Pages → Source: *Deploy from a branch*, `main` / `/ (root)`.
3. Custom domain: `digreno.com` (already in `CNAME`), then tick **Enforce HTTPS** once the certificate is issued.
4. DNS for `digreno.com`:
   - `A` `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `AAAA` `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME` `www` → `<your-github-username>.github.io`
   - Leave `api.invoice` and `admin.invoice` pointing at the droplet.
5. Optional: verify the domain in GitHub → Settings → Pages to prevent takeover.
