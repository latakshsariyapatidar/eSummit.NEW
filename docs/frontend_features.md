# E-Summit Frontend Features — Complete Reference

> This document catalogs **every frontend feature, component, and behavior** from the E-Summit'25 website. Use this as a definitive checklist when building the new year's frontend.

---

## 1. Tech Stack & Dependencies

| Category      | Technology                                                 | Purpose                                  |
| ------------- | ---------------------------------------------------------- | ---------------------------------------- |
| Framework     | React 19 + Vite 7                                          | SPA core + build tool                    |
| Routing       | React Router DOM v7                                        | Client-side routing with `BrowserRouter` |
| Styling       | Tailwind CSS v4 + DaisyUI v5                               | Utility-first CSS + component library    |
| Animations    | Framer Motion v12, GSAP v3                                 | Declarative + imperative animations      |
| Smooth Scroll | Locomotive Scroll v5 beta                                  | Smooth scrolling on pages                |
| Canvas/3D     | Three.js v0.178 (imported but may be unused), HTML5 Canvas | Interactive background effects           |
| Icons         | Remix Icon (React)                                         | UI icons across the site                 |
| HTTP          | Axios v1                                                   | API requests (orders, admin, attendance) |
| QR Scanning   | @zxing/library v0.21                                       | QR code scanning for attendance          |
| Timeline      | react-vertical-timeline-component v3                       | Schedule timeline display                |
| Transitions   | react-transition-group v4, @barba/core + @barba/css        | Page transition animations (legacy)      |
| Fonts         | Google Fonts: Inter, Parkinsans, Open Sans                 | Typography                               |

---

## 2. Routing & Page Structure

### Routes (from `App.jsx`)

| Route               | Component        | Description                      |
| ------------------- | ---------------- | -------------------------------- |
| `/`                 | `Home`           | Landing page with all sections   |
| `/event/:eventName` | `EventPage`      | Dynamic event detail pages       |
| `/buy`              | `BuyHome`        | Pass/merchandise purchasing page |
| `/admin`            | `AdminAuth`      | Admin login page                 |
| `/admin/dashboard`  | `AdminDashboard` | Admin management panel           |

### Base Path

- App uses `basename='/esummit/'` on `BrowserRouter` — all routes are relative to `/esummit/`.

---

## 3. Home Page Sections (Top to Bottom)

### 3.1 Header (Sticky Navigation)

**File**: `Header.jsx`

- **Fixed position** with semi-transparent background + `backdrop-filter: blur(8px)`
- **Responsive logo**: Swaps between full logo (desktop `≥768px`) and icon-only logo (mobile `<768px`) on window resize
- **Desktop Navigation** (`≥1280px`): Horizontal nav links — Home, Events, Schedule, Sponsors, FAQs, Contact Us (all scroll-to-section links)
- **Right-side buttons** (visible `≥768px`):
  - "Buy Tickets" — gradient button (yellow → orange), links to `/buy`
  - "IIC" — links externally to `https://iic.iitdh.ac.in/`, includes IIC logo image
- **Mobile hamburger menu** (`<1280px`): Opens a **right-side drawer** (full height, 320px width, slide-in animation)
  - Drawer has: close button, nav links (scroll-to-section), "Buy Tickets" button, "IIC" external link
- **Scroll-to-section behavior**: If on event page, navigates to home first (`window.location.href`), otherwise smooth scrolls to section ID
- **z-index**: 100

### 3.2 Hero Section

**File**: `Hero.jsx`

- **Interactive Canvas Background** (desktop only `≥1024px`): Full-screen canvas overlay with:
  - 100-500 randomly positioned dots with subtle pulsing animations
  - Mouse-following cursor with glowing golden effect (radial gradient)
  - **Tentacle effect**: Wavy bezier-curve lines connecting cursor to nearby dots (within 180px radius)
  - Tentacles have golden gradient colors with 8 color variations (gold, amber shades)
  - Smooth lerped mouse following with easing functions
  - Fade out when mouse leaves the hero area (lerps to center + opacity fade)
  - Dynamic cursor size based on mouse speed
- **Framer Motion** entrance animation: fade in + slide up on view
- **Logo image**: Responsive sizing (5/6 → 4/5 → 3/4 → 3/5 → 1/2 width)
- **"Powered by" section** (commented out): Sponsor logos (JetBrains, Sticker Mule, Balsamiq) with inverted filter
- **Countdown Timers** (commented out): Two timers — purchase deadline (48h) and event countdown (Aug 23, 2025)
- **"About the Event" CTA button**: Smooth scrolls to About section

### 3.3 About Section

**File**: `About.jsx`

- Section ID: `about`
- Full-screen centered layout
- Title: "About the Event" (Open Sans, tracking-tighter)
- Two paragraphs of event description text (justified alignment)
- "When" sub-section: Shows event dates (23rd-24th August)

### 3.4 Events Section

**File**: `Events.jsx`

- Section ID: `events`
- **Data source**: Fetches from `/eventDetails/events.json` via `fetch()`
- **Live Status Indicator**: Real-time check if event is currently happening:
  - Hardcoded schedule mapping for each event (day, time, duration in minutes)
  - Compares against current system time
  - Shows red pulsing "LIVE" badge with blinking dot
  - Auto-refreshes every 60 seconds
- **Event cards**: Responsive flex-wrap grid with:
  - Event name (bold), description text
  - "Learn More" button with arrow icon
  - Card hover: `scale(1.05)` transform
- **Page transitions**: "Learn More" triggers animated page transition to `/event/{slug}`:
  - Slug generated from event name: `toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')`
  - Uses `triggerTransition()` from context

### 3.5 Schedule Section

**File**: `Schedule.jsx`

- Section ID: `schedule`
- **Data source**: Fetches from `/eventDetails/schedule.json`
- **Day selector**: Toggle between Day 1 and Day 2 (pill-style button group)
- **Special note banner**: Yellow info box about institute bus timings
- **Vertical Timeline**: Uses `react-vertical-timeline-component`:
  - Each event shows: title, time (as date label), venue, description, event type badge
  - Icons: Emoji-based (🎯 general, 🏆 competition, 🎤 talk, 🛠️ workshop, 🍽️ break, 🏅 ceremony)
  - All event types use `#FFC300` (gold) color
  - Dark theme styling: `#2A2A2A` content background, `#444444` borders

### 3.6 Sponsors Section

**File**: `Sponsor.jsx`

- Section ID: `sponsor`
- **Data**: Hardcoded sponsor array (some commented out):
  - Bronze Sponsors: Convergent Technologies, Fluke Corporation (local images)
  - Platform Partner: External URL image
- **Layout**: Full-width cards, one per row, with sponsor tier name + logo
- **Framer Motion**: Slide-in animations (alternating left/right), hover scale effect

### 3.7 FAQ Section

**File**: `Faq.jsx`

- Section ID: `faq`
- **Accordion pattern**: Only one item open at a time (toggle behavior)
- **Hardcoded Q&A data** (3 items):
  1. "What is E-summit?" — Description of the event
  2. "Who all can be a part?" — Working professionals and students
  3. "What are the advantages?" — Gift cards and certificates
- **Visual behavior**:
  - Closed: `bg-secondary-text`, `border-neutral-700`
  - Open: `bg-soft-background`, `border-neutral-600`
  - Plus/minus icon toggle with 500ms transition
  - Content uses `max-h` animation for smooth expand/collapse

### 3.8 Footer

**File**: `Footer.jsx`

- Section ID: `contact`
- **DaisyUI footer component** (dark neutral theme)
- Three columns:
  1. **Logo + description**: E-Summit 2025 by IIC, IIT Dharwad
  2. **Important Links**: Home (scroll), Events (scroll), IIT Dharwad (external)
  3. **Contact Us**: Address (IIT Dharwad, Dharwad), Email (outreach.iic@iitdh.ac.in)
- **Copyright footer**: Dynamic year via `new Date().getFullYear()`

---

## 4. Event Detail Page

**File**: `EventPage.jsx`

- **Dynamic route**: `/event/:eventName`
- **Data fetching**: Loads events.json, matches by slugified event name
- **Locomotive Scroll**: Smooth scrolling enabled
- **Sections**:
  1. **Hero**: Full-screen centered event name (huge text) + description
  2. **About Event**: Large description + registration buttons:
     - "Register Now (General)" — opens external register_link
     - "IIT Dharwad Exclusive" — yellow button, only if `has_iit_dharwad_exclusive` is true
     - Fallback: "Registration details coming soon!" with disabled button
  3. **FAQ**: 4 hardcoded generic FAQ cards (who can participate, what to bring, registration fee, prizes)
  4. **Footer**
- **Loading state**: Centered "Loading event..." text
- **Error/not-found state**: "Event not found" with "Back to Home" button

---

## 5. Buy Page (E-commerce System)

### 5.1 BuyHome (Main Container)

**File**: `BuyHome.jsx`

- **Cart state**: Persisted in `localStorage` key `esummit-cart`
- **Responsive layout**:
  - Mobile: Single scrollable column (PassList → Checkout)
  - Desktop (`≥1024px`): Side-by-side (70% PassList | 30% Checkout)
- **Cart logic**:
  - Max 5 passes per order (DoS protection)
  - Add/remove/update quantity
  - Clear cart function
  - Total price calculation
- **Modals**:
  - CheckoutModal — payment flow
  - OrderStatusModal — order lookup
  - OrderSuccessModal — confirmation display

### 5.2 PassList (Available Passes)

**File**: `PassList.jsx`

- **Pass types** (hardcoded, some commented out):
  1. 1 Day Visitor Pass — ₹100
  2. 2 Days Visitor Pass — ₹200
  3. Stay Pass - Basic — ₹699 (commented out)
  4. Stay Pass - Premium — ₹999 (commented out)
- **Admin availability sync**: Reads `esummit_pass_availability` from localStorage every 5 seconds + on storage events
- **Pass card design**: Ticket-style with:
  - Background event image with gradient overlay
  - Event pass label, name, description
  - "SOLD OUT" overlay (rotated red banner) when unavailable
  - QR code placeholder (rickroll QR — easter egg)
  - Add to Cart button + price display
  - Framer Motion hover animations (lift + shadow)
- **Contact info section**: Email + phone for support queries

### 5.3 Checkout Sidebar

**File**: `Checkout.jsx`

- Cart item list with quantity controls (+/−) and delete button
- Total price summary
- "Proceed to Checkout" button (opens CheckoutModal)
- Empty cart state display

### 5.4 CheckoutModal (Payment Flow)

**File**: `CheckoutModal.jsx`

- **Multi-step form**:
  1. **Payment amount display** (yellow banner)
  2. **Personal information**: Full Name, Email (with warning about email importance), Phone, Gender (Male/Female)
  3. **Per-pass attendee details** (if buying passes):
     - Each pass requires: Attendee Name, Email, Gender, College
     - Pass ID auto-generated from attendee email + phone + timestamp
     - Max 5 passes per order validation
  4. **Payment section**:
     - QR code image for UPI payment
     - UPI banking details (name: Yash Halbhavi, UPI ID displayed)
     - Screenshot upload (file input → base64 conversion)
     - UTR (Unique Transaction Reference) text input
  5. **Declaration checkbox**: Confirms info accuracy
  6. **Submit/Cancel buttons**
- **API call**: `POST https://iic.iitdh.ac.in/api/order/submit`
  - Payload: phone, email, gender, order_type ("pass"/"merch"), items array, payment_utr, payment_screenshot (base64), pass_details array
  - 30-second timeout
  - Expects 201 status + `status: 'success'`

### 5.5 OrderStatusModal (Order Lookup)

**File**: `OrderStatusModal.jsx`

- **Phone-based order lookup**: Enter 10-digit phone number
- **API call**: `GET https://iic.iitdh.ac.in/api/order/status?phone={phone}`
- **Order display**: Cards showing:
  - Order ID, status (with colored icon/badge), order type, UTR
  - Created/updated dates
  - Item list as yellow pills/tags
  - Status colors: green (verified), yellow (pending), red (rejected)

### 5.6 OrderSuccessModal

**File**: `OrderSuccessModal.jsx`

- Green checkmark icon + "Thank you" message
- Order ID display
- "Awaiting verification" info
- "Check Your Email" notification
- Next steps list: verification (24-48h), email confirmation, ready for event

### 5.7 TopBar

**File**: `TopBar.jsx`

- Home link (back arrow), page title "E-Summit '25"
- "Check Order Status" button (opens OrderStatusModal)

---

## 6. Page Transition System

### 6.1 TransitionContext

**File**: `TransitionContext.jsx`

- **Global state**: `isTransitioning` (boolean), `transitionData` (object with eventName)
- **`triggerTransition(targetPath, eventName)`**:
  - Prevents concurrent transitions
  - At 800ms: navigates to target path
  - At 1800ms: clears transition state
  - Total animation: 1.8 seconds

### 6.2 TransitionOverlay

**File**: `TransitionOverlay.jsx`

- Full-screen fixed overlay (`z-index: 10000`)
- **Animation layers**:
  1. **Black background fade**: `fadeBlackInOut` 1.8s animation
  2. **Flying div**: Gradient banner (120% width) with event name, diagonal clip-path, `slideAcross` animation
  3. **Accent line**: Thin white line below main div, `slideAccent` animation (0.1s delay)
  4. **Gradient overlay**: Subtle background depth effect
  5. **Animated dots**: 5 dots moving across screen with staggered timing (`dotMove` animation)

### 6.3 useTransition Hook

**File**: `useTransition.js`

- Simple context consumer hook
- Throws error if used outside TransitionProvider

---

## 7. Admin Dashboard

### 7.1 AdminAuth (Login)

**File**: `AdminAuth.jsx`

- **UI**: Centered card with lock icon, admin key input (password/text toggle), submit button
- **Auth flow**: `POST https://iic.iitdh.ac.in/api/admin/verify-key` with `{ admin_key }`
- On success: stores `admin_token` (base64 encoded session string) + `admin_key` in `sessionStorage`
- Redirects to `/admin/dashboard`

### 7.2 AdminDashboard (Main Panel)

**File**: `AdminDashboard.jsx`

- **Auth guard**: Checks `sessionStorage` for token + key, redirects to `/` if missing
- **Layout**: Header bar + sidebar + main content area
- **Sidebar tabs**:
  1. Dashboard (AnalyticsDashboard)
  2. Orders (OrderManagement) — default active tab
  3. Users (UserManagement)
  4. Pass Management (PassManagement)
  5. Purchase Passes (AdminPurchase)
  6. Attendance Panel (AttendancePanel)
- **Header**: "E-Summit '25 Admin", welcome message, refresh + logout buttons
- **Logout**: Clears sessionStorage, navigates to `/`

### 7.3 AnalyticsDashboard

**File**: `AnalyticsDashboard.jsx`

- **API**: `GET https://iic.iitdh.ac.in/api/admin/db-state` (with X-Admin-Key header)
- **Stat cards**: Total Orders, Total Revenue (₹), Total Users
- **Revenue calculation**:
  - Uses `order.amount` if available
  - Falls back to extracting prices from item names via regex patterns (₹500, - 500, Price: 500, etc.)
  - Excludes rejected/cancelled orders
- **Recent orders list**: Last 10 orders with ID, email, date, amount, status badge

### 7.4 OrderManagement

**File**: `OrderManagement.jsx`

- **Data**: Fetches from `db-state` API, merges orders with user data (UserID → user Email/Phone/Name)
- **Filters**: Search (by ID, email, phone, UTR) + status dropdown (all/pending/verified/rejected)
- **Order cards**: Display order ID, status badge, email, phone, order type, created date, UTR, amount
- **Actions**: View details modal, Verify/Reject buttons (for pending orders)
- **Order detail modal**:
  - Full order info display
  - Payment screenshot fetching from `GET /api/admin/payment-screenshot/{filename}` (blob response)
  - Click-to-expand screenshot viewer (full-screen modal)
  - Status update buttons
- **CSV Export**: Downloads filtered orders as CSV file
- **Status update API**: `POST https://iic.iitdh.ac.in/api/admin/order/verify` with `{ order_id, status }`

### 7.5 UserManagement

**File**: `UserManagement.jsx`

- **Data**: From `db-state` API → `data.users`
- **Display**: Table with columns: ID, Email, Created At
- Read-only interface

### 7.6 PassManagement

**File**: `PassManagement.jsx`

- **Pass list**: 4 pass types with availability toggle (Available/Sold Out)
- **Data loading**: Tries API (`/api/admin/passes`) → falls back to localStorage (`admin_passes`)
- **Save**: Tries API (`/api/admin/passes/update`) → falls back to localStorage
- **Frontend sync**: Saves to `esummit_pass_availability` in localStorage for frontend PassList to read
- **UI**: Toggle buttons per pass, save/refresh buttons, instructions section

### 7.7 AdminPurchase

**File**: `AdminPurchase.jsx`

- Admin-side pass purchasing (same logic as user BuyHome)
- Cart persisted in `admin-esummit-cart` localStorage
- Same CheckoutModal + OrderSuccessModal integration
- Reads pass availability from `esummit_pass_availability` localStorage

### 7.8 AttendancePanel

**File**: `AttendancePanel.jsx`

- **QR Scanner**: Uses `@zxing/library` BrowserMultiFormatReader
  - Camera selection (first available device)
  - Live video feed with styled scanning frame (yellow corner brackets)
  - Start/stop scanner controls
- **QR Verification**: `POST https://iic.iitdh.ac.in/api/attendance/verify-qr` with `{ qr_content }`
- **Attendee details modal**: Shows name, email, college, pass type, price, present status
- **Mark attendance**: `POST https://iic.iitdh.ac.in/api/attendance/mark` with `{ qr_content }`
- **States**: idle → scanning → loading → verified

---

## 8. UI Components

### 8.1 InteractiveCanvas

**File**: `InteractiveCanvas.jsx`

- Full-screen canvas positioned absolutely behind hero content
- **Dot generation**: 100-500 random dots with varying size (1-3px) and opacity
- **Mouse cursor follower**: Gold glowing circle with radial gradient, size varies with speed (6-12px)
- **Tentacle system**: Wavy bezier curves connecting cursor to dots within 180px radius
  - Multi-wave displacement (4 sine waves at different frequencies)
  - Golden gradient along each tentacle (8 color variations)
  - Smooth falloff at endpoints
- **Animation**: requestAnimationFrame loop with eased lerp interpolation
- **Desktop only**: Hidden on screens `<1024px`

### 8.2 CountdownTimer

**File**: `CountdownTimer.jsx`

- Configurable countdown to a target date
- **Display**: Days : Hours : Minutes : Seconds (gold gradient boxes)
- **Types**: `default` (large) and `compact` (small)
- **FOMO text**: Dynamic urgency messages when <6 hours remain
- **Expired state**: Shows "{title} has ended!" message
- Currently commented out in Hero but available as a component

---

## 9. Smooth Scrolling

- **Locomotive Scroll** initialized in both `Home.jsx` and `EventPage.jsx`
- Requires `data-scroll-container` attribute on main wrapper
- Destroyed on component unmount

---

## 10. Styling & Design System

### Color Tokens (via Tailwind custom theme)

- `background` — Main dark background
- `primary-text` — Main text color
- `secondary-text` — Muted text
- `link` — Link/accent color
- `hover` — Hover state color
- `soft-background` — Slightly lighter background
- `secondary-background` — Alt background (#FFC300 gold in some contexts)
- `primary-background` — Card backgrounds

### Typography

- **Parkinsans**: Used for hero event titles
- **Open Sans**: Used for section headers, navigation, and buttons
- **Inter**: Body text

### CSS Animations (defined in stylesheets)

- `fadeBlackInOut` — Background fade for transitions
- `slideAcross` — Flying div animation
- `slideAccent` — Accent line animation
- `dotMove` — Animated dots movement
- `animate-pulse-live` — Live status indicator pulsing
- `animate-fadeIn` — Modal fade-in

---

## 11. Data Sources (Static JSON)

### events.json

- Array of event objects with: `name`, `description`, `large_description`, `register_link`, `iit_dharwad_exclusive_link`, `has_iit_dharwad_exclusive`
- 8 events: Find the Bug, Boardroom Battles, INOVEX, Bid-A-Biz, Technostrophe, E-MUN, Finance-For-All Talk Show, Trumble

### schedule.json

- Day 1 (23rd Aug) and Day 2 (24th Aug) event schedules
- Each event: `time`, `title`, `description`, `venue`, `type`

---

## 12. Key Frontend Patterns

1. **Cart persistence**: localStorage with JSON serialization
2. **Admin auth**: sessionStorage with token + key pair
3. **API calls**: Axios with timeouts (10-30s), X-Admin-Key header for admin routes
4. **Form validation**: Client-side checks before API submission
5. **Loading/error states**: Every data-fetching component has loading spinner and error display
6. **Responsive design**: Mobile-first with breakpoints at 768px (md), 1024px (lg), 1280px (xl)
7. **Transition system**: React Context + CSS keyframes, synchronized navigation timing
8. **Pass availability sync**: Admin updates localStorage → frontend polls every 5 seconds
