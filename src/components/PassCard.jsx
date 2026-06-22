/**
 * PassCard
 *
 * Props:
 *   pass: {
 *     id: string,
 *     name: string,
 *     price: number,
 *     perks: string[],
 *     soldOut?: boolean,
 *   }
 *   qty: number               — current quantity in cart
 *   totalQty: number          — total items across all passes in cart
 *   maxQty: number            — per-order maximum
 *   onIncrement: () => void
 *   onDecrement: () => void
 */
export function PassCard({
  pass: p,
  qty,
  totalQty,
  maxQty,
  onIncrement,
  onDecrement,
}) {
  return (
    <div
      className={`border bg-card p-6 sm:p-8 flex flex-col rounded-3xl transition-colors duration-300 ${
        qty > 0 ? "border-primary" : "border-border"
      }`}
    >
      <div className="flex justify-between mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {p.id.toUpperCase()}
        </span>
        {p.soldOut && (
          <span className="font-mono text-xs text-signal uppercase">
            Sold out
          </span>
        )}
      </div>

      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-none">
        {p.name}
      </h3>

      <div className="mt-6 font-display text-5xl sm:text-6xl text-primary">
        ₹{p.price}
      </div>

      <ul className="mt-8 space-y-2 text-sm text-muted-foreground flex-1">
        {p.perks.map((perk) => (
          <li key={perk} className="flex gap-2">
            <span className="text-primary">▸</span>
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <span className="font-mono text-xs uppercase tracking-widest">Qty</span>
        <div className="flex items-center gap-3">
          <button
            onClick={onDecrement}
            disabled={qty === 0}
            className="w-10 h-10 border border-border hover:border-primary disabled:opacity-30 font-mono select-none rounded-xl transition-colors"
          >
            −
          </button>
          <span className="font-display text-2xl w-8 text-center tabular-nums">
            {qty}
          </span>
          <button
            onClick={onIncrement}
            disabled={p.soldOut || totalQty >= maxQty}
            className="w-10 h-10 border border-border hover:border-primary disabled:opacity-30 font-mono select-none rounded-xl transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
