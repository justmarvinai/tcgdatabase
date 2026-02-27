export type Language = "Englisch" | "Deutsch" | "Chinesisch";
export type Category = "Riftbound" | "Pokémon";
export type PokemonEra =
  | "XY Series"
  | "Sun & Moon"
  | "Sword & Shield"
  | "Scarlet & Violet"
  | "Mega Evolution";
export type ProductType =
  | "Display"
  | "Booster"
  | "Sleeved Booster"
  | "3-Pack-Blister"
  | "Booster Bundle"
  | "Kollektion"
  | "Slim Display"
  | "Jumbo Display";

export interface StoreLink {
  url: string;
  store: string;
  price: number;
  unit: string; // "Display", "Booster", etc.
  shipping: string; // "Kostenlos ab 50€", "4,99€", etc.
  variant?: string; // e.g. "Leafeon Version"
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  era?: PokemonEra; // only for Pokémon
  set: string;
  language: Language;
  productType: ProductType;
  links: StoreLink[];
  notes?: string;
  createdAt: string;
}

// ─── Pokémon Era → Sets mapping ───────────────────────────────────────────────
export const POKEMON_ERAS: Record<PokemonEra, string[]> = {
  "XY Series": [
    "XY Base", "Flashfire", "Furious Fists", "Phantom Forces", "Primal Clash",
    "Double Crisis", "Roaring Skies", "Ancient Origins", "BREAKthrough",
    "BREAKpoint", "Generations", "Fates Collide", "Steam Siege", "Evolutions",
  ],
  "Sun & Moon": [
    "Sun & Moon Base", "Guardians Rising", "Burning Shadows", "Shining Legends",
    "Crimson Invasion", "Ultra Prism", "Forbidden Light", "Celestial Storm",
    "Dragon Majesty", "Lost Thunder", "Team Up", "Detective Pikachu",
    "Unbroken Bonds", "Unified Minds", "Hidden Fates", "Cosmic Eclipse",
  ],
  "Sword & Shield": [
    "Sword & Shield Base", "Rebel Clash", "Darkness Ablaze", "Champions Path",
    "Vivid Voltage", "Shining Fates", "Battle Styles", "Brilliant Stars",
    "Astral Radiance", "Pokemon GO", "Lost Origin", "Silver Tempest",
    "Crown Zenith",
  ],
  "Scarlet & Violet": [
    "Scarlet & Violet Base", "Paldea Evolved", "Obsidian Flames", "151",
    "Paradox Rift", "Paldean Fates", "Temporal Forces", "Twilight Masquerade",
    "Shrouded Fable", "Stellar Crown", "Surging Sparks", "Prismatic Evolution",
    "Journey Together", "Destined Rivals", "Black Bolt", "White Flare",
  ],
  "Mega Evolution": [
    "Mega Evolution Base", "Phantasmal Flames", "Ascended Heroes",
    "Perfect Order", "Chaos Rising",
  ],
};

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
    return url;
  }
}

const raw: Omit<Product, "id">[] = [
  // ── Riftbound: Spiritforged (EN) ───────────────────────────────────────────
  {
    category: "Riftbound",
    name: "Riftbound: Spiritforged",
    set: "Spiritforged",
    language: "Englisch",
    productType: "Display",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://innventory.de/produkt/riftbound-league-of-legends-tcg-spiritforged-booster-display/",
        store: storeFromUrl("https://innventory.de"),
        price: 149.99,
        unit: "Display",
        shipping: "Kostenlos ab 50€",
      },
    ],
  },

  // ── Riftbound: Origins (EN) ────────────────────────────────────────────────
  {
    category: "Riftbound",
    name: "Riftbound: Origins",
    set: "Origins",
    language: "Englisch",
    productType: "Display",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://innventory.de/produkt/riftbound-league-of-legends-tcg-unleashed-booster-display/",
        store: storeFromUrl("https://innventory.de"),
        price: 159.99,
        unit: "Display",
        shipping: "Kostenlos ab 50€",
      },
    ],
  },

  // ── Riftbound: Spiritforged (ZH) ──────────────────────────────────────────
  {
    category: "Riftbound",
    name: "Riftbound: Spiritforged (Slim)",
    set: "Spiritforged",
    language: "Chinesisch",
    productType: "Slim Display",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://yonko-tcg.de/en/products/s-chn-league-of-legends-display-riftbound-spiritforged",
        store: storeFromUrl("https://yonko-tcg.de"),
        price: 39.95,
        unit: "Slim Display",
        shipping: "4,99€ bis 150€",
      },
      {
        url: "https://www.card-corner.de/Riftbound-Spiritforged-Chinesisch",
        store: storeFromUrl("https://www.card-corner.de"),
        price: 42.99,
        unit: "Slim Display",
        shipping: "5,49€ bis 200€",
      },
      {
        url: "https://sapphire-cards.de/produkt/riftbound-spiritforged-display-booster-box-slim-version-s-cn/",
        store: storeFromUrl("https://sapphire-cards.de"),
        price: 49.99,
        unit: "Slim Display",
        shipping: "4,95€ bis 200€",
      },
    ],
  },
  {
    category: "Riftbound",
    name: "Riftbound: Spiritforged (Jumbo)",
    set: "Spiritforged",
    language: "Chinesisch",
    productType: "Jumbo Display",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://yonko-tcg.de/en/products/s-chn-league-of-legends-display-riftbound-spiritforged",
        store: storeFromUrl("https://yonko-tcg.de"),
        price: 59.95,
        unit: "Jumbo Display",
        shipping: "4,99€ bis 150€",
      },
      {
        url: "https://www.card-corner.de/Riftbound-Spiritforged-Chinesisch",
        store: storeFromUrl("https://www.card-corner.de"),
        price: 54.99,
        unit: "Jumbo Display",
        shipping: "5,49€ bis 200€",
      },
      {
        url: "https://sapphire-cards.de/produkt/riftbound-spiritforged-display-booster-box-jumbo-version-s-cn/",
        store: storeFromUrl("https://sapphire-cards.de"),
        price: 69.99,
        unit: "Jumbo Display",
        shipping: "4,95€ bis 200€",
      },
    ],
  },

  // ── Riftbound: Origins (ZH) ───────────────────────────────────────────────
  {
    category: "Riftbound",
    name: "Riftbound: Origins (Slim)",
    set: "Origins",
    language: "Chinesisch",
    productType: "Slim Display",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://yonko-tcg.de/products/s-chn-riftbound-set-one-origins-display",
        store: storeFromUrl("https://yonko-tcg.de"),
        price: 39.95,
        unit: "Slim Display",
        shipping: "4,99€ bis 150€",
      },
      {
        url: "https://www.card-corner.de/Riftbound-Set-One-Origins-Chinesisch",
        store: storeFromUrl("https://www.card-corner.de"),
        price: 48.99,
        unit: "Slim Display",
        shipping: "5,49€ bis 200€",
      },
      {
        url: "https://sapphire-cards.de/produkt/riftbound-origins-display-booster-box-slim-version-s-cn/",
        store: storeFromUrl("https://sapphire-cards.de"),
        price: 39.99,
        unit: "Slim Display",
        shipping: "4,95€ bis 200€",
      },
    ],
  },
  {
    category: "Riftbound",
    name: "Riftbound: Origins (Jumbo)",
    set: "Origins",
    language: "Chinesisch",
    productType: "Jumbo Display",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://yonko-tcg.de/products/s-chn-riftbound-set-one-origins-display",
        store: storeFromUrl("https://yonko-tcg.de"),
        price: 54.95,
        unit: "Jumbo Display",
        shipping: "4,99€ bis 150€",
      },
      {
        url: "https://www.card-corner.de/Riftbound-Set-One-Origins-Chinesisch",
        store: storeFromUrl("https://www.card-corner.de"),
        price: 54.99,
        unit: "Jumbo Display",
        shipping: "5,49€ bis 200€",
      },
      {
        url: "https://sapphire-cards.de/produkt/riftbound-origins-display-booster-box-jumbo-version-s-cn/",
        store: storeFromUrl("https://sapphire-cards.de"),
        price: 59.99,
        unit: "Jumbo Display",
        shipping: "4,95€ bis 200€",
      },
    ],
  },

  // ── Pokémon: Battle Styles Display (DE) → Sword & Shield
  {
    category: "Pokémon",
    era: "Sword & Shield",
    name: "Battle Styles Display",
    set: "Battle Styles",
    language: "Deutsch",
    productType: "Display",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://wizzardsinn.de/index.php/produkt/pokemon-kampfstile-booster-ger/",
        store: storeFromUrl("https://wizzardsinn.de"),
        price: 179.0,
        unit: "Display",
        shipping: "Unbekannt",
      },
    ],
  },

  // ── Pokémon: Battle Styles Booster (DE) → Sword & Shield
  {
    category: "Pokémon",
    era: "Sword & Shield",
    name: "Battle Styles Booster",
    set: "Battle Styles",
    language: "Deutsch",
    productType: "Booster",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://wizzardsinn.de/index.php/produkt/pokemon-kampfstile-booster-ger/",
        store: storeFromUrl("https://wizzardsinn.de"),
        price: 4.99,
        unit: "Booster",
        shipping: "Unbekannt",
      },
    ],
  },

  // ── Pokémon: Burning Shadows Sleeved Booster (DE) → Sun & Moon
  {
    category: "Pokémon",
    era: "Sun & Moon",
    name: "Burning Shadows Sleeved Booster",
    set: "Burning Shadows",
    language: "Deutsch",
    productType: "Sleeved Booster",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://wizzardsinn.de/index.php/produkt/pokemon-nacht-in-flammen-sleeved-booster-ger/",
        store: storeFromUrl("https://wizzardsinn.de"),
        price: 5.99,
        unit: "Sleeved Booster",
        shipping: "Unbekannt",
      },
    ],
  },

  // ── Pokémon: Crimson Invasion Sleeved Booster (DE) → Sun & Moon
  {
    category: "Pokémon",
    era: "Sun & Moon",
    name: "Crimson Invasion Sleeved Booster",
    set: "Crimson Invasion",
    language: "Deutsch",
    productType: "Sleeved Booster",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://www.goodgameguys.de/pokemon-karten-aufziehen-der-sturmroete-sleeved-booster-deutsch.html",
        store: storeFromUrl("https://www.goodgameguys.de"),
        price: 14.95,
        unit: "Sleeved Booster",
        shipping: "Unbekannt",
      },
    ],
  },

  // ── Pokémon: Battle Styles Galar Gallopa V Kollektion (DE) → Sword & Shield
  {
    category: "Pokémon",
    era: "Sword & Shield",
    name: "Battle Styles Galar Gallopa V Kollektion",
    set: "Battle Styles",
    language: "Deutsch",
    productType: "Kollektion",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://wizzardsinn.de/index.php/produkt/galar-gallopa-v-box-ger/",
        store: storeFromUrl("https://wizzardsinn.de"),
        price: 24.99,
        unit: "Kollektion",
        shipping: "Unbekannt",
      },
    ],
  },

  // ── Pokémon: Brilliant Stars 3-Pack-Blister (EN) → Sword & Shield
  {
    category: "Pokémon",
    era: "Sword & Shield",
    name: "Brilliant Stars 3-Pack-Blister",
    set: "Brilliant Stars",
    language: "Englisch",
    productType: "3-Pack-Blister",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://www.peer-online.de/products/7553937932524?_pos=8&_fid=471ca4243&_ss=c",
        store: storeFromUrl("https://www.peer-online.de"),
        price: 34.9,
        unit: "3-Pack-Blister",
        shipping: "4,99€",
        variant: "Leafeon Version",
      },
      {
        url: "https://www.peer-online.de/products/7553931870444?_pos=9&_fid=471ca4243&_ss=c",
        store: storeFromUrl("https://www.peer-online.de"),
        price: 34.9,
        unit: "3-Pack-Blister",
        shipping: "4,99€",
        variant: "Glaceon Version",
      },
    ],
  },

  // ── Pokémon: Astral Radiance 3-Pack-Blister (EN) → Sword & Shield
  {
    category: "Pokémon",
    era: "Sword & Shield",
    name: "Astral Radiance 3-Pack-Blister",
    set: "Astral Radiance",
    language: "Englisch",
    productType: "3-Pack-Blister",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://www.peer-online.de/products/7974837715210?_pos=15&_fid=471ca4243&_ss=c",
        store: storeFromUrl("https://www.peer-online.de"),
        price: 24.9,
        unit: "3-Pack-Blister",
        shipping: "4,99€",
        variant: "Sylveon Version",
      },
      {
        url: "https://www.peer-online.de/products/7974831980810?_pos=16&_fid=471ca4243&_ss=c",
        store: storeFromUrl("https://www.peer-online.de"),
        price: 24.9,
        unit: "3-Pack-Blister",
        shipping: "4,99€",
        variant: "Eevee Version",
      },
    ],
  },

  // ── Pokémon: Paldean Fates Booster Bundle (EN) → Scarlet & Violet
  {
    category: "Pokémon",
    era: "Scarlet & Violet",
    name: "Paldean Fates Booster Bundle",
    set: "Paldean Fates",
    language: "Englisch",
    productType: "Booster Bundle",
    createdAt: "2025-02-27",
    links: [
      {
        url: "https://voxymoron.de/paldeas-schicksale-booster-bundle.html",
        store: storeFromUrl("https://voxymoron.de"),
        price: 109.0,
        unit: "Booster Bundle",
        shipping: "5,50€",
      },
    ],
  },
];

export const INITIAL_PRODUCTS: Product[] = raw.map((p, i) => ({
  ...p,
  id: `prod-${i + 1}`,
}));
