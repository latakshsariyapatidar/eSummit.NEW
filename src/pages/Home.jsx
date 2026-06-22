import { Countdown } from "@/components/Countdown";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { AboutSection } from "@/components/home/AboutSection";
import { EventsConveyor } from "@/components/home/EventsConveyor";
import { TrackCTA } from "@/components/home/TrackCTA";
import { FAQSection } from "@/components/home/FAQSection";

export function Home() {
  useDocumentTitle("E-Summit 2026 — Shift Gears | IIT Dharwad");

  return (
    <div>
      <Hero />
      <Marquee />

      {/* COUNTDOWN */}
      <section className="mx-auto max-w-400 px-6 lg:px-12 py-28 md:py-36">
        <SectionHeader
          tag="/ 01 — Lights Out"
          title="Until launch."
          description="The countdown to E-Summit 2026 has already started."
          layout="split"
        />
        <Countdown />
      </section>

      <AboutSection />
      <EventsConveyor />
      <TrackCTA />
      <FAQSection />
    </div>
  );
}
