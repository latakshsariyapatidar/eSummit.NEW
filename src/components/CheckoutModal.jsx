import { useState } from "react";
import { PASSES, UPI_IDS } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Field } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makePassId(email, phone) {
  const e = btoa(email).slice(0, 8);
  const p = btoa(phone).slice(-4);
  return `${e}${p}`.toUpperCase();
}

export function CheckoutModal({ cart, total, onClose, onDone }) {
  const flat = cart.flatMap((c) =>
    Array.from({ length: c.qty }).map((_, i) => ({ passId: c.passId, idx: i })),
  );

  const [buyer, setBuyer] = useState({ phone: "", email: "", gender: "" });
  const [utr, setUtr] = useState("");
  const [attendees, setAttendees] = useState(
    flat.map((f) => ({
      passId: f.passId,
      name: "",
      email: "",
      gender: "",
      college: "",
    })),
  );
  const [done, setDone] = useState(null);

  // Rotate/select a UPI ID from store list on component mount
  const [upiIndex] = useState(() => {
    return Math.floor(Math.random() * (UPI_IDS?.length || 1));
  });
  const activeUpiId =
    UPI_IDS && UPI_IDS[upiIndex] ? UPI_IDS[upiIndex] : "esummit@iitdh";

  const upiUrl = `upi://pay?pa=${activeUpiId}&pn=ESummit%20IIT%20Dharwad&am=${total}&cu=INR&tn=ESummit26%20Pass`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUrl)}`;

  const setAtt = (i, key, v) =>
    setAttendees((a) => a.map((x, j) => (j === i ? { ...x, [key]: v } : x)));

  const valid =
    /^\d{10}$/.test(buyer.phone) &&
    EMAIL_RE.test(buyer.email) &&
    buyer.gender &&
    /^\d{12}$/.test(utr) &&
    attendees.every(
      (a) =>
        a.name.trim() && EMAIL_RE.test(a.email) && a.gender && a.college.trim(),
    );

  const submit = () => {
    const passIds = attendees.map((a) => makePassId(a.email, buyer.phone));
    const order = {
      id: `ORD-${Date.now()}`,
      phone: buyer.phone,
      email: buyer.email,
      total,
      utr,
      status: "pending",
      passes: attendees.map((a, i) => ({ ...a, passId: passIds[i] })),
      createdAt: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem("es26_orders") || "[]");
    orders.push(order);
    localStorage.setItem("es26_orders", JSON.stringify(orders));
    setDone({ id: order.id, passes: passIds });
  };

  if (done) {
    return (
      <Modal onClose={onDone}>
        <div className="text-center py-8">
          <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            Order placed — pending verification
          </div>
          <h2 className="font-display text-4xl sm:text-5xl mb-6">
            You're on the grid.
          </h2>
          <p className="text-muted-foreground mb-6">
            Order ID:{" "}
            <span className="font-mono text-foreground">{done.id}</span>
          </p>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Pass IDs
          </div>
          <div className="space-y-1">
            {done.passes.map((p) => (
              <div key={p} className="font-mono text-primary">
                {p}
              </div>
            ))}
          </div>
          <Button
            onClick={onDone}
            variant="primary"
            size="lg"
            className="mt-8 mx-auto"
          >
            Done
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="text-left">
        <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
          Checkout
        </div>
        <h2 className="font-display text-3xl sm:text-4xl mb-8">
          Fuel & ignition.
        </h2>

        <Section title="Buyer">
          <div className="grid gap-4">
            <Field label="Phone (10 digits)">
              <Input
                value={buyer.phone}
                onChange={(e) =>
                  setBuyer({
                    ...buyer,
                    phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
              />
            </Field>
            <Field label="Email">
              <Input
                value={buyer.email}
                onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
              />
            </Field>
            <Field label="Gender">
              <Select
                value={buyer.gender}
                onChange={(e) => setBuyer({ ...buyer, gender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </Field>
          </div>
        </Section>

        <Section title={`Attendee details (${attendees.length})`}>
          <div className="space-y-6">
            {attendees.map((a, i) => {
              const p = PASSES.find((pass) => pass.id === a.passId);
              return (
                <div key={i} className="border border-border p-4 rounded-2xl">
                  <div className="flex justify-between mb-3">
                    <span className="font-display text-lg sm:text-xl">
                      {p.name} — #{i + 1}
                    </span>
                    <span className="font-mono text-xs text-primary">
                      ₹{p.price}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input
                      placeholder="Name"
                      value={a.name}
                      onChange={(e) => setAtt(i, "name", e.target.value)}
                    />
                    <Input
                      placeholder="Email"
                      value={a.email}
                      onChange={(e) => setAtt(i, "email", e.target.value)}
                    />
                    <Select
                      value={a.gender}
                      onChange={(e) => setAtt(i, "gender", e.target.value)}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    <Input
                      placeholder="College"
                      value={a.college}
                      onChange={(e) => setAtt(i, "college", e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Payment">
          <div className="bg-asphalt p-4 sm:p-6 mb-4 border border-border rounded-2xl">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* White card wrapper for high contrast and readability on dark theme */}
              <div className="bg-white p-3 rounded-lg shrink-0 shadow-lg flex items-center justify-center">
                <img
                  src={qrCodeUrl}
                  alt="UPI Payment QR Code"
                  className="w-32.5 h-32.5 object-contain block"
                />
              </div>
              <div className="flex-1 text-left">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Amount payable
                </div>
                <div className="font-display text-4xl text-primary mt-1">
                  ₹{total}
                </div>
                <div className="mt-2.5 font-mono text-[11px] text-muted-foreground space-y-1">
                  <div>
                    Payee:{" "}
                    <span className="text-foreground font-semibold">
                      ESummit IIT Dharwad
                    </span>
                  </div>
                  <div>
                    UPI ID:{" "}
                    <span className="text-foreground font-semibold select-all font-mono">
                      {activeUpiId}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                  Scan QR to pay. After payment, enter the 12-digit UTR below.
                </p>
              </div>
            </div>
          </div>
          <Field label="Payment UTR (12 digits)">
            <Input
              value={utr}
              onChange={(e) =>
                setUtr(e.target.value.replace(/\D/g, "").slice(0, 12))
              }
            />
          </Field>
        </Section>

        <Button
          disabled={!valid}
          onClick={submit}
          variant="primary"
          size="lg"
          className="w-full mt-4"
        >
          Confirm order →
        </Button>
      </div>
    </Modal>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2.5">
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
