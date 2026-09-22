# Blog plan: Next.js migration + Sanity-backed blog

Branch: `cursor/blog-nextjs-migration` (off `cursor/paul-udor-portfolio`).
Status: plan only — no code in this commit.
Verified against the working tree at commit `d6149ac` on 2026-09-22.

---

## 1. Goal and decisions

| # | Decision | Rationale (one line) |
|---|---|---|
| 1 | Migrate to **Next.js** (App Router) | Vite would need a router, prerender plugin, head manager, build-time CMS fetch, sitemap and RSS generators bolted on; Next ships all of it. |
| 2 | CMS is **Sanity** | Structured content + Portable Text + image CDN; Paul creates the account himself (needs a login). |
| 3 | **SEO is the priority** | Posts must be real server-rendered HTML with per-post metadata, `BlogPosting` JSON-LD, sitemap, RSS. |
| 4 | Host on **Vercel**, deployed from `plexxypc/paul-udor-portfolio` | Already the deploy target; gives preview deployments and on-demand revalidation. |
| 5 | **Zero posts to migrate** | No content import, no redirects, no URL preservation work. |
| 6 | **Both** homepage teaser and `/blog` routes | "Latest writing" teaser on `/`, plus `/blog` and `/blog/<slug>`; Blog link in navbar and footer. |
| 7 | v1 features: list w/ cover + excerpt, tags + filtering, search, RSS, reading time, published/updated dates, related posts, **newsletter UI only** | Newsletter is deliberately unwired — UI plus one marked integration point. |
| 8 | Search is **client-side** over title + excerpt + tags | Low post count; no Algolia, no body indexing. |
| 9 | Match **existing code conventions** | camelCase values, PascalCase components/types, named exports, 2-space indent, single quotes, no semicolons, `interface` for props. The global snake_case/docstring rule does **not** apply here (confirmed). |
| 10 | Scope = **migration (phase 1) + blog build** | Migration is a hard prerequisite. |
| 11 | `#ai-marketing-os` **ported as-is** | Stays hash-driven; not converted to a route. SEO downside noted in §11 only. |
| 12 | Branch → Vercel preview → review → production | Nothing merges before a preview is approved. |

---

## 2. Target dependency and version set

Versions below were resolved from the npm registry on 2026-09-22. Pin them; do not run installs until phase 1 starts.

### Add — runtime

| Package | Version | Why |
|---|---|---|
| `next` | `16.3.5` | Current stable. Peers `react: ^18.2.0 \|\| ^19.0.0`, so our React 19.2.8 is supported. |
| `next-sanity` | `13.3.4` | Official toolkit. v13 peers `next: ^16.0.0-0`, `react: ^19.2.3`, `sanity: ^5.29.0 \|\| ^6.0.0`, `@sanity/client: ^7.26.2 \|\| ^8.0.0`, `styled-components: ^6.1`. Our React 19.2.8 satisfies `^19.2.3`. |
| `@sanity/image-url` | `2.1.1` | Builds Sanity CDN image URLs for `next/image`. |

`react` and `react-dom` stay at `19.2.8` — unchanged.

`@sanity/client` (`8.6.2`) and `@portabletext/react` (`8.0.1`) arrive transitively and are re-exported by `next-sanity`. Import them through `next-sanity` rather than adding direct dependencies, so there is exactly one copy of each.

### Add — dev

| Package | Version | Why |
|---|---|---|
| `@tailwindcss/postcss` | `4.3.3` | Tailwind v4 in Next.js uses the PostCSS plugin, **not** `@tailwindcss/vite`. |
| `postcss` | latest `8.x` | Required peer of the above per Tailwind's Next.js install guide. |
| `@tailwindcss/typography` | `0.5.20` | `prose` base for Portable Text. See §5 for the recommendation. |
| `sanity` | `6.15.0` | Studio runtime, needed only for the embedded `/studio` route. |
| `@sanity/vision` | `6.15.0` | GROQ query playground inside the Studio. Optional but worth having while building queries. |
| `styled-components` | `6.5.3` | Hard peer of `sanity` (`^6.1.15`). Studio will not render without it. |
| `@types/node` | latest `24.x` | Next config, route handlers and `process.env` need Node types; not currently installed. |

`tailwindcss` stays at `4.3.3`. `typescript` stays at `6.0.3`. `@types/react` / `@types/react-dom` stay.

### Remove — dev

| Package | Reason |
|---|---|
| `@tailwindcss/vite` | Replaced by `@tailwindcss/postcss`. |
| `@vitejs/plugin-react` | No Vite. |
| `vite` | No Vite. |

> **Open question for Paul (Q1):** `sanity`, `@sanity/vision` and `styled-components` are only needed to render the embedded Studio at `/studio`. Embedding keeps one deployment and one login, but adds ~3 heavy dev dependencies and lengthens Vercel build times. The alternative is hosting the Studio on Sanity's own infrastructure (`sanity deploy` → `<project>.sanity.studio`) and keeping this repo frontend-only. Plan below assumes **embedded at `/studio`**. Confirm, or switch.

### Next.js 16 specifics that affect how we write code

Verified against nextjs.org's version-16 upgrade guide and the `revalidateTag` reference:

- `params` and `searchParams` are **Promises** in `page.tsx`, `layout.tsx`, `route.ts`, and in `opengraph-image` / `twitter-image` / `icon`. Every use must be `await`ed.
- The `id` passed to a `sitemap` generating function is a Promise (only relevant if we ever split sitemaps — we will not in v1).
- `revalidateTag(tag)` with one argument is deprecated and is a TypeScript error. The signature is `revalidateTag(tag, profile)`. **For a webhook handler, `updateTag` is not available (Server Actions only), so the correct call is `revalidateTag(tag, { expire: 0 })`** — this expires immediately instead of serving stale content. Many community Sanity tutorials still show the single-argument form; they are out of date.
- Turbopack is the default bundler for `next build`. We have no webpack config, so nothing to migrate.
- `middleware.ts` → `proxy.ts` rename: not applicable, we have neither.
- **Decision: do not enable `cacheComponents`.** It is opt-in in Next 16, and enabling it makes route segments that export `revalidate`/`dynamic` error and requires adopting the `'use cache'` model wholesale. A framework migration plus a new CMS is already enough change in one branch. Tag-based caching (§5) works without it. Revisit later.

---

## 3. Phase 1 — Next.js migration

### 3.1 App Router layout

Keep `src/` as the source root (`src/app/...`), which is what Next supports and what `next-sanity`'s docs assume. This keeps existing import shapes closest to today's.

```
src/app/layout.tsx          root layout: <html>, <body>, metadata export, Inter font
src/app/page.tsx            homepage — the section stack from today's App.tsx
src/app/globals.css         today's src/index.css, moved verbatim
postcss.config.mjs          Tailwind v4 PostCSS plugin
next.config.ts              image remotePatterns for cdn.sanity.io
```

Add a path alias `@/*` → `src/*` in `tsconfig.json` so new blog code can use `@/components/...` instead of `../../../`. Existing relative imports inside `src/components` and `src/data` keep working untouched.

### 3.2 File-by-file migration

Every tracked file is accounted for. 54 tracked files today (`git ls-files | wc -l`), grouped below where a whole directory shares the same fate.

| Today | Action | New path |
|---|---|---|
| `index.html` | **Deleted.** Content split: meta → `metadata` export in `src/app/layout.tsx`; `<div id="root">` → Next's own root; font `<link>`s → `next/font` (§3.4); favicon link → Next's metadata `icons`. | — |
| `src/main.tsx` | **Deleted.** `createRoot` / `StrictMode` / `./index.css` are all handled by `src/app/layout.tsx`. StrictMode is on by default in dev. | — |
| `src/App.tsx` | **Rewritten and split.** The section stack moves to `src/app/page.tsx` (server component). The hash switch moves to `src/components/HashProductSwitch.tsx` (client). This is the only default export in `src/` today and it disappears. | `src/app/page.tsx` + `src/components/HashProductSwitch.tsx` |
| `src/index.css` | **Moved verbatim.** Zero content changes — see §3.3. | `src/app/globals.css` |
| `src/vite-env.d.ts` | **Deleted.** It only declares Vite client types. Replaced by the Next-generated `next-env.d.ts` (which must be gitignored). | — |
| `vite.config.ts` | **Deleted.** | — |
| `tsconfig.json` | **Rewritten.** See §3.7. | unchanged path |
| `tsconfig.tsbuildinfo` | **Deleted and gitignored.** This build artifact is currently committed to the repo — it should never have been tracked. | — |
| `package.json` | **Modified** — deps (§2) and scripts (§3.8). | unchanged |
| `package-lock.json` | Regenerated by `npm install`. | unchanged |
| `README.md` | **Modified** — build command becomes `next build`, output is `.next` not `dist`, plus the env-var table. | unchanged |
| `.gitignore` | **Modified** — see §3.9. | unchanged |
| `public/favicon.svg` | Unchanged. Referenced via `metadata.icons` instead of a raw `<link>`. | `public/favicon.svg` |
| `public/icons.svg` | Unchanged. | `public/icons.svg` |
| `public/robots.txt` | **Deleted**, replaced by `src/app/robots.ts` so the sitemap URL is generated from one source of truth. | `src/app/robots.ts` |
| `public/sitemap.xml` | **Deleted**, replaced by `src/app/sitemap.ts`. Today it is hand-written and lists only the homepage. | `src/app/sitemap.ts` |
| `src/assets/*` (11 files) | **Moved unchanged.** Static imports still work (§3.6). | `src/assets/*` |
| `src/data/*.ts` (7 files) | **Unchanged**, except `site.ts` gains `blog` nav entries (§6.2). All are plain data modules with no browser APIs, safe in server components. | `src/data/*.ts` |
| `src/hooks/useScrollSpy.ts` | **Modified:** add `'use client'` at the top. Both `useScrollSpy` and `useInView` use `useState`/`useEffect` and touch `window`, `document` and `IntersectionObserver`. | unchanged |
| `src/components/StructuredData.tsx` | **Modified.** Keep the `Person` + `WebSite` JSON-LD as-is, but render it from `src/app/layout.tsx` so it also covers `/blog` and the product view (today it is mounted only on the main view — see `src/App.tsx:39`). | unchanged |
| `src/components/Navbar.tsx` | **Modified:** `'use client'`, plus the scroll-spy change in §6.2. | unchanged |
| `src/components/SelectedWork.tsx` | **Modified:** `'use client'` only. | unchanged |
| `src/components/ProjectCard.tsx` | **Modified:** `'use client'` only. | unchanged |
| `src/components/Contact.tsx` | **Modified:** `'use client'` only. | unchanged |
| `src/components/CaseStudy.tsx` | **Modified:** `'use client'` only. | unchanged |
| `src/components/WhatIDo.tsx` | **Modified:** `'use client'` only. | unchanged |
| `src/components/ExperienceTimeline.tsx` | **Modified:** `'use client'` only. | unchanged |
| `src/components/Footer.tsx` | **Modified:** see the year gotcha in §3.5, plus the Blog link (§6.2). | unchanged |
| `src/components/ProductLandingPage.tsx` | **Unchanged.** It has no state and no browser APIs — its only imports are three images (`src/components/ProductLandingPage.tsx:1-3`). It does **not** need `'use client'`. | unchanged |
| `src/components/About.tsx`, `Button.tsx`, `Education.tsx`, `Experience.tsx`, `Hero.tsx`, `SectionHeading.tsx`, `ServiceCard.tsx`, `SkillGroup.tsx`, `TechnicalSkills.tsx` | **Unchanged.** No hooks, no browser APIs. | unchanged |

### 3.3 CSS and the `@theme` tokens

`src/index.css` moves to `src/app/globals.css` **byte-for-byte**. Nothing about Tailwind v4's `@theme` block, the `@layer base` rules, or the `@layer utilities` block changes between the Vite plugin and the PostCSS plugin — both run the same Tailwind v4 engine. All 16 colour tokens, both font tokens, and all 12 utilities (`.glass`, `.section-padding`, `.container-max`, `.product-container`, `.serif-display`, `.premium-panel`, `.grid-pattern`, `.text-gold`, `.border-gold/*`, `.bg-gold`, `.bg-gold-soft`, `.text-ivory`) carry over untouched.

There is still **no `tailwind.config.*` and no `postcss.config.*`** in the repo today. We add exactly one new file, per Tailwind's official Next.js guide:

```js
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

Import it once, in the root layout: `import './globals.css'`.

The only later edit to `globals.css` is adding `@plugin "@tailwindcss/typography";` and one `@utility prose-paul { ... }` block in phase 3 (§5).

### 3.4 The Inter font

Today: two `<link rel="preconnect">` plus a blocking Google Fonts stylesheet (`index.html:38-43`), and `--font-sans: "Inter", ui-sans-serif, ...` in `src/index.css:18`.

**Recommendation: switch to `next/font/google` and drop the `<link>` tags.** It self-hosts the font files from our own origin, removes a third-party connection and a render-blocking request, and eliminates layout shift via automatic size-adjust fallbacks. Concretely:

```tsx
// src/app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})
```

Apply `inter.variable` as a className on `<html>`, then change one line in `globals.css`:

```css
--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
```

`--font-serif` (Georgia, a system font) is unaffected, so `.serif-display` keeps working.

Caveat to check during visual verification: `next/font` subsets and hints the file differently from Google's CDN build, so glyph rendering can differ by a hair at small sizes. If anything looks off, the fallback is to keep the `<link>` tags in the layout's `<head>` and leave `--font-sans` alone — strictly the safer option for pixel-identical output, at the cost of the performance win.

### 3.5 Client components

Verified by grepping `src/` for `useState|useEffect|useRef|useScrollSpy|useInView|window.|document.` — this list is exact, and it differs from earlier notes in two ways worth flagging.

| File | Needs `'use client'` | Why |
|---|---|---|
| `src/hooks/useScrollSpy.ts` | Yes | `useState`/`useEffect`, `window.scrollY`, `document.getElementById`, `IntersectionObserver`. |
| `src/components/Navbar.tsx` | Yes | `mobileOpen` + `scrolled` state, scroll listener, `document.body.style.overflow`, `useScrollSpy` (`Navbar.tsx:9-24`). |
| `src/components/SelectedWork.tsx` | Yes | Carousel: `useRef` + `activeIndex` state + `useEffect` (`SelectedWork.tsx:1-11`). |
| `src/components/ProjectCard.tsx` | Yes | `imageUnavailable` state driven by `onError` (`ProjectCard.tsx:10,24`). |
| `src/components/Contact.tsx` | Yes | `submitted` state + `onSubmit` handler (`Contact.tsx:16,65`). |
| `src/components/CaseStudy.tsx` | **Yes** | `useInView` (`CaseStudy.tsx:6,9`). Easy to miss — it looks like a static section. |
| `src/components/WhatIDo.tsx` | **Yes** | `useInView` (`WhatIDo.tsx:4,7`). |
| `src/components/ExperienceTimeline.tsx` | **Yes** | `useInView` (`ExperienceTimeline.tsx:2,10`). |
| `src/components/HashProductSwitch.tsx` (new) | Yes | Owns the hash state lifted out of `App.tsx`. |
| `src/components/ProductLandingPage.tsx` | **No** | Contrary to earlier notes, it has **no carousel and no state** — only three image imports. Pure server component. |
| `src/components/Button.tsx` | No | Pure. It accepts `onClick` via `ButtonHTMLAttributes`, but only client components pass handlers to it, and those pull it into the client bundle automatically. |

**Footer year gotcha.** `src/components/Footer.tsx:4` computes `new Date().getFullYear()`. Today that runs in the browser on every load, so it is always correct. As a server component on a statically rendered page it evaluates **at build time** and the copyright year will freeze until the next deploy. Two options: mark `Footer` as `'use client'` (simplest, cost is a tiny client component), or leave it server-rendered and accept a stale year between January and the next deploy. **Recommendation: `'use client'` on `Footer`.** It is a two-word change for a correctness bug that would otherwise surface silently.

### 3.6 Static image imports

The bundled-asset pattern is unchanged. `src/data/projects.ts:1-4` imports PNGs and assigns them to `image`, and `next.config.ts` needs nothing for local imports to keep working.

One real type change: under Vite a static import resolves to a `string`, so `interface Project` declares `image: string` (`projects.ts:11`). Under Next a static import resolves to a `StaticImageData` object. Two ways out:

- **Recommended:** widen the field to `image: string | StaticImageData` and keep `ProjectCard` rendering a plain `<img>`. Smallest diff, zero visual change, and `projects.ts`'s `dsa-lagos` entry (which is a raw string) keeps type-checking.
- Later, convert `ProjectCard` to `next/image` for automatic sizing and lazy loading. Deliberately **not** in this migration — it changes markup and layout, which fights the "visually identical" checkpoint. Track as a follow-up (§11).

New Sanity-hosted images use `next/image` from day one and need `next.config.ts`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
```

Use `remotePatterns`, not `images.domains` — the latter is deprecated in Next 16.

### 3.7 `tsconfig.json`

There is a single `tsconfig.json` today (no `tsconfig.app.json` / `tsconfig.node.json` split). It needs these changes for Next:

- `"jsx": "react-jsx"` → `"preserve"` (Next handles the transform).
- Add `"plugins": [{ "name": "next" }]`, `"incremental": true`, `"allowJs": true`, `"esModuleInterop": true`, `"isolatedModules": true`, `"noEmit": true` (already set).
- `"moduleResolution": "bundler"` stays. Drop `"allowImportingTsExtensions"` (no longer needed and it conflicts with Next's resolution expectations).
- Add `"paths": { "@/*": ["./src/*"] }` and `"baseUrl": "."`.
- `"include"` becomes `["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]`; `"exclude": ["node_modules"]`.
- **Keep** `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`. These are the house rules and all new code should satisfy them. Note `verbatimModuleSyntax` means every type-only import must be written `import type { ... }` — the existing code already does this (e.g. `ProjectCard.tsx:2`).

### 3.8 npm scripts

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "typecheck": "tsc --noEmit"
}
```

`preview` is dropped — `next start` serves a production build locally. Note the current `build` is `tsc -b && vite build`; `next build` type-checks as part of the build, but keeping a standalone `typecheck` script is useful in CI and for pre-commit checks. `next lint` was removed in Next 16, and this repo has no ESLint setup today, so we are not adding one here (§11).

### 3.9 `.gitignore` additions

Current file covers logs, `node_modules`, `dist`, editor files. Add:

```
.next
out
next-env.d.ts
.vercel
*.tsbuildinfo
.env
.env*.local
```

`dist` / `dist-ssr` can stay harmlessly or be removed. **`tsconfig.tsbuildinfo` must be `git rm --cached`'d** — it is currently tracked. And `.env*.local` must land in `.gitignore` *before* Paul creates `.env.local` in phase 2, so a Sanity token can never be committed.

### 3.10 Preserving `#ai-marketing-os` exactly

Today (`src/App.tsx:16-35`): `App` seeds `isProductPage` from `window.location.hash === '#ai-marketing-os'` in a `useState` initializer, listens for `hashchange`, and returns `<ProductLandingPage />` instead of the whole main tree when true.

A URL fragment is **never sent to the server**, so this switch is inherently client-side and must stay client-side. The port that changes the least:

```tsx
// src/app/page.tsx  (server component)
export default function Page() {
  return (
    <HashProductSwitch product={<ProductLandingPage />}>
      <Navbar />
      <main>{/* Hero … Contact, exactly as today */}</main>
      <Footer />
    </HashProductSwitch>
  )
}
```

`HashProductSwitch` is a small client component holding the identical `useState` initializer + `hashchange` effect lifted verbatim from `App.tsx`, rendering `product` when the hash matches and `children` otherwise. Because both trees are passed in as already-rendered server children, `ProductLandingPage` stays a server component and none of the section components get dragged into the client bundle.

**One behavioural difference to accept or reject.** Today the page ships no server HTML, so the hash is read before the first paint and a visitor landing on `pauludor.com/#ai-marketing-os` sees only the product page. With SSR, the server has no hash, so it renders the main homepage HTML, and the product view appears on hydration — a brief flash of the wrong page on direct hash links.

Mitigation that keeps behaviour identical without changing the URL scheme: have `HashProductSwitch` render `null` for its first client paint when it cannot yet know the hash. That trades the flash for a brief blank frame, and it would apply to *every* homepage visit, which is worse for the 99% case and bad for Core Web Vitals. **Recommendation: accept the flash.** It only affects hash links, and the real fix is a genuine `/ai-marketing-os` route, which is explicitly out of scope.

> **Open question for Paul (Q2):** is a brief flash of the homepage before the product page renders acceptable on `#ai-marketing-os` links? If you share that link in pitches and the flash is not acceptable, the only clean fix is a real route — which you have deferred. Say the word and I will scope it separately.

### 3.11 Phase 1 verification checklist

Run `npm run build && npm start`, then compare against the current Vite build (`npm run build && npm run preview` on the old branch) side by side at 375px, 768px, 1280px and 1600px:

- [ ] Hero, SelectedWork, CaseStudy, WhatIDo, TechnicalSkills, Experience, AdditionalExperience, Education, About, Contact, Footer all render in that order.
- [ ] Background gradient + gold radial glow present (`globals.css` `body` rule).
- [ ] Navbar: transparent at top, `.glass` after 20px of scroll, active link turns `text-accent` for each of `work`, `services`, `experience`, `about`, `contact`.
- [ ] Mobile menu opens, locks body scroll, staggered item transitions, closes on link tap.
- [ ] SelectedWork carousel arrows + dots work; ProjectCard `onError` fallback still shows "Project screenshot coming soon" (test with the broken `dsa-lagos` image, which is a known defect and should stay broken for now).
- [ ] `useInView` fade-ins fire on CaseStudy, WhatIDo, ExperienceTimeline.
- [ ] Contact form submits to its success state; the `mailto:` link resolves.
- [ ] `/#ai-marketing-os` shows the product page; navigating back to `/#` restores the homepage; `#faq-accordion` inside the product page still works.
- [ ] `view-source` shows title, description, author, robots, canonical, all 6 `og:*` and all 3 `twitter:*` tags matching `index.html` today.
- [ ] Both JSON-LD blocks (`Person`, `WebSite`) present, and now also present on `/#ai-marketing-os`.
- [ ] Inter renders (not a fallback sans); compare headline letter-spacing closely.
- [ ] `/robots.txt` and `/sitemap.xml` still resolve.
- [ ] `npm run typecheck` clean.
- [ ] Lighthouse SEO and Accessibility scores no lower than the current build.

---

## 4. Phase 2 — Sanity setup

### 4.1 Steps Paul performs himself (needs a login)

1. Go to **https://www.sanity.io/manage** and sign up — GitHub SSO is simplest since the repo is already on GitHub. The free plan covers this comfortably.
2. Create a project: **Create new project**. Name it `Paul Udor Portfolio`. When prompted for a dataset, accept the default name **`production`** and choose **Public** visibility.
   - Public dataset = published documents are world-readable via the API. That is what we want: it means the frontend needs **no token** to read published posts. Drafts are never public regardless.
3. Copy the **Project ID** — an 8-character string like `a1b2c3d4`. Find it on the project's **Overview** page in `sanity.io/manage`, and again under **API → Project ID**.
4. **API → CORS origins → Add CORS origin.** Add these three, all with **Allow credentials** ticked (the Studio's login needs it):
   - `http://localhost:3000`
   - `https://pauludor.com`
   - the Vercel preview origin, once the preview deploy exists. Vercel preview URLs are per-deployment, so also add the wildcard `https://paul-udor-portfolio-*.vercel.app` if Paul wants the Studio to work from previews.
5. **API tokens: skip for now.** See §4.4.
6. Send me the Project ID. It is not a secret — it ships in the client bundle as `NEXT_PUBLIC_SANITY_PROJECT_ID` — but I need it to write the config.

Equivalent CLI path, if he prefers the terminal: `npx sanity login`, then `npx sanity projects create "Paul Udor Portfolio" --dataset production --dataset-visibility public`. It prints the project ID. CORS origins still have to be added in the web UI.

### 4.2 Content schema

All field names are camelCase, all types PascalCase, matching `src/data/*.ts` conventions. Three document types.

**`post`**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | Yes | `max(120)`. |
| `slug` | `slug` | Yes | `source: 'title'`, `maxLength: 96`. This is the URL: `/blog/<slug>`. Slugs are effectively permanent once published — changing one breaks inbound links. |
| `excerpt` | `text` (rows 3) | Yes | `max(200)`. Used on cards, in `<meta name="description">`, in RSS, and in client-side search. Required because it is a real SEO surface, not decoration. |
| `coverImage` | `image` | Yes | `options: { hotspot: true }` so `next/image` crops sensibly. Nested `alt` (`string`, **required**) — enforced, because the site has an accessibility story to keep. |
| `body` | `array` of `block` + `image` | Yes | Portable Text. The `image` member also gets a required `alt`. Block styles: `normal`, `h2`, `h3`, `h4`, `blockquote`; lists `bullet` + `number`; marks `strong`, `em`, `code`, `link` (with a `href` url field validated to `http`/`https`/`mailto`). No `h1` — the post title is the page's only `h1`. |
| `tags` | `array` of `reference` → `tag` | Yes | `min(1).max(4)`. At least one, so no post is unfilterable; capped so tag chips do not overflow the card. |
| `author` | `reference` → `author` | Yes | `initialValue` pointing at Paul's author doc. Needed for `BlogPosting` JSON-LD. |
| `publishedAt` | `datetime` | Yes | `initialValue: new Date().toISOString()`. Drives ordering, `datePublished`, and RSS `pubDate`. |
| `updatedAt` | `datetime` | No | Set by hand on a meaningful revision. Feeds `dateModified`. When absent, fall back to `publishedAt`. |
| `seoTitle` | `string` | No | `max(60)`. Optional override when the display title is too long or too clever for a SERP. Falls back to `title`. |
| `seoDescription` | `text` | No | `max(160)`. Optional override; falls back to `excerpt`. |

**`tag`** — `title` (`string`, required), `slug` (`slug`, required, from `title`), `description` (`text`, optional, `max(160)` — gives `/blog/tag/<slug>` a real meta description instead of a thin page).

**`author`** — `name` (`string`, required), `slug` (`slug`, required), `role` (`string`, optional), `image` (`image` + required `alt`, optional), `bio` (`array` of `block`, optional), `sameAs` (`array` of `url`, optional — LinkedIn/GitHub, feeds the JSON-LD `author.sameAs`).

Starter tags matching the positioning in `src/data/services.ts` and the Hero/About copy: `technical-seo`, `performance`, `wordpress`, `website-recovery`, `migrations`, `analytics`, `front-end`.

> **Open question for Paul (Q3):** the schema above has **one** flat taxonomy (`tag`). The brief said "tags/categories", which could mean two levels — a single broad `category` per post (e.g. *Technical SEO*) plus free-form `tags`. One taxonomy is simpler to author and to filter; two gives cleaner top-level navigation if the blog grows past ~30 posts. I have planned one. Confirm, or ask for both.

> **Open question for Paul (Q4):** should `author` exist at all in v1? It is a one-author blog, so the document type is arguably ceremony — the alternative is hardcoding Paul from `siteConfig` into the JSON-LD. I kept it because a real author document is what lets a guest post or a co-byline happen later without a schema migration, and because it gives the `author.sameAs` links a home. Say if you would rather cut it.

### 4.3 Reading time: computed, not stored

**Recommendation: compute it at render time from `body`.** A `readingTime` number field in the Studio is one more thing to get wrong — it goes stale the moment a paragraph is edited, and nobody remembers to update it. Computing is deterministic: walk the Portable Text blocks, concatenate the `children[].text` of `block`-type entries, count whitespace-delimited words, divide by 200 wpm, `Math.max(1, Math.ceil(...))`. A `getReadingTime(body)` helper in `src/lib/readingTime.ts`, called from the post page. Because the page is cached, this runs once per revalidation, not per request.

Consequence to be aware of: reading time needs `body`, so the `/blog` list query must either fetch bodies (heavy) or omit reading time from cards. **Plan: show reading time on the post page only, not on list cards.** If Paul wants it on cards, the cheap fix is a GROQ-side word count in the list projection rather than a stored field.

### 4.4 The read token question

**v1 needs no token.** The dataset is public, and we only ever read published documents, so an anonymous client works. Adding a token would mean one more secret to manage in two places for no benefit.

A token becomes necessary only when Paul wants **draft previews** — seeing an unpublished post on the real site before publishing, via Sanity's Presentation tool. That needs `next-sanity`'s `defineLive` with `serverToken`/`browserToken` (a **Viewer**-role token, created at `sanity.io/manage` → **API → Tokens**, or `npx sanity tokens add "Preview" --role=viewer`). Per Sanity's docs the browser token is only sent to the client when Draft Mode is active, and Draft Mode can only be initiated from the Presentation tool, so it is not exposed to ordinary visitors.

> **Open question for Paul (Q5):** do you want draft preview in v1? Without it, the workflow is "publish and look at the live page" — fine for a solo blog, and you can always preview inside the Studio itself. With it, you get the real page layout before publishing, at the cost of a Viewer token, a `/api/draft-mode/enable` route, and the `VisualEditing` + `SanityLive` wiring. I have planned **without**, and the structure leaves room to add it later without rework.

### 4.5 Embedded Studio route

Per Sanity's official Next.js guide:

- `sanity.config.ts` at the repo root: `'use client'` at the top, `defineConfig` with `projectId`, `dataset`, `basePath: '/studio'`, `plugins: [structureTool(), visionTool()]`, and `schema.types` from `src/sanity/schemaTypes`.
- `src/app/studio/[[...tool]]/page.tsx`:

```tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

The `[[...tool]]` optional catch-all captures `/studio/structure`, `/studio/vision`, etc. The re-exported `metadata` sets a `noindex` robots directive, so the Studio stays out of Google. `basePath` in `sanity.config.ts` must match the route exactly.

Sanity's docs warn explicitly: if we later add `SanityLive` or `VisualEditing`, they must go in a **content** layout, never in the layout that wraps `/studio`, or the Studio reloads unexpectedly. That is an argument for putting blog-only providers in `src/app/(site)/layout.tsx` rather than the root layout — worth doing pre-emptively so a later preview feature is a drop-in.

### 4.6 Environment variables

`.env.local` (local, gitignored — confirm §3.9 landed first):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<from step 3>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-09-22
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_REVALIDATE_SECRET=<generate: openssl rand -base64 32>
```

The first three are `NEXT_PUBLIC_` because the browser-side Studio needs them; none is a secret. `NEXT_PUBLIC_SANITY_API_VERSION` is pinned to a date so Sanity API changes can never silently alter query behaviour. `SANITY_REVALIDATE_SECRET` is server-only and must **not** be prefixed.

Vercel (**Project → Settings → Environment Variables**), same keys, with:

- `NEXT_PUBLIC_SITE_URL=https://pauludor.com` for **Production**.
- For **Preview**, leave `NEXT_PUBLIC_SITE_URL` unset and derive it from `VERCEL_URL` at runtime, so canonicals and OG URLs on previews point at the preview, not production. A `getSiteUrl()` helper in `src/lib/env.ts` centralises the fallback chain: `NEXT_PUBLIC_SITE_URL` → `https://${VERCEL_URL}` → `http://localhost:3000`.
- `SANITY_REVALIDATE_SECRET` on Production and Preview.

`siteConfig.url` in `src/data/site.ts:6` is currently a hardcoded `'https://pauludor.com'` with a stale `PLACEHOLDER` comment. Point `metadataBase` at `getSiteUrl()` instead, and leave `siteConfig.url` as the canonical production value.

---

## 5. Phase 3 — blog rendering

### 5.1 Routes and responsibilities

| Route | File | Rendering | Responsibility |
|---|---|---|---|
| `/blog` | `src/app/blog/page.tsx` | Static, tag-revalidated | Post list: cover, title, excerpt, tags, published date. Hosts the client-side search + tag chips. Static `metadata`. |
| `/blog/<slug>` | `src/app/blog/[slug]/page.tsx` | Static via `generateStaticParams`, tag-revalidated | The article. `generateMetadata`, `BlogPosting` JSON-LD, reading time, dates, related posts, newsletter UI. |
| `/blog/tag/<slug>` | `src/app/blog/tag/[slug]/page.tsx` | Static via `generateStaticParams` | Indexable per-tag listing. `generateMetadata` from the tag's `title` + `description`. |
| `/rss.xml` | `src/app/rss.xml/route.ts` | Route handler, tag-revalidated | RSS 2.0 feed, 20 most recent posts. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Generated | Homepage + `/blog` + every post + every tag page. |
| `/robots.txt` | `src/app/robots.ts` | Generated | Allow all, point at the sitemap. |
| `/api/revalidate` | `src/app/api/revalidate/route.ts` | Dynamic | Sanity webhook receiver (§7). |
| `/studio/...` | `src/app/studio/[[...tool]]/page.tsx` | `force-static` | Embedded Studio. |

Tag filtering deliberately uses **real routes** rather than only client-side chips: SEO is the stated priority, and `/blog/tag/technical-seo` is a crawlable, linkable, indexable page where a `?tag=` query param is not. The chips on `/blog` are `<Link>`s to those routes. Client-side filtering is reserved for **search** (§6.3), which genuinely should not create URLs.

Guard against thin content: only include tag pages with **2 or more** posts in `sitemap.ts`, and set `robots: { index: false }` in a tag page's `generateMetadata` when it has fewer than 2. A one-post tag page is a near-duplicate of the post and not worth an index slot.

> **Open question for Paul (Q6):** should the RSS feed live at `/rss.xml` (conventional, top-level, what feed readers guess) or `/blog/rss.xml` (scoped)? I have planned `/rss.xml` with a `<link rel="alternate" type="application/rss+xml">` in the root layout metadata so readers autodiscover it. Trivial to change, but it is a URL so it is worth getting right once.

### 5.2 Data fetching, caching and revalidation

One Sanity client in `src/sanity/lib/client.ts` via `createClient` from `next-sanity`, with `useCdn: true` for read performance. All GROQ queries live in `src/sanity/lib/queries.ts`, written with `defineQuery` so they are typed and syntax-highlighted.

A thin `sanityFetch` wrapper in `src/sanity/lib/fetch.ts` that takes `{ query, params, tags }` and passes `next: { tags, revalidate: false }` to the client's fetch options. Per Sanity's caching docs, **tags and time-based `revalidate` are mutually exclusive — pick one per query.** We pick tags exclusively: caches live indefinitely and are busted by the publish webhook. That is the right trade for a blog that changes rarely and must be instant when it does.

Tagging scheme:

- Every post-list query: `['post']`.
- Each individual post query: `['post', 'post:<slug>']`.
- Tag-listing queries: `['post', 'tag']`.

So publishing any post busts all listings, and editing one post can bust just that post if we want the narrower blast radius.

`generateStaticParams` on `/blog/[slug]` and `/blog/tag/[slug]` prerenders every post and tag at build time — real HTML in the initial response, which is the whole point of the SEO requirement. New posts published after a build are handled by the webhook plus Next's fallback rendering for unknown params.

Remember `params` is a Promise in Next 16: `const { slug } = await params` in every page, `generateMetadata`, and `opengraph-image`.

### 5.3 Portable Text styling

**Recommendation: install `@tailwindcss/typography` and layer a custom `prose-paul` theme on top of it.** Hand-rolling every element style means reimplementing list markers, nested list spacing, `code`/`pre`, tables, `hr`, blockquote indentation, and the vertical rhythm between all of them — a genuinely fiddly amount of CSS to own for no differentiation. The plugin gives correct defaults; we override only the colours and the handful of type scales that must match the existing site.

Per the plugin's docs, Tailwind v4 registers it from CSS, not a config file:

```css
/* src/app/globals.css, after @import "tailwindcss" */
@plugin "@tailwindcss/typography";
```

Then map the plugin's CSS variables onto the tokens already declared in `@theme`, as a custom `@utility` (the v4 way — the v3 `typography` config key does not apply):

```css
@utility prose-paul {
  --tw-prose-body: var(--color-text-muted);
  --tw-prose-headings: var(--color-text);
  --tw-prose-links: var(--color-accent);
  --tw-prose-bold: var(--color-text);
  --tw-prose-counters: var(--color-text-subtle);
  --tw-prose-bullets: var(--color-border-hover);
  --tw-prose-hr: var(--color-border);
  --tw-prose-quotes: var(--color-ivory);
  --tw-prose-quote-borders: var(--color-gold);
  --tw-prose-captions: var(--color-text-subtle);
  --tw-prose-code: var(--color-text);
  --tw-prose-pre-code: var(--color-text);
  --tw-prose-pre-bg: var(--color-surface-elevated);
  --tw-prose-th-borders: var(--color-border-hover);
  --tw-prose-td-borders: var(--color-border);
}
```

The article wrapper becomes `prose prose-paul md:prose-lg max-w-none`, which lands body copy at the site's existing `text-base md:text-lg text-text-muted leading-relaxed`. Because the site is dark-only, we set the colours directly rather than using `prose-invert`.

Custom Portable Text components in `src/components/blog/PortableTextBody.tsx` for the things the plugin cannot know about:

- `h2` / `h3` → the site's existing `text-3xl md:text-4xl ... tracking-tight` and `text-xl md:text-2xl font-semibold` classes, plus auto-generated `id` slugs for deep links.
- `image` → `next/image` with the Sanity URL builder, wrapped in a `<figure>` with `<figcaption>` from `alt`, `sizes` set for the article column width.
- `link` → `rel="noopener noreferrer"` and `target="_blank"` on external hrefs only.
- `code` mark → `bg-surface-elevated border border-border rounded px-1.5 py-0.5 text-sm`.

### 5.4 Per-post metadata

`generateMetadata` on `/blog/[slug]` returns: `title` (`seoTitle ?? title`), `description` (`seoDescription ?? excerpt`), `alternates.canonical` = `/blog/<slug>`, `openGraph` (`type: 'article'`, `title`, `description`, `url`, `publishedTime`, `modifiedTime`, `authors`, `images`, `siteName: 'Paul Udor Portfolio'`, `locale: 'en_NG'`), `twitter` (`card: 'summary_large_image'`, `title`, `description`, `images`). Set `metadataBase: new URL(getSiteUrl())` once in the root layout so every relative canonical and OG URL resolves correctly — including on preview deploys.

Return `notFound()` for an unknown slug so it is a real 404, not a soft 200 with empty content.

Root layout `metadata` carries over `index.html` verbatim: title, description, `authors`, `robots: { index: true, follow: true }`, `alternates.canonical: '/'`, the six `og:*` values (`type: 'website'`, url, title, description, `locale: 'en_NG'`, `siteName: 'Paul Udor Portfolio'`), the three `twitter:*` values, `icons` for `favicon.svg`, and the RSS `alternates.types` entry.

### 5.5 `BlogPosting` structured data

A `BlogPostingStructuredData` component alongside the existing `StructuredData.tsx`, using the same `dangerouslySetInnerHTML` JSON-LD pattern so there is one idiom in the codebase. Fields: `@type: 'BlogPosting'`, `headline` (title, ≤110 chars), `description`, `image` (absolute cover image URL), `datePublished`, `dateModified` (`updatedAt ?? publishedAt`), `author` (`Person` with `name`, `url`, `sameAs`), `publisher` (`Person`, consistent with the existing `Person` schema — not an `Organization`, since this is a personal site), `mainEntityOfPage` (`WebPage` with the canonical `@id`), `url`, `keywords` (tag titles), `wordCount`, `inLanguage: 'en'`.

Validate every post template once with Google's Rich Results Test before go-live.

### 5.6 Open Graph images

The site has **no `og:image` and no `twitter:image` today** — nothing in `index.html`, nothing in `public/`. Every share of pauludor.com currently renders as a bare text card, and `twitter:card` is already declared `summary_large_image`, which makes the omission worse: the card reserves a large image slot and shows nothing. Fixing this is the single highest-leverage SEO/social item in the plan and it is independent of the blog.

Two pieces:

1. **Site-wide default.** `src/app/opengraph-image.tsx` using `ImageResponse` from `next/og`, 1200×630, rendering Paul's name, `siteConfig.tagline` and the site's dark background + gold glow. Generated at build time, no design tool needed, and automatically picked up as `og:image` + `twitter:image` for the homepage. Also add a `twitter-image.tsx` (or let Next reuse the OG image — verify which happens in the built output).
2. **Per-post.** `src/app/blog/[slug]/opengraph-image.tsx`, same `ImageResponse` approach, rendering the post title, the primary tag and the byline over the same background. In Next 16 the `params` prop here is a **Promise** and must be awaited.

Deliberately generating text-composited cards rather than using `coverImage` directly: cover images are photographic and arbitrary-aspect, and cropping them to 1200×630 usually produces something illegible at feed size. Fallback if the composited cards look poor in practice: use the Sanity image pipeline to render `coverImage` at exactly `1200×630` with `fit=crop` and the hotspot honoured.

> **Open question for Paul (Q7):** the OG cards need a visual direction. Do you want them to look like the site (near-black background, gold radial glow, Inter, small "pauludor.com" wordmark), or would you rather design one template yourself and have us fill in the text? I have planned the former. Related: `ImageResponse` needs the font as a binary — we would commit `Inter-SemiBold.ttf` to `public/fonts/` for it, which is the standard approach.

### 5.7 Cover images

`src/sanity/lib/image.ts` exports `urlForImage` built on `@sanity/image-url` with the project's client. Cover images render through `next/image` with `cdn.sanity.io` allowed in `next.config.ts` (§3.6).

Query the image's `asset->metadata.dimensions` and `metadata.lqip` in GROQ so we can pass real `width`/`height` (no layout shift) and use the base64 LQIP as `placeholder="blur"` / `blurDataURL`. Set `sizes` per context — full-bleed on the post page, roughly one-third viewport on list cards — so Next requests the right size rather than the largest. Honour the hotspot by passing crop params from `urlForImage`.

---

## 6. Phase 4 — teaser, navigation, search, tags, related, newsletter

### 6.1 "Latest writing" on the homepage

A `LatestWriting` server component fetching the 3 most recent posts, placed in `src/app/page.tsx` **between `<About />` and `<Contact />`**. Reasoning: the stack is currently proof-of-work (Hero → SelectedWork → CaseStudy → WhatIDo → TechnicalSkills → Experience → AdditionalExperience → Education) then personality (About) then conversion (Contact). Writing is credibility, so it belongs after the reader knows who Paul is and before the ask — and putting it before `Contact` means it never pushes the conversion point further down for a reader who is already sold, because Contact stays last.

Structurally it reuses the existing idiom exactly: `<section id="writing" className="section-padding">` wrapping `container-max`, a `SectionHeading` with the `text-xs font-medium tracking-widest uppercase text-accent` eyebrow, a 3-up card grid, and a "Read all posts" `Button` with `variant="secondary"` linking to `/blog`.

Render nothing at all when there are zero posts — the site launches with an empty blog, and an empty section with a heading looks broken. The `LatestWriting` component returns `null` if the query comes back empty.

### 6.2 Navigation: the hash-anchor problem

This is the one piece of phase 4 that needs real care. Today's navbar assumes a single scrolling page:

- `src/data/site.ts:16-22` — `navLinks` are bare hashes: `#work`, `#services`, `#experience`, `#about`, `#contact`.
- `src/components/Navbar.tsx:6` — `const sectionIds = ['work', 'services', 'experience', 'about', 'contact']`.
- `useScrollSpy` (`src/hooks/useScrollSpy.ts:6-23`) reads `document.getElementById(id).offsetTop` for each of those ids on every scroll.

Both break on `/blog`. A bare `href="#work"` on `/blog` scrolls to a non-existent anchor and does nothing; and `getElementById` returns `null` for all five sections, so `useScrollSpy` sets `activeId` to `''` on every scroll event — harmless visually (no link highlights) but it is a listener doing pointless work on every blog page.

The approach, in three concrete parts:

1. **Make the section links root-relative.** Change `navLinks` hrefs from `#work` to `/#work`, etc. Next's `<Link href="/#work">` navigates to the homepage and then scrolls to the anchor, and on the homepage itself it behaves as a same-page anchor jump. This is the smallest change that makes one nav array correct on every route. Keep the shape `{ label, href }` so `Footer.tsx:18-28` needs no logic change.
2. **Add the Blog link as a separate concern.** Append `{ label: 'Blog', href: '/blog' }` to `navLinks` so it appears in both navbar and footer from one edit. It is a route, not an anchor, so it must never participate in scroll-spy.
3. **Scope scroll-spy to the homepage.** In `Navbar`, read `usePathname()` from `next/navigation` and pass `pathname === '/' ? sectionIds : []` into `useScrollSpy`. The hook already no-ops on an empty array. Then compute the active state per link as: a hash link is active when `pathname === '/'` and `activeId` matches its fragment; the Blog link is active when `pathname.startsWith('/blog')`. That gives the correct highlight on `/blog` and `/blog/<slug>` without touching the hook's internals.

Two follow-on details:

- `Navbar` is `fixed` with `h-16 md:h-18` and today the Hero provides its own top spacing. Blog pages need equivalent top padding or the navbar will overlap the post title. Handle it in a shared `src/app/(site)/blog/layout.tsx` rather than per page.
- The "Let's Talk" `Button href="#contact"` in both the desktop and mobile navbar (`Navbar.tsx:70`, `Navbar.tsx:143`) has the same problem and becomes `/#contact`.
- `html { scroll-behavior: smooth }` in `globals.css:23-25` means cross-page anchor landings may animate; verify `/#work` from `/blog` lands correctly and not mid-animation.

### 6.3 Search

A `BlogSearch` client component owning a controlled input, rendered on `/blog`. The list page passes the full post list (already fetched server-side) down as a prop; the client filters it. Match case-insensitively against `title`, `excerpt`, and tag titles — **not** body text, per the decision. Debounce is unnecessary at this scale; filter synchronously on change.

Accessibility and empty states: `role="searchbox"` semantics via a proper `<label>` (visually hidden), an `aria-live="polite"` result count, and a "No posts match '<query>'" state with a reset affordance. Search state stays in React only — no URL param — so it never creates crawlable duplicate listings.

### 6.4 Related posts

Selection rule, applied server-side on the post page:

1. Fetch posts sharing **at least one** tag with the current post, excluding the current post by `_id`.
2. Score each by **number of shared tags**, descending.
3. Break ties by `publishedAt`, descending.
4. Take the top **3**.
5. If that yields fewer than 3, top up with the most recent posts overall (still excluding the current post and anything already selected).

The top-up in step 5 matters at launch: with 2 posts live, a strict tag-overlap rule renders an empty section on most posts. If fewer than 3 posts exist in total, render nothing.

### 6.5 Newsletter UI

`src/components/blog/NewsletterSignup.tsx`, a client component matching the site's form idiom from `Contact.tsx` (same input classes, same `Button` component, same submitted-state pattern). Local state: `email`, `status` (`'idle' | 'submitting' | 'success' | 'error'`). Client-side email validation, a disabled button while submitting, and a success message replacing the form.

The integration point is a single stub module so it is impossible to miss:

```ts
// src/lib/newsletter.ts

/* ------------------------------------------------------------------
 * INTEGRATION POINT — NOT WIRED UP
 * This is intentionally a no-op. To go live, replace the body with a
 * call to a Route Handler that talks to the email provider (Buttondown,
 * Resend, ConvertKit, Mailchimp...) using a server-only API key.
 * Do NOT call a provider directly from this module — it runs in the
 * browser and would expose the key.
 * ------------------------------------------------------------------ */
export async function subscribeEmail(email: string): Promise<void> {
  console.warn('newsletter: not wired up, discarding signup for', email)
}
```

The UI shows a success state on submit so the component can be reviewed and styled properly, but **the address is discarded**. To avoid misleading anyone, the form's helper text should say something honest like "Coming soon — sign-ups aren't live yet", or the component should stay out of the page until it is wired. That is a decision, not a detail:

> **Open question for Paul (Q8):** should the newsletter form be **visible on the live site** while it is unwired? Options: (a) render it and show a "coming soon" note, (b) render it and silently discard — which collects nothing and quietly misleads readers, or (c) build the component but do not mount it on any page until an email provider is chosen. I recommend **(c)** — it is the only one that cannot cost you a subscriber or a trust hit. Also: do you already have a provider in mind? If you name one now I can shape the stub's signature to fit it.

---

## 7. Phase 5 — publish flow and deploy

### 7.1 Publish → live, without a rebuild

`src/app/api/revalidate/route.ts`, a POST route handler:

1. `parseBody` from `next-sanity/webhook`, with `process.env.SANITY_REVALIDATE_SECRET`, and `true` as the third argument. That third argument adds a short propagation wait — without it the webhook can fire before Sanity's CDN has the new document and we revalidate to stale content. This is a real, commonly-hit race.
2. Return `401` on `!isValidSignature`, `400` if the payload has no usable tags, `500` if the secret env var is missing.
3. On success, call `revalidateTag(tag, { expire: 0 })` for each tag in the payload.

**The `{ expire: 0 }` matters and most tutorials get it wrong.** In Next 16 the one-argument `revalidateTag(tag)` is a TypeScript error. The recommended `'max'` profile serves stale content while revalidating in the background — wrong here, because Paul's expectation is "I hit publish, the post is live". `updateTag`, which gives read-your-writes immediately, is Server-Actions-only and unavailable in a webhook. `{ expire: 0 }` is the documented way to force an immediate blocking revalidate from outside a Server Action.

Note the invalidation is request-triggered: a tag is marked stale immediately, but a given page re-renders when it is next visited. Practically instant for a visitor; it does mean "publish" does not warm every page at once.

Sanity side (`sanity.io/manage` → project → **API → Webhooks → Create webhook**):

- **URL:** `https://pauludor.com/api/revalidate`
- **Dataset:** `production`
- **Trigger on:** Create, Update, Delete
- **Filter:** `_type == "post" || _type == "tag" || _type == "author"`
- **Projection:** `{"tags": ["post", "post:" + slug.current]}` for posts — so the payload carries exactly the tags to bust.
- **HTTP method:** POST, **API version:** `v2021-03-25` or later
- **Secret:** the same value as `SANITY_REVALIDATE_SECRET` in Vercel. Set it under **Edit webhook → Secret** — it is on a later screen than the initial create form, and it is easy to skip.

Test it before trusting it: publish a draft, watch the Vercel function logs for a 200, then hard-reload `/blog`.

### 7.2 Deploy sequence

1. Push `cursor/blog-nextjs-migration`. Vercel builds a preview automatically.
2. In Vercel, change the framework preset from Vite to **Next.js** — build command `next build`, output handled by the Next adapter. The README's current `dist` output directory no longer applies. Vercel usually auto-detects this from `package.json`, but verify it rather than assuming.
3. Add all env vars for **Preview** and **Production** (§4.6) *before* the first build that needs them, or it will fail on the missing project ID.
4. Add the preview origin to Sanity CORS (§4.1 step 4).
5. Review the preview against the phase 1 checklist (§3.11) plus the blog checkpoints (§9).
6. Point the webhook at the preview URL first, publish a test post, confirm on-demand revalidation works there.
7. Merge to `cursor/paul-udor-portfolio`, confirm production builds green.
8. Repoint the webhook at `https://pauludor.com/api/revalidate`.
9. Post-launch: resubmit `https://pauludor.com/sitemap.xml` in Google Search Console, run the Rich Results Test on one post, and check the OG card in a social debugger.
10. Delete the test post and confirm the deletion also revalidates.

---

## 8. New file tree

```
paul-udor-portfolio/
├── .env.local                              (gitignored, created by Paul)
├── .gitignore                              modified
├── README.md                               modified
├── next.config.ts                          new
├── package.json                            modified
├── package-lock.json                       regenerated
├── postcss.config.mjs                      new
├── sanity.config.ts                        new
├── sanity.cli.ts                           new (projectId/dataset for the CLI)
├── tsconfig.json                           modified
├── docs/
│   └── blog-plan.md                        this file
├── public/
│   ├── favicon.svg                         unchanged
│   ├── icons.svg                           unchanged
│   └── fonts/
│       └── Inter-SemiBold.ttf              new (for ImageResponse OG cards)
└── src/
    ├── app/
    │   ├── layout.tsx                      new — html/body, metadata, Inter, StructuredData
    │   ├── page.tsx                        new — homepage (from App.tsx)
    │   ├── globals.css                     moved from src/index.css
    │   ├── not-found.tsx                   new
    │   ├── opengraph-image.tsx             new — site default OG card
    │   ├── robots.ts                       new (replaces public/robots.txt)
    │   ├── sitemap.ts                      new (replaces public/sitemap.xml)
    │   ├── rss.xml/
    │   │   └── route.ts                    new
    │   ├── api/
    │   │   └── revalidate/
    │   │       └── route.ts                new — Sanity webhook
    │   ├── blog/
    │   │   ├── layout.tsx                  new — navbar offset + shared chrome
    │   │   ├── page.tsx                     new — post list
    │   │   ├── [slug]/
    │   │   │   ├── page.tsx                new — article
    │   │   │   └── opengraph-image.tsx     new — per-post OG card
    │   │   └── tag/
    │   │       └── [slug]/
    │   │           └── page.tsx            new — tag listing
    │   └── studio/
    │       └── [[...tool]]/
    │           └── page.tsx                new — embedded Studio
    ├── assets/                             all 11 files unchanged
    ├── components/
    │   ├── About.tsx                       unchanged
    │   ├── Button.tsx                      unchanged
    │   ├── CaseStudy.tsx                   + 'use client'
    │   ├── Contact.tsx                     + 'use client'
    │   ├── Education.tsx                   unchanged
    │   ├── Experience.tsx                  unchanged
    │   ├── ExperienceTimeline.tsx          + 'use client'
    │   ├── Footer.tsx                      + 'use client', + Blog link
    │   ├── HashProductSwitch.tsx           new (client) — hash logic from App.tsx
    │   ├── Hero.tsx                        unchanged
    │   ├── LatestWriting.tsx               new — homepage teaser
    │   ├── Navbar.tsx                      + 'use client', + pathname-aware scroll-spy
    │   ├── ProductLandingPage.tsx          unchanged (no 'use client' needed)
    │   ├── ProjectCard.tsx                 + 'use client'
    │   ├── SectionHeading.tsx              unchanged
    │   ├── SelectedWork.tsx                + 'use client'
    │   ├── ServiceCard.tsx                 unchanged
    │   ├── SkillGroup.tsx                  unchanged
    │   ├── StructuredData.tsx              modified — mounted in root layout
    │   ├── TechnicalSkills.tsx             unchanged
    │   ├── WhatIDo.tsx                     + 'use client'
    │   └── blog/
    │       ├── BlogPostingStructuredData.tsx   new
    │       ├── BlogSearch.tsx                  new (client)
    │       ├── NewsletterSignup.tsx            new (client)
    │       ├── PortableTextBody.tsx            new
    │       ├── PostCard.tsx                    new
    │       ├── PostMeta.tsx                    new — dates + reading time
    │       ├── RelatedPosts.tsx                new
    │       └── TagChips.tsx                    new
    ├── data/                               all 7 files unchanged except site.ts (nav)
    ├── hooks/
    │   └── useScrollSpy.ts                 + 'use client'
    ├── lib/
    │   ├── env.ts                          new — getSiteUrl()
    │   ├── newsletter.ts                   new — marked integration point
    │   ├── readingTime.ts                  new
    │   └── relatedPosts.ts                 new
    └── sanity/
        ├── lib/
        │   ├── client.ts                   new
        │   ├── fetch.ts                    new — tagged sanityFetch wrapper
        │   ├── image.ts                    new — urlForImage
        │   └── queries.ts                  new — all GROQ, via defineQuery
        ├── schemaTypes/
        │   ├── index.ts                    new
        │   ├── author.ts                   new
        │   ├── post.ts                     new
        │   └── tag.ts                      new
        └── types.ts                        new — Post, Tag, Author interfaces
```

Deleted: `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`, `tsconfig.tsbuildinfo`, `public/robots.txt`, `public/sitemap.xml`.

---

## 9. Build order with checkpoints

Each step ends with something Paul can look at and approve. Nothing proceeds past a red checkpoint.

| # | Work | Checkpoint he reviews |
|---|---|---|
| 1 | Branch + this plan | This document. **← you are here** |
| 2 | Deps swapped, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, scripts, `.gitignore`, untrack `tsconfig.tsbuildinfo` | `npm run dev` boots Next on :3000 with a blank page. Nothing visual yet. |
| 3 | Root layout + metadata + font + `globals.css`; `page.tsx` with the full section stack; `'use client'` markers; `HashProductSwitch` | **Localhost looks identical to today.** Full §3.11 checklist. This is the biggest checkpoint — do not rush it. |
| 4 | `robots.ts`, `sitemap.ts` (static routes only), site-wide `opengraph-image.tsx` | `/robots.txt` and `/sitemap.xml` render; the OG card renders at `/opengraph-image`. **First time the site has ever had one.** |
| 5 | Push branch, Vercel preset → Next.js, env vars, preview deploy | **Preview URL looks identical to production.** Approve before any blog work starts. |
| 6 | Paul creates the Sanity project + CORS (§4.1); sends project ID | Project ID in hand. |
| 7 | Schemas, `sanity.config.ts`, `/studio` route | **He logs into `/studio` and creates a real post.** Confirms field names, validation and authoring feel before any rendering exists. |
| 8 | Client, queries, `/blog` list + `PostCard` | `/blog` lists his test post with cover and excerpt. |
| 9 | `/blog/[slug]`, typography plugin + `prose-paul`, Portable Text components, reading time, dates | **He reads his own post on the site.** Check article typography closely — this is where the hand-rolled-vs-plugin decision gets judged. |
| 10 | `generateMetadata`, `BlogPosting` JSON-LD, per-post OG image, sitemap includes posts, `/rss.xml` | View-source shows per-post meta; Rich Results Test passes; feed validates. |
| 11 | Tag routes, `TagChips`, `BlogSearch`, `RelatedPosts` | Filtering and search work with 3+ test posts. |
| 12 | `LatestWriting` on the homepage; nav + footer Blog link; pathname-aware scroll-spy | **Homepage teaser in place; nav correct on both `/` and `/blog`.** Re-run the §3.11 nav checks. |
| 13 | `NewsletterSignup` + `lib/newsletter.ts` stub | Component reviewed in isolation (mounting decision = Q8). |
| 14 | Webhook route + Sanity webhook against the preview | **He publishes a post in the Studio and watches it appear** on the preview without a redeploy. |
| 15 | Merge, production deploy, repoint webhook, GSC resubmit | Live on pauludor.com. |

---

## 10. Risks and mitigations

| Risk | Why it is real here | Mitigation |
|---|---|---|
| Visual regressions during the migration | 19 components, a hand-rolled utility layer, and no test suite or visual-regression tooling | Checkpoint 3 is a full side-by-side pass at 4 breakpoints (§3.11); `globals.css` moves byte-for-byte; images and `data/` stay untouched |
| Font swap changes rendering | `next/font` subsets Inter differently from Google's CDN | Compare headlines at checkpoint 3; documented one-line rollback to the `<link>` tags (§3.4) |
| Missed `'use client'` → build error | Three `useInView` consumers look like static sections and are easy to overlook | Exact verified list in §3.5, derived by grep rather than by reading; `next build` fails loudly on a miss, so this surfaces at checkpoint 3 |
| Footer copyright year freezes | `new Date()` evaluates at build time in a server component | `'use client'` on `Footer` (§3.5) |
| Flash of homepage on `#ai-marketing-os` | Fragments never reach the server, so SSR cannot know the hash | Accepted and flagged (Q2); real fix is a route, deferred by decision |
| Stale content after publish | Tag-based caching lives indefinitely until busted; and the webhook can beat Sanity's CDN | `revalidateTag(tag, { expire: 0 })`, not `'max'`; `parseBody(..., true)` for the propagation wait; end-to-end publish test at checkpoint 14 (§7.1) |
| Secret leaking into git | `.gitignore` has no `.env*` rule today, and a build artifact is already tracked | `.gitignore` updated at step 2, **before** `.env.local` exists (§3.9); `SANITY_REVALIDATE_SECRET` deliberately un-prefixed so it can never reach the bundle |
| Next.js 16 API drift | Many Sanity + Next blog tutorials predate 16 and show `revalidateTag(tag)`, sync `params`, and `images.domains` | All three verified against nextjs.org today and called out inline (§2, §5.2, §7.1); do not copy tutorial code without checking |
| Thin tag pages hurting SEO | A one-post tag page is a near-duplicate of the post | `noindex` under 2 posts; sitemap excludes them (§5.1) |
| Sanity free-plan limits | Free tier has finite API requests and bandwidth | `useCdn: true`, indefinite tag-based caching, and `generateStaticParams` mean requests scale with publishes, not with traffic |
| Newsletter collecting nothing | A working-looking form that discards addresses | Q8 — recommendation is not to mount it until a provider is chosen |
| Scope creep from known defects | Several pre-existing bugs sit next to files we are touching | Listed in §11 and explicitly out of scope; the `dsa-lagos` image stays broken through checkpoint 3 on purpose, as a visual-parity control |

---

## 11. Out of scope / suggested follow-ups

Pre-existing defects, verified in the current tree. **Not fixed in this work** — each is a small separate change:

1. **`src/data/projects.ts:57`** — `image: 'public/projects/dsa-lagos.webp'`. The file does not exist (`src/assets/` has no `dsa-lagos.webp`, and there is no `public/projects/` directory at all), and a `public/...` prefix would not resolve at runtime even if it did — public assets are served from `/`. The card currently falls through to `ProjectCard`'s `onError` placeholder. Fix: add the image to `src/assets/` and import it like the other four.
2. **`src/components/Contact.tsx:42`** — displays `paul.udor@gmail.com` while the `mailto:` uses `siteConfig.email` (`hello@pauludor.com`, `src/data/site.ts:10`). Two different addresses on the same form. Worth Paul's attention: decide which is canonical and drive both from `siteConfig`.
3. **`src/data/site.ts:6,10,11,12`** — four stale `// PLACEHOLDER` comments on values that look real (`url`, `email`, `linkedin`, `github`). Confirm each is correct and delete the comments.
4. **`README.md:78`** — documents `featured`, `caseStudy` and `cta` fields on projects. None exists on `interface Project` (`src/data/projects.ts:8-14`).
5. **`#ai-marketing-os` has no matching element.** Nothing in `src/` renders `id="ai-marketing-os"` — it works only as a state trigger, not an anchor. Related: the product view renders without `Navbar`, `Footer` or `StructuredData` (`src/App.tsx:33-35`), so it has no navigation back to the site and no structured data. This plan mounts `StructuredData` in the root layout, which fixes the last part incidentally.
6. **`tsconfig.tsbuildinfo` is tracked in git.** Untracked as part of step 2.
7. **`#ai-marketing-os` as a real route.** Because the product page lives behind a fragment, Google cannot index it — fragments are never sent to the server, so there is no crawlable URL for it and it will never rank. Converting it to `/ai-marketing-os` is the fix. Deferred by explicit decision.
8. **`next/image` for project screenshots.** `ProjectCard` renders a plain `<img>`; the four bundled PNGs are unoptimised. Real LCP win, but it changes markup, so it is deliberately after the parity checkpoint.
9. **No ESLint.** The repo has no linter, and `next lint` was removed in Next 16. Adding `eslint` + `eslint-config-next` directly would catch client/server boundary mistakes automatically.
10. **Draft previews / Visual Editing** (Q5), **newsletter provider wiring** (Q8), **full-text search** over article bodies, per-post view counts, comments, and a `/blog` pagination scheme (not needed under ~30 posts) are all out of scope.

---

## 12. Open questions for Paul

Collected from inline callouts. Nothing here was guessed at — each needs a call before the affected step.

| # | Question | Blocks | My leaning |
|---|---|---|---|
| **Q1** | Embed the Studio at `pauludor.com/studio`, or host it on Sanity (`<project>.sanity.studio`) and keep this repo frontend-only? Embedding costs 3 heavy dev deps (`sanity`, `@sanity/vision`, `styled-components`) and slower Vercel builds; hosting externally costs a second URL to remember. | Step 7 | Embed — one login, one deploy |
| **Q2** | Is a brief flash of the homepage before the product page acceptable on `/#ai-marketing-os` links? SSR cannot see the fragment, so the alternative costs a blank first frame on *every* homepage visit. | Step 3 | Accept the flash |
| **Q3** | One flat `tag` taxonomy, or two levels (one broad `category` per post + free-form `tags`)? | Step 7 | One, until the blog outgrows it |
| **Q4** | Keep a real `author` document type on a one-author blog, or hardcode you from `siteConfig`? | Step 7 | Keep it — cheap now, avoids a migration later |
| **Q5** | Do you want draft preview (see an unpublished post on the real site) in v1? Costs a Viewer token, a draft-mode route, and `VisualEditing` wiring. | Step 7 | Skip for v1; the structure leaves room |
| **Q6** | RSS at `/rss.xml` or `/blog/rss.xml`? | Step 10 | `/rss.xml` |
| **Q7** | Visual direction for the OG share cards — match the site (near-black, gold glow, Inter, small wordmark), or do you want to design the template? Also confirms committing `Inter-SemiBold.ttf` to `public/fonts/`. | Step 4 | Match the site |
| **Q8** | Should the unwired newsletter form be visible on the live site? (a) visible with a "coming soon" note, (b) visible and silently discarding, (c) built but not mounted. And do you have an email provider in mind? | Step 13 | (c) — nothing else avoids misleading a reader |
| **Q9** | Which email is canonical, `hello@pauludor.com` or `paul.udor@gmail.com`? Both appear on the contact form today (§11 item 2). Not blocking, but you should know. | — | — |
| **Q10** | Anything you want the blog **not** to do that I have assumed? Specifically: I have assumed no pagination on `/blog` (unnecessary under ~30 posts), no comments, and no post view counts. | Step 8 | As stated |
