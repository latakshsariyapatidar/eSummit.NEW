import { lazy } from "react";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { LazySection } from "@/components/Shared/LazySection";

const AboutSection = lazy(() =>
  import("@/components/home/AboutSection").then((m) => ({
    default: m.AboutSection,
  })),
);

const IntersectTalk = lazy(() =>
  import("@/components/home/IntersectTalk").then((m) => ({
    default: m.IntersectTalk,
  })),
);

const EventsConveyor = lazy(() =>
  import("@/components/home/EventsMarquee").then((m) => ({
    default: m.EventsConveyor,
  })),
);

// Commented out "Lights out — Take pole position" component
// const TrackCTA = lazy(() =>
//   import("@/components/home/CTA").then((m) => ({
//     default: m.TrackCTA,
//   })),
// );

const SponsorsMarquee = lazy(() =>
  import("@/components/home/SponsorsMarquee").then((m) => ({
    default: m.SponsorsMarquee,
  })),
);

const FAQSection = lazy(() =>
  import("@/components/home/FAQSection").then((m) => ({
    default: m.FAQSection,
  })),
);

export function Home() {
  useDocumentTitle("E-Summit 2026 — Shift Gears | IIT Dharwad");

  return (
    <div>
      <Hero />
      <Marquee />
      <LazySection component={AboutSection} />
      <LazySection component={IntersectTalk} />
      <LazySection component={EventsConveyor} />
      {/* <LazySection component={TrackCTA} /> */}
      <LazySection component={SponsorsMarquee} />
      <LazySection component={FAQSection} />
    </div>
  );
}
