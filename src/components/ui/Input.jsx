import { cn } from "@/lib/utils";

/**
 * Reusable stylized input field matching the dark-grid racing theme.
 */
export function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "w-full bg-background border border-border px-3 py-2 font-mono text-sm focus:border-primary outline-none transition-colors rounded-xl",
        className,
      )}
      {...props}
    />
  );
}
