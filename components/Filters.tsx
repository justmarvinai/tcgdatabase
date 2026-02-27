"use client";
import { X } from "lucide-react";

interface FiltersProps {
  sets: string[];
  productTypes: string[];
  languages: string[];
  stores: string[];
  filters: {
    set: string;
    productType: string;
    language: string;
    store: string;
    minPrice: string;
    maxPrice: string;
  };
  onChange: (key: string, value: string) => void;
  onReset: () => void;
}

function FilterSection({
  label,
  options,
  value,
  filterKey,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  filterKey: string;
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onChange(filterKey, "")}
          className={`text-xs px-2.5 py-1 rounded-full border transition ${
            value === ""
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
          }`}
        >
          Alle
        </button>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(filterKey, o)}
            className={`text-xs px-2.5 py-1 rounded-full border transition truncate max-w-[160px] ${
              value === o
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
            }`}
            title={o}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Filters({
  sets,
  productTypes,
  languages,
  stores,
  filters,
  onChange,
  onReset,
}: FiltersProps) {
  const hasActive =
    filters.set ||
    filters.productType ||
    filters.language ||
    filters.store ||
    filters.minPrice ||
    filters.maxPrice;

  return (
    <aside className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Filter</h2>
        {hasActive && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
          >
            <X className="w-3 h-3" />
            Zurücksetzen
          </button>
        )}
      </div>

      <FilterSection
        label="Sprache"
        options={languages}
        value={filters.language}
        filterKey="language"
        onChange={onChange}
      />

      <FilterSection
        label="Set / Edition"
        options={sets}
        value={filters.set}
        filterKey="set"
        onChange={onChange}
      />

      <FilterSection
        label="Produkttyp"
        options={productTypes}
        value={filters.productType}
        filterKey="productType"
        onChange={onChange}
      />

      <FilterSection
        label="Shop"
        options={stores}
        value={filters.store}
        filterKey="store"
        onChange={onChange}
      />

      {/* Price range */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Preis (€)
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange("minPrice", e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <span className="text-gray-400 text-xs">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange("maxPrice", e.target.value)}
            className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </div>
    </aside>
  );
}
