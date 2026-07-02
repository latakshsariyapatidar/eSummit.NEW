import { useState } from "react";
import { SponsorLogo } from "@/components/SponsorLogo";

export function SponsorCard({ sponsor, config, position }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = config.size === "lg";
  const isMed = config.size === "md";

  return (
    <div
      className="relative flex-1 cursor-pointer transition-all duration-500"
      style={{
        minWidth: 0,
        animation: `fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`,
        animationDelay: `${position * 80}ms`,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        {/* Floating Position Badge */}
        <div
          className="absolute top-3 right-3 font-mono text-[10px] font-black transition-all duration-300"
          style={{
            color: hovered ? config.accent : "rgba(255,255,255,0.18)",
            background: hovered
              ? `${config.accent}12`
              : "rgba(255,255,255,0.02)",
            border: `1px solid ${hovered ? config.accent + "25" : "rgba(255,255,255,0.04)"}`,
            padding: "2px 6px",
            borderRadius: "4px",
            letterSpacing: "0.05em",
          }}
        >
          P{position < 10 ? `0${position}` : position}
        </div>

        {/* Dynamic sliding corner brackets */}
        <div
          className="absolute w-4 h-4 transition-all duration-300"
          style={{
            top: hovered ? "-2px" : "0px",
            left: hovered ? "-2px" : "0px",
            borderTop: `2px solid ${hovered ? config.accent : "rgba(255,255,255,0.15)"}`,
            borderLeft: `2px solid ${hovered ? config.accent : "rgba(255,255,255,0.15)"}`,
          }}
        />
        <div
          className="absolute w-4 h-4 transition-all duration-300"
          style={{
            bottom: hovered ? "-2px" : "0px",
            right: hovered ? "-2px" : "0px",
            borderBottom: `2px solid ${hovered ? config.accent : "rgba(255,255,255,0.15)"}`,
            borderRight: `2px solid ${hovered ? config.accent : "rgba(255,255,255,0.15)"}`,
          }}
        />

        {/* Logo Frame */}
        <div
          className="flex items-center justify-center rounded-xl mb-4 transition-all duration-300 shrink-0"
          style={{
            width: isLarge ? "4.5rem" : isMed ? "3.75rem" : "3rem",
            height: isLarge ? "4.5rem" : isMed ? "3.75rem" : "3rem",
            background: hovered
              ? `${config.accent}12`
              : "rgba(255,255,255,0.02)",
            border: `1px solid ${hovered ? config.accent + "35" : "rgba(255,255,255,0.05)"}`,
            color: hovered ? config.accent : "rgba(255,255,255,0.5)",
          }}
        >
          <SponsorLogo type={sponsor.logoType} hovered={hovered} />
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
