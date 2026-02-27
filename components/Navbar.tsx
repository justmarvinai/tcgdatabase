"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Plus, Database, X } from "lucide-react";
import { useProducts } from "@/lib/store";
import { lowestPrice, formatPrice } from "@/lib/utils";
import { Category } from "@/lib/data";

const CATEGORY_COLORS: Record<Category, string> = {
  Riftbound: "bg-blue-100 text-blue-700",
  Pokémon: "bg-yellow-100 text-yellow-700",
};

export default function Navbar() {
  const pathname = usePathname();
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results =
    query.trim().length > 1
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.set.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 8)
      : [];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Database className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-lg tracking-tight text-gray-900">
              TCGDatabase
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-1">
            {[
              { href: "/", label: "Übersicht" },
              { href: "/riftbound", label: "Riftbound" },
              { href: "/pokemon", label: "Pokémon" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div ref={ref} className="relative flex-1 max-w-md ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Produkte suchen…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setOpen(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown */}
            {open && results.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/${p.category === "Riftbound" ? "riftbound" : "pokemon"}?highlight=${p.id}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${CATEGORY_COLORS[p.category]}`}
                    >
                      {p.category}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {p.set} · {p.language} · {p.productType}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600 shrink-0">
                      {formatPrice(lowestPrice(p))}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {open && query.trim().length > 1 && results.length === 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl p-4 text-sm text-gray-500 z-50">
                Keine Ergebnisse für „{query}"
              </div>
            )}
          </div>

          {/* Add product */}
          <Link
            href="/add"
            className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Produkt hinzufügen</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
