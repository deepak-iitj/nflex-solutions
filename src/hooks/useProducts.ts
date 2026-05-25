import { useState, useEffect, useCallback } from "react";
import { Product, defaultProducts } from "@/data/products";

const STORAGE_KEY = "iva_products_v6";

function loadProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultProducts;
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(loadProducts);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    const id = `custom_${Date.now()}`;
    setProducts((prev) => [...prev, { ...product, id }]);
  }, []);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetProducts = useCallback(() => {
    setProducts(defaultProducts);
  }, []);

  return { products, addProduct, updateProduct, deleteProduct, resetProducts };
}
