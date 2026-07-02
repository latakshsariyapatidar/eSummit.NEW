import { Button } from "@/components/ui/Button";

export function OrderSuccessScreen({ onReset }) {
  return (
    <div className="max-w-md mx-auto w-full bg-card border border-success/30 p-8 rounded-3xl shadow-xl text-center space-y-6 my-auto">
      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
        ✓
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Order Created Successfully!
        </h2>
        <p className="text-sm text-muted-foreground px-2">
          Your payment declaration (UTR) has been securely logged. Our backend
          administrators are now validating the transfer statement.
        </p>
      </div>
      <blockquote className="bg-background border border-border/40 p-4 rounded-xl text-xs text-left text-muted-foreground font-mono leading-relaxed">
        <strong>Notice:</strong> This process normally resolves in standard
        operational bursts. Once approved, individual entrance tickets carrying
        your personalized QR pass vectors will flash directly into your
        registered emails.
      </blockquote>
      <Button variant="secondary" onClick={onReset} className="w-full">
        Back to Home
      </Button>
    </div>
  );
}
