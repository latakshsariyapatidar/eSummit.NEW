import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { ComingSoonCard } from "@/components/ComingSoonCard";
// import { Button } from "@/components/ui/Button";
// import { useState } from "react";
// import { PASSES } from "@/lib/store";
// import { PassCard } from "@/components/PassCard";
// import { CheckoutModal } from "@/components/CheckoutModal";
// import { OrderStatusModal } from "@/components/OrderStatusModal";
// import { useLocalStorage } from "@/hooks/useLocalStorage";

const MAX = 5;

export function Buy() {
  useDocumentTitle("Get Your Pass — E-Summit 2026");

  // ── Uncomment when passes go live ────────────────────────────────────────
  // const [cart, setCart] = useLocalStorage("es26_cart", []);
  // const [checkoutOpen, setCheckoutOpen] = useState(false);
  // const [statusOpen, setStatusOpen] = useState(false);
  
  // const totalQty = cart.reduce((a, c) => a + c.qty, 0);
  // const total = cart.reduce((a, c) => {
  //   const p = PASSES.find((pass) => pass.id === c.passId);
  //   return a + (p?.price ?? 0) * c.qty;
  // }, 0);
  
  // const update = (passId, delta) => {
  //   setCart((prev) => {
  //     const existing = prev.find((c) => c.passId === passId);
  //     const currentTotal = prev.reduce((a, c) => a + c.qty, 0);
  //     let next;
  //     if (existing) {
  //       const newQty = Math.max(0, existing.qty + delta);
  //       if (delta > 0 && currentTotal >= MAX) return prev;
  //       next =
  //         newQty === 0
  //           ? prev.filter((c) => c.passId !== passId)
  //           : prev.map((c) =>
  //               c.passId === passId ? { ...c, qty: newQty } : c,
  //             );
  //     } else {
  //       if (delta <= 0 || currentTotal >= MAX) return prev;
  //       next = [...prev, { passId, qty: 1 }];
  //     }
  //     return next;
  //   });
  // };
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="pt-32 pb-24 text-left min-h-screen flex flex-col">
      <div className="mx-auto max-w-400 px-6 lg:px-12 flex flex-col flex-1">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <PageHeader
            tag="Pit Lane"
            title={
              <>
                Choose
                <br />
                your seat.
              </>
            }
            className="mb-0"
          />
        </div>

        {/* Coming Soon */}
        <div className="flex-1 flex items-center justify-center">
          <ComingSoonCard
            title={
              <>
                Passes Opening <br className="hidden sm:block" />
                <span className="text-primary">Very Soon.</span>
              </>
            }
            description="We're finalising the pass tiers and pricing for E-Summit 2026. Registration will open shortly — stay tuned for the announcement."
          />
        </div>

        
        {/* ── PASS GRID (uncomment when passes go live) ────────────────────────── */}

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PASSES.map((p) => {
            const item = cart.find((c) => c.passId === p.id);
            const qty = item?.qty ?? 0;
            return (
              <PassCard
                key={p.id}
                pass={p}
                qty={qty}
                totalQty={totalQty}
                maxQty={MAX}
                onIncrement={() => update(p.id, 1)}
                onDecrement={() => update(p.id, -1)}
              />
            );
          })}
        </div>

        {totalQty > 0 && (
          <div className="mt-12 fixed bottom-4 left-0 right-0 mx-auto w-full max-w-400 lg:sticky lg:bottom-4 bg-card/90 backdrop-blur-md border border-border/30 p-4 sm:p-6 flex flex-wrap justify-between items-center gap-4 z-50 shadow-lg rounded-2xl">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Order total ({totalQty} of {MAX} max)
              </div>
              <div className="font-display text-3xl sm:text-4xl text-primary mt-1">
                ₹{total}
              </div>
            </div>
            <Button
              onClick={() => setCheckoutOpen(true)}
              variant="primary"
              className="px-8 py-4"
            >
              Checkout →
            </Button>
          </div>
        )} */}

        {/* ─────────────────────────────────────────────────────────────────────── */}
      </div>

      {/* {checkoutOpen && (
        <CheckoutModal
          cart={cart}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onDone={() => {
            setCart([]);
            setCheckoutOpen(false);
          }}
        />
      )}
      {statusOpen && <OrderStatusModal onClose={() => setStatusOpen(false)} />} */}
    </div>
  );
}
