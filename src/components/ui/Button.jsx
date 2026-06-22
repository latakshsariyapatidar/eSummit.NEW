import { cn } from "@/lib/utils";

/**
 * Reusable Button component styled for the E-Summit application.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Button label/content
 * @param {string} [props.className] - Additional Tailwind CSS classes
 * @param {"primary" | "secondary" | "outline" | "signal" | "none"} [props.variant] - Style variant
 * @param {"sm" | "md" | "lg"} [props.size] - Sizing variation
 * @param {boolean} [props.pill] - Whether to render as rounded-full
 * @param {boolean} [props.animateScale] - Apply micro-interactions on hover and active
 * @param {string} [props.type] - HTML button type attribute
 */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  pill = false,
  animateScale = false,
  type = "button",
  ...props
}) {
  const baseStyle =
    "font-mono uppercase tracking-widest font-semibold transition-all duration-300 text-center select-none cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none disabled:opacity-30 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/10",
    secondary:
      "bg-card hover:bg-card/85 text-foreground border border-border hover:border-primary",
    outline:
      "border border-border/80 bg-background/30 backdrop-blur-sm hover:border-primary text-foreground",
    signal: "border border-signal text-signal hover:bg-signal/10",
    none: "",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3.5 text-xs",
    lg: "px-8 py-4.5 text-xs sm:text-sm",
  };

  return (
    <button
      type={type}
      className={cn(
        baseStyle,
        variants[variant],
        sizes[size],
        pill ? "rounded-full" : "rounded-xl",
        animateScale ? "hover:scale-[1.02] active:scale-[0.98]" : "",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
