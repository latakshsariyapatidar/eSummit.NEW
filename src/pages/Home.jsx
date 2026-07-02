import { lazy } from "react";

import { Countdown } from "@/components/Countdown";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { LazySection } from "@/components/LazySection";

const AboutSection = lazy(() =>
  import("@/components/home/AboutSection").then((m) => ({
    default: m.AboutSection,
  })),
);

const EventsConveyor = lazy(() =>
  import("@/components/home/EventsConveyor").then((m) => ({
    default: m.EventsConveyor,
  })),
);

const TrackCTA = lazy(() =>
  import("@/components/home/TrackCTA").then((m) => ({
    default: m.TrackCTA,
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
      <LazySection component={EventsConveyor} />
      <LazySection component={TrackCTA} />
      <LazySection component={FAQSection} />
    </div>
  );
}
