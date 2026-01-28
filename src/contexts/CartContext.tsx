"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type CartContextType = {
  itemCount: number;
  setItemCount: (count: number) => void;
  incrementCount: (by?: number) => void;
  decrementCount: (by?: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
  initialCount?: number;
};

export function CartProvider({ children, initialCount = 0 }: CartProviderProps) {
  const [itemCount, setItemCount] = useState(initialCount);

  const incrementCount = useCallback((by = 1) => {
    setItemCount((prev) => prev + by);
  }, []);

  const decrementCount = useCallback((by = 1) => {
    setItemCount((prev) => Math.max(0, prev - by));
  }, []);

  return (
    <CartContext.Provider value={{ itemCount, setItemCount, incrementCount, decrementCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
