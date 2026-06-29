// import React from "react";
// import { PageHeader } from "@/components/ui/PageHeader";
// import { useDocumentTitle } from "@/hooks/useDocumentTitle";
// import { SPONSORS } from "@/lib/store";
// import { GridSection, groupByTierSize } from "@/components/SponsorHelpers";
import { ComingSoonCard } from "@/components/ComingSoonCard";

export function Sponsors() {
//   useDocumentTitle("Our Partners — E-Summit 2026");
  
//   const TIER_ORDER_LOWER = [
//     "title sponsor",
//     "co-powered by",
//     "ev tech partner",
//     "mobility partner",
//     "automotive partner",
//     "racing partner",
//     "innovation sponsor",
//     "energy sponsor",
//   ];
//   const getTierRank = (t) => {
//     const idx = TIER_ORDER_LOWER.indexOf(t?.toLowerCase());
//     return idx === -1 ? 99 : idx;
//   };
  
//   const sortedSponsors = [...SPONSORS].sort((a, b) => getTierRank(a.tier) - getTierRank(b.tier));
//   const groupedSizes = groupByTierSize(SPONSORS);
//   const tierCount = new Set(SPONSORS.map(s => s.tier?.toLowerCase())).size;

  return (
    <div className="relative pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 min-h-screen flex flex-col">
      {/* <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style> */}

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
        </div> */}

        {/* Sponsor Cards */}
        {/* <div
          className="mt-14 flex gap-8 sm:gap-16 py-5 px-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {[
            { value: SPONSORS.length, label: "Partners" },
            { value: tierCount, label: "Tiers" },
            { value: "2026", label: "Season" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span
                className="font-display font-black text-2xl sm:text-3xl leading-none"
                style={{ color: "#F97316" }}
              >
                {value}
              </span>
              <span
                className="font-mono text-xs uppercase tracking-widest mt-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {groupedSizes.map((group) => (
          <GridSection 
            key={group.key} 
            group={group} 
            globalSortedSponsors={sortedSponsors} 
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

        {/* <div
          className="mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 px-8 rounded-2xl"
          style={{
            background: "rgba(249,115,22,0.05)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          <div>
            <p className="font-display font-bold text-lg" style={{ color: "rgba(255,255,255,0.9)" }}>
              Want to join the grid?
            </p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif" }}>
              Partnership slots are limited. Reach out early.
            </p>
          </div>
          <a
            href="mailto:outreach.iic@iitdh.ac.in?subject=Sponsorship%20Inquiry%20-%20ESummit%202026"
            className="flex items-center gap-3 px-6 py-3 rounded-xl font-display font-bold text-sm tracking-wide transition-all duration-300"
            style={{ background: "#F97316", color: "#0A0A0A", whiteSpace: "nowrap", textDecoration: "none" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#FB923C"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(249,115,22,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#F97316"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Become a Partner →
          </a>
        </div> */}
      </div>
    </div>
  );
}