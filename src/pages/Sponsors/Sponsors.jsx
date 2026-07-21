import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { fetchSponsors } from "@/lib/store";

import {
  GridSection,
  groupByTierSize,
} from "@/components/Sponsors/SponsorHelpers";
import { ComingSoonCard } from "@/components/ComingSoon/ComingSoonCard";

export function Sponsors() {
  useDocumentTitle("Our Partners — E-Summit 2026");
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors()
      .then((data) => {
        setSponsors(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sponsors:", err);
        setLoading(false);
      });
  }, []);

  const TIER_ORDER_LOWER = [
    "title sponsor",
    "co-powered by",
    "ev tech partner",
    "mobility partner",
    "automotive partner",
    "racing partner",
    "innovation sponsor",
    "energy sponsor",
  ];

  const getTierRank = (tier) => {
    const idx = TIER_ORDER_LOWER.indexOf(tier?.toLowerCase());
    return idx === -1 ? 99 : idx;
  };

  const sortedSponsors = [...sponsors].sort(
    (a, b) => getTierRank(a.tier) - getTierRank(b.tier),
  );

  const groupedSizes = groupByTierSize(sortedSponsors);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">

      </div>
    );
  }

  return (
    <>
      {sponsors.length > 0 ? (
        <div className="relative pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 min-h-screen flex flex-col">
          <style>{`
            @keyframes fadeSlideIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div className="relative z-10 max-w-5xl w-full mx-auto">
            <div className="max-w-4xl">
              <PageHeader tag="Pit Crew" title="Our Partners." />

              <p
                className="mt-6 text-sm sm:text-base leading-relaxed max-w-2xl"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: "sans-serif",
                }}
              >
                The engines fueling E-Summit 2026. Met at the intersection of
                venture, engineering, and design, our partners play a crucial
                role in enabling the next generation of builders.
              </p>
            </div>

            {groupedSizes.map((group) => (
              <GridSection
                key={group.key}
                group={group}
                globalSortedSponsors={sortedSponsors}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center px-6">
          <ComingSoonCard
            title={
              <>
                Sponsors Lineup <br className="hidden sm:block" />
                <span className="text-primary">Revealing Soon.</span>
              </>
            }
            description="We are currently finalizing partnerships. The complete starting grid of sponsors will be unveiled trackside shortly."
            ctaText="Become a Partner →"
            ctaHref="mailto:outreach.iic@iitdh.ac.in?subject=Sponsorship%20Inquiry%20-%20E-summit%202026"
          />
        </div>
      )}
    </>
  );
}
