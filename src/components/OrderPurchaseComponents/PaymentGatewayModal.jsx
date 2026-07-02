import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export function PaymentGatewayModal({ orderData, onSubmitUtr, loading }) {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [utr, setUtr] = useState("");

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitUtr(utr);
  };

  return (
    <div className="max-w-md mx-auto w-full bg-card border border-border/60 p-6 sm:p-8 rounded-3xl shadow-xl text-center space-y-6">
      <div>
        <span className="font-mono text-xs bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20">
          Awaiting Payment
        </span>
        <h2 className="font-display text-2xl mt-4">Scan & Pay via UPI</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Order ID: {orderData.orderId}
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mx-auto border border-zinc-200">
        <img
          src={orderData.qrBase64}
          alt="UPI Payment QR Code"
          className="w-64 h-64 mx-auto"
        />
      </div>

      <div className="bg-background p-3 rounded-xl border border-border/40">
        <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
          Session Expires In
        </div>
        <div
          className={`font-mono text-xl font-bold mt-0.5 ${timeLeft < 300 ? "text-destructive animate-pulse" : "text-primary"}`}
        >
          {timeLeft > 0 ? formatTime(timeLeft) : "Expired!"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Transaction Reference Number (UTR / Ref No.)
          </label>
          <input
            required
            disabled={timeLeft <= 0 || loading}
            type="text"
            placeholder="e.g. 423100123456"
            className="bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-primary font-mono tracking-widest text-center"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3.5"
          disabled={timeLeft <= 0 || loading}
        >
          {loading ? "Submitting..." : "I Have Paid / Click Done"}
        </Button>
      </form>
    </div>
  );
}
