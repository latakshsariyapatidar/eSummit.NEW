import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTransitionNavigate } from "../../hooks/useTransitionNavigate"; // NEW — adjust path if this file lives elsewhere relative to the hook
import { API_BASE } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

const DASHBOARD_PATH = "/admin/malikKiKursi";

export function AdminOrderDetails() {
  const { orderId } = useParams();
  const navigate = useTransitionNavigate(); // NEW

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [pendingIds, setPendingIds] = useState([]);
  const [actionResult, setActionResult] = useState(null); // { type: "approved" | "rejected" | "error", message, passes?, reason? }
  const [pinnedNextOrderId, setPinnedNextOrderId] = useState(null); // NEW — locks in "next" once an action succeeds, so refetching pendingIds doesn't wipe it

  useEffect(() => {
    setPinnedNextOrderId(null); // NEW — this is a fresh order, don't carry over the previous one's pinned target
    setActionResult(null); // NEW — don't show the previous order's success/error banner on a new order
    fetchOrder();
    fetchPendingIds();
  }, [orderId]);

  // NEW: fetch the current pending queue so we know what "next order" means,
  // independent of how the user arrived at this page (click-through or direct URL)
  const fetchPendingIds = async () => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");

      const res = await fetch(`${API_BASE}/orders/admin/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Admin-Key": adminKey,
        },
      });

      let json;
      try {
        json = await res.json();
      } catch {
        return;
      }

      if (!res.ok) return;

      setPendingIds((json.data || []).map((o) => o.orderId));
    } catch (err) {
      console.error(err);
      // non-blocking — if this fails, the Next button just won't show
    }
  };

  const fetchOrder = async () => {
    try {
      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");

      const res = await fetch(`${API_BASE}/orders/admin/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Admin-Key": adminKey,
        },
      });

      let json;
      try {
        json = await res.json();
      } catch {
        throw new Error(
          "Server returned an unexpected response. Please try again.",
        );
      }

      if (!res.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      setOrder(json.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveOrder = async () => {
    if (actionLoading) return;

    try {
      setActionLoading(true);
      setActionResult(null); // NEW

      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");

      const res = await fetch(`${API_BASE}/orders/admin/${orderId}/approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Admin-Key": adminKey,
        },
      });

      let json;
      try {
        json = await res.json();
      } catch {
        throw new Error(
          "Server returned an unexpected response. Please try again.",
        );
      }

      if (!res.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      toast.success(json.message);
      setActionResult({
        type: "approved",
        message: json.message,
        passes: json.data?.passes || [],
      });

      // NEW: lock in "next" using the list as it stood before this order left it —
      // otherwise the refetch below removes this order and the lookup returns null
      const idxAtSuccess = pendingIds.indexOf(orderId);
      setPinnedNextOrderId(
        idxAtSuccess !== -1 && idxAtSuccess < pendingIds.length - 1
          ? pendingIds[idxAtSuccess + 1]
          : null,
      );

      fetchOrder();
      fetchPendingIds(); // this order just left the pending queue
    } catch (err) {
      toast.error(err.message);
      setActionResult({ type: "error", message: err.message }); // NEW — inline fallback, doesn't need Toaster mounted
    } finally {
      setActionLoading(false);
    }
  };

  const rejectOrder = async () => {
    if (actionLoading) return;

    const reason = rejectReason.trim();
    if (!showRejectInput) {
      // first click just reveals the reason field
      setShowRejectInput(true);
      return;
    }

    if (reason.length < 5) {
      toast.error("Please provide a rejection reason (min 5 characters).");
      return;
    }

    try {
      setActionLoading(true);
      setActionResult(null); // NEW

      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");

      const res = await fetch(`${API_BASE}/orders/admin/${orderId}/reject`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Admin-Key": adminKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason,
        }),
      });

      let json;
      try {
        json = await res.json();
      } catch {
        throw new Error(
          "Server returned an unexpected response. Please try again.",
        );
      }

      if (!res.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      toast.success(json.message);
      setActionResult({
        type: "rejected",
        message: json.message,
        reason: json.data?.rejectedReason,
      });

      // lock in "next" using the list as it stood before this order left it
      const idxAtSuccess = pendingIds.indexOf(orderId);
      setPinnedNextOrderId(
        idxAtSuccess !== -1 && idxAtSuccess < pendingIds.length - 1
          ? pendingIds[idxAtSuccess + 1]
          : null,
      );

      setRejectReason("");
      setShowRejectInput(false);
      fetchOrder();
      fetchPendingIds(); // this order just left the pending queue
    } catch (err) {
      toast.error(err.message);
      setActionResult({ type: "error", message: err.message }); // NEW — inline fallback, doesn't need Toaster mounted
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div className="pt-40 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="pt-40 text-center">Order not found.</div>;
  }

  // figure out what comes after this order in the pending queue, if anything.
  // Once an action succeeds, pinnedNextOrderId takes over — it was captured
  // before the refetch removed this order from the list, so it stays correct.
  const currentIndex = pendingIds.indexOf(orderId);
  const liveNextOrderId =
    currentIndex !== -1 && currentIndex < pendingIds.length - 1
      ? pendingIds[currentIndex + 1]
      : null;
  const nextOrderId =
    pinnedNextOrderId !== null ? pinnedNextOrderId : liveNextOrderId;

  return (
    <div className="max-w-5xl mx-auto pt-32 pb-20 px-6">
      {/* NEW: back to dashboard */}
      <button
        onClick={() => navigate(DASHBOARD_PATH)}
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition mb-6"
      >
        ← Back to Dashboard
      </button>

      <PageHeader tag="Order" title={order.orderId} />

      <div className="space-y-4 mt-10">
        <div>
          <b>Status:</b> {order.status}
        </div>

        <div>
          <b>Amount:</b> ₹{order.amount}
        </div>

        <div>
          <b>UTR:</b> {order.paymentUTR}
        </div>

        <div>
          <b>Passes:</b> {order.passRequests?.length || 0}
        </div>
      </div>

      {/* NEW: persistent confirmation banner using the backend's real response, not a hardcoded string */}
      {actionResult && (
        <div
          className={`mt-10 rounded-2xl border p-5 ${
            actionResult.type === "approved"
              ? "border-emerald-600"
              : actionResult.type === "rejected"
                ? "border-signal"
                : "border-rose-600"
          }`}
        >
          <div
            className={`font-bold text-lg ${
              actionResult.type === "approved"
                ? "text-emerald-600"
                : actionResult.type === "rejected"
                  ? "text-signal"
                  : "text-rose-600"
            }`}
          >
            {actionResult.type === "approved" && "✓ "}
            {actionResult.type === "rejected" && "✕ "}
            {actionResult.type === "error" && "⚠ "}
            {actionResult.message}
          </div>

          {actionResult.type === "approved" &&
            actionResult.passes?.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Passes Generated
                </div>
                {/* {actionResult.passes.map((p) => (
                                <div key={p.passId} className="text-sm border-t border-border pt-2">
                                    <div><b>Pass ID:</b> {p.passId}</div>
                                    <div><b>Attendee:</b> {p.attendeeName}</div>
                                    <div><b>Email:</b> {p.attendeeEmail}</div>
                                </div>
                            ))} */}
              </div>
            )}

          {actionResult.type === "rejected" && actionResult.reason && (
            <div className="mt-3 text-sm">
              <b>Reason:</b> {actionResult.reason}
            </div>
          )}
        </div>
      )}

      {/* NEW: Attendee / Pass details — one card per entry in order.passRequests */}
      {order.passRequests?.length > 0 && (
        <div className="mt-10">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Attendee & Pass Details
          </div>

          <div className="space-y-3">
            {order.passRequests.map((p, i) => (
              <div
                key={i}
                className="border border-border bg-card p-5 rounded-2xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-display text-xl">{p.attendeeName}</div>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-muted text-foreground">
                    {p.passType}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <div>
                    <b>Email:</b> {p.attendeeEmail}
                  </div>
                  <div>
                    <b>Gender:</b> {p.attendeeGender}
                  </div>
                  <div>
                    <b>College:</b> {p.collegeName}
                  </div>
                  <div>
                    <b>Price:</b> ₹{p.passPrice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showRejectInput && (
        <div className="mt-6">
          <input
            type="text"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Reason for rejection (min 5 characters)"
            disabled={actionLoading}
            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary disabled:opacity-50"
          />
        </div>
      )}

      <div className="flex gap-3 mt-10">
        <Button
          variant="primary"
          onClick={approveOrder}
          disabled={actionLoading}
        >
          Verify
        </Button>

        <Button variant="signal" onClick={rejectOrder} disabled={actionLoading}>
          Reject
        </Button>

        {/* NEW: only shown if there's another pending order after this one */}
        {nextOrderId && (
          <Button
            variant="secondary"
            onClick={() => navigate(`/admin/${nextOrderId}`)}
            disabled={actionLoading}
          >
            Next Pending Order →
          </Button>
        )}
      </div>
    </div>
  );
}
