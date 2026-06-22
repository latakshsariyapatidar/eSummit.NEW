import { cn } from "@/lib/utils";

/**
 * Reusable select input dropdown styled to match the application theme.
 */
export function Select({ children, className, ...props }) {
  return (
    <select
      className={cn(
        "w-full bg-background border border-border px-3 py-2 font-mono text-sm focus:border-primary outline-none transition-colors cursor-pointer rounded-xl",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
