import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ComingSoonCard } from "@/components/ComingSoonCard";

export function Sponsors() {
  useDocumentTitle("Our Partners — E-Summit 2026");

  return (
    <div className="pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 text-left min-h-screen flex flex-col">
      <div className="max-w-4xl">
        <PageHeader tag="Pit Crew" title="Our Partners." />
        <p className="mt-6 text-muted-foreground text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
          The engines fueling E-Summit 2026. Met at the intersection of venture,
          engineering, and design, our partners play a crucial role in enabling
          the next generation of builders.
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="mt-16 flex-1 flex items-center justify-center">
        <ComingSoonCard
          title={
            <>
              Sponsors Lineup <br className="hidden sm:block" />
              <span className="text-primary">Revealing Soon.</span>
            </>
          }
          description="We are currently finalizing partnerships. The complete starting grid of sponsors will be unveiled trackside shortly."
          ctaText="Become a Partner →"
          ctaHref="mailto:outreach.iic@iitdh.ac.in?subject=Sponsorship%20Inquiry%20-%20ESummit%202026"
        />
      </div>
    </div>
  );
}
