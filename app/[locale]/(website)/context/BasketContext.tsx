"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface BasketItem {
  id: string;
  projectName: string;
  projectSlug?: string;
  projectItem: string;
  donationItemKey?: string;
  donationItemSlug?: string;
  amount: number;
  intention: string;
  isZakat?: boolean;
  frequency?: string;
  dailyStartDate?: string | null;
  dailyEndDate?: string | null;
  weeklyDurationWeeks?: number | null;
  durationMonths?: number | null;
}

interface BasketContextValue {
  items: BasketItem[];
  addItem: (item: Omit<BasketItem, "id">) => void;
  removeItem: (id: string) => void;
  clearBasket: () => void;
  totalAmount: number;
  itemCount: number;
}

const BasketContext = createContext<BasketContextValue | null>(null);

const STORAGE_KEY = "hrm_donation_basket";

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: Omit<BasketItem, "id">) => {
    const newItem: BasketItem = { ...item, id: `${Date.now()}-${Math.random()}` };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearBasket = () => setItems([]);

  const totalAmount = items.reduce((sum, i) => sum + i.amount, 0);
  const itemCount = items.length;

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, clearBasket, totalAmount, itemCount }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket(): BasketContextValue {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used inside <BasketProvider>");
  return ctx;
}
