# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `react-website/` directory:

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint (next/core-web-vitals)
```

No test suite configured — linting is the primary code quality check.

## Architecture

**Next.js 15 App Router** portfolio site. The codebase mixes the App Router (`/app`) with an unused legacy Pages Router (`/pages/api/hello.js`).

### Routing

- `/` → `app/page.js` — monolithic home page (~800 lines); contains all sections (Hero, About, Experience, Skills, Contact, Footer) as local components in one file
- `/photos` → `app/photos/page.js` — photo gallery landing
- `/photos/trips` → `app/photos/trips/page.js` — all trips
- `/photos/trips/[tripId]` → dynamic trip detail page with lightbox
- `GET /api/photos?tripId=xyz` → `app/api/photos/route.js` — reads filenames from `/public/images/trips/[tripId]/` and returns metadata; photo dates are extracted from filenames

### Dark Mode

Dark mode uses two layers: a `<head>` script (in `app/layout.js` via `ThemeScript.js`) that reads `localStorage` and sets the `dark` class on `<html>` before first paint, then Tailwind's class-based `dark:` utilities throughout. Toggle state is managed with React state in `page.js`.

### Photo Gallery

Images are served as static files from `/public/images/trips/`. The API route at `app/api/photos/route.js` reads the filesystem to discover images — no database. `ImageModal.js` supports keyboard navigation (arrows, ESC) and swipe gestures.

### Email

Contact form uses **EmailJS** client-side — no backend email handler. Credentials come from environment variables.

### Styling

Tailwind CSS with a custom `primary` color scale (sky-blue) in `tailwind.config.js`. Dark mode is `class`-based. Animations use **Framer Motion** (scroll parallax, fade-ins, hover effects).
