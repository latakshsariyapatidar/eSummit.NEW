import React from "react";
import { Button } from "@/components/ui/Button";

export function ComingSoonCard({ title, description, ctaText, ctaHref }) {
  return (
    <div className="w-full max-w-3xl bg-card/10 border border-border/30 rounded-3xl p-8 md:p-16 relative overflow-hidden backdrop-blur-md shadow-2xl text-center space-y-6">
      {/* Decorative Corner Grids */}
      <div className="absolute top-0 left-0 w-24 h-24 border-r border-b border-border/10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-l border-t border-border/10 pointer-events-none" />

      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-none">
        {title}
      </h2>

      <p className="text-muted-foreground text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
        {description}
      </p>

      {ctaText && ctaHref && (
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={ctaHref} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              {ctaText}
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}
