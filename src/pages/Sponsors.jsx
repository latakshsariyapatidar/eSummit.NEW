import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SPONSORS } from "@/lib/store";
import { ComingSoonCard } from "@/components/ComingSoonCard";
import { TierSection, groupByTier } from "@/components/SponsorHelpers";

export function Sponsors() {
  useDocumentTitle("Our Partners — E-Summit 2026");
  const grouped = groupByTier(SPONSORS);

  return (
    <div className="relative pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 min-h-screen flex flex-col">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative z-10 max-w-5xl w-full mx-auto">
        {/* <div className="max-w-4xl">
          <PageHeader tag="Pit Crew" title="Our Partners." />
          <p
            className="mt-6 text-sm sm:text-base leading-relaxed max-w-2xl"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontFamily: "sans-serif",
            }}
          >
            The engines fueling E-Summit 2026. Met at the intersection of
            venture, engineering, and design, our partners play a crucial role
            in enabling the next generation of builders.
          </p>
        </div>
        {grouped.map(([tier, sponsors], i) => (
          <TierSection
            key={tier}
            tier={tier}
            sponsors={sponsors}
            isFirst={i === 0}
          />
        ))} */}

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
    </div>
  );
}
