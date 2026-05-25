import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getQuantity: (productId: string) => number;
  totalItems: number;
}

const CART_STORAGE_KEY = "nflex_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  }, []);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productId === productId);
      const next = i >= 0
        ? prev.map((x) => x.productId === productId ? { ...x, quantity: x.quantity + quantity } : x)
        : [...prev, { productId, quantity }];
      saveCart(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((x) => x.productId !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => {
      const next = prev.map((x) => x.productId === productId ? { ...x, quantity } : x);
      saveCart(next);
      return next;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, []);

  const getQuantity = useCallback((productId: string) => {
    return items.find((x) => x.productId === productId)?.quantity ?? 0;
  }, [items]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getQuantity,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
