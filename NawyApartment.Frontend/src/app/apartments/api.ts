import { Apartment } from "./types";

// Backend base URL. Override with API_URL in .env for other environments.
const API_BASE = 
  process.env.API_URL ?? "http://localhost:3001/api/apartments";

/**
 * Fetch apartments, optionally filtered by a search term.
 *
 * Branches between the two backend endpoints (both return the same
 * `{ data, meta }` envelope, so the caller gets a plain Apartment[] either way):
 *   - no term  -> GET /apartments          (full list)
 *   - term     -> GET /apartments/search   (filtered)
 */
export async function getApartments(search?: string): Promise<Apartment[]> {
  const term = search?.trim();

  // Pick the endpoint based on whether we're searching.
  const url = new URL(term ? `${API_BASE}/search` : API_BASE);
  url.searchParams.set("limit", "50");
  if (term) url.searchParams.set("search", term);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch apartments (${res.status})`);
  }

  // Both endpoints wrap the list in an envelope: { data: Apartment[] }
  const { data: apartments }: { data: Apartment[] } = await res.json();
  return apartments;
}

/** Fetch a single apartment by id. */
export async function getApartment(id: string): Promise<Apartment> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch apartment ${id} (${res.status})`);
  }
  return res.json();
}
