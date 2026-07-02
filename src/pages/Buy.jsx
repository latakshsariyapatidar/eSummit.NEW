import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { PASSES } from "@/lib/store";
import { PassCard } from "@/components/PassCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ComingSoonCard } from "@/components/ComingSoonCard";

// Modular Form Step Components
import { AttendeeDetailsForm } from "@/components/AttendeeDetailsForm";
import { PaymentGatewayModal } from "@/components/PaymentGatewayModal";
import { OrderSuccessScreen } from "@/components/OrderSuccessScreen";

const MAX = 5;
const BASE_URL = "https://iic.iitdh.ac.in/esummit/api/api";

export function Buy() {
  useDocumentTitle("Get Your Pass — E-Summit 2026");

  const [cart, setCart] = useLocalStorage("es26_cart", []);
  const [step, setStep] = useState("selection"); // 'selection' | 'details' | 'payment' | 'status'

  const [attendeeDetails, setAttendeeDetails] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ═══════════════════════════════════════════════════════════════
  // REFACTOR: AUTOMATIC SOLD OUT STORAGE PURGE
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    // Check if any item currently in the cart belongs to a tier that is now sold out
    const hasSoldOutItems = cart.some((item) => {
      const passInfo = PASSES.find((p) => p.id === item.passId);
      return passInfo
        ? passInfo.soldOut || passInfo.availableSlots === 0
        : false;
    });

    if (hasSoldOutItems) {
      setCart((prevCart) =>
        prevCart.filter((item) => {
          const passInfo = PASSES.find((p) => p.id === item.passId);
          // Keep the item only if the pass exists and is NOT sold out
          return passInfo
            ? !(passInfo.soldOut || passInfo.availableSlots === 0)
            : false;
        }),
      );
    }
  }, [cart, setCart]);

  const totalQty = cart.reduce((a, c) => a + c.qty, 0);
  const total = cart.reduce((a, c) => {
    const p = PASSES.find((pass) => pass.id === c.passId);
    return a + (p?.price ?? 0) * c.qty;
  }, 0);

  const update = (passId, delta) => {
    // Extra safety safeguard: block incoming updates if the target ticket tier is sold out
    const targetPass = PASSES.find((p) => p.id === passId);
    if (targetPass && (targetPass.soldOut || targetPass.availableSlots === 0))
      return;

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
      const passInfo = PASSES.find((p) => p.id === item.passId);
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
      const response = await fetch(`${BASE_URL}/orders/submit`, {
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
    } catch (err) {
      setError("Network failure. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUtrSubmission = async (utrValue) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/orders/utr`, {
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
    } catch (err) {
      setError("Network error. Could not post UTR verification details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 text-left min-h-screen flex flex-col bg-background text-foreground relative">
      <div className="w-full flex items-center justify-center">
        <ComingSoonCard
          title="Coming Soon"
          description="We're working hard to bring you the best experience. Check back soon!"
          ctaText="Notify Me"
          ctaHref="#"
        />
      </div>
    </div>
  );
}
