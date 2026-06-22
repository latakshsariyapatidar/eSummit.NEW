import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function OrderStatusModal({ onClose }) {
  const [phone, setPhone] = useState("");
  const [results, setResults] = useState(null);

  const search = () => {
    if (!/^\d{10}$/.test(phone)) return;
    const all = JSON.parse(localStorage.getItem("es26_orders") || "[]");
    setResults(all.filter((o) => o.phone === phone));
  };

  return (
    <Modal onClose={onClose} maxWidthClass="max-w-xl">
      <div className="text-left">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
          Order Status
        </div>
        <h2 className="font-display text-4xl mb-6">Track your pass.</h2>
        <div className="flex gap-3">
          <Input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="Enter phone number"
            className="flex-1 px-4 py-3"
          />
          <Button onClick={search} variant="primary" className="px-6 py-3">
            Search
          </Button>
        </div>
        {results && (
          <div className="mt-6 space-y-3 max-h-[50vh] overflow-y-auto no-scrollbar">
            {results.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No orders found for this number.
              </p>
            )}
            {results.map((o) => (
              <div key={o.id} className="border border-border p-4 rounded-2xl">
                <div className="flex justify-between">
                  <span className="font-mono text-xs">{o.id}</span>
                  <span
                    className={`font-mono text-xs uppercase ${
                      o.status === "verified"
                        ? "text-primary"
                        : o.status === "rejected"
                          ? "text-signal"
                          : "text-muted-foreground"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="font-display text-2xl mt-2">₹{o.total}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  UTR: {o.utr} · {new Date(o.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
