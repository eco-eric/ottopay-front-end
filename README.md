# OttoPay marketing site

The public website for OttoPay at ottopay.pro. The app lives in eco-eric/ottopay at app.ottopay.pro.

## Stack

Static site built with [Astro](https://astro.build) and plain CSS (design tokens in `src/styles/global.css`). No client-side framework; the only JavaScript is the mobile menu and the contact form.

```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static output in dist/
```

Deploys on Vercel. `vercel.json` carries the redirects for old app-era URLs (`/auth`, `/mobile-app`, `/integrations`).

## Layout

- `src/layouts/Base.astro` — head, meta, nav, footer
- `src/components/` — Nav, Footer, Icon (inline Lucide paths), PaidTicket (hero animation)
- `src/pages/` — one file per page; `sitemap.xml.ts` generates the sitemap
- `public/img/` — photos, Otto mascot, OG image

## Adding SEO and blog pages

Add a new `.astro` file under `src/pages/` using `Base` for the shell, then add its path to `src/pages/sitemap.xml.ts`. Content collections (Markdown) can be added later for the blog without changing the design.
