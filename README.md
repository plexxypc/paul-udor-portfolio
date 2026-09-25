# Paul Udor — portfolio

Portfolio and blog built with Vite + React (JavaScript), react-router-dom, and plain CSS custom properties. It is a static build with no backend or CMS.

## Commands

```powershell
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

In PowerShell, pass Vite flags with `npx vite --port 5173`. `npm run dev -- --port 5173` loses the flags and Vite ends up treating `5173` as the project root.

## Where content lives

| What | File |
| --- | --- |
| Name, title, bio, email, socials | `src/data/profileData.js` |
| Case studies | `src/data/projectsData.js` |
| Previous websites (screenshot cards) | `src/data/websitesData.js`, images in `src/assets/work/` |
| Blog posts | `src/content/blog/*.md` |
| Resume PDF | `public/resume/paul-udor-resume.pdf` (path set by `resume_url` in `profileData.js`) |
| Colours, fonts, spacing | `src/styles/tokens.css` |

Blog frontmatter looks like this. The file name becomes the URL slug:

```yaml
---
title: "Post title"
date: 2026-09-25
excerpt: "Short summary for listings."
tags: [n8n, automation]
---
```

To add an embedded live demo to a case study, set `demo_url` on the project. When `demo_embed` is `true`, the demo renders inline in an iframe; otherwise the page shows a link.

## Contact form (FormSubmit)

The form posts to `https://formsubmit.co/ajax/<email from profileData.js>`. It needs no backend or API key.

- **The first submission sends an activation email.** Click the link in it once, or later submissions won't be delivered.
- After activating, FormSubmit gives you a random alias string. You can use it in place of the email address in the endpoint URL so your address isn't visible in the page source.

## Deploying

- **Netlify:** use build command `npm run build` and publish directory `dist`. `public/_redirects` handles the SPA fallback.
- **Vercel:** Vercel auto-detects Vite. `vercel.json` rewrites every route to `index.html`.

## Still to do

- [ ] **REPLACE_ME placeholders:** the optional hero tagline in `profileData.js`, the case-study `result` in `projectsData.js`, and the placeholder post `src/content/blog/replace-me-first-post.md`.
- [ ] **SEO: static prerendering.** This is a client-rendered SPA, so `/blog/:slug` and `/work/:id` send an empty `<div id="root">` to crawlers. Every route also shares the same `<title>` and meta description until JavaScript runs. Google renders JavaScript but is slower and less reliable about it; most social-card scrapers don't run it at all. The planned fix is to prerender each route to static HTML at build time, with per-page titles, descriptions, Open Graph tags, and a generated `sitemap.xml`.
- [ ] Add an Open Graph share image and `og:url` once the production domain is known.
