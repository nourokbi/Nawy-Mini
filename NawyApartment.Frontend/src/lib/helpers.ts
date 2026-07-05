// Small shared formatting helpers.

// Format a price in EGP, e.g. "9,500,000 EGP".
export function formatPrice(price: number): string {
  return `${new Intl.NumberFormat("en-EG").format(price)} EGP`;
}

// The apartment image URL, or a local placeholder when it's missing.
export function resolveImageSrc(url?: string | null): string {
  return url?.trim() ? url : "/apartment-placeholder.svg";
}
