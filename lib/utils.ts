import { Product } from "./data";

export function getUniqueValues<K extends keyof Product>(
  products: Product[],
  key: K
): string[] {
  const vals = new Set<string>();
  products.forEach((p) => {
    const v = p[key];
    if (typeof v === "string") vals.add(v);
  });
  return Array.from(vals).sort();
}

export function getUniqueStores(products: Product[]): string[] {
  const s = new Set<string>();
  products.forEach((p) => p.links.forEach((l) => s.add(l.store)));
  return Array.from(s).sort();
}

export function lowestPrice(product: Product): number {
  if (!product.links.length) return 0;
  return Math.min(...product.links.map((l) => l.price));
}

export function formatPrice(price: number): string {
  return price.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
}
