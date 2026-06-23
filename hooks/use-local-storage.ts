"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [stored, setStored] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStored(JSON.parse(item) as T);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (hydrated) {
      try {
        window.localStorage.setItem(key, JSON.stringify(stored));
      } catch { /* quota exceeded */ }
    }
  }, [key, stored, hydrated]);

  return [stored, setStored, hydrated];
}
