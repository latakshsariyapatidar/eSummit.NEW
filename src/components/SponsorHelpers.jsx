import React from "react";
import { SponsorCard } from "@/components/SponsorCard";

const TIER_ORDER = [
  "title sponsor",
  "co-powered by",
  "ev tech partner",
  "mobility partner",
  "automotive partner",
  "racing partner",
  "innovation sponsor",
  "energy sponsor",
];

function getTierRank(tier) {
  const idx = TIER_ORDER.indexOf(tier?.toLowerCase());
  return idx === -1 ? 99 : idx;
}

const TIER_CONFIG = {
  "title sponsor": { label: "Title Sponsor", accent: "#F97316", size: "lg", glow: "rgba(249,115,22,0.35)" },
  "co-powered by": { label: "Co-Powered By", accent: "#FB923C", size: "lg", glow: "rgba(251,146,60,0.28)" },
  "ev tech partner": { label: "EV Tech Partner", accent: "#FDBA74", size: "md", glow: "rgba(253,186,116,0.2)" },
  "mobility partner": { label: "Mobility Partner", accent: "#FDBA74", size: "md", glow: "rgba(253,186,116,0.2)" },
  "automotive partner": { label: "Automotive Partner", accent: "#D4742A", size: "sm", glow: "rgba(212,116,42,0.18)" },
  "racing partner": { label: "Racing Partner", accent: "#D4742A", size: "sm", glow: "rgba(212,116,42,0.18)" },
  "innovation sponsor": { label: "Innovation Sponsor", accent: "#A35A1E", size: "sm", glow: "rgba(163,90,30,0.15)" },
  "energy sponsor": { label: "Energy Sponsor", accent: "#A35A1E", size: "sm", glow: "rgba(163,90,30,0.15)" },
};

export function getConfig(tier) {
  return TIER_CONFIG[tier?.toLowerCase()] || { label: tier || "Partner", accent: "#F97316", size: "sm", glow: "rgba(249,115,22,0.15)" };
}

export function groupByTier(sponsors) {
  const map = {};
  for (const s of sponsors) {
    const key = s.tier?.toLowerCase() || "partner";
    if (!map[key]) map[key] = [];
    map[key].push(s);
  }
  return Object.entries(map).sort(([a], [b]) => getTierRank(a) - getTierRank(b));
}

export function TrackLine({ accent }) {
  return (
    <div className="relative w-full h-px my-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `${accent}22` }} />
      <div
        className="absolute top-0 left-0 h-full w-24"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          animation: "slide-line 3s linear infinite",
        }}
      />
      <style>{`
        @keyframes slide-line {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
      `}</style>
    </div>
  );
}

export function TierSection({ tier, sponsors, isFirst }) {
  const config = getConfig(tier);
  const isLarge = config.size === "lg";

  // Cap per row: 2 for large, 4 for others
  const maxPerRow = isLarge ? 2 : 4;
  const rows = [];
  for (let i = 0; i < sponsors.length; i += maxPerRow) {
    rows.push(sponsors.slice(i, i + maxPerRow));
  }

  return (
    <div className={isFirst ? "mt-24" : "mt-20"}>
      {/* Tier header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0"
          style={{
            background: `${config.accent}15`,
            border: `1px solid ${config.accent}35`,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.accent }} />
          <span className="font-mono text-xs uppercase tracking-widest font-medium" style={{ color: config.accent }}>
            {config.label}
          </span>
        </div>
        <TrackLine accent={config.accent} />
      </div>

      {/* Rows of cards — each row is a flex row, cards stretch equally */}
      <div className="flex flex-col gap-4">
        {rows.map((rowSponsors, ri) => (
          <div key={ri} className="flex gap-4">
            {rowSponsors.map((s, i) => (
              <SponsorCard key={s.name} sponsor={s} config={config} index={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
