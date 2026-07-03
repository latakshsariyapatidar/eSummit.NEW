# Admin Feature Readme

## Feature

The admin feature lives under `/admin`. It has a key-based login route and a dashboard route.

Routes:

- `/admin`
- `/admin/malikKiKursi`

## Entry Points

`src/pages/Admin/AdminLayout.jsx`

`src/pages/Admin/AdminAuth.jsx`

`src/pages/Admin/AdminDashboard.jsx`

Route setup in `src/App.jsx`:

```jsx
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminAuth />} />
  <Route path="malikKiKursi" element={<AdminDashboard />} />
</Route>
```

## Auth Flow

1. `AdminLayout` wraps admin routes.
2. It checks `sessionStorage` for `_admin_auth_checked`.
3. Login page is allowed.
4. Protected routes require `auth_token` and `auth_role`.
5. Missing auth redirects to `/admin`.
6. Leaving admin through `useTransitionNavigate` clears `_admin_auth_checked`.

## Login Flow

1. `AdminAuth` renders a password input.
2. Submit posts `{ key }` to `${API_BASE}/auth/verify-key`.
3. `API_BASE` comes from `import.meta.env.VITE_API_BASE` or falls back to `https://iic.iitdh.ac.in/esummit/api/api`.
4. Response statuses 400, 401, 429, and other errors show specific messages.
5. Success stores `auth_token`, `auth_role`, and `admin_key` in `sessionStorage`.
6. If role is `admin`, user navigates to `malikKiKursi`.
7. If role is `volunteer`, code tries to navigate to `/volunteer/dashboard`, but that route is not currently declared.

## Dashboard Flow

1. `AdminDashboard` checks for `auth_token`; missing token redirects to `/admin`.
2. Orders are loaded from localStorage key `es26_orders` through `useLocalStorage`.
3. Stats are calculated locally from order statuses.
4. Tabs support `orders` and `scan` in the visible tab bar.
5. There is also a `passes` panel function, but the visible tab list does not include `passes`.
6. Logout clears `sessionStorage` and navigates to `/admin`.

## Modules Used

| Module | Imported from | Used for |
| --- | --- | --- |
| `Outlet`, `useNavigate`, `useLocation` | `react-router-dom` | Admin nested routing and redirects. |
| `useTransitionNavigate` | `@/hooks/useTransitionNavigate` | Animated navigation in auth/dashboard. |
| `PageHeader` | `@/components/ui/PageHeader` | Headings. |
| `Input` | `@/components/ui/Input` | Admin key and scan input. |
| `Button` | `@/components/ui/Button` | Actions. |
| `useDocumentTitle` | `@/hooks/useDocumentTitle` | Browser title. |
| `useLocalStorage` | `@/hooks/useLocalStorage` | Demo order storage and pass config. |
| `PASSES` | `@/lib/store` | Pass configuration panel. |
| `toast` | `sonner` | Duplicate scan feedback. |

## Storage Keys

| Key | Storage | Purpose |
| --- | --- | --- |
| `_admin_auth_checked` | `sessionStorage` | Prevent repeated auth checks in `AdminLayout`. |
| `auth_token` | `sessionStorage` | Auth token from backend. |
| `auth_role` | `sessionStorage` | User role from backend. |
| `admin_key` | `sessionStorage` | Entered key. |
| `es26_orders` | `localStorage` | Demo/local admin orders. |
| `admin_passes` | `localStorage` | Demo/local pass sold-out config. |

## Files to Edit

- Change admin routes: `src/App.jsx`.
- Change auth guard: `src/pages/Admin/AdminLayout.jsx`.
- Change login API: `src/pages/Admin/AdminAuth.jsx`.
- Change dashboard: `src/pages/Admin/AdminDashboard.jsx`.
- Make orders real backend data: update `AdminDashboard.jsx` and write an ADR.
