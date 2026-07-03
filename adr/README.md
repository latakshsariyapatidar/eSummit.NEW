# Architecture Decision Records

This folder records decisions that future contributors should know before changing the project.

## ADR Format

Each ADR uses:

- Status
- Context
- Decision
- Consequences
- Notes for future changes

## Index

| ADR | Decision |
| --- | --- |
| [0001](./0001-use-vite-react-spa.md) | Use Vite and React SPA architecture. |
| [0002](./0002-deploy-under-esummit-base-path.md) | Deploy and route under `/esummit/`. |
| [0003](./0003-centralize-content-in-store.md) | Centralize fallback content and fetch hooks in `src/lib/store.js`. |
| [0004](./0004-use-tailwind-v4-css-tokens.md) | Use Tailwind v4 with CSS custom property tokens. |
| [0005](./0005-use-transition-link-for-internal-navigation.md) | Use `TransitionLink` for animated internal navigation. |
| [0006](./0006-keep-route-pages-thin.md) | Keep route pages as orchestration layers and move reusable UI to components. |
| [0007](./0007-use-browser-storage-for-lightweight-client-state.md) | Use browser storage for cart, loader, and current admin demo state. |
| [0008](./0008-keep-heavy-visuals-isolated.md) | Keep Three.js/GSAP/Motion-heavy visuals isolated in dedicated components. |
| [0009](./0009-checkout-upi-utr-flow.md) | Use submit-order plus UPI QR plus UTR declaration for checkout. |
| [0010](./0010-admin-session-storage-guard.md) | Use sessionStorage-based admin guard around admin routes. |
| [0011](./0011-main-branch-deploys-to-vps.md) | Deploy only from `main` through self-hosted GitHub Actions. |
| [0012](./0012-documentation-as-kt-contract.md) | Treat README, feature docs, and ADRs as the KT contract. |
