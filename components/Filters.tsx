"use client";
import { X } from "lucide-react";
import { PokemonEra, POKEMON_ERAS } from "@/lib/data";

export interface FilterState {
  era: string;
  set: string;
  productType: string;
  language: string;
  store: string;
  minPrice: string;
  maxPrice: string;
}

export const EMPTY_FILTERS: FilterState = {
  era: "",
  set: "",
  productType: "",
  language: "",
  store: "",
  minPrice: "",
  maxPrice: "",
};

interface FiltersProps {
  sets: string[];
  productTypes: string[];
  languages: string[];
  stores: string[];
  showEra?: boolean; // only for Pokémon
  filters: FilterState;
  onChange: (key: string, value: string) => void;
  onReset: () => void;
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border transition whitespace-nowrap ${
        active
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
      }`}
      title={label}
    >
      {label}
    </button>
  );
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
        <Pill
          label="Alle"
          active={value === ""}
          onClick={() => onChange(filterKey, "")}
        />
        {options.map((o) => (
          <Pill
            key={o}
            label={o}
            active={value === o}
            onClick={() => onChange(filterKey, o)}
          />
        ))}
      </div>
    </div>
  );
}

const ERA_ORDER: PokemonEra[] = [
  "XY Series",
  "Sun & Moon",
  "Sword & Shield",
  "Scarlet & Violet",
  "Mega Evolution",
];

const ERA_COLORS: Record<PokemonEra, string> = {
  "XY Series":       "bg-blue-50  border-blue-200  text-blue-700  data-[active]:bg-blue-600  data-[active]:text-white  data-[active]:border-blue-600",
  "Sun & Moon":      "bg-orange-50 border-orange-200 text-orange-700 data-[active]:bg-orange-500 data-[active]:text-white data-[active]:border-orange-500",
  "Sword & Shield":  "bg-emerald-50 border-emerald-200 text-emerald-700 data-[active]:bg-emerald-600 data-[active]:text-white data-[active]:border-emerald-600",
  "Scarlet & Violet":"bg-rose-50  border-rose-200  text-rose-700  data-[active]:bg-rose-600  data-[active]:text-white  data-[active]:border-rose-600",
  "Mega Evolution":  "bg-purple-50 border-purple-200 text-purple-700 data-[active]:bg-purple-600 data-[active]:text-white data-[active]:border-purple-600",
};

export default function Filters({
  sets,
  productTypes,
  languages,
  stores,
  showEra,
  filters,
  onChange,
  onReset,
}: FiltersProps) {
  const hasActive = Object.values(filters).some((v) => v !== "");

  // When era changes, reset set
  const handleEraChange = (era: string) => {
    onChange("era", era);
    onChange("set", "");
  };

  // For Pokémon: if an era is selected, show only that era's sets; otherwise show all passed sets
  const visibleSets =
    showEra && filters.era
      ? POKEMON_ERAS[filters.era as PokemonEra] ?? sets
      : sets;

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

      {/* Era filter — Pokémon only */}
      {showEra && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Era
          </p>
          <div className="flex flex-col gap-1.5">
            <Pill
              label="Alle Eras"
              active={filters.era === ""}
              onClick={() => handleEraChange("")}
            />
            {ERA_ORDER.map((era) => (
              <button
                key={era}
                onClick={() => handleEraChange(era)}
                data-active={filters.era === era ? "" : undefined}
                className={`text-xs px-2.5 py-1.5 rounded-lg border text-left font-medium transition ${ERA_COLORS[era]} ${
                  filters.era === era ? "ring-1 ring-offset-1 ring-current" : ""
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>
      )}

      <FilterSection
        label="Sprache"
        options={languages}
        value={filters.language}
        filterKey="language"
        onChange={onChange}
      />

      <FilterSection
        label="Set"
        options={visibleSets}
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
