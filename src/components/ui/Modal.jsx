import { useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable layout modal shell featuring backdrop blur, escape key handling,
 * custom fade/zoom animation, and scrolling containment.
 */
export function Modal({
  children,
  onClose,
  maxWidthClass = "max-w-lg",
  className,
}) {
  // Listen for escape key press to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      <div
        className={cn(
          "bg-card border border-border w-full p-5 sm:p-7 md:p-8 relative shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in-50 zoom-in-95 duration-200 rounded-3xl",
          maxWidthClass,
          className,
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-sm hover:text-primary z-10 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="overflow-y-auto pr-1 flex-1 no-scrollbar mt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
