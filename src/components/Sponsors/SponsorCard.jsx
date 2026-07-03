import { useState } from "react";

export function SponsorCard({ sponsor, config, position }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = config.size === "lg";
  const isMed = config.size === "md";

  return (
    <div
      className="relative flex-1 cursor-none transition-all duration-500"
      style={{
        minWidth: 0,
        animation: `fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`,
        animationDelay: `${position * 80}ms`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Dynamic glow behind the card */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${config.glow} 0%, transparent 70%)`,
          filter: "blur(12px)",
          zIndex: 0,
        }}
      />

      {/* Main card box */}
      <div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-500"
        style={{
          padding: isLarge
            ? "2.5rem 2rem"
            : isMed
              ? "2rem 1.5rem"
              : "1.75rem 1rem",
          background: hovered
            ? `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.005) 100%)`
            : "rgba(255,255,255,0.01)",
          border: `1px solid ${hovered ? config.accent + "50" : "rgba(255,255,255,0.05)"}`,
          boxShadow: hovered ? `0 12px 40px ${config.glow}` : "none",
          backdropFilter: "blur(12px)",
          zIndex: 1,
        }}
      >
        {/* Logo Frame */}
        <div className="flex items-center justify-center rounded-xl mb-4 transition-all duration-300 shrink-0  overflow-hidden">
          {/* Sponsor Image here */}
          <img
            src={sponsor.imgUrl}
            alt={sponsor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h3
          className="font-display font-black tracking-tight transition-colors duration-300 leading-none"
          style={{
            fontSize: isLarge ? "1.45rem" : isMed ? "1.15rem" : "0.95rem",
            color: hovered ? config.accent : "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          {sponsor.name}
        </h3>

        {/* Tier Label */}
        <p
          className="mt-2 font-mono uppercase tracking-widest transition-colors duration-300"
          style={{
            fontSize: "0.55rem",
            color: hovered ? `${config.accent}aa` : "rgba(255,255,255,0.25)",
            letterSpacing: "0.15em",
          }}
        >
          {sponsor.tier}
        </p>

        {/* Technical Telemetry Readout */}
        <div
          className="w-full font-mono text-[9px] uppercase tracking-wider text-center select-none overflow-hidden transition-all duration-500"
          style={{
            height: hovered ? "22px" : "0px",
            opacity: hovered ? 0.75 : 0,
            color: config.accent,
            borderTop: `1px dashed ${config.accent}20`,
            marginTop: hovered ? "12px" : "0px",
            paddingTop: hovered ? "8px" : "0px",
            letterSpacing: "0.05em",
          }}
        >
          {config.telemetry}
        </div>
      </div>
    </div>
  );
}
