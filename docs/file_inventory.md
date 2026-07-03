# File Inventory

This inventory explains what each tracked source/config/doc file is for.

## Root

| File | Purpose |
| --- | --- |
| `.env.example` | Documents expected env shape. Contains `VITE_ADMIN_KEY`, though current admin auth also reads `VITE_API_BASE`. |
| `.gitignore` | Excludes dependencies, builds, env files, and editor files. |
| `components.json` | shadcn/ui configuration and aliases. |
| `eslint.config.js` | ESLint flat config with React Hooks, React Refresh, and Prettier integration. |
| `index.html` | HTML shell, fonts, favicon, metadata, and root div. |
| `jsconfig.json` | Enables `@/*` path alias in editors. |
| `package.json` | Scripts and dependencies. |
| `package-lock.json` | Locked npm dependency graph. |
| `README.md` | Main beginner entry point. |
| `vite.config.js` | Vite plugins, `/esummit/` base, and `@` alias. |

## GitHub

| File | Purpose |
| --- | --- |
| `.github/workflows/deploy.yml` | Builds and deploys `main` to the VPS path `/var/www/iic/esummit`. |

## Public Assets

| File | Purpose |
| --- | --- |
| `public/favicon.ico` | Browser tab icon. |
| `public/logo.png` | Nav logo, footer logo, and ASCII art source. |
| `public/esummit_text.svg` | Desktop footer logo text. |
| `public/HeroImage.svg` | Hero headline artwork. |
| `public/track.avif` | Home CTA background. |
| `public/notFound.svg` | 404 page image. |
| `public/car_start.mp3` | Loader engine sound. |
| `public/loader_assets/Car_loading.gif` | Loader progress GIF. |
| `public/loader_assets/Car_loading_done.gif` | Loader exit GIF. |
| `public/events_assets/*.avif` | Event menu hover images; file names match event slugs. |

## App Entry

| File | Purpose |
| --- | --- |
| `src/main.jsx` | Mounts React app and imports global CSS. |
| `src/App.jsx` | Declares lazy routes, global page transition overlay, cursor, layout, and suspense fallback. |
| `src/styles.css` | Tailwind v4 setup, theme tokens, base styles, utilities, keyframes, scroll helpers. |

## Library and Hooks

| File | Purpose |
| --- | --- |
| `src/lib/store.js` | Fallback data, API fetch helpers, content hooks, cart helpers. |
| `src/lib/utils.js` | `cn()` helper using `clsx` and `tailwind-merge`. |
| `src/hooks/useDocumentTitle.js` | Sets `document.title` from route pages. |
| `src/hooks/useIsMobile.js` | Tracks viewport under 768px. |
| `src/hooks/useLocalStorage.js` | React state synchronized to `localStorage`. |
| `src/hooks/useTransitionNavigate.js` | GSAP route transition navigation wrapper. |
| `src/hooks/README.md` | Hook directory documentation. |

## Pages

| File | Purpose |
| --- | --- |
| `src/pages/Home/Home.jsx` | Home route composition and lazy section loading. |
| `src/pages/Event/Events.jsx` | All-events catalog page using `FlowingMenu`. |
| `src/pages/Event/EventDetails.jsx` | Event details from `:slug`. |
| `src/pages/EventsSchedule/Schedule.jsx` | Schedule route shell and coming-soon display. |
| `src/pages/PassBuy/Buy.jsx` | Pass selection, attendee details, order submit, payment, and success state. |
| `src/pages/Sponsors/Sponsors.jsx` | Sponsor page with grouped tiers or coming-soon state. |
| `src/pages/Team/Team.jsx` | Team page split into functional leads and event directors. |
| `src/pages/Admin/AdminLayout.jsx` | Admin route guard wrapper. |
| `src/pages/Admin/AdminAuth.jsx` | Admin key login form. |
| `src/pages/Admin/AdminDashboard.jsx` | Admin stats, local orders, pass config panel, QR demo check-in. |
| `src/pages/404/NotFound.jsx` | Catch-all route. |

## Shared Components

| File | Purpose |
| --- | --- |
| `src/components/Shared/Layout.jsx` | Global layout shell. |
| `src/components/Shared/Nav.jsx` | Responsive navigation and buy CTA. |
| `src/components/Shared/Footer.jsx` | Responsive footer with links, contact, and parallax. |
| `src/components/Shared/SmoothScroll.jsx` | Locomotive Scroll initialization per route. |
| `src/components/Shared/LazySection.jsx` | Intersection-triggered lazy rendering for home sections. |

## UI Components

| File | Purpose |
| --- | --- |
| `src/components/ui/Button.jsx` | Reusable themed button. |
| `src/components/ui/Input.jsx` | Reusable themed input. |
| `src/components/ui/Field.jsx` | Label plus field wrapper. |
| `src/components/ui/Modal.jsx` | Modal shell with escape close and scroll containment. |
| `src/components/ui/PageHeader.jsx` | Route-level title block. |
| `src/components/ui/PageTransitionOverlay.jsx` | Full-screen overlay used by transition navigation. |
| `src/components/ui/SectionHeader.jsx` | Section-level title block. |
| `src/components/ui/Select.jsx` | Reusable themed select. |
| `src/components/ui/TransitionLink.jsx` | Internal anchor using transition navigation. |

## Feature Components

| File | Purpose |
| --- | --- |
| `src/components/home/Hero.jsx` | Hero section with Hyperspeed, CTA links, countdown. |
| `src/components/home/Marquee.jsx` | Text strip under hero. |
| `src/components/home/AboutSection.jsx` | About/stat section with ASCII logo. |
| `src/components/home/EventsMarquee.jsx` | Home event conveyor. |
| `src/components/home/CTA.jsx` | Track background CTA to buy. |
| `src/components/home/FAQSection.jsx` | Accordion FAQ section. |
| `src/components/Countdown/Countdown.jsx` | Countdown based on `TARGET_DATE`. |
| `src/components/Loader/Loader.jsx` | First-visit loader with sound and session flag. |
| `src/components/SkeletonLoader/SkeletonLoader.jsx` | Suspense fallback skeleton. |
| `src/components/ComingSoon/ComingSoonCard.jsx` | Generic empty-state/coming-soon card. |
| `src/components/Passes/PassCard.jsx` | Pass/ticket card with quantity controls. |
| `src/components/OrderPurchaseComponents/AttendeeDetailsForm.jsx` | Checkout attendee form. |
| `src/components/OrderPurchaseComponents/PaymentGatewayModal.jsx` | QR payment and UTR submission form. |
| `src/components/OrderPurchaseComponents/OrderSuccessScreen.jsx` | Checkout success message. |
| `src/components/Sponsors/SponsorHelpers.jsx` | Sponsor tier config, grouping, and grid section rendering. |
| `src/components/Sponsors/SponsorCard.jsx` | Sponsor card hover UI. |
| `src/components/Team/TeamMemberCard.jsx` | Team lead and crew card. |

## Custom Visual Components

| File | Purpose |
| --- | --- |
| `src/components/CustomPremade/Hyperspeed.jsx` | Three.js animated road background. |
| `src/components/CustomPremade/FlowingMenu.jsx` | GSAP event menu with hover marquee/image strip. |
| `src/components/CustomPremade/ascii-art.tsx` | Canvas ASCII image renderer. |
| `src/components/CustomPremade/smooth-cursor.tsx` | Desktop-only animated custom cursor after loader completes. |
