import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { fetchPasses, API_BASE } from "@/lib/store";
import { PassCard } from "@/components/Passes/PassCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ComingSoonCard } from "@/components/ComingSoon/ComingSoonCard";


// Modular Form Step Components
import { AttendeeDetailsForm } from "@/components/OrderPurchaseComponents/AttendeeDetailsForm";
import { PaymentGatewayModal } from "@/components/OrderPurchaseComponents/PaymentGatewayModal";
import { OrderSuccessScreen } from "@/components/OrderPurchaseComponents/OrderSuccessScreen";

// This is the maximum passes a person can purchase in a single order.
const MAX = 4;

export function Buy() {
  useDocumentTitle("Get Your Pass — E-Summit 2026");

  const [passes, setPasses] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [cart, setCart] = useLocalStorage("es26_cart", []);
  const [step, setStep] = useState("selection"); // 'selection' | 'details' | 'payment' | 'status'

  const [attendeeDetails, setAttendeeDetails] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPasses()
      .then((data) => {
        setPasses(data || []);
        setPageLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching passes:", err);
        setPageLoading(false);
      });
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // REFACTOR: AUTOMATIC SOLD OUT STORAGE PURGE
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    // Check if any item currently in the cart belongs to a tier that is now sold out
    const hasSoldOutItems = cart.some((item) => {
      const passInfo = passes.find((p) => (p.id || p._id) === item.passId);
      return passInfo ? passInfo.soldOut : false;
    });

    if (hasSoldOutItems) {
      setCart((prevCart) =>
        prevCart.filter((item) => {
          const passInfo = passes.find((p) => (p.id || p._id) === item.passId);
          // Keep the item only if the pass exists and is NOT sold out
          return passInfo ? !passInfo.soldOut : false;
        }),
      );
    }
  }, [cart, setCart, passes]);

  if (pageLoading) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">

      </div>
    );
  }

  const totalQty = cart.reduce((a, c) => a + c.qty, 0);

  const total = cart.reduce((a, c) => {
    const p = passes.find((pass) => (pass.id || pass._id) === c.passId);
    return a + (p?.price ?? 0) * c.qty;
  }, 0);

  const update = (passId, delta) => {
    // Extra safety safeguard: block incoming updates if the target ticket tier is sold out
    const targetPass = passes.find((p) => (p.id || p._id) === passId);
    if (targetPass && targetPass.soldOut) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.passId === passId);
      const currentTotal = prev.reduce((a, c) => a + c.qty, 0);
      if (existing) {
        const newQty = Math.max(0, existing.qty + delta);
        if (delta > 0 && currentTotal >= MAX) return prev;
        return newQty === 0
          ? prev.filter((c) => c.passId !== passId)
          : prev.map((c) => (c.passId === passId ? { ...c, qty: newQty } : c));
      } else {
        if (delta <= 0 || currentTotal >= MAX) return prev;
        return [...prev, { passId, qty: 1 }];
      }
    });
  };

  const handleProceedToDetails = () => {
    const detailsArray = [];
    cart.forEach((item) => {
      const passInfo = passes.find((p) => (p.id || p._id) === item.passId);
      for (let i = 0; i < item.qty; i++) {
        detailsArray.push({
          passType: passInfo?.name || "General Pass",
          passPrice: passInfo?.price || 0,
          attendeeName: "",
          attendeeEmail: "",
          attendeeGender: "Male",
          collegeName: "",
        });
      }
    });
    setAttendeeDetails(detailsArray);
    setStep("details");
  };

  const handleDetailsChange = (index, field, value) => {
    setAttendeeDetails((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/orders/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartValue: total, passes: attendeeDetails }),
      });

      const resData = await response.json();
      if (resData.status === "success") {
        setOrderData(resData.data);
        setStep("payment");
      } else {
        setError(resData.message || "Validation failed.");
      }
    } catch {
      setError("Network failure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUtrSubmission = async (utrValue) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE}/orders/utr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderData.orderId, utr: utrValue }),
      });

      const resData = await response.json();
      if (resData.status === "success") {
        setCart([]);
        setStep("status");
      } else {
        setError(resData.message || "Failed to submit UTR statement.");
      }
    } catch {
      setError("Network error. Could not post UTR verification details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 text-left min-h-screen flex flex-col bg-background text-foreground relative">
      <div className="mx-auto w-full max-w-400 px-6 lg:px-12 flex flex-col flex-1">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* STEP 1: SELECTION */}
        {step === "selection" && (
          <>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mx-auto w-full max-w-6xl flex-1">
              {passes.length > 0 ? (
                passes.map((p) => {
                  const passId = p.id || p._id;
                  const item = cart.find((c) => c.passId === passId);
                  return (
                    <PassCard
                      key={passId}
                      pass={p}
                      qty={item?.qty ?? 0}
                      totalQty={totalQty}
                      maxQty={MAX}
                      onIncrement={() => update(passId, 1)}
                      onDecrement={() => update(passId, -1)}
                    />
                  );
                })
              ) : (
                <div className="col-span-full text-center text-muted-foreground rounded-xl flex items-center justify-center">
                  <ComingSoonCard
                    title="No passes available"
                    description="Check back later for updates."
                    ctaText="Go To Home"
                    ctaHref="/"
                  />
                </div>
              )}
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
                  onClick={handleProceedToDetails}
                  variant="primary"
                  className="px-8 py-4"
                >
                  Enter Details →
                </Button>
              </div>
            )}
          </>
        )}

        {/* STEP 2: DETAILS */}
        {step === "details" && (
          <AttendeeDetailsForm
            attendeeDetails={attendeeDetails}
            onDetailsChange={handleDetailsChange}
            onSubmit={handleSubmitOrder}
            onBack={() => setStep("selection")}
            loading={loading}
            total={total}
          />
        )}

        {/* STEP 3: PAYMENT */}
        {step === "payment" && orderData && (
          <PaymentGatewayModal
            orderData={orderData}
            onSubmitUtr={handleUtrSubmission}
            loading={loading}
          />
        )}

        {/* STEP 4: SUCCESS */}
        {step === "status" && (
          <OrderSuccessScreen onReset={() => setStep("selection")} />
        )}
      </div>
    </div>
  );
}
