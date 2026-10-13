# Portfolio

A modern, minimal portfolio frontend for a software engineering student —
built with React, TypeScript, Vite, Tailwind CSS and Framer Motion. No
backend, no database: everything runs client-side.

Content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) — see [Customizing](#customizing).

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint      # oxlint
```

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`, class-based dark mode)
- Framer Motion (page/scroll animations, layout transitions)
- lucide-react + react-icons (iconography)

## Project structure

```
src/
  components/
    ui/           Small reusable primitives (Button, Badge, SectionHeading, TechIcon...)
    sections/      One component per homepage section (Hero, About, Skills, ...)
    Navbar.tsx, Footer.tsx, ThemeToggle.tsx
  data/
    portfolio.ts   ⚠️ Single source of truth for ALL content — edit this file
  types/
    portfolio.ts   TypeScript shapes mirrored by data/portfolio.ts
  hooks/
    useTheme.ts, useActiveSection.ts, useLockBodyScroll.ts
  pages/
    Home.tsx        Composes every section into the homepage
  lib/
    resumes.ts      Resolves the CV files listed in `resumes` (data/portfolio.ts)
  assets/           Images, demo videos and CVs (see assets/README.md)
    cv/             CV PDFs used by the "Download CV" selector
```

## Customizing

Everything the site renders comes from **[`src/data/portfolio.ts`](src/data/portfolio.ts)** —
components never hard-code content. To personalize the portfolio:

1. Open `src/data/portfolio.ts`.
2. Replace the placeholder values (`YOUR NAME`, `COMPANY NAME`, `PROJECT DESCRIPTION`, …) with your real information — personal info, social links, stats, skills, featured projects, other projects, experience, education, certifications.
3. Drop real images into `src/assets/` (see `src/assets/README.md`) and swap the `<ImagePlaceholder />` components for real `<img>` tags where you want them, or import an image and reference it in the data file.
4. CVs: put the PDFs in `src/assets/cv/` with the file names listed in `resumes`
   (currently `CV_French.pdf` and `Eya_Zayeni_Resume.pdf`). A missing file shows as
   "Coming soon" in the selector instead of a broken download.
5. Update the favicon (`public/favicon.svg`) and the `<title>` / meta description in `index.html` if you want.

No component file needs to change for a typical content update.

## Notes

- There is no backend: the contact form opens the visitor's email app with the
  message pre-filled (`mailto:`) and says so — it never claims a message was sent.
- Demo videos use the compressed `*-web.mp4` copies in `src/assets/projects/`; the
  original recordings are not imported, so they are not shipped in `dist/`.
- Projects with a `demoVideo` show it as a muted, looping cover preview (the `image`
  is its poster); it only plays while on screen and never autoplays with reduced motion.
- Project links are optional: leave `githubUrl` / `liveUrl` empty to hide them.
- Light/dark mode is persisted in `localStorage` and respects the system preference on first visit.
