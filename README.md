# Paul Udor — Portfolio

Professional portfolio website for Paul Udor, Web Developer based in Lagos, Nigeria.

Built with React, TypeScript, Tailwind CSS, and Vite.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel auto-detects Vite — no custom build settings needed.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy.

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Placeholders to replace before launch

Update these in `src/data/site.ts` and related files:

| Placeholder | File | What to replace |
|---|---|---|
| `https://pauludor.com` | `src/data/site.ts`, `index.html`, `public/robots.txt`, `public/sitemap.xml` | Your actual domain |
| `hello@pauludor.com` | `src/data/site.ts` | Your email address |
| `linkedin.com/in/pauludor` | `src/data/site.ts` | Your LinkedIn profile URL |
| `github.com/pauludor` | `src/data/site.ts` | Your GitHub profile URL |
| Before/After screenshots | `src/components/CaseStudy.tsx` | Add real project screenshots |
| Placeholder projects | `src/data/projects.ts` | Replace "coming soon" cards with real projects |
| Contact form handler | `src/components/Contact.tsx` | Connect Formspree, Resend, or a custom API |

## Project structure

```
src/
  components/     # Reusable UI components
  data/           # Content data (edit here to update site content)
  hooks/          # Custom React hooks
  App.tsx         # Main app layout
  main.tsx        # Entry point
  index.css       # Tailwind + global styles
public/
  robots.txt
  sitemap.xml
  favicon.svg
```

## Adding new projects

Edit `src/data/projects.ts` and add a new entry to the `projects` array. Set `featured: true` for larger cards and `caseStudy: true` with a `cta` link for case study integration.
