# nithinbalamurugan.com

Personal site, built as a single-screen **bento board** so recruiters can scan everything at a glance.

- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion
- **Content:** everything lives in typed data files in [`content/`](content/). Edit those, not the components.
  - `profile.ts`: name, links, about, skills
  - `experience.ts`: roles (+ optional `logo` per role, files in `public/media/logos/`)
  - `projects.ts`: project case studies (board order = array order)
  - `research.ts`: paper + video blog posts
- **Media:** [`public/media/`](public/media/)

Projects, Experience, and About open as modals from the board (intercepting routes in `app/@modal`) but are also real pages at `/projects/[slug]`, `/experience`, `/about`. Press <kbd>⌘K</kbd> anywhere to jump.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run lint
```

Deployed on Vercel. Old `*.html` URLs redirect to the new routes (see `next.config.ts`).
