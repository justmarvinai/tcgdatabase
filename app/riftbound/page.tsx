"use client";
import { useProducts } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import { Sword } from "lucide-react";
import { Suspense } from "react";

export default function RiftboundPage() {
  const { products } = useProducts();
  const count = products.filter((p) => p.category === "Riftbound").length;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <Sword className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Riftbound
          </h1>
        </div>
        <p className="text-gray-500 ml-[52px]">
          {count} Produkte · League of Legends TCG
        </p>
      </div>
      <Suspense>
        <ProductGrid products={products} category="Riftbound" />
      </Suspense>
    </div>
  );
}
