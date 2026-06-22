# Custom React Hooks (`src/hooks/`)

This directory contains custom React hooks used across the E-Summit 2026 application.

**Always check here before writing new state, storage, or navigation logic in a page/component.**

---

## Hooks

### `useDocumentTitle(title: string)`
Sets the browser tab title dynamically. Call it at the top of every page component.

```jsx
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function MyPage() {
  useDocumentTitle("My Page — E-Summit 2026");
  // ...
}
```

---

### `useLocalStorage(key: string, initialValue: any)`
Syncs a React state variable with `localStorage`. Returns `[value, setValue]` — identical API to `useState`.

```jsx
import { useLocalStorage } from "@/hooks/useLocalStorage";

const [cart, setCart] = useLocalStorage("es26_cart", []);
```

---

### `useTransitionNavigate()`
Returns a `navigate(path)` function that first triggers the GSAP page-exit transition, then redirects. Use this instead of `useNavigate()` directly whenever you need programmatic navigation with animation.

```jsx
import { useTransitionNavigate } from "@/hooks/useTransitionNavigate";

const navigate = useTransitionNavigate();
navigate("/events");
```

---

### `use-mobile.jsx`
Responsive mobile viewport detection. Returns `isMobile: boolean`.

```jsx
import { useMobile } from "@/hooks/use-mobile";

const isMobile = useMobile(); // true when viewport < 768px
```

---

## Adding a New Hook

1. Create `src/hooks/useYourHook.js` (or `.jsx` if it returns JSX).
2. Export a named function.
3. Document it in this README with a description and usage example.
