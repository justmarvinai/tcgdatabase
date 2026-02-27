"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { useProducts } from "@/lib/store";
import { Category, Language, ProductType, StoreLink } from "@/lib/data";

const CATEGORIES: Category[] = ["Riftbound", "Pokémon"];

const LANGUAGES: Language[] = ["Englisch", "Deutsch", "Chinesisch"];

const PRODUCT_TYPES: ProductType[] = [
  "Display",
  "Slim Display",
  "Jumbo Display",
  "Booster",
  "Sleeved Booster",
  "Booster Bundle",
  "3-Pack-Blister",
  "Kollektion",
];

const RIFTBOUND_SETS = ["Origins", "Spiritforged"];
const POKEMON_SETS = [
  "SWSH: Kampfstile",
  "SWSH: Brilliant Stars",
  "SWSH: Astral Radiance",
  "S&M: Nacht in Flammen",
  "S&M: Aufziehen der Sturmröte",
  "Karmesin & Purpur: Paldean Fates",
];

const KNOWN_STORES = [
  "Innventory",
  "Yonko TCG",
  "Card Corner",
  "Sapphire Cards",
  "Wizzards Inn",
  "Good Game Guys",
  "Peer Online",
  "Voxymoron",
];

function storeFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    const map: Record<string, string> = {
      "innventory.de": "Innventory",
      "yonko-tcg.de": "Yonko TCG",
      "card-corner.de": "Card Corner",
      "sapphire-cards.de": "Sapphire Cards",
      "wizzardsinn.de": "Wizzards Inn",
      "goodgameguys.de": "Good Game Guys",
      "peer-online.de": "Peer Online",
      "voxymoron.de": "Voxymoron",
    };
    return map[hostname] ?? hostname;
  } catch {
    return "";
  }
}

const emptyLink = (): Partial<StoreLink> => ({
  url: "",
  store: "",
  price: undefined,
  unit: "",
  shipping: "",
  variant: "",
});

export default function AddPage() {
  const router = useRouter();
  const { addProduct } = useProducts();

  const [category, setCategory] = useState<Category>("Riftbound");
  const [name, setName] = useState("");
  const [set, setSet] = useState("");
  const [customSet, setCustomSet] = useState("");
  const [language, setLanguage] = useState<Language>("Englisch");
  const [productType, setProductType] = useState<ProductType>("Display");
  const [notes, setNotes] = useState("");
  const [links, setLinks] = useState<Partial<StoreLink>[]>([emptyLink()]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const availableSets =
    category === "Riftbound" ? RIFTBOUND_SETS : POKEMON_SETS;

  const updateLink = (
    index: number,
    field: keyof StoreLink,
    value: string | number
  ) => {
    setLinks((prev) =>
      prev.map((l, i) => {
        if (i !== index) return l;
        const updated = { ...l, [field]: value };
        // Auto-fill store from URL
        if (field === "url" && typeof value === "string") {
          const auto = storeFromUrl(value);
          if (auto) updated.store = auto;
          if (!updated.unit) updated.unit = productType;
        }
        return updated;
      })
    );
  };

  const addLink = () => setLinks((prev) => [...prev, emptyLink()]);
  const removeLink = (i: number) =>
    setLinks((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    setError("");
    const finalSet = set === "__custom__" ? customSet.trim() : set;
    if (!name.trim()) return setError("Produktname ist erforderlich.");
    if (!finalSet) return setError("Bitte wähle oder gib ein Set ein.");
    if (links.length === 0)
      return setError("Mindestens ein Shop-Link ist erforderlich.");

    const validLinks: StoreLink[] = [];
    for (const l of links) {
      if (!l.url?.trim()) return setError("Alle Links brauchen eine URL.");
      if (!l.store?.trim()) return setError("Alle Links brauchen einen Shop-Namen.");
      if (!l.price || l.price <= 0) return setError("Bitte gib einen gültigen Preis an.");
      if (!l.shipping?.trim()) return setError("Bitte gib die Versandkosten an.");
      validLinks.push({
        url: l.url.trim(),
        store: l.store.trim(),
        price: Number(l.price),
        unit: l.unit?.trim() || productType,
        shipping: l.shipping.trim(),
        variant: l.variant?.trim() || undefined,
      });
    }

    addProduct({
      category,
      name: name.trim(),
      set: finalSet,
      language,
      productType,
      links: validLinks,
      notes: notes.trim() || undefined,
    });

    setSuccess(true);
    setTimeout(() => {
      router.push(category === "Riftbound" ? "/riftbound" : "/pokemon");
    }, 1500);
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-gray-900">Produkt hinzugefügt!</h2>
        <p className="text-gray-500 mt-1">Du wirst weitergeleitet…</p>
      </div>
    );
  }

  const inputCls =
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 bg-white transition";

  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Produkt hinzufügen</h1>
        <p className="text-gray-500 text-sm mt-1">
          Füge ein neues Produkt mit Shop-Links zur Datenbank hinzu
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        {/* Category */}
        <div>
          <label className={labelCls}>Kategorie *</label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setSet("");
                }}
                className={`py-2.5 rounded-lg text-sm font-semibold border transition ${
                  category === c
                    ? c === "Riftbound"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-yellow-500 text-white border-yellow-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {c === "Riftbound" ? "⚔️" : "⚡"} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className={labelCls}>Produktname *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              category === "Riftbound"
                ? "z.B. Riftbound: Spiritforged (Slim)"
                : "z.B. SWSH: Brilliant Stars 3-Pack-Blister"
            }
            className={inputCls}
          />
        </div>

        {/* Set + Language */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Set / Edition *</label>
            <select
              value={set}
              onChange={(e) => setSet(e.target.value)}
              className={inputCls}
            >
              <option value="">Set wählen…</option>
              {availableSets.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
              <option value="__custom__">+ Neues Set eingeben</option>
            </select>
            {set === "__custom__" && (
              <input
                type="text"
                value={customSet}
                onChange={(e) => setCustomSet(e.target.value)}
                placeholder="Set-Name eingeben"
                className={`${inputCls} mt-2`}
              />
            )}
          </div>

          <div>
            <label className={labelCls}>Sprache *</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className={inputCls}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product type */}
        <div>
          <label className={labelCls}>Produkttyp *</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value as ProductType)}
            className={inputCls}
          >
            {PRODUCT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className={labelCls}>Notizen (optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="z.B. Limitierte Auflage, Preorder etc."
            className={inputCls}
          />
        </div>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Links */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-900">
              Shop-Links *
            </label>
            <button
              type="button"
              onClick={addLink}
              className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Link hinzufügen
            </button>
          </div>

          <div className="space-y-4">
            {links.map((link, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    Shop {i + 1}
                  </span>
                  {links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLink(i)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* URL */}
                <div>
                  <label className={labelCls}>URL *</label>
                  <div className="relative">
                    <input
                      type="url"
                      value={link.url ?? ""}
                      onChange={(e) => updateLink(i, "url", e.target.value)}
                      placeholder="https://shop.de/produkt/…"
                      className={`${inputCls} pr-8`}
                    />
                    {link.url && (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Store */}
                  <div>
                    <label className={labelCls}>Shop-Name *</label>
                    <input
                      list={`stores-${i}`}
                      value={link.store ?? ""}
                      onChange={(e) => updateLink(i, "store", e.target.value)}
                      placeholder="Innventory"
                      className={inputCls}
                    />
                    <datalist id={`stores-${i}`}>
                      {KNOWN_STORES.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>

                  {/* Price */}
                  <div>
                    <label className={labelCls}>Preis (€) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={link.price ?? ""}
                      onChange={(e) =>
                        updateLink(i, "price", parseFloat(e.target.value))
                      }
                      placeholder="49.99"
                      className={inputCls}
                    />
                  </div>

                  {/* Shipping */}
                  <div>
                    <label className={labelCls}>Versandkosten *</label>
                    <input
                      type="text"
                      value={link.shipping ?? ""}
                      onChange={(e) => updateLink(i, "shipping", e.target.value)}
                      placeholder="4,99€ / Kostenlos ab 50€"
                      className={inputCls}
                    />
                  </div>

                  {/* Variant */}
                  <div>
                    <label className={labelCls}>Variante (optional)</label>
                    <input
                      type="text"
                      value={link.variant ?? ""}
                      onChange={(e) => updateLink(i, "variant", e.target.value)}
                      placeholder="Leafeon Version"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2.5 text-sm">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition text-sm"
        >
          Produkt hinzufügen
        </button>
      </div>
    </div>
  );
}
