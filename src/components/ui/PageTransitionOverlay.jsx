import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export const PageTransitionOverlay = () => {
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    // Initial state: hidden at the bottom
    gsap.set(overlayRef.current, { yPercent: 100 });
  }, []);

  return (
    <div
      id="page-transition-overlay"
      ref={overlayRef}
      className="fixed top-0 left-0 w-full h-full z-[9999] bg-primary flex items-center justify-center pointer-events-none"
    >
      <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase">
        E-SUMMIT
      </h1>
    </div>
  );
};
