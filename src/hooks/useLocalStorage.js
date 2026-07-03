import { useState, useCallback } from "react";

/**
 * Custom hook to sync state with localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} initialValue - The initial value if key is not found in localStorage.
 * @returns {[any, Function]} - The state and setter function.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue) => {
      try {
        setValue((prev) => {
          const valueToStore =
            newValue instanceof Function ? newValue(prev) : newValue;
          localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (e) {
        console.error("Error setting localStorage key:", key, e);
      }
    },
    [key],
  );

  return [value, setStoredValue];
}
