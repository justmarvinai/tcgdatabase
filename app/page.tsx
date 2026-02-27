"use client";
import { Suspense } from "react";
import { useProducts } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { Sword, Zap, Plus } from "lucide-react";

export default function Home() {
  const { products } = useProducts();
  const riftbound = products.filter((p) => p.category === "Riftbound");
  const pokemon = products.filter((p) => p.category === "Pokémon");

  return (
    <div>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          TCGDatabase
        </h1>
        <p className="text-gray-500 mt-1">
          Deine persönliche Datenbank für TCG-Produkte und Shop-Links
        </p>
      </div>

      {/* Category tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/riftbound"
          className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Sword className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-blue-900">Riftbound</h2>
          </div>
          <p className="text-blue-700 text-sm">
            {riftbound.length} Produkte · League of Legends TCG
          </p>
          <div className="mt-4 text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition">
            Alle Riftbound-Produkte →
          </div>
        </Link>

        <Link
          href="/pokemon"
          className="group relative overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-100 border border-yellow-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500 rounded-xl text-white">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-yellow-900">Pokémon</h2>
          </div>
          <p className="text-yellow-700 text-sm">
            {pokemon.length} Produkte · Trading Card Game
          </p>
          <div className="mt-4 text-xs font-semibold text-yellow-600 group-hover:text-yellow-800 transition">
            Alle Pokémon-Produkte →
          </div>
        </Link>
      </div>

      {/* All products */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">Alle Produkte</h2>
        <Link
          href="/add"
          className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <Plus className="w-4 h-4" />
          Hinzufügen
        </Link>
      </div>
      <Suspense>
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}
