import { useState, useEffect } from "react";

export const API_BASE = "http://localhost:3000/api";

// Empty defaults for legacy references (these will not be dynamically updated)
export const PASSES = [];
export const MERCH = [];
export const EVENTS = [];
export const SPONSORS = [];
export const SCHEDULE = [];
export const FAQS = [];
export const UPI_IDS = [];
export const TARGET_DATE = new Date("2026-08-21T00:00:00").getTime();

// ── API CLIENT FUNCTIONS ───────────────────────────────────────────────────

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/content/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchSponsors() {
  const res = await fetch(`${API_BASE}/content/sponsors`);
  if (!res.ok) throw new Error("Failed to fetch sponsors");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchFAQs() {
  const res = await fetch(`${API_BASE}/content/faqs`);
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchSchedule() {
  const res = await fetch(`${API_BASE}/content/schedule`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchMerch() {
  const res = await fetch(`${API_BASE}/content/merch`);
  if (!res.ok) throw new Error("Failed to fetch merch");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchTeams() {
  const res = await fetch(`${API_BASE}/content/teams`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchConfig(key) {
  const res = await fetch(`${API_BASE}/content/config/${key}`);
  if (!res.ok) throw new Error(`Failed to fetch config key ${key}`);
  const json = await res.json();
  return json.status === "success" ? json.data : null;
}

// Order management
export async function submitOrder(orderData) {
  const res = await fetch(`${API_BASE}/order/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

export async function getOrderStatus(phone) {
  const res = await fetch(
    `${API_BASE}/order/status?phone=${encodeURIComponent(phone)}`,
  );
  return res.json();
}

// Attendance Check-in
export async function verifyQR(qrContent) {
  const res = await fetch(`${API_BASE}/attendance/verify-qr`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qr_content: qrContent }),
  });
  return res.json();
}

export async function markAttendance(qrContent) {
  const res = await fetch(`${API_BASE}/attendance/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qr_content: qrContent }),
  });
  return res.json();
}

// Admin Panel operations
export async function verifyAdminKey(adminKey) {
  const res = await fetch(`${API_BASE}/admin/verify-key`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ admin_key: adminKey }),
  });
  return res.json();
}

export async function getAdminDbState(adminKey) {
  const res = await fetch(`${API_BASE}/admin/db-state`, {
    headers: { "X-Admin-Key": adminKey },
  });
  return res.json();
}

export async function verifyAdminOrder(
  adminKey,
  orderId,
  status,
  rejectionReason = "",
) {
  const res = await fetch(`${API_BASE}/admin/order/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
    },
    body: JSON.stringify({
      order_id: orderId,
      status,
      rejection_reason: rejectionReason,
    }),
  });
  return res.json();
}

export async function getAdminPasses(adminKey) {
  const res = await fetch(`${API_BASE}/admin/passes`, {
    headers: { "X-Admin-Key": adminKey },
  });
  return res.json();
}

// ── REACT HOOKS FOR ASYNC DATA LOADING ─────────────────────────────────────

export function useEvents() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchEvents()
      .then(setData)
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return data;
}

export function useSponsors() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchSponsors()
      .then(setData)
      .catch((err) => console.error("Error fetching sponsors:", err));
  }, []);

  return data;
}

export function useFAQs() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchFAQs()
      .then(setData)
      .catch((err) => console.error("Error fetching FAQs:", err));
  }, []);

  return data;
}

export function useSchedule() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchSchedule()
      .then(setData)
      .catch((err) => console.error("Error fetching schedule:", err));
  }, []);

  return data;
}

export function useMerch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchMerch()
      .then(setData)
      .catch((err) => console.error("Error fetching merch:", err));
  }, []);

  return data;
}

export function useTeams() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchTeams()
      .then(setData)
      .catch((err) => console.error("Error fetching teams:", err));
  }, []);

  return data;
}

export function useConfigValue(key, fallbackValue) {
  const [val, setVal] = useState(fallbackValue);
  useEffect(() => {
    fetchConfig(key)
      .then((data) => {
        if (data !== null) setVal(data);
      })
      .catch((err) => console.error(`Error fetching config ${key}:`, err));
  }, [key]);

  return val;
}

// Cart helpers
const CART_KEY = "es26_cart";
export const getCart = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};
export const setCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));
