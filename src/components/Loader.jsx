import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("loader-done") === "true";
    }
    return false;
  });

  const overlayRef = useRef(null);

  useEffect(() => {
    if (hideLoader) return;

    // Lock body scroll
    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("overflow-hidden");

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Organic progress increments
      const increment = Math.floor(Math.random() * 8) + 4;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoaded(true);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [hideLoader]);

  useEffect(() => {
    if (isLoaded && overlayRef.current) {
      // Swapped to done GIF. Wait 1300ms for it to animate, then slide up out of view
      const timeout = setTimeout(() => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => {
            setHideLoader(true);
            sessionStorage.setItem("loader-done", "true");
            document.body.classList.remove("overflow-hidden");
            document.documentElement.classList.remove("overflow-hidden");
          },
        });
      }, 1300);

      return () => clearTimeout(timeout);
    }
  }, [isLoaded]);

  if (hideLoader) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 bg-[#07080a] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Telemetry Logs (Top Left) */}
      <div className="absolute top-8 left-8 font-mono text-[9px] text-muted-foreground/60 space-y-1 text-left hidden sm:block">
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          <span>SYSTEM: GETTING READY</span>
        </div>
        <div>THROTTLE: STANDBY</div>
        <div>DRIVE MODE: LAUNCH</div>
        <div>SOC: 100%</div>
      </div>

      {/* Center GIF Container */}
      <div className="w-64 h-32 md:w-80 md:h-40 flex items-center justify-center relative">
        {isLoaded ? (
          <img
            key="done"
            src="/loader_assets/Car_loading_done.gif"
            alt="Done"
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            key="loading"
            src="/loader_assets/Car_loading.gif"
            alt="Loading..."
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Progress Telemetry */}
      <div className="flex flex-col items-center mt-8">
        {/* Sleek track */}
        <div className="w-64 h-0.5 rounded-full bg-border/20 overflow-hidden relative">
          <div
            className="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_8px_var(--color-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter Labels */}
        <div className="flex justify-between items-center w-64 mt-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
          <span>SYSTEM CHECK</span>
          <span className="text-primary font-bold">{progress}%</span>
        </div>
      </div>

      {/* Telemetry Footer Grid lines */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center font-mono text-[9px] text-muted-foreground/40">
        <span>© E-SUMMIT '26 IIT DHARWAD</span>
        <span className="hidden sm:block">GRID POSITION: P1</span>
      </div>
    </div>
  );
}
