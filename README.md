# E-Summit 2026 — IIT Dharwad

> The official web portal for **E-Summit 2026**, IIT Dharwad's flagship entrepreneurship summit.

The platform lets attendees **explore events**, **learn about the team**, **view sponsors**, and **get event info** — all wrapped in a high-performance React app with GSAP-powered animations and a sleek modern dark aesthetic.

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Core | [React 19](https://react.dev/) & [Vite 7](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + `src/styles.css` (custom design tokens) |
| Routing | [React Router DOM v7](https://reactrouter.com/) |
| Animations | [GSAP 3](https://gsap.com/) — ScrollTrigger, Timeline, page transitions |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering/) via `SmoothScroll.jsx` |
| Server State | [TanStack React Query v5](https://tanstack.com/query/latest) |
| Client State | `localStorage` (via custom `useLocalStorage` hook) |
| UI Primitives | Atomic components in `src/components/ui/` |
| Icons | [Lucide React](https://lucide.dev/) (navigation icons) |

---

## Prerequisites

- **Node.js** v20 or higher
- **npm** v10 or higher (comes with Node 20)

```bash
node -v   # should be >= 20
npm -v    # should be >= 10
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/latakshsariyapatidar/eSummit.NEW.git
cd eSummit.NEW

# 2. Install dependencies
npm install

# 3. Copy and configure env variables
cp .env.example .env

# 4. Start the dev server
npm run dev
```

The app will be live at `http://localhost:5173`.

### Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the codebase |
| `npm run format` | Auto-format with Prettier |

> **Before every commit:** run `npm run lint && npm run format` to keep the codebase clean.

---

## Project Structure

```text
eSummit.NEW/
├── adr/                          # Architectural Decision Records
│   ├── README.md                 # ADR template guide and catalog
│   ├── 0001-dry-refactoring.md   # ADR 0001: DRY Refactoring & Custom Hooks
│   └── 0002-new-pages-and-components.md   # ADR 0002: New Pages & Component Extraction
├── docs/                         # Developer documentation
│   ├── README.md                 # Git workflow, troubleshooting, branching guide
│   └── CONTRIBUTING.md           # How to contribute to this project
├── src/
│   ├── assets/                   # Static images (hero car, dial, track textures)
│   ├── components/               # Shared layout components, cards & modals
│   │   ├── ui/                   # Atomic UI primitives (Button, Input, Modal, etc.)
│   │   │   └── README.md         # Lists all primitives — check here before writing new ones
│   │   ├── Nav.jsx               # Responsive top navigation bar (mobile full-screen + desktop)
│   │   ├── Footer.jsx            # Site footer
│   │   ├── Layout.jsx            # Root layout wrapper (Nav + SmoothScroll + transitions)
│   │   ├── SmoothScroll.jsx      # Lenis smooth scroll wrapper
│   │   ├── Countdown.jsx         # Live countdown timer to summit date
│   │   ├── CheckoutModal.jsx     # Pass purchase & booking modal
│   │   ├── OrderStatusModal.jsx  # Order lookup/status modal
│   │   ├── SponsorLogo.jsx       # SVG sponsor logo renderer
│   │   ├── PassCard.jsx          # Reusable pass tier card (qty controls, perks list)
│   │   ├── TeamMemberCard.jsx    # Team profile card with hover-reveal crew list
│   │   └── README.md
│   ├── hooks/                    # Custom React hooks
│   │   ├── useDocumentTitle.js   # Sets dynamic browser tab title
│   │   ├── useLocalStorage.js    # Syncs state with localStorage
│   │   ├── useTransitionNavigate.js  # Programmatic GSAP route transitions
│   │   ├── use-mobile.jsx        # Responsive mobile viewport detection
│   │   └── README.md
│   ├── lib/                      # Static data & utilities
│   │   ├── store.js              # Data: PASSES, MERCH, EVENTS, SCHEDULE, FAQS
│   │   └── README.md
│   ├── pages/                    # Top-level route components
│   │   ├── Home.jsx              # Landing page (hero, countdown, events, FAQ)
│   │   ├── Events.jsx            # Full event catalog grid
│   │   ├── EventDetails.jsx      # Individual event detail page
│   │   ├── Schedule.jsx          # Day-by-day schedule grid
│   │   ├── Buy.jsx               # Pass selection — currently shows "Coming Soon"
│   │   ├── Sponsors.jsx          # Sponsors showcase — currently shows "Coming Soon"
│   │   ├── Team.jsx              # Team roster — currently shows "Coming Soon"
│   │   ├── AdminAuth.jsx         # Admin login
│   │   ├── AdminDashboard.jsx    # Admin order/pass management dashboard
│   │   ├── NotFound.jsx          # 404 fallback
│   │   └── README.md
│   ├── App.jsx                   # Route definitions & top-level providers
│   ├── main.jsx                  # React DOM mount point
│   └── styles.css                # Global CSS + Tailwind v4 theme tokens + custom utilities
├── index.html                    # HTML shell
├── vite.config.js                # Path aliases (@/ → src/) and Vite plugins
├── components.json               # shadcn/ui configuration
└── package.json
```

---

## Styling Guide

The project uses **Tailwind v4 + vanilla CSS**:

| Use case | Where to put it |
|---|---|
| Spacing, layout, flex/grid, colors | Tailwind utility classes inline |
| CSS custom properties (design tokens) | `src/styles.css` under `@theme` |
| Complex keyframe animations or selectors | `src/styles.css` under `@layer utilities` |
| New UI primitive | `src/components/ui/` — check if it already exists first |

**Never** hardcode pixel values when a Tailwind token exists. **Never** use `@apply` blocks.

> In Tailwind v4, write `aspect-4/5` instead of `aspect-[4/5]` for simple fraction ratios.

---

## Pages Overview

| Route | Page | Status | Description |
|---|---|---|---|
| `/` | `Home.jsx` | ✅ Live | Landing page — hero, countdown, events, FAQ |
| `/events` | `Events.jsx` | ✅ Live | Full catalog of summit events |
| `/event/:slug` | `EventDetails.jsx` | ✅ Live | Individual event detail view |
| `/schedule` | `Schedule.jsx` | ✅ Live | Day-by-day summit schedule |
| `/buy` | `Buy.jsx` | 🔜 Coming Soon | Pass purchase — grid commented out, coming soon shown |
| `/sponsors` | `Sponsors.jsx` | 🔜 Coming Soon | Sponsor showcase — coming soon placeholder |
| `/team` | `Team.jsx` | 🔜 Coming Soon | Team roster — grid commented out, coming soon shown |
| `/admin` | `AdminAuth.jsx` | ✅ Live | Protected admin login |
| `/admin/dashboard` | `AdminDashboard.jsx` | ✅ Live | Admin order/pass management |
| `*` | `NotFound.jsx` | ✅ Live | 404 fallback |

> Pages marked **🔜 Coming Soon** have their full implementation commented out and ready to activate — simply uncomment the relevant data, imports, and JSX sections inside the file.

---

## Reusable Components

### `PassCard.jsx`
Extracted pass tier card. Props: `pass`, `qty`, `totalQty`, `maxQty`, `onIncrement`, `onDecrement`.
Used by `Buy.jsx` (currently commented out). Activate by uncommenting the pass grid in `Buy.jsx`.

### `TeamMemberCard.jsx`
Team profile card featuring:
- Portrait photo with gradient overlay
- Team/event title, member name (LinkedIn link), role, and bio
- **Idle state**: stacked crew avatar POFs + count badge
- **Hover state**: animated crew list with names (LinkedIn links) and profile photos
- Contact lead button (→ `outreach.iic@iitdh.ac.in`)
- Inner crew list uses `data-lenis-prevent` to avoid scroll hijacking

---

## Contributing Guidelines

### DRY Principle — reuse before you write

| Instead of... | Use... |
|---|---|
| `localStorage.setItem(...)` manually | `useLocalStorage` from `src/hooks/` |
| Raw `<input>` / `<button>` HTML | Primitive from `src/components/ui/` |
| `window.location` navigation | `useTransitionNavigate` from `src/hooks/` |
| Copy-pasting a page header | `<PageHeader>` or `<SectionHeader>` from `src/components/ui/` |

### Adding new code

1. **New hook** → add to `src/hooks/`, document in `src/hooks/README.md`.
2. **New page** → add route in `App.jsx`, document in `src/pages/README.md`.
3. **New UI primitive** → add to `src/components/ui/`, document in its `README.md`.
4. **New shared component** → add to `src/components/`, document in its `README.md`.
5. **Major architectural decision** → write an ADR in `adr/`. See `adr/README.md` for the template.

---

## Branching & Git Workflow

```
main          ← production-ready, protected
 └── dev      ← integration branch
      ├── feature/12-stripe-integration
      ├── bugfix/44-layout-alignment
      └── fix/fixed-dead-code-and-documentation
```

**Branch naming:**

```bash
feature/<short-description>   # e.g. feature/pass-grid-activation
bugfix/<short-description>    # e.g. bugfix/modal-scroll
fix/<short-description>       # e.g. fix/fixed-dead-code
docs/<short-description>      # e.g. docs/update-adr
```

**Workflow:**

```bash
git checkout dev
git pull origin dev
git checkout -b feature/<description>

# ... make changes ...

npm run lint && npm run format
git add .
git commit -m "feat: short description of change"
git push origin feature/<description>
# → open a PR into dev
```

> See **[docs/README.md](./docs/README.md)** for Git troubleshooting (rebasing, conflicts, stashing).

---

## Contact

All event and team inquiries: **outreach.iic@iitdh.ac.in**

---

## Architectural Decisions (ADRs)

Significant design decisions are tracked in [`adr/`](./adr/).

See [`adr/README.md`](./adr/README.md) for the full catalog and template.