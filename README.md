# E-Summit 2026 Frontend

Official frontend for E-Summit 2026, IIT Dharwad. The app is a Vite + React single page application deployed under the `/esummit/` path. It contains the public marketing site, events catalog, schedule shell, sponsors shell, team page, pass purchase flow, and a lightweight admin area.

Start here if you are joining the project. Read this file first, then read the feature docs in `docs/features/`, then read ADRs in `adr/` before making architecture-level changes.

## Quick Start

```bash
npm install
npm run dev
```

Local app URL: `http://localhost:5173/esummit/`

Production build:

```bash
npm run build
npm run preview
```

Quality checks:

```bash
npm run lint
npm run format
```

## Tech Stack

| Area          | Choice                                                            |
| ------------- | ----------------------------------------------------------------- |
| App runtime   | React 19                                                          |
| Build tool    | Vite 7                                                            |
| Routing       | React Router DOM v6                                               |
| Styling       | Tailwind CSS v4 with tokens in `src/styles.css`                   |
| Animation     | GSAP, Motion, Three.js, postprocessing                            |
| Smooth scroll | Locomotive Scroll with Lenis options                              |
| Icons         | Lucide React                                                      |
| Persistence   | Browser `localStorage` and `sessionStorage`                       |
| API calls     | Browser `fetch` against `https://iic.iitdh.ac.in/esummit/api/api` |

## App Flow

`src/main.jsx` mounts the React app into `#root`, imports global CSS, and wraps `App` in `StrictMode`.

`src/App.jsx` owns routing. It uses `BrowserRouter` with `basename="/esummit"`, renders the global page transition overlay and custom cursor, wraps all pages in `Layout`, and lazy-loads each route behind a shared skeleton fallback.

`src/components/Shared/Layout.jsx` renders the first-load `Loader`, `Nav`, `SmoothScroll`, the route content, and `Footer`.

Most pages follow this pattern:

1. Set the document title with `useDocumentTitle`.
2. Load data from `src/lib/store.js`.
3. Render a page-level shell from `src/pages/*`.
4. Delegate detailed UI to `src/components/*`.

## Routes

| Route                 | Page file                                                 | Purpose                                                                         |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `/`                   | `src/pages/Home/Home.jsx`                                 | Landing page with hero, marquee, about, events, CTA, and FAQ sections.          |
| `/buy`                | `src/pages/PassBuy/Buy.jsx`                               | Pass selection and UPI payment flow.                                            |
| `/schedule`           | `src/pages/EventsSchedule/Schedule.jsx`                   | Schedule page shell with day selector and coming-soon state.                    |
| `/events`             | `src/pages/Event/Events.jsx`                              | Event catalog using the animated flowing menu.                                  |
| `/event/:slug`        | `src/pages/Event/EventDetails.jsx`                        | Event detail page matched by event slug.                                        |
| `/sponsors`           | `src/pages/Sponsors/Sponsors.jsx`                         | Sponsor grid, currently fallbacking to coming-soon when no sponsor data exists. |
| `/team`               | `src/pages/Team/Team.jsx`                                 | Team and crew page.                                                             |
| `/admin`              | `src/pages/Admin/AdminAuth.jsx` inside `AdminLayout`      | Admin key login.                                                                |
| `/admin/malikKiKursi` | `src/pages/Admin/AdminDashboard.jsx` inside `AdminLayout` | Admin dashboard and check-in demo.                                              |
| `*`                   | `src/pages/404/NotFound.jsx`                              | Catch-all page.                                                                 |

## Folder Map

| Path                                      | What it contains                                                                    | Used by                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `.github/workflows/deploy.yml`            | Main-branch CI/CD workflow for self-hosted VPS deployment.                          | GitHub Actions.                                                               |
| `adr/`                                    | Architecture Decision Records.                                                      | Developers before changing project conventions.                               |
| `docs/`                                   | KT, contribution, architecture, inventory, and feature docs.                        | New joiners and reviewers.                                                    |
| `docs/features/`                          | Feature-specific readmes named `featurename_readme.md`.                             | Juniors doing feature work.                                                   |
| `public/`                                 | Static assets served from Vite public root.                                         | Components using `/asset.ext` or `import.meta.env.BASE_URL`.                  |
| `src/App.jsx`                             | Route tree, lazy page imports, app-level wrappers.                                  | `src/main.jsx`.                                                               |
| `src/main.jsx`                            | React DOM entry point.                                                              | `index.html`.                                                                 |
| `src/styles.css`                          | Tailwind v4 import, design tokens, global utilities, animations, scrollbar helpers. | Imported once by `src/main.jsx`.                                              |
| `src/lib/store.js`                        | Fallback content, API fetch helpers, content hooks, cart helpers.                   | Home, events, schedule, sponsors, team, buy, admin.                           |
| `src/lib/utils.js`                        | `cn()` class-name merge helper.                                                     | UI primitives and shared components.                                          |
| `src/hooks/`                              | Local reusable hooks.                                                               | Pages/components needing title, storage, mobile state, transition navigation. |
| `src/pages/`                              | Top-level route components.                                                         | Imported lazily by `src/App.jsx`.                                             |
| `src/components/Shared/`                  | Layout, nav, footer, smooth scroll, lazy section loading.                           | Global app shell and home sections.                                           |
| `src/components/ui/`                      | Reusable primitives and navigation helpers.                                         | Pages and feature components.                                                 |
| `src/components/home/`                    | Landing page sections.                                                              | `src/pages/Home/Home.jsx`.                                                    |
| `src/components/CustomPremade/`           | Large custom visual/interaction components.                                         | Home hero, event list, about section, app cursor.                             |
| `src/components/OrderPurchaseComponents/` | Checkout step components.                                                           | `src/pages/PassBuy/Buy.jsx`.                                                  |
| `src/components/Passes/`                  | Pass card UI.                                                                       | `src/pages/PassBuy/Buy.jsx`.                                                  |
| `src/components/Sponsors/`                | Sponsor grouping and card UI.                                                       | `src/pages/Sponsors/Sponsors.jsx`.                                            |
| `src/components/Team/`                    | Team member card UI.                                                                | `src/pages/Team/Team.jsx`.                                                    |
| `src/components/Countdown/`               | Countdown timer.                                                                    | Home hero.                                                                    |
| `src/components/Loader/`                  | First-visit interactive loader with audio/GIF/GSAP exit.                            | Global layout.                                                                |
| `src/components/SkeletonLoader/`          | Route-level suspense fallback.                                                      | `src/App.jsx`.                                                                |
| `src/components/ComingSoon/`              | Shared empty/coming-soon card.                                                      | Buy, schedule, sponsors.                                                      |

## Key Config Files

| File               | Use                                                                              |
| ------------------ | -------------------------------------------------------------------------------- |
| `package.json`     | Scripts and dependencies.                                                        |
| `vite.config.js`   | React plugin, Tailwind plugin, `/esummit/` base path, `@` alias to `src`.        |
| `jsconfig.json`    | Editor support for the `@/*` alias.                                              |
| `components.json`  | shadcn/ui style and alias configuration.                                         |
| `eslint.config.js` | ESLint flat config with React Hooks and React Refresh rules.                     |
| `.env.example`     | Example admin env key. Current code also supports `VITE_API_BASE` in admin auth. |
| `index.html`       | HTML shell, fonts, favicon, `#root`, and script entry.                           |

## Static Assets

| Asset                         | Used for                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `public/logo.png`             | Nav, footer, ASCII art source.                                                    |
| `public/esummit_text.svg`     | Desktop footer brand mark.                                                        |
| `public/HeroImage.svg`        | Hero title image.                                                                 |
| `public/track.avif`           | Home CTA background.                                                              |
| `public/notFound.svg`         | 404 illustration.                                                                 |
| `public/car_start.mp3`        | Loader sound.                                                                     |
| `public/loader_assets/*.gif`  | Loader animation states.                                                          |
| `public/events_assets/*.avif` | Event hover images in the events flowing menu. File names must match event slugs. |

## Data Model

`src/lib/store.js` is the current content hub. It exports:

- `FALLBACK_EVENTS`, `FALLBACK_SCHEDULE`, `FALLBACK_FAQS`, `FALLBACK_TEAMS`, `FALLBACK_SPONSORS`, `FALLBACK_PASSES`.
- Public constants like `EVENTS`, `SCHEDULE`, `FAQS`, `TEAMS`, `SPONSORS`, `PASSES`.
- Fetch helpers: `fetchEvents`, `fetchSponsors`, `fetchFAQs`, `fetchSchedule`, `fetchTeams`.
- React hooks: `useEvents`, `useSponsors`, `useFAQs`, `useSchedule`, `useTeams`.
- Cart helpers: `getCart`, `setCart`.

Important current state:

- `FALLBACK_PASSES` is empty, so the buy page shows "No passes available".
- `FALLBACK_SPONSORS` is empty, so the sponsors page shows the coming-soon card.
- `FALLBACK_EVENTS`, `FALLBACK_SCHEDULE`, `FALLBACK_FAQS`, and `FALLBACK_TEAMS` are populated.

## Feature Docs

Read these after this README:

- [Architecture overview](./docs/architecture_overview.md)
- [File inventory](./docs/file_inventory.md)
- [KT checklist](./docs/kt_checklist.md)
- [Home feature](./docs/features/home_readme.md)
- [Events feature](./docs/features/events_readme.md)
- [Pass purchase feature](./docs/features/pass_purchase_readme.md)
- [Schedule feature](./docs/features/schedule_readme.md)
- [Sponsors feature](./docs/features/sponsors_readme.md)
- [Team feature](./docs/features/team_readme.md)
- [Admin feature](./docs/features/admin_readme.md)
- [Layout and navigation feature](./docs/features/layout_navigation_readme.md)
- [Data and content feature](./docs/features/data_content_readme.md)
- [Shared UI feature](./docs/features/shared_ui_readme.md)

## Contribution Flow

All work starts from `dev` and returns to `dev` by pull request.

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-change-name

# make changes
npm run lint
npm run build

git add .
git commit -m "feat: describe your change"
git push -u origin feature/your-change-name
```

Then raise a PR from your branch into `dev`. The admin/maintainer reviews and merges into `dev`. The admin/maintainer later merges `dev` into `main` for release.

Never raise feature PRs directly against `main`.

More details: [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md).

## ADRs

Architecture decisions are tracked in [adr/](./adr/). Read the ADR index before changing route structure, data flow, styling conventions, deployment base path, or checkout/admin behavior.
