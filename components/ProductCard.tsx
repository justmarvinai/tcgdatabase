"use client";
import { useState } from "react";
import { ExternalLink, Trash2, ChevronDown, ChevronUp, Tag } from "lucide-react";
import { Product, Category } from "@/lib/data";
import { lowestPrice, formatPrice } from "@/lib/utils";
import { useProducts } from "@/lib/store";

const CATEGORY_STYLES: Record<Category, { badge: string; border: string }> = {
  Riftbound: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    border: "border-blue-200 hover:border-blue-400",
  },
  Pokémon: {
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    border: "border-yellow-200 hover:border-yellow-400",
  },
};

const STORE_COLORS: Record<string, string> = {
  Innventory: "bg-violet-100 text-violet-700",
  "Yonko TCG": "bg-red-100 text-red-700",
  "Card Corner": "bg-emerald-100 text-emerald-700",
  "Sapphire Cards": "bg-cyan-100 text-cyan-700",
  "Wizzards Inn": "bg-orange-100 text-orange-700",
  "Good Game Guys": "bg-lime-100 text-lime-700",
  "Peer Online": "bg-pink-100 text-pink-700",
  Voxymoron: "bg-indigo-100 text-indigo-700",
};

function storeColor(store: string) {
  return STORE_COLORS[store] ?? "bg-gray-100 text-gray-700";
}

const LANG_FLAGS: Record<string, string> = {
  Englisch: "🇬🇧",
  Deutsch: "🇩🇪",
  Chinesisch: "🇨🇳",
};

interface Props {
  product: Product;
  highlight?: boolean;
}

export default function ProductCard({ product, highlight }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { deleteProduct } = useProducts();
  const styles = CATEGORY_STYLES[product.category];
  const cheapest = lowestPrice(product);

  return (
    <div
      id={`product-${product.id}`}
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${styles.border} ${
        highlight ? "ring-2 ring-indigo-400 shadow-md" : "shadow-sm hover:shadow-md"
      }`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${styles.badge}`}
              >
                {product.category}
              </span>
              {product.era && (
                <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-medium">
                  {product.era}
                </span>
              )}
              <span className="text-xs text-gray-500">
                {LANG_FLAGS[product.language]} {product.language}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {product.productType}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{product.set}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold text-indigo-600">
              {formatPrice(cheapest)}
            </p>
            {product.links.length > 1 && (
              <p className="text-xs text-gray-400">
                ab · {product.links.length} Shops
              </p>
            )}
          </div>
        </div>

        {/* Quick store badges */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {product.links.map((l, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${storeColor(l.store)}`}
            >
              <Tag className="w-2.5 h-2.5" />
              {l.store}
              {l.variant && (
                <span className="opacity-70">· {l.variant}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Expand / collapse links */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs text-gray-500 hover:bg-gray-50 transition"
        >
          <span>{expanded ? "Links ausblenden" : "Alle Links anzeigen"}</span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {expanded && (
          <div className="divide-y divide-gray-100">
            {product.links.map((link, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50"
              >
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${storeColor(link.store)}`}
                >
                  {link.store}
                </span>
                {link.variant && (
                  <span className="text-xs text-gray-500 shrink-0">
                    {link.variant}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 truncate">
                    Versand: {link.shipping}
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-900 shrink-0">
                  {formatPrice(link.price)}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                  title="Im Shop öffnen"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete */}
      <div className="border-t border-gray-100 flex justify-end px-4 py-2">
        <button
          onClick={() => {
            if (confirm(`"${product.name}" wirklich löschen?`))
              deleteProduct(product.id);
          }}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition"
        >
          <Trash2 className="w-3 h-3" />
          Löschen
        </button>
      </div>
    </div>
  );
}
