"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product, INITIAL_PRODUCTS } from "./data";

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
      const saved = localStorage.getItem("tcg-products");
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem("tcg-products", JSON.stringify(INITIAL_PRODUCTS));
      }
    } catch {
      setProducts(INITIAL_PRODUCTS);
    }
  }, []);

  const save = (next: Product[]) => {
    setProducts(next);
    try {
      localStorage.setItem("tcg-products", JSON.stringify(next));
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
