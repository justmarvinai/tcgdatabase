"use client";
import { useProducts } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import { Zap } from "lucide-react";
import { Suspense } from "react";

export default function PokemonPage() {
  const { products } = useProducts();
  const count = products.filter((p) => p.category === "Pokémon").length;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-500 rounded-xl text-white">
            <Zap className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Pokémon
          </h1>
        </div>
        <p className="text-gray-500 ml-[52px]">
          {count} Produkte · Trading Card Game
        </p>
      </div>
      <Suspense>
        <ProductGrid products={products} category="Pokémon" />
      </Suspense>
    </div>
  );
}
