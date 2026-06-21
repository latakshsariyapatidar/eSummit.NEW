# E-Summit 2026 — Shift Gears

> The official web portal for **E-Summit 2026**, IIT Dharwad's flagship entrepreneurship summit redefining the future of mobility, electric vehicles, and autonomous transport.

The platform lets attendees **browse events**, **purchase passes**, and **get event info** — all wrapped in a high-performance React app with GSAP-powered page transitions and a motorsport-inspired visual theme.

---

## Tech Stack

| Layer         | Library / Tool                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Core          | [React 19](https://react.dev/) & [Vite 7](https://vite.dev/)                                                              |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/) + `src/styles.css` (custom vars)                                              |
| Routing       | [React Router DOM v6](https://reactrouter.com/)                                                                           |
| Animations    | [GSAP 3](https://gsap.com/) — ScrollTrigger, Timeline, page transitions                                                   |
| Smooth Scroll | [Locomotive Scroll v5](https://locomotivemtl.github.io/locomotive-scroll/) + [Lenis](https://lenis.darkroom.engineering/) |
| Server State  | [TanStack React Query v5](https://tanstack.com/query/latest)                                                              |
| Client State  | `localStorage` (via custom hooks — see `src/hooks/`)                                                                      |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)                                               |
| Forms         | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)                                                 |
| Icons         | [Lucide React](https://lucide.dev/)                                                                                       |

---

## Prerequisites

Make sure you have these installed before cloning:

- **Node.js** v20 or higher
- **npm** v10 or higher (comes with Node 20)

Verify with:

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

# 3. Start the dev server
npm run dev
```

The app will be live at `http://localhost:5173`.

### All available scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start local dev server with HMR      |
| `npm run build`   | Production bundle into `dist/`       |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint across the codebase       |
| `npm run format`  | Auto-format with Prettier            |

> **Before every commit:** run `npm run lint && npm run format` to keep the codebase clean.

---

## Project Structure

```text
eSummit.NEW/
├── adr/                        # Architectural Decision Records
│   ├── README.md               # How to write and categorize ADRs
│   └── 0001-*.md               # ADR 0001: DRY Refactoring & Custom Hooks
├── docs/                       # Developer documentation
│   └── README.md               # Git commands, rebase, conflict resolution, stashing
├── src/
│   ├── assets/                 # Static images (dials, hero cars, track textures)
│   │   └── README.md
│   ├── components/             # Shared layout components & modals
│   │   ├── ui/                 # Atomic UI primitives (Button, Input, Dialog, etc.)
│   │   │   └── README.md       # Lists all available primitives — check here first
│   │   ├── Nav.jsx             # Global top navigation bar
│   │   ├── Footer.jsx          # Site footer
│   │   ├── CheckoutModal.jsx   # Ticket purchase & booking modal
│   │   └── README.md
│   ├── hooks/                  # Custom React hooks
│   │   └── README.md           # Lists every hook with usage examples — read before writing new state logic
│   ├── lib/                    # Data, utilities, and animation controllers
│   │   ├── store.js            # Static data: events catalog, pricing tiers, FAQ content
│   │   ├── transition.js       # GSAP page-transition timeline (used in App.jsx)
│   │   └── README.md
│   ├── pages/                  # Top-level route components
│   │   ├── Home.jsx            # Landing page with hero & event highlights
│   │   ├── Events.jsx          # Full event catalog grid
│   │   ├── Buy.jsx             # Pass selection & checkout flow
│   │   └── README.md
│   ├── App.jsx                 # Route definitions & top-level providers
│   ├── main.jsx                # React DOM mount point
│   └── styles.css              # Global CSS + Tailwind v4 theme variable definitions
├── index.html                  # HTML shell (loads Outfit font from Google Fonts)
├── vite.config.js              # Path aliases (@/ → src/) and Vite plugins
├── components.json             # shadcn/ui configuration
└── package.json
```

---

## Styling Guide

The project uses **both Tailwind v4 and vanilla CSS** — here's what goes where:

| Use case                                                     | Where to put it                                           |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| Spacing, layout, flex/grid, colors from the design system    | Tailwind utility classes inline                           |
| CSS custom properties (design tokens, fonts, animation vars) | `src/styles.css`                                          |
| One-off keyframe animations or complex selectors             | `src/styles.css`                                          |
| New UI primitive (button, badge, input…)                     | `src/components/ui/` — check if it exists in shadcn first |

**Never** add `@apply` blocks or hardcode pixel values when a Tailwind token exists.

---

## Contributing Guidelines

### DRY Principle — reuse before you write

Before writing new logic, check what already exists:

| Instead of...                        | Use...                                         |
| ------------------------------------ | ---------------------------------------------- |
| `localStorage.setItem(...)` manually | Custom hook from `src/hooks/` (see its README) |
| Inline `<input>` or `<button>` HTML  | Primitive from `src/components/ui/`            |
| Raw `window.location` navigation     | Navigation hook from `src/hooks/`              |
| Copy-pasting a page banner/header    | Shared component from `src/components/`        |

### Adding new code

1. **New hook** → add it to `src/hooks/`, document it in `src/hooks/README.md`.
2. **New page** → add the route in `App.jsx`, document the page in `src/pages/README.md`.
3. **New UI primitive** → add to `src/components/ui/`, document in its `README.md`.
4. **Major architectural decision** → write an ADR. See `adr/README.md` for the template.

---

## Branching & Git Workflow

We use a `main → dev → feature` branch model.

```
main          ← production-ready, protected
 └── dev      ← integration branch
      ├── feature/12-stripe-integration
      └── bugfix/44-layout-alignment
```

**Branch naming:**

```bash
feature/<issue-id>-<short-description>   # e.g. feature/12-stripe-integration
bugfix/<issue-id>-<short-description>    # e.g. bugfix/44-layout-alignment
```

**Workflow:**

```bash
git checkout dev
git pull origin dev
git checkout -b feature/<issue-id>-<description>

# ... make changes ...

npm run lint && npm run format
git add .
git commit -m "feat: short description of change"
git push origin feature/<issue-id>-<description>
# → open a PR into dev
```

> Stuck with rebasing, merge conflicts, or stashing? See **[docs/README.md](./docs/README.md)** for step-by-step commands.

---

## Architectural Decisions (ADRs)

Significant design decisions are tracked in the [`adr/`](./adr/) folder.

**Write an ADR when you:**

- Introduce a new dependency
- Change the state management approach
- Modify the styling paradigm
- Propose a major architectural refactor

See [`adr/README.md`](./adr/README.md) for the ADR template.

---

## Pages Overview

| Route     | Page         | Description                                    |
| --------- | ------------ | ---------------------------------------------- |
| `/`       | `Home.jsx`   | Landing page — hero section, summit highlights |
| `/events` | `Events.jsx` | Full catalog of summit events                  |
| `/buy`    | `Buy.jsx`    | Pass selection and ticket checkout             |
