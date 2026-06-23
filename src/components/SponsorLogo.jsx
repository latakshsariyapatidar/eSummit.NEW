/**
 * Standard sponsor SVG logo icons.
 */
export function SponsorLogo({ type }) {
  switch (type) {
    case "engine":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
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
      );
    case "gear":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 group-hover:rotate-45"
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
      );
    case "battery":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
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
          <path d="M47 38 L37 52 H47 L43 66 L53 52 H43 Z" fill="currentColor" />
        </svg>
      );
    case "bolt":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
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
      );
    case "shield":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
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
          />
        </svg>
      );
    case "apex":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
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
      );
    case "wing":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
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
      );
    case "circle":
      return (
        <svg
          className="w-12 h-12 text-current opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
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
          />
          <circle cx="50" cy="50" r="6" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg
          className="w-12 h-12 text-current opacity-70"
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
