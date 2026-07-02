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
  "title sponsor": {
    label: "Title Sponsor",
    accent: "#F97316",
    size: "lg",
    glow: "rgba(249,115,22,0.35)",
    telemetry: "SYS: ACTIVE // POWER: 100% // KERS: ENABLED",
  },
  "co-powered by": {
    label: "Co-Powered By",
    accent: "#FB923C",
    size: "lg",
    glow: "rgba(251,146,60,0.28)",
    telemetry: "FLOW: STABLE // OUT: MAX // TEMP: 78°C",
  },
  "ev tech partner": {
    label: "EV Tech Partner",
    accent: "#FDBA74",
    size: "md",
    glow: "rgba(253,186,116,0.2)",
    telemetry: "BATT: 100% // VOLT: 800V // REGEN: ACTIVE",
  },
  "mobility partner": {
    label: "Mobility Partner",
    accent: "#FDBA74",
    size: "md",
    glow: "rgba(253,186,116,0.2)",
    telemetry: "BOOST: READY // SPEED: 320 KM/H",
  },
  "automotive partner": {
    label: "Automotive Partner",
    accent: "#D4742A",
    size: "sm",
    glow: "rgba(212,116,42,0.18)",
    telemetry: "GEARS: 8-SPD // CLUTCH: DUAL",
  },
  "racing partner": {
    label: "Racing Partner",
    accent: "#D4742A",
    size: "sm",
    glow: "rgba(212,116,42,0.18)",
    telemetry: "DOWNFORCE: HIGH // DRAG: 0.18",
  },
  "innovation sponsor": {
    label: "Innovation Sponsor",
    accent: "#A35A1E",
    size: "sm",
    glow: "rgba(163,90,30,0.15)",
    telemetry: "CORE: UNLOCKED // TECH: GEN-3",
  },
  "energy sponsor": {
    label: "Energy Sponsor",
    accent: "#A35A1E",
    size: "sm",
    glow: "rgba(163,90,30,0.15)",
    telemetry: "FUEL: SYNTHETIC // COMP: 14:1",
  },
};

export function getConfig(tier) {
  return (
    TIER_CONFIG[tier?.toLowerCase()] || {
      label: tier || "Partner",
      accent: "#F97316",
      size: "sm",
      glow: "rgba(249,115,22,0.15)",
      telemetry: "TELEMETRY: DATA_PENDING",
    }
  );
}

export function groupByTierSize(sponsors) {
  // Sort according to TIER_ORDER first
  const sorted = [...sponsors].sort(
    (a, b) => getTierRank(a.tier) - getTierRank(b.tier),
  );

  const groups = {
    lg: [],
    md: [],
    sm: [],
  };

  sorted.forEach((s) => {
    const config = getConfig(s.tier);
    const size = config.size || "sm";
    groups[size].push(s);
  });

  return [
    {
      key: "lg",
      title: "Pole Position",
      label: "Championship Tier",
      sponsors: groups.lg,
    },
    {
      key: "md",
      title: "Mid-Grid Leaders",
      label: "Pro Track Tier",
      sponsors: groups.md,
    },
    {
      key: "sm",
      title: "Speed Zone",
      label: "Contender Tier",
      sponsors: groups.sm,
    },
  ].filter((g) => g.sponsors.length > 0);
}

export function TrackLine({ accent }) {
  return (
    <div className="relative w-full h-px my-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `${accent}22` }} />
      <div
        className="absolute top-0 left-0 h-full w-24"
        style={{
          background: `#F97316`,
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

export function GridSection({ group, globalSortedSponsors }) {
  const isLg = group.key === "lg";
  const isMd = group.key === "md";
  const gridClasses = isLg
    ? "grid grid-cols-1 md:grid-cols-2 gap-8"
    : isMd
      ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
      : "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6";

  const accentColor = isLg ? "#F97316" : isMd ? "#FB923C" : "#D4742A";

  return (
    <div className="mt-16">
      {/* Group Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full shrink-0"
          style={{
            background: `${accentColor}10`,
            border: `1px solid ${accentColor}30`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-ping"
            style={{ background: accentColor }}
          />
          <span
            className="font-mono text-xs uppercase tracking-widest font-bold"
            style={{ color: accentColor }}
          >
            {group.title}
          </span>
          <span
            className="text-[9px] uppercase font-mono px-2 py-0.5 rounded font-medium border"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              borderColor: "rgba(255, 255, 255, 0.05)",
              color: "rgba(255, 255, 255, 0.4)",
            }}
          >
            {group.label}
          </span>
        </div>
        <TrackLine accent={accentColor} />
      </div>

      {/* Grid Layout of Cards */}
      <div className={gridClasses}>
        {group.sponsors.map((s) => {
          const globalIdx = globalSortedSponsors.findIndex(
            (x) => x.name === s.name,
          );
          const position = globalIdx !== -1 ? globalIdx + 1 : 1;
          const config = getConfig(s.tier);
          return (
            <SponsorCard
              key={s.name}
              sponsor={s}
              config={config}
              position={position}
            />
          );
        })}
      </div>
    </div>
  );
}
