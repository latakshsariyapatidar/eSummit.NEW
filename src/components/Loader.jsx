import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { Howl } from "howler";
import car_start from "/car_start.mp3";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // True when progress hits 100%
  const [isTriggered, setIsTriggered] = useState(false); // True immediately when button is clicked
  const [startTransition, setStartTransition] = useState(false); // True after the 2-second delay

  const [hideLoader, setHideLoader] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("loader-done") === "true";
    }
    return false;
  });

  const overlayRef = useRef(null);
  const soundRef = useRef(null);

  // Handle fake progress tick up to 100%
  useEffect(() => {
    if (hideLoader) return;

    document.body.classList.add("overflow-hidden");
    document.documentElement.classList.add("overflow-hidden");

    let currentProgress = 0;
    const interval = setInterval(() => {
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
    };
  }, [hideLoader]);

  // Handle the interactive click activation
  const handleGetStarted = () => {
    setIsTriggered(true); // Updates the UI state right away (hides the button)
    // Play the audio smoothly
    soundRef.current = new Howl({
      src: [car_start],
      autoplay: false,
      loop: false,
      volume: 0.5,
      html5: false,
    });
    soundRef.current.play();
    // Delay the audio playback and GIF swap by exactly 2000 milliseconds
    setTimeout(() => {
      setStartTransition(true);
    }, 2000);
  };

  // Handle final GSAP transition out after the sound/GIF transition begins
  useEffect(() => {
    if (startTransition && overlayRef.current) {
      // Wait 1300ms for the Done GIF to complete its cycle, then slide away
      const timeout = setTimeout(() => {
        if (soundRef.current) {
          soundRef.current.fade(soundRef.current.volume(), 0, 1100);
        }

        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => {
            setHideLoader(true);
            sessionStorage.setItem("loader-done", "true");
            document.body.classList.remove("overflow-hidden");
            document.documentElement.classList.remove("overflow-hidden");

            if (soundRef.current) {
              soundRef.current.unload();
              soundRef.current = null;
            }
          },
        });
      }, 1300);

      return () => clearTimeout(timeout);
    }
  }, [startTransition]);

  if (hideLoader) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#07080a] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Telemetry Logs (Top Left) */}
      <div className="absolute top-8 left-8 font-mono text-[9px] text-muted-foreground/60 space-y-1 text-left hidden sm:block">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1 h-1 rounded-full ${isLoaded ? "bg-green-500" : "bg-primary animate-pulse"}`}
          />
          <span>SYSTEM: {isLoaded ? "READY" : "GETTING READY"}</span>
        </div>
        <div>
          THROTTLE: {isTriggered ? "REVVED" : isLoaded ? "ACTIVE" : "STANDBY"}
        </div>
        <div>DRIVE MODE: LAUNCH</div>
        <div>SOC: 100%</div>
      </div>

      {/* Center GIF Container */}
      <div className="w-64 h-32 md:w-80 md:h-40 flex items-center justify-center relative">
        {startTransition ? (
          <img
            key="done"
            src={`${import.meta.env.BASE_URL}loader_assets/Car_loading_done.gif`}
            alt="Done"
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            key="loading"
            src={`${import.meta.env.BASE_URL}loader_assets/Car_loading.gif`}
            alt="Loading..."
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Dynamic Telemetry / Interactive Area */}
      <div className="flex flex-col items-center mt-8 h-14 justify-center">
        {!isLoaded ? (
          /* Progress Track */
          <div className="flex flex-col items-center">
            <div className="w-64 h-0.5 rounded-full bg-border/20 overflow-hidden relative">
              <div
                className="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_8px_var(--color-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center w-64 mt-3 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
              <span>SYSTEM CHECK</span>
              <span className="text-primary font-bold">{progress}%</span>
            </div>
          </div>
        ) : !isTriggered ? (
          /* "Get Started" Action Button */
          <button
            onClick={handleGetStarted}
            className="px-8 py-2.5 bg-transparent border border-primary text-primary font-mono text-xs tracking-widest uppercase rounded-sm hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary),0.1)] hover:shadow-[0_0_25px_rgba(var(--primary),0.45)]"
          >
            Get Started
          </button>
        ) : !startTransition ? (
          /* Status indicator during the 2-second countdown window */
          <div className="font-mono text-[10px] tracking-widest text-amber-500 font-bold animate-pulse uppercase">
            PRIME ENGINES...
          </div>
        ) : (
          /* Status indicator during the final exit animation transition */
          <div className="font-mono text-[10px] tracking-widest text-primary font-bold animate-pulse uppercase">
            ENGINES IGNITED
          </div>
        )}
      </div>

      {/* Telemetry Footer Grid lines */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center font-mono text-[9px] text-muted-foreground/40">
        <span>© E-SUMMIT '26 IIT DHARWAD</span>
        <span className="hidden sm:block">GRID POSITION: P1</span>
      </div>
    </div>
  );
}
