"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product, INITIAL_PRODUCTS } from "./data";

// Bump this number whenever INITIAL_PRODUCTS changes structurally
// so existing users automatically get the fresh seed data.
const DATA_VERSION = 3;
const VERSION_KEY = "tcg-data-version";
const PRODUCTS_KEY = "tcg-products";

interface Store {
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "createdAt">) => void;
  deleteProduct: (id: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedVersion = Number(localStorage.getItem(VERSION_KEY) ?? "0");
      const saved = localStorage.getItem(PRODUCTS_KEY);

      if (saved && storedVersion >= DATA_VERSION) {
        // Cache is current — use it
        setProducts(JSON.parse(saved));
      } else {
        // Stale or missing — seed fresh data and stamp version
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
        localStorage.setItem(VERSION_KEY, String(DATA_VERSION));
      }
    } catch {
      setProducts(INITIAL_PRODUCTS);
    }
  }, []);

  const save = (next: Product[]) => {
    setProducts(next);
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(next));
      localStorage.setItem(VERSION_KEY, String(DATA_VERSION));
    } catch {}
  };

  const addProduct = (p: Omit<Product, "id" | "createdAt">) => {
    const next: Product = {
      ...p,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    save([next, ...products]);
  };

  const deleteProduct = (id: string) => {
    save(products.filter((p) => p.id !== id));
  };

  return (
    <Ctx.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </Ctx.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProducts must be inside ProductProvider");
  return ctx;
};
