import { Ticket, Calendar, CheckCircle2 } from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// STYLING & CONFIGURATION
// ═══════════════════════════════════════════════════════════════

const DEFAULT_STYLE = {
  accentGradient: "bg-gradient-to-r from-primary to-primary",
  glowBlob: "bg-primary/5",
  borderActive:
    "border-primary/90 shadow-[0_0_30px_rgba(240,150,40,0.25)] scale-[1.01]",
  borderIdle: "border-border/80 ",
  borderSoldOut:
    "border-neutral-800 bg-neutral-900/40 opacity-40 grayscale pointer-events-none select-none",
  accentColorText: "text-primary",
  accentBg: "bg-primary/5 border-primary/20 text-primary",
  buttonHover: "hover:border-primary/60 hover:text-primary",
  stripeGradient: "from-primary via-primary to-primary",
  perkIconColor: "text-muted-foreground/60 ",
  glowColor: "rgba(240,150,40,0.4)",
  priceGradient:
    "bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent",
};

// ═══════════════════════════════════════════════════════════════
// PASSCARD COMPONENT
// ═══════════════════════════════════════════════════════════════

export function PassCard({
  pass: p,
  qty,
  totalQty,
  maxQty,
  onIncrement,
  onDecrement,
}) {
  const style = DEFAULT_STYLE;

  // Backend state monitoring: Fallback to evaluating remaining balance count
  const isTierSoldOut = p.soldOut;

  const showStayProvision = Boolean(p.duration);
  const stayProvisionLabel = p.duration
    ? p.duration
    : "No stay included. Accommodation can be arranged separately at daily rates.";

  return (
    <div
      className={`group relative overflow-hidden border flex flex-col rounded-3xl h-fit  z-10 ${
        isTierSoldOut
          ? style.borderSoldOut
          : qty > 0
            ? `${style.borderActive} `
            : `${style.borderIdle}`
      }`}
      style={{ minHeight: "560px" }}
    >
      {/* ═══ CARD CONTAINER & BASE STYLING ═══ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4.5 bg-background border-x border-b border-border/50 rounded-b-xl flex items-center justify-center z-20 pointer-events-none">
        <div className="w-8 h-1 bg-neutral-950 border border-border/30 rounded-full" />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-card/85 to-card/95 backdrop-blur-xl z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[14px_14px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/1 to-white/3 pointer-events-none z-0" />

      {/* ═══ DECORATIVE ACCENTS ═══ */}
      <div
        className={`absolute top-1.5 left-0 right-0 h-1.5  z-10 ${isTierSoldOut ? "bg-neutral-700" : style.accentGradient}`}
      />

      {/* Checkerboard Pattern */}
      <div className="absolute top-3 left-0 right-0 h-1 flex overflow-hidden opacity-30 select-none pointer-events-none z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
        >
          <pattern
            id="top-checkers"
            width="4"
            height="2"
            patternUnits="userSpaceOnUse"
          >
            <rect width="2" height="1" fill="#fff" />
            <rect x="2" y="1" width="2" height="1" fill="#fff" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#top-checkers)" />
        </svg>
      </div>

      {/* Stripe Accents */}
      {!isTierSoldOut && (
        <div className="absolute top-9 right-6 flex gap-1 transform -skew-x-12 opacity-[0.06] select-none pointer-events-none z-0">
          <div className={`w-1.5 h-8 bg-linear-to-b ${style.stripeGradient}`} />
          <div className={`w-1.5 h-8 bg-linear-to-b ${style.stripeGradient}`} />
          <div className={`w-1.5 h-8 bg-linear-to-b ${style.stripeGradient}`} />
        </div>
      )}

      {/* Ticket Perforation */}
      <div className="absolute left-2 top-[16%] h-[26%] w-3 flex flex-col justify-between opacity-[0.06] pointer-events-none select-none z-10">
        <div className="h-full w-full flex flex-col gap-0.5 overflow-hidden">
          {[4, 2, 6, 1, 5, 2, 8, 3, 2, 4, 1, 6, 2, 3, 8].map((width, idx) => (
            <div
              key={idx}
              className="bg-foreground w-full shrink-0"
              style={{ height: `${width}px` }}
            />
          ))}
        </div>
        <div className="text-[6px] font-mono tracking-wider rotate-90 origin-left mt-3 text-muted-foreground shrink-0 whitespace-nowrap">
          ES26-{p.id.toUpperCase()}
        </div>
      </div>

      {/* ═══ TOP SECTION ═══ */}
      <div className="p-6 sm:p-8 pb-5 flex flex-col z-10 relative h-52.5 shrink-0 justify-start">
        <div className="flex justify-between items-center mt-2">
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">
            SEC. A // PIT LANE
          </span>
          {qty > 0 ? (
            <div className="flex items-center gap-1 bg-primary text-primary-foreground text-[9px] font-extrabold px-2 py-0.5 rounded-full font-mono shadow-[0_0_10px_rgba(240,150,40,0.2)]">
              <CheckCircle2 className="w-3 h-3" />
              {qty} STUB
            </div>
          ) : isTierSoldOut ? (
            <span className="font-mono text-[9px] bg-neutral-800 text-neutral-400 border border-neutral-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              SOLD OUT
            </span>
          ) : (
            <span
              className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider test `}
            >
              AVAILABLE
            </span>
          )}
        </div>

        <div className="mt-4 flex items-start gap-3 justify-between">
          <div className="flex-1 pl-3">
            <h3
              className={`font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight transition-colors duration-300 ${isTierSoldOut ? "text-neutral-500" : "text-foreground "}`}
            >
              {p.name}
            </h3>
          </div>
        </div>

        <div className="mt-4 pl-3 flex items-baseline gap-1.5">
          <span
            className={`font-display text-4xl sm:text-5xl font-black tracking-tighter pr-1 ${isTierSoldOut ? "text-neutral-600" : style.priceGradient}`}
          >
            ₹{p.price}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            / ticket
          </span>
        </div>
      </div>

      {/* ═══ DIVIDER ═══ */}
      <div className="relative w-[calc(100%+48px)] sm:w-[calc(100%+64px)] -mx-6 sm:-mx-8 my-4 pointer-events-none select-none z-20">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-r border-border/50" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-l border-border/50" />
        <div className="w-full border-t border-dashed border-border/60" />
      </div>

      {/* ═══ BOTTOM SECTION ═══ */}
      <div className="p-6 sm:p-8 pt-4 flex flex-col justify-between z-10 bg-black/10 rounded-b-3xl flex-1">
        <ul className="space-y-2.5 text-xs text-muted-foreground flex-1">
          {p.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5">
              <CheckCircle2
                className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors ${
                  isTierSoldOut
                    ? "text-neutral-700"
                    : qty > 0
                      ? style.accentColorText
                      : style.perkIconColor
                }`}
              />
              <span
                className={`transition-colors duration-300 font-sans text-[11px] leading-snug ${isTierSoldOut ? "text-neutral-600" : "text-foreground/80 "}`}
              >
                {perk}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 p-3 rounded-2xl bg-secondary/15 border border-border/30 text-xs space-y-1.5 backdrop-blur-md relative overflow-hidden ">
          <div
            className={`flex items-center gap-1.5 font-bold font-display text-xs tracking-wider ${isTierSoldOut ? "text-neutral-500" : "text-foreground"}`}
          >
            <Calendar
              className={`w-3.5 h-3.5 shrink-0 ${isTierSoldOut ? "text-neutral-600" : style.accentColorText}`}
            />
            <span>STAY PROVISIONS</span>
          </div>
          <div className="h-px w-full bg-white/10" />
          <div className="space-y-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <div>
              <span
                className={`font-sans font-semibold ${isTierSoldOut ? "text-neutral-500" : "text-foreground/80"}`}
              >
                Stay:
              </span>{" "}
              {stayProvisionLabel}
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="mt-5 flex items-center justify-between border-t border-border/30 pt-4 z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            QTY
          </span>
          <div className="flex items-center gap-3 bg-secondary/25 p-1 rounded-xl border border-border/30">
            <button
              onClick={onDecrement}
              disabled={qty === 0 || isTierSoldOut}
              className={`w-8 h-8 flex items-center justify-center border border-border/50 disabled:opacity-20 font-bold select-none rounded-lg  active:scale-90 cursor-pointer text-xs ${style.buttonHover}`}
              title="Decrease quantity"
            >
              −
            </button>
            <span
              className={`font-display text-lg font-black w-6 text-center tabular-nums ${isTierSoldOut ? "text-neutral-600" : "text-foreground"}`}
            >
              {qty}
            </span>
            <button
              onClick={onIncrement}
              disabled={isTierSoldOut || totalQty >= maxQty}
              className={`w-8 h-8 flex items-center justify-center border border-border/50 disabled:opacity-20 font-bold select-none rounded-lg  active:scale-90  cursor-pointer text-xs ${style.buttonHover} `}
              title="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
