"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product, Category } from "@/lib/data";
import { getUniqueValues, getUniqueStores, lowestPrice } from "@/lib/utils";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import { LayoutGrid, List } from "lucide-react";

const EMPTY_FILTERS = {
  set: "",
  productType: "",
  language: "",
  store: "",
  minPrice: "",
  maxPrice: "",
};

interface Props {
  products: Product[];
  category?: Category;
}

export default function ProductGrid({ products, category }: Props) {
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight") ?? "";
  const [filters, setFilters] = useState({ ...EMPTY_FILTERS });
  const [gridView, setGridView] = useState(true);

  // scroll to highlighted card
  useEffect(() => {
    if (highlight) {
      setTimeout(() => {
        document.getElementById(`product-${highlight}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  }, [highlight]);

  const scoped = category ? products.filter((p) => p.category === category) : products;

  const sets = getUniqueValues(scoped, "set");
  const productTypes = getUniqueValues(scoped, "productType");
  const languages = getUniqueValues(scoped, "language");
  const stores = getUniqueStores(scoped);

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filtered = scoped.filter((p) => {
    if (filters.set && p.set !== filters.set) return false;
    if (filters.productType && p.productType !== filters.productType) return false;
    if (filters.language && p.language !== filters.language) return false;
    if (filters.store && !p.links.some((l) => l.store === filters.store)) return false;
    const min = filters.minPrice ? parseFloat(filters.minPrice) : null;
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : null;
    const price = lowestPrice(p);
    if (min !== null && price < min) return false;
    if (max !== null && price > max) return false;
    return true;
  });

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <Filters
            sets={sets}
            productTypes={productTypes}
            languages={languages}
            stores={stores}
            filters={filters}
            onChange={handleChange}
            onReset={() => setFilters({ ...EMPTY_FILTERS })}
          />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "Produkt" : "Produkte"} gefunden
          </p>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setGridView(true)}
              className={`p-1.5 rounded transition ${gridView ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridView(false)}
              className={`p-1.5 rounded transition ${!gridView ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🃏</p>
            <p className="font-medium">Keine Produkte gefunden</p>
            <p className="text-sm mt-1">Versuche die Filter anzupassen</p>
          </div>
        ) : (
          <div
            className={
              gridView
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4"
                : "space-y-3"
            }
          >
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                highlight={p.id === highlight}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
