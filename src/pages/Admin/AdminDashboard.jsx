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
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [tab, setTab] = useState("orders");

  useDocumentTitle("Dashboard — E-Summit Admin");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!sessionStorage.getItem("auth_token")) {
      navigate("/admin");
      return;
    }

    fetchPendingOrders();
  }, []);

  // const updateStatus = (id, status) => {
  //   const next = orders.map((o) => (o.orderId === id ? { ...o, status } : o));
  //   setOrders(next);
  // };

  const stats = {
    total: orders.length,
    revenue: orders
      .filter((o) => o.status === "verified")
      .reduce((a, o) => a + o.amount, 0),
    pending: orders.filter((o) => o.status === "payment_submitted").length,
    verified: orders.filter((o) => o.status === "verified").length,
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
      console.log(json);
      console.log(json.data);

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

      <div className="flex gap-2 mb-8 border-b border-border">
        {["orders", "passes", "scan", "settings"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 font-mono text-xs uppercase tracking-widest ${
              tab === t
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="space-y-3">
          {loadingOrders ? (
            <p className="text-muted-foreground">Loading orders...</p>
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
