import { useState } from "react";
import { useTransitionNavigate } from "../../hooks/useTransitionNavigate";
import { PageHeader } from "@/components/ui/PageHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://iic.iitdh.ac.in/esummit/api/api";

export function AdminAuth() {
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useTransitionNavigate();

  useDocumentTitle("Admin Login — E-Summit 2026");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/verify-key`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      if (response.status === 400) {
        setErr("Key field is missing.");
        setLoading(false);
        return;
      }

      if (response.status === 401) {
        setErr("Invalid key. Try again.");
        setLoading(false);
        return;
      }

      if (response.status === 429) {
        setErr("Too many attempts. Please try again later.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setErr("Authentication failed. Please try again.");
        setLoading(false);
        return;
      }

      const result = await response.json();
      const { token, role } = result.data;

      console.log("✅ Login successful:", {
        token: token?.substring(0, 20) + "...",
        role,
      });

      // Store auth data FIRST
      sessionStorage.setItem("auth_token", token);
      sessionStorage.setItem("auth_role", role);
      sessionStorage.setItem("admin_key", key);

      console.log("📦 Stored in sessionStorage:", {
        token: sessionStorage.getItem("auth_token")?.substring(0, 20) + "...",
        role: sessionStorage.getItem("auth_role"),
      });

      // Navigate based on role using transition
      if (role === "admin") {
        console.log("🚀 Navigating to admin dashboard...");
        navigate("malikKiKursi");
      } else if (role === "volunteer") {
        navigate("/volunteer/dashboard");
      } else {
        setErr("Unknown role. Contact support.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErr("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-6 text-left">
      <div className="max-w-md w-full">
        <PageHeader
          tag="Restricted"
          title="Pit wall access."
          titleClassName="text-5xl sm:text-5xl md:text-5xl lg:text-5xl mb-2"
          className="mb-2"
        />
        <form onSubmit={submit} className="space-y-4">
          <Input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            className="px-4 py-4"
            disabled={loading}
          />
          {err && <div className="text-signal font-mono text-xs">{err}</div>}
          <Button
            type="submit"
            variant="primary"
            className="w-full py-4"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Authenticate →"}
          </Button>
        </form>
      </div>
    </div>
  );
}
