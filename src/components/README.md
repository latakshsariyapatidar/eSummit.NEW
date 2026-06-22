# Shared & Section Components (`src/components/`)

This directory houses high-level layouts, section components, and modals reused across E-Summit pages.

## Home Page Sections (`src/components/home/`)

Contains isolated section components specifically built for composing the landing/home page:

- **`Hero.jsx`**: The immersive motorsport-themed entrance section featuring the key brand message, spot reservation links, and custom GSAP staggered headline reveal animations.
- **`Marquee.jsx`**: An infinite text-scrolling marquee showcasing E-Summit tracks (e.g., AUTOMOBILES, MOBILITY, ELECTRIC, LOGISTICS).
- **`AboutSection.jsx`**: The statistics dashboard and brand description block with animated speedometer visuals.
- **`EventsConveyor.jsx`**: An infinite horizontal scrolling ribbon showing E-Summit's flagship competitive events.
- **`TrackCTA.jsx`**: A call-to-action banner showcasing track textures and links to pass booking.
- **`FAQSection.jsx`**: An interactive accordion for answering briefing/frequently asked questions.

## Shared Components

- **`ComingSoonCard.jsx`**: A highly reusable "Coming Soon" panel with optional email-based Call to Actions (CTAs), adhering to DRY principles across `Buy.jsx`, `Sponsors.jsx`, and `Team.jsx`.
- **`SponsorLogo.jsx`**: Isolated component rendering SVG icons for partners.
- **`CheckoutModal.jsx`**: Handles ticket-purchasing forms, validations, and orders.
- **`OrderStatusModal.jsx`**: Allows tracking ticket statuses via phone number queries.
- **`Countdown.jsx`**: Visual countdown timer displaying time remaining until launch.
- **`Footer.jsx`**: Global application footer structure.
- **`Layout.jsx`**: Global layout wrapper containing Nav, SmoothScroll, and PageTransitionOverlay.
- **`Nav.jsx`**: Navigation bar containing menus and page links.
- **`SmoothScroll.jsx`**: Lenis scroll wrapper for butter-smooth interactions.
