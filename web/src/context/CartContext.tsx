"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { FlyingBeeOverlay } from "@/components/storefront/FlyingBeeOverlay";

export interface CartItem {
  id: string; // unique combo of productId + size
  productId: string;
  slug: string;
  name: string;
  origin: string;
  size: string;
  price: number;
  marketPrice?: number;
  quantity: number;
  batchId: string;
  colorSwatch: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "id">,
    source?: React.MouseEvent | MouseEvent | { x: number; y: number } | HTMLElement | null
  ) => void;
  removeItem: (
    id: string,
    source?: React.MouseEvent | MouseEvent | { x: number; y: number } | HTMLElement | null
  ) => void;
  updateQuantity: (
    id: string,
    delta: number,
    source?: React.MouseEvent | MouseEvent | { x: number; y: number } | HTMLElement | null
  ) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "honeychain_storefront_cart_v1";

// Global pointer position cache for instant accurate click origins
let lastPointerPosition: { x: number; y: number } | null = null;
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointerdown",
    (e) => {
      lastPointerPosition = { x: e.clientX, y: e.clientY };
    },
    true
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage asynchronously on client mount
  useEffect(() => {
    let active = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && active) {
          queueMicrotask(() => {
            setItems(parsed);
            setIsHydrated(true);
          });
          return;
        }
      }
    } catch (err) {
      console.warn("Failed to read cart from localStorage:", err);
    }
    queueMicrotask(() => {
      if (active) setIsHydrated(true);
    });

    return () => {
      active = false;
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn("Failed to persist cart to localStorage:", err);
    }
  }, [items, isHydrated]);

  const addItem = (
    newItem: Omit<CartItem, "id">,
    source?: React.MouseEvent | MouseEvent | { x: number; y: number } | HTMLElement | null
  ) => {
    // Determine accurate start coordinates for the flying bee
    let startX = typeof window !== "undefined" ? window.innerWidth / 2 : 200;
    let startY = typeof window !== "undefined" ? window.innerHeight / 2 : 200;

    if (source && "clientX" in source) {
      startX = source.clientX;
      startY = source.clientY;
    } else if (source && "x" in source && "y" in source) {
      startX = source.x;
      startY = source.y;
    } else if (source && "getBoundingClientRect" in source) {
      const rect = (source as HTMLElement).getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if (lastPointerPosition) {
      startX = lastPointerPosition.x;
      startY = lastPointerPosition.y;
    }

    // Dispatch the custom event to launch the tick-to-bee flight
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bee-flight-start", {
          detail: { x: startX, y: startY },
        })
      );
    }

    const id = `${newItem.productId}-${newItem.size}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, { ...newItem, id }];
    });
  };

  const triggerSubtractSlam = (
    source?: React.MouseEvent | MouseEvent | { x: number; y: number } | HTMLElement | null
  ) => {
    let startX = typeof window !== "undefined" ? window.innerWidth / 2 : 200;
    let startY = typeof window !== "undefined" ? window.innerHeight / 2 : 200;

    if (source && "clientX" in source) {
      startX = source.clientX;
      startY = source.clientY;
    } else if (source && "x" in source && "y" in source) {
      startX = source.x;
      startY = source.y;
    } else if (source && "getBoundingClientRect" in source) {
      const rect = (source as HTMLElement).getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if (lastPointerPosition) {
      startX = lastPointerPosition.x;
      startY = lastPointerPosition.y;
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("bee-mosquito-slam", {
          detail: { x: startX, y: startY },
        })
      );
    }
  };

  const removeItem = (
    id: string,
    source?: React.MouseEvent | MouseEvent | { x: number; y: number } | HTMLElement | null
  ) => {
    triggerSubtractSlam(source);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (
    id: string,
    delta: number,
    source?: React.MouseEvent | MouseEvent | { x: number; y: number } | HTMLElement | null
  ) => {
    if (delta < 0) {
      triggerSubtractSlam(source);
    }
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isHydrated,
      }}
    >
      {children}
      <FlyingBeeOverlay />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
