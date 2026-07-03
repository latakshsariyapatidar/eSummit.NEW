import { useEffect, useState } from "react";
import { TARGET_DATE } from "@/lib/store";

function calc() {
  const diff = TARGET_DATE - Date.now();

  if (diff <= 0) {
    return {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      done: true,
      urgent: false,
    };
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  return {
    d,
    h,
    m,
    s,
    done: false,
    urgent: d === 0 && h < 6,
  };
}

export function Countdown() {
  const [time, setTime] = useState(calc());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calc());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (time.done) {
    return (
      <div className="rounded-2xl border border-border/50 bg-background/20 px-6 py-5 backdrop-blur-xl text-center">
        <p className="font-display text-xl font-semibold">
          Registrations Closed
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          See you at E-Summit 2026.
        </p>
      </div>
    );
  }

  const items = [
    {
      value: String(time.d).padStart(2, "0"),
      label: "Days",
    },
    {
      value: String(time.h).padStart(2, "0"),
      label: "Hours",
    },
    {
      value: String(time.m).padStart(2, "0"),
      label: "Minutes",
    },
    {
      value: String(time.s).padStart(2, "0"),
      label: "Seconds",
    },
  ];

  return (
    <div className="w-full">
      {time.urgent && (
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
            Final Hours
          </span>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-background/20 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-white/10">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center py-4 px-2"
            >
              <span
                className={`font-display font-semibold tabular-nums leading-none transition-colors duration-300 ${
                  time.urgent ? "text-primary" : "text-foreground"
                } text-3xl md:text-4xl`}
              >
                {item.value}
              </span>

              <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Countdown;
