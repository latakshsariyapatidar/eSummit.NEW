import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("initial value", () => {
    it("returns initialValue when localStorage is empty", () => {
      const { result } = renderHook(() => useLocalStorage("test_key", []));
      expect(result.current[0]).toEqual([]);
    });

    it("returns parsed value from localStorage when key exists", () => {
      const existing = [{ id: "ORD-1", total: 299 }];
      localStorage.setItem("es26_orders", JSON.stringify(existing));

      const { result } = renderHook(() =>
        useLocalStorage("es26_orders", [])
      );

      expect(result.current[0]).toEqual(existing);
    });

    it("returns initialValue when localStorage contains invalid JSON", () => {
      localStorage.setItem("bad_key", "not-valid-json{{{");

      const { result } = renderHook(() =>
        useLocalStorage("bad_key", "fallback")
      );

      expect(result.current[0]).toBe("fallback");
    });

    it("returns initialValue (not null) for missing key", () => {
      const { result } = renderHook(() =>
        useLocalStorage("nonexistent_key", { default: true })
      );

      expect(result.current[0]).toEqual({ default: true });
    });
  });

  describe("direct value setter", () => {
    it("updates state with a direct value", () => {
      const { result } = renderHook(() => useLocalStorage("k", []));

      act(() => {
        result.current[1]([1, 2, 3]);
      });

      expect(result.current[0]).toEqual([1, 2, 3]);
    });

    it("persists direct value to localStorage as JSON", () => {
      const { result } = renderHook(() => useLocalStorage("k", null));

      act(() => {
        result.current[1]({ foo: "bar" });
      });

      expect(JSON.parse(localStorage.getItem("k"))).toEqual({ foo: "bar" });
    });
  });

  describe("functional updater — the core PR change", () => {
    it("appends a new order to an empty list via functional update", () => {
      const { result } = renderHook(() => useLocalStorage("es26_orders", []));
      const newOrder = { id: "ORD-001", total: 299 };

      act(() => {
        result.current[1]((prev) => [...prev, newOrder]);
      });

      expect(result.current[0]).toEqual([newOrder]);
    });

    it("appends a new order to an existing list without losing previous orders", () => {
      const existingOrders = [
        { id: "ORD-000", total: 499 },
        { id: "ORD-001", total: 899 },
      ];
      localStorage.setItem("es26_orders", JSON.stringify(existingOrders));

      const { result } = renderHook(() => useLocalStorage("es26_orders", []));
      const newOrder = { id: "ORD-002", total: 299 };

      act(() => {
        result.current[1]((prev) => [...prev, newOrder]);
      });

      expect(result.current[0]).toHaveLength(3);
      expect(result.current[0][0]).toEqual(existingOrders[0]);
      expect(result.current[0][1]).toEqual(existingOrders[1]);
      expect(result.current[0][2]).toEqual(newOrder);
    });

    it("persists the functionally-updated array to localStorage", () => {
      const initial = [{ id: "ORD-FIRST" }];
      localStorage.setItem("es26_orders", JSON.stringify(initial));

      const { result } = renderHook(() => useLocalStorage("es26_orders", []));
      const added = { id: "ORD-SECOND" };

      act(() => {
        result.current[1]((prev) => [...prev, added]);
      });

      const stored = JSON.parse(localStorage.getItem("es26_orders"));
      expect(stored).toHaveLength(2);
      expect(stored[1]).toEqual(added);
    });

    it("successive functional updates each append correctly", () => {
      const { result } = renderHook(() => useLocalStorage("es26_orders", []));

      act(() => {
        result.current[1]((prev) => [...prev, { id: "ORD-A" }]);
      });
      act(() => {
        result.current[1]((prev) => [...prev, { id: "ORD-B" }]);
      });
      act(() => {
        result.current[1]((prev) => [...prev, { id: "ORD-C" }]);
      });

      expect(result.current[0]).toHaveLength(3);
      expect(result.current[0].map((o) => o.id)).toEqual([
        "ORD-A",
        "ORD-B",
        "ORD-C",
      ]);
    });

    it("does not mutate the previous array when appending", () => {
      const initial = [{ id: "ORD-OLD" }];
      const { result } = renderHook(() => useLocalStorage("es26_orders", initial));
      const originalRef = result.current[0];

      act(() => {
        result.current[1]((prev) => [...prev, { id: "ORD-NEW" }]);
      });

      // original array ref must be unchanged
      expect(originalRef).toHaveLength(1);
      expect(result.current[0]).toHaveLength(2);
    });
  });

  describe("edge cases", () => {
    it("returns a stable setter reference across re-renders", () => {
      const { result, rerender } = renderHook(() =>
        useLocalStorage("stable_key", 0)
      );
      const firstSetter = result.current[1];

      rerender();

      expect(result.current[1]).toBe(firstSetter);
    });

    it("handles a null initial value", () => {
      const { result } = renderHook(() => useLocalStorage("null_key", null));
      expect(result.current[0]).toBeNull();
    });
  });
});