import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useLocation } from "react-router-dom";

export function SmoothScroll({ children }) {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!ref.current) return;

    const loco = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
      },
    });

    // Watch for size changes to adjust smooth scroll height recalculations
    const observer = new ResizeObserver(() => {
      loco.resize();
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      loco.destroy();
    };
  }, [location.pathname]);

  return <div ref={ref}>{children}</div>;
}
