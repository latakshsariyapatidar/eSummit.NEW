import { cn } from "@/lib/utils";

/**
 * Standard page-top header format displaying a mono tag and styled display title.
 */
export function PageHeader({ tag, title, className, titleClassName }) {
  return (
    <div className={cn("mb-12 text-left", className)}>
      {tag && (
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
          {tag.startsWith("/") || tag.startsWith("◉") || tag.startsWith("·")
            ? tag
            : `/ ${tag}`}
        </div>
      )}
      <h1
        className={cn(
          "font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none",
          titleClassName,
        )}
      >
        {title}
      </h1>
    </div>
  );
}
