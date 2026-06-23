import { useState } from "react";
import { SponsorLogo } from "@/components/SponsorLogo";

export function SponsorCard({ sponsor, config, index }) {
  const [hovered, setHovered] = useState(false);
  const isLarge = config.size === "lg";
  const isMed = config.size === "md";

  return (
    <div
      className="relative flex-1 cursor-pointer"
      style={{ minWidth: 0, animation: `fadeSlideIn 0.4s ease both`, animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${config.glow} 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />

      <div
        className="relative h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center transition-all duration-500"
        style={{
          padding: isLarge ? "2.5rem 2rem" : isMed ? "2rem 1.5rem" : "1.75rem 1rem",
          background: hovered
            ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? config.accent + "55" : "rgba(255,255,255,0.07)"}`,
          boxShadow: hovered ? `0 0 32px ${config.glow}` : "none",
        }}
      >
        <div
          className="absolute top-0 left-0 w-6 h-6 transition-all duration-300"
          style={{
            borderTop: `2px solid ${config.accent}`,
            borderLeft: `2px solid ${config.accent}`,
            opacity: hovered ? 1 : 0.3,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-6 h-6 transition-all duration-300"
          style={{
            borderBottom: `2px solid ${config.accent}`,
            borderRight: `2px solid ${config.accent}`,
            opacity: hovered ? 1 : 0.3,
          }}
        />

        <div
          className="flex items-center justify-center rounded-xl mb-5 transition-all duration-300 shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
          style={{
            background: hovered ? `${config.accent}18` : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered ? config.accent + "44" : "rgba(255,255,255,0.08)"}`,
            color: hovered ? config.accent : "rgba(255,255,255,0.6)",
          }}
        >
          <SponsorLogo type={sponsor.logoType} />
        </div>

        <h3
          className="font-display font-black tracking-tight transition-colors duration-300 leading-none"
          style={{
            fontSize: isLarge ? "1.35rem" : isMed ? "1.1rem" : "0.95rem",
            color: hovered ? config.accent : "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          {sponsor.name}
        </h3>

        <p
          className="mt-2 font-mono uppercase tracking-widest transition-colors duration-300"
          style={{
            fontSize: "0.6rem",
            color: hovered ? `${config.accent}cc` : "rgba(255,255,255,0.3)",
          }}
        >
          {sponsor.tier}
        </p>

        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, transparent, ${config.accent}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}
