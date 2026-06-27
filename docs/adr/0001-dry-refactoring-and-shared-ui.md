# ADR 0001: DRY Refactoring & Shared UI Components

- **Status**: Accepted
- **Date**: 2026-06-19
- **Authors**: Lataksh Sariya

## Context

Prior to this refactoring, the E-Summit 2026 codebase had several instances of duplicated layouts and logic across page components:

1. Dynamic page titles (`document.title`) were set inside local `useEffect` blocks.
2. Route transitions were implemented via local `go` functions and manual click events.
3. Form controls (`input`, `select`, labeled boxes) and overlays (`modal`) were styled inline using duplicate CSS and Tailwind classes.
4. Storage read/write updates (such as cart updates and order validation) required manual localStorage parse and stringify actions within each component.

This repetition reduced code readability, increased the risk of styling drift, and made codebase maintenance difficult.

## Decision

We resolved to apply the **DRY (Don't Repeat Yourself)** principle by creating:

1. **Custom hooks (`src/hooks/`)**:
   - `useDocumentTitle`: To manage browser tab titles.
   - `useLocalStorage`: To sync local state variables with browser storage.
   - `useTransitionNavigate`: To perform programmatic route transitions.
2. **Atomic UI components (`src/components/ui/`)**:
   - `<Button>`: Customized E-Summit branded buttons.
   - `<TransitionLink>`: Unified link wrapper wrapping programmatic GSAP route transitions.
   - `<Input>` / `<Select>` / `<Field>`: Branded form element controls.
   - `<Modal>`: Custom, animated overlay dialog box container with keyboard listeners.
   - `<PageHeader>` / `<SectionHeader>`: Layout elements standardizing tags and titles.

## Consequences

- **Benefits**:
  - **Maintainability**: Changing a form input style, button behavior, or modal animation is done in one single file.
  - **Readability**: Page components are now compact, focusing solely on business logic and routing.
  - **Code Quality**: Zero styling drifts between components; forms and modals animate consistently.
- **Trade-offs**:
  - Developers must import atomic UI components rather than writing standard HTML tags with arbitrary classes.
