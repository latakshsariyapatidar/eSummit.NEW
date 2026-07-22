import { useEffect, useId, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";
import { API_BASE } from "@/lib/store";
import { Button } from "@/components/ui/Button";

// NEW: QR codes encode a JSON payload like {"passId": "...", "orderId": "..."}.
// Manual entry (typed by a volunteer) is always a plain passId string, never JSON.
// Check-in only needs the passId — the orderId is fetched from the check-in
// response afterward (authoritative source), not trusted directly off the QR.
const extractPassIdFromScan = (raw) => {
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed?.passId) return parsed.passId;
    } catch {
      // not valid JSON — fall back to treating it as a raw id string
    }
  }
  return trimmed;
};

export function ScanPanel() {
  const readerId = useId().replace(/:/g, ""); // unique per-instance id, guards against any future double-mount
  const qrRef = useRef(null);
  const scanningRef = useRef(false); // true whenever a check-in (camera OR manual) is in flight
  const startingRef = useRef(false);
  const mountedRef = useRef(true);
  const genRef = useRef(0); // "generation" token — invalidates stale async work from StrictMode double-invoke
  const lastStatusRef = useRef(null); // captures the last HTTP status code for error classification

  const [loading, setLoading] = useState(false);
  const [passId, setPassId] = useState("");
  const [manualId, setManualId] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("generic"); // "invalid" | "void" | "duplicate" | "network" | "generic"
  const [permissionState, setPermissionState] = useState("prompt"); // "granted" | "denied" | "prompt"
  const [resultKey, setResultKey] = useState(0); // NEW: bumped per scan so the progress bar animation restarts cleanly
  const [resultDelay, setResultDelay] = useState(0); // NEW: ms until auto-reset, drives the progress bar duration

  // -----------------------------
  // Backend API
  // -----------------------------

  // NEW: fetches order-level details (amount, status, UTR, passRequests, etc.)
  // to show alongside the attendee/pass info returned by check-in.
  // Non-blocking: if this fails, the check-in result itself is still shown.
  const fetchOrderDetails = async (orderId, token, adminKey, myGen) => {
    if (!orderId) return null;

    try {
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
        return null;
      }

      if (!res.ok || !json?.data) return null;
      if (myGen !== genRef.current || !mountedRef.current) return null;

      return json.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const checkInPass = async (id) => {
    let succeeded = false;
    const myGen = genRef.current;

    try {
      setLoading(true);
      setError("");
      setErrorType("generic");
      setScanResult(null);

      const token = sessionStorage.getItem("auth_token");
      const adminKey = sessionStorage.getItem("admin_key"); // NEW: needed for the order-details fetch

      const res = await fetch(`${API_BASE}/passes/${id}/check-in`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      lastStatusRef.current = res.status;

      if (myGen !== genRef.current || !mountedRef.current) return;

      if (res.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        throw new Error("Session expired. Please log in again.");
      }

      let json;
      try {
        json = await res.json();
      } catch {
        throw new Error(
          "Server returned an unexpected response. Please try again.",
        );
      }

      if (!res.ok) {
        throw new Error(json?.message || `Check-in failed (${res.status})`);
      }

      if (myGen !== genRef.current || !mountedRef.current) return;

      setScanResult(json.data);
      toast.success(json.message);
      succeeded = true;

      // NEW: pull the order-level details using the orderId the backend
      // returned with the pass, and merge it in once it arrives.
      const orderId = json.data?.orderId;
      const orderDetails = await fetchOrderDetails(
        orderId,
        token,
        adminKey,
        myGen,
      );

      if (orderDetails && myGen === genRef.current && mountedRef.current) {
        setScanResult((prev) =>
          prev ? { ...prev, order: orderDetails } : prev,
        );
      }
    } catch (err) {
      if (myGen !== genRef.current || !mountedRef.current) return;

      let type = "generic";
      let message = err.message;

      if (err instanceof TypeError) {
        type = "network";
        message = "Network error — check your connection and try again.";
      } else if (lastStatusRef.current === 404) {
        type = "invalid";
      } else if (/cancelled/i.test(err.message)) {
        type = "void";
      } else if (/already been checked in/i.test(err.message)) {
        type = "duplicate";
      }

      setError(message);
      setErrorType(type);
      toast.error(message);
    } finally {
      if (myGen !== genRef.current || !mountedRef.current) return;

      setLoading(false);

      const delay = succeeded ? 5000 : 5000;
      setResultDelay(delay); // NEW
      setResultKey((k) => k + 1); // NEW

      setTimeout(() => {
        if (myGen !== genRef.current || !mountedRef.current) return;

        setPassId("");
        setManualId("");
        setScanResult(null);
        setError("");
        setErrorType("generic");
        setResultDelay(0); // NEW

        scanningRef.current = false;

        startScanner(); // camera is always meant to be on while this panel is mounted
      }, delay);
    }
  };

  // -----------------------------
  // Manual entry fallback
  // -----------------------------

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    // manual entry is always a plain passId, typed by the volunteer — no JSON parsing
    const id = manualId.trim();
    if (!id || loading) return;

    // don't barge in if a camera scan is already in flight
    if (scanningRef.current) {
      toast.error("A scan is already being processed — please wait.");
      return;
    }
    scanningRef.current = true;

    await stopScanner();
    setPassId(id);
    await checkInPass(id);
  };

  // -----------------------------
  // Camera scanner
  // -----------------------------

  const startScanner = async () => {
    if (qrRef.current || startingRef.current || !mountedRef.current) return;

    startingRef.current = true;

    const reader = document.getElementById(readerId);
    if (reader) reader.innerHTML = "";

    const instance = new Html5Qrcode(readerId);

    try {
      await instance.start(
        { facingMode: "environment" },
        {
          fps: 10,
          aspectRatio: 1.0,
          showTorchButtonIfSupported: false,
        },
        async (decodedText) => {
          if (scanningRef.current) return;
          scanningRef.current = true;
          const id = extractPassIdFromScan(decodedText); // NEW: pull passId out of the QR JSON payload
          setPassId(id);
          await stopScanner();
          await checkInPass(id);
        },
        () => {},
      );

      // if the component truly unmounted while start() was pending, tear this
      // instance down. NOTE: we deliberately only check mountedRef here, not
      // genRef — startingRef already prevents a real duplicate instance from
      // ever being created during a StrictMode mount→cleanup→mount cycle, so
      // checking genRef here would (and did) kill the only instance we have
      // right after a harmless StrictMode remount.
      if (!mountedRef.current) {
        try {
          await instance.stop();
          await instance.clear();
        } catch {
          /* ignore */
        }
        return;
      }

      qrRef.current = instance; // only commit the instance once we know it's still valid
    } catch (err) {
      console.error(err);
      if (mountedRef.current) {
        toast.error("Camera permission denied or unavailable.");
      }
      const r = document.getElementById(readerId);
      if (r) r.innerHTML = "";
    } finally {
      startingRef.current = false;
    }
  };

  const stopScanner = async () => {
    if (!qrRef.current) return;

    const instance = qrRef.current;
    qrRef.current = null;

    try {
      const state = instance.getState?.();
      if (state === 2 /* SCANNING */ || state === 3 /* PAUSED */) {
        await instance.stop();
      }
      await instance.clear();
    } catch (err) {
      console.error(err);
    }

    const reader = document.getElementById(readerId);
    if (reader) reader.innerHTML = "";
  };

  // -----------------------------
  // Camera permission tracking
  // -----------------------------

  useEffect(() => {
    let permissionStatus;

    const setup = async () => {
      try {
        permissionStatus = await navigator.permissions.query({
          name: "camera",
        });
        if (!mountedRef.current) return;
        setPermissionState(permissionStatus.state);

        permissionStatus.onchange = () => {
          if (!mountedRef.current) return;
          setPermissionState(permissionStatus.state);

          if (permissionStatus.state === "granted") {
            startScanner(); // auto-recover, no reload needed
          }
        };
      } catch (err) {
        console.warn("Permissions API not supported for camera", err);
      }
    };

    setup();

    return () => {
      if (permissionStatus) permissionStatus.onchange = null;
    };
  }, []);

  // -----------------------------
  // Component mount / unmount — camera turns on when the panel mounts
  // (volunteer opens the Scan tab) and off when it unmounts (tab switch)
  // -----------------------------

  useEffect(() => {
    mountedRef.current = true;
    genRef.current += 1; // bump generation on every real mount, invalidating any in-flight work from a prior (StrictMode) mount

    startScanner();

    return () => {
      mountedRef.current = false;
      stopScanner();
    };
  }, []);

  // -----------------------------
  // UI
  // -----------------------------

  // NEW: two-letter initials for the avatar circle
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
  };

  const errorStyles = {
    invalid: {
      band: "bg-rose-500/15",
      icon: "text-rose-500",
      border: "border-rose-500",
      heading: "Invalid Pass Id",
      symbol: "✕",
    },
    void: {
      band: "bg-orange-500/15",
      icon: "text-orange-500",
      border: "border-orange-500",
      heading: "Pass cancelled",
      symbol: "⛔",
    },
    duplicate: {
      band: "bg-yellow-500/15",
      icon: "text-yellow-500",
      border: "border-yellow-500",
      heading: "Already checked in",
      symbol: "↻",
    },
    network: {
      band: "bg-rose-500/15",
      icon: "text-rose-500",
      border: "border-rose-500",
      heading: "Network error",
      symbol: "⚠",
    },
    generic: {
      band: "bg-rose-500/15",
      icon: "text-rose-500",
      border: "border-rose-500",
      heading: "Check-in failed",
      symbol: "⚠",
    },
  };
  const currentErrorStyle = errorStyles[errorType] || errorStyles.generic;

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-3xl p-8">
        <style>{`
                    #${readerId}__dashboard {
                        display: none !important;
                    }
                    #${readerId} {
                        position: relative;
                    }
                    #${readerId} video,
                    #${readerId} canvas {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: cover !important;
                    }
                    @keyframes scanLine {
                        0% { top: 8%; }
                        100% { top: 92%; }
                    }
                    @keyframes shrinkBar {
                        from { width: 100%; }
                        to { width: 0%; }
                    }
                `}</style>

        <div className="flex items-center justify-between mb-5">
          <div className="font-mono text-xs uppercase tracking-widest text-primary">
            QR CHECK-IN
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-mono text-muted-foreground">
            Current Pass
          </div>
          <div className="mt-2 font-mono">{passId || "Waiting for QR..."}</div>
        </div>

        {loading && (
          <div className="mt-6 mb-4 text-primary">Checking pass...</div>
        )}

        {error && (
          <div
            className={`mt-6 mb-4 rounded-xl border ${currentErrorStyle.border} overflow-hidden`}
          >
            <div className={`${currentErrorStyle.band} py-5 text-center`}>
              <div className={`text-2xl ${currentErrorStyle.icon}`}>
                {currentErrorStyle.symbol}
              </div>
              <div className={`text-sm mt-1 ${currentErrorStyle.icon}`}>
                {currentErrorStyle.heading}
              </div>
            </div>
            <div className="px-4 py-3 text-sm">{error}</div>
            <div className="h-[3px] bg-border relative overflow-hidden">
              <div
                key={resultKey}
                className="absolute inset-y-0 left-0 bg-rose-600"
                style={{
                  animation: `shrinkBar ${resultDelay}ms linear forwards`,
                }}
              />
            </div>
          </div>
        )}

        {scanResult && (
          <div className="mt-6 mb-4 rounded-xl border border-emerald-600 overflow-hidden">
            <div className="bg-emerald-500/15 py-5 text-center">
              <div className="text-2xl text-emerald-500">✓</div>
              <div className="text-sm mt-1 text-emerald-500">Checked in</div>
            </div>

            <div className="px-5 py-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/15 text-primary font-semibold flex items-center justify-center flex-shrink-0">
                {getInitials(scanResult.attendeeName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-lg font-display truncate">
                  {scanResult.attendeeName}
                </div>
                {scanResult.eventName && (
                  <div className="text-xs font-mono text-primary font-medium truncate">
                    {scanResult.eventName}
                  </div>
                )}
                <div className="text-xs text-muted-foreground truncate">
                  {scanResult.collegeName}
                </div>
                <div className="text-xs font-mono text-muted-foreground truncate mt-0.5">
                  {scanResult.passId}
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-muted text-foreground whitespace-nowrap">
                {scanResult.type}
              </span>
            </div>

            <div className="h-[3px] bg-border relative overflow-hidden">
              <div
                key={resultKey}
                className="absolute inset-y-0 left-0 bg-green-500"
                style={{
                  animation: `shrinkBar ${resultDelay}ms linear forwards`,
                }}
              />
            </div>

            {/* full details — email, pass status, order info — tucked away, not competing with the primary decision */}
            <details className="px-5 py-3 border-t border-border text-sm">
              <summary className="text-xs font-mono uppercase tracking-widest text-muted-foreground cursor-pointer">
                Full details
              </summary>
              <div className="mt-2 space-y-1 text-muted-foreground">
                {scanResult.eventName && (
                  <div>
                    <b className="text-foreground">Event:</b>{" "}
                    {scanResult.eventName}
                  </div>
                )}
                <div>
                  <b className="text-foreground">Email:</b>{" "}
                  {scanResult.attendeeEmail}
                </div>
                <div>
                  <b className="text-foreground">Pass Status:</b>{" "}
                  {scanResult.status}
                </div>

                {scanResult.order && (
                  <>
                    <div className="pt-2 mt-2 border-t border-border font-mono text-[10px] uppercase tracking-widest">
                      Order
                    </div>
                    <div>
                      <b className="text-foreground">Order ID:</b>{" "}
                      {scanResult.order.orderId}
                    </div>
                    <div>
                      <b className="text-foreground">Order Status:</b>{" "}
                      {scanResult.order.status}
                    </div>
                    <div>
                      <b className="text-foreground">Amount:</b> ₹
                      {scanResult.order.amount}
                    </div>
                    <div>
                      <b className="text-foreground">UTR:</b>{" "}
                      {scanResult.order.paymentUTR}
                    </div>
                    <div>
                      <b className="text-foreground">Total Passes:</b>{" "}
                      {scanResult.order.passRequests?.length || 0}
                    </div>
                  </>
                )}
              </div>
            </details>
          </div>
        )}

        <div className="relative w-full max-w-[480px] mx-auto aspect-square rounded-xl overflow-hidden">
          <div
            id={readerId}
            className="w-full h-full rounded-xl border-2 border-amber-500 overflow-hidden"
          />

          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div
              className={`
                                absolute left-0 w-full h-[3px] rounded-full
                                bg-gradient-to-r from-transparent via-amber-400 to-transparent
                                shadow-[0_0_8px_#f59e0b,0_0_18px_#f59e0b]
                                ${loading ? "top-1/2 -translate-y-1/2" : "animate-[scanLine_2s_linear_infinite]"}
                            `}
            />
          </div>
        </div>

        {permissionState === "denied" && (
          <div className="mt-4 rounded-xl border border-yellow-500 p-4 text-sm">
            Camera access was denied. Enable it from your browser's site
            settings (tap the lock icon in the address bar), then this will
            resume automatically.
          </div>
        )}

        {/* Manual entry fallback — for damaged QR codes, glare, or camera issues */}
        <form onSubmit={handleManualSubmit} className="mt-6 flex gap-3">
          <input
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="Or enter pass ID manually"
            disabled={loading}
            className="flex-1 rounded-xl border border-border bg-background px-4 py-2 font-mono text-sm outline-none focus:border-primary disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={loading || !manualId.trim()}
            variant="primary"
          >
            Check In
          </Button>
        </form>
      </div>
    </div>
  );
}
