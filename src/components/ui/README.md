# UI Components (`src/components/ui/`)

Atomic, reusable presentational UI elements designed specifically for the E-Summit 2026 application.

**Always check here before writing a new `<button>`, `<input>`, or `<a>` tag directly.**

---

## Primitives

| File | Component | Props / Usage |
|---|---|---|
| `Button.jsx` | `<Button>` | `variant` (`primary`, `secondary`, `outline`, `signal`), `size` (`sm`, `md`, `lg`), `onClick`, `className`, `children` |
| `Input.jsx` | `<Input>` | Standard HTML input attributes forwarded. Dark monospaced theme. |
| `Select.jsx` | `<Select>` | Standard HTML select attributes forwarded. Stylized dropdown. |
| `Field.jsx` | `<Field>` | `label`, `children` — labeled wrapper container for inputs/selects |
| `Modal.jsx` | `<Modal>` | `onClose`, `children` — overlay dialog with escape-key support, fade-in animation, and scroll lock |
| `PageHeader.jsx` | `<PageHeader>` | `tag` (monospaced label), `title` (React node), `className` — top-of-page banner |
| `SectionHeader.jsx` | `<SectionHeader>` | `tag`, `title`, `description`, `layout` (`default` \| `split`) — interior section title |
| `TransitionLink.jsx` | `<TransitionLink>` | `to`, `onClick`, `className`, `children` — wraps navigation with GSAP page transition |

---

## Usage Examples

```jsx
// Button
<Button variant="primary" size="lg" onClick={handleClick}>
  Reserve Spot →
</Button>

// PageHeader
<PageHeader tag="Pit Lane" title="Choose your seat." />

// SectionHeader with split layout
<SectionHeader
  tag="/ 02 — The Brief"
  title={<>Built for <span className="text-primary">innovation.</span></>}
  description="Hosted at IIT Dharwad..."
  layout="split"
/>

// TransitionLink (use instead of <Link> from react-router)
<TransitionLink to="/events" className="hover:text-primary">
  View Events
</TransitionLink>

// Modal
<Modal onClose={() => setOpen(false)}>
  <p>Modal content here</p>
</Modal>
```

---

## Adding a New Primitive

1. Create the file in this directory.
2. Use a named export (no default exports).
3. Follow existing class naming conventions (Tailwind v4, `font-mono`, `font-display`).
4. Document it in this README table.
