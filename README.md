# OttoPay marketing site

The public website for OttoPay at **ottopay.pro**: landing page, features, pricing, blog, help, partners and the database-driven SEO pages. The app itself (sign-in, dashboard, invoices, customer pay links) lives in [eco-eric/ottopay](https://github.com/eco-eric/ottopay) at **app.ottopay.pro**.

## Run it locally

```sh
cp .env.example .env   # fill in the Supabase URL and public (anon) key
npm install
npm run dev            # http://localhost:8080
```

`npm run build` makes the production files in `dist/`. `npm run lint` checks the code.

## Where things live

| What | Where |
|---|---|
| Pages | `src/pages/` (one file per page; routes in `src/App.tsx`) |
| Header and footer | `src/components/marketing/` |
| Plan names and prices | `src/lib/plans.ts` (keep in step with the app's copy) |
| Blog posts | Supabase table `blog_posts` |
| SEO pages (any other address) | Supabase table `content_pages`, drawn by `src/components/templates/TemplateRenderer.tsx` |
| Page titles and descriptions | Supabase table `page_meta` |
| Redirects to the app, sitemap | `vercel.json`, `public/sitemap.xml`, `public/robots.txt` |

## How it connects to the app

- Sign-in and sign-up buttons use `appUrl()` from `src/lib/appUrl.ts`, which points at `https://app.ottopay.pro` (or `VITE_APP_URL`).
- Referral links `ottopay.pro/ref/CODE` save the code in a cookie shared with app.ottopay.pro and add `?ref=CODE` to sign-up links.
- Any app address that lands here (`/auth`, `/pay/...`, `/estimate/...`, `/invoices`, `/settings`, and so on) is permanently redirected to the same address on app.ottopay.pro, so links already sent to customers keep working.
- The sitemap index is `public/sitemap.xml`; its two parts are served from the Supabase edge functions `sitemap-core` and `sitemap-programmatic` through rewrites in `vercel.json`.

The split plan this follows: "OttoPay split plan: marketing site and app" (Claude Doc).
