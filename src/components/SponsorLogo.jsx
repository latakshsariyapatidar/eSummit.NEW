import React from "react";

/**
 * Standard sponsor SVG logo icons with high-tech micro-animations.
 */
export function SponsorLogo({ type, hovered }) {
  const animationStyles = (
    <style>{`
      @keyframes logo-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes logo-pulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.08); }
      }
      @keyframes logo-vibrate {
        0%, 100% { transform: translate(0, 0); }
        20% { transform: translate(1px, -1px); }
        40% { transform: translate(-1px, 1px); }
        60% { transform: translate(1.5px, 0.5px); }
        80% { transform: translate(-0.5px, -1.5px); }
      }
      @keyframes logo-dash {
        to { stroke-dashoffset: -20; }
      }
      @keyframes logo-wing-lift {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
    `}</style>
  );

  const baseSvgClasses =
    "w-10 h-10 sm:w-12 sm:h-12 text-current transition-all duration-300";

  switch (type) {
    case "engine":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              animation: hovered ? "logo-vibrate 0.2s linear infinite" : "none",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="25"
              y="30"
              width="50"
              height="40"
              rx="4"
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="12"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              d="M15 40 H25 M75 40 H85 M15 60 H25 M75 60 H85"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </>
      );
    case "gear":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              animation: hovered ? "logo-spin 5s linear infinite" : "none",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="28"
              stroke="currentColor"
              strokeWidth="4.5"
            />
            <circle
              cx="50"
              cy="50"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            {Array.from({ length: 8 }).map((_, idx) => {
              const angle = (idx * 45 * Math.PI) / 180;
              const x1 = 50 + 28 * Math.cos(angle);
              const y1 = 50 + 28 * Math.sin(angle);
              const x2 = 50 + 38 * Math.cos(angle);
              const y2 = 50 + 38 * Math.sin(angle);
              return (
                <line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        </>
      );
    case "battery":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="25"
              y="25"
              width="44"
              height="54"
              rx="6"
              stroke="currentColor"
              strokeWidth="4.5"
            />
            <rect
              x="39"
              y="14"
              width="16"
              height="11"
              rx="2"
              fill="currentColor"
            />
            <path
              d="M47 38 L37 52 H47 L43 66 L53 52 H43 Z"
              fill="currentColor"
              style={{
                transformOrigin: "50px 50px",
                animation: hovered
                  ? "logo-pulse 1s ease-in-out infinite"
                  : "none",
              }}
            />
          </svg>
        </>
      );
    case "bolt":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              animation: hovered
                ? "logo-pulse 1.2s ease-in-out infinite"
                : "none",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M55 15 L30 52 H48 L41 85 L70 42 H50 Z"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </>
      );
    case "shield":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 15 C60 15 75 18 75 35 C75 58 60 76 50 85 C40 76 25 58 25 35 C25 18 40 15 50 15 Z"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path
              d="M50 25 V75"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              style={{
                animation: hovered ? "logo-dash 0.8s linear infinite" : "none",
              }}
            />
          </svg>
        </>
      );
    case "apex":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              transform: hovered ? "scale(1.1) translateY(-2px)" : "scale(1)",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 15 L85 75 H67 L50 42 L33 75 H15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
          </svg>
        </>
      );
    case "wing":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              animation: hovered
                ? "logo-wing-lift 1.6s ease-in-out infinite"
                : "none",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 35 Q40 32 75 50 Q45 52 20 40 Z M22 47 Q43 45 70 60 Q48 61 28 51"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </>
      );
    case "circle":
      return (
        <>
          {animationStyles}
          <svg
            className={baseSvgClasses}
            style={{
              transformOrigin: "center",
              opacity: hovered ? 1 : 0.7,
            }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="32"
              stroke="currentColor"
              strokeWidth="4.5"
            />
            <circle
              cx="50"
              cy="50"
              r="22"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              style={{
                transformOrigin: "50px 50px",
                animation: hovered
                  ? "logo-spin 8s linear infinite reverse"
                  : "none",
              }}
            />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </svg>
        </>
      );
    default:
      return (
        <svg
          className="w-10 h-10 sm:w-12 sm:h-12 text-current opacity-70"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="25"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      );
  }
}
