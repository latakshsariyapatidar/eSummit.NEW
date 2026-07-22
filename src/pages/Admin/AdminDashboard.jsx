import { useEffect, useState } from "react";
import { useTransitionNavigate } from "../../hooks/useTransitionNavigate";
import { API_BASE } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { toast } from "sonner";
import { ScanPanel } from "./ScanPanel";

export function AdminDashboard() {
  const navigate = useTransitionNavigate();
  const [orders, setOrders] = useState([]);
  const [verifiedOrders, setVerifiedOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingVerified, setLoadingVerified] = useState(true);
  const [tab, setTab] = useState("orders");

  useDocumentTitle("Dashboard — E-Summit Admin");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!sessionStorage.getItem("auth_token")) {
      navigate("/admin");
      return;
    }

    fetchPendingOrders();
    fetchVerifiedOrders();
  }, []);

  const stats = {
    total: orders.length + verifiedOrders.length,
    revenue: verifiedOrders.reduce((a, o) => a + (o.amount || 0), 0),
    pending: orders.length,
    verified: verifiedOrders.length,
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/admin");
  };

  const fetchPendingOrders = async () => {
    try {
      setLoadingOrders(true);

      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");

      const res = await fetch(`${API_BASE}/orders/admin/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Admin-Key": adminKey,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to fetch orders");
      }

      setOrders(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchVerifiedOrders = async () => {
    try {
      setLoadingVerified(true);

      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");

      const res = await fetch(`${API_BASE}/orders/admin/verified`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Admin-Key": adminKey,
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || "Failed to fetch verified orders");
      }

      setVerifiedOrders(json.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoadingVerified(false);
    }
  };

  return (
    <div className="pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 text-left">
      <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
        <PageHeader
          tag="Pit Wall"
          title="Admin Console."
          titleClassName="text-5xl md:text-7xl lg:text-7xl"
          className="mb-0"
        />
        <Button
          onClick={logout}
          variant="secondary"
          className="px-4 py-2 hover:border-signal hover:text-signal"
        >
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { l: "Total Orders", v: stats.total },
          { l: "Revenue", v: `₹${stats.revenue}` },
          { l: "Pending", v: stats.pending },
          { l: "Verified", v: stats.verified },
        ].map((s) => (
          <div
            key={s.l}
            className="border border-border bg-card p-6 rounded-2xl"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {s.l}
            </div>
            <div className="font-display text-4xl mt-2 text-primary">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
        {[
          { id: "orders", label: "Pending Orders" },
          { id: "verified", label: "Verified Orders" },
          { id: "passes", label: "Passes" },
          { id: "scan", label: "Scan" },
          { id: "settings", label: "Settings" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 font-mono text-xs uppercase tracking-widest whitespace-nowrap ${
              tab === t.id
                ? "border-b-2 border-primary text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="space-y-3">
          {loadingOrders ? (
            <p className="text-muted-foreground">Loading pending orders...</p>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground">No pending orders.</p>
          ) : (
            orders.map((o) => (
              <div
                key={o.orderId}
                onClick={() => navigate(`/admin/${o.orderId}`)}
                className="border border-border bg-card p-5 grid md:grid-cols-[1fr_auto] gap-4 rounded-2xl cursor-pointer hover:border-primary transition"
              >
                <div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="font-mono text-xs">{o.orderId}</span>

                    <span
                      className={`font-mono text-[10px] uppercase px-2 py-0.5 ${
                        o.status === "verified"
                          ? "bg-primary text-primary-foreground"
                          : o.status === "rejected"
                            ? "bg-signal text-foreground"
                            : "bg-muted text-foreground"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>

                  <div className="font-display text-2xl mt-1">₹{o.amount}</div>

                  <div className="text-xs text-muted-foreground mt-1">
                    UTR: {o.paymentUTR} · {o.passRequests?.length || 0} passes ·{" "}
                    {new Date(o.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "verified" && (
        <VerifiedOrdersPanel
          verifiedOrders={verifiedOrders}
          loading={loadingVerified}
          onRefresh={fetchVerifiedOrders}
          navigate={navigate}
        />
      )}

      {tab === "passes" && <PassesPanel />}
      {tab === "scan" && <ScanPanel />}
      {tab === "settings" && <SettingsPanel />}
    </div>
  );
}

function PassesPanel() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPasses = async () => {
    try {
      const res = await fetch(`${API_BASE}/content/passes`);
      if (!res.ok) throw new Error("Failed to fetch passes");
      const json = await res.json();
      if (json.status === "success") {
        setPasses(json.data || []);
      }
    } catch (err) {
      toast.error("Error loading passes from backend");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPasses();
  }, []);

  const toggle = async (p) => {
    const targetSoldOut = !p.soldOut;
    try {
      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");
      const res = await fetch(`${API_BASE}/content/passes/${p.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "X-Admin-Key": adminKey || "",
        },
        body: JSON.stringify({ soldOut: targetSoldOut }),
      });
      const json = await res.json();
      if (json.status === "success") {
        toast.success(
          `Pass is now ${targetSoldOut ? "Sold out" : "Available"}`,
        );
        setPasses((prev) =>
          prev.map((pass) =>
            pass.id === p.id ? { ...pass, soldOut: targetSoldOut } : pass,
          ),
        );
      } else {
        toast.error(json.message || "Failed to update pass status");
      }
    } catch (err) {
      toast.error("Network error updating pass status");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading passes...</div>;
  }

  return (
    <div className="space-y-3">
      {passes.length === 0 && (
        <p className="text-muted-foreground">
          No passes configured in backend.
        </p>
      )}
      {passes.map((p) => (
        <div
          key={p.id}
          className="border border-border bg-card p-5 flex justify-between items-center rounded-2xl"
        >
          <div className="text-left">
            <div className="font-display text-2xl">{p.name}</div>
            <div className="font-mono text-xs text-muted-foreground">
              ₹{p.price}
            </div>
          </div>
          <Button
            onClick={() => toggle(p)}
            variant={p.soldOut ? "signal" : "primary"}
            className="px-4 py-2"
          >
            {p.soldOut ? "Sold out" : "Available"}
          </Button>
        </div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  const [settings, setSettings] = useState({
    events: "yes",
    sponsors: "yes",
    faqs: "yes",
    schedule: "yes",
    teams: "yes",
    passes: "yes",
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    const keys = ["events", "sponsors", "faqs", "schedule", "teams", "passes"];
    const results = {};
    try {
      await Promise.all(
        keys.map(async (key) => {
          const res = await fetch(`${API_BASE}/content/${key}/status`);
          if (res.ok) {
            const json = await res.json();
            results[key] = json.data || "yes";
          } else {
            results[key] = "yes";
          }
        }),
      );
      setSettings(results);
    } catch (err) {
      toast.error("Error loading page statuses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const toggle = async (key) => {
    const nextVal = settings[key] === "yes" ? "no" : "yes";
    try {
      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key");
      const res = await fetch(`${API_BASE}/content/${key}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "X-Admin-Key": adminKey || "",
        },
        body: JSON.stringify({ status: nextVal }),
      });
      const json = await res.json();
      if (json.status === "success") {
        toast.success(`${key} status set to ${nextVal}`);
        setSettings((prev) => ({ ...prev, [key]: nextVal }));
      } else {
        toast.error(json.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Network error updating page status");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
        Page & Section Availability
      </div>
      <div className="space-y-3">
        {Object.entries(settings).map(([key, val]) => (
          <div
            key={key}
            className="border border-border bg-card p-5 flex justify-between items-center rounded-2xl"
          >
            <div className="text-left">
              <div className="font-display text-2xl capitalize">{key}</div>
              <div className="font-mono text-xs text-muted-foreground">
                Current status:{" "}
                {val === "yes"
                  ? "Active (Fetching data)"
                  : "Inactive (Coming Soon)"}
              </div>
            </div>
            <Button
              onClick={() => toggle(key)}
              variant={val === "yes" ? "primary" : "signal"}
              className="px-4 py-2"
            >
              {val === "yes" ? "Deactivate" : "Activate"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerifiedOrdersPanel({ verifiedOrders, loading, navigate }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  if (loading) {
    return <p className="text-muted-foreground py-4">Loading verified orders...</p>;
  }

  if (!verifiedOrders || verifiedOrders.length === 0) {
    return <p className="text-muted-foreground py-4">No verified orders found.</p>;
  }

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {verifiedOrders.length} Verified Orders
        </span>
      </div>

      <div className="space-y-3">
        {verifiedOrders.map((o) => {
          const isExpanded = expandedOrderId === o.orderId;
          const passCount = o.passes?.length || o.passRequests?.length || 0;

          return (
            <div
              key={o._id || o.orderId}
              className="border border-border bg-card rounded-2xl overflow-hidden transition"
            >
              <div
                onClick={() => toggleExpand(o.orderId)}
                className="p-5 flex flex-wrap justify-between items-center gap-4 cursor-pointer hover:bg-muted/20"
              >
                <div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {o.orderId}
                    </span>
                    <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-emerald-500/15 text-emerald-500 rounded border border-emerald-500/20 font-bold">
                      VERIFIED
                    </span>
                  </div>

                  <div className="font-display text-2xl mt-1 text-primary">
                    ₹{o.amount}
                  </div>

                  <div className="text-xs text-muted-foreground mt-1">
                    UTR: <span className="font-mono">{o.paymentUTR || "N/A"}</span> ·{" "}
                    {passCount} {passCount === 1 ? "pass" : "passes"} · Verified{" "}
                    {o.verifiedAt ? new Date(o.verifiedAt).toLocaleString() : "N/A"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    className="text-xs px-3 py-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(o.orderId);
                    }}
                  >
                    {isExpanded ? "Hide Details ▲" : "View Details ▼"}
                  </Button>
                </div>
              </div>

              {/* EXPANDED DETAILS SECTION */}
              {isExpanded && (
                <div className="p-5 border-t border-border bg-background/50 space-y-6">
                  {/* Order Overview & Payment Meta */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm bg-card p-4 rounded-xl border border-border/50">
                    <div>
                      <span className="text-xs font-mono uppercase text-muted-foreground block">
                        Payment UTR
                      </span>
                      <span className="font-mono font-semibold">{o.paymentUTR || "N/A"}</span>
                    </div>
                    {o.paymentUPI && (
                      <div>
                        <span className="text-xs font-mono uppercase text-muted-foreground block">
                          UPI ID
                        </span>
                        <span className="font-mono">{o.paymentUPI}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-mono uppercase text-muted-foreground block">
                        Verified Date
                      </span>
                      <span>
                        {o.verifiedAt ? new Date(o.verifiedAt).toLocaleString() : "N/A"}
                      </span>
                    </div>
                    {o.verifiedBy && (
                      <div>
                        <span className="text-xs font-mono uppercase text-muted-foreground block">
                          Verified By Admin ID
                        </span>
                        <span className="font-mono text-xs">{o.verifiedBy}</span>
                      </div>
                    )}
                    {o.paymentScreenshot && (
                      <div className="sm:col-span-2">
                        <span className="text-xs font-mono uppercase text-muted-foreground block">
                          Payment Screenshot
                        </span>
                        <a
                          href={o.paymentScreenshot}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary underline hover:text-primary/80 font-mono"
                        >
                          View Screenshot Document ↗
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Generated Passes Section */}
                  {o.passes?.length > 0 && (
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                        Generated Passes ({o.passes.length})
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {o.passes.map((p, idx) => (
                          <div
                            key={p._id || p.passId || idx}
                            className="border border-border/80 bg-card p-4 rounded-xl flex gap-3 items-start justify-between"
                          >
                            <div className="space-y-1 text-xs min-w-0 flex-1">
                              <div className="font-display text-base font-bold text-foreground truncate">
                                {p.attendeeName}
                              </div>
                              {p.eventName && (
                                <div className="text-xs font-mono text-primary font-medium truncate">
                                  {p.eventName}
                                </div>
                              )}
                              <div className="font-mono text-[10px] text-muted-foreground">
                                ID: {p.passId}
                              </div>
                              <div className="text-muted-foreground">
                                <b>Type:</b> {p.type} (₹{p.price})
                              </div>
                              <div className="text-muted-foreground truncate">
                                <b>Email:</b> {p.attendeeEmail}
                              </div>
                              <div className="text-muted-foreground truncate">
                                <b>College:</b> {p.collegeName || "N/A"}
                              </div>
                              <div className="pt-1">
                                <span
                                  className={`inline-block font-mono text-[9px] uppercase px-2 py-0.5 rounded ${
                                    p.checkedIn
                                      ? "bg-amber-500/15 text-amber-500 border border-amber-500/20 font-bold"
                                      : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"
                                  }`}
                                >
                                  {p.checkedIn ? "Checked In" : "Status: Active"}
                                </span>
                              </div>
                            </div>
                            {p.qr && (
                              <img
                                src={p.qr}
                                alt="Pass QR"
                                className="w-20 h-20 bg-white p-1 rounded-lg border border-zinc-200 shrink-0"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fallback to Pass Requests if passes array not populated */}
                  {(!o.passes || o.passes.length === 0) && o.passRequests?.length > 0 && (
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
                        Pass Requests ({o.passRequests.length})
                      </div>
                      <div className="space-y-2">
                        {o.passRequests.map((pr, idx) => (
                          <div
                            key={idx}
                            className="border border-border/80 bg-card p-3.5 rounded-xl text-xs flex flex-wrap justify-between items-center gap-2"
                          >
                            <div>
                              <div className="font-bold text-sm text-foreground">{pr.attendeeName}</div>
                              {pr.eventName && (
                                <div className="font-mono text-primary text-[11px]">{pr.eventName}</div>
                              )}
                              <div className="text-muted-foreground">{pr.attendeeEmail} · {pr.collegeName}</div>
                            </div>
                            <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-muted rounded">
                              {pr.passType} (₹{pr.passPrice})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <Button
                      variant="secondary"
                      className="text-xs"
                      onClick={() => navigate(`/admin/${o.orderId}`)}
                    >
                      Open Full Order Admin View →
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
