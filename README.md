# The Copy Galaxy

A public swipe file of web design patterns. Astro + Tailwind, static output, published to GitHub Pages.

Replaces the WordPress site that was at thecopygalaxy.com. Only the Best Practices Swipe File was
carried over; the blog posts and other pages were dropped deliberately.

## Setup

```bash
npm install
npm run dev        # localhost:4321
npm run build      # outputs to dist/
npm run preview    # preview the build locally
```

## Adding an entry

Use the `/swipe` skill in Claude Code: give it a URL and a sentence about why the pattern is good.
It screenshots the page, writes the entry, verifies the build and asks before pushing.

By hand, an entry is one markdown file plus one image in `src/content/swipe/`:

```yaml
---
title: "Sticky social proof"      # names the pattern, not the company
company: "FranShares"
url: "https://franshares.com"
category: "social-proof"          # see src/config/categories.ts
industry: "investing"             # see src/config/industries.ts
tags: ["sticky bar", "metrics"]
screenshot: "./sticky-social-proof.png"
extras: ["./second-shot.png"]     # optional, detail page only
video: "/video/sticky.mp4"        # optional, for patterns that need motion
added: 2023-01-01
---

The note. 20 to 70 words.
```

`category` is a plain string, not an enum. An unrecognised value still builds and falls back to a
neutral style, so you never have to edit the schema to add an entry. Adding it to
`src/config/categories.ts` is what gives it a filter chip and an accent colour.

`industry` works the same way and answers "who was doing this", which the category can't. Each
industry in `src/config/industries.ts` carries `aliases` that get folded into the card's search
text but are never displayed — that's why searching "finance" surfaces a payments company, an
insurer and a mortgage lender at once.

Screenshots keep their real aspect ratio everywhere, so the crop you take is the card shape you
get. Crop tight to the pattern.

## Deploying

`git push` to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages. There are no secrets and nothing to configure — the repo is public, which is what
lets Pages build it without a paid plan.

The custom domain is bound by `public/CNAME`, which Astro copies into `dist/` and the workflow
ships inside the Pages artifact. Keep that file. Setting the domain only in repo settings can be
cleared by a later deploy that ships no `CNAME`.

DNS lives in SiteGround (`ns1/ns2.siteground.net`) under Domain → DNS Zone Editor. The apex points
at GitHub's four Pages addresses and `www` is a CNAME to `kjellvdv.github.io`:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Why not SiteGround

The site was originally set up to deploy over FTPS to SiteGround, where the old WordPress install
still sits in `/thecopygalaxy.com/public_html`. That was abandoned: SiteGround's FTP server presents
a certificate issued for its own host, and neither `thecopygalaxy.com` nor `ftp.thecopygalaxy.com`
matches it, so a *verified* connection isn't reachable from the customer side. The only ways
forward were disabling certificate verification while keeping a deploy password in CI, or mirroring
with `--delete` over a live document root. Pages avoids both.

WordPress was never deleted, so putting the old A records back brings it straight back.

## Regenerating the social card

`npm run og` rebuilds `public/og-default.png` from the inline SVG in `scripts/make-og.mjs`.

## Structure

```
src/
├── config/categories.ts    ← category labels, order, accent colours
├── content.config.ts       ← entry schema
├── content/swipe/          ← one .md + one .png per entry
├── components/
│   ├── SwipeCard.astro     ← grid card, keeps the screenshot's aspect ratio
│   └── Starfield.astro     ← deterministic, seeded so builds don't churn
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro         ← hero, search, masonry grid, filter JS
│   ├── swipe/[slug].astro  ← detail page
│   └── 404.astro
└── styles/global.css       ← design tokens, nebula, prose
```

Search is ~80 lines of vanilla JS over pre-rendered DOM. Each card carries its own searchable text
in a `data-search` attribute, so there's no index to build and no framework on the page. With JS
off, every card and every detail page still renders; only the filtering goes away.
